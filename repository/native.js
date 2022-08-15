const Callback = require('../src/models/Callback.js');
const CallbackQuery = require('../src/models/CallbackQuery');
const CallbackQueryValidator = require('../src/models/CallbackQueryValidator');




const getMethod = (method = 'method', ClassName) => Reflect.has(ClassName.prototype, method) ? Reflect.get(ClassName.prototype, method).toString(): undefined
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
const colorMethodMethodBodyString = (methodString, inputMethod) => {
    let methodBodyIndex = methodString.indexOf(inputMethod) 
     let methodBodyString = '';
     let dotCount = 0;
     for(let i = methodBodyIndex; i < methodString.length; i++){
         methodBodyString += methodString[i];
         if(methodString[i] === '.') {
            dotCount++
         }
         if(dotCount >= 3) break;
     }

     return methodBodyString;
}
const colorMethodCallbackArgumentString = (methodString, inputMethod) => {
    let callbackArgumentIndex = methodString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
    let callbackArgumentString = '';
    for(let i = callbackArgumentIndex; i < methodString.length; i++){
        callbackArgumentString += methodString[i];
        if(methodString[i] === '.') break;
    }

    return callbackArgumentString;
}
 
const colorMethod = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
    const method = findMethod(inputMethod, callback);
    if(!method || method == undefined) return;
    const validator  = findValidator(method)

    let methodString = method;//`\x1b[36m${method}\x1b[0m`
        
    // let callbackArgumentIndex = methodString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
    //  let callbackArgumentString = '';
    //  for(let i = callbackArgumentIndex; i < methodString.length; i++){
    //      callbackArgumentString += methodString[i];
    //      if(methodString[i] === '.') break;
    //  }
    let callbackArgumentString = colorMethodCallbackArgumentString(methodString, inputMethod);

     methodString = methodString.replace(callbackArgumentString,`\x1b[36m${callbackArgumentString}\x1b[0m`)

     let validatorArgumentIndex = methodString.indexOf(validator) + validator.length;
     let validatorArgumentString = '';
     for(let i = validatorArgumentIndex; i < methodString.length; i++){
         validatorArgumentString += methodString[i];
         if(methodString[i] === '}') break;
     }
    //  validatorArgumentString = validatorArgumentString;
     methodString = methodString.replace(validatorArgumentString,`\x1b[36m${validatorArgumentString}\x1b[0m`)



    // let methodBodyIndex = methodString.indexOf(inputMethod) 
    //  let methodBodyString = '';
    //  let dotCount = 0;
    //  for(let i = methodBodyIndex; i < methodString.length; i++){
    //      methodBodyString += methodString[i];
    //      if(methodString[i] === '.') {
    //         dotCount++
    //      }
    //      if(dotCount >= 3) break;
    //  }
    let methodBodyString = colorMethodMethodBodyString(methodString, inputMethod);
     methodString = methodString.replace(methodBodyString,`\x1b[36m${methodBodyString}\x1b[0m`)
     methodString = methodString.replace(validator, `\x1b[33m${validator}\x1b[0m`);
    methodString = methodString.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m`);
    console.log('')
    console.log(methodString)
    console.log('----------------------------------------------------')
}
const colorMethodCallback = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
    const methodCallback = findMethod(`${inputMethod}Callback`, callbackQuery);
    let methodCallbackString = methodCallback.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m` )
    const methodCallbackStringIndex = methodCallbackString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
    let slice2 = methodCallbackString.slice(methodCallbackStringIndex).slice(1).slice(1).slice(1).slice(1);
    methodCallbackString = methodCallbackString.replace(slice2, `\x1b[36m${slice2}\x1b[0m`)
    console.log(methodCallbackString);
    console.log('')
}
const colorValidator = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
    const method = findMethod(inputMethod, callback);
    if(!method || method == undefined) return;
    const validator  = findValidator(method)
    // const methodCallback = findMethod(`${inputMethod}Callback`, callbackQuery);
    const methodValidator = findMethod(validator, callbackQueryValidator);

    let methodValidatorString = methodValidator.replace(validator, `\x1b[33m${validator}\x1b[0m`);
    const methodValidatorStringIndex = methodValidatorString.indexOf(validator) + validator.length;
    let sliced = methodValidatorString.slice(methodValidatorStringIndex).slice(1).slice(1).slice(1).slice(1);
    methodValidatorString = methodValidatorString.replace(sliced, `\x1b[36m${sliced}\x1b[0m`)
    console.log(methodValidatorString);
}
const methodInfo = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
    colorMethod(inputMethod);
    colorMethodCallback(inputMethod);
    colorValidator(inputMethod, callback);
        
        
}




methodInfo('create');







 