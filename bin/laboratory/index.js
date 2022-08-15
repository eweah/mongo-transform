const MongoTransform = require('../../index')
const mongo = new MongoTransform
const crt = mongo.create;

console.log(crt.toString())