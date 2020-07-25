import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SimpleTextInput from "../components/text-input";
import SimpleButton from "../components/button";
import {setUser} from "../fake-backend/mock-user";
import AuthContext from "../context/Auth-context";
import {textLengthValidator} from "../validators/validators";



export default function Authorization({navigation}) {
    const [text, onChangeText] = useState('');
    const [error, setError] = useState('');
    const onChangeTextHandler = (val)=>{
        if (error) setError('');
        onChangeText(val)
    }
    const signInHandler = async (value) => {
        const res = textLengthValidator(text, 4,12);
        if(res.isValid){
            try {
                await setUser(text)
                value.setUserData({
                    isAuth: true,
                    username: text
                })
                navigation.navigate('Main')
            } catch (e) {console.log(e)}
        }else{
            setError(res.message)
        }
    }
    return (
        <AuthContext.Consumer>
            {value=><View style={styles.container}>
                <Text style={styles.text}>Enter your username:</Text>
                <SimpleTextInput onChangeText={onChangeTextHandler} value={text}/>
                <SimpleButton title={'Sign in'} handler={()=>signInHandler(value)}/>
                <Text style={styles.error}>{error}</Text>
            </View>}
            </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    text:{
        marginBottom:10
    },
    error:{
        marginBottom:10,
        color:'red'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});