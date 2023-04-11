import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
const { manifest } = Constants;

export default async function Login({email, password}) {
    // try{
    //     await AsyncStorage.clear()
    // }catch(err){
    //     console.log(err)
    // }
    const serverURL = `http://${manifest.debuggerHost.split(':').shift()}:8888`;
    const res = await axios.post(serverURL + "/auth/signin", {email: email.toLowerCase(), password})
    // const res = await axios.post("/auth/signin", {email: email.toLowerCase(), password})
    AsyncStorage.setItem("access_token", res.headers["authorization"].split(" ")[1])
    AsyncStorage.setItem("user", JSON.stringify(await res.data))
    
    console.log(`${email} --- ${res.headers["authorization"].split(" ")[1]}`)
    return res
}
