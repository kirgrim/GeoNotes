/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import Swiper from "react-native-screens-swiper";
import {HomeScreen} from "./stacks/Home";
import {AddNote} from "./stacks/AddNote";
import {DisplayNotes} from "./stacks/DisplayNotes";


const App: () => Node = () => {
    const data = [
        {
            tabLabel: 'Profile',
            component: HomeScreen(),
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
