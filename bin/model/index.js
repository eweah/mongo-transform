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
const {join } = require('node:path');
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
  make(command){
    const modeName = command.charAt(0).toUpperCase() + command.slice(1);
    const collectionName = this.cmd(command);
    const writable = this.createWriteStream(join(__dirname, '../../app', `models/${modeName}.js`));
    writable.write(modelDefinition({model: modeName, collection: collectionName}));
    writable.end('');
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
