import react, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function CutomText({id, text}) {

    return(
    <View id={id} style={styles.textInputContainer}>
        <Text style={styles.header}>{id}</Text>
        <Text style={{ width:'100%', height:'60%', padding:'2%'}}>{text}</Text>
    </View>
    )         
}

const styles = StyleSheet.create({
    header:{
        height:'40%',
        fontWeight:'bold',
        paddingLeft:'2%',
    },
    textInputContainer:{
        width:'100%',
        height:'10%',
        borderBottomWidth:0.5,
        borderBottomColor: 'rgba(238,238,238,255)',
        display:'flex',
        justifyContent:'space-evenly'
    }
})