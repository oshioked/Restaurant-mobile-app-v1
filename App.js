import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import store from './Redux/store';
import Navigator from './Navigation/ShopNavigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

const fetchFonts = () =>{
  return Font.loadAsync({
    'Red Rose': require('./assets/fonts/RedRose-Regular.ttf')
  })
}

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  if(!isFontLoaded){
    return(
      <AppLoading
        startAsync = {fetchFonts}
        onError = {err => console.log(err)}
        onFinish = {()=>{setIsFontLoaded(true)}}
      />
    )
  }
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
