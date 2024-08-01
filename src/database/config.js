// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// eslint-disable-next-line
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBm-aChIRjdykc9L7rRp7VoIjPJl_Ykr20',
  authDomain: 'prismatics-a497c.firebaseapp.com',
  projectId: 'prismatics-a497c',
  storageBucket: 'prismatics-a497c.appspot.com',
  messagingSenderId: '840039639242',
  appId: '1:840039639242:web:2fb94d03ac9dfa5f79ec33',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
