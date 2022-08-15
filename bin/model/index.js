"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Model
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Model class
 */

const { createReadStream, createWriteStream, promises} = require("fs");
// const {mkdir} = promises
const { resolve, join } = require('node:path');
const MongoTransform = require('../../index')
const modelDefinition  = require('../templates/model')

class Model extends require("../base"){
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Model);
    // auto invoke methods
    this.autoinvoker(Model);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  list(){
    console.log('list all models');
  }
  cmd(cmdCommand = 'User'){ return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase(): `${cmdCommand}s`.toLocaleLowerCase()};
  async make(command){

    
     let modeName = command.charAt(0).toUpperCase() + command.slice(1);
     let collectionName = this.cmd(command);
   
  
     

    //  command = new MongoTransform({collection: this.cmd(command)});
    // //  command.create({name: 'first command'});
    // this.makeDirectory('../app', 'models').catch(console.error)
    // // const readable = Model.from(`const Forum = new MongoTransform({collection: 'forums'});`);
    // // const writable = this.createWriteStream(join(__dirname, '../../app', `models/${modeName}.js`))

    // // const readable = Model.from(`const Forum = new MongoTransform({collection: 'forums'});`);
    const writable = this.createWriteStream(join(__dirname, '../../app', `models/${modeName}.js`))
    // writable.write(`const Forum = new MongoTransform({collection: 'forums'});\n`)
    // writable.write(`module.exports = Forum;`);

    writable.write(modelDefinition({model: modeName, collection: collectionName}))
    
    // readable.pipe(writable);

    // console.log(modelDefinition(`const Forum = new MongoTransform({collection: 'forums'});\n`))
    

   
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

module.exports = Model;
