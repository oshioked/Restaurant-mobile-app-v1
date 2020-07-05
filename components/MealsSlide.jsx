import React from 'react';
import {View, StyleSheet, Text, ScrollView } from 'react-native';
import MealItem from './MealItem';


const MealsSlide = props =>{

    return(
        <React.Fragment>
            <Text style = {styles.sectionTitle}>{props.title}</Text>
            <ScrollView horizontal = {true}>
                {
                    props.meals.map(meal => 
                        <MealItem
                            key = {meal.id}
                            navigation = {props.navigation}  
                            style = {{...styles.mealItem, paddingLeft: 0}} 
                            meal = {meal}
                        /> 
                    )
                }
            </ScrollView>
        </React.Fragment>
        
    )
}

const styles = StyleSheet.create({
    mealItem: {
        minWidth: 170,
        width: 170,
        height: 220
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 20
    },
    loadingElements: {
        backgroundColor: 'grey',
        opacity: 0.3,
    },
    loadElementsContainer:{

    }
})

export default MealsSlide;