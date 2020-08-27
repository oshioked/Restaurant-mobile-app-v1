import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import { useEffect } from 'react';

const Onboarding = props =>{

    const saveLaunchedToStorage = async () =>{
        await AsyncStorage.setItem("firstLaunch", "launched");
    };
    const skipHandler = async () =>{
        props.navigation.navigate('Auth');
        await saveLaunchedToStorage()
    }
    useEffect(()=>{
        setTimeout(()=>{
            props.onNextClick()
        }, 6000)
    }, [])
    return(
        <SafeAreaView style = {styles.screen}>
            <View style = {styles.head}>
                <TouchableWithoutFeedback onPress = {skipHandler}>
                    <Text style = {{color: '#3F3636', fontSize: 16}} allowFontScaling = {false}>Skip</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style = {styles.details}>
                <Image style = {styles.image}resizeMode = 'contain' source = {props.img} />
                <Text allowFontScaling = {false} style = {{textAlign: 'center', fontSize: 18, fontWeight: '600', color: '#3F3636', marginVertical: 7}}>{props.title}</Text>
                <Text allowFontScaling = {false} style = {{textAlign: 'center', fontSize: 16, opacity: 0.7, fontWeight: '400'}}>{props.details}</Text>
            </View>
            <View style = {styles.bottomContainer}>
                <View style = {styles.indicatorsContainer}>
                    <View style = {{...styles.indicator, width: props.activeIdx === 1 ? 10 : 9, height: props.activeIdx === 1 ? 10 : 9 , backgroundColor: props.activeIdx === 1 ? '#3F3636' : '#8D8B8B'}}/>
                    <View style = {{...styles.indicator,  width: props.activeIdx === 2 ? 10 : 9, height: props.activeIdx === 2 ? 10 : 9 , backgroundColor: props.activeIdx === 2 ? '#3F3636' : '#8D8B8B'}}/>
                    <View style = {{...styles.indicator,  width: props.activeIdx === 3 ? 10 : 9, height: props.activeIdx === 3 ? 10 : 9 , backgroundColor: props.activeIdx === 3 ? '#3F3636' : '#8D8B8B'}}/>
                </View>
                <TouchableWithoutFeedback onPress = {props.onNextClick}>
                    <Text allowFontScaling = {false} style = {{color: '#3F3636', fontSize: 16}}>Next</Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F4F4'
    },
    head:{
        marginTop: 10,
        paddingHorizontal: 17,
        width: '100%',
        alignItems: 'flex-end'
    },
    details: {
        width: '80%',
        paddingHorizontal: 17,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height: '33%',
        maxWidth: '85%'
        
    },
    bottomContainer:{
        width: '100%',
        paddingHorizontal: 17,
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    indicatorsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    indicator: {
        width: 9,
        height: 9,
        borderRadius: 7,
        marginRight: 10
    }
})

export default Onboarding;