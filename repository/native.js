const Callback = require('../src/models/Callback.js');
const CallbackQuery = require('../src/models/CallbackQuery');
const CallbackQueryValidator = require('../src/models/CallbackQueryValidator');

const findMethod = (method = 'method', ClassName) => ClassName.prototype[method] ? ClassName.prototype[method].toString() : undefined
const findValidator = (method = 'method') => {
    let index = method.indexOf('.validate');
    let str = '';
    for(let i = index   ; i <  method.length; i++){
        if(method[i] === '(') break;
        str += method[i];
    }
    return str.slice(1)
}




const methodInfo = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
        const method = findMethod(inputMethod, callback);
        if(!method || method == undefined) return;
        const validator  = findValidator(method)
        const methodCallback = findMethod(`${inputMethod}Callback`, callbackQuery);
        const methodValidator = findMethod(validator, callbackQueryValidator);
        console.log(method);
        console.log('--------------------------------------------------------------------');
        console.log(methodCallback);
        console.log(methodValidator);
   
}

methodInfo('updateMany');







 