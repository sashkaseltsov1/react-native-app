import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';

const SimpleTextInput = ({value, onChangeText, style, onSubmitEditing, error, placeholder}) => {

    const [isFocused, setFocus] = useState(false)
    return (
        <TextInput
            onSubmitEditing={onSubmitEditing}
            style={[style||styles.input,
                !!error?styles.textinputError:isFocused?styles.textinputFocused:styles.textinputUnfocused]}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder={placeholder}
        />

    );
}
const styles = StyleSheet.create({
    input: {
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
        width:200,
        borderWidth: 1,
        borderRadius:3
    },
    textinputFocused: {
        borderColor: 'cornflowerblue'
    },
    textinputUnfocused: {
        borderColor: 'gray'
    },
    textinputError: {
        borderColor: 'red'
    }

});
export default SimpleTextInput;