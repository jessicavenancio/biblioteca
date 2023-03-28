import { async } from "@firebase/util";
import { addDoc, getDocs,  } from "firebase/firestore";
import { livrosCollection } from "./collections";

export async function addLivro(data){
    //addDoc pede dois parâmetros para esse caso a coleção e o valor a ser salvo
    await addDoc(livrosCollection, data);
}

export async function getLivros(){
    const snapshot = await getDocs(livrosCollection);
    let livros = [];
    snapshot.forEach(doc =>{
        livros.push({...doc.data(), id: doc.id});
        
    });
    console.log(livros);
    return livros;
}