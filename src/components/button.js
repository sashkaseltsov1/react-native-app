import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';



export default function SimpleButton({handler, title}) {

    return (
            <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={handler}
                underlayColor='#fff'>
                <Text style={styles.loginText}>{title}</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginScreenButton:{
        width: 200,
        backgroundColor:'#000',
        marginBottom:10
    },
    loginText:{
        paddingLeft : 10,
        paddingRight : 10,
        paddingVertical:10,
        color:'#fff',
        textAlign:'center',
    }
});