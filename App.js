/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
  DeviceEventEmitter
} from 'react-native';

import ICManager from 'react-native-incall-manager';

export default class App extends Component {
  componentDidMount() {
    AppState.addEventListener('change', (state) => {
      console.log('APP STATE = ', state);
    });

    ICManager.start({ media: 'audio' });

    DeviceEventEmitter.addListener('Proximity', (data) => {
      console.log('Proximity', data);
    });
  }

  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
