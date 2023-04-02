import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, TouchableHighlight } from 'react-native';
import WelcomePage from './Pages/Welcome';
import LoginPage from './Pages/Login';
import Registration from './Pages/Registration';

export default function App() {

  return (
    <View style = {{flex: 1}}>
      {/* <WelcomePage />
      <LoginPage/> */}
      <Registration />
      <StatusBar style="auto" />
    </View>
  );
  }
