import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import Card from './Card';
import CustomButton from './CustomButton';

const OrderCard = props =>{
    const [viewAll, setViewAll] = useState(false);

    const onViewAllHandler = ()=>{
        setViewAll(!viewAll)
    }

    const verifyPermission = async () =>{
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status != 'granted'){
            return false;
        }
        return true;
    }

    const onTrackPressHandler = async () =>{
        const hasPermission = await verifyPermission();
        if(!hasPermission)return;
        props.navigation.navigate('TrackOrder')
    }
    const orderItems = props.order.items;
    const itemTitleAndQtySet = orderItems.map(item => `${item.meal.title} (${item.quantity})`);

    
    return(
        <Card>
            <View style = {styles.orderCard}>
                <View style = {styles.timeStatusBlock}>
                    <Text allowFontScaling = {false} numberOfLines = {2} style = {styles.orderedDate}>{props.order.readableDate}</Text>
                    <Text allowFontScaling = {false} numberOfLines = {2}  style = {styles.orderStatus}>{'Status: '}
                        <Text style = {{color: 'green', fontSize: 12}}>{props.order.status.toUpperCase()}</Text>
                    </Text>
                </View>
                {
                    viewAll?
                    <View>
                        {
                            orderItems.map(item=>(
                                <View key = {item.meal.id} style = {styles.cartItemRow}>
                                    <Text style = {styles.mealText}>{`${item.meal.title} (${item.quantity})`}</Text>
                                    <Text style = {styles.mealPriceText}>N{item.amount}</Text>
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
        opacity: 0.3,
        maxWidth: '65%'
    },
    orderStatus: {
        opacity: 0.5,
        maxWidth: '35%'
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