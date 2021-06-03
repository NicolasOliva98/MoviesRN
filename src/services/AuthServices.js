import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

const signIn = async (username, password) => {
  try {
    const { data } = await axios.post('http://161.35.140.236:9005/api/auth/login', { username: username, password: password });
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


//refresh token
const checkAuth = async () => { 
  try {
    const usuario =  await SecureStore.getItemAsync('userdata')
    let currentuser = JSON.parse(usuario)
    const { data } = await axios.post('http://161.35.140.236:9005/api/auth/refresh', {refresh_token: currentuser.data.payload.refresh_token });
    return {jwtToken: data.data.payload.token, userCurrent: data.data.user  };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signIn, signOut, checkAuth };