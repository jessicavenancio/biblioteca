import { async } from "@firebase/util";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "./config";

// Função assíncrona = que o resultado não é obtido de imediato
// Haverá "espera"
export async function cadastrarEmailSenha(email, senha) {
  // Indicar para o firebase que queremos cadastrar
  // um novo usuário utilizando email/senha

  // Aguardando o resultado do Firebase
    const resultado = await createUserWithEmailAndPassword(auth, email, senha);

    return resultado.user;
}

export async function loginGoogle() {
  // Configurar como o login do google vai funcionar
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth, provider);

    return resultado.user;
}


export async function loginEmailSenha(email,senha){
    const resultado = await signInWithEmailAndPassword(auth, email, senha);

    return resultado.user;
}

export async function logout(){
  //deslogar o usuario atual do firebase
  await signOut(auth);
}