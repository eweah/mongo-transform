#!/usr/bin/env node 
// const MongoTransform = require('../');
const Man = require('./man');
const Method = require('./method/method');
const Default = require('./default');
const Event = require('./event');
const MongoTransform = require('./MongoTransform');
const Model = require('./model');
const Database = require('./db');

var cmd1 = process.argv[2];
var cmd2 = process.argv[3];
var cmd3 = process.argv[4];
var cmd4 = process.argv[5];
var cmd5 = process.argv[6];
var cmd6 = process.argv[7];

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
    case 'methods':
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
        // new Default({command: arg}).default();
        console.log('You may want to check the man page');
        break;
}
