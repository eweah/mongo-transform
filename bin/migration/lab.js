const { createReadStream, createWriteStream, promises } = require("fs");
const {join } = require('node:path');
const {existsSync, lstatSync} = require('fs');

filePath = (path =  './') => join('../../mongo-transform/schemas', path)
const getFiles = async path => {
    // return console.log('../../mongo-transform/schemas');
    try{
        
        const files = await promises.readdir(filePath(path));
        for(let file of files){
            if((await promises.lstat(join(filePath(path), file))).isFile()){
               console.log(join(filePath(path), file))
            }
            if((await promises.lstat(join(filePath(path), file))).isDirectory()){
                getFiles(join(filePath(path), file))
            }

        }
    }catch(error){
        console.log(error)
    }
}

getFiles()
