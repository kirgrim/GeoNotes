import {Button, Text, TextInput, View} from "react-native";
import {createNewUser, loginUser} from "../utils/auth_utils";
import React, {useState} from "react";

export function AuthForm () {
    const [currentAuthView, setCurrentAuthView] = useState("AuthViewMap");

    return (
        <View>
            <GetAuthorizationForm currentAuthView={currentAuthView} setCurrentAuthView={setCurrentAuthView} />
        </View>
    );
}

const GetAuthorizationForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    if (props.currentAuthView === 'Login') {
        return (<LoginForm setCurrentAuthView={props.setCurrentAuthView} setEmail={setEmail} email={email} setPassword={setPassword} password={password} />);
    } else {
        return (<SignUpForm setCurrentAuthView={props.setCurrentAuthView} setEmail={setEmail} email={email} setPassword={setPassword} password={password} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} />);
    }
}

export function LoginForm(props) {


    return (
        <View>
            <TextInput
                placeholder="Enter Email"
                onChangeText={newText => props.setEmail(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={newText => props.setPassword(newText)}
            />
            <Button
                title="Log In"
                onPress={async () => await loginUser({"email": props.email,
                                                           "password": props.password})}
            />
            <Text>New Member?</Text>
            <Text style={{color: 'blue'}} onPress={()=> props.setCurrentAuthView("SignUp")}>Sign Up</Text>
        </View>
    );
}

export function SignUpForm(props) {
    return (
        <View>
            <TextInput
                placeholder="Enter Email"
                onChangeText={newText => props.setEmail(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={newText => props.setPassword(newText)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Repeat Password"
                onChangeText={newText => props.setRepeatPassword(newText)}
            />
            <Button
                title="Sign Up"
                onPress={async () => await createNewUser({"email": props.email, "password": props.password, "repeatPassword": props.repeatPassword})}
            />
            <Text>Already have an account?</Text>
            <Text style={{color: 'blue'}} onPress={()=> props.setCurrentAuthView("Login")}>Log In</Text>
        </View>
    );
}