import React, { useEffect, useState } from 'react';
import { ListItem, Avatar } from "@react-native-material/core";
import {View} from 'react-native';
import GetAllOffers from '../api/getAllOffers';
import { Icon } from '@react-native-material/core';

export default function RequestCarpool({navigation}) {
    const [offers, setOffers] = useState([])
    useEffect(()=>{
        (async() => {
            try {
                const res = await GetAllOffers()
                console.log(res.data)
                setOffers(res.data)
            }catch(err){
                console.log(err)
            }
        })()
    }, [])

    return (
    <View>
        {offers.map((offer, index) => {
            return (
                <ListItem key={index} leading={<Icon name="map-marker-plus" size={24} />} title={`from: ${offer["origin"]["name"]}`} secondaryText={`to: ${offer["destination"]["name"]}`} onPress={() => {
                    navigation.push("Carpool Request", {name: "Plan Your Carpool", offer})
                }} />
            )
        })}
    
    </View>
    )
}



// onPress={() => {
//     navigation.push("Carpool Request", {name: "Plan Your Carpool"})
// }}