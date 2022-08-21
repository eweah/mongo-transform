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
const Schema  = require('../../src/schema');

const {makeSchema}  = new Schema;

 module.exports = makeSchema("posts",{

  property: "string|min:2|max:10",

 }, "object") ;
