import React, {useState} from 'react';
import { StyleSheet, View,ScrollView} from 'react-native';
import Category from "../components/Category";
import SimpleTextInput from "../components/TextInput";
import SimpleButton from "../components/Button";
import Error from "../components/Error";
import {addCategory, getAllCategories, parseCategories} from "../mockData/mock-categories";
import {textLengthValidator} from "../validators/validators";
import {useFocusEffect} from "@react-navigation/native";


export default function Categories() {
    const [text, onChangeText] = useState('')
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            getCategories().then()
            return () => {
                onChangeText('')
                setError('')
            }
        }, [])
    );
    const getCategories = async ()=>{
        const res = await getAllCategories()
        const categories = parseCategories(res).reverse()
        setCategories(categories)
    }
    const onChangeTextHandler = (val)=>{
        if (error) setError('');
        onChangeText(val)
    }
    const addNewCategory = async ()=>{
        const res = textLengthValidator(text, 4,20);
        if(res.isValid){
            try {
                await addCategory(text)
                await getCategories()
                onChangeText('')
            }catch (e) {
                setError(e.message)
            }
        }else{
            setError(res.message)
        }
    }
    return (
        <ScrollView>
            <View style={styles.inputContainer}>
                <SimpleTextInput value={text}
                                 onChangeText={(text)=>{onChangeTextHandler(text)}}
                                 style={styles.input}
                                 error={error}
                                 placeholder={'Enter new category...'}
                                 onSubmitEditing={addNewCategory}/>
                <SimpleButton title={'Add'}
                              handler={addNewCategory}
                              bgStyle={styles.button}
                              textStyle={styles.buttonText}/>
            </View>
            {!!error&&<Error message={error}/>}
            {categories.map(item=><Category item={item} key={item} getCategories={getCategories}/>)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        height:50,
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:10,
    },
    input:{
        paddingLeft:10,
        paddingRight:10,
        height: 30,
        flex:2,
        borderWidth: 1,
        borderRadius:3
    },
    button:{
        height:30,
        backgroundColor:'cornflowerblue',
        marginLeft:10,
        flex:1,
        borderRadius:3
    },
    buttonText:{
        paddingLeft : 10,
        paddingRight : 10,
        lineHeight:30,
        color:'#fff',
        textAlign:'center',
    },

});

