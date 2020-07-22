import React from 'react';
import { View, StyleSheet, Linking, Text, Image } from 'react-native';
import Card from './Card';
import {Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const DeliveryContactCard = props =>{
    const onCall = async () =>{
        try {
            await Linking.openURL(`tel:08056055305`)
        } catch (error) {
            console.log(error)
        }
        
    }
    return(
        <Card style = {props.style}>
            <View style = {styles.contentContainer}>
                <Image style = {styles.image} source = {require('../assets/images/profilePicture.png')} />
                <View style = {styles.contactBlock} > 
                    <Text style = {styles.contactName}>Oshiozemhede Noble</Text>
                    <Text style = {styles.timeAway}>2 minutes 35 seconds away</Text>
                </View>
                <View style = {styles.iconContainer}>
                    <TouchableOpacity onPress = {onCall} activeOpacity = {0.75}>
                        <Ionicons name = 'ios-call' color = '#2BBA42' size = {28} />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    image: {
        marginRight: 15,
        width: '25%',
        borderRadius: 7
    },
    contactBlock: {
        width: '50%'
    },
    contactName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 7
    },
    timeAway: {
        opacity: 0.4,
        fontSize: 12,
    },
    iconContainer: {
        marginLeft: 'auto',
        marginRight: 10
    }
})

export default DeliveryContactCard;