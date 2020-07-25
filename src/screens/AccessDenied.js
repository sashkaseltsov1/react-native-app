import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SimpleButton from "../components/button";

export default function AccessDenied({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You should be authenticated!</Text>
                <SimpleButton title={'Sign in'} handler={()=>navigation.navigate('SignIn')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        marginBottom:10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    loginScreenButton:{
        width: 200,
        backgroundColor:'#000',
    },
    loginText:{
        paddingLeft : 10,
        paddingRight : 10,
        paddingVertical:10,
        color:'#fff',
        textAlign:'center',
    }
});