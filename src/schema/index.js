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
    makeSchema(name = 'User', input = {}, type = 'object', output = {}){
        // if(typeof(input) !== 'object') return `${input} must be on object ...`;
        if(Object.keys(output).length == 0){
            output['title'] = name;
            output['bsonType'] = type;
            output['required'] = [];
            output['properties'] = {};
        }
        for(let key of Object.keys(input)){
            if(typeof(input[key]) === 'string'){
                if(input[key].includes('required')) output['required'].push(key);
                output['properties'][key] = {bsonType: input[key].split('|')[0]};
                for(let element of input[key].split('|')){
                    if(element !== 'required'){
                        if(element.includes(':')){
                            let check = element.split(':');
                            output['properties'][key][check[0]] = this.convertType(check[1]);
                        }
                    }
                }
            }
            if(typeof(input[key]) ===  'object'){
                output['properties'][key] = {}
                output['properties'][key]['bsonType'] = 'object';
                output['properties'][key]['required'] = [];
                output['properties'][key]['properties'] = {};
                for(let el of Object.keys(input[key])){
                    if(typeof(input[key][el] === 'string')){
                        if(typeof(input[key][el]) !== 'object'){
                            if(input[key][el].includes('required')){
                                output['properties'][key]['required'].push(el);
                            }
                            output['properties'][key]['properties'][el] = {bsonType: input[key][el].split('|')[0]};
                            for(let element of input[key][el].split('|')){
                                if(element !== 'required'){
                                    if(element.includes(':')){
                                        let check = element.split(':');
                                        output['properties'][key]['properties'][el][check[0]] = this.convertType(check[1]);
                                    }
                                }
                            }
                        }
                        if(typeof(input[key][el]) === 'object'){
                            output['properties'][key]['properties'][el] = {}
                            output['properties'][key]['properties'][el]['bsonType'] = 'object';
                            output['properties'][key]['properties'][el]['required'] = [];
                            output['properties'][key]['properties'][el]['properties'] = {};  
                            for(let elKey of Object.keys(input[key][el])){
                                if(typeof(input[key][el][elKey]) === 'string' && typeof(input[key][el][elKey]) !== 'object'){
                                    if(input[key][el][elKey].includes('required')){
                                        output['properties'][key]['properties'][el]['required'].push(elKey);  
                                    }
                                    output['properties'][key]['properties'][el]['properties'][elKey] = {bsonType: input[key][el][elKey].split('|')[0]};
                                    for(let element of input[key][el][elKey].split('|')){
                                        if(element !== 'required'){
                                            if(element.includes(':')){
                                                let check = element.split(':');
                                                output['properties'][key]['properties'][el]['properties'][elKey][check[0]] = this.convertType(check[1]);
                                            }
                                        }
                                    }
                                }
                                if(typeof(input[key][el][elKey]) === 'object'){
                                    throw new Error('only three level deep allowed');
                                }
                            }
                        }
                    }
                }
            }
        }
        return require('util').inspect(output, {showHidden: true, depth: Infinity, colors: true});
    }
}

module.exports = Schema;
// const users = {
//     "firstname": "string|required",
//     "age": "number|minimum:13.5|exclusiveMinimum:true|required",
//     "_id": "objectId",
//      "posts": {
//         "title": "string",
//         "userId": "number|minimum:100|validate:true",
//         "body": "string|max_length:10|required",
//         "user": {
//             "username": "string|required|min:2|max:10",
//             "email": "string|email:true",
//             "age": "number|required|minimum:18|maximum:80",
//         }
//      }
// }

// const {makeSchema} = new Schema

// // return console.log(makeSchema('User', users))


// const user  =  makeSchema('User', {
//     "firstname": "string",
//     "lastname": "string"
//     // <property>: <property data type>
  
//    },"array") ;

//    console.log(user);
