import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import colors from '../../constants/colors';
import CartItem from '../../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../Redux/user/user.actions';

const CartScreen = props =>{
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    let totalTime;
    if(cartItems.length){
        totalTime = cartItems.map(item => item.meal.readyTime).reduce((a, b) => a + b);
    }
    const userBonusPercent = useSelector(state => state.user.bonusPercentage)
    
    useEffect(()=>{
        props.navigation.setParams({
            isCartEmpty: !Boolean(cartItems.length)
        })
    }, [cartItems])

    const dispatch = useDispatch();

    const placeOrderHandler = useCallback(() =>{
        dispatch(addOrder(cartItems, totalAmount))
    }, [cartItems, totalAmount, dispatch, addOrder]);

    useEffect(()=>{
        props.navigation.setParams({
            placeOrderHandler
        })
    }, [placeOrderHandler])

    const headerComponent = (
        <View style = {styles.header} >
            <View style = {styles.infoBar}>
                <Text style = {styles.infoText}>
                {
                    userBonusPercent >= 1 ?
                    `You currently have a N1200 discount`
                    : 
                    (totalAmount + (userBonusPercent * 10000)) >= 10000
                    ? `Congrats! With this, you qualify for a N1200 on your next purchase.`
                    :`Spend an additional N${10000 - (totalAmount + (userBonusPercent * 10000))} to qualify for a free N1200 discount.`
                }
                </Text>
            </View>
            <View style = {styles.orderDetailsBlock}>
                
                <View style = {styles.totalAmountBar}>
                    <Text style = {styles.amountLabel} >Total Amount:</Text>
                    <Text style = {styles.amount}>N{totalAmount}</Text>
                </View>
                <View style = {{...styles.totalAmountBar, ...styles.subInfoSet}}>
                    <Text>Delivery Time:</Text>
                    <Text>{Math.round(totalTime/60)} Minutes</Text>
                </View>
            </View>
        </View>
    )
    return(
            cartItems.length ?
            <FlatList
                style = {{backgroundColor: 'white'}}
                data = {cartItems}
                keyExtractor = {item => (item.meal.id).toString()}
                ListHeaderComponent = {headerComponent}
                renderItem = {itemData =>(
                    <CartItem
                        meal = {itemData.item.meal}
                        quantity = {itemData.item.quantity}
                    />
                )}
            />
            : 
            <View style = {styles.emptyFavContainer}>
                <Image resizeMode = 'contain' resizeMethod = "scale" style = {styles.emptyFavImage} source = {require('../../assets/images/emptyBag.png')} />
                <Text style  = {styles.emptyFavText}>You currently have no meals in your bag</Text>
            </View>
        
    )
}

CartScreen.navigationOptions = navData =>{
    const isCartEmpty = navData.navigation.getParam('isCartEmpty');
    const placeOrderHandler = navData.navigation.getParam('placeOrderHandler');

    return({
        headerTitle: 'Your Cart',

        headerRight: () =>(
            isCartEmpty ? null :
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <TouchableOpacity onPress = {placeOrderHandler}>
                    <Text style = {{fontSize: 12, paddingRight: 5}}>CONTINUE</Text>
                </TouchableOpacity>
            </HeaderButtons>
        )
    })
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        flex: 1,
        marginBottom: 10
    },
    infoBar: {
        width: '100%',
        minHeight: 45,
        backgroundColor: colors.primaryShade2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    infoText: {
        opacity: 0.7,
        fontSize: 12,
        textAlign: 'center'
    },
    orderDetailsBlock: {
        elevation: 6,
        shadowColor: 'grey',
        shadowOffset: {width: 1, height: 1,},
        shadowRadius: 10,
        shadowOpacity: 0.3,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    totalAmountBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        opacity: 0.7
    },
    amountLabel: {
        fontSize: 16
    },
    amount: {
        fontSize: 18
    },
    subInfoSet: {
        width: '75%',
        opacity: 0.4
    },
    emptyFavContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0
    },
    emptyFavImage: {
        // height: '45%',
        width: '100%',
        marginBottom: 5
    },
    emptyFavText: {
        opacity: 0.5
    }
})

export default CartScreen;