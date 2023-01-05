import React, {useEffect, useState} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import {List, Title} from 'react-native-paper';
import {deleteNote, listNotes} from "../utils/note_utils";
import MapView, {Marker} from "react-native-maps";
import {requestLocation} from "../utils/location_utils";

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
        return (<View>
                    <Text>Notes list is empty...</Text>
                    <Button title="Map View"
                            onPress={() => props.setCurrentView("DisplayNotesMap")}
                            style={styles.fixToBottom}></Button>
                </View>);
    }
}

export function DisplayNotesMap(props) {
    // TODO: move this code to worker
    let initialLocation
    if (props.userNotes.length > 0){
        const firstNote = props.userNotes[0]
        initialLocation = {
            latitude: parseFloat(firstNote.lat),
            longitude: parseFloat(firstNote.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }else{
        initialLocation = {
            latitude: 20.78825,
            longitude: -20.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }
    const [location, setLocation] = useState(initialLocation);

    useEffect(() => {
        const locationUpdateTimer = setInterval(async () => {
            // const oldLocation = location;
            await requestLocation(setLocation);
            console.log('location = ', location);
        }, 5000);
        return () => {
            clearInterval(locationUpdateTimer);
        };
    }, [location, setLocation]);

    return (
        <View>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        scrollEnabled={true}
                        customMapStyle={mapStyle}>
                        {props.userNotes.map(note => (
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(note.lat),
                                    longitude: parseFloat(note.lon)
                                }}
                                key={note.id}
                                title={note.title}
                                description={note.description}
                                onDragEnd={
                                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                                }
                            />
                        ))}
                    </MapView>
                </View>
            </SafeAreaView>
            <Button title="List View"
                    onPress={() => props.setCurrentView("DisplayNotesRaw")}
                    style={styles.fixToBottom}>
            </Button>
        </View>)
}

export function DisplayNotes (user) {
    const [currentView, setCurrentView] = useState("DisplayNotesRaw");

    return (
        <View>
            <GetCurrentViewNode currentView={currentView} setCurrentView={setCurrentView} user={user} />
        </View>
    );
}

const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
    },
];

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 1.2,
        height: Dimensions.get('window').height * 0.8,
    },
    fixToBottom: {
        flexDirection: 'row',
        marginTop:10,
        justifyContent: 'flex-end',
    },
    titleCenter: {
        justifyContent: 'center',
    },
    deleteButton: {
        borderRadius: 10
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});