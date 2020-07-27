import {AsyncStorage} from "react-native";

export const parseCategories = (res)=>{
    let result;
    if(res){
        result=JSON.parse(res)
    }else{
        result=[]
    }
    return result
}
export const addCategory = async (name)=>{
    let result =  await AsyncStorage.getItem('categories');
    let categories = await parseCategories(result)
    let isUniqueName = categories.filter(item=>item===name).length===0
    if(isUniqueName){
        categories.push(name);
        let request = JSON.stringify(categories);
        await AsyncStorage.setItem('categories', request);
    }else {
        throw new Error('Category name should be unique')
    }
}
export const updateCategory = async (prevName, newName)=>{
    let result =  await AsyncStorage.getItem('categories');
    let categories = parseCategories(result)
    let isUniqueName = categories.filter(item=>item===newName).length===0
    if(isUniqueName){
        let updatedCategories = categories.map(item=>item===prevName?newName:item)
        let request = JSON.stringify(updatedCategories);
        await AsyncStorage.setItem('categories', request);
        await updateCategoryOfProducts(prevName, newName)
    }else {
        throw new Error('This category already exists')
    }
}

const updateCategoryOfProducts = async (name, newName)=>{
    let result =  await AsyncStorage.getItem('products');
    let products = parseCategories(result)
    let newProducts = products.map(product=>product.category===name?{
        ...product, category:newName
    }:product)
    let request = JSON.stringify(newProducts);
    await AsyncStorage.setItem('products', request);

}

export const removeCategory = async (name)=>{
    let result =  await AsyncStorage.getItem('categories');
    let categories = parseCategories(result)
    let newCategories = categories.filter(item=>item!==name)
    let request = JSON.stringify(newCategories);
    await AsyncStorage.setItem('categories', request);
    await updateCategoryOfProducts(name, newCategories[0]?newCategories[0]:null)
}
export const getAllCategories = async ()=>{
    return await AsyncStorage.getItem('categories');
}