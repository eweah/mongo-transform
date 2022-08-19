'use strict';
/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base  which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/
const MongoTransform = require('mongo-transform');

 class User extends MongoTransform{

    constructor(...options){
        super({collection: 'users'});
        options.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach(key => {
                    if(!this[key]) this[key] = option[key];
                })
            }
        })
    }
 }

 module.exports = User;
