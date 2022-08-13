#!/usr/bin/env node 
const MongoTransform = require('../');
const CLI = require('./cli');

var arg = process.argv[2];
switch(arg){
    case '-h':
        console.log('Mongo Transform Help Page');
        break;
    case '--help':
        console.log('Mongo Transform Help Page');
        break;
    case 'man':
         new CLI;
        break;
    default: 
        console.log('You may check the Mongo Transform Help Page');
        break;
}
