import React from 'react';
import {AntDesign, MaterialCommunityIcons, Ionicons, Entypo} from '@expo/vector-icons';


export const HomeTabIcon = ({focused, tintColor}) =>{
    return(
        
            focused ?
            <Entypo name="home" size={25} color = {tintColor}/>
            : <AntDesign name="home" size={25} color = {tintColor} />
        
    )
}

export const SearchTabIcon = ({tintColor}) =>{
    return(
        <Ionicons name="md-search" size={25} color = {tintColor}/>
    )
}

export const CartTabIcon = ({tintColor}) =>{
    return(
        <Ionicons name="ios-basket" size={25} color = {tintColor}/>
    )
}

export const OrderTabIcon = ({tintColor}) =>{
    return(
        <MaterialCommunityIcons name="truck-fast" size={27} color = {tintColor}/>
    )
}

export const FavoriteTabIcon = ({focused, tintColor}) =>{
    return(
        <Ionicons name= {focused ? "ios-heart" : 'ios-heart-empty'} size={25} color = {tintColor} />
    )
}

export const ProfileTabIcon = ({tintColor}) =>{
    return(
        <Ionicons name="md-person" size={25} color = {tintColor}/>
    )
}
