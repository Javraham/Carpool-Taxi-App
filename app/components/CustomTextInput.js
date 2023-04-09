import react, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Pressable, TextInput} from 'react-native';
import { Icon } from '@react-native-material/core';

export default function CutomTextInput({id, placeHolder, setQuery, result}) {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const textInput = useRef()

    useEffect(() => {
        if (result && result.id == id){
            setInput(result.text)
        }
    },[result])

    function handleOnChangeText(text) {
        setInput(text)
        setQuery({id, text})
    }

    function handleOnClearText() {
        textInput.current.clear()
        setInput('')
        setQuery({id:'', text:''})
    }

    
    const styles = StyleSheet.create({
        textInputContainer:{
            width:'80%',
            height:'25%',
            backgroundColor: `${isFocused ? 'rgba(238,238,238,255)': 'rgba(249,249,249,255) '}`,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly'
        }
    })

    return(
    <View id={id} style={styles.textInputContainer}>
        <TextInput value={input} placeholder={placeHolder} ref={textInput} onChangeText={handleOnChangeText} onBlur={()=>{setIsFocused(false)}} onFocus={()=>{setIsFocused(true)}} style={{ width:'90%', height:'100%', padding:'2%'}}/>
        <View style={{display:'flex', justifyContent:'center'}}>
            {input.length > 0 && <Pressable onPress={handleOnClearText}>
                <Icon color='gray' size={20} name='close-circle-outline'/>
            </Pressable>}
        </View>
    </View>
    )         
}