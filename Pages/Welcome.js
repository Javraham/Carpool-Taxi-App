import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../app/components/appButton';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

function WelcomePage({navigation}) {
    return (
      <View style = {styles.mainContainer}>
        <View>
          <Text style = {styles.text}>Welcome to</Text>
        </View>
        <View style = {styles.logoContainer}>
          <View style = {styles.icon}>
            <Icon name = 'taxi' size = {100} color = '#00ABE4' style = {{top: 20}}/>
          </View>
          <View style = {{padding: 20}}>
            <Text style={{color: 'white', fontSize: 20}}>Taxi Carpool</Text>
          </View>
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
    height: 70,
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00ABE4',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  logoContainer: {
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },

  icon: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 75,
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default WelcomePage;