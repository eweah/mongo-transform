#!/usr/bin/env node 
const MongoTransform = require('../');
const Man = require('./man');

var arg = process.argv[2];
switch(arg){
    case 'h':
        console.log('Mongo Transform Help Page');
        break;
    case 'help':
        console.log('Mongo Transform Help Page');
        break;
    case 'man':
         const manPage = new Man({command: arg});
         manPage.man();
        break;
    case 'methods':
            console.log('methods');
        break;
    default: 
        console.log('You may check the Mongo Transform Help Page');
        break;
}
