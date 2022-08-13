"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Event
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Event class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

class Event extends require("./base"){
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Event);
    // auto invoke methods
    this.autoinvoker(Event);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  eventCommands(){
    return {
        man: "Command Line Interface (CLI) Manual",
        help: 'Alias of the "man" command',
        exit: "Kill the CLI and the rest of the application",
        quit: "Kill the CLI and the rest of the application",
        stats:
          "Manual for the statistics of the underlying operating system and resource utilization",
        users: "Manual for interacting with registered users in the system",
        login: "Login as an admin",
        logout: "Logout as an admin",
        orders: "Manual for interacting with orders in the system",
      };
  }
  events(){
    if (this.command === "events") {
        console.clear();
        // if (command.length !== 8)
        //   return this.emit("error", {
        //     error: `'${string}' is not command.`,
        //   });

       

        let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mhelp\x1b[0m - Alias of the "man" command 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mhelp\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36mhelp\x1b[0m|\x1b[36morders\x1b[0m|\x1b[36musers\x1b[0m|\x1b[36mexit\x1b[0m|\x1b[36mquit\x1b[0m|\x1b[36mleave\x1b[0m|\x1b[36mlogin\x1b[0m|\x1b[36mlogout\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
    Command Line Interface (CLI) Manual.
 `;

        this.centered(`\x1b[32mHELP COMMANDS AND USAGE MANUAL\x1b[0m`);

        this.description(centered);

        this.verticalSpace(2);

        let options = {
          pad: 22,
          position: process.stdout.columns,
          hline: false,
          keyColor: "36",
          valueColor: "37",
        };
        this.texAligner(options, this.eventCommands());
        console.log();
      }
  }
  addDefault() {
    if (!this.createWriteStream) this.createWriteStream = createWriteStream;
    if (!this.createReadStream) this.createReadStream = createReadStream;
    if (!promises) this.promises = promises;
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
    return ["addDefault"];
  }


}

module.exports = Event;
