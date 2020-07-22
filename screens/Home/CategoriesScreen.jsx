import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import ImageDarkener from '../../components/ImageDarkener';
import CategoryCard from '../../components/CategoryCard';
import {useSelector, useDispatch} from 'react-redux';
import MealsSlide from '../../components/MealsSlide';
import { fetchAllCategories } from '../../Redux/categories/categories.actions';
import { fetchHeader } from '../../Redux/home/home.actions';
import { fetchMostOrdered } from '../../Redux/meals/meals.action';
import { fetchUserData } from '../../Redux/user/user.actions';

const CategoriesScreen = props =>{
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(error);
    const categories = useSelector(state => state.categories.allCategories);
    const header = useSelector(state => state.home.header);
    const todaysMostOrderedMeals = useSelector(state => state.Meals.mostOrderedMeals)
    const dispatch = useDispatch();

    // FETCH USER DATA ON APP'S FIRST SCREEN
    const fetchUser = useCallback(async ()=>{
        try {
            await dispatch(fetchUserData())
        } catch (error) {
            console.log(error.message)
        }
    }, [dispatch]);

    useEffect(()=>{
        fetchUser();
    }, [fetchUser])

    // FETCH SCREEN CONTENT
    const fetchContents = useCallback(async () =>{
        setIsLoading(true);
        try {
            await dispatch(fetchHeader());
            await dispatch(fetchAllCategories());
            await dispatch(fetchMostOrdered())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false);
    }, [setIsLoading, dispatch, setError]);

    useEffect(()=>{
        fetchContents();
    }, [fetchContents])


    if(isLoading){
        return(
            <SafeAreaView style = {styles.screen}>
                <View>
                    <View style = {{...styles.imageBg, ...styles.loadingElements}}/>
                    <View style = {{...styles.infoBar, ...styles.loadingElements}}/>
                    <View style = {{...styles.mealsCatText, ...styles.loadingElements, minHeight: 24, width: 150}}/>
                    <View style = {{...styles.categoryCard, ...styles.loadingElements, marginBottom: 20, borderRadius: 10}}/>
                    <View style = {{...styles.categoryCard, ...styles.loadingElements, marginBottom: 20, borderRadius: 10}}/>
                </View>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style = {styles.screen}>
            <ScrollView>
                <ImageBackground 
                    style = {styles.imageBg}
                    source = {{uri: header.imageUri}}
                >
                    <ImageDarkener/>
                    <Text style = {styles.headerText}>{header.text}</Text>   
                </ImageBackground>

                <View style = {styles.infoBar}>
                    <Text style = {styles.infoText}>{header.news}</Text>
                </View>

                <Text style = {styles.mealsCatText}>Meals Categories</Text>
                <View style = {styles.catCardsContainer}>
                {
                    categories.map(category => (
                        <CategoryCard 
                            key = {category.id}
                            category = {category}
                            style = {styles.categoryCard}
                            navigation = {props.navigation}
                        />
                    ))
                }                    
                </View>
                {
                    todaysMostOrderedMeals.length === 0
                    ? null
                    : <MealsSlide title = "Today's Most Ordered Meals" navigation = {props.navigation} meals = {todaysMostOrderedMeals}/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

CategoriesScreen.navigationOptions = navData =>{
    return({
        headerShown: false,
    })
}

const styles = StyleSheet.create({
    screen: {
        margin: 15,
        marginBottom: 0,
        flex: 1,
    },
    imageBg: {
        height: 220,
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        margin: 10
    },
    infoBar: {
        minHeight: 55,
        backgroundColor: '#56C868',
        marginVertical: 20,
        justifyContent: 'center',
        padding: 7,
        borderRadius: 5
    },
    infoText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    mealsCatText:{
        fontSize: 20,
        marginBottom: 10
    },
    categoryCard: {
        width: '100%',
        height: 210
    },
    catCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    loadingElements: {
        backgroundColor: 'grey',
        opacity: 0.1
    }
})

export default CategoriesScreen;