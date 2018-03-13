export default class Validation {

    constructor(validationInfo, validationMethods) {
        this.validationInfo = validationInfo;
        this.validationMethods = validationMethods;

    }

    getValidationMethods(name) {
        
        return Object.keys(this.validationInfo[name]).map(validation => this.validationMethods[validation]);

    }

    validate(fieldName, value) {
        const validationMethoArr = this.getValidationMethods(fieldName);
        for(let i = 0; i< validationMethoArr.length; i++){
            const result = validationMethoArr[i].call(null, value);
            if(result !== ''){
                 return result;
            }
        }
        return '';
    }
}