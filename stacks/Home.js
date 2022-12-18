import {Button, Text, View} from "react-native";
import {logoutUser} from "../utils/auth_utils";

export function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Log Out" onPress={()=>logoutUser()}/>
        </View>
    );
}

