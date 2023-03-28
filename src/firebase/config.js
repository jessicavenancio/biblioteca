import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnzHCMOeLvNkIj6rM5VVxS1eIOQ7-S9Tw",
    authDomain: "bibliotech-r.firebaseapp.com",
    projectId: "bibliotech-r",
    storageBucket: "bibliotech-r.appspot.com",
    messagingSenderId: "1067033484411",
    appId: "1:1067033484411:web:4169030129ccf654c4d6de",
};

//inicializando o app com base nas configurções acima
export const app = initializeApp(firebaseConfig);
//configurando o authentication e seus recursos de autenticação
export const auth = getAuth(app);
//configurando o firestore e seus recursos de bd
export const db = getFirestore(app);
//configurando o storage e seus recursos de upload (storage faz upload de arquivos)
export const storage = getStorage(app);
