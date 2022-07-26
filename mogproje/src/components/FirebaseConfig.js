import * as firebase from "firebase";
import firestore from 'firebase/firestore'
import 'firebase/storage' 




const firebaseConfig = {


  apiKey: 'AIzaSyBjvfnuh4o5dQQQlFHzVD2rlbgPHp1OxnY',
  authDomain: 'mediaofgamers-e3c1a.firebaseapp.com',
  databaseURL: 'https://mediaofgamers-e3c1a.firebaseio.com',
  projectId: 'mediaofgamers-e3c1a',
  storageBucket: 'mediaofgamers-e3c1a.appspot.com',
  messagingSenderId: '998018857634',

};


firebase.initializeApp(firebaseConfig);



export default firebase;