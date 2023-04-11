import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function Login({email, password}) {
    // try{
    //     await AsyncStorage.clear()
    // }catch(err){
    //     console.log(err)
    // }
    const res = await axios.post("/auth/signin", {email: email.toLowerCase(), password})
    AsyncStorage.setItem("access_token", res.headers["authorization"].split(" ")[1])
    console.log(res.data)
    AsyncStorage.setItem("user", JSON.stringify(await res.data))
    
    console.log(`${email} --- ${res.headers["authorization"].split(" ")[1]}`)
    return res
}