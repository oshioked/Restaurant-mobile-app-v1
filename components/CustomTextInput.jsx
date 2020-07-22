import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';


const CustomTextInput = props =>{
    const [inputValue, setInputValue] = useState('');

    const onInputChangeHandler = (text) =>{
        if(text.trim('').length <= 0){
            setInputValue('');
            return;
        };
        setInputValue(text);
    }

    useEffect(()=>{
        if(props.inputChangeHandler){
            props.inputChangeHandler(inputValue);
        }
    }, [inputValue])

    const onSubmitHandler = () =>{
        setInputValue(inputValue);
        if(!props.onSubmit){
            onCancelPressHandler();
            return;
        };
        props.onSubmit(inputValue);
    }

    const onCancelPressHandler = () =>{
        Keyboard.dismiss()
        setInputValue('');
        if(props.onCancelPressHandler){
            props.onCancelPressHandler()
        }
        
    }

    return(
        <View style = {{...styles.customTextInputContainer, ...props.inputContainerStyle}}>
            <View style = {{...styles.customTextInput, ...props.inputStyle, width: inputValue.length > 0 ? '85%' : '100%'}}>
                <TextInput 
                    {...props}
                    autoCorrect = {false}
                    onChangeText = {onInputChangeHandler}
                    value = {inputValue}
                    onSubmitEditing = {onSubmitHandler} 
                    placeholderTextColor = '#929292' 
                    placeholder = {props.placeholder} 
                    style = {styles.textInput}
                    
                    returnKeyLabel = 'go'
                />
                <View style = {styles.iconContainer}>
                    <Ionicons style = {styles.searchIcon} name="ios-search" size={22} color = '#929292'/>
                </View>
            </View>
            <TouchableOpacity activeOpacity = {0.8} onPress = {onCancelPressHandler}>
                <View style = {{...styles.cancelContainer, width: inputValue.length > 0 ? '100%' : 0}}>
                    <Text style = {{color: 'white', ...props.cancelTextStyle}}>Cancel</Text>
                </View>
            </TouchableOpacity> 
        </View>
        
    )
}

const styles = StyleSheet.create({
    customTextInputContainer: {
        margin: 15,
        flexDirection: 'row',
        height: 37,
    },
    customTextInput: {
        backgroundColor: 'white',
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
    },
    cancelContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }
})

export default CustomTextInput;