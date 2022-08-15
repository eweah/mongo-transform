#!/usr/bin/env node 
"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc CLI class
 */

 const Man = require('./man');
 const Method = require('./method/method');
 const Default = require('./default');
 const Event = require('./event');
 const MongoTransform = require('./MongoTransform');
 const Model = require('./model');
 const Database = require('./db');
 
 const { spawn } = require('node:child_process');

class CLI extends require("./base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(CLI);
    // auto invoke methods
    this.autoinvoker(CLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  cmd0() {
    return process.argv[0];
  }
  cmd1() {
    return process.argv[1];
  }
  cmd2() {
    return process.argv[2];
  }
  cmd3() {
    return process.argv[3];
  }
  cmd4() {
    return process.argv[4];
  }
  cmd5() {
    return process.argv[5];
  }
  cmd6() {
    return process.argv[6];
  }
  cmd7() {
    return process.argv[7];
  }
  cmd8() {
    return process.argv[8];
  }
  cmd9() {
    return process.argv[9];
  }

 
  invalidCommand(command = 'command') {
    return `
    ----------------------------------------------------

    |${command}
    ----------------------------------------------------`
  } 

  errorNotification (command){
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
            console.log(`Some Available Options:
            man - for the man page.
            methods - for available method lists.
            help - for the help page.
            events - for available events.
            database - for connected database.
            model - for available models or collections.
            class - for main class.
                `);
        });
        
        ls.stderr.on('data', (data) => {});
        
        ls.on('close', (code) => {})
        }else{
            console.log(`Some Available Options:
            man - for the man page.
            methods - for available method lists.
            help - for the help page.
            events - for available events.
            database - for connected database.
            model - for available models or collections.
            class - for main class.
                `);
        }
    
    }
   
  init(){
    switch(this.cmd2()){
        case 'h':
            console.log('Mongo Transform Help Page');
            break;
        case 'help':
            console.log('Mongo Transform Help Page');
            break;
        case 'man':
            new Man({command: this.cmd2()}).man();
            break;
        case 'method':
             if(this.cmd3()){
                switch(this.cmd3()){
                    case '--list':
                        new Method({command: this.cmd3()}).list();
                        break;
                    case '-n':
                        if(this.cmd4()){
                            if(this.cmd5()){
                              switch(this.cmd5()){
                                case '-i':
                                  new Method({command: this.cmd4()}).i(this.cmd5());
                                  break;
                                case '--info':
                                  new Method({command: this.cmd4()}).info(this.cmd5());
                                  break;
                                default:
                                  console.log(this.cmd5(), 'is not a valid option');
                                  break;
                              }
                            }else{
                              new Method({command: this.cmd3()}).n(this.cmd4());
                            }
                        }else{
                            new Method({command: this.cmd3()}).n();
                        }
                        break;
                    case '--name=':
                        console.log('--name=  choose');
                        break;
                    default: 
                        console.log('invalid argument for method option');
                        break;
                }
             }else{
                new Method({command: this.cmd2()}).method();
             }
            
            break;
        case 'events':
             new Event({command: this.cmd2()}).events();
            break;
        case 'model':
            new Model({command: this.cmd2()}).list();
            break;
        case 'database':
            new Database({command: this.cmd2()}).database();
            break;
        case 'class':
            new MongoTransform({command: this.cmd2()}).mongoTransform();
            break;
        default: 
            this.errorNotification(this.cmd2());
            break;
    }
    
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
    return ["init"];
  }

}

module.exports = new CLI;

