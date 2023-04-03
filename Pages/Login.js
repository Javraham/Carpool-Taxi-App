import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function LoginPage({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <Icon size = {20} name = 'arrow-left' onPress = {() => navigation.goBack()}/>
                </View>
                <View style = {{alignItems: 'center', paddingVertical: 30}}>
                    <Icon size = {70} name = 'taxi' color = '#00ABE4'/>
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

export default LoginPage;