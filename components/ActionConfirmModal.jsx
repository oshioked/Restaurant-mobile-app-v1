import React from 'react'
import { Text, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';
import colors from '../constants/colors';

const ActionConfirmModal = ({isVisible, loading, iconName, text, text2, onBackdropPress}) =>{
    const Children = (
        <>
            <Ionicons name = {iconName} size = {106} color = {colors.primaryShade2}/>
            <Text style = {{fontSize: 18, opacity: 0.6, fontWeight: '500'}}>{text}</Text> 
            {
                text2 ?
                <Text style = {{fontSize: 12, marginTop: 7, textAlign: 'center', opacity: 0.4,}}>{text2}</Text> 
                : null
            }  
        </>     
    ) 

    const LoadingChildren = (
        <>
            <ActivityIndicator color = 'grey' size = "large"/>
        </>
    )
    return(
    <Overlay onBackdropPress = {onBackdropPress} backdropStyle = {{backgroundColor: "rgba(0, 0, 0, 0.05)"}} isVisible = {isVisible ? isVisible : false} overlayStyle = {{alignItems: 'center', paddingHorizontal: 15, justifyContent: 'center',  borderRadius: 15, minHeight: 200,  width: 200, paddingVertical: 30}} children = {loading? LoadingChildren : Children} >
 
    </Overlay>        
    )

}

export default ActionConfirmModal;