import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Icon, IconButton, IconComponentProvider, TextInput, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomeSheet, {BottomSheetView} from '@gorhom/bottom-sheet'

export default function OfferCarpool({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(undefined);

  // bottom sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = ["80%"]

  useEffect(() => {
    navigation.setOptions({tabBarStyle: { display: 'none'}})
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index)
},[])

  const handleBarCodeScanned = (target) => {
    handleSnapPress(0)
    setScannedData(target.data)
    setScanned(true);
  };

const handleOnClose = () => {
    handleClean()
    navigation.navigate('Home')
}

const handleClean = () => {
    setScanned(false)
    setScannedData(undefined)
}

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const formFields = ["Taxi ID","Name", "Pickup", "Destination", "Passanger Counter"]
  return (
    <View style={styles.container}>

        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />

        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <IconButton icon={props => <Icon name="close" {...props} color='white'/>} style={styles.closeButton} onPress={handleOnClose} pressEffect='none'/>
        </IconComponentProvider>

       {scanned && <BottomeSheet ref={bottomSheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => handleClean()} >
            <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.bottomSheetHeader} variant='h5'>Offer Information</Text>
                <View style={styles.formContainer}>
                {
                    formFields.map((field) => {
                        return (
                            <TextInput variant="outlined" label={field} style={{width:'100%'}} />
                        )
                    })
                }
                <Button title="Offer Carpool" />
                </View>
            </BottomSheetView>
        </BottomeSheet>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top:0,
    left:0,
  },
  bottomSheetContainer: {
    display:'flex',
    alignItems:'center',
    padding:20
  },
  bottomSheetHeader: {
    fontWeight:'bold',
    margin:20
  },
  formContainer: {
    width:'100%',
    height:'80%',
    justifyContent:'space-between'
  }
});
