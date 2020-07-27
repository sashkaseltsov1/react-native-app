import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Error = ({message})=> {
    return <Text style={styles.error}>{message}</Text>
}

const styles = StyleSheet.create({
    error:{
        marginBottom:10,
        color:'red',
        textAlign:'center',
        paddingVertical:10
    },

});

export default Error