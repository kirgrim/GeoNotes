import firestore from '@react-native-firebase/firestore';

export function getCollection(name){
    return firestore().collection(name);
}
