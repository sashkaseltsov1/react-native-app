import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SimpleTextInput from "../components/TextInput";
import SimpleButton from "../components/Button";
import Error from "../components/Error";
import {getAllCategories, parseCategories} from "../mockData/mock-categories";
import {
    expirationValidator,
    moreOrEqualValidator, textIsNumberValidator,
    textLengthValidator
} from "../validators/validators";
import SimplePicker from "../components/Picker";
import {addProduct, updateProduct} from "../mockData/mock-products";



export default function ProductForm({navigation, route}) {
    const isCreateMode = route.params.mode==='CREATE';
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState(isCreateMode?'':route.params.data.date);
    const [name, setName] = useState(isCreateMode?'':route.params.data.name);
    const [prise, setPrise] = useState(isCreateMode?'':route.params.data.prise);
    const [nameError, setNameError] = useState('');
    const [priseError, setPriseError] = useState('');
    const [dateError, setDateError] = useState('');
    const [mainError, setMainError] = useState('');
    useEffect(()=>{
        getCategories().then()
    },[])
    const getCategories = async ()=>{
        const res = await getAllCategories()
        const categories = parseCategories(res).reverse()
        setCategories(categories)
        if(categories.length){
            setSelectedCategory(isCreateMode?categories[0]:route.params.data.category)
        }

    }

    const inputHandler = (text, setText, setError, error)=>{
        if(mainError) setMainError('')
        if (error) setError('');
        setText(text)
    }
    const handleSubmit = async ()=>{
        let res = textLengthValidator(name, 5, 40)
        if(!res.isValid) return setNameError(res.message)
        res = textIsNumberValidator(prise)
        if(!res.isValid) return setPriseError(res.message)
        res = moreOrEqualValidator(prise, 0)
        if(!res.isValid) return setPriseError(res.message)
        res = expirationValidator(date)
        if(!res.isValid) return setDateError(res.message)
        if(!selectedCategory) return setMainError('Invalid category')
        try {
            if(isCreateMode){
                await addProduct(name, prise, date, selectedCategory)
            } else {
                await updateProduct(route.params.data.name,name, prise, date, selectedCategory)
            }

            navigation.navigate('Items')
            alert(`Product successfully ${isCreateMode?'created':'updated'}`)
        }catch (e) {
            setMainError(e.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name:</Text>
            <SimpleTextInput onChangeText={text=>inputHandler(text, setName, setNameError, nameError)}
                             placeholder={'Enter product name...'}
                             error={nameError}
                             onSubmitEditing={handleSubmit}
                             value={name} />
            {!!nameError && <Error message={nameError}/>}
            <Text style={styles.text}>Prise:</Text>
            <SimpleTextInput onChangeText={text=>inputHandler(text, setPrise, setPriseError, priseError)}
                             onSubmitEditing={handleSubmit}
                             placeholder={'Enter product prise...'}
                             value={prise}/>
            {!!priseError && <Error message={priseError}/>}
            <Text style={styles.text}>Expiration date</Text>
            <SimpleTextInput onChangeText={text=>inputHandler(text, setDate, setDateError, dateError)}
                             onSubmitEditing={handleSubmit}
                             placeholder={'Date format: DD.MM.YYYY'}
                             value={date}/>
            {!!dateError && <Error message={dateError}/>}
            <Text style={styles.text}>Choose category of product:</Text>
            <SimplePicker selectedItem={selectedCategory}
                          setSelectedItem={setSelectedCategory}
                          data={categories}/>
            <SimpleButton
                bgStyle={[styles.button, {backgroundColor:isCreateMode?'seagreen':'cornflowerblue'}]}
                title={isCreateMode?'Create':'Update'}
                handler={handleSubmit}/>
            {!!mainError && <Error message={mainError}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    text:{
        marginBottom:10
    },
    button:{
        width:200,
        borderRadius:3
    },
});