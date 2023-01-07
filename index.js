/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startNotesObserver} from "./utils/background_task_utils";

AppRegistry.registerComponent(appName, () => App);
setTimeout(()=> startNotesObserver(10000, 100).catch(err=> console.error(err)), 2000);