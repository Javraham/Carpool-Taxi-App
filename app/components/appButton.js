import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

function AppButton({text, onPress, txtColor, bgColor, ...props}){
    return(
      <TouchableOpacity onPress = {onPress} {...props}>
        <View style = {[styles.button, {backgroundColor: bgColor}]}>
          <Text style = {[styles.buttonText, {color: txtColor}]}>{text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
    }
})


export default AppButton;