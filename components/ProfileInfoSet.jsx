import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';



const ProfileInfoSet = props =>{
    return(
        <View style = {styles.infoSet}>
            <Text style = {styles.infoProp}>{props.label}</Text>
            <Text numberOfLines = {1} style = {styles.infoValue}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default ProfileInfoSet;