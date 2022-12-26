import {Button, StyleSheet, TextInput, View} from "react-native";
import {Title} from "react-native-paper";
import React, {useState} from "react";
import {createNote} from "../utils/note_utils";
import {showAlert} from "../utils/alert_utils";

export function AddNote(user) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    return (
        <View style={styles.container}>
            <Title>Create New GeoNote</Title>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Title"
                    ref={component => this.titleInput = component}
                    onChangeText={newText => setTitle(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Description"
                    ref={component => this.descriptionInput = component}
                    onChangeText={newText => setDescription(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    keyboardType='numeric'
                    placeholder="Set Latitude"
                    ref={component => this.latitudeInput = component}
                    onChangeText={newText => setLatitude(newText)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    keyboardType='numeric'
                    placeholder="Set Longitude"
                    ref={input => { this.longitudeInput = input }}
                    onChangeText={newText => setLongitude(newText)}/>
            </View>
            <Button
                title="Create Note"
                onPress={async () => {
                    if (title && latitude && longitude){
                        await createNote(user, {"title": title,
                                               "description": description,
                                               "lat": latitude,
                                               "lon": longitude}).then(_=>{
                            showAlert('Success', `Note "${title}" was added successfully`)
                            setTitle('');
                            this.titleInput.setNativeProps({'text': ''});
                            setLongitude(0.0);
                            this.longitudeInput.setNativeProps({'text': ''});
                            setLatitude(0.0);
                            this.latitudeInput.setNativeProps({'text': ''});
                            setDescription('');
                            this.descriptionInput.setNativeProps({'text': ''});
                        });
                    }else{
                        showAlert('Missing params', 'One of the required properties missing (title, latitude or longitude)')
                    }
                }}
            />
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
        backgroundColor: "#A9A9A9",
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
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