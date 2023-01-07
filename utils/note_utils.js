import uuid from 'react-native-uuid';
import {logoutUser} from "./auth_utils";
import {getCollection} from "./db_utils";
import {getDistanceFromCoordinates} from "./math_utils";
import {getTimestamp} from "./timer_utils";


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
    const ts = getTimestamp();
    data['id'] = newNoteID;
    data['created_on'] = ts;
    data['last_notified_time'] = ts;
    data['user_id'] = user.uid;
    return await getCollection('notes').doc(newNoteID).set(data);
}

export async function updateNote(noteID, updateData) {
    return await getCollection('notes').doc(noteID).set(updateData);
}

export function updateUserNotes(setUserNotes, props){
    listNotes(props.user).then(notesList => {
        setUserNotes(notesList);
    });
}

function shouldSendAccordingToFrequency(note){
    // TODO: frequency is approximate here
    let shouldSent = false;
    switch (note.frequency.toLowerCase()) {
        case 'hourly':
            shouldSent = note.last_notified_time >= 60 * 60
            break;
        case 'daily':
            shouldSent = note.last_notified_time >= 24 * 60 * 60
            break;
        case 'weekly':
            shouldSent = note.last_notified_time >= 7 * 24 * 60 * 60
            break;
        case 'monthly':
            shouldSent = note.last_notified_time >= 30 * 7 * 24 * 60 * 60
            break;
        case 'yearly':
            shouldSent = note.last_notified_time >= 12 * 30 * 7 * 24 * 60 * 60
            break;
        default:
            console.warn(`Unresolved frequency: ${note.frequency}`);
    }
    return shouldSent;
}

export async function getCloseNotes(user, userCoords, maxDistanceMeters){
    const userNotes = await listNotes(user);
    return userNotes.filter((note) =>
        getDistanceFromCoordinates(userCoords, {lat: note.lat, lon: note.lon}) <= maxDistanceMeters && shouldSendAccordingToFrequency(note)
    );
}