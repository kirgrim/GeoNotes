/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundService from 'react-native-background-actions';
import notifee, { AndroidImportance } from '@notifee/react-native';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const positionObserverJobName = "positionObserver";


const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        const channelId = await notifee.createChannel({
            id: "1",
            name: "abc",
        });
        console.log('created channel id = ', channelId)
        for (let i = 0; BackgroundService.isRunning(); i++) {
            await notifee.displayNotification({
                title: 'New message has arrived!',
                subtitle: `Check it!`,
                body: `Message # ${i}`,
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
            }).catch(err=>console.error('notifee err=',err));
            console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: positionObserverJobName,
    taskTitle: 'Checking for notes',
    taskDesc: 'We are checking if there are any of your geonotes nearby...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 3000,
    }
};

BackgroundService.start(veryIntensiveTask, options).catch(err=>console.error('err=',err));

AppRegistry.registerComponent(appName, () => App);