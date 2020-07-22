import { View, StyleSheet, Text, Image, Easing, Animated,  TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import RegisterForm from '../../components/RegisterForm';
import SignInForm from '../../components/SignInForm';

const AuthMainScreen = props =>{
    const formState = props.navigation.getParam('state');

    const yValue = useRef(new Animated.Value(0)).current;
    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;

    const loopMoveHeart = useCallback(() =>{
        Animated.loop(Animated.timing(yValue, {
            toValue: (-1 * deviceHeight),
            duration: 50000,
            useNativeDriver: true,
            easing: Easing.linear
        }), ).start();
    }, [])
    useEffect(()=>{
       loopMoveHeart(); 
    }, [loopMoveHeart])
    
    
    const [state, setState] = useState(formState ? formState : 'login');

    return(
       <View style = {styles.screen}>
           <LinearGradient colors={['#FFFFFF', '#EEE3E3']} style = {styles.bgGradient}/>
           <Animated.View  style = {{ height: (3* deviceHeight), position: 'absolute', top: 0, transform: [{translateY: yValue}]}}>
                <Image source = {require('../../assets/images/snacks.png')}  style = {{width: deviceWidth, height: deviceHeight }} />
                <Image source = {require('../../assets/images/snacks.png')}  style = {{width: deviceWidth, height: deviceHeight }} />
           </Animated.View>
            <View style = {{flex: 1}}>
            <Image resizeMode = 'stretch' style = {styles.headerBg} source = {require('../../assets/images/AuthpageHeaderBg.png')}/>
                
                
                    <KeyboardAvoidingView style = {{flex: 1}} behavior = {Platform.OS === 'android' ? null : 'padding'} keyboardVerticalOffset = {0}>
                        <ScrollView style = {{flex: 1}} contentContainerStyle = {{justifyContent: 'space-around'}}>
                            <View style = {{flex: 1, justifyContent: 'space-between'}}>

                            
                                <View style = {{...styles.header, marginTop: deviceHeight * 0.12, marginBottom: deviceHeight * 0.09}}>
                                    <Text style = {styles.headerBigText}>Welcome</Text>
                                    <Text style = {styles.headerSmallText}>{state === 'login' ? 'Sign in to your account to continue.' : "Create your account to continue."}</Text>
                                </View>

                                <View style = {{justifyContent: 'center', marginVertical: 'auto', }}>
                                    {
                                        state === 'login' ?
                                        <SignInForm navigation = {props.navigation}/>
                                        : <RegisterForm navigation = {props.navigation}/>
                                    }
                                </View>
                        
                                <View style = {styles.bottomTextContainer}>
                                    <TouchableOpacity activeOpacity = {0.8} onPress = {()=>{state === 'login' ? setState('register') : setState('login')}}>
                                        <Text>
                                            {
                                                state === 'login' ?
                                                <>
                                                <Text style = {{opacity: 0.5}}>{"Don't have an account? "}</Text>
                                                <Text style = {{color:'#B19090'}}>Register</Text>
                                                </>
                                                :
                                                <>
                                                <Text style = {{opacity: 0.5}}>{"Already have an account? "}</Text>
                                                <Text style = {{color:'#B19090'}}>Sign In</Text>
                                                </>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View> 
                                </View>
                              </ScrollView>   
                    </KeyboardAvoidingView>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    imageBg: {
        flex: 1,
        width: '100%'
    },
    bgGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    headerBg: {
        width: '100%',
        opacity: 0.35,
        height: '25%',
        position: 'absolute'
    },
    header: {
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        marginVertical: 60
    },
    headerBigText: {
        fontWeight: '700',
        fontSize: 30,
        opacity: 0.8
    },
    headerSmallText: {
        fontSize: 16,
        marginTop: 10,
        opacity: 0.5
    },
    bottomTextContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20
    }
})

export default AuthMainScreen