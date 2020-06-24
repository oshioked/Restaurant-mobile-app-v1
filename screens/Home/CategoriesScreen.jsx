import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import ImageDarkener from '../../components/ImageDarkener';
import CategoryCard from '../../components/CategoryCard';
import MealItem from '../../components/MealItem';
import {useSelector} from 'react-redux';

const CategoriesScreen = props =>{

    const categories = useSelector(state => state.Meals.categories);

    const onCategoryPressHandler = (name, id) =>{
        props.navigation.navigate('CategoryMeals', {
            categoryName: name,
            categoryId: id
        })
    }
    const onMealSelectHandler = () =>{
        console.log(name)
        props.navigation.navigate("MealDetail")
    }
    return(
        
        <SafeAreaView style = {styles.screen}>
            <ScrollView>
                <ImageBackground 
                    style = {styles.imageBg}
                    source = {{uri: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                >
                        <ImageDarkener/>
                        <Text style = {styles.headerText}>Eat fine meals really fast and affordable.Bring your money, we’ll bring the food to your door mat.</Text>   
                </ImageBackground>

                <View style = {styles.infoBar}>
                    <Text style = {styles.infoText}>10% off on all meals in the following categories. Drinks, soup, snacks and turkey. Promo ends by 12 : 30PM today.</Text>
                </View>

                <Text style = {styles.mealsCatText}>Meals Categories</Text>
                {
                    categories.map(category => (
                        <CategoryCard 
                            key = {category.id}
                            onPress = {()=>onCategoryPressHandler(category.title, category.id)} 
                            style = {styles.categoryCard} 
                            title = {category.title} 
                            description = {category.description} 
                            imageUri = {category.imageUri}
                        />
                    ))
                }

                    <Text style = {{...styles.mealsCatText, fontSize: 16}}>Today's Most Ordered Meals</Text>
                    <ScrollView horizontal = {true} style = {styles.mealList}>
                        <MealItem onPress = {onMealSelectHandler} style = {{...styles.mealItem, paddingLeft: 0}} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                        <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                        <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                        <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                    </ScrollView>
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
        flex: 1
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
        fontSize: 12
    },
    mealsCatText:{
        fontSize: 20,
        marginBottom: 10
    },
    categoryCard: {
        width: '100%',
        height: 210
    },
    mealList: {
    },
    mealItem: {
        minWidth: 170,
        width: 170
    },
})

export default CategoriesScreen;