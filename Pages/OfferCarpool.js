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

  useEffect(() => {
    navigation.setOptions({tabBarStyle: { display: 'none'}})
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (target) => {
    setScannedData(JSON.parse(target.data))
    setScanned(true);
    navigation.push("Carpool Offer Information", {name: "Plan Your Carpool", scannedData: JSON.parse(target.data)}) // pass in scanned data here
    setTimeout(() => {
      handleClean()
    }, 2000);
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

  return (
    <View style={styles.container}>

        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <IconButton icon={props => <Icon name="close" {...props} color='white'/>} style={styles.closeButton} onPress={handleOnClose} pressEffect='none'/>
        </IconComponentProvider>
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
