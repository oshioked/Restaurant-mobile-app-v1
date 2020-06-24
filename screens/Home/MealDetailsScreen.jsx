import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import colors from '../../constants/colors';
import {useSelector} from 'react-redux';

const MealDetailsScreen = props =>{
    const mealId = props.navigation.getParam('mealId');
    const meal = useSelector(state => state.Meals.meals.find(m => m.id === mealId));

    return(
        <ScrollView>
            <Image style = {styles.image} source = {{uri: meal.imageUri}}/>
            <View style = {styles.detailsContainer}>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealName}}>{meal.title}</Text>
                    <Text>N{meal.price}</Text>
                </View>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealTime}}>READY TIME</Text>
                    <Text>{meal.readyTime}</Text>
                </View>
                <View style = {styles.detailSet}>
                    <Text style = {{...styles.detailTitle, ...styles.mealDescription}}>DESCRIPTION</Text>
                    <Text>{meal.description}</Text>
                </View>
                <Button title = "Add to Cart" color = 'green' onPress = {()=>{}}/>
            </View>
            
        </ScrollView>
    )
}

MealDetailsScreen.navigationOptions = navData =>{
    return({
        headerRight: () =>(
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item
                    title = 'Like'
                    iconName = 'ios-heart-empty'
                />
            </HeaderButtons>
        )
    })
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 270,
        backgroundColor: 'grey'
    },
    detailsContainer: {
        marginHorizontal: 15
    },
    detailSet: {
        paddingVertical: 15,
        borderBottomColor: colors.primaryShade1,
        borderBottomWidth: 1,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15
    },
    
})

export default MealDetailsScreen;