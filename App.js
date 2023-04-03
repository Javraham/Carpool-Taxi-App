import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, TouchableHighlight } from 'react-native';
import WelcomePage from './Pages/Welcome';
import LoginPage from './Pages/Login';
import Registration from './Pages/Registration';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const {Navigator, Screen} = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name = "Welcome" component = {WelcomePage} 
          options = {{headerShown: false}}
          />
        <Screen name = "Register" component = {Registration}
          options = {{headerShown: false}}
          />
        <Screen name = "Login" component = {LoginPage}
          options = {{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
  }
