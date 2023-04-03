import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../app/components/appInput';
import AppButton from '../app/components/appButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

function RegistrationPage({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
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
                    <Text style = {{fontSize: 24, fontWeight: 'bold', color: 'grey'}}>Create Account</Text>
                </View>
                <View style = {{ width: '100%'}}>
                    <FormInput 
                        label='Full Name' 
                        placeholder = "Enter your full name"
                        iconName={'user'}
                        value={fullname}
                        setValue={setFullname}
                        />
                    <FormInput 
                        label='Email' 
                        placeholder = "Enter your email address"
                        iconName={'envelope-o'}
                        value={email}
                        setValue={setEmail}
                        />
                    <FormInput 
                        label='Phone Number' 
                        placeholder  = "Enter your phone number"
                        iconName={'phone'}
                        value={phonenumber}
                        setValue={setPhonenumber}
                        />
                    <FormInput 
                        label='Password' 
                        placeholder  = "Enter your password"
                        iconName={'lock'}
                        secureEntry={true}
                        value={password}
                        setValue={setPassword}
                        />
                    <FormInput 
                        label='Confirm Password' 
                        placeholder = "Re-enter your password"
                        iconName={'lock'}
                        secureEntry={true}
                        />
                </View>
                <View style = {{width: '100%'}}>
                    <AppButton text="Create Account" bgColor='#00ABE4' txtColor='white'/>
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

export default RegistrationPage;