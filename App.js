/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import Swiper from "react-native-screens-swiper";
import {HomeScreen} from "./stacks/Home";
import {AddNote} from "./stacks/AddNote";
import {DisplayNotes} from "./stacks/DisplayNotes";
import auth from '@react-native-firebase/auth';
import {AuthForm} from "./stacks/Auth";

const App: () => Node = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(false);

    // Handles user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);


    const data = [
        {
            tabLabel: 'Profile',
            component: HomeScreen(user),
        },
        {
            tabLabel: 'My Notes',
            component: DisplayNotes(),
        },
        {
            tabLabel: 'Add Note',
            component: AddNote(),
        }
    ];

    if (initializing) return null;


    if (!user) {
        return (<AuthForm/>)
    }

    return (
        <Swiper
            data={data}
            isStaticPills={false}
            style={styles}
            // FlatList props
            >
        </Swiper>
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
