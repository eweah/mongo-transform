"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Schema
 * @kind class
 *
 * @extends Schema
 * @requires Schema
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Schema class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

class Schema extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Schema);
    // auto invoke methods
    this.autoinvoker(Schema);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  addDefault() {
    if (!this.createWriteStream) this.createWriteStream = createWriteStream;
    if (!this.createReadStream) this.createReadStream = createReadStream;
    if (!promises) this.promises = promises;
  }
  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

  autoinvoked() {
    return ["addDefault"];
  }
  convertType(string = 'false'){
    if(string === 'false') return false;
    if(string === 'true') return true;
    if(!isNaN(string) && string.includes('.')) return parseFloat(string);
    if(!isNaN(string)) return parseInt(string);
    return string;
    
  }
  objectSchemaType() {}
//   createSchema(input = {}, type="object", output = {}){
//     output['bsonType'] = type;
//     output['required'] = [];
//     output['properties'] = {};
//     for(let el in input){
//         if(typeof(input[el]) === 'object' && Object.keys(el).length >= 2) {
//             this.createSchema(input[el], type="object", output);
//             console.log('object');
//         }else{
//             console.log('non object');
           
//         }
       
//     }

//     if(input[el].includes('required')) output['required'].push(el);
//     output['properties'][el] = {bsonType: input[el].split('|')[0]};
//     for(let element of input[el].split('|')){
//         if(element !== 'required'){
//             if(element.includes(':')){
//                 let check = element.split(':');
//                 output['properties'][el][check[0]] = this.convertType(check[1]);
//             }
//         }
//     }
//     if(output.required && output.required.length == 0) delete output.required;
//     return output;
//   }

    makeSchema(input = {}, type = 'object', output = {}) {
        if(Object.keys(output).length == 0){
            output['bsonType'] = type;
            output['required'] = [];
            output['properties'] = {};
        }
        for(let el in input){
            if(typeof(input[el]) !== 'object' ) {
                if(input[el].includes('required')) output['required'].push(el);
                output['properties'][el] = {bsonType: input[el].split('|')[0]};
                for(let element of input[el].split('|')){
                    if(element !== 'required'){
                        if(element.includes(':')){
                            let check = element.split(':');
                            output['properties'][el][check[0]] = this.convertType(check[1]);
                        }
                    }
                }
            }
            if(typeof(input[el]) === 'object' && Object.keys(el).length >= 2){
                output['properties'][el] = {}
                output['properties'][el]['bsonType'] = type;
                output['properties'][el]['required'] = [];
                output['properties'][el]['properties'] = {};

                for(let els in input[el]){
                    if(typeof(input[el][els]) === 'object' && Object.keys(el).length >= 2){
                        return this.makeSchema(input[el][els], input[el][els].type, output);
                    }else{
                        output['properties'][el]['properties'][els] = {bsonType: input[el][els].split('|')[0]};
                        if(input[el][els].includes('required')) output['properties'][el]['required'].push(els);
                        for(let elemental of input[el][els].split('|')){
                            // return console.log(input[el][els])
                            if(elemental !== 'required'){
                                if(elemental.includes(':')){
                                    let check = elemental.split(':');
                                    output['properties'][el]['properties'][els][check[0]] = this.convertType(check[1]);
                                }
                            }
                        }
                    }
                   
                }
                // return this.makeSchema(input[el], input[el].type, output);
            }
        }
        return require('util').inspect(output, {showHidden: true, depth: Infinity, colors: true});
    }
}

module.exports = Schema;
const users = {
    "firstname": "string|required",
    "age": "number|minimum:13.5|exclusiveMinimum:true|required",
    "_id": "objectId",
     "posts": {
        "title": "string|required",
        "userId": "number|minimum:100|validate:true",
        "body": "string|max_length:10|required",
        "user": {
            "firstname": "string|required",
            "lastname": "string",
            "age": "number|required|minimum:18|maximum:80"
        }
     }
}

const {makeSchema} = new Schema

console.log(makeSchema(users))
