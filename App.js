import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, TouchableHighlight } from 'react-native';
import WelcomePage from './Pages/Welcome';
import LoginPage from './Pages/Login';
import RegistrationPage from './Pages/Registration';
import HomePage from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import RequestCarpool from './Pages/RequestCarpool';
import OfferCarpool from './Pages/OfferCarpool';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NewLoginPage from './Pages/newLogin';

const Auth = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Auth.Navigator>
        <Auth.Screen name = "Welcome" component = {WelcomePage} 
          options = {{headerShown: false}}
          />
        <Auth.Screen name = "Register" component = {RegistrationPage}
          options = {{headerShown: false}}
          />
        <Auth.Screen name = "Login" component = {NewLoginPage}
          options = {{headerShown: false}}
        />
      </Auth.Navigator> */}
      <Tabs.Navigator>
        <Tabs.Screen name='Home' component={HomePage} />
        <Tabs.Screen name='Offer Carpool' component={OfferCarpool} />
        <Tabs.Screen name='Request Carpool' component={RequestCarpool} />
        <Tabs.Screen name='Profile' component={UserProfile} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
  }
