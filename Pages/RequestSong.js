import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Constants from "expo-constants";
const { manifest } = Constants;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddSongToPlaylist from '../api/AddSongToPlaylist';

function RequestSongPage({navigation}) {
    const [query, setQuery] = useState('');
    const [statusText, setStatusText] = useState('');

    async function addSong() {
        // const access_token = await AsyncStorage.getItem("access_token");
        const user = await AsyncStorage.getItem("user");
        // const url = `http://${manifest.debuggerHost.split(':').shift()}:8888/request/getAllRequests`;
        const uid = JSON.parse(user).uid;
        console.log(uid);
        console.log(query);
        
        try {
            const res = await AddSongToPlaylist({query, uuid: uid});
            console.log(res.data);
            setStatusText('song added');
        }catch(err){
            console.log(err.response.data)
            setStatusText('could not add song');
        }


        /*

        try {
            const res = await GetAllRequests();
            console.log(res.data);
            var offerer_id;
            for (var i = 0; i < res.data.length(); i++) {
                // found involved carpool
                if (res.data[i].created_by_id == user.uuid) {
                    offerer_id = res.data[i].send_request_to_id;
                    console.log('found request offerer', offerer_id);
                    break;
                }
            }
            if (!offerer_id) return;

            const added = await AddSongToPlaylist();
            setStatusText('song added');
        }catch(err){
            console.log(err)
            setStatusText('could not add song');
        }
        */
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <Icon size = {20} name = 'arrow-left' onPress = {() => navigation.goBack()}/>
                </View>
                <View style = {{alignItems: 'center', paddingVertical: 30}}>
                    <Icon size = {70} name = 'music' color = '#00ABE4'/>
                    <Text style = {{fontSize: 30, fontWeight: 'bold', color: 'darkgrey'}}>Request Song</Text>
                </View>

                <View style = {{width: '100%'}}>
                    <FormInput 
                        placeholder = "Never Gonna Give You Up Rick Astley" 
                        label = "Song"
                        onChangeText = {setQuery}
                        iconName={"music"}
                    />
                </View>

                <View style = {{width: '100%', paddingVertical: 30}}>
                    <AppButton text = "Add Song to Playlist" txtColor='white' bgColor='#00ABE4' onPress={addSong}/>
                </View>
                <Text style={styles.statusText}>
                    {statusText}
                </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
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

export default RequestSongPage;
