import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../app/components/appInput';
import AppButton from '../app/components/appButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';



function UserProfileEdit({navigation}) {

    //sample data
    const [inputs, setInputs] = useState({
        email: 'abhi@gmail.com',
        fullname: 'Abhiram Neelamraju' ,
        phonenumber: '1234567890',
        playlistLink: 'https://open.spotify.com/playlist/3cJ66AX6yV2MglTSNkgGYA?si=67fddd03b2f74c56',
        password: '',
        oldPassword: ''
    });

    const [showPassword, setShow] = useState(false);

    
    const numRatings = '20';
    const avgRating = '4.3';

    const [errors, setErrors] = useState({});
    const [valid, setValidity] = useState({
        email: true,
        fullname: true,
        phonenumber: true,
        password: true,
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

    console.log(inputs.playlistLink)

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

        if (Object.entries(valid).every(([key, value]) => value )){
            updateProfile();
            navigation.dispatch(StackActions.pop(1))

        }
        else{
            console.log(valid)
        }

    }

    const updateProfile = () => {
        console.log('updated')
    }

    const toggleShow = () => {
        setShow(!showPassword)
        if(showPassword){
            setValidity(prevInputs => ({...prevInputs, password:true}))
            handleErrors(null, 'password')
        }
        else{
            setValidity(prevInputs => ({...prevInputs, password:false}))
        }
    }
    
    console.log(valid.password)
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
                    <Text style = {{fontSize: 24, fontWeight: 'bold', color: 'grey', margin: 15}}>{inputs.fullname}</Text>
                    <Text style = {{fontSize: 16, color: 'grey'}}>{avgRating} <Icon name = "star" size = {16} color = {"#eaea00"} /> ({numRatings} ratings)</Text>

                </View>
                <View style = {{ width: '100%'}}>
                    <FormInput 
                        label='Full Name' 
                        placeholder = {inputs.fullname}
                        iconName={'user'}
                        onChangeText = {text => displayInputState(text, 'fullname')}
                        value = {inputs.fullname}
                        error={errors.fullname}
                        resetError = {() => handleErrors(null, 'fullname')}
                        isValid={valid.fullname}
                        />
                    
                    <FormInput 
                        label='Email' 
                        placeholder = {'email'}
                        iconName={'envelope-o'}
                        onChangeText = {text => displayInputState(text, 'email')}
                        value = {inputs.email}
                        error={errors.email}
                        resetError = {() => handleErrors(null, 'email')}
                        isValid={valid.email}
                        />
                    <FormInput 
                        label='Phone Number' 
                        placeholder  = {'phone number'}
                        iconName={'phone'}
                        onChangeText = {text => displayInputState(text, 'phonenumber')}
                        value = {inputs.phonenumber}
                        error={errors.phonenumber}
                        resetError = {() => handleErrors(null, 'phonenumber')}
                        isValid={valid.phonenumber}
                        />
                    
                    <FormInput 
                        label='Spotify Playlist Link' 
                        placeholder  = {'Link'}
                        iconName={'music'}
                        onChangeText = {text => displayInputState(text, 'playlistLink')}
                        value = {inputs.playlistLink}
                        />
                    <FormInput 
                        label='Password' 
                        iconName={'lock'}
                        value = {'*********'}
                        editable={false}
                        />
                    <TouchableOpacity onPress={toggleShow}><Text style = {{color: 'blue', textDecorationLine: 'underline'}}>{!showPassword ? 'Change Password?' : 'Cancel'}</Text></TouchableOpacity>
                    {showPassword &&
                        <View> 
                        <FormInput 
                        label='Old Password' 
                        placeholder  = {'type old password'}
                        iconName={'lock'}
                        onChangeText = {text => displayInputState(text, 'oldPassword')}
                        secureEntry = {true}
                        /> 
                        <FormInput 
                        label='New Password' 
                        placeholder  = {'type new password'}
                        iconName={'lock'}
                        onChangeText = {text => displayInputState(text, 'password')}
                        error = {errors.password}
                        secureEntry ={true}
                        isValid = {valid.password}
                        resetError = {() => handleErrors(null, 'password')}
                        />
                        </View>
                    }
                </View>
                <View style = {{width: '100%'}}>
                    <AppButton text="save profile" bgColor='#00ABE4' txtColor='white' onPress={authenticate}/>
                    <AppButton text = "delete profile"/>
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

export default UserProfileEdit;