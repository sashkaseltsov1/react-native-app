import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default function SimpleButton({handler, title, bgStyle, textStyle}) {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={bgStyle || styles.button}
            onPress={handler}
            underlayColor='#fff'>
            <Text style={textStyle || styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        width: 200,
        backgroundColor:'#000',
        marginBottom:10,
        borderRadius:3
    },
    text:{
        paddingLeft : 10,
        paddingRight : 10,
        paddingVertical:10,
        color:'#fff',
        textAlign:'center',
    }
});