import React, { useEffect } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import {authTypes} from '../Redux/user/user.actions';

const StartUpScreen = props =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async () =>{
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

        tryLogin();
    },[dispatch])

    return(
        <View></View>
    )
}

const styles = StyleSheet.create({

})

export default StartUpScreen;