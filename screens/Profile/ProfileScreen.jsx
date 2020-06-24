import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch} from 'react-native';
import {} from '@expo/vector-icons';
import colors from '../../constants/colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ProfileScreen = props =>{
    return(
        <View style = {styles.screen}>
        <ScrollView contentContainerStyle = {styles.contentContainer}>
            <Image style = {styles.profilePicture} source = {require('../../assets/images/profilePicture.png')}/>
            <Text style = {styles.fullName}>Daniel Oshioke Iyogwoya</Text>
            <View style = {styles.progressBar}>
                <View style = {styles.progressIndicator}/>
            </View>
            <Text style = {styles.progressComment}><Text style = {{color : '#4D9654'}}>N3 000 of N10 000.</Text>  Spend extra N 7 000 to qualify for a free N 1200 meal.</Text>
            
            <View style = {styles.infoSection}>
                <Text>PROFILE INFO.</Text>
                <View style = {styles.infoSet}>
                    <Text style = {styles.infoProp}>Phone</Text>
                    <Text numberOfLines = {1} style = {styles.infoValue}>08056055305</Text>
                </View>
                <View style = {styles.infoSet}>
                    <Text style = {styles.infoProp}>Email</Text>
                    <Text numberOfLines = {1} style = {styles.infoValue}>Danieloshos3@gmail.com</Text>
                </View>
                <View style = {styles.infoSet}>
                    <Text style = {styles.infoProp}>Address</Text>
                    <Text numberOfLines = {1} style = {styles.infoValue}>No 8, Lucky Dube Street, New Havens, California, U.S.A</Text>
                </View>
                <View style = {styles.infoSet}>
                    <Text style = {styles.infoProp}>City/State</Text>
                    <Text numberOfLines = {1} style = {styles.infoValue}>Warri/Delta State</Text>
                </View>
            </View>
            <View style = {styles.infoSection}>
                <Text>SETTINGS</Text>
                <View style = {styles.infoSet}>
                    <Text style = {styles.infoProp}>Night Mode</Text>
                    <Switch />
                    
                    
                </View>
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
    infoSection: {
        alignItems: 'flex-start',
        width: '90%',
        marginTop: 50
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
    infoValue: {
        width: '70%',
        opacity: 0.8,
        textAlign: 'left',
        fontSize: 14
    }
})

export default ProfileScreen;