import {Button, Text, View} from "react-native";
import {logoutUser} from "../utils/auth_utils";

export function HomeScreen({ route }) {
    const { user } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Logged In as {user?.email}</Text>
            <Button title="Log Out" onPress={()=>logoutUser()}/>
        </View>
    );
}

