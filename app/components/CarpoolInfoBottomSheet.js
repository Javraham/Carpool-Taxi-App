import react, {useRef, useCallback, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import BottomeSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import NumericInput from 'react-native-numeric-input'
import { Text } from '@react-native-material/core';
import CustomText from './CustomText';

export default function CarpoolInfoBottomSheet({sheetRef, offer}){
    const [value, setValue] = useState(0);
    const snapPoints = ["75%"]

    return(
        <BottomeSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} >
            <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetHeader} variant='h5'>Carpool Information</Text>
                <View style={styles.textContainer}>
                    <CustomText id="Destination" text={offer["destination"]["name"]}/>
                    <CustomText id="Offerer" text={offer["created_by_id"]}/>
                    <CustomText id="Offerer Rating" text="4.5"/>
                    <CustomText id="Cost" text="$20"/>
                    <CustomText id="Time Until Pickup" text="10"/>

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
        marginBottom:15 // <- changed from gap
    }
  });