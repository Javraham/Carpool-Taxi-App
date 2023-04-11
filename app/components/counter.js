import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

function Counter({count, increment, decrement, disableAdd, disableSub}) {
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.button} onPress={decrement} disabled = {disableSub}>
                <Icon name = 'minus'/>
            </TouchableOpacity>
            <Text style = {{fontWeight: 'bold'}}>{count}</Text>
            <TouchableOpacity style = {styles.button} onPress = {increment} disabled = {disableAdd}>
                <Icon name = 'plus'/>
            </TouchableOpacity>
        </View>
    );
}

export default Counter;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        borderRadius: 10
    },

    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    }
})