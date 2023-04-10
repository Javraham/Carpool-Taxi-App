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
import AuthenticateSpotify from './Pages/AuthenticateSpotify';
import AddAuthorizationCode from './Pages/AddAuthorizationCode';

const Auth = createStackNavigator();
const Tabs = createBottomTabNavigator();

const linking = { // for spotify
    prefixes: ['exp://192.168.0.246:19000'], // TODO: is this temp
    config: {
        screens: {
            AddAuthorizationCode: {
                path: "--/addAuthCode",
            }
        }
    }
}

export default function App() {
  return (
    <NavigationContainer linking = {linking}>
      <Auth.Navigator>
        <Auth.Screen name = "Welcome" component = {WelcomePage} 
          options = {{headerShown: false}}
          />
        <Auth.Screen name = "Register" component = {RegistrationPage}
          options = {{headerShown: false}}
          />
        <Auth.Screen name = "Login" component = {NewLoginPage}
          options = {{headerShown: false}}
        />
        <Auth.Screen name = "Home" component = {HomePage}
          options = {{headerShown: false}}
        />
        <Auth.Screen name = "AuthenticateSpotify" component = {AuthenticateSpotify}
          options = {{headerShown: false}}
        />
        <Auth.Screen name = "AddAuthorizationCode" component = {AddAuthorizationCode}
          options = {{headerShown: false}}
        />
      </Auth.Navigator>
      {/* <Tabs.Navigator>
        <Tabs.Screen name='Home' component={HomePage} />
        <Tabs.Screen name='Offer Carpool' component={OfferCarpool} />
        <Tabs.Screen name='Request Carpool' component={RequestCarpool} />
        <Tabs.Screen name='Profile' component={UserProfile} />
      </Tabs.Navigator> */}
    </NavigationContainer>
  );
  }
