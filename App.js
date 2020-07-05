import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigation/ShopNavigator';
import { Provider } from 'react-redux'
import store from './Redux/store';

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
