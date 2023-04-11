import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function PostOffer({created_by_id, origin, destination, passenger_limit, taxi_id}) {
    const access_token = `Bearer ${await AsyncStorage.getItem("access_token")}`

    const res = await axios.post("/offer/create", {created_by_id, origin, destination, passenger_limit, taxi_id}, {
        headers: {
            Authorization: access_token
        }
    })
    
    return res
}