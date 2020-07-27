import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SimpleButton from "../components/Button";

export default function AccessDenied({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You should be authenticated!</Text>
                <SimpleButton textStyle={{color:'cornflowerblue', fontSize:24}}
                              bgStyle={{}}
                              title={'Sign in'}
                              handler={()=>navigation.navigate('SignIn')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        marginBottom:10
    },
    container: {
        flex: 1,

        alignItems:'center',
        justifyContent: 'center',
    },

});