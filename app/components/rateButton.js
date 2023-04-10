import React from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function RateButton({onPress, iconName}) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}>
                <Icon name = {iconName} color = {'gold'} size={30}  style = {styles.icon}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
})

export default RateButton;