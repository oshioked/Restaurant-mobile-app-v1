import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props=>{
    return(
        <View style = {{...styles.card, ...props.styles}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 6,
        shadowColor: 'grey',
        shadowOffset: {width: 2, height: 5,},
        shadowRadius: 10,
        shadowOpacity: 0.4,
    }

})

export default Card;