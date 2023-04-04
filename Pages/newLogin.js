import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function NewLoginPage({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState();

    const handleEmail = (text) => {
        setEmail(text)
    }

    const handlePassword = (text) => {
        setPassword(text)
    }

    const handleErrors = (errorMsg) => {
        setPasswordError(errorMsg);
    }

    const authenticate = () => {
        if(password !== email) {
            handleErrors('invalid email and/or password. Please try again.')
        }
        else {
            login()
        }
    }

    const login = () => {
        // navigation.navigate('Home')
        console.log('Logged in ')
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <Icon size = {20} name = 'arrow-left' onPress={() => navigation.goBack()}/>
                </View>
                <View style = {{flex: 2, justifyContent: 'center'}}>
                <View style = {{alignItems: 'center', paddingVertical: 30}}>
                    <View style = {styles.icon}>
                        <Icon size = {70} name = 'taxi' color = '#00ABE4' style = {{top: 20}}/>
                    </View>
                    <Text style = {{fontSize: 30, color: 'white', fontWeight: 'bold'}}>Welcome Back</Text>
                </View>
                </View>
                <View style = {styles.signin}>
                    <View style = {{width: '80%'}}>
                        <View style = {{alignItems: 'center'}}>
                            <Text style = {{fontSize: 20, color: 'grey', fontWeight: 'bold'}}>Sign in to your account</Text>
                        </View>
                        </View>
                        <View style = {{width: '80%'}}>
                        <FormInput 
                            placeholder = "user123@gmail.com" 
                            label = "Email"
                            iconName={'envelope-o'}
                            onChangeText = {text => handleEmail(text)}
                            resetError={() => handleErrors(null)}
                            />
                        <FormInput 
                        placeholder = "Password" 
                        label = "Password" 
                        secureEntry = {true}
                        iconName={'unlock-alt'}
                        passIcon={'eye'}
                        onChangeText = {text => handlePassword(text)}
                        resetError={() => handleErrors(null)}
                        error = {passwordError}
                        />
                    </View>
                    <View style = {{paddingVertical: 30, width: '50%'}}>
                        <AppButton text = "log in" txtColor='white' bgColor='#00ABE4' onPress={authenticate}/>
                        <View style = {{flexDirection: 'row'}}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress = {() => navigation.navigate('Register')}>
                            <Text style = {styles.register}>Register</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 1,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        alignItems: 'center',
        justifyContent: 'center'
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
    },

    register: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
})

export default NewLoginPage;