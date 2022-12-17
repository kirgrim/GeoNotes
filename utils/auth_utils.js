import auth from "@react-native-firebase/auth";
import {CONSTANTS, JSHash} from 'react-native-hash';
import {getCollection} from "./db_utils";

const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

export async function createNewUser(form) {
    //create new user with provided data of the form
    return await auth().createUserWithEmailAndPassword(form.email, form.password)
        .then(async function(firebaseUser) {
            console.log("User " + firebaseUser.user.uid + " created successfully!");
            await updateFirestore(form, firebaseUser.user.uid);
            return firebaseUser;
        }).catch(function(error) {
        alert(error)
    });

    async function updateFirestore(form, uidNewUser) {
        //push data into firestore using the uid provided

        let data = {};
        data['email'] = form.email;
        data['password'] = await JSHash(form.password, hashAlgorithm);
        //se empuja el arreglo data en el documento del usuario
        await getCollection('users').doc(uidNewUser).set(data);
        console.log(data, uidNewUser);
    }
}


export async function loginUser(form){
    let data = {};
    data['email'] = form.email;
    data['password'] = await JSHash(form.password, hashAlgorithm);
    const querySnapshot = await getCollection('users')
        .where('password', '==', data['password'])
        .where('email', '==', data['email']).get();
    if (!querySnapshot.empty){
        return await auth().createUserWithEmailAndPassword(data['email'], data['password']);
    }
    console.warn('!!No matching user found for email=', data['email']);
    return null;
}


export function logoutUser(){
    auth().signOut().then(()=> console.log('User signed out'))
}