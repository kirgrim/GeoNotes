import firestore from '@react-native-firebase/firestore';
import {logoutUser} from "./auth_utils";

export function getCollection(name){
    return firestore().collection(name);
}


export async function listNotes(user){
    if (user && user.uid){
        const notes = await getCollection('notes').where("user_id", "==", user.uid).orderBy("created_on", "desc").get();
        return notes.docs.map(doc => doc.data());
    }else{
        console.log('Session is invalid, logging out');
        logoutUser();
    }
}


export async function deleteNote(noteId){
    console.log('starting deletion of noteId=', noteId)
    return await getCollection('notes').where("id", "==", noteId).get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                doc.ref.delete();
            })
        });
}
