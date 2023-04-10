import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';

import * as Linking from 'expo-linking';
import Constants from "expo-constants";
const { manifest } = Constants;


// TODO: get user info from smth
const user = { email : "test@gmail.com" };

function AddAuthorizationCode({route, navigation}) {
    const authorization_code = route.params.code;
    const url = `http://${manifest.debuggerHost.split(':').shift()}:8888/addAuthorizationCode`;
    console.log("auth code", authorization_code);
    console.log(url);

    fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'email' : user.email,
            'authorization_code' : authorization_code
        })
        // body: `email=${user.email}&authorization_code=${auth_code}`
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    }).catch(error => {
        console.log(error);
    });

    return (<Text>====================</Text>);

}

export default AddAuthorizationCode;
