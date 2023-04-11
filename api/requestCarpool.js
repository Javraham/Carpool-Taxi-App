import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function MakeCarpoolRequest({created_by_id, send_request_to_id, waypoint}) {
    const access_token = `Bearer ${await AsyncStorage.getItem("access_token")}`
    const res = await axios.post("/request/requestCarpool", {created_by_id, send_request_to_id, waypoint}, {
        headers: {
            Authorization: access_token
        }
    })
    console.log(res.status)
    return res
}