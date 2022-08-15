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
const {existsSync} = require('fs')
const {mkdir} = promises
const { exec } = require('node:child_process');
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
  
  path(path = '/mongo-transform/models'){return join(process.cwd(), path); }
  async addDirectory (path = this.path()) {
    if(!existsSync(path)){
      await mkdir(path, {recursive: true});
    }
  }

  checkForInstallation(){
    exec('npm list mongo-transform', (error, stdout, stderr) => {
      if (error) {
        exec('npm link mongo-transform', (err, sto, sdi) => {
            if(err) return error
            if(sto){
                console.log(sto)
            }
        })
      }
    });
  }
  async make(command){
 
   this.checkForInstallation();
    await this.addDirectory();
    const modelName = command.charAt(0).toUpperCase() + command.slice(1);
    const collectionName = this.cmd(command);
    if(!existsSync(join(this.path(), `${modelName}.js`))){
      const writable = this.createWriteStream(join(this.path(), `${modelName}.js`));
      writable.write(modelDefinition({model: modelName, collection: collectionName}));
      writable.end('');
      console.log(`\x1b[32m${modelName} model successfully created!\x1b[0m`);
    }else{
      console.log(`\x1b[32m${modelName}\x1b[0m\x1b[31m model already exists!\x1b[0m`);
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

module.exports = Model;
