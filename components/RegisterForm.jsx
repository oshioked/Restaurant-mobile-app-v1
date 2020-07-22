import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import CustomButton from './CustomButton';
import AuthFormTextInput from './AuthFormTextInput';
import validate from 'validate.js';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/user/user.actions';
import colors from '../constants/colors';


const RegisterForm = (props) =>{
    const [fullName, setFullName] = useState({value: '', errorMsg: ''});
    const [email, setEmail] = useState({value: '', errorMsg: ''});
    const [phoneNumber, setPhoneNumber] = useState({value: '', errorMsg: ''});
    const [password, setPassword] = useState({value: '', errorMsg: ''});
    const [confirmPassword, setConfirmPassword] = useState({value: '', errorMsg: ''});
    const [isFirstTrial, setIsFirstTrial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState(undefined);

    const constraints = {
        fullName: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6,
                maximum: 50
            }
        },
        email: {
            email: true,
            presence: {
                allowEmpty: false
            }
        },
        phoneNumber: {
            numericality: true,
            length: {
                is: 11,
                message: 'supposed to be 11 numbers na'
            },
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
        },
        confirmPassword: {
            presence: {
                allowEmpty: false
            },
            equality: 'password'
        }
    }

    const checkValidate = () =>{
        return validate({ 
            fullName: fullName.value, 
            email: email.value, 
            phoneNumber: phoneNumber.value, 
            password: password.value, 
            confirmPassword: confirmPassword.value
        }, constraints);
    }

    const updateInputErrorMsgs = () =>{
        const errors = checkValidate();
        if(errors){
            if(errors.fullName){
                setFullName({...fullName, errorMsg: errors.fullName[0]})
            }else{
                setFullName({...fullName, errorMsg: ''})
            }
            if(errors.email){
                setEmail({...email, errorMsg: errors.email[0]})
            }else{
                setEmail({...email, errorMsg: ''})
            }
            if(errors.phoneNumber){
                setPhoneNumber({...phoneNumber, errorMsg: errors.phoneNumber[0]})
            }else{
                setPhoneNumber({...phoneNumber, errorMsg: ''})
            }
            if(errors.password){
                setPassword({...password, errorMsg: errors.password[0]})
            }else{
                setPassword({...password, errorMsg: ''})
            }
            if(errors.confirmPassword){
                setConfirmPassword({...confirmPassword, errorMsg: errors.confirmPassword[0]})
            }else{
                setConfirmPassword({...confirmPassword, errorMsg: ''})
            }
        }
    }

    useEffect(()=>{
        if(!registerError)return;
        setTimeout(()=>{
            setRegisterError(null)
        }, 2500)
    }, [registerError]);

    const dispatch = useDispatch();

    const onRegister = async () =>{
        const errors = checkValidate();
        setIsFirstTrial(false);
        
        if(errors){
            updateInputErrorMsgs();
        }else{
            try {
                setIsLoading(true)
                await dispatch(registerUser({
                    fullName: fullName.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    password: password.value
                }))
                props.navigation.navigate("Shop");           
            } catch (error) {
                setRegisterError(error.message)
            }
            setIsLoading(false)
        }
        
    }

    return(
        <View style = {styles.form}>
            <AuthFormTextInput
                onChangeText = {(text)=>{setFullName({...fullName, value: text})}}
                errorMessage = {fullName.errorMsg}
                autoCompleteType = 'name'
                value = {fullName.value}
                autoCapitalize = 'words'
                maxLength = {50}
                textContentType = 'name'
                placeholder= 'Full Name'
                leftIcon={{ type: 'ion-icons', name: 'person-outline'}}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                onSubmitEditing = {Keyboard.dismiss}
            />
            <AuthFormTextInput
                onChangeText = {(text)=>{setEmail({...email, value: text})}}
                errorMessage = {email.errorMsg}
                placeholder = 'Email Address'
                value = {email.value}
                errorMsg = 'errorMsg'
                keyboardType = 'email-address'
                textContentType = 'emailAddress'
                leftIcon={{ type: 'ion-icons', name: 'mail-outline'}}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                onSubmitEditing = {Keyboard.dismiss}
            />
            <AuthFormTextInput
                onChangeText = {(text)=>{setPhoneNumber({...phoneNumber, value:text})}}
                errorMessage = {phoneNumber.errorMsg}
                placeholder = 'Phone Number'
                value = {phoneNumber.value}
                errorMsg = 'errorMsg'
                keyboardType = 'phone-pad'
                maxLength = {11}
                leftIcon={{ type: 'ion-icons', name: 'call'}}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
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
                leftIcon={{ type: 'ion-icons', name: 'lock-outline'}}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                onSubmitEditing = {Keyboard.dismiss}
            />
            <AuthFormTextInput
                onChangeText = {(text)=>{setConfirmPassword({...confirmPassword, value:text})}}
                errorMessage = {confirmPassword.errorMsg}
                placeholder = 'Confirm Password'
                errorMsg = 'errorMsg'
                value  = {confirmPassword.value}
                secureTextEntry = {true}
                blurOnSubmit = {false}
                leftIcon={{ type: 'ion-icons', name: 'lock-outline'}}
                onBlur = {isFirstTrial ? null:  updateInputErrorMsgs}
                onSubmitEditing = {() => {Keyboard.dismiss(); updateInputErrorMsgs();}}
            />
            {
                Platform.OS === 'android' ? 
                (
                    isLoading ? 
                    <View style = {{...styles.registerButton, marginHorizontal: 10, paddingHorizontal: 45, paddingVertical: 10, backgroundColor: colors.primaryShade2}}><ActivityIndicator size = 'small' color = 'white'/></View>
                    : <CustomButton onPress = {onRegister} style = {styles.registerButton}>
                        Register
                    </CustomButton>
                )
                : 
                (
                    <CustomButton onPress = {onRegister} style = {styles.registerButton}>
                        {
                            isLoading ?
                            <ActivityIndicator size = 'small' color = 'white'/>
                            : 'Sign In'
                        }
                    </CustomButton>
                )
            }
            {
                (registerError) ? 
                <Text style = {styles.formError}>{registerError}</Text>            
                : null
            }

        </View>
    )
}


const styles = StyleSheet.create({
    form: {
        paddingTop: 0,
        width: '100%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        borderRadius: 15,
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 10
    },
    arrowIcon: {
        color: 'white'
    },
    formError: {
        color: 'red',
        textAlign: 'left',
        width: '90%',
        marginVertical: 5,
        opacity: 0.7
    }
})

export default RegisterForm;