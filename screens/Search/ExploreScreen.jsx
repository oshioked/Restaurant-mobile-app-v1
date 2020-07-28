import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import colors from '../../constants/colors';
import MealsSlide from '../../components/MealsSlide';
import Meal from '../../models/Meal';
import LoadingMealSlideElements from '../../components/LoadingMealSlideElement';

const ExploreScreen = props =>{
   const [isLoading, setIsLoading] = useState(false)
    
    const [recommendedMeals, setRecommendedMeals] = useState([]);
    const [quickestMeals, setQuickestMeals] = useState([]);
    const [hottestCategories, setHottestCategories] = useState([])

    const onCategoryPressHandler = (id, title) =>{
        props.navigation.navigate('CategoryMeals', {
            categoryId: id,
            categoryName: title
        })
    }

    /*
     MEALS RESULTS FROM SERVER HAVE DIFFERENT OBJECT STRUCTURE. 
     SO THIS CONVERTS THEM TO THE STRUCTURE ACCEPTED IN THIS NEIGHBORHOOD.
     THIS IS ALSO IN THE MEALS REDUCER FILE. IT'S BAD PRACTICE(FETCHING DATA HERE) 
     BUT I'M JUST TRYNA MAKE THIS WORK. :(
     */
    const getMeals = (mealsResult) =>(
        mealsResult.map(meal => (
            new Meal(
                meal.id,
                meal.title,
                meal.imageurl,
                meal.price,
                meal.description,
                meal.categories,
                meal.readytime
            )
        ))
    )


    const fetchRecommendedMeals = useCallback(async () =>{
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/meals/recommended');
        const data = await response.json();
        setRecommendedMeals(getMeals(data));
    }, [setRecommendedMeals])

    const fetchQuickestMeals = useCallback(async () =>{
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/meals/quickest');
        const data = await response.json();
        setQuickestMeals(getMeals(data))
    }, [setQuickestMeals])

    const fetchHotCategories = useCallback(async () =>{
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/categories/hottest');
        const data = await response.json();
        setHottestCategories(data)
    }, [setHottestCategories])

    const fetchAll = useCallback(async () =>{
        try {
            setIsLoading(true);
            await fetchQuickestMeals();
            await fetchRecommendedMeals();
            await fetchHotCategories();
        } catch (error) {
            
        }
        setIsLoading(false)
    }, [setIsLoading, fetchHotCategories, fetchQuickestMeals, fetchRecommendedMeals])

    useEffect(()=>{
        fetchAll();
    }, [fetchAll])



    if(isLoading){
        return(
            <View style = {{flex: 1}}>
               <View style = {{...styles.mealSetContainer, paddingLeft: 0}}>
                    <LoadingMealSlideElements/>
               </View>
               <View style = {{...styles.mealSetContainer, paddingLeft: 0}}>
                    <LoadingMealSlideElements/>
               </View>
               <View style = {{...styles.sectionTitle, ...styles.loadingElements, minHeight: 24, width: 180}}/>
                <View style = {{...styles.loadingElements, height: 200, marginHorizontal: 15, borderRadius: 10}}/>
            </View>
        )
    }

    return(
        <ScrollView style = {styles.screen}>
            
            <View style = {styles.mealSetContainer}>
                <MealsSlide navigation = {props.navigation} title = 'Recommended Meals' meals = {recommendedMeals}/>
            </View>
            <View style = {styles.mealSetContainer}>
                <MealsSlide navigation = {props.navigation} title = 'Quickest Meals' meals = {quickestMeals}/>
            </View>
            <View >
                <Text style = {styles.sectionTitle}>Hottest Categories</Text>
                <View style = {{paddingHorizontal: 15}}>
                    {
                        hottestCategories.map(cat => 
                            <CategoryCard
                                key = {cat.id}
                                category = {cat}
                                navigation = {props.navigation}
                                style = {styles.categoryCard} 
                            />
                        )
                    }
                </View>
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: 'white'
    },
    mealSetContainer: {
        borderBottomColor: colors.primaryShade1,
        borderBottomWidth: 1,
        paddingBottom:20,
        paddingLeft: 15
    },
    mealList: {
        paddingLeft: 7.5,
    },
    mealItem: {
        minWidth: 170,
        width: 170
    },
    categoryCard: {
        width: '100%',
        height: 210,
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 20,
        marginLeft: 15
    },
    loadingElements:{
        backgroundColor: 'grey',
        opacity: 0.1
    }
})

export default ExploreScreen;