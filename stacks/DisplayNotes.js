import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import {List, Title} from 'react-native-paper';
import {deleteNote, listNotes} from "../utils/note_utils";

function updateUserNotes(setUserNotes, props){
    listNotes(props.user).then(notesList => {
        setUserNotes(notesList);
    });
}

export const GetCurrentViewNode = (props) => {
    const [userNotes, setUserNotes] = useState([]);

    useEffect(() =>{
        updateUserNotes(setUserNotes, props);
    }, [userNotes, setUserNotes]);

    if (props.currentView === 'DisplayNotesRaw') {
        return (<DisplayNotesList setCurrentView={props.setCurrentView} userNotes={userNotes} />);
    } else {
        return (<DisplayNotesMap setCurrentView={props.setCurrentView} userNotes={userNotes} />);
    }
}

function DisplayNotesList(props) {
    if (props.userNotes && props.userNotes.length > 0) {
        return (
            <View>
                <Title>List View</Title>
                {props.userNotes.map(note => (
                    <List.Item
                        key={note.id}
                        title={note.title}
                        description={note.description}
                        right={()=> <Button color="red" style={styles.deleteButton} title={"X"} onPress={()=> deleteNote(note.id)}/>}/>
                ))}
                <Button title="Map View"
                        onPress={() => props.setCurrentView("DisplayNotesMap")}
                        style={styles.fixToBottom}></Button>
            </View>);
    }else{
        return (<View><Text>Notes list is empty...</Text></View>);
    }
}

export function DisplayNotesMap(props) {
    // TODO: render notes on map
    return (<View>
        <Text>Map Notes!</Text>
        <Button title="List View"
                onPress={() => props.setCurrentView("DisplayNotesRaw")}
                style={styles.fixToBottom}></Button>
    </View>)
}

export function DisplayNotes (user) {
    const [currentView, setCurrentView] = useState("DisplayNotesMap");

    return (
        <View>
            <View style={styles.container}>
                <GetCurrentViewNode currentView={currentView} setCurrentView={setCurrentView} user={user} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        'height': 300
    },
    fixToBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    titleCenter: {
      textAlign: "center"
    },
    deleteButton: {
        borderRadius: 10
    }
});