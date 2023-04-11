import react, {useRef, useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import BottomeSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import NumericInput from 'react-native-numeric-input'
import { Text } from '@react-native-material/core';

export default function PassangerCountBottomSheet({sheetRef, isDisabled = false, setOfferInformation, count = 0}){
    const [value, setValue] = useState(count);
    const snapPoints = ["30%"]

    useEffect(() => {
      if (setOfferInformation !== undefined){
        setOfferInformation((prev) => ({...prev, passenger_limit: value}))
      }
    }, [value])

    return(
        <BottomeSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} >
            <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetHeader} variant='h5'>Passanger Count</Text>
                {isDisabled && <View style={{width:'100%', height:'100%', position:'absolute', zIndex:1000}}></View>}
                <NumericInput 
                value={value} 
                minValue={0}
                maxValue={8}
                onChange={value => setValue({value})} 
                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                totalWidth={200} 
                totalHeight={90} 
                iconSize={25}
                step={1}
                valueType='real'
                rounded 
                textColor='black' 
                iconStyle={{ color: 'black' }} 
                rightButtonBackgroundColor='rgba(238,238,238,255)' 
                leftButtonBackgroundColor='rgba(238,238,238,255)'/>
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
    }
  });