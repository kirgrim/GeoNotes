import {Button, TextInput, View} from "react-native";
import {createNewUser, loginUser} from "../utils/auth_utils";
import React, {useState} from "react";

export function AuthForm () {
    const [currentAuthView, setCurrentAuthView] = useState("AuthViewMap");

    return (
        <View>
            <GetAuthorizationForm currentView={currentAuthView} setCurrentView={setCurrentAuthView} />
        </View>
    );
}

const GetAuthorizationForm = (props) => {
    if (props.currentAuthView === 'Login') {
        return (<LoginForm setCurrentView={props.setCurrentAuthView} />);
    } else {
        return (<SignUpForm setCurrentView={props.setCurrentAuthView} />);
    }
}

export function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <TextInput
                placeholder="Enter Email"
                onChangeText={newText => setEmail(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={newText => setPassword(newText)}
            />
            <Button
                title="Log In"
                onPress={async () => await loginUser({"email": email,
                                                           "password": password})}
            />
            New Member? <Button onPress={()=> props.setCurrentAuthView("SignUp")} title="Sign Up"/>
        </View>
    );
}

export function SignUpForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    return (
        <View>
            <TextInput
                placeholder="Enter Email"
                onChangeText={newText => setEmail(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={newText => setPassword(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Repeat Password"
                onChangeText={newText => setRepeatPassword(newText)}
            />
            <Button
                title="Sign Up"
                onPress={async () => await createNewUser({"email": email, "password": password, "repeatPassword": repeatPassword})}
            />
            Already have an account? <Button onPress={()=> props.setCurrentAuthView("Login")} title="Log In"/>
        </View>
    );
}