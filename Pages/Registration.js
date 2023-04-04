import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../app/components/appInput';
import AppButton from '../app/components/appButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

function RegistrationPage({navigation}) {
    const [inputs, setInputs] = useState({
        email: '',
        fullname: '',
        phonenumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [valid, setValidity] = useState({
        email: false,
        fullname: false,
        phonenumber: false,
        password: false,
        confirmPassword: false
    });

    const handleInputs = (text, input) => {
        setInputs(prevInputs => ({...prevInputs, [input]: text}))
    }

    const handleErrors = (errorMessage, input) => {
        setErrors((prevErrors) => ({...prevErrors, [input]: errorMessage}))
    }

    const checkValidity = (text, input) => {
        if(input === 'password'){
            if(text.length >= 8){
                setValidity(prevInputs => ({...prevInputs, [input]:true}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, [input]:false}))
            }
            if(text !== inputs.confirmPassword){
                setValidity(prevInputs => ({...prevInputs, confirmPassword:false}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, confirmPassword:true}))
            }
        }
        else if (input === 'confirmPassword'){
            if(text === inputs.password){
                setValidity(prevInputs => ({...prevInputs, [input]:true}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, [input]:false}))
            }
        }
        else if (input === 'email'){
            if(text.match(/\S+@\S+\.\S+/)){
                setValidity(prevInputs => ({...prevInputs, [input]:true}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, [input]:false}))
            }
        }
        else if (input === 'phonenumber'){
            if(text.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)){
                setValidity(prevInputs => ({...prevInputs, [input]:true}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, [input]:false}))
            }
        }
        else{
            if(text.length > 0){
                setValidity(prevInputs => ({...prevInputs, [input]:true}))
            }
            else{
                setValidity(prevInputs => ({...prevInputs, [input]:false}))
            }
        }
        
    }

    const displayInputState = (text, input) => {
        handleInputs(text, input)
        checkValidity(text, input)
    }

    const authenticate = () => {
        if(!valid.email){
            handleErrors('Please input a valid email', 'email')
        }
        if(!inputs.fullname){
            handleErrors('Please input your full name', 'fullname')
        }
        if(!valid.phonenumber){
            handleErrors('Please input your phone number', 'phonenumber')
        }
        if(!valid.password){
            handleErrors('Password must be at least 8 characters', 'password')
        }

        if(!valid.confirmPassword){
            handleErrors('Passwords do not match', 'confirmPassword')
        }

        if (Object.entries(valid).every(([key, value]) => value )){
            register();
        }
    }

    const register = () => {
        console.log('registered')
    }

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
                        error = {errors.fullname}
                        resetError = {() => handleErrors(null, 'fullname')}
                        onChangeText = {text => displayInputState(text, 'fullname')}
                        isValid={valid.fullname}
                        />
                    <FormInput 
                        inputMode = 'email'
                        label='Email' 
                        placeholder = "Enter your email address"
                        iconName={'envelope-o'}
                        error = {errors.email}
                        resetError = {() => handleErrors(null, 'email')}
                        onChangeText = {text => displayInputState(text, 'email')}
                        isValid={valid.email}
                        />
                    <FormInput 
                        inputMode = 'tel'
                        label='Phone Number' 
                        placeholder  = "Enter your phone number"
                        iconName={'phone'}
                        error = {errors.phonenumber}
                        resetError = {() => handleErrors(null, 'phonenumber')}
                        onChangeText = {text => displayInputState(text, 'phonenumber')}
                        isValid={valid.phonenumber}
                        />
                    <FormInput 
                        label='Password' 
                        placeholder  = "Enter your password"
                        iconName={'lock'}
                        secureEntry={true}
                        error = {errors.password}
                        resetError = {() => handleErrors(null, 'password')}
                        onChangeText = {text => displayInputState(text, 'password')}
                        isValid={valid.password}
                        />
                    <FormInput 
                        label='Confirm Password' 
                        placeholder = "Re-enter your password"
                        iconName={'lock'}
                        secureEntry={true}
                        error = {errors.confirmPassword}
                        resetError = {() => handleErrors(null, 'confirmPassword')}
                        onChangeText = {text => displayInputState(text, 'confirmPassword')}
                        isValid={valid.confirmPassword}
                        />
                </View>
                <View style = {{width: '100%'}}>
                    <AppButton text="Create Account" bgColor='#00ABE4' txtColor='white' onPress={authenticate}/>
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