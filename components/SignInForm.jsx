import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import CustomButton from './CustomButton';
import AuthFormTextInput from './AuthFormTextInput';
import validate from 'validate.js';
import { useDispatch } from 'react-redux';
import { logIn } from '../Redux/user/user.actions';
import { Platform } from 'react-native';
import colors from '../constants/colors';


const SignInForm = (props) =>{
    const [email, setEmail] = useState({value: '', errorMsg: ''});
    const [password, setPassword] = useState({value: '', errorMsg: ''});
    const [signInError, setSignInError] = useState();
    const [isFirstTrial, setIsFirstTrial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(()=>{
        if(!signInError)return;
        setTimeout(()=>{
            setSignInError(null)
        }, 2500)
    }, [signInError]);

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
   
    const dispatch = useDispatch();

    const onSignIn = async () =>{
        setIsFirstTrial(false);
        
        const errors = checkValidate();
        if(errors){
            updateInputErrorMsgs();
        }else{
            setIsLoading(true);
            try {
                await dispatch(logIn({email: email.value, password: password.value}));
                setIsLoading(false);
                props.navigation.navigate('Shop');
            } catch (error) {
                setIsLoading(false);
                setSignInError(error.message)
            }
           
        }
        
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
                onSubmitEditing = {() => {Keyboard.dismiss(); updateInputErrorMsgs();}}
            />
            {
                Platform.OS === 'android' ? 
                (
                    isLoading ? 
                    <View style = {{...styles.registerButton, marginHorizontal: 10, paddingHorizontal: 40, paddingVertical: 10, backgroundColor: colors.primaryShade2}}><ActivityIndicator size = 'small' color = 'white'/></View>
                    : <CustomButton onPress = {onSignIn} style = {styles.registerButton}>
                        Sign in
                    </CustomButton>
                )
                : 
                (
                    <CustomButton onPress = {onSignIn} style = {styles.registerButton}>
                        {
                            isLoading ?
                            <ActivityIndicator size = 'small' color = 'white'/>
                            : 'Sign In'
                        }
                    </CustomButton>
                )
            }
            
            
            {
                signInError ?
                <Text style = {styles.formError}>
                    {signInError}
                </Text>  
                : null          
            }

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
    },
    formError: {
        color: 'red',
        textAlign: 'left',
        width: '90%',
        marginVertical: 5,
        opacity: 0.7
    }
})

export default SignInForm;