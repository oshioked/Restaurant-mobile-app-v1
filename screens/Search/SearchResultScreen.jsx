import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import MealItem from '../../components/MealItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const SearchResultScreen = props =>{
    const onMealSelectHandler = () =>{
        props.navigation.navigate('MealDetail')
    }
    return(
        <View>
            <Text style = {styles.screenTitle}>Results for 'spagetti'</Text>
             <ScrollView contentContainerStyle = {styles.mealList}>
                <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
                <MealItem onPress = {onMealSelectHandler} style = {styles.mealItem} imageUri = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'/> 
            </ScrollView>
        </View>
    )
}

SearchResultScreen.navigationOptions = navData =>{
    return({
        headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item title = 'Options' iconName = 'ios-options' onPress = {()=>{}}/>
        </HeaderButtons>
    })
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 18,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 25
    },
    mealList: {
        flexDirection: 'row',
        marginHorizontal: 7.5,
        flexWrap: 'wrap'
    }
})

export default SearchResultScreen;