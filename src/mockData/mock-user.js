import { AsyncStorage } from 'react-native';

export const getUser = async ()=>{
    return await AsyncStorage.getItem('username');
}
export const setUser = async (username) => {
    return await AsyncStorage.setItem('username', username);
}
export const removeUser = async () => {
    return await AsyncStorage.removeItem('username');
}


