import React, {useState} from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import SimpleButton from "../components/Button";
import {parseCategories} from "../mockData/mock-categories";
import {getAllProducts, removeProduct} from "../mockData/mock-products";
import Product from "../components/Product";



export default function Products({navigation}) {
    const [products, setProducts] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getProducts().then()
        }, [])
    );
    const getProducts = async ()=>{
        const res = await getAllProducts()
        const prod = parseCategories(res).reverse()
        setProducts(prod)
        return () => setProducts([])
    }
    const removeProductByName = async (name)=>{
        await removeProduct(name)
        await getProducts()
    }
    const gotoProductForm = (mode, data)=>navigation.navigate('ProductForm', { mode, data})
    return (

                <FlatList
                    ListHeaderComponent={
                        <View style={styles.buttonContainer}>
                            <SimpleButton textStyle={styles.buttonText}
                                          bgStyle={styles.button}
                                          title={'Create product'}
                                          handler={()=>gotoProductForm('CREATE')}/>
                        </View>
                        }
                    removeClippedSubviews
                    data={products}
                    renderItem={object=><Product {...{object}}
                                                 gotoProductForm={gotoProductForm}
                                                 removeProduct={removeProductByName} />}
                    keyExtractor={(item,index) => `${item.name}${index}`}
                />

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    list:{
        flex:8
    },
    buttonContainer: {
        height:50,
        alignItems: 'flex-end',
        justifyContent:'center',
        paddingHorizontal:10,
    },

    button:{
        height:30,
        backgroundColor:'seagreen',
        borderRadius:3
    },
    buttonText:{
        paddingLeft : 10,
        paddingRight : 10,
        lineHeight:30,
        color:'#fff',
        textAlign:'center',
    },

});