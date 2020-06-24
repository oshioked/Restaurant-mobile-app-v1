import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, FlatList, VirtualizedList} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import ImageDarkener from '../../components/ImageDarkener';
import MealItem from '../../components/MealItem';
import CustomTextInput from '../../components/CustomTextInput';
import {useSelector} from 'react-redux'

const CategoryMealsScreen = props =>{
    const categoryId = props.navigation.getParam('categoryId');
    const categoryName = props.navigation.getParam('categoryName');
    const category = useSelector(state => state.Meals.categories.find(category=> category.id === categoryId));
    const categoryMeals = useSelector(state => 
        state.Meals.meals.filter(meal => 
            meal.categories.map(cat => {
                return cat.toLowerCase();
                
            }).includes(categoryName.toLowerCase())
        )
    )

    const onMealSelectHandler = (id) =>{
        props.navigation.navigate('MealDetail', {
            mealId: id
        })
    }
    return(
        <View style = {styles.screen}>
            <FlatList
                numColumns = {2}
                columnWrapperStyle = {styles.columnWrapper}
                data = {categoryMeals}
                renderItem = {itemData => 
                    <MealItem 
                        onPress = {()=>onMealSelectHandler(itemData.item.id)} 
                        style = {styles.mealItem} 
                        imageUri = {itemData.item.imageUri}
                        title = {itemData.item.title}
                        price = {itemData.item.price}
                        readyTime = {itemData.item.readyTime}
                    /> 
                }
                ListHeaderComponent = { () =>
                    <ImageBackground style = {styles.imgBg} source = {category.imageUri}>
                        <ImageDarkener/>
                        <View style = {styles.detailsBlock}>
                            <Text style = {styles.blockTitle}>{category.title}</Text>
                            <Text style = {styles.blockText}>{category.description}</Text>
                        </View>
                        <CustomTextInput placeholder = {`Search ${category.title}`}/>
                    </ImageBackground>
                }
            />
            
        </View>
    )
}

CategoryMealsScreen.navigationOptions = navData =>{

    const categoryTitle = navData.navigation.getParam('categoryName');

    return({
        headerBackTitle: 'Back',
        headerTitle: categoryTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item title = 'Options' iconName = 'ios-options' onPress = {()=>{}}/>
        </HeaderButtons>
    })
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
    },
    imgBg: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
        marginBottom: 15
    },
    detailsBlock: {
        marginHorizontal: 15
    },
    blockTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        marginBottom: 5
    },
    blockText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500'
    },
    columnWrapper: {
        marginHorizontal: 7.5
    }
})

export default CategoryMealsScreen;