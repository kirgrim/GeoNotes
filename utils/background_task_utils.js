import notifee, {AndroidImportance} from "@notifee/react-native";
import BackgroundService from "react-native-background-actions";
import {getTimestamp, sleep} from "./timer_utils";
import {getCloseNotes, updateNote} from "./note_utils";
import {requestCurrentUserLocation} from "./location_utils";


const notesObserver = async (taskDataArguments) => {
    const { interval, maxDistance } = taskDataArguments;
    await new Promise( async (resolve) => {
        const channelId = await notifee.createChannel({
            id: "1",
            name: "notes_observer",
        });
        await notifee.requestPermission();
        while (BackgroundService.isRunning()){
            console.log('global.currentUser = ', global.currentUser);
            if (global.currentUser) {
                await requestCurrentUserLocation();
                if (!global.currentUserLocation){
                    console.warn('Failed to get current user location, skipping');
                }else {
                    const closeNotes = await getCloseNotes(global.currentUser, global.currentUserLocation, maxDistance);
                    for (const note of closeNotes) {
                        await notifee.displayNotification({
                            title: note.title,
                            subtitle: "Check your note!",
                            body: note.description,
                            data: {},
                            android: {
                                channelId,
                                importance: AndroidImportance.HIGH
                            },
                            ios: {
                                foregroundPresentationOptions: {
                                    alert: true,
                                    badge: true,
                                    sound: true,
                                },
                            },
                        }).then(async _=>await updateNote(note.id, {'last_notified_time': getTimestamp()})).catch(err => console.error('notifee err=', err));
                        await sleep(500);
                    }
                }
            }
            await sleep(interval);
        }
    });
};


export function startNotesObserver(interval, maxDistance){
    const notesObserverOptions = {
        taskName: "Nearby notes observer",
        taskTitle: 'Checking for notes',
        taskDesc: 'We are checking if there are any of your geonotes nearby...',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        parameters: {
            interval: interval,
            maxDistance: maxDistance
        }
    };
    return BackgroundService.start(notesObserver, notesObserverOptions).catch(err=>console.error('notesObserver error=',err));
}

export function stopBackgroundService(){
    return BackgroundService.stop();
}