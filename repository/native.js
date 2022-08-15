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
 

const methodInfo = (inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator) => {
        const method = findMethod(inputMethod, callback);
        if(!method || method == undefined) return;
        const validator  = findValidator(method)
        const methodCallback = findMethod(`${inputMethod}Callback`, callbackQuery);
        const methodValidator = findMethod(validator, callbackQueryValidator);

        let methodValidatorString = methodValidator.replace(validator, `\x1b[33m${validator}\x1b[0m`);
        let methodCallbackString = methodCallback.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m` )
        // method string:
        let methodString = method;//`\x1b[36m${method}\x1b[0m`
        
        let callbackArgumentIndex = methodString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
         let callbackArgumentString = '';
         for(let i = callbackArgumentIndex; i < methodString.length; i++){
             callbackArgumentString += methodString[i];
             if(methodString[i] === '.') break;
         }
         callbackArgumentString = callbackArgumentString;
         methodString = methodString.replace(callbackArgumentString,`\x1b[36m${callbackArgumentString}\x1b[0m`)


         let validatorArgumentIndex = methodString.indexOf(validator) + validator.length;
         let validatorArgumentString = '';
         for(let i = validatorArgumentIndex; i < methodString.length; i++){
             validatorArgumentString += methodString[i];
             if(methodString[i] === '}') break;
         }
         validatorArgumentString = validatorArgumentString;
         methodString = methodString.replace(validatorArgumentString,`\x1b[36m${validatorArgumentString}\x1b[0m`)



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
         methodBodyString = methodBodyString;
         methodString = methodString.replace(methodBodyString,`\x1b[36m${methodBodyString}\x1b[0m`)
         methodString = methodString.replace(validator, `\x1b[33m${validator}\x1b[0m`);
        methodString = methodString.replace(`${inputMethod}Callback`, `\x1b[32m${inputMethod}Callback\x1b[0m`);
        console.log(methodString)


        const methodCallbackStringIndex = methodCallbackString.indexOf(`${inputMethod}Callback`) + `${inputMethod}Callback`.length;
        let slice2 = methodCallbackString.slice(methodCallbackStringIndex).slice(1).slice(1).slice(1).slice(1);
        methodCallbackString = methodCallbackString.replace(slice2, `\x1b[36m${slice2}\x1b[0m`)
        console.log(methodCallbackString);

        const methodValidatorStringIndex = methodValidatorString.indexOf(validator) + validator.length;
        let sliced = methodValidatorString.slice(methodValidatorStringIndex).slice(1).slice(1).slice(1).slice(1);
        methodValidatorString = methodValidatorString.replace(sliced, `\x1b[36m${sliced}\x1b[0m`)
        console.log(methodValidatorString);


    
        //  methodString = methodString.replace(partialString, `\x1b[36m${partialString}\x1b[0m` )
         
        //  return `\x1b[36m${partialString}\x1b[0m`
       
        //  return `\x1b[36m(data, collectionName);
        // });
        // this.\x1b[0m`
        //  console.log(partialString);
        // console.log(index);
        // methodString = methodString.replace('this',`\x1b[36mthis\x1b[0m`)
        // let final = methodString.split(validator).join('').split(`${inputMethod}Callback`).join('');
        // return console.log(`\x1b[36m${final}\x1b[0m`)
   
        
//  ${methodCallbackString}
//${methodValidatorString}
        // return `
        // ${methodString}
        // --------------------------------------------------------------------
        // `;
}

const methodColoring = (string = 'string') => {
    let methodInfoString = methodInfo(string)
    let index = methodInfoString.indexOf(string)
    let methodString = '';
    let finalString; 
    for(let i = index   ; i <  methodInfoString.length; i++){
        if(methodInfoString[i] === '(') break;
        methodString += methodInfoString[i];
    }

     if(methodString && methodString.length > 0){
            finalString = methodInfoString.replace(methodString, `\x1b[36m${methodString}\x1b[0m`)
     }
    //\x1b[36m DESCRIPTION\x1b[0m
    console.log(finalString);

}


methodInfo('deleteMany');







 