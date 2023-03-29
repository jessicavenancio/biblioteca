
import { 
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc, 
} from "firebase/firestore";
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
    return livros;
}

export async function getLivro(id){
    const document = await getDoc(doc(livrosCollection, id));
    return {...document.data(), id: document.id}
}

export async function updateLivro(id, newData){ //pega como parâmentro o id do livro e os dados novos do forms
    await updateDoc(doc(livrosCollection, id), newData); //aqui atualiza na coleção com base no id inserindo as informações novas
}

export async function deleteLivro(id){
    await deleteDoc(doc(livrosCollection, id));
}