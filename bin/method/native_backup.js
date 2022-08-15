exports.create = ()=> `\x1b[36m create(data = {}, collectionName = this.collection) {
    this.on("validatedData", () => {
        this.\x1b[32mcreateCallback\x1b[0m\x1b[36m(data, collectionName)\x1b[0m\x1b[36m;\x1b[0m
    \x1b[36m});\x1b[0m
    \x1b[36mthis.\x1b[0m\x1b[33mvalidateData\x1b[0m\x1b[36m(data, "create-error");\x1b[0m
  \x1b[36m}\x1b[0m \x1b[0m 

 --------------------------------------------------------------
 \x1b[32mcreateCallback\x1b[0m\x1b[36m(data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
        if (error) {
            db.close();
            return this.emit("create-error", error);
        }
        const dbs = db.db(this.db);

        const cfn = (err, res) => {
            if (err) {
              db.close();
              return this.emit("create-error", err);
            }
    
            this.emit("create", res);
    
            db.close();k
          };
          dbs.collection(collectionName).insertOne(data, cfn);
        };
        this.connect(dbfn);
 }\x1b[0m 
 
 \x1b[33mvalidateData\x1b[0m\x1b[36m(data = {}, event = "find") {
    if (data && typeof data !== "object")
        return this.emit(event, { error: "input data must an object" });
    return this.emit("validatedData");
 }\x1b[0m

        
  
  `