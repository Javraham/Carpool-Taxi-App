import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetAllOffers() {
    const access_token = `Bearer ${await AsyncStorage.getItem("access_token")}`

    const res = await axios.get("/request/getAllOffers", {
        headers: {
            Authorization: access_token
        }
    })
    
    return res
}