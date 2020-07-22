import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import Card from './Card';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { removeFavMeal } from '../Redux/user/user.actions';
import { addItem } from '../Redux/cart/cart.actions';

const FavoriteCard = props =>{
    const dispatch = useDispatch();
    
    const onRemoveMealHandler = () =>{
        dispatch(removeFavMeal(props.meal))
    }

    const onAddToCart = () =>{
        dispatch(addItem(props.meal))
    }

    const onMealSelect = () =>{
        props.navigation.navigate('MealDetail', {
            mealDetails: props.meal
        })
    }

    return(
        <Card>
            <TouchableOpacity activeOpacity = {0.8} onPress = {onMealSelect} style = {styles.favoriteContainer}>
                <Image style =  {styles.image} source = {{uri: props.meal.imageUri}}/>
                <View>
                    <Text style = {styles.mealName}>{props.meal.title}</Text>
                    <Text>N{props.meal.price}</Text>
                    <Text style = {styles.mealTime}>{Math.round(props.meal.readyTime/60)}M</Text>
                </View>
                <View style = {styles.iconsContainer}>
                    <View style = {styles.icons}>
                        <TouchableOpacity onPress = {onRemoveMealHandler} style = {styles.heartIcon}>
                            <Ionicons name = 'ios-heart-dislike' size = {22}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress = {onAddToCart} style = {styles.addIcon}>
                            <Ionicons name="ios-add-circle-outline" size={29} color="#2BBA42" />
                        </TouchableOpacity>
                                               
                    </View>

                </View>
            </TouchableOpacity>
            
        </Card>

    )
}

const styles = StyleSheet.create({
    favoriteContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        overflow: 'hidden',
        borderWidth: Platform.OS == "android" ? 1.5 : null,
        borderColor: colors.primaryShade1,
        minHeight: 95
    },
    image: {
        marginRight: 15,
        borderRadius: 5,
        height: '100%',
        width: '20%'
    },
    mealName: {
        fontSize: 16,
        marginBottom: 7
    },
    mealTime: {
        marginTop: 'auto',
        fontWeight: '500',
        color: '#0A3D15',
        opacity: 0.7
    },
    iconsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
    },
    icons: {
        flexDirection: 'row',
    },
    heartIcon:{
        padding: 15,
        opacity: 0.4
    },
    addIcon: {
        padding: 10,
        paddingHorizontal: 17,
        backgroundColor: colors.primaryShade1,
        borderTopLeftRadius: 10
    }
})

export default FavoriteCard;