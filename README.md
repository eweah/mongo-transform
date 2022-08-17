# Mongo Transform
### [Mongo Transform](git@github.com:eweah/mongo-transform.git "Wonderful Piza Menu")
A fluent and simple yet powerful wrapper for mongodb. Very easy to use yet extremely powerful. As powerful as mongodb itself!

### dependencies
 ```javascript
   mongodb
```
### installation
1. npm install:
 ```javascript
  npm install mongo-transform
```
or 
  ```javascript
  yarn add mongo-transform
 ```
 
2. usage:
```javascript
// Instantiate MongoTransform Class
 const MongoTransform = require('mongo-transform');
 const User = new MongoTransform({collection: 'users'});

// get all users 
 User.all();
 User.on('all', console.log(users));
 User.on('all-error', error => console.log(error));


 // Get all users using promises 
 const getAllUsers = async () => await awaitAll();
 const users = getAllUsers();
 // You may also do this after doing the above 
 User.on('awaitAll', users => console.log(users));
 User.on('awaitAll-error', error => console.error(error))
```





