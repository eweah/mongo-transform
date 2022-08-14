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


  corresponding(){
    return {
      'all': 'find(query = {}, projection = {})',
      'create': 'insertOne(query = {})',
      'insertOne': 'insertOne(query = {})',
      'insertMany': 'insertMany(data = [])',
      'createMany': 'insertMany(data = [])',
      'findOne': 'findOne(query = {})',
      'first': 'findOne(query = {})',
      'find': 'find(query = {}, projection = {})',
      'sort': 'find(query = {}, projection = {}).sort',
      'deleteOne': 'deleteOne(query = {})',
      'deleteMany': 'deleteMany(query = {}, cfn = () => {})',
      'dropCollection': 'dropCollection',
      'collectionDrop': 'dropCollection',
      'updateOne': 'updateOne(query, { $set: data }, cfn = () => {})',
      'update': 'updateOne(query, { $set: data }, cfn = () => {})',
      'updateMany': 'updateMany(query, { $set: data }, cfn = () => {})',
      'limit': 'find(query = {}, projection = {}).limit(limit)',




    }
  }
  methodCommands(){
    return {
        "   -l": " or \x1b[36m--list\x1b[0m        list available methods",
        "   -n": " or \x1b[36m--name\x1b[0m        method by name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m",
        "   -i": " or \x1b[36m--info\x1b[0m        method info by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-i\x1b[0m|\x1b[36m--info\x1b[0m]",
        "   -t": " or \x1b[36m--type\x1b[0m        method type by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-t\x1b[0m|\x1b[36m--type\x1b[0m]",
      };
  }

  methodUserExamples(command){

    let hash = {}
    hash["      \x1b[32m1|\x1b[0m"] = "=================== Generic Example ===============";
    hash[  `      var CollectionName = new MongoTransform({collection: 'CollectionName'})`] = ": Instantiates the CollectionName model.";
    hash[`      CollectionName.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all CollectionName models from the database";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event on the CollectionName model.";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event on the CollectionName model.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event on the CollectionName model.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event on the CollectionName model.";
    hash[`      `] = '';

    hash["      \x1b[32m2|\x1b[0m"] = "=================== Specific Example ===============";
    hash[  `      var User = new MongoTransform({collection: 'users'})`] = ": Instantiates the User model.";
    hash[`      User.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all User models from the database";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event on the User model.";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event on the User model.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event on the User model.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event on the CollectionName model.";
    hash[`      `] = '';
    return hash;
  }


  method(){
    if (true) {
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
          if(!method.startsWith('validate') && !method.endsWith('Callback')){
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
  }

  methodUsage(command, exactly = 'find'){
    console.clear();
          // if (command.length !== 8)
          //   return this.emit("error", {
          //     error: `'${string}' is not command.`,
          //   });
         
      
        let centered = `\x1b[36m NAME\x1b[0m
      \x1b[36m ${command}\x1b[0m - Mongo Transform \x1b[36m${command}\x1b[0m method and \x1b[36m${command}\x1b[0m method Details
    
\x1b[36mSYNOPSIS \x1b[0m
      \x1b[36m ${command}\x1b[0m arguments: [\x1b[36m \x1b[0m|\x1b[36m{}\x1b[0m]

\x1b[36m DESCRIPTION\x1b[0m
      Mongo Transform \x1b[36m${command}\x1b[0m method and \x1b[36m${command}\x1b[0m method usage. \x1b[36m${command}\x1b[0m takes no argument or \x1b[36m{}\x1b[0m (an empty object). 
      It takes exactly the same argument as the Mongodb NodeJs driver \x1b[36m${exactly}\x1b[0m.
      So \x1b[36m${command}\x1b[0m does whatsoever \x1b[36m${exactly}\x1b[0m does.
      (see mongodb documentation: https://www.mongodb.com/docs/drivers/node/current):
      \x1b[36mdb.collection.${exactly} or db.collectionName.${exactly} \x1b[0m

     \x1b[32m  The following are some usage examples (2): \x1b[0m `;
          this.centered(`\x1b[32m MONGO TRANSFORM \x1b[36m${command.toUpperCase()}\x1b[0m \x1b[32mMETHOD AND\x1b[0m \x1b[36m${command.toUpperCase()}\x1b[0m \x1b[32mMETHOD USAGE MANUAL\x1b[0m`);
          this.description(centered);
          this.verticalSpace(1);
          let options = {
            pad: 13,
            position: process.stdout.columns,
            hline: false,
            keyColor: "36",
            valueColor: "37",
          };
          this.texAligner(options, this.methodUserExamples(command));
          console.log();
 
  }
  n(command){

    if(this.command == '-n'){
      if(command){
        let Mongo = new MongoTransform
        if(Mongo[command]){
          this.methodUsage(command, this.corresponding()[command]);
        }else{
          console.log(`'${command}' method does not exist.`);
        }
      }else{
        console.log('the method name argument is missing.');
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
