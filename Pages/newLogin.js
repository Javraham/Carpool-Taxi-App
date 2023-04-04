import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function NewLoginPage({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (text) => {
        setUsername(text)
    }

    const handlePassword = (text) => {
        setPassword(text)
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <Icon size = {20} name = 'arrow-left' onPress={() => navigation.goBack()}/>
                </View>
                <View style = {{alignItems: 'center', paddingVertical: 30}}>
                    <View style = {styles.icon}>
                        <Icon size = {70} name = 'taxi' color = '#00ABE4' style = {{top: 20}}/>
                    </View>
                    <Text style = {{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Taxi Carpool</Text>
                </View>
                <View style = {styles.signin}>
                    <View style = {{width: '80%'}}>
                        <View style = {{alignItems: 'center'}}>
                            <Text style = {{fontSize: 30, color: 'grey', fontWeight: 'bold'}}>Welcome Back!</Text>
                            <Text style = {{fontSize: 15, color: 'black', fontWeight: 'bold'}}>Login to your account</Text>
                        </View>
                        </View>
                        <View style = {{width: '80%'}}>
                        <FormInput 
                            placeholder = "user123@gmail.com" 
                            label = "Email"
                            iconName={'envelope-o'}
                            onChangeText = {text => handleUsername(text)}
                            // error = {usernameError}
                            />
                        <FormInput 
                        placeholder = "Password" 
                        label = "Password" 
                        secureEntry = {true}
                        iconName={'unlock-alt'}
                        passIcon={'eye'}
                        onChangeText = {text => handlePassword(text)}
                        // error = {passwordError}
                        />
                    </View>
                    <View style = {{paddingVertical: 30, width: '80%'}}>
                        <AppButton text = "log in" txtColor='white' bgColor='#00ABE4'/>
                    </View>
                </View>
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
        backgroundColor: '#00ABE4'
    },

    back: {
        position: 'absolute',
        top: 20,
        left: 10,
    },

    icon: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 62,
        width: 125,
        height: 125,
        alignItems: 'center',
        backgroundColor: 'white'
    },

    signin: {
        backgroundColor: 'white',
        width: '100%',
        marginHorizontal: 15,
        flex: 2,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    heading: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'white'
    },

    error: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#ffcccb',
        width: '80%'
    }
})

export default NewLoginPage;