import React, {useState} from "react";
import {Button, StyleSheet, View} from "react-native";
import {Title, TextInput} from "react-native-paper";

import {createNote} from "../utils/note_utils";
import {showAlert} from "../utils/alert_utils";
import DropDownPicker from "react-native-dropdown-picker";

export function AddNote(user) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const [showFrequencyOptions, setShowFrequencyOptions] = useState(false);
    const [frequency, setFrequency] = useState("");
    const [frequencyItems, setFrequencyItems] = useState(
        [{label: "Hourly", value: "hourly"},
                  {label:"Daily", value: "daily"},
                  {label: "Weekly", value: "weekly"},
                  {label: "Monthly", value: "monthly"},
                  {label: "Yearly", value: "yearly"}]
    );
    return (
        <View style={styles.container}>
            <Title>Create New GeoNote</Title>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Title"
                    ref={component => this.titleInput = component}
                    onChangeText={newText => setTitle(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Description"
                    ref={component => this.descriptionInput = component}
                    onChangeText={newText => setDescription(newText)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    keyboardType='numeric'
                    placeholder="Set Latitude"
                    ref={component => this.latitudeInput = component}
                    onChangeText={newText => setLatitude(newText)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    keyboardType='numeric'
                    placeholder="Set Longitude"
                    ref={input => { this.longitudeInput = input }}
                    onChangeText={newText => setLongitude(newText)}/>
            </View>
            <View style={styles.inputView}>
                <DropDownPicker
                    placeholder={"Select Frequency"}
                    multiple={false}
                    open={showFrequencyOptions}
                    value={frequency}
                    items={frequencyItems}
                    setOpen={setShowFrequencyOptions}
                    setValue={setFrequency}
                    setItems={setFrequencyItems}
                />
            </View>
            <Button
                title="Create Note"
                onPress={async () => {
                    if (title && latitude && longitude){
                        await createNote(user, {"title": title,
                                               "description": description,
                                               "lat": latitude,
                                               "lon": longitude,
                                               "frequency": frequency || "daily"}).then(_=>{
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
        minWidth: 200,
        maxWidth: 200,
        height: 40,
        marginBottom: 20
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