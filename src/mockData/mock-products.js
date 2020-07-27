import {AsyncStorage} from "react-native";
import {parseCategories} from "./mock-categories";


export const addProduct = async (name, prise, date, category)=>{
    let result =  await AsyncStorage.getItem('products');
    let products = await parseCategories(result)
    let isUniqueName = products.filter(item=>item.name===name).length===0
    if(isUniqueName){
        products.push({
            name,
            prise,
            date,
            category
        });
        let res = JSON.stringify(products)
        await AsyncStorage.setItem('products', res);
    }else {
        throw new Error('Product name should be unique')
    }
}
export const updateProduct = async (prevName, name, prise, date, category)=>{
    let result =  await AsyncStorage.getItem('products');
    let products = await parseCategories(result)
    let isUniqueName = products.filter(item=>item.name===name).length===0
    if(isUniqueName){
        let updatedProducts = products.map(item=>item.name===prevName?{
            name, prise, date, category
        }:item)
        let request = JSON.stringify(updatedProducts);
        await AsyncStorage.setItem('products', request);
    }else {
        throw new Error('Product name should be unique')
    }
}

export const removeProduct = async (name)=>{
    let result =  await AsyncStorage.getItem('products');
    let products = await parseCategories(result)
    let newProducts = products.filter(item=>item.name!==name)
    let request = JSON.stringify(newProducts);
    await AsyncStorage.setItem('products', request);
}
export const getAllProducts = async ()=>{
    return await AsyncStorage.getItem('products');
}