import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FormInput from '../app/components/appInput';
import AppButton from '../app/components/appButton';
import Icon from 'react-native-vector-icons/FontAwesome';

function Registration(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    return (
        <View style = {styles.container}>
            <View style = {{alignItems: 'center'}}>
                <Icon name = 'user-circle' size = {70} color = {'#00ABE4'}/>
                <Text style = {{fontSize: 24, fontWeight: 'bold', color: 'navy'}}>Create Account</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 15,
        alignItems: 'center',
    }
})

export default Registration;