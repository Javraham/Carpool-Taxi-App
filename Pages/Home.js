import React, { useEffect, useRef, useState, useCallback} from 'react';
import { View, Alert } from 'react-native';
import Subscribe from '../api/notificationsSubscribe';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, ListItem, Text } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Badge } from '@react-native-material/core';
import BottomeSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import CutomText from '../app/components/CustomText';
import MapView from 'react-native-maps';
import Constants from "expo-constants";

const { manifest } = Constants;

export default function Home({navigation}) {
    const [data, setData] = useState({myOffer:[],carpoolRequests:[]});
    const [myOffer, setMyOffer] = useState([])
    const [myRequest, setMyRequest] = useState([])
    const [incomingRequests, setIncomingRequests] = useState([])
    const [showOfferInfo, setShowOfferInfo] = useState(false)
    useEffect(() => {
        (async() => {
            const access_token = `Bearer ${await AsyncStorage.getItem("access_token")}`
            try {
                const es = new EventSourcePolyfill(`http://${manifest.debuggerHost.split(':').shift()}:8888/notifications/subscribe/myid`,{
                    headers: {
                        "Authorization": access_token
                    }
                })
                es.addEventListener('message', e => {
                    const data = JSON.parse(e.data)
                    setMyOffer(data["myOffer"])
                    setMyRequest(data["myRequest"])
                    setIncomingRequests(data["incomingRequests"])
                 });
            }catch(err){
                console.log(err)
            }
        })()
    },[])

    useEffect(() => {
        console.log(data)
    },[data])
    
    return (
        <View style={{flex:1}}>
                <View style={{backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center', height:30, width:'100%', marginBottom:0}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>My Offer</Text>
                </View>
                <ScrollView contentContainerStyle={{display:'flex', alignItems:'center'}}>
                {
                (myOffer.length == 0) ?
                    <></>
                    :
                <View style={{width:'100%'}}>
                    <ListItem onPress={() =>  {Alert.alert('Cancel Offer','',[{text:'Yes', onPress: () => console.log("cancel"), style:'cancel'},{text:'No'}])}} leading={<Badge  label="" color="green" />} title={`from: ${myOffer[0]["origin"]["name"]}`} secondaryText={`to: ${myOffer[0]["destination"]["name"]}`}/>
                </View>
                }
            </ScrollView>
            <Divider style={{ marginVertical: 10 }} leadingInset={16}/>

            <View style={{backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center', height:30, width:'100%', marginBottom:10}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>My Request</Text>
                </View>
            <ScrollView contentContainerStyle={{display:'flex', alignItems:'center'}}>
            {
                <View style={{width:'100%'}}>
                    {myRequest.map((request, index) => {
                        return(<ListItem key={`myrequest_${index}`} onPress={() =>  {Alert.alert('Cancel Offer','',[{text:'Yes', onPress: () => console.log("cancel"), style:'cancel'},{text:'No'}])}} leading={<Badge  label="" color="green" />} title={`from: ${request["waypoint"]["name"]}`} />)
                    })}
                </View>
                }
            </ScrollView>

            <Divider style={{ marginVertical: 10 }} leadingInset={16}/>
            <ScrollView contentContainerStyle={{display:'flex', alignItems:'center'}}>
                <View style={{backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center', height:30, width:'100%'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Incoming Requests</Text>
                </View>
                {
                <View style={{width:'100%'}}>
                    {incomingRequests.map((request, index) => {
                        return(<ListItem key={`request_${index}`} onPress={() => {
                            setShowOfferInfo(true)
                            console.log(myOffer)
                            navigation.push("Acknowledge Request", {name: "Acknowledge Request", offer:myOffer[0]})
                        }} leading={<Badge  label="" color="green" />} title={`from: ${request["waypoint"]["name"]}`} />)
                    })}
                </View>
                }
            </ScrollView>
        </View>
    )
}
