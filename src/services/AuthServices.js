import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

const signIn = async (username, password) => {
  try {
    const { data } = await axios.post('http://161.35.140.236:9005/api/auth/login', { username: username, password: password });
    console.log(data);
    await SecureStore.setItemAsync('userdata', JSON.stringify(data))
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


const signOut = async () => {
  try {
    await SecureStore.deleteItemAsync('userdata')
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async () => {
  try {
    const datos = await SecureStore.getItemAsync('userdata')
    let user = JSON.parse(datos);    
    return {jwtToken: user.data.payload.token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signIn, signOut, checkAuth };