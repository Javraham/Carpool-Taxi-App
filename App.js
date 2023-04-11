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
import CarpoolOfferInformation from './Pages/CarpoolOfferInformation';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import CarpoolRequestInformation from './Pages/CarpoolRequestInformation';

import axios from 'axios';
axios.defaults.baseURL = "http://10.0.1.23:8888"

const Auth = createStackNavigator();
const Tabs = createBottomTabNavigator();
const RequestCarpoolStack = createStackNavigator();

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
  <RequestCarpoolStack.Navigator>
    <RequestCarpoolStack.Screen name='Offer Carpool' component={OfferCarpool} options={{headerShown:false}}/>
    <RequestCarpoolStack.Screen name='Carpool Offer Information' component={CarpoolOfferInformation} options={({route}) => {
      return {title: route.params.name, headerBackTitle: 'Back', headerStyle:{elevation:0, shadowOpacity:0, borderBottomWidth:0}}
    }}/>
  </RequestCarpoolStack.Navigator>
  )
}

const Tab = () => {
  return (
        <Tabs.Navigator>
          <Tabs.Screen name='Home Tab' component={HomePage} />
          <Tabs.Screen name='Offer Carpool Tab' component={OfferCarpoolScreen} options={{headerShown:false}}/>
          <Tabs.Screen name='Request Carpool Tab' component={RequestCarpoolScreen} options={{headerShown:false}}/>
          <Tabs.Screen name='Profile' component={UserProfile} />
        </Tabs.Navigator>
  )
}
export default function App() {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <NavigationContainer>
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
          <Auth.Screen name = "Home" component = {Tab} 
            options = {{headerShown: false}}
            />
        </Auth.Navigator>
      </NavigationContainer>
    </IconComponentProvider>
  );
  }
