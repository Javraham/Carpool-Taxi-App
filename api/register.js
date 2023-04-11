import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default async function Register({full_name, email, phone_number, password}) {
    const res = await axios.post('/auth/register', {full_name, email: email.toLowerCase(), phone_number, password})
    AsyncStorage.setItem("access_token", res.headers["authorization"].split(" ")[1])
    console.log(`${email} --- ${res.headers["authorization"].split(" ")[1]}`)
    return res
}

