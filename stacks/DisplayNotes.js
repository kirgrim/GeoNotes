import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export const GetCurrentViewNode = (props) => {
    if (props.currentView === 'DisplayNotesRaw') {
        return (<DisplayNotesList setCurrentView={props.setCurrentView} />);
    } else {
        return (<DisplayNotesMap setCurrentView={props.setCurrentView} />);
    }
}

function DisplayNotesList(props) {
    return (<View>
        <Text>List Notes!</Text>
        <Button title="List View"
                onPress={() => props.setCurrentView("DisplayNotesMap")}
                style={styles.fixToBottom}></Button>
    </View>)
}

export function DisplayNotesMap(props) {
    return (<View>
        <Text>Map Notes!</Text>
        <Button title="Map View"
                onPress={() => props.setCurrentView("DisplayNotesRaw")}
                style={styles.fixToBottom}></Button>
    </View>)
}

export function DisplayNotes () {
    const [currentView, setCurrentView] = useState("DisplayNotesMap");

    return (
        <View>
            <View style={styles.container}>
                <GetCurrentViewNode currentView={currentView} setCurrentView={setCurrentView} />
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
    }
});