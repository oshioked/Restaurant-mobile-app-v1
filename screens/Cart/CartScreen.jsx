import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import colors from '../../constants/colors';
import CartItem from '../../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../Redux/user/user.actions';
import ActionConfirmModal from '../../components/ActionConfirmModal';
import { useState } from 'react';
import { clearCart } from '../../Redux/cart/cart.actions';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';




const CartScreen = props =>{
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const userBonusPercent = useSelector(state => state.user.bonusPercentage);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [errorPlacingOrder, setErrorPlacingOrder] = useState(false);

    let totalTime;
    if(cartItems.length){
        totalTime = cartItems.map(item => item.meal.readyTime).reduce((a, b) => a + b);
    }

    const verifyPermission = async () =>{
        const {granted} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if(granted){
            return true
        }else{
            const {granted} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            if(granted){
                return true
            }else{
                return false
            }
        }
    }
    
    const scheduleNotification = () =>{
        Notifications.scheduleNotificationAsync({
            content:{
                title: "Order Confirmation",
                body: "Track all your current orders",
            },
            trigger:{
                seconds: 10
            }
        })
    }

    Notifications.setNotificationHandler({
        handleNotification: async () =>{
            return{
                shouldShowAlert: true,
                shouldPlaySound: true
            }
        }
    })

    useEffect(()=>{
        const subscribe = Notifications.addNotificationResponseReceivedListener(notification =>{
            if(notification.notification.request.content.title === "Order Confirmation"){
                // props.navigation.navigate("Profile");
                props.navigation.navigate("Order")
            }
        })
        return(()=>{
            subscribe.remove()
        })
    })
    
    useEffect(()=>{
        props.navigation.setParams({
            isCartEmpty: !Boolean(cartItems.length)
        })
    }, [cartItems])

    const dispatch = useDispatch();


    const placeOrderHandler = useCallback( async () =>{
        setPlacingOrder(true);
        try {
            await dispatch(addOrder(cartItems, totalAmount));
            await dispatch(clearCart())
            setOrderCompleted(true);
            setPlacingOrder(false);
            const hasPermission = await verifyPermission();
            if(hasPermission){
                await scheduleNotification();
            } 
            setTimeout(()=>{
                setOrderCompleted(false)
            }, 3000)
        } catch (error) {
            setPlacingOrder(false);
            setErrorPlacingOrder(true);
            setTimeout(()=>{
                setErrorPlacingOrder(false)
            }, 2000)
        }

    }, [cartItems, totalAmount, dispatch, setErrorPlacingOrder, setOrderCompleted, setErrorPlacingOrder, addOrder]);


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
            <View style = {styles.cartDetailsBlock}>
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
        
    <View style = {{flex: 1}}>
        <ActionConfirmModal isVisible = {orderCompleted} iconName = 'ios-bicycle' text = "Order Completed" text2 = "Check profile to track all orders" />
        <ActionConfirmModal isVisible = {errorPlacingOrder} iconName = 'ios-warning' text = "Error" text2 = "Try again later" />
        <ActionConfirmModal loading = {true} isVisible = {placingOrder}/>

        {
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
        }       
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
    cartDetailsBlock: {
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
        maxHeight: '50%',
        width: '100%',
        marginBottom: 5
    },
    emptyFavText: {
        opacity: 0.5,
        paddingVertical: 15
    }
})

export default CartScreen;