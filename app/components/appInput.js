import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function FormInput({label, secureEntry, value, setValue, iconName, ...props}) {
    const [isFocused, setFocus] = useState(false);
    const [hidden, setHide] = useState(secureEntry)
    return (
        <View>
            <Text style = {styles.label}>{label}</Text>
            <View style = {[styles.inputContainer, {borderColor: isFocused ? 'darkblue' : '#F0F8FF'}]}>
                <Icon name={iconName} style = {styles.icon}/>
                <TextInput 
                    style = {{flex: 1}}
                    {...props} 
                    onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)}
                    secureTextEntry = {hidden}
                    onChangeText={setValue}
                />
                {secureEntry && (
                    <Icon name = {hidden ? 'eye' : 'eye-slash'} 
                        size = {15}
                        onPress={() => setHide(!hidden)}
                        style= {styles.icon}
                        />
                )}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: { 
        borderColor: 'black',
        backgroundColor: '#F0F8FF',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: 'lightgrey',
    },

    icon: {
        paddingRight: 10, 
        color: '#00ABE4',
    }
})

export default FormInput;