export const textLengthValidator = (value, min, max)=>{
    const result = value.length<max && value.length>min;
    return {
        isValid:result,
        message:result?'':`Length of this field should be more then ${min} and less then ${max}`
    }
}