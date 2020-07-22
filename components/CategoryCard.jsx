import React from 'react';
import { View,ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageDarkener from './ImageDarkener';
import Card from './Card';

const CategoryCard = props =>{
    const {category} = props;
    const onCategoryPressHandler = (name, id) =>{
        props.navigation.navigate('CategoryMeals', {
            categoryName: category.title,
            categoryId: category.id
        })
    }

    return(
            <TouchableOpacity activeOpacity = {0.85} style = {{...styles.categoryCard, ...props.style}} onPress = {onCategoryPressHandler}>
                 <Card>
                <ImageBackground style = {styles.imgBg} source = {{uri: category.imageurl}}>
                    <ImageDarkener/>
                    <View style = {styles.detailsBlock}>
                        <Text  style = {styles.blockTitle}>{category.title}</Text>
                        <Text numberOfLines = {1} style = {styles.blockText}>{category.description}</Text>
                    </View>
                </ImageBackground>
                </Card>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    categoryCard: {
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
        minHeight: 210
    },
    imgBg: {
        width: '100%',
        height: '100%',
        minHeight: 200,
        justifyContent: 'flex-end'
    },
    detailsBlock: {
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        padding: 10
    },
    blockTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginBottom: 10
    },
    blockText: {
        color: 'white',
        fontWeight: '500'
    }
})

export default CategoryCard;