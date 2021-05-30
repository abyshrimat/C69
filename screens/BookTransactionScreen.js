import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };

  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
              }}
              style={{
                width: 100,
                height: 100,
                marginLeft: 50,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
              }}>
              Bar Code Scanner
            </Text>
          </View>

          <Text>
            {hasCameraPermission === true
              ? this.state.scannedData
              : 'requestCameraPermission'}
          </Text>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermission}>
            <Text style={styles.buttonText}> Scan Your QRcode</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scanButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2196f3',
  },
  buttonText: {
    fontSize: 20,
  },
});
