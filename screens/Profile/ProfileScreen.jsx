import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';
import ProfileInfoSet from '../../components/ProfileInfoSet';
import { useSelector, useDispatch } from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import CompleteYourProfileSection from '../../components/CompleteYourProfileSection';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { logOut } from '../../Redux/user/user.actions';
import ImageDarkener from '../../components/ImageDarkener';

const ProfileScreen = props =>{
    const userData = useSelector(state => state.user);
    const [isImageUploading, setIsImageUploading] = useState(false);

    const {orders} = userData;
    const dispatch = useDispatch();

    // Calculate number of pending orders
    let orderNumber;
    if(orders){
        orderNumber = orders.filter(order => order.status.toLowerCase() === 'pending').length;
    }

    const onLogout = useCallback(() =>{
        dispatch(logOut());
        props.navigation.navigate("Auth")
    }, [dispatch, logOut])

    useEffect(()=>{
        props.navigation.setParams({onLogout: onLogout})
    }, [onLogout])

    const onOrderPressHandler = () =>{
        props.navigation.navigate('Order')
    }

    return(
        <View style = {styles.screen}>
        <ScrollView contentContainerStyle = {styles.contentContainer}>

            <View style = {styles.profilePictureContainer}>
                {
                    isImageUploading ?
                    <View style  = {{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ImageDarkener/>
                        <ActivityIndicator size = 'small' color = 'white'/>
                    </View>
                    :
                    userData.profileImage
                    ?
                    <Image style = {styles.profilePicture} source = {{uri: userData.profileImage}}/>
                    : <Ionicons name="md-person" size={70} color = 'grey'/>
                }
                
                
            </View>
            
            <Text style = {styles.fullName}>{userData.name}</Text>

            {/* Progress section */}
            <View style = {styles.progressBar}>
                <View style = {{...styles.progressIndicator, width: `${userData.bonusPercentage * 100}%`}}/>
            </View>
            <Text style = {styles.progressComment}>
                <Text style = {{color : '#4D9654'}}>{`N${Math.round(userData.bonusPercentage * 10000)} of N10000. `}</Text>
                {
                    userData.bonusPercentage >= 1 ? 
                    'Congrats! You qualify for a N1200 meal discount!'
                    : (`Spend extra N ${10000 - (userData.bonusPercentage * 10000)} to qualify for a free N 1200 meal discount.`)
                }
            </Text>
            
            <View style = {styles.infoSection}>

                {/* The order section */}
                <TouchableOpacity activeOpacity = {0.8} onPress = {onOrderPressHandler} style = {styles.ordersInfo}>
                    <View style = {{...styles.infoSet, borderBottomWidth: 0, borderTopWidth: 1}}>
                        
                            <Text style = {{...styles.infoProp, ...styles.orderLabel}}>Orders</Text>
                            <View style = {styles.orderIconContainer}>
                                <View style = {styles.orderIcon}>
                                    <Text style = {styles.orderNumber}>{orderNumber}</Text>
                                </View>
                            </View>
                    </View>    
                </TouchableOpacity>
                
                {/* Complete profile section */}
                <CompleteYourProfileSection
                    setIsImageUploading = {setIsImageUploading}
                    address = {userData.address}
                    imageUri = {userData.profileImage}
                    navigation = {props.navigation}
                />

                {/* Profile Info section */}
                <Text style = {styles.infoSectionTitle}>PROFILE INFO.</Text>
                <ProfileInfoSet label = "Phone" value = {"0" + userData.phoneNo}/>
                <ProfileInfoSet label = "Email" value = {userData.email}/>
                {
                    userData.address ?
                    <ProfileInfoSet label = "Address" value = {userData.address}/>
                    : null
                }
                
            </View>
        </ScrollView>
        </View>
    )
}

ProfileScreen.navigationOptions = navData =>{
    const onLogout = navData.navigation.getParam("onLogout")
    return({
        headerTitle: 'Your Profile',
        headerRight: () =>(
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item 
                    iconName = 'md-exit'
                    title = 'Logout'
                    onPress = {onLogout}
                />
            </HeaderButtons>
        )
    })
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 30,
        backgroundColor: 'white'
    },
    profilePictureContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#c7c7c7',
        justifyContent: 'center',
        alignItems: 'center'

    },
    profilePicture: {
        height: '100%',
        width: '100%',
    },
    fullName: {
        fontSize: 20,
        color: 'black',
        opacity: 0.8,
    },
    progressBar: {
        height: 10,
        width: '85%',
        backgroundColor: colors.primaryShade1,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 5
    },
    progressIndicator: {
        position: "absolute",
        height: '100%',
        backgroundColor: '#2BBA42',
        width: '30%'
    },
    progressComment: {
        width: '85%',
        fontSize: 11
    },
    
    infoSet: {
        width: '100%',
        borderColor: colors.primaryShade1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingLeft: 5
    },
    infoProp:{
        width: '30%',
        opacity: 0.4,
        fontSize: 14
    },
    infoSection: {
        alignItems: 'center',
        
        width: '90%',
        marginTop: 50
    },
    infoSectionTitle: {
        opacity: 0.4, 
        fontSize: 12,
        marginTop: 30,
        width: '100%',
    },
    orderIcon: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    orderNumber: {
        color: 'white',
        fontWeight: '700'
    },
    ordersInfo: {
        width: '100%',
        flexDirection: 'row'
    }
})

export default ProfileScreen;