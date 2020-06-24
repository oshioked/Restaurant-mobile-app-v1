import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';


const CustomTextInput = props =>{
    return(
        <View style = {{...styles.customTextInputContainer, ...props.style}}>
            <TextInput onSubmitEditing = {props.onSubmit} placeholderTextColor = '#929292' placeholder = {props.placeholder} style = {styles.textInput}/>
            <View style = {styles.iconContainer}>
                <Ionicons style = {styles.searchIcon} name="ios-search" size={22} color = '#929292'/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    customTextInputContainer: {
        backgroundColor: 'white',
        height: 40,  
        margin: 15,
        borderRadius: 5,
        opacity: 0.8
    },
    textInput: {
        height: '100%',
        width: '100%',
        paddingLeft: 40
    },
    iconContainer:{
        position: 'absolute',
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CustomTextInput;