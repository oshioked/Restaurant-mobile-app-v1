import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from './Card';
import CustomButton from './CustomButton';

const OrderCard = props =>{
    const [viewAll, setViewAll] = useState(false);

    const onViewAllHandler = ()=>{
        setViewAll(!viewAll)
    }

    const onTrackPressHandler = () =>{
        props.navigation.navigate('TrackOrder')
    }
    const orderItems = props.order.items;
    const itemTitleAndQtySet = orderItems.map(item => `${item.meal.title} (${item.quantity})`);
    
    return(
        <Card>
            <View style = {styles.orderCard}>
                <View style = {styles.timeStatusBlock}>
                    <Text style = {styles.orderedDate}>{props.order.readableDate}</Text>
                    <Text style = {styles.orderStatus}>{'Status: '}
                        <Text style = {{color: 'green'}}>{props.order.status}</Text>
                    </Text>
                </View>
                {
                    viewAll?
                    <View>
                        {
                            orderItems.map(item=>(
                                <View key = {item.meal.id} style = {styles.cartItemRow}>
                                    <Text style = {styles.mealText}>{`${item.meal.title} (${item.quantity})`}</Text>
                                    <Text style = {styles.mealPriceText}>N{item.amount * item.quantity}</Text>
                                </View>
                            ))
                        }
                    </View>
                    :
                    <Text numberOfLines = {1} style = {styles.mealsRowText}>{itemTitleAndQtySet.join(', ')}</Text>
                }
                
                <TouchableOpacity onPress = {onViewAllHandler}>
                    <Text style = {styles.viewText}>{ viewAll ? 'View less' : 'View All'}</Text>
                </TouchableOpacity>
                <Text style = {styles.totalAmount}>N{props.order.totalAmount}</Text>
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
    orderedDate: {
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
    },
    cartItemRow: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    mealText: {
        width: '80%',
        textAlign: 'left',
        fontWeight: '600',
        opacity: 0.8,
    },
    totalAmount: {
        width: '100%',
        textAlign: 'right',
        marginRight: 10,
        marginTop: 0,
        marginBottom: 25,
        fontWeight: '500'
    },
    viewText: {
        color: '#9B7F98',
        fontSize: 12
    }
})

export default OrderCard;