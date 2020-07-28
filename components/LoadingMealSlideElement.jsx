import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const LoadingMealSlideElements = () => (
    <View style = {styles.element}>
        <View style = {{...styles.loadingTitleElement, ...styles.loadingElement}}/>
        <View style = {{...styles.loadingMealsContainer}}>
                <View style = {{...styles.loadingMealItem}}>
                    <View style = {{...styles.loadingMealPhoto, ...styles.loadingElement}}/>
                    <View style = {{...styles.loadingMealTitle, ...styles.loadingElement}}/>
                    <View style = {styles.loadingMealDetails}>
                        <View style = {{...styles.loadingMealPrice, ...styles.loadingElement}}/>
                        <View style = {{ ...styles.loadingElement, ...styles.loadingMealTime,}}/>
                    </View>
                </View>
                <View style = {{...styles.loadingMealItem}}>
                    <View style = {{...styles.loadingMealPhoto, ...styles.loadingElement}}/>
                    <View style = {{...styles.loadingMealTitle, ...styles.loadingElement}}/>
                    <View style = {styles.loadingMealDetails}>
                        <View style = {{...styles.loadingMealPrice, ...styles.loadingElement}}/>
                        <View style = {{ ...styles.loadingElement, ...styles.loadingMealTime}}/>
                    </View>
                </View>
                <View style = {{...styles.loadingMealItem}}>
                    <View style = {{...styles.loadingMealPhoto, ...styles.loadingElement}}/>
                    <View style = {{...styles.loadingMealTitle, ...styles.loadingElement}}/>
                    <View style = {styles.loadingMealDetails}>
                        <View style = {{...styles.loadingMealPrice, ...styles.loadingElement}}/>
                        <View style = {{ ...styles.loadingElement, ...styles.loadingMealTime,}}/>
                    </View>
                </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    element:{
        width: '100%',
        paddingHorizontal: 7.5
    },
    loadingTitleElement:{
        marginVertical: 24,
        marginLeft: 7.5,
        width: 180,
        height: 18,
    },
    loadingMealsContainer:{
        flexWrap: 'nowrap',
        width: 500,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    loadingMealItem:{
        minWidth: 170,
        width: 170,
        height: 220,
        paddingHorizontal: 7.5,
    },
    loadingMealPhoto:{
        height: '70%'
    },
    loadingMealTitle:{
        width: '100%',
        height: 14,
        marginVertical: 7
    },
    loadingMealDetails:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    loadingMealPrice:{
        height: 14,
        marginBottom: 7,
        width: '40%'
    },
    loadingMealTime:{
        height: 14,
        marginBottom: 7,
        width: '20%',
        opacity: .03
    },
    loadingElement:{
        backgroundColor: 'grey',
        opacity: 0.1
    }
})

export default LoadingMealSlideElements;