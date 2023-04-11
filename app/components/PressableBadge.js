import react from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import { Icon } from '@react-native-material/core';

export default function PressableBadge({title, iconName, openBottomSheet, setCurrentSheet}) {
    return(
    <Pressable style={styles.badgeContainer} onPress={() => {
        setCurrentSheet(title)
        openBottomSheet(0)
        }} >
        <View style={{marginHorizontal:10, display:'flex', flexDirection:'row'}}>
            <View style={{marginRight:5,display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Icon size={20} name={iconName}/>
            </View>
            <Text style={{flex:1, textAlign:'center', alignSelf:'center',justifyContent:'center'}}>{title}</Text> 
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    badgeContainer:{
        backgroundColor:'rgba(238,238,238,255)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        height:'80%',
        marginRight:8
    }
})