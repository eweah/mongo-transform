#!/usr/bin/env node 
// const MongoTransform = require('../');
const Man = require('./man');
const Method = require('./method/method');
const Default = require('./default');
const Event = require('./event');
const MongoTransform = require('./MongoTransform');
const Model = require('./model');
const Database = require('./db');
const util = require('node:util');
const { exec, spawn } = require('node:child_process');
exec(`echo -e \x1b[31m InvalidCommand: is not a valid command\x1b[0m `);
// const exec = util.promisify(require('node:child_process').exec);
// async function run(command) {
//     const { stdout, stderr } = await exec(`echo -e \x1b[31m ${command}: is not a valid command\x1b[0m `);
//     console.log('stdout:', stdout);
//     console.error('stderr:', stderr);
//   }


 

var cmd1 = process.argv[2];
var cmd2 = process.argv[3];
var cmd3 = process.argv[4];
var cmd4 = process.argv[5];
var cmd5 = process.argv[6];
var cmd6 = process.argv[7];

const invalidCommand = (command = 'command') => `
----------------------------------------------------
|${command}----------------------------------------------------`



const errorNotification = (command) => {
    let ls
    if(command.length > 18){
        ls = spawn('echo', ['', `\x1b[5m\x1b[31m '${command.slice(0,18)}...' is not a valid command.\x1b[0m\x1b[0m`]);
    }else{
        ls = spawn('echo', ['', `\x1b[5m\x1b[31m '${command.slice(0,18)}' is not a valid command.\x1b[0m\x1b[0m`]);
    }

    ls.stdout.on('data', (data) => {
        if(command !== undefined){
            console.log(invalidCommand(data));
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
    
    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    ls.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    })
    
    
    }
for(let i = 2; i < process.argv.length; i++){
    console.log(process.argv[i]);
}
switch(cmd1){
    case 'h':
        console.log('Mongo Transform Help Page');
        break;
    case 'help':
        console.log('Mongo Transform Help Page');
        break;
    case 'man':
        new Man({command: cmd1}).man();
        break;
    case 'method':
        new Method({command: cmd1}).methods();
        break;
    case 'events':
         new Event({command: cmd1}).events();
        break;
    case 'model':
        new Model({command: cmd1}).list();
        break;
    case 'database':
        new Database({command: cmd1}).database();
        break;
    case 'class':
        new MongoTransform({command: cmd1}).mongoTransform();
        break;
    default: 
        errorNotification(cmd1);
        break;
}
