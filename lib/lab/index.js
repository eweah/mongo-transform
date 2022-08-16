

const methodize = (source = {}, destination = {}) => {
    for(let el in source){
        if(source[el] && source[el] !== undefined && source[el] !== null){
            if(!destination.hasOwnProperty(el)){
                destination[el] = source[el];
            }
        } 
    }
    return destination;
}

const {parse} = require('url');
let url = parse('https://www.google.com/api/users');

let data = JSON.stringify({});
const options = {
    hostname: url.hostname,
    path: url.path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
 }
 let  headers = {
    'Content-Type': 'application/json',
    'Content-Length': data.length
}
 const option = {...url, method: 'POST', headers}
console.log(option);
