"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Method
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Method class
 */

const { createReadStream, createWriteStream, promises } = require("fs");
const MongoTransform = require('../../index')

class Method extends require("../base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Method);
    // auto invoke methods
    this.autoinvoker(Method);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  methodCommands(){
    return {
        "   -l": " or \x1b[36m--list\x1b[0m        list available methods",
        "   -n": " or \x1b[36m--name\x1b[0m        method by name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m",
        "   -i": " or \x1b[36m--info\x1b[0m        method info by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-i\x1b[0m|\x1b[36m--info\x1b[0m]",
        "   -t": " or \x1b[36m--type\x1b[0m        method type by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-t\x1b[0m|\x1b[36m--type\x1b[0m]",
      };
  }

  method(){
    if (this.command === "method") {
      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });
     
  
    let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m method\x1b[0m - Mongo Transform Class Method and Class Method's Details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m method\x1b[0m [\x1b[36m--list\x1b[0m|\x1b[36m-l\x1b[0m] [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 
  \x1b[36m method\x1b[0m [\x1b[36m-T\x1b[0m|\x1b[36m--type=\x1b[0m]\x1b[4m type\x1b[0m [\x1b[36m-s\x1b[0m|\x1b[36m--sizes\x1b[0m|\x1b[36m-t\x1b[0m|\x1b[36m--toppings\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 

\x1b[36m DESCRIPTION\x1b[0m
   Application menu and a menu object details. All menu items or a single menu can be viewed in 
   two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
   depending on how you want to view it. A single menu item is selected by type. A single item
   can also be selected by type by size by price or by type by toppings.

 \x1b[36m  The following options are available: \x1b[0m `;
      this.centered(`\x1b[32m MONGO TRANSFORM CLASS METHOD AND CLASS METHOD USAGE MANUAL\x1b[0m`);
      this.description(centered);
      this.verticalSpace(1);
      let options = {
        pad: 13,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
      };
      this.texAligner(options, this.methodCommands());
      console.log();
    }
 
  }
  list(){
    if(this.command == '--list'){
       let Mongo = new MongoTransform
       for(let method in Mongo){
        if(typeof(Mongo[method]) === 'function'){
          if(Object.getOwnPropertyNames(require('stream').Transform.prototype).includes(method)){
            console.log(`\x1b[36m${method}\x1b[0m`,`\x1b[32m(Transform:MongoTransform);\x1b[0m`);
          }
          else if(Object.getOwnPropertyNames(require('stream').Duplex.prototype).includes(method)){
            console.log(`\x1b[36m${method}\x1b[0m`,`\x1b[32m(Duplex:Transform:MongoTransform)\x1b[0m`);
          }
          else if(Object.getOwnPropertyNames(require('events').EventEmitter.prototype).includes(method)){
            console.log(`\x1b[36m${method}\x1b[0m`, `\x1b[32m(EventEmitter:Duplex:Transform:MongoTransform)\x1b[0m`);
          }
          else {
            console.log(`\x1b[36m${method}\x1b[0m`, `\x1b[34m(MongoTransform)\x1b[0m`);
          }
          
        }
       }
  
    }
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


}

module.exports = Method;
