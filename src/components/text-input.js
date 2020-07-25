import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';

const SimpleTextInput = ({value, onChangeText}) => {


    return (
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={value}
        />
    );
}
const styles = StyleSheet.create({
    input: {
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
        width:200,
        borderColor: 'gray', borderWidth: 1
    },

});
export default SimpleTextInput;