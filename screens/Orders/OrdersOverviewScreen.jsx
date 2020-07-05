import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import OrderCard from '../../components/OrderCard';
import {Ionicons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';


const OrdersOverviewScreen = props =>{
    
    const [currentOrdersDisplay, setCurrentOrdersDisplay] = useState(true);
    const orders = useSelector(state => state.order.orders);
    
    return(
        <ScrollView>
            <View style = {styles.screen}>
                <View style = {styles.sectionTitleBlock}>
                    <Text style = {styles.sectionTitle}>CURRENT</Text>
                    {
                        currentOrdersDisplay ?
                        <Ionicons name="md-arrow-dropdown" size={24} color="black" /> :
                        <Ionicons name="md-arrow-dropup" size={24} color="black" />
                    }
                </View>
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
    },
    sectionTitleBlock: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '500',
        opacity: 0.7
        
    }
})

export default OrdersOverviewScreen;