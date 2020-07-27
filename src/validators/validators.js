export const textLengthValidator = (value, min, max)=>{
    const result = value.length<max && value.length>min;
    return {
        isValid:result,
        message:result?'':`Length of this field should be more then ${min} and less then ${max}`
    }
}
export const moreOrEqualValidator = (value, min)=>{
    const result = value>=min;
    return {
        isValid:result,
        message:result?'':`Value should be more or equal ${min}`
    }
}
export const textIsNumberValidator = (text)=>{
    const result = !(text.replace(/\s/g, '').length === 0 || isNaN(text));
    return {
        isValid:result,
        message:result?'':`Wrong format`
    }
}
export const expirationValidator = (value)=>{
    const regExpResult = value.match(/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[012])\.(\d{4})$/);
    let result=false;
    if(!!regExpResult){
        let date = new Date(regExpResult[3], regExpResult[2]-1, regExpResult[1])
        let now = new Date()
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        result=today<date;
    }

    return {
        isValid:!!result,
        message:!!result?'':`Wrong expiration date`
    }
}
