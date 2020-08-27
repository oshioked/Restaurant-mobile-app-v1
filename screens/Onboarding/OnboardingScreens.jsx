import React from 'react';
import { AsyncStorage } from 'react-native';
import Onboarding from '../../components/Onboarding';

export const OnboardingScreen1 = props =>{
    const nextHandler = () =>{
        props.navigation.navigate('Onboarding2')
    }
    return(
        <Onboarding 
            navigation = {props.navigation}
            onNextClick = {nextHandler}
            img = {require('../../assets/images/girlOnBike.png')} 
            title = "Fast Delivery" 
            details = "Fast delivery is our priority. That's why we're quickeats"
            activeIdx = {1}
        />
    )
}

export const OnboardingScreen2 = props =>{
    const nextHandler = () =>{
        props.navigation.navigate('Onboarding3')
    }
    return(
        <Onboarding 
            navigation = {props.navigation}
            onNextClick = {nextHandler}
            img = {require('../../assets/images/bro.png')} 
            title = "Plenty Bonuses" 
            details = "For every N10000 spent, you qualify for a N1000 meal bonus"
            activeIdx = {2}
        />
    )
}

export const OnboardingScreen3 = props =>{
    const saveLaunchedToStorage = async () =>{
        await AsyncStorage.setItem("firstLaunch", "launched");
    };
    const nextHandler = async () =>{
        props.navigation.navigate('Auth');
        await saveLaunchedToStorage()
    }
    return(
        <Onboarding 
            navigation = {props.navigation}
            onNextClick = {nextHandler}
            img = {require('../../assets/images/choices.png')} 
            title = "Lots of choices" 
            details = "We have a variety of meals for you to choose from."
            activeIdx = {3}
        />
    )
}
