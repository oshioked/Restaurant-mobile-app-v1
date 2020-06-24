import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';

const FavoriteCard = props =>{
    return(
        <Card>
            <TouchableOpacity activeOpacity = {0.8} onPress = {props.onPress} style = {styles.favoriteContainer}>
                <Image style =  {styles.image} source = {require('../assets/images/faveDumMeal.png')}/>
                <View>
                    <Text style = {styles.mealName}>Spagetti and Turkey</Text>
                    <Text>N1 200</Text>
                    <Text style = {styles.mealTime}>4M</Text>
                </View>
                <View style = {styles.iconsContainer}>
                    <View style = {styles.icons}>
                        <View style = {styles.heartIcon}>
                            <Ionicons name = 'ios-heart' size = {23}/>
                        </View>
                        
                        <View style = {styles.addIcon}>
                            <Image style = {{width: 25, height: 23}} source = {require('../assets/images/addToCartIcon.png')}/>
                        </View>
                                               
                    </View>

                </View>
            </TouchableOpacity>
            
        </Card>

    )
}

const styles = StyleSheet.create({
    favoriteContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        overflow: 'hidden'
    },
    image: {
        marginRight: 15
    },
    mealName: {
        fontSize: 16,
        marginBottom: 7
    },
    mealTime: {
        marginTop: 'auto',
        fontWeight: '500',
        color: '#0A3D15',
        opacity: 0.7
    },
    iconsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
    },
    icons: {
        flexDirection: 'row',
    },
    heartIcon:{
        padding: 15,
        opacity: 0.5
    },
    addIcon: {
        padding: 15,
        paddingHorizontal: 17,
        backgroundColor: colors.primaryShade1,
        borderTopLeftRadius: 10
    }
})

export default FavoriteCard;