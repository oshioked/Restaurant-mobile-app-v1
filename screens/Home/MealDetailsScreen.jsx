import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import colors from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import { addItem } from '../../Redux/cart/cart.actions';
import CustomButton from '../../components/CustomButton';
import { addFavMeal, removeFavMeal } from '../../Redux/user/user.actions';
import {Ionicons} from '@expo/vector-icons';

const MealDetailsScreen = props =>{
    const meal = props.navigation.getParam('mealDetails');
    const [addingToCart, setAddingToCart] = useState(false);
    const isFavorite = useSelector(state => state.user.favoriteMeals.find(id => id == meal.id))
    const dispatch = useDispatch();
    const onAddToCart = async (meal) =>{ 
        setAddingToCart(true);
        await dispatch(addItem(meal))
        setTimeout(()=>{
            setAddingToCart(false)
        }, 2000);
    }

    const toggleFavorite = useCallback(() =>{
        if(!isFavorite){
           dispatch(addFavMeal(meal)) 
        }else{
            dispatch(removeFavMeal(meal))
        }
    }, [dispatch, isFavorite, addFavMeal, removeFavMeal])

    useEffect(()=>{
        props.navigation.setParams({
            toggleFavorite,
            isFavorite
        })
    }, [toggleFavorite, isFavorite])
    
    return(
        <ScrollView style = {{backgroundColor: 'white'}}>
            <Image style = {styles.image} source = {{uri: meal.imageUri}}/>
            <View style = {styles.detailsContainer}>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealName}}>{meal.title}</Text>
                    <Text>N{meal.price}</Text>
                </View>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealTime}}>READY TIME</Text>
                    <Text>{Math.round(meal.readyTime/60)} minutes</Text>
                </View>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealDescription}}>DESCRIPTION</Text>
                    <Text>{meal.description}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <CustomButton useCustomChild style = {styles.cartButton} onPress = {()=>onAddToCart(meal)}>Add to cart</CustomButton>
                </View>
                
            </View>
            
        </ScrollView>
    )
}

MealDetailsScreen.navigationOptions = navData =>{
    const toggleFavorite = navData.navigation.getParam('toggleFavorite');
    const isFavorite = navData.navigation.getParam('isFavorite');
    const mealTitle = navData.navigation.getParam('mealDetails').title
    return({
        headerRight: () =>(
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item
                    title = 'Like'
                    onPress = { toggleFavorite}
                    iconName = { isFavorite ? 'ios-heart' : 'ios-heart-empty'}
                />
            </HeaderButtons>
        ),
        headerTitle: mealTitle
    })
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 270,
        backgroundColor: 'grey'
    },
    detailsContainer: {
        marginHorizontal: 15
    },
    detailSet: {
        paddingVertical: 15,
        borderBottomColor: colors.primaryShade1,
        borderBottomWidth: 1,
    },
    detailTitle: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 15,
        opacity: 0.4
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 30
    },
    mealName: {
        fontSize: 18,
        opacity: 1
    },
    cartButton: {
        height: 40
    }
})

export default MealDetailsScreen;