import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style = {styles.container}>
            <View style = {{alignItems: 'center', paddingVertical: 30}}>
                <Image style = {{width: 100, height: 100, tintColor: '#00ABE4'}}source = {require('../app/assets/car-xxl.png')}/>
                <Text style = {{fontSize: 30, fontWeight: 'bold', color: 'darkgrey'}}>LogIn</Text>
            </View>
            <View style = {{width: '100%'}}>
                <FormInput 
                    placeholder = "user123@gmail.com" 
                    label = "Email"
                    value = {username}
                    setValue={setUsername}
                    iconName={'envelope-o'}
                    />
                <FormInput 
                placeholder = "Password" 
                label = "Password" 
                secureEntry = {true}
                value = {password}
                setValue={setPassword}
                iconName={'unlock-alt'}
                passIcon={'eye'}
                />
            </View>
            <View style = {{width: '100%', paddingVertical: 30}}>
                <AppButton text = "log in" txtColor='white' bgColor='#00ABE4'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
    }
})

export default LoginPage;