import React, { useState } from 'react';
import { KeyboardAvoidingView, Dimensions, View, StyleSheet, Keyboard } from 'react-native';
import CustomButton from './CustomButton';
import AuthFormTextInput from './AuthFormTextInput';
import validate from 'validate.js';


const SignInForm = (props) =>{
    const [email, setEmail] = useState({value: '', errorMsg: ''});
    const [password, setPassword] = useState({value: '', errorMsg: ''});
    const [isFirstTrial, setIsFirstTrial] = useState(true);

    const constraints = {
        email: {
            email: true,
            presence: {
                allowEmpty: false
            }
        },
        password: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6
            }
        }
    }

    const checkValidate = () =>{
        return validate({ 
            email: email.value, 
            password: password.value,
        }, constraints);
    }

    const updateInputErrorMsgs = () =>{
        const errors = checkValidate();
        if(errors){
            if(errors.email){
                setEmail({...email, errorMsg: errors.email[0]})
            }else{
                setEmail({...email, errorMsg: ''})
            }
            if(errors.password){
                setPassword({...password, errorMsg: errors.password[0]})
            }else{
                setPassword({...password, errorMsg: ''})
            }
        }
    } 
   

    const onSignIn = () =>{
        const errors = checkValidate();
        if(errors){
            updateInputErrorMsgs()
        }else{
            props.navigation.navigate("Shop")
        }
        setIsFirstTrial(false)
    }

    return(
        <View style = {styles.form}>
            <AuthFormTextInput
                onChangeText = {(text)=>{setEmail({...email, value: text})}}
                errorMessage = {email.errorMsg}
                placeholder = 'Email Address'
                value = {email.value}
                errorMsg = 'errorMsg'
                keyboardType = 'email-address'
                textContentType = 'emailAddress'
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                leftIcon={{ type: 'ion-icons', name: 'mail-outline'}}
                onSubmitEditing = {Keyboard.dismiss}
            />
            <AuthFormTextInput
                onChangeText = {(text)=>{setPassword({...password, value:text})}}
                errorMessage = {password.errorMsg}
                placeholder = 'Password'
                errorMsg = 'errorMsg'
                value = {password.value}
                blurOnSubmit = {false}
                secureTextEntry = {true}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                leftIcon={{ type: 'ion-icons', name: 'lock-outline'}}
                onSubmitEditing = {() => {Keyboard.dismiss; updateInputErrorMsgs;}}
            />
            <CustomButton onPress = {onSignIn} style = {styles.registerButton}>
                SignIn
            </CustomButton>
        </View>
    )
}



const styles = StyleSheet.create({
    form: {
        paddingTop: 80,
        width: '100%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20%'
    },
    registerButton: {
        borderRadius: 15,
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 10
    },
    arrowIcon: {
        color: 'white'
    }
})

export default SignInForm;