"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module ErrorNotification
 * @kind class
 *
 * @extends ErrorNotification
 * @requires ErrorNotification
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc ErrorNotification class
 */

const { createReadStream, createWriteStream, promises } = require("fs");
const {spawn} = require('child_process')

class ErrorNotification extends require("../../base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(ErrorNotification);
    // auto invoke methods
    this.autoinvoker(ErrorNotification);
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
  simpleNotification (command){
    let ls
    
    if(command !== undefined){
        if(command.length > 18){
            ls = spawn('echo', ['', `\x1b[5m\x1b[31m '${command.slice(0,18)}...' is not a valid command.\x1b[0m\x1b[0m`]);
        }else{
            ls = spawn('echo', ['', `\x1b[5m\x1b[31m '${command.slice(0,18)}' is not a valid command.\x1b[0m\x1b[0m`]);
        }
        ls.stdout.on('data', (data) => {
            if(command !== undefined){
                console.log(this.invalidCommand(data));
            }
            console.log();
            console.log(`\x1b[5m Some Available Options:
                man - for the man page.
                methods - for available method lists.
                help - for the help page.
                events - for available events.
                database - for connected database.
                model - for available models or collections.
                class - for main class.\x1b[31m
                `);
        });
        
        ls.stderr.on('data', (data) => {});
        
        ls.on('close', (code) => {})
        }else{
            console.log(`\x1b[5m Some Available Options:
                man - for the man page.
                methods - for available method lists.
                help - for the help page.
                events - for available events.
                database - for connected database.
                model - for available models or collections.
                class - for main class.\x1b[31m
                `);
        }
    
    }

}

module.exports = ErrorNotification;
