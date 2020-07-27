import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SimpleTextInput from "./TextInput";
import SimpleButton from "./Button";
import Error from "./Error";
import {removeCategory, updateCategory} from "../mockData/mock-categories";
import {textLengthValidator} from "../validators/validators";

const Category = (props) => {
    const [isEditMode, setMode] = useState(false)
    const [text, onChangeText] = useState(props.item);
    const [error, setError] = useState('');
    const updateCategoryHandler = async () => {
        const res = textLengthValidator(text, 4, 20);
        if (res.isValid) {
            try {
                await updateCategory(props.item, text)
                await props.getCategories()

            } catch (e) {
                setError(e.message)
            }
        } else {
            setError(res.message)
        }
    }
    const removeCategoryHandler = async () => {
        await removeCategory(props.item)
        await props.getCategories()
    }
    const onChangeTextHandler = (val) => {
        if (error) setError('');
        onChangeText(val)
    }

    return <View style={styles.container}>
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setMode(!isEditMode)}
            underlayColor='#fff'>
            <Text style={styles.text}>{props.item}</Text>
        </TouchableOpacity>
        {isEditMode && <View style={styles.editContainer}>
            <SimpleTextInput value={text}
                             onSubmitEditing={() => updateCategoryHandler()}
                             onChangeText={onChangeTextHandler}
                             style={styles.input}/>
            <SimpleButton title={'Update'}
                          handler={updateCategoryHandler}
                          bgStyle={[styles.button, styles.uButton]}
                          textStyle={styles.buttonText}/>
            <SimpleButton title={'Remove'}
                          handler={removeCategoryHandler}
                          bgStyle={[styles.button, styles.rButton]}
                          textStyle={styles.buttonText}/>
        </View>}
        {!!error && <Error message={error}/>}
    </View>
}
const styles = StyleSheet.create({
    text:{
        color:'cornflowerblue',
        fontSize:18,
        paddingTop:15,
        paddingBottom:5
    },
    container:{
        marginHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    editContainer:{
        flexDirection:'row'
    },
    input:{
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
        height: 30,
        flex:2,
        borderWidth: 1,
        borderRadius:3
    },
    uButton:{
        backgroundColor:'seagreen',
    },
    rButton:{
        backgroundColor:'red',
    },
    button:{
        height:30,
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
    }
});
export default Category;