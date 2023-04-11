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
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddAuthorizationCode({route, navigation}) {
    console.log('in add auth code')

    async function addAuthCode() {
        const email = await AsyncStorage.getItem("email");
        const authorization_code = route.params.code;
        const url = `http://${manifest.debuggerHost.split(':').shift()}:8888/addAuthorizationCode`;
        console.log("auth code", authorization_code);

        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email' : email,
                'authorization_code' : authorization_code
            })
            // body: `email=${user.email}&authorization_code=${auth_code}`
        })
        .then(response => response.json())
        .then(json => {
            console.log('auth code added', json);
            navigation.navigate('Home');
        }).catch(error => {
            console.log(error);
        });
    }
    addAuthCode();

    return (
        <View style = {styles.back}>
        <Icon size = {20} name = 'arrow-left' onPress = {() => navigation.goBack()}/>
        </View>
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


export default AddAuthorizationCode;
