'use strict';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const API_KEY = 'AIzaSyBm-aChIRjdykc9L7rRp7VoIjPJl_Ykr20';

function getUrl(mode) {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
}

//To send the reuqest to firebase for signInUser and signUpUser.
async function authenticate(mode, email, password) {
  const url = getUrl(mode);

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

    return authData;
  } catch (_) {}
}

export function signUpUser(email, password) {
  return authenticate('signUp', email, password);
}

export function loginUser(email, password) {
  return authenticate('signInWithPassword', email, password);
}

//Error
export async function deleteUserAccount(token) {
  try {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`,
      {
        idToken: token,
      }
    );
    return res.data;
  } catch (error) {
    //throw new Error(error);
    //console.warn(JSON.stringify(error));
  }
}

export async function resetUserAccount(userId) {}

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
