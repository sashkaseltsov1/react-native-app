import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Authorization from "./src/screens/Authorization";
import Main from "./src/screens/Main";

import AuthContext from "./src/context/Auth-context";
import exit from './assets/exit.png'
import {getUser, removeUser} from "./src/mockData/mock-user";
import ProductForm from "./src/screens/ProductForm";

const Stack = createStackNavigator();
export default App = ()=> {

  const [userData, setUserData] = useState({
    username:null,
    isAuth:false
  })
    const SignOutHandler = async () => {
        await removeUser();
        setUserData({
            username: null,
            isAuth: false
        })
    }
    const AuthenticateUserHandler = async () => {
        let username = await getUser()
        if (username) {
            setUserData(() => {
                return {isAuth: true, username}
            })
        }

    }
    useEffect(()=>{
        AuthenticateUserHandler().then()
    },[])
  return (
      <AuthContext.Provider value={{userData, setUserData}}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Main"
                                component={Main}
                                options={({route}) => (
                                    {
                                        title: `Main (${userData.username || 'Unauthorized'})`,
                                        headerRight: () => {
                                            return <View>
                                                {userData.isAuth && <TouchableOpacity
                                                    style={styles.exitButton}
                                                    onPress={SignOutHandler}>
                                                    <Image source={exit}/>
                                                </TouchableOpacity>}
                                            </View>
                                        }
                                    }
                                )}
                  />
                  <Stack.Screen name="SignIn"
                                component={Authorization}
                                options={{title: 'Sign in'}}/>
                  <Stack.Screen name="ProductForm"
                                component={ProductForm}
                                options={{title: 'Product form'}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#000',
  },
    exitButton:{
        width: 24,
        marginRight:10
    }
});
