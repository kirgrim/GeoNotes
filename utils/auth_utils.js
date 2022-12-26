import auth from "@react-native-firebase/auth";
import {CONSTANTS, JSHash} from 'react-native-hash';
import {getCollection} from "./db_utils";
import {showAlert} from "./alert_utils";

const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

export async function createNewUser(form, props) {
    //create new user with provided data of the form
    if (form.password !== form.repeatPassword){
        showAlert('Sign Up Failure', 'Passwords do not match');
        props.setRepeatPassword('');
        return
    }
    form.password = await JSHash(form.password, hashAlgorithm);
    return await auth().createUserWithEmailAndPassword(form.email, form.password)
        .then(async function(firebaseUser) {
            console.log("User " + firebaseUser.user.uid + " created successfully!");
            await updateFirestore(form, firebaseUser.user.uid);
            return firebaseUser;
        }).catch((e)=>{
            showAlert('Sign Up Failure', `Failed to register: ${e}`)
            props.setPassword('');
            props.setRepeatPassword('');
        });

    async function updateFirestore(form, uidNewUser) {
        //push data into firestore using the uid provided

        let data = {};
        data['email'] = form.email;
        data['password'] = form.password;
        //create new record in db with given user credentials
        await getCollection('users').doc(uidNewUser).set(data);
        console.log(data, uidNewUser);
    }
}


export async function loginUser(form, props){
    let data = {};
    data['email'] = form.email;
    data['password'] = await JSHash(form.password, hashAlgorithm);
    try {
        console.log(`Attempting to authorize ${data['email']}`);
        const querySnapshot = await getCollection('users')
            .where('password', '==', data['password'])
            .where('email', '==', data['email']).get();
        if (!querySnapshot.empty) {
            return await auth().signInWithEmailAndPassword(data['email'], data['password'])
                .catch(err => {
                    showAlert('Auth Failed', `Authorization failed: ${err}`);
                    props.setPassword('');
                });
        } else {
            showAlert('Auth Failed', `Login/password combination is invalid`);
            props.setPassword('');
        }
    }catch (e) {
        console.error(`Error auth:`, e)
        showAlert('Auth Failed', `DB Service is temporary unavailable`)
    }
    return null;
}


export function logoutUser(){
    auth().signOut().then(()=> console.log('User signed out'))
}