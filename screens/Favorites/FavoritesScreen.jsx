import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import FavoriteCard from '../../components/FavoriteCard';

const FavoritesScreen = props =>{
    const onMealSelect = () =>{
        props.navigation.navigate('MealDetail')
    }
    return(
        <ScrollView style = {styles.screen}>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
            <FavoriteCard onPress = {onMealSelect}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        paddingTop: 20
    }
})

export default FavoritesScreen;