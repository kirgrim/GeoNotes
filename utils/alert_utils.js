import {Alert} from "react-native";

export function showAlert(title, msg){
    return Alert.alert(
        title,
        msg,
        [
            {
                text:'Dismiss',
                style:'cancel',
            },
        ]
    );
}