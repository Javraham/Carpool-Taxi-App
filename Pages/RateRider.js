import React from 'react';
import {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import AppButton from '../app/components/appButton';
import RateButton from '../app/components/rateButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function RateRiderPage({navigation}) {
    const [clicked, setClick] = useState([])
    const [disable, setDisable] = useState(true)
    const [rating, setRating] = useState(null)
    const [message, setMessage] = useState('')

    const handleClick = (input) => {
        let i = 0;
        updateClick = [false, false, false, false, false]
        while(i < input){
            updateClick[i] = true
            i++;
        }
        setClick(updateClick)
        setRating(input == 1 ? 1 : input == 2 ? 2 : input == 3 ? 3 : input == 4 ? 4 : 5)
        setMessage(
            input == 1 ? 'Not good' : input == 2 ? 'Could be better' : input == 3 ? 'Neutral' : input == 4 ? 'Great!' : 'Excellent!'
        )
        setDisable(false)
    }


    console.log(rating)

    return (
        <SafeAreaProvider>
            <SafeAreaView style = {{flex: 1}}>
            <View style = {styles.container}>
                <View style = {styles.rateContainer}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {styles.h1}>How was your ride with 'name' today?</Text>
                        <Text>Please choose a rating for 'name'</Text>
                    </View>
                    <View style = {{alignItems: 'center'}}>
                        <View style = {styles.starContainer}>
                            <RateButton iconName = {clicked[0] ? 'star' : 'star-o'}  onPress = {() => handleClick(1)}/>
                            <RateButton iconName = {clicked[1] ? 'star' : 'star-o'}  onPress = {() => handleClick(2)}/>
                            <RateButton iconName = {clicked[2] ? 'star' : 'star-o'}  onPress = {() => handleClick(3)}/>
                            <RateButton  iconName = {clicked[3] ? 'star' : 'star-o'} onPress = {() => handleClick(4)}/>
                            <RateButton iconName = {clicked[4] ? 'star' : 'star-o'} onPress = {() => handleClick(5)}/>
                        </View>
                        <View>
                            <Text style = {{color: 'gold'}}>{message}</Text>
                        </View>
                    </View>
                    <View style  = {{width : '80%'}}>
                        <AppButton text = 'submit' bgColor={'#89CFF0'} txtColor={'white'} disabled = {disable} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
        </SafeAreaProvider>
  );
}

export default RateRiderPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
    },

    starContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    h1: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },

    rateContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '40%',
        width: '90%'
    }
})