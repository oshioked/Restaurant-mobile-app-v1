import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import colors from '../../constants/colors';
import MealsSlide from '../../components/MealsSlide';

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

    const fetchRecommendedMeals = useCallback(async () =>{
        const response = await fetch('http://localhost:5000/meals/recommended');
        const data = await response.json();
        setRecommendedMeals(data);
    }, [setRecommendedMeals])

    const fetchQuickestMeals = useCallback(async () =>{
        const response = await fetch('http://localhost:5000/meals/quickest');
        const data = await response.json();
        setQuickestMeals(data)
    }, [setQuickestMeals])

    const fetchHotCategories = useCallback(async () =>{
        const response = await fetch('http://localhost:5000/categories/hottest');
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
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <ActivityIndicator size = "large" />
            </View>
        )
    }

    return(
        <ScrollView>
            
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
    mealSetContainer: {
        borderBottomColor: colors.primaryShade1,
        borderBottomWidth: 2,
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
    }
})

export default ExploreScreen;