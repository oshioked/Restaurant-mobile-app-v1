import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import store from './Redux/store';
import Navigator from './Navigation/ShopNavigator';

export default function App() {
  return (
    <Provider store = {store}>
      <Navigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
