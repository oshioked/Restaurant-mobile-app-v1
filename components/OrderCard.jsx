import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from './Card';
import CustomButton from './CustomButton';

const OrderCard = props =>{
    const onTrackPressHandler = () =>{
        props.navigation.navigate('TrackOrder')
    }
    return(
        <Card>
            <View style = {styles.orderCard}>
                <View style = {styles.timeStatusBlock}>
                    <Text style = {styles.orderedTime}>4 : 30PM. 6th June, 2020.</Text>
                    <Text style = {styles.orderStatus}>Status: 
                        <Text style = {{color: 'green'}}> Arrived</Text>
                    </Text>
                </View>
                <Text numberOfLines = {1} style = {styles.mealsRowText}>Spagetti and turkey (2), Coke drink (2), Barbeque fish...</Text>
                <TouchableOpacity onLongPress = {()=>alert('How far')}>
                    <Text>View All</Text>
                </TouchableOpacity>
                <Text>$140.99</Text>
                <CustomButton style = {styles.button} onPress = {onTrackPressHandler}>
                    Track on map
                </CustomButton>
            </View>
            
        </Card>
    )
}

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        overflow: 'hidden',
        minHeight: 180
    },
    timeStatusBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    orderedTime: {
        opacity: 0.3
    },
    orderStatus: {
        opacity: 0.5
    },
    mealsRowText: {
        fontWeight: '600',
        opacity: 0.8,
        marginBottom: 7
    },
    button: {
        marginTop: 'auto',
        alignSelf: 'flex-end',
        paddingHorizontal: 15
    }
})

export default OrderCard;