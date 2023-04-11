import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, TouchableHighlight } from 'react-native';
import WelcomePage from './Pages/Welcome';
import RegistrationPage from './Pages/Registration';
import HomePage from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import RequestCarpool from './Pages/RequestCarpool';
import OfferCarpool from './Pages/OfferCarpool';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginPage from './Pages/Login';
import CarpoolOfferInformation from './Pages/CarpoolOfferInformation';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import CarpoolRequestInformation from './Pages/CarpoolRequestInformation';
import RateRiderPage from './Pages/RateRider';
import UserProfileEdit from './Pages/UserEditProfile';
import AuthenticateSpotifyPage from './Pages/AuthenticateSpotify';
import AddAuthorizationCodePage from './Pages/AddAuthorizationCode';
import RequestSongPage from './Pages/RequestSong';

import axios from 'axios';
import Constants from "expo-constants";
import AcknowledgeCarpool from './Pages/AcknowledgeCarpool';
const { manifest } = Constants;

// axios.defaults.baseURL = "http://10.0.1.23:8888"
axios.defaults.baseURL = `http://${manifest.debuggerHost.split(':').shift()}:8888`;

const Auth = createStackNavigator();
const Tabs = createBottomTabNavigator();
const RequestCarpoolStack = createStackNavigator();
const OfferCarpoolStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();

const RequestCarpoolScreen = () => {
  return (
  <RequestCarpoolStack.Navigator>
    <RequestCarpoolStack.Screen name='Request Carpool' component={RequestCarpool}/>
    <RequestCarpoolStack.Screen name='Carpool Request' component={CarpoolRequestInformation} options={({route}) => {
      return {title: route.params.name, headerBackTitle: 'Back', headerStyle:{elevation:0, shadowOpacity:0, borderBottomWidth:0}}
    }}/>
  </RequestCarpoolStack.Navigator>
  )
}

const OfferCarpoolScreen = () => {
  return (
  <OfferCarpoolStack.Navigator>
    <OfferCarpoolStack.Screen name='Offer Carpool' component={OfferCarpool} options={{headerShown:false}}/>
    <OfferCarpoolStack.Screen name='Carpool Offer Information' component={CarpoolOfferInformation} options={({route}) => {
      return {title: route.params.name, headerBackTitle: 'Back', headerStyle:{elevation:0, shadowOpacity:0, borderBottomWidth:0}}
    }}/>
  </OfferCarpoolStack.Navigator>
  )
}

const ProfileScreen = () => {
  return(
    <ProfileStack.Navigator>
    <ProfileStack.Screen name='Profile' component={UserProfile} />
    <ProfileStack.Screen name='ProfileEdit' component={UserProfileEdit}/>
  </ProfileStack.Navigator>
  )

}

const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={HomePage} />
    <HomeStack.Screen name='Acknowledge Request' component={AcknowledgeCarpool}/>
    <HomeStack.Screen name='Rate Rider' component={RateRiderPage}/>
  </HomeStack.Navigator>
  )
}
const Tab = () => {
  return (
        <Tabs.Navigator>
          <Tabs.Screen name='Home Tab' component={HomeScreen} options={{headerShown:false}}/>
          <Tabs.Screen name='Offer Carpool Tab' component={OfferCarpoolScreen} options={{headerShown:false}}/>
          <Tabs.Screen name='Request Carpool Tab' component={RequestCarpoolScreen} options={{headerShown:false}}/>
          <Tabs.Screen name='Profile Tab' component={ProfileScreen} options={{headerShown:false}}/>
        </Tabs.Navigator>
  )
}

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
    // not sure where to the 3 spotify pages
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <NavigationContainer linking = {linking}>
      <Auth.Navigator>
          <Auth.Screen name = "Welcome" component = {WelcomePage} 
            options = {{headerShown: false}}
            />
          <Auth.Screen name = "Register" component = {RegistrationPage}
            options = {{headerShown: false}}
            />
          <Auth.Screen name = "Login" component = {LoginPage}
            options = {{headerShown: false}}
          />
          <Auth.Screen name = "Home" component = {Tab} 
            options = {{headerShown: false}}
            />
        
          <Auth.Screen name = "AuthenticateSpotify" component = {AuthenticateSpotifyPage} 
            options = {{headerShown: false}}
            />
          <Auth.Screen name = "AddAuthorizationCode" component = {AddAuthorizationCodePage} 
            options = {{headerShown: false}}
            />
          <Auth.Screen name = "RequestSong" component = {RequestSongPage}
              options = {{headerShown: false}}
            />
        </Auth.Navigator>
      </NavigationContainer>
    </IconComponentProvider>
  );
  }
