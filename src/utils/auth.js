'use strict';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const API_KEY = 'AIzaSyBm-aChIRjdykc9L7rRp7VoIjPJl_Ykr20';

//To send the reuqest to firebase for signInUser and signUpUser.
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    //The data field is provided by axios on response object also provided by axios
    //The data will be parsed response data sent by Firebase which will be an object with idToken field.

    const authData = {
      token: response.data.idToken,
      userId: response.data.localId,
      refreshToken: response.data.refreshToken,
      email: response.data.email,
      registered: response.data.registered,
    };

    // console.log(
    //   'Response',
    //   authData.token.length,
    //   authData.userId,
    //   authData.refreshToken
    // );

    //console.log(authData);
    return authData;
  } catch (error) {
    console.warn(error);
  }
}

export function createUser(email, password) {
  //console.log(email, password);
  try {
    return authenticate('signUp', email, password);
  } catch (error) {
    console.warn(error);
  }
}

export function loginUser(email, password) {
  //console.log(email, password);
  try {
    return authenticate('signInWithPassword', email, password);
  } catch (error) {
    console.warn(error);
  }
}

export async function updateRefreshToken(refreshToken) {
  const url = 'https://securetoken.googleapis.com/v1/token?key=';

  try {
    const res = await axios.post(`${url}${API_KEY}`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    AsyncStorage.setItem('refreshToken', res.data.refresh_token);
    AsyncStorage.setItem('token', res.data.id_token);

    return res.data.id_token;
  } catch (error) {
    Alert.alert('Didnt get token', error);
  }
}
