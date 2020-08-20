import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Button, Platform } from 'react-native';
import ImageDarkener from '../../components/ImageDarkener';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

const AuthIntroScreen = props =>{

    const navigateTo = (state) =>{
        props.navigation.navigate('AuthMain', {state})
    }
    
    return(
        <ImageBackground style = {styles.imageBg} source = {{uri: 'https://images.unsplash.com/photo-1518148750009-25b2522df9c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'}}>
            <ImageDarkener opacity = {0.65}/>
            <SafeAreaView  style = {{flex: 1}}>
                <View style = {styles.screenContentContainer}>
                    <View style = {styles.textsContainer}>
                        <Text allowFontScaling = {false} style = {styles.textTitle}>Q U I C K E A T S</Text>
                        
                    </View>  
                    <View style = {styles.buttonContainer}>
                        <CustomButton onPress = {()=>navigateTo('login')} textStyle = {styles.buttonText} style = {styles.loginButton}>Sign In</CustomButton> 
                        <CustomButton onPress = {()=>navigateTo('register')} textStyle = {styles.registerButtonText} style = {styles.registerButton}>Register</CustomButton>  
                    </View>
                    
                </View>
               
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBg: {
        flex: 1,
        width: '100%'
    },
    screenContentContainer: {
        flex: 1, 
        paddingTop: 60,

    },
    textsContainer: {
        width: '100%',
        marginTop: 'auto'
    },
    textTitle: {
        fontSize: 30,
        color: 'white',
        marginBottom: 5,
        opacity: 0.75,
        textAlign: 'center',
        fontFamily: 'Red Rose'
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 80,
        marginTop: 'auto',
        alignItems: 'center'
    },
    loginButton: {
        width: '65%',
        marginVertical: 25,
        borderRadius: 19,
        paddingVertical: 14,
        textAlign: 'center'
    },
    registerButton: {
        width: '65%',
        borderRadius: 19,
        paddingVertical: 14,
        backgroundColor: 'white',
    },
    buttonText: {
        fontWeight: '600'
    },
    registerButtonText: {
        color: colors.primaryShade2,
        fontWeight: '600'
    }
})

export default AuthIntroScreen;