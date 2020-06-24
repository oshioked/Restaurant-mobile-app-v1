import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const MealItem = props =>{
    
    return(
        <TouchableOpacity onPress = {props.onPress} activeOpacity = {0.8} style = {{...styles.mealItem, ...props.style}}>
            <View style = {styles.mealItemContainer}>
                <Image style = {styles.mealImage} source = {{uri: props.imageUri}}/>
                <Text numberOfLines = {1} style = {styles.mealName}>{props.title}</Text>
                <View style = {styles.textBlock}>
                    <Text style = {styles.mealPrice}>N{props.price}</Text>
                    <Text style = {styles.mealTime}>4M</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        height: 220,
        width: '50%',
        paddingHorizontal: 7.5,
        marginBottom: 10
    },
    mealItemContainer: {
        width: '100%',
        height: '100%',
    },
    mealImage: {
        height: '75%',
        width: '100%',
        backgroundColor: '#B3B3B3',
        borderRadius: 3
    },
    mealName: {
        marginVertical: 5
    },
    textBlock:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    }
})

export default MealItem;