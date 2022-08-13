#!/usr/bin/env node 
var mongoTransform = require('../');
var arg = process.argv[2];
switch(arg){
    case '-h':
        console.log('Mongo Transform Help Page');
        break;
    case '--help':
        console.log('Mongo Transform Help Page');
        break;
    default: 
        console.log('You may check the Mongo Transform Help Page');
        break;
}