import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import OrderCard from '../../components/OrderCard';
import {Ionicons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';


const OrdersOverviewScreen = props =>{
    
    const [currentOrdersDisplay, setCurrentOrdersDisplay] = useState(true);
    const orders = useSelector(state => state.user.orders);
    
    return(
        <ScrollView>
            <View style = {styles.screen}>
                <View>
                    {
                        orders.map(order => (
                            <OrderCard  
                                order = {order}
                                key = {order.id}
                                navigation = {props.navigation}
                            />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}

OrdersOverviewScreen.navigationOptions = navData =>{
    return({
        headerTitle: 'Your Orders'
    })
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 20
    }
})

export default OrdersOverviewScreen;