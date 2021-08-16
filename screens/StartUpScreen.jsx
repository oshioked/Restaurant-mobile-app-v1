import React, { useEffect } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import {authTypes} from '../Redux/user/user.actions';

const StartUpScreen = props =>{
    console.log('called')
    const dispatch = useDispatch();
    useEffect(()=>{
        const firstTimeCheck = async () =>{
            const launched = await AsyncStorage.getItem("firstLaunch");
            if(!launched){
                props.navigation.navigate("Onboarding");
                return true;
            }else{
                return false;
            }
        }

        const tryLogin = async () =>{
            const isFirstLaunch = await firstTimeCheck();
            if(isFirstLaunch){
                return;
            }else{
                // check device for stored user data;
                const userDataJSON = await AsyncStorage.getItem("userInfo");
                const userData = JSON.parse(userDataJSON);
                if(!userData){
                    props.navigation.navigate("Auth");
                    return;
                }
                // dispatch the login action with the saved data
                dispatch({
                    type: authTypes.LOGIN_USER,
                    payload: userData
                })
                props.navigation.navigate("Shop");
            }

        }
        tryLogin();
    },[dispatch])

    return(
        <View></View>
    )
}

const styles = StyleSheet.create({

})

export default StartUpScreen;