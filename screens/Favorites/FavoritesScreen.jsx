import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import FavoriteCard from '../../components/FavoriteCard';
import { useSelector, useDispatch} from 'react-redux';
import { fetchUsersFavMeals } from '../../Redux/meals/meals.action';

const FavoritesScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const favoriteMeals = useSelector(state => state.Meals.userFavMeals);
    
    const dispatch = useDispatch();
    const fetchFavMeals = useCallback(async () =>{
        setIsLoading(true);
        try {
            await dispatch(fetchUsersFavMeals());
        } catch (error) {
            
        }
        setIsLoading(false)
    }, [setIsLoading, dispatch, fetchUsersFavMeals])

    useEffect(()=>{
        fetchFavMeals();
    }, [fetchFavMeals])

    if(isLoading){
        return(
            <View style = {{flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center'}}>
                <ActivityIndicator size = 'large'/>
            </View>
        )
    }

    return(
        favoriteMeals.length ?
        <FlatList
            style = {styles.screen}
            data = {favoriteMeals}
            keyExtractor = {item => (item.id).toString()}
            renderItem = {itemData => (
                <FavoriteCard 
                    navigation = {props.navigation}
                    meal = {itemData.item}
                />
            )}
        />
        : <View style = {styles.emptyFavContainer}>
        
                <Image resizeMode = 'contain' resizeMethod = "scale" style = {styles.emptyFavImage} source = {require('../../assets/images/noFavoriteIllustration.png')} />
        
            
            <Text style  = {styles.emptyFavText}>You currently have no favorite meals</Text>
        </View>
    )
}

FavoritesScreen.navigationOptions = navData =>{
    return({
        headerTitle: 'Your Favorites'
    })
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        paddingTop: 20,
        backgroundColor: 'white'
    },
    emptyFavContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    emptyFavImage: {
        height: '45%',
        maxWidth: '80%',
        marginBottom: 5
    },
    emptyFavText: {
        opacity: 0.5
    }
})

export default FavoritesScreen;