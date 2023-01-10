/**
 * @format
 */

import {AppRegistry, NativeModules, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startNotesObserver} from "./utils/background_task_utils";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
setTimeout(()=> startNotesObserver(10000, 100).catch(err=> console.error(err)), 2000);