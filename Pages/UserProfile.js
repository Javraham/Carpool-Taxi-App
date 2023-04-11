import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../app/components/appInput';
import AppButton from '../app/components/appButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';



function UserProfile({navigation}) {

    //sample data

    const [email, setEmail] = useState('abhi@gmail.com');
    const [phonenumber, setPhonenumber] = useState('1234567890');
    const [fullname, setFullname] = useState('Abhiram Neelamraju');
    const [playlistLink, setPlaylistLink] = useState('https://open.spotify.com/playlist/3cJ66AX6yV2MglTSNkgGYA?si=67fddd03b2f74c56');
    const [numRatings, setNumRatings] = useState('20');
    const [avgRating, setAvgRating] = useState('4.3');
    
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <Icon size = {20} name = 'arrow-left' onPress = {() => navigation.goBack()}/>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <Icon name = 'user-circle' size = {70} color = {'#00ABE4'}/>
                    <Text style = {{fontSize: 24, fontWeight: 'bold', color: 'grey', margin: 15}}>{fullname}</Text>
                    <Text style = {{fontSize: 16, color: 'grey'}}>{avgRating} <Icon name = "star" size = {16} color = {"#eaea00"} /> ({numRatings} ratings)</Text>
                    

                </View>
                <View style = {{ width: '100%'}}>
                    <FormInput 
                        label='Full Name' 
                        placeholder = {fullname}
                        iconName={'user'}
                        editable={false}
                        placeholderColor={'black'}
                        />
                    
                    <FormInput 
                        label='Email' 
                        placeholder = {email}
                        iconName={'envelope-o'}
                        editable={false}
                        placeholderColor={'black'}
                        />
                    <FormInput 
                        label='Phone Number' 
                        placeholder  = {phonenumber}
                        iconName={'phone'}
                        editable={false}
                        placeholderColor={'black'}
                        />
                    
                    <FormInput 
                        label='Spotify Playlist Link' 
                        placeholder  = {playlistLink}
                        iconName={'music'}
                        editable={false}
                        placeholderColor={'black'}
                        />

                </View>
                <View style = {{width: '100%'}}>
                    <AppButton text="Edit" bgColor='#00ABE4' txtColor='white' onPress = {() => navigation.navigate('ProfileEdit')}/>
                </View>
            </View>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 15,
        alignItems: 'center',
    },

    back: {
        position: 'absolute',
        top: 20,
        left: 10,
    }
})

export default UserProfile;
