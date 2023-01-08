import React, {useEffect, useState} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import {List} from 'react-native-paper';
import {deleteNote, getNote, updateUserNotes} from "../utils/note_utils";
import MapView, {Marker} from "react-native-maps";
import {shout} from "../utils/audio_utils";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {useNavigation} from "@react-navigation/native";

export const GetCurrentViewNode = (props) => {
    const [userNotes, setUserNotes] = useState([]);

    useEffect(() =>{
        updateUserNotes(setUserNotes, props);
    }, [userNotes, setUserNotes]);

    if (props.currentView === 'DisplayNotesRaw') {
        return (<DisplayNotesList user={props.user} setCurrentView={props.setCurrentView} userNotes={userNotes} />);
    } else {
        return (<DisplayNotesMap user={props.user} setCurrentView={props.setCurrentView} userNotes={userNotes} />);
    }
}

function DisplayNotesList(props) {
    const navigation = useNavigation();
    navigation.setOptions({ title: 'Notes List View' })
    if (props.userNotes && props.userNotes.length > 0) {
        return (
            <View>
                {props.userNotes.map(note => (
                    <List.Item
                        key={note.id}
                        title={note.title}
                        description={note.description}
                        onPress = {async () => {
                            const item = await getNote(props.user, note.id);
                            if (item) {
                                navigation.navigate('DisplayItem', {note: item});
                            }
                        }}
                        left={()=> <Button color={"white"} title={"🗣️"} onPress={() => shout(`Title: ${note.title}; description: ${note.description}`)}/> }
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
    const navigation = useNavigation();
    // navigation.setOptions({ title: 'Notes Map View' })
    let location = {
        latitude: 20.78825,
        longitude: -20.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    const currLocation = global.currentUserLocation;
    if (currLocation){
        location = global.currentUserLocation
    }
    else if (props.userNotes.length > 0){
        const firstNote = props.userNotes[0]
        location = {
            latitude: parseFloat(firstNote.lat),
            longitude: parseFloat(firstNote.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    return (
        <View>
            <SafeAreaView>
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
                                onCalloutPress={async () => {
                                    const item = await getNote(props.user, note.id);
                                    if (item) {
                                    navigation.navigate('DisplayItem', {note: item});
                                    }
                                }}
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

export function DisplayNotes({route}) {

    const {user} = route.params;
    const [currentView, setCurrentView] = useState("DisplayNotesRaw");

    return (
        <GetCurrentViewNode currentView={currentView} setCurrentView={setCurrentView} user={user} />
    );
}

function DisplayItem({route}){
    const {note} = route.params;

    const navigation = useNavigation();
    navigation.setOptions({ title: note.title })

    return (
        <View>
            <Text>Description: {note.description}</Text>
            <Text>Latitude: {note.lat}</Text>
            <Text>Longitude: {note.lon}</Text>
            <Text>Frequency: {note.frequency}</Text>
        </View>
    )
}

const Stack = createNativeStackNavigator();

export function DisplayNotesNavigator({route}){
    const {user} = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="DisplayNotes" component={DisplayNotes} initialParams={{user: user}} options={{headerShown: false}} />
            <Stack.Screen name="DisplayItem" component={DisplayItem} options={{headerShown: true, title: 'Note Description'}} />
        </Stack.Navigator>
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