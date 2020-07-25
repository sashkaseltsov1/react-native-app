import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Authorization from "./src/screens/Authorization";
import Main from "./src/screens/Main";
import {getUser, removeUser} from "./src/fake-backend/mock-user";
import AuthContext from "./src/context/Auth-context";
import exit from './utils/exit.png'

const Stack = createStackNavigator();
export default function App() {

  const [userData, setUserData] = useState({
    username:null,
    isAuth:false
  })
    const SignOutHandler = async ()=>{
      try {
          await removeUser();
          setUserData({
              username:null,
              isAuth:false
          })
      }catch (e) {console.log(e)}
    }
    const TryAuthenticateUserHandler = async ()=>{
        try {
            let username = await getUser()
            if(username){
                setUserData(()=>{
                    return {isAuth: true, username}
                })
            }
        }catch (e) {console.log(e)}
    }
    useEffect(()=>{
        TryAuthenticateUserHandler().then()
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
