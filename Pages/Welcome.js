import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../app/components/appButton';
import { NavigationContainer } from '@react-navigation/native';

function WelcomePage({navigation}) {
    return (
      <View style = {styles.mainContainer}>
        <View style = {styles.logoContainer}>
          <Image style = {{width: 100, height: 100}}source = {require('../app/assets/car-xxl.png')}/>
          <Text style={{color: 'white', fontSize: 20}}>Welcome to TaxiApp!</Text>
        </View>
        <View style = {styles.regContainer}>
          <AppButton text = "Get Started" txtColor='black' bgColor='white' onPress={() => navigation.navigate('Register')}/>
          <View style = {{justifyContent: 'center', flexDirection: 'row'}}>
            <Text>Have an account? </Text>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
              <Text style = {{color: 'blue', textDecorationLine: 'underline'}}>Log in</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  regContainer: {
    position: 'absolute',
    bottom: 50,
    height: 70,
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00ABE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  logoContainer: {
    alignItems: 'center',
  },
})

export default WelcomePage;