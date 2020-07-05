import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {Input} from 'react-native-elements';
import {validate} from 'validate.js';

const AuthFormTextInput = (props) =>{
    const inputRef = useRef();

    useEffect(()=>{
        if(props.errorMessage.length > 0){
            inputRef.current.shake();
        }
        
    }, [props.errorMessage])

    return(
        <Input
            {...props}
            ref = {inputRef}
            autoCorrect = {false}
            keyboardAppearance = 'dark'
            errorStyle = {{opacity: 0.7}}
            spellCheck = {false}
            inputStyle = {{paddingLeft: 10, fontSize: 16}}
            leftIconContainerStyle = {{marginRight: 10, opacity: 0.5}}
        />
    )
}

const styles = StyleSheet.create({

})

export default AuthFormTextInput;