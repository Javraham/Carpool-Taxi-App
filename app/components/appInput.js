import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function FormInput({label, secureEntry, iconName, error, resetError = () => {}, isValid,...props}) 
{
    const [isFocused, setFocus] = useState(false);
    const [hidden, setHide] = useState(secureEntry)
    return (
        <View style = {{marginBottom: 20}}>
            <Text style = {styles.label}>{label}</Text>
            <View style = {
                [styles.inputContainer, 
                {borderColor: error ? 'red' : isFocused ? 'lightblue' : '#F0F8FF',
                backgroundColor: error ? '#FFF4F3' : '#F0F8FF'}
                ]}>
                <Icon name={iconName} style = {styles.icon}/>
                <TextInput 
                    style = {{flex: 1}}
                    autoCorrect = {false}
                    {...props} 
                    onFocus={() => {
                        resetError();
                        setFocus(true);
                    }} 
                    onBlur={() => setFocus(false)}
                    secureTextEntry = {hidden}
                />
                {secureEntry && (
                    <Icon name = {hidden ? 'eye' : 'eye-slash'} 
                        size = {15}
                        onPress={() => setHide(!hidden)}
                        style= {styles.icon}
                        />
                )}
                {(isValid && (<Icon name = {'check'} size = {15} style= {styles.check}/>)) ||
                (error && (<Icon name = {'times-circle'} size = {15}style= {styles.invalid}/>))}

            </View>
            {error && 
            <View style = {{marginLeft: 20}}>
            <Text style = {{color: 'red', fontSize: 10}}>{error}</Text>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: { 
        borderRadius: 50,
        backgroundColor: '#F0F8FF',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: 'black',
    },

    icon: {
        paddingRight: 10, 
        color: '#00ABE4',
    },

    check: {
        paddingRight: 10, 
        color: 'green',
    }, 

    invalid: {
        paddingRight: 10, 
        color: '#703342',
    }
})

export default FormInput;