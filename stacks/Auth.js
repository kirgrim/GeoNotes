import {View, StyleSheet, Button} from "react-native";
import { TextInput, Text } from 'react-native-paper';
import {createNewUser, loginUser} from "../utils/auth_utils";
import React, {useState} from "react";
import { Title } from 'react-native-paper';

export function AuthForm () {
    const [currentAuthView, setCurrentAuthView] = useState("Login");

    return (
        <View style={styles.container}>
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
            <Title>Log In</Title>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Email"
                    onChangeText={newText => props.setEmail(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={newText => props.setPassword(newText)}
                />
            </View>
            <Button
                title="Log In"
                onPress={async () => await loginUser({"email": props.email,
                                                           "password": props.password}, {'setPassword': props.setPassword})}
            />
            <Text>New Member?</Text><Text style={{color: 'blue'}} onPress={()=> props.setCurrentAuthView("SignUp")}>Sign Up</Text>
        </View>
    );
}

export function SignUpForm(props) {
    return (
        <View>
            <Title>Registration</Title>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Email"
                    onChangeText={newText => props.setEmail(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={newText => props.setPassword(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Repeat Password"
                    onChangeText={newText => props.setRepeatPassword(newText)}/>
            </View>
            <Button
                title="Sign Up"
                onPress={async () => await createNewUser({"email": props.email, "password": props.password, "repeatPassword": props.repeatPassword},
                    {'setPassword': props.setPassword, 'setRepeatPassword':  props.setRepeatPassword})}
            />
            <Text>Already have an account?</Text><Text style={{color: 'blue'}} onPress={()=> props.setCurrentAuthView("Login")}>Log In</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


    inputView: {
        // backgroundColor: "#A9A9A9",
        // borderRadius: 30,
        height: 40,
        marginBottom: 25,
        // alignItems: "center",
    },
    TextInput: {
        // height: 50,
        // flex: 1,
        // padding: 10,
        // marginLeft: 20,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },

});
