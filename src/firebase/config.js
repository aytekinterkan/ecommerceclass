//// burada google firebase ile etkileşime buradan girilecek.

import { initializeApp } from "firebase/app";

//authentication işlemleri için giriş ve yetkilendirme
import {getAuth} from "firebase/auth"

//firestore database erişimi için(verilerin kayıt yeri)
import {getFirestore} from "firebase/firestore"

//storage erişimi için (resim kayıt yeri)
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "ecommerceclass-7f178.firebaseapp.com",
  projectId: "ecommerceclass-7f178",
  storageBucket: "ecommerceclass-7f178.appspot.com",
  messagingSenderId: "41677807263",
  appId: "1:41677807263:web:1a7e34caca43dc2c288caa"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
