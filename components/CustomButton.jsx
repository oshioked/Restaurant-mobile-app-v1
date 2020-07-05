import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';

const CustomButton = props =>{
    let TouchableCmp = TouchableOpacity;

    // if(Platform.OS === 'android' && Platform.Version >= 21){
    //     TouchableCmp = TouchableNativeFeedback;
    // }

    return(
        <TouchableCmp style = {{...styles.buttonContainer, ...props.style}} activeOpacity = {0.8} onPress = {props.onPress}>
            <Text style = {{...styles.buttonText, ...props.textStyle}}>{props.children}</Text>
        </TouchableCmp>   
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primaryShade2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default CustomButton;