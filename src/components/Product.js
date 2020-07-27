import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import SimpleButton from "./Button";

const Product = (props)=>{
    return <View style={styles.container}>
        <View style={styles.option}>
            <Text style={styles.title}>Name:</Text>
            <Text style={styles.param}>{props.object.item.name}</Text>
        </View>
        <View style={styles.option}>
            <Text style={styles.title}>Prise:</Text>
            <Text style={styles.param}>{props.object.item.prise}$</Text>
        </View>
        <View style={styles.option}>
            <Text style={styles.title}>Expiration:</Text>
            <Text style={styles.param}>{props.object.item.date}</Text>
        </View>
        <View style={styles.option}>
            <Text style={styles.title}>Category:</Text>
            <Text style={styles.param}>{props.object.item.category}</Text>
        </View>

            <SimpleButton title={'Update'}
                          handler={()=>props.gotoProductForm('UPDATE', props.object.item)}
                          bgStyle={[styles.button, styles.uButton]}
                          textStyle={styles.buttonText}/>
            <SimpleButton title={'Remove'}
                          handler={()=>props.removeProduct(props.object.item.name)}
                          bgStyle={[styles.button, styles.rButton]}
                          textStyle={styles.buttonText}/>


    </View>
}
const styles = StyleSheet.create({
    title:{
        flex:1,
        color:'seagreen'
    },
    param:{
        flex:1
    },
    option:{
      flexDirection:'row'
    },
    container:{
        flex:1,
        alignItems: 'stretch',
        marginHorizontal:10,
        marginVertical:5,
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        paddingBottom:10
    },

    uButton:{
        backgroundColor:'cornflowerblue',
    },
    rButton:{
        backgroundColor:'red',
    },
    button:{
        marginTop:10,
        height:30,
        width:150,
        borderRadius:3,
        alignSelf:'center'
    },
    buttonText:{
        paddingLeft : 10,
        paddingRight : 10,
        lineHeight:30,
        color:'#fff',
        textAlign:'center',
    }
});
export default Product;