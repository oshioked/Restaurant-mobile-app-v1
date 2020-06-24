import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import OrderCard from '../../components/OrderCard';
import {Ionicons} from '@expo/vector-icons';


const OrdersOverviewScreen = props =>{
    return(
        <ScrollView>
            <View>
                <View>
                    <Text>Current</Text>
                    <Ionicons name="md-arrow-dropdown" size={24} color="black" />
                    <Ionicons name="md-arrow-dropup" size={24} color="black" />
                </View>
                <View>
                    <OrderCard navigation = {props.navigation}/>
                    <OrderCard navigation = {props.navigation}/>
                </View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default OrdersOverviewScreen;