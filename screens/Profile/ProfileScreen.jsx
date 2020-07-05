import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch} from 'react-native';
import colors from '../../constants/colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import ProfileInfoSet from '../../components/ProfileInfoSet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const ProfileScreen = props =>{
    const orderNumber = useSelector(state => state.order.orders.filter(order => order.status.toLowerCase() === 'pending').length);

    const onOrderPressHandler = () =>{
        props.navigation.navigate('Order')
    }
    return(
        <View style = {styles.screen}>
        <ScrollView contentContainerStyle = {styles.contentContainer}>

            <Image style = {styles.profilePicture} source = {require('../../assets/images/profilePicture.png')}/>
            <Text style = {styles.fullName}>Daniel Oshioke Iyogwoya</Text>

            {/* Progress section */}
            <View style = {styles.progressBar}>
                <View style = {styles.progressIndicator}/>
            </View>
            <Text style = {styles.progressComment}>
                <Text style = {{color : '#4D9654'}}>{'N3 000 of N10 000. '}</Text>
                Spend extra N 7 000 to qualify for a free N 1200 meal.
            </Text>
            
            <View style = {styles.infoSection}>

                {/* The order section */}
                <TouchableOpacity activeOpacity = {0.8} onPress = {onOrderPressHandler} style = {styles.ordersInfo}>
                <View style = {{...styles.infoSet}}>
                    
                        <Text style = {{...styles.infoProp, ...styles.orderLabel}}>Orders</Text>
                        <View style = {styles.orderIconContainer}>
                            <View style = {styles.orderIcon}>
                                <Text style = {styles.orderNumber}>{orderNumber}</Text>
                            </View>
                        </View>
                </View>    
                    </TouchableOpacity>
                

                {/* Profile Info section */}
                <Text style = {styles.infoSectionTitle}>PROFILE INFO.</Text>
                <ProfileInfoSet label = "Phone" value = '08056055305'/>
                <ProfileInfoSet label = "Email" value = 'Danieloshos3@gmail.com'/>
                <ProfileInfoSet label = "Address" value = 'No 8, Lucky Dube Street, New Havens, California, U.S.A'/>
                <ProfileInfoSet label = "City/State" value = 'Warri/Delta State'/>
            </View>
        </ScrollView>
        </View>
    )
}

ProfileScreen.navigationOptions = navData =>{
    const onEditPressHandler = () =>{
        navData.navigation.navigate('ProfileEdit')
    }
    return({
        headerTitle: 'Your Profile',
        headerRight: () =>(
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item 
                    iconName = 'md-create'
                    title = 'Edit'
                    onPress = {onEditPressHandler}
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
    profilePicture: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginVertical: 20
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
        borderBottomColor: colors.primaryShade2,
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
        alignItems: 'flex-start',
        width: '90%',
        marginTop: 50
    },
    infoSectionTitle: {
        opacity: 0.4, 
        fontSize: 12,
        marginTop: 50
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