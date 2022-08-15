create(data = {}, collectionName = this.collection) {
    this.on("validatedData", () => {
      this.createCallback(data, collectionName);
    });
    this.validateData(data, "create-error");
  }