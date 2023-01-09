/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {HomeScreen} from "./stacks/Home";
import {AddNote} from "./stacks/AddNote";
import {DisplayNotesNavigator} from "./stacks/DisplayNotes";
import auth from '@react-native-firebase/auth';
import {AuthForm} from "./stacks/Auth";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import * as Linking from 'expo-linking';
import {Text} from "react-native";

const Tab = createMaterialTopTabNavigator();
const prefix = Linking.createURL('/');

const App: () => Node = () => {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Profile: 'home',
                MyNotes: {
                    screens: {
                        DisplayNotes: 'notes/list',
                        DisplayItem: 'notes/:id'
                    },
                },
                AddNote: 'add'
            },
        },
    };

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(false);

    // Handles user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        global.currentUser = user;
        console.log('current user updated')
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    if (initializing) return null;


    if (!user) {
        return (<AuthForm/>)
    }

    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Tab.Navigator>
                <Tab.Screen name="Profile" component={HomeScreen} initialParams={{ user: user }}/>
                <Tab.Screen name="MyNotes" options={{ title: 'My Notes' }} component={DisplayNotesNavigator} initialParams={{ user: user }} />
                <Tab.Screen name="AddNote" options={{ title: "Add Note" }} component={AddNote} initialParams={{ user: user }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = {
    pillContainer: {
        height: 50,
        margin: 10
    },
    pillButton: {
        width: 120
    },
    borderActive: {
        borderColor: 'blue',
    },
    pillActive: {
        backgroundColor: 'blue',
    },
    pillLabel: {
        color: 'black',
    }
};

export default App;
