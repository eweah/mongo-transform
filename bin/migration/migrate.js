"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Migrate
 * @kind class
 *
 * @extends Migrate
 * @requires Migrate
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Migrate class
 */

const { createReadStream, createWriteStream, promises } = require("fs");
const {join } = require('node:path');
const {existsSync, lstatSync} = require('fs')
const MongoTransform = require('../../index');


class Migrate extends require("../base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  

    // auto bind methods
    this.autobind(Migrate);
    // auto invoke methods
    this.autoinvoker(Migrate);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  types() {
    return [
      'double', 'string', 'object', 'array', 'objectId', 'data', 'bool',
      'null', 'regex', 'int', 'timestamp', 'long', 'decimal', 'uuid', 'bindData',
      'mixed'
    ]
  }
  cmd(cmdCommand = 'User'){ return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase(): `${cmdCommand}s`.toLocaleLowerCase()};

  path(path = '/mongo-transform/schemas'){return require('path').join(process.cwd(), path); }
  async addDirectory (path = this.path()) {
    if(!existsSync(path)){
      await require('fs').promises.mkdir(path, {recursive: true});
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
  modelPath(command){
    const paths = command.split('/');
    paths.pop();
    const modelPath = '/mongo-transform/schemas/'+paths.join('/');
    return this.path(modelPath)
  }
  modelName(command) {
    const paths = command.split('/');
    const name = paths.pop();
    return name.charAt(0).toUpperCase() + name.slice(1);

  }
  collectionName(command){
    const paths = command.split('/');
    const name = paths.pop();
    return this.cmd(name);
  }

  onCreateCollection (namespace,model) {
    const {collection} = namespace
    let firstIndex = Array.from(collection).findIndex(str => str == ':');
    let secondIndex = Array.from(collection).findIndex(str => str == ',');
    let string = namespace.collection
    .slice(firstIndex,secondIndex)
    .split(':').filter(str => str.trim().length !== 0).join('')
    .split(`\x1B[32m'`).filter(str => str.trim().length !== 0).join('')
    .split("'")[0]
   
    return console.log(`\x1b[32m${string} migration successfully created!\x1b[0m`);
}

onCreateCollectionError (error, model) {

    const {message} = error;
    let firstIndex = Array.from(message).findIndex(str => str == ':');
    let secondIndex = Array.from(message).findIndex(str => str == ',');

    let string = error.message
    .slice(firstIndex,secondIndex)
    .split(':').filter(str => str.trim().length !== 0).join('')
    .split(`\x1B[32m'`).filter(str => str.trim().length !== 0).join('')
    .split("'")[0]
  return (error && error.codeName === 'NamespaceExists') ? console.log(`\x1b[31m ${string} migration already exists!\x1b[0m`): ''
}
  async migrate(){
    
    try{
        let files = await promises.readdir(this.path());
        if(files){
            const mongo = new MongoTransform
            for(const file of files){
              if((await promises.lstat(join(this.path(), file))).isFile()){
                let schema = require(join(this.path(), file))

                // return console.log(schema);
                mongo.createCollection(schema);
               
                mongo.removeListener('createCollection',this.onCreateCollection)
                if(mongo.listenerCount('createCollection') > 1){
                    mongo.removeListener('createCollection',this.onCreateCollection)
                }else{
                    mongo.on('createCollection', this.onCreateCollection)
                }
               
                mongo.removeListener('createCollection-error',this.onCreateCollectionError)
                if(mongo.listenerCount('createCollection-error') > 1){
                    mongo.removeListener('createCollection-error',this.onCreateCollectionError)
                }else{
                    mongo.on('createCollection-error', this.onCreateCollectionError)
                }
                
              }
              if((await promises.lstat(join(this.path(), file))).isDirectory()){
                    // return this.migrate(join(this.path(), file), results);
                    // files = await promises.readdir(join(this.path(), file));
                    // this.migrate();
              }
            }

           
        }


      
    }catch(error){
        console.log(error)
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

module.exports = Migrate;
