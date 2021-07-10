import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7_aoAkG5U12rcRyBtaqpbe0bnw9F0HEI',
  authDomain: 'qamionweb.firebaseapp.com',
  databaseURL: 'https://qamionweb.firebaseio.com',
  projectId: 'qamionweb',
  storageBucket: 'qamionweb.appspot.com',
  messagingSenderId: '394277105001',
  appId: '1:394277105001:web:9b051b9bf7fb7969a8a1f8',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
