import react, {useRef, useCallback, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import BottomeSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import NumericInput from 'react-native-numeric-input'
import { Text } from '@react-native-material/core';
import CustomText from './CustomText';

export default function MyInfoBottomSheet({sheetRef}){
    const snapPoints = ["75%"]

    return(
        <BottomeSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} >
            <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetHeader} variant='h5'>My Information</Text>
                <View style={styles.textContainer}>
                    <CustomText id="Name" text="Jad Kharboutli"/>
                    <CustomText id="Phone" text="647-819-0133"/>
                </View>
            </BottomSheetView>
        </BottomeSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
      display:'flex',
      alignItems:'center',
    },
    bottomSheetHeader: {
      fontWeight:'bold',
      margin:20
    },
    textContainer: {
        height:'100%',
        width:'80%',
        display:'flex',
        gap:15
    }
  });