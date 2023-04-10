import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as Linking from 'expo-linking';
import Constants from "expo-constants";
const { manifest } = Constants;


// TODO: get user info from smth
const user = { email : "test@gmail.com" };

function AuthenticateSpotify({navigation}) {
    console.log("in auth spotify");
    const [titleText, setTitleText] = useState("");

    // const url = `https://${IP}/getUser?email=${user.email}`;
    const userURL = `http://${manifest.debuggerHost.split(':').shift()}:8888/getUser?email=${user.email}`;
    const afterURL = Linking.createURL("addAuthCode"); // TODO: is this not temporary - update app settings every time
    // const afterURL = 'exp://192.168.0.246:19000/--/addAuthCode';
    // const afterURL = 'exp://localhost:19000/--/addAuthCode'; // doesn't work?
    console.log(userURL);

    fetch(userURL)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        if ("authorization_code" in json) {
            console.log("user already has authorization_code");
            setTitleText("User Already Authorized");
        } else {
            console.log("attempting to add authorization_code");
            // console.log(thisURL); // was exp://192.168.0.246:19000
            console.log(afterURL); 
            Linking.openURL(`https://accounts.spotify.com/authorize
?client_id=92e530b041c64d55afd304e3db2d5df4&response_type=code
&redirect_uri=${afterURL}&scope=playlist-modify-public%20
playlist-modify-private`);
            setTitleText("Waiting for Spotify...");
        }
    }).catch(error => {
        console.error(error);
    });

    /*
    */

    return (
        <SafeAreaProvider>
        <SafeAreaView style = {{flex: 1}}>
        <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
            <Text style={styles.baseText}>
            <Text style={styles.titleText}>
                {titleText}
            </Text>
            </Text>
            </View>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'grey'
    },

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
    },

    back: {
        position: 'absolute',
        top: 20,
        left: 10,
    }
})

export default AuthenticateSpotify;
