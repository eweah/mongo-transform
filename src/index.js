"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Mongo
 * @kind class
 *
 * @extends Base
 * 
 * @requires Base
 * @requires AsyncAwait
 * @requires Callback
 * @requires AsyncAwait
 * @requires Callback
 * @requires CallbackQuery
 * @requires  CallbackQueryValidator
 * @requires MongoClient
 *
 * @classdesc Mongo class
 */

require("../../../config/Env");

const { MongoClient } = require("mongodb");

const AsyncAwait = require("./AsyncAwait");
const Callback = require("./Callback");
const CallbackQuery = require('./CallbackQuery')
const CallbackQueryValidator = require('./CallbackQueryValidator')

class Mongo extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Mongo);
    // auto invoke methods
    this.autoinvoker(Mongo);
    // add other classes method if methods do not already exists. Argument order matters! (a somewhat multi-inheritance)
    this.methodizer(AsyncAwait, Callback , CallbackQuery, CallbackQueryValidator);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
   * @name init
   * @function
   *
   *
   * @description makes a database connections using database connection environment variables
   *
   * @return does not return anything
   *
   */
  init() {
    if (!this.collection) this.collection = "users";
    if (!this.url) this.url = `${process.env.DATABASE_URL}`;
    if (!this.uri)
      this.uri = `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`;
    if (!this.db) this.db = process.env.DATABASE_NAME;

    this.connect = (fn = () => {}) =>
      MongoClient.connect(
        process.env.DATABASE_URL,
        { useUnifiedTopology: true },
        fn
      );
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

module.exports = Mongo;
