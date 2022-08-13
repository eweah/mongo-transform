"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module AsyncAwait
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires Env
 * @requires MongoClient
 * @requires ObjectId
 *
 * @classdesc AsyncAwait class
 */

const { MongoClient, ObjectId } = require("mongodb");

require("../config/Env");
class AsyncAwait extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(AsyncAwait);
    // auto invoke methods
    this.autoinvoker(AsyncAwait);
    // add other classes method if methods do not already exists. Argument order matters!
    ///this.methodizer( /** */ );
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
   * @name trimmer
   * @function
   *
   * @param {String} methodName method name string
   * @param {String} error error event name string
   * @param {String} condition condition string
   *
   * @description assigns success and error event names
   *
   * @return {String}  success or error event name
   *
   */
  trimmer(methodName, error, condition = "db-query") {
    const nameString = methodName
      .split(" ")
      .filter((str) => str.trim().length !== 0);
    if (nameString.length == 2) {
      if (error) return `${nameString[1]}-${error}`;
      return nameString[1];
    } else if (nameString.length == 1) {
      if (error) return `${nameString}-${error}`;
      return nameString;
    } else {
      if (error) return `${condition}-${error}`;
      return condition;
    }
  }

  /**
   * @name awaitInsertOne
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Creates/adds/inserts a document in a collection
   *
   * @return {Object}  The result of inserting a document into a database collection
   *
   */

  async awaitInsertOne(
    data = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (data && typeof data !== "object") {
      this.emit("awaitInsertOne-error", {
        error: "input data must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitInsertOne", response);
      return response;
    } catch (error) {
      this.emit("awaitInsertOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitInsertMany
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitInsertMany(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (!data || !Array.isArray(data)) {
      this.emit("awaitInsertMany-error", {
        error: "input data must be an array of objects",
      });
      return { error: "input data must be an array of objects" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitInsertMany", response);
      return response;
    } catch (error) {
      this.emit("awaitInsertMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCreateMany
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitCreateMany(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (!data || !Array.isArray(data)) {
      this.emit("awaitCreateMany-error", {
        error: "input data must be an array of objects",
      });
      return { error: "input data must be an array of objects" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitCreateMany", response);
      return response;
    } catch (error) {
      this.emit("awaitCreateMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCreate
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitCreate(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (data && typeof data !== "object") {
      this.emit("awaitCreate-error", { error: "input data must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitCreate", response);
      return response;
    } catch (error) {
      this.emit("awaitCreate-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFindOne
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches the first document satisfying the input query in a collection
   *
   * @return {Object}  The document object found in a collection as a result of the query search
   *
   */

  async awaitFindOne(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFindOne-error", {
        error: "input query must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne(query);

      this.emit("awaitFindOne", response);
      return response;
    } catch (error) {
      this.emit("awaitFindOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirst
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches the first document satisfying the input query in a collection
   *
   * @return {Object}  The document object found in a collection as a result of the query search
   *
   */
  async awaitFirst(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFirst-error", { error: "input query must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne(query);

      this.emit("awaitFirst", response);
      return response;
    } catch (error) {
      this.emit("awaitFirst-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFind
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitFind(
    query = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFind-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitFind-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).toArray();

      this.emit("awaitFind", response);
      return response;
    } catch (error) {
      this.emit("awaitFind-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitAll
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitAll(
    query = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitAll-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitAll-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).toArray();

      this.emit("awaitAll", response);
      return response;
    } catch (error) {
      this.emit("awaitAll-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitSort
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches and sorts one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitSort(
    query = {},
    sort = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitSort-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (sort && typeof sort !== "object") {
      this.emit("awaitSort-error", { error: "sort query must be an object" });
      return { error: "sort query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitSort-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).sort(sort).toArray();

      this.emit("awaitSort", response);
      return response;
    } catch (error) {
      this.emit("awaitSort-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDeleteOne
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description deletes/removes first occurrence document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document deletion/removal from a collection as a result of the query
   *
   */
  async awaitDeleteOne(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitDeleteOne-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.deleteOne(query);

      this.emit("awaitDeleteOne", response);
      return response;
    } catch (error) {
      this.emit("awaitDeleteOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDeleteMany
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description deletes/removes one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of one or more documents deletion/removal from a collection as a result of the query
   *
   */
  async awaitDeleteMany(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitDeleteMany-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.deleteMany(query);

      this.emit("awaitDeleteMany", response);
      return response;
    } catch (error) {
      this.emit("awaitDeleteMany-error", error);
      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDropCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description drops/deletes/removes a database collection by collection name
   *
   * @return {Object}  the result of dropping a database collection
   *
   */
  async awaitDropCollection(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("waitDropCollection-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.drop();

      if (response) {
        this.emit(
          "awaitDropCollection",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        return `collection ${collectionName} dropped from ${dbName}!`;
      } else {
        this.emit("awaitDropCollection-error", { error: "Nothing happened" });
        return { error: "Nothing happened" };
      }
    } catch (error) {
      this.emit("awaitDropCollection-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCollectionDrop
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description drops/deletes/removes a database collection by collection name
   *
   * @return {Object}  the result of dropping a database collection
   *
   */

  async awaitCollectionDrop(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("awaitCollectionDrop-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const response = await database.dropCollection(collectionName);
      if (response) {
        this.emit(
          "awaitCollectionDrop",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        return `collection ${collectionName} dropped from ${dbName}!`;
      } else {
        this.emit("awaitCollectionDrop-error", { error: "Nothing happened" });
        return { error: "Nothing happened" };
      }
    } catch (error) {
      this.emit("awaitCollectionDrop-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  /**
   * @name awaitCreateCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object} options an object representing a collection schema
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds a collection from optional input schema object
   *
   * @return {Object|Stream}  a database collection
   *
   */
  async awaitCreateCollection(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("awaitCreateCollection-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const response = await database.createCollection(collectionName);

      if (response) {
        this.emit(
          "awaitCreateCollection",
          `collection ${collectionName} created for ${dbName}!`
        );
        return `collection ${collectionName} created for ${dbName}!`;
      } else {
        this.emit("awaitCreateCollection-error", "Nothing happened.");
        return "Nothing happened.";
      }
    } catch (error) {
      this.emit("awaitCreateCollection-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitUpdateOne
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document update from a collection as a result of the query
   *
   */
  async awaitUpdateOne(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdateOne-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    if (data && typeof data !== "object") {
      this.emit("awaitUpdateOne-error", {
        error: "input data must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateOne(query, { $set: data });

      this.emit("awaitUpdateOne", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdateOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    k;
  }

  /**
   * @name awaitUpdate
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document update from a collection as a result of the query
   *
   */

  async awaitUpdate(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdate-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    if (data && typeof data !== "object") {
      this.emit("awaitUpdate-error", { error: "input data must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateOne(query, { $set: data });

      this.emit("awaitUpdate", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdate-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitUpdateMany
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The resulting objects of one or more documents update from a collection as a result of the query
   *
   */
  async awaitUpdateMany(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdate-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }

    if (data && !Array.isArray(data) && typeof data !== "object") {
      this.emit("awaitUpdate-error", {
        error: "input data must be an array or an object",
      });
      return { error: "input data must be an array or an object" };
    }
    if (data && Array.isArray(data)) {
      for (let datum of data) {
        if (typeof datum !== "object") {
          this.emit("awaitUpdate-error", {
            error: "each element of input data must be an object",
          });
          return { error: "each element of input data must be an object" };
        }
      }
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateMany(query, { $set: data });

      this.emit("awaitUpdateMany", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdateMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitLimit
   * @function
   *
   * @param {Object} query query object
   * @param {Number|Integer} limit limiting number for the total number of documents fetched from the collection
   * @param {Object} data new data object as replacement for a collection document
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches/gets all documents satisfying the input query in a collection  and limit the number by input limit
   *
   * @return {Object}  The resulting objects of all documents fetched from a collection as a result of the query
   *
   */
  async awaitLimit(
    query = {},
    limit = 1,
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitLimit-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (limit && !Number.isInteger(limit)) {
      this.emit("awaitLimit-error", {
        error: "limit input must be an integer",
      });
      return { error: "limit input must be an integer" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitLimit-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model
        .find(query, projection)
        .limit(limit)
        .toArray();

      this.emit("awaitLimit", response);
      return response;
    } catch (error) {
      this.emit("awaitLimit-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstById
   * @function
   *
   * @param {Object|String} id the id of the collection document to fetch
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches/gets by id the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by id fetched from a collection as a result of the query
   *
   */
  async awaitFirstById(
    id,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (id && typeof id !== "string" && !Number.isInteger(id)) {
      this.emit("awaitFirstById-error", {
        error: "input id must be a string or a number",
      });
      return { error: "input id must be a string or a number" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);

      const response = await model.findOne({ _id: ObjectId(id) });

      this.emit("awaitFirstById", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstById-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByEmail
   * @function
   *
   * @param {Object|String} email the email of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by email the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by email fetched from a collection as a result of the query
   *
   */
  async awaitFirstByEmail(
    email,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (email && typeof email !== "string") {
      this.emit("awaitFirstByEmail-error", {
        error: "input email must be a string",
      });
      return { error: "input email must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ email });

      this.emit("awaitFirstByEmail", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByEmail-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFindByEmail
   * @function
   *
   * @param {Object|String} email the email of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by email the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by email fetched from a collection as a result of the query
   *
   */
  async awaitFindByEmail(
    email,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (email && typeof email !== "string") {
      this.emit("awaitFindByEmail-error", {
        error: "input email must be a string",
      });
      return { error: "input email must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ email });

      this.emit("awaitFindByEmail", response);
      return response;
    } catch (error) {
      this.emit("awaitFindByEmail-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByUsername
   * @function
   *
   * @param {Object|String} username the username of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by username the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by username fetched from a collection as a result of the query
   *
   */

  async awaitFirstByUsername(
    username,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (username && typeof username !== "string") {
      this.emit("awaitFirstByUsername-error", {
        error: "input username must be a string",
      });
      return { error: "input username must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ username });

      this.emit("awaitFirstByUsername", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByUsername-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByFirstName
   * @function
   *
   * @param {Object|String} firstname the firstname of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by firstname the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by firstname fetched from a collection as a result of the query
   *
   */

  async awaitFirstByFirstName(
    firstname,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (firstname && typeof firstname !== "string") {
      this.emit("awaitFirstByFirstName-error", {
        error: "input first name must be a string",
      });
      return { error: "input first name must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ firstname });

      this.emit("awaitFirstByFirstName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByFirstName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByLastName
   * @function
   *
   * @param {Object|String} lastname the lastname of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by lastname the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by lastname fetched from a collection as a result of the query
   *
   */

  async awaitFirstByLastName(
    lastname,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (lastname && typeof lastname !== "string") {
      this.emit("awaitFirstByLastName-error", {
        error: "input last name must be a string",
      });
      return { error: "input last name must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ lastname });

      this.emit("awaitFirstByLastName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByLastName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByPhone
   * @function
   *
   * @param {Object|String} phone the phone of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by phone the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by phone fetched from a collection as a result of the query
   *
   */

  async awaitFirstByPhone(
    phone,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.url, { useUnifiedTopology: true })
  ) {
    if (phone && typeof phone !== "string") {
      this.emit("awaitFirstByLastName-error", {
        error: "input phone must be a string",
      });
      return { error: "input phone must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ phone });

      this.emit("awaitFirstByLastName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByLastName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  initAsyncAwaitConfig() {
    if (!this.collection) this.collection = "users";
    if (!this.url) this.url = process.env.DATABASE_URL;
    if (!this.db) this.db = process.env.DATABASE_NAME;
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
    return ["initAsyncAwaitConfig"];
  }
}

module.exports = AsyncAwait;
