/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from "./stacks/Home";
import {AddNote} from "./stacks/AddNote";
import {DisplayNotes} from "./stacks/DisplayNotes";

const Stack = createStackNavigator();

const App: () => Node = () => {
    const ref = React.useRef(null);
    return (
        <View style={styles.container}>
            <NavigationContainer ref={ref}>
                <Stack.Navigator initialRouteName="Empty">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="AddNote" component={AddNote} />
                    <Stack.Screen name="DisplayNotes" component={DisplayNotes} />
                </Stack.Navigator>
            </NavigationContainer>
            <Button
                onPress={() => ref.current && ref.current.navigate('Home')}
                title="My Profile"/>
            <Button
                onPress={() => ref.current && ref.current.navigate('DisplayNotes')}
                title="My Notes"/>
            <Button
                onPress={() => ref.current && ref.current.navigate('AddNote')}
                title="Add Note"/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});

export default App;
