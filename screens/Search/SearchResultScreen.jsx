import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import MealItem from '../../components/MealItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { getMeals } from '../../Redux/meals/meals.reducer';

const SearchResultScreen = props =>{
    const [isLoading, setIsLoading] = useState(true);
    const [searchResultMeals, setSearchResultMeals] = useState([])
    const searchQuery = props.navigation.getParam('searchQuery');

    const fetchMeals = useCallback(async () =>{
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/meals?searchQuery=${searchQuery}`);
            const meals = await response.json();
            //getMeal function converts the mealsResults from the way the results are to the format accepted in the app.
            setSearchResultMeals(getMeals(meals))
        } catch (error) {

        }
        setIsLoading(false)
    }, [setIsLoading, setSearchResultMeals])

    useEffect(()=>{
        fetchMeals()
    }, [fetchMeals])
    
    useEffect(()=>{
        props.navigation.setParams({
            isEmpty: !Boolean(searchResultMeals.length)
        })
    }, [searchResultMeals])

    if(isLoading){
        return(
            <View style = {styles.emptyFavContainer}>
                <ActivityIndicator size = 'large'/>
            </View>
        )
    }

    return(
        searchResultMeals.length ?
                <View>
                    <Text style = {styles.screenTitle}>{`Search results for '${searchQuery}'`}</Text>
                    <FlatList
                        numColumns = {2}
                        contentContainerStyle = {styles.mealList}
                        data = {searchResultMeals}
                        renderItem = {itemData => (
                            <MealItem
                                style={styles.mealItem}
                                meal = {itemData.item}
                                navigation = {props.navigation}
                            />
                        )}
                    />
                </View>
                :
                <View style = {styles.emptyFavContainer}>
                    <Image resizeMode = 'contain' resizeMethod = "scale" style = {styles.emptyFavImage} source = {require('../../assets/images/noSearchResults.png')} />               
                    <Text style  = {styles.emptyFavText}>{`Sorry! No result matches your search "${searchQuery}"`}</Text>
                </View>
        
    )
}

SearchResultScreen.navigationOptions = navData =>{
    const isEmpty = navData.navigation.getParam('isEmpty');
    return({
        headerTitle: 'Search Results',
        headerRight: () =>(
            isEmpty? null :
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item title = 'Options' iconName = 'ios-options' onPress = {()=>{}}/>
            </HeaderButtons>
        ) 
    })
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 14,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 25,
        opacity: 0.6
    },
    mealList: {
        marginHorizontal: 7.5,
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

export default SearchResultScreen;