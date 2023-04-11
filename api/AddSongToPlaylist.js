import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default async function AddSongToPlaylist(data) {
    console.log(data);
    const access_token = `Bearer ${await AsyncStorage.getItem("access_token")}`

    const res = await axios.post('/addSongToPlaylist', data, {
        headers: {
            Authorization: access_token
        }
    });
    return res
}

