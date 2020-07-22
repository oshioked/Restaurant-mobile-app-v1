import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import {Ionicons} from '@expo/vector-icons';


const ProfileCompletionCard = (props) =>{
    return(
        <View style = {styles.card}>
            <View style = {{...styles.iconContainer, opacity: props.isCompleted ? 0.6 : 1}}>
                <Ionicons name = {props.iconName} size = {27} color = 'black'/>
                {
                    props.isCompleted ?
                    <Ionicons style = {styles.checkIcon} name = 'ios-checkmark-circle' size = {24} color = '#2BBA42'/>
                    : null
                }
                
            </View>
            <Text style = {styles.text}>{props.msg}</Text>
            {
                !props.isCompleted ?
                <CustomButton onPress = {props.onPress} style = {styles.button} textStyle>{props.buttonText}</CustomButton>
                : 
                <CustomButton onPress = {props.onPress} style = {{...styles.button, borderColor: '#c7c7c7', borderWidth: 1, backgroundColor: 'white' }}  textStyle = {{...styles.buttonText, color: 'black'}}>{props.onCompletedButtonText}</CustomButton>
            }
           
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        borderColor: '#c7c7c7',
        borderWidth: 1,
        borderRadius: 9,
        marginRight: 15,
        minWidth: 170
    },
    iconContainer: {
        padding: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        borderWidth: 1.3,
        marginVertical: 10
    },
    text: {
        fontWeight: '500',
        fontSize: 12
    },
    button: {
        backgroundColor: '#2BBA42',
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginTop: 25,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 12
    },
    checkIcon: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: -3,
        right: -10
    }

})

export default ProfileCompletionCard;