import uuid from 'react-native-uuid';
import {logoutUser} from "./auth_utils";
import {getCollection} from "./db_utils";


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
    return await getCollection('notes').where("id", "==", noteId).get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                doc.ref.delete();
            })
        });
}

export async function createNote(user, data){
    const newNoteID = uuid.v4();
    data['id'] = newNoteID;
    data['created_on'] = Math.floor(new Date().getTime()/1000);
    data['user_id'] = user.uid;
    return await getCollection('notes').doc(newNoteID).set(data);
}