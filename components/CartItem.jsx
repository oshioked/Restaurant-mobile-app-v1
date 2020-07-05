import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons'
import { useDispatch } from 'react-redux';
import { clearItemFromCart } from '../Redux/cart/cart.actions';

const CartItem = props => {
    const dispatch = useDispatch();

    const onClearFromCart = () =>{
        dispatch(clearItemFromCart(props.meal))
    }
    return(
        <Card>
            <TouchableOpacity activeOpacity = {0.8} style = {styles.favoriteContainer}>
                <Image style =  {styles.image} source = {{uri: props.meal.imageUri}}/>
                <View>
                    <Text style = {styles.mealName}>{props.meal.title}</Text>
                    <Text>N{props.meal.price}</Text>
                    <Text style = {styles.mealTime}>4M</Text>
                </View>
                <View style = {styles.iconsContainer}>
                    <View style = {styles.icons}>
                        <TouchableOpacity onPress = {onClearFromCart} style = {styles.addIcon}>
                            <Ionicons name="ios-trash" size={25} color="red" />
                        </TouchableOpacity>         
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
        padding: 10,
        marginHorizontal: 15,
        overflow: 'hidden',
        minHeight: 95
    },
    image: {
        marginRight: 15,
        borderRadius: 5,
        height: '100%',
        width: '20%'
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
        opacity: 0.4
    },
    addIcon: {
        padding: 11,
        paddingHorizontal: 17,
        backgroundColor: colors.primaryShade1,
        borderTopLeftRadius: 10
    }
})

export default CartItem;