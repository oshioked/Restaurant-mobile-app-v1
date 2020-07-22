import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import ImageDarkener from '../../components/ImageDarkener';
import MealItem from '../../components/MealItem';
import CustomTextInput from '../../components/CustomTextInput';
import {useSelector, useDispatch} from 'react-redux'
import { fetchCategoryMeals } from '../../Redux/meals/meals.action';

const CategoryMealsScreen = props =>{
    const [filterDisplay, setFilterDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFilterDisplay = useCallback(() =>{
        setFilterDisplay(!filterDisplay)
    }, [filterDisplay, setFilterDisplay])

    useEffect(()=>{
        props.navigation.setParams({toggleFilterDisplay})
    }, [toggleFilterDisplay])

    const categoryId = props.navigation.getParam('categoryId');

    const categoryDetails = useSelector(state => state.categories.allCategories.find(category=> category.id === categoryId));
    const categoryMeals = useSelector(state => state.Meals.categoryMeals[categoryId]);

    const dispatch = useDispatch();
    const fetchMeals = useCallback(async (searchQuery) =>{
        try {
            setIsLoading(true);
            await dispatch(fetchCategoryMeals(categoryId, searchQuery))
        } catch (error) {
            
        }
        setIsLoading(false)   
    }, [setIsLoading, dispatch, categoryId])

    useEffect(()=>{
        if(!Boolean(categoryMeals)){
           fetchMeals(); 
        }
        
    }, [fetchMeals])

    // const onSearchHandler = (input) =>{
    //     if(input.length <= 0) return;
    //     fetchMeals(input)
    // }

    const HeaderComponent = () =>(
        <ImageBackground style = {styles.imgBg} source = {{uri: categoryDetails.imageurl}}>
            <ImageDarkener/>
            <View style = {styles.detailsBlock}>
                <Text style = {styles.blockTitle}>{categoryDetails.title}</Text>
                <Text style = {styles.blockText}>{categoryDetails.description}</Text>
            </View>
            <CustomTextInput 
                placeholder = {`Search ${categoryDetails.title}`}
                // onSubmit = {onSearchHandler}
                returnKeyLabel = 'Search'
                style = {styles.CustomTextInput}
            />
        </ImageBackground>
    )

    if(isLoading){
        return(
            <View style = {styles.screen}>
                <HeaderComponent/>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size = 'large'/>
                </View>
            </View>
        )
    }

    return(
        <View style = {styles.screen}>
            <FlatList
                numColumns = {2}
                columnWrapperStyle = {styles.columnWrapper}
                data = {categoryMeals}
                renderItem = {itemData => 
                    <MealItem 
                        style = {styles.mealItem} 
                        meal = {itemData.item}
                        navigation = {props.navigation}
                    /> 
                }
                ListHeaderComponent = {HeaderComponent}
            />
        </View>
    )
}

CategoryMealsScreen.navigationOptions = navData =>{
    const categoryTitle = navData.navigation.getParam('categoryName');
    const toggleFilterDisplay = navData.navigation.getParam('toggleFilterDisplay')
    return({
        headerBackTitle: 'Back',
        headerTitle: categoryTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item title = 'Options' iconName = 'ios-options' onPress = {toggleFilterDisplay}/>
        </HeaderButtons>
    })
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex: 1
    },
    imgBg: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
        marginBottom: 15,
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
    CustomTextInput: {
        marginHorizontal: 15
    },
    columnWrapper: {
        marginHorizontal: 7.5
    }
})

export default CategoryMealsScreen;