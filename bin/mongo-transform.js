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
 const Event = require('./event');
 const MongoTransform = require('./MongoTransform');
 const Model = require('./model');
 const Database = require('./db');
 const Schema = require('./schema');
 const Migration = require('./migration');
 const Migrate  = require('./migration/migrate')
 const errorNotification = require('./notifications/errors');
 
 const { spawn } = require('node:child_process');
 const {join} = require('path');
const ErrorNotification = require('./notifications/errors');
 

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

  commands(index = 0){return process.argv[index];}
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
    switch(this.commands(2)){
        case 'h':
            console.log('Mongo Transform Help Page');
            break;
        case 'help':
            console.log('Mongo Transform Help Page');
            break;
        case 'man':
            new Man({command: this.commands(2)}).man();
            break;
        case 'method':
             if(this.commands(3)){
                switch(this.commands(3)){
                    case '--list':
                        new Method({command: this.commands(3)}).list();
                        break;
                    case '-n':
                        if(this.commands(4)){
                            if(this.commands(5)){
                              switch(this.commands(5)){
                                case '-i':
                                  new Method({command: this.commands(4)}).i(this.commands(5));
                                  break;
                                case '--info':
                                  new Method({command: this.commands(4)}).info(this.commands(5));
                                  break;
                                default:
                                  console.log(this.commands(5), 'is not a valid option');
                                  break;
                              }
                            }else{
                              new Method({command: this.commands(3)}).n(this.commands(4));
                            }
                        }else{
                            new Method({command: this.commands(3)}).n();
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
                new Method({command: this.commands(2)}).method();
             }
            
            break;
        case 'events':
             new Event({command: this.commands(2)}).events();
            break;
        case 'model':
            new Model({command: this.commands(2)}).list();
            break;
        case 'database':
            new Database({command: this.commands(2)}).database();
            break;
        case 'class':
            new MongoTransform({command: this.commands(2)}).mongoTransform();
            break;
        case 'make:model':
           if(this.commands(3)){
            const  {make} =  new Model({command: this.commands(2)})
            make(this.commands(3));
           }else{
            console.log('make:model command');
           }
           
            break;
        case 'make:schema':
          if(this.commands(3)){
            const  {makeSchema, hasType} =  new Schema({command: this.commands(2)})
            if(this.commands(4)){
                if(hasType(this.commands(4))){
                  makeSchema(this.commands(3), this.commands(4));
                }else{
                  console.log(`invalid argument for make:schema ${this.commands(3)}`);
                }
              
            }else{
              makeSchema(this.commands(3));
            }
        
           }else{
            console.log('make:schema command');
           }
            break;
        case 'make:migration':
          // return console.log(this.commands(3), this.commands(4))
          if(this.commands(3)){
            const {makeMigration} = new Migration({command: this.commands(3)})
            if(this.commands(4)){
             makeMigration(this.commands(3), this.commands(4));
            }else{
              makeMigration(this.commands(3));
            }
           
          }else{
            console.log(`command missing argument: --schema=<Schema Name>`);
          }
            // const {makeMigration} = new Migration({command: this.commands(2)});
            // makeMigration(this.commands(2));
            break;
        case 'migrate':
            const {migrate} = new Migrate({command: this.commands(2)})
            migrate()
            break;
        default: 
            const {simpleNotification} = new ErrorNotification({command: this.commands(2)});
            simpleNotification(this.commands(2));
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

