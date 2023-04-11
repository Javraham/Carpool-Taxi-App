import React, { useCallback, useEffect, useRef, useState } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CustomeTextInput from '../app/components/CustomTextInput';
import PressableBadge from '../app/components/PressableBadge';
import {GooglePlacesAutocomplete} from '../app/components/GooglePlacesAutocomplete';
import MapView , {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import CarpoolInfoBottomSheet from '../app/components/CarpoolInfoBottomSheet';
import PassangerCountBottomSheet from '../app/components/PassangerCountBottomSheet';
import MyInfoBottomSheet from '../app/components/MyInfoBottomSheet';
import { Button } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MakeCarpoolRequest from '../api/requestCarpool';
import { StackActions } from '@react-navigation/native';

export default function AcknowledgeCarpool({navigation, route}) {
    const [query, setQuery] = useState({id:'', text:''});
    const [result, setResult] = useState({id:'', text:''})
    const [trip, setTrip] = useState({})
    const [displayMap, setDisplayMap] = useState(false)
    const [ogTrip, setOGTrip] = useState();
    const [waypoints, setWayPoints] = useState();
    const [currentSheet, setCurrentSheet] = useState(''); 
    const [requestInformation, setRequestInformation] = useState({})
    const [coords, setCoords] = useState([])
    const autocomplete = useRef();
    const map = useRef()
    const passangerCountSheetRef = useRef();
    const carpoolInfoSheetRef = useRef();
    const myInfoSheetRef = useRef();
    

    useEffect(() => {
        let offer = route.params.offer
        const offer_trip = {
            destination: offer["destination"],
            origin: offer["origin"],
            waypoints: offer["waypoints"]
        }
        setCoords([offer["origin"]["geometry"], offer["destination"]["geometry"]])
        setOGTrip(offer)
        setTrip(offer)
    },[])
   
    useEffect(() => {
        if(trip.waypoints && ogTrip.waypoints){
        if (trip.waypoints.length > ogTrip.waypoints.length){
            trip.waypoints.pop()
            setDisplayMap(false)
        }}
        autocomplete.current.setAddressText(query.text)
    }, [query])

    useEffect(() => {
        if (result.text.length > 0){
            (async() => {
                const uid = JSON.parse(await AsyncStorage.getItem("user")).uid
                const geometry = await getGeometry(result.text)
                setRequestInformation(
                    {
                        waypoint:{name:result.text, geometry},
                        created_by_id: uid,
                        send_request_to_id: trip.created_by_id
                    }
                )
                setTrip((prev) => {
                    if (!trip.waypoints.includes({name:result.text, geometry})){
                        return({...prev, waypoints: [...(trip.waypoints),({name:result.text, geometry})], created_by_id:uid})
                    }
                    return prev
            })
            })()     
        }
    },[result])

    useEffect(() => {
        console.log(requestInformation)
    },[requestInformation])
    
    useEffect(() => {
        if (trip.waypoints && ogTrip.waypoints){
            if (trip.waypoints.length > ogTrip.waypoints.length) {
                let w = []
                trip.waypoints.forEach((waypoint)=>{
                    w.push(waypoint.geometry)
                })
                setWayPoints(w)
                setDisplayMap(true)
            }else{
                setDisplayMap(false)
        }
    }
    },[trip])

    async function handleRequestCarpool() {
        try{
            console.log(requestInformation)
            await MakeCarpoolRequest(requestInformation)
            navigation.dispatch(StackActions.pop(1))
            navigation.navigate('Home Tab')
        }catch(err){
            console.log(err)
        }
    }

    const openPassangerCountBottomSheet = useCallback((index) => {
        passangerCountSheetRef.current?.snapToIndex(index);
    },[])

    const openCarpoolInfoBottomSheet = useCallback((index) => {
        carpoolInfoSheetRef.current?.snapToIndex(index);
    },[])

    const openMyInfoBottomSheet = useCallback((index) => {
        myInfoSheetRef.current?.snapToIndex(index);
    },[])
    function fitMapToPolyline() {
        map.current.fitToCoordinates(coords,{
            edgePadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          });
        }
    return (
        <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <View style={{height:'30%', width:'100%', marginBottom:3}}>
                    {/* changed to marginBottom was 8% */}
                    <ScrollView horizontal style={styles.header} contentContainerStyle={{display:'flex', alignItems:'center'}}>
                        <PressableBadge title="Passanger Count" iconName="account-multiple" openBottomSheet={openPassangerCountBottomSheet} setCurrentSheet={setCurrentSheet}/>
                        <PressableBadge title="Carpool Info" iconName="car-info" openBottomSheet={openCarpoolInfoBottomSheet} setCurrentSheet={setCurrentSheet}/>
                        <PressableBadge title="My Info" iconName="account" openBottomSheet={openMyInfoBottomSheet} setCurrentSheet={setCurrentSheet}/>
                    </ScrollView>
                </View>
                <CustomeTextInput id="waypoint" placeHolder="Where to?" setQuery={setQuery} result={result}/>
            </View>
            <View style={{flex:1, width:'100%', height:'100%'}}>
                    <GooglePlacesAutocomplete 
                        ref={autocomplete}
                        query={{
                            key: 'AIzaSyBESUaDA8aUP-N6sF3fLRixfTh6AEYJZSU',
                            language: 'en',
                        }}
                        styles={{description:{flex:1, alignSelf:'center',justifyContent:'center',fontWeight:'bold'}}}
                        onFail={(e) => {
                            console.log(e)
                        }}
                        onPress={(data) => {
                            autocomplete.current.setAddressText('')
                            setResult({id:query.id, text:data.description})
                            setQuery({id:'', text:''})
                        }}
                    />
                    {displayMap && <MapView style={styles.map} ref={map}>
                        {coords.map((coord, index) => {
                            console.log(coords)
                            return(<Marker key={index} coordinate={coord}/>)})}
                        {waypoints.map((waypoint,index) => (
                            <Marker key={`waypoint ${index}`} coordinate={waypoint}/>
                        ))}
                        <MapViewDirections
                            origin={trip.origin.name}
                            destination={trip.destination.name}
                            apikey="AIzaSyBESUaDA8aUP-N6sF3fLRixfTh6AEYJZSU"
                            waypoints={waypoints}
                            strokeColor='black'
                            strokeWidth={10}
                            onError={(e) => {
                                console.log(e)
                            }}
                            onReady={fitMapToPolyline}
                        />
                    </MapView>}
                </View>
                {currentSheet === "Passanger Count" && <PassangerCountBottomSheet isDisabled={true} sheetRef={passangerCountSheetRef} count={route.params.offer["passenger_limit"]["value"]}/>}
                {currentSheet === "Carpool Info" && <CarpoolInfoBottomSheet sheetRef={carpoolInfoSheetRef} offer={route.params.offer}/>}
                {/* {currentSheet === "My Info" && <MyInfoBottomSheet sheetRef={myInfoSheetRef}/>} */}
                {displayMap && 
                <View style={{width:'100%', display:'flex', flexDirection:'row'}}>
                    <Button style={{backgroundColor:'green', width:"50%"}} title="Accept" onPress={() => {
                        navigation.push("Rate Rider")
                    }}/>
                    <Button style={{backgroundColor:'red', width:"50%"}} title="Reject" onPress={() => {
                        navigation.dispatch(StackActions.pop(1))
                    }}/>
                </View>
                }
                

        </View>
    )
}

async function getGeometry(address) {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBESUaDA8aUP-N6sF3fLRixfTh6AEYJZSU`,{
        method:'Get'
    })
    const data = await res.json()
    const {lat, lng} = (data.results[0].geometry.location)
    return {latitude:lat, longitude:lng}
}

const styles = StyleSheet.create({
    pageContainer: {
      flex:1
    },
    inputContainer: {
        width:'100%',
        height:'20%',
        backgroundColor:'white',
        elevation:2, 
        shadowOpacity:2, 
        borderBottomWidth:0,
        alignItems:'center',
        position:'relative',
        zIndex:1,
        justifyContent:'space-evenly'
    },
    header:{
        width: '100%',
        paddingHorizontal:'2%'
    },
    MapContainer: {
        width:'100%',
        height:'50%',
    },
    map: {
      width: '100%',
      height: '100%'
    },
  });