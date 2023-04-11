import React, { useEffect, useRef, useState, useCallback } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CustomeTextInput from '../app/components/CustomTextInput';
import PressableBadge from '../app/components/PressableBadge';
import {GooglePlacesAutocomplete} from '../app/components/GooglePlacesAutocomplete';
import MapView , {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import TaxiInformationBottomSheet from '../app/components/TaxiInformationBottomSheet'
import PassangerCountBottomSheet from '../app/components/PassangerCountBottomSheet';
import MyInfoBottomSheet from '../app/components/MyInfoBottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@react-native-material/core';
import PostOffer from '../api/postOffer';

export default function CarpoolOfferInformation({navigation,route}) {
    const [query, setQuery] = useState({id:'', text:''});
    const [result, setResult] = useState({id:'', text:''})
    const [trip, setTrip] = useState({})
    const [displayMap, setDisplayMap] = useState(false)
    const [currentSheet, setCurrentSheet] = useState(''); 
    const [offerInformation, setOfferInformation] = useState({created_by_id:'', origin:{}, destination:{}, passenger_limit:0, taxi_id:''})

    const autocomplete = useRef();
    const passangerCountSheetRef = useRef();
    const carpoolInfoSheetRef = useRef();
    const myInfoSheetRef = useRef();

    useEffect(() => {
        (async() => {
            const uid = JSON.parse(await AsyncStorage.getItem("user")).uid
            setOfferInformation((prev) => ({...prev, taxi_id: route.params.scannedData.taxi_id, created_by_id: uid}))
        })()
    },[])

    useEffect(() => {
        if (trip[query.id]){
            delete trip[query.id]
            setDisplayMap(false)
        }
        autocomplete.current.setAddressText(query.text)
    }, [query])

    useEffect(() => {
        if (result.text.length > 0){
            if (result.id == "origin"){
                (async() => {
                    const geometry = await getGeometry(result.text)
                    setTrip((prev) => ({...prev, origin: {name:result.text, geometry}}))
                })()
            }else{
                (async() => {
                    const geometry = await getGeometry(result.text)
                    setTrip((prev) => ({...prev, destination: {name:result.text, geometry}}))
                })()        
            }
        }
    },[result])

    useEffect(() => {
        if (Object.keys(trip).length == 2) {
            console.log(trip)
            setDisplayMap(true)
            setOfferInformation((prev) => ({...prev, origin: trip.origin, destination: trip.destination}))
        }else{
            setDisplayMap(false)
        }
    },[trip])

    // useEffect(() => {
    //     console.log(offerInformation)
    // },[offerInformation])

    const openPassangerCountBottomSheet = useCallback((index) => {
        passangerCountSheetRef.current?.snapToIndex(index);
    },[])

    const openTaxiInformationBottomSheet = useCallback((index) => {
        carpoolInfoSheetRef.current?.snapToIndex(index);
    },[])

    const openMyInfoBottomSheet = useCallback((index) => {
        myInfoSheetRef.current?.snapToIndex(index);
    },[])

    const map = useRef()

    function fitMapToPolyline() {
        map.current.fitToCoordinates([trip["origin"]["geometry"],trip["destination"]["geometry"] ],{
            edgePadding: {
              top: 160,
              right: 90,
              bottom: 90,
              left: 90,
            },
          });
        }
    
    async function handlePostOffer() {
        try{
            console.log(offerInformation)
            await PostOffer(offerInformation)
            navigation.navigate('Home Tab')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <View style={{height:'30%', width:'100%', marginBottom:3}}>
                    {/* changed to marginBottom */}
                    <ScrollView horizontal style={styles.header} contentContainerStyle={{display:'flex', alignItems:'center', marginRight:10}}> 
                        <PressableBadge title="Passanger Count" iconName="account-multiple" openBottomSheet={openPassangerCountBottomSheet} setCurrentSheet={setCurrentSheet}/>
                        <PressableBadge title="Taxi Info" iconName="car-info" openBottomSheet={openTaxiInformationBottomSheet} setCurrentSheet={setCurrentSheet} />
                        <PressableBadge title="My Info" iconName="account" openBottomSheet={openMyInfoBottomSheet} setCurrentSheet={setCurrentSheet}/>
                    </ScrollView>
                </View>
                <CustomeTextInput id="origin" placeHolder="Pickup Location" setQuery={setQuery} result={result}/>
                <CustomeTextInput id="destination" placeHolder="Where to?" setQuery={setQuery} result={result}/>                    
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
                        {Object.keys(trip).map((name) => (
                            <Marker key={name} coordinate={trip[name]["geometry"]}/>
                        ))}
                        <MapViewDirections
                            origin={trip.origin.name}
                            destination={trip.destination.name}
                            optimizeWaypoints
                            apikey="AIzaSyBESUaDA8aUP-N6sF3fLRixfTh6AEYJZSU"
                            waypoints={[]}
                            strokeColor='black'
                            strokeWidth={10}
                            onError={(e) => {
                                console.log(e)
                            }}
                            onReady={fitMapToPolyline}
                        />
                    </MapView>
                    }
                </View>
                {currentSheet === "Passanger Count" && <PassangerCountBottomSheet isDisabled={false} sheetRef={passangerCountSheetRef} setOfferInformation={setOfferInformation}/>}
                {currentSheet === "Taxi Info" && <TaxiInformationBottomSheet sheetRef={carpoolInfoSheetRef} taxiInformation={route.params.scannedData}/>}
                {currentSheet === "My Info" && <MyInfoBottomSheet sheetRef={myInfoSheetRef}/>}
                {displayMap && <Button style={{backgroundColor:'black'}} title="Post Offer" onPress={handlePostOffer}/>}
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