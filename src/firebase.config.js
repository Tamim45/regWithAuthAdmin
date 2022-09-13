import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBKrAtujm8_SECqj48NymNifRNA6y_HoqA",
  authDomain: "ecommerce-first-prac.firebaseapp.com",
  databaseURL: "https://ecommerce-first-prac-default-rtdb.firebaseio.com",
  projectId: "ecommerce-first-prac",
  storageBucket: "ecommerce-first-prac.appspot.com",
  messagingSenderId: "876923548883",
  appId: "1:876923548883:web:b34ed4ad1a387e8f865026"
};

const app = getApps.length> 0 ? getApp(): initializeApp (firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app);

export {app, firestore, storage}