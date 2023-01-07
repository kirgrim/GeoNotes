import Tts from 'react-native-tts';

export function shout(text){
    return Tts.speak(text);
}