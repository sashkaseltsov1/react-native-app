import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SimpleTextInput from "../components/TextInput";
import SimpleButton from "../components/Button";
import AuthContext from "../context/Auth-context";
import {textLengthValidator} from "../validators/validators";
import Error from "../components/Error";
import {setUser} from "../mockData/mock-user";



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
            {value => <View style={styles.container}>
                <Text style={styles.text}>Username:</Text>
                <SimpleTextInput onChangeText={onChangeTextHandler}
                                 value={text}
                                 placeholder={'Enter your username...'}
                                 error={error} onSubmitEditing={() => signInHandler(value)}/>
                <SimpleButton title={'Sign in'} handler={() => signInHandler(value)}/>
                <Error message={error}/>
            </View>}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    text:{
        marginBottom:10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});