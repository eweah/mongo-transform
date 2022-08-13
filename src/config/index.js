"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.801.671.7159>
 *
 * @module Config
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Config class
 */

require("./.env");
class Config extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Config);
    // auto invoke methods
    this.autoinvoker(Config);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = Config;
