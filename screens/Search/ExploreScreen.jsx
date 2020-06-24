import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import MealItem from '../../components/MealItem';
import colors from '../../constants/colors';

const ExploreScreen = props =>{
    const onMealSelectHandler = () =>{
        props.navigation.navigate('MealDetail')
    }

    const onCategoryPressHandler = () =>{
        props.navigation.navigate('CategoryMeals')
    }
    return(
        <ScrollView>
            <View style = {styles.mealSetContainer}>
                <Text style = {styles.sectionTitle}>Recommended Meals</Text>
                <ScrollView horizontal = {true} style = {styles.mealList}>
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                </ScrollView>
            </View>
            <View style = {styles.mealSetContainer}>
                <Text style = {styles.sectionTitle}>Quickest Meals</Text>
                <ScrollView horizontal = {true} style = {styles.mealList}>
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                </ScrollView>
            </View>
            <View >
                <Text style = {styles.sectionTitle}>Hottest Categories</Text>
                <View style = {{paddingHorizontal: 15}}>
                    <CategoryCard onPress = {onCategoryPressHandler} style = {styles.categoryCard} imageUri = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/>
                    <CategoryCard onPress = {onCategoryPressHandler} style = {styles.categoryCard} imageUri = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                </View>
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mealSetContainer: {
        borderBottomColor: colors.primaryShade1,
        borderBottomWidth: 2,
        paddingBottom:20
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 20,
        marginLeft: 15
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
    }
})

export default ExploreScreen;