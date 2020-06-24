import React from 'react';
import { View, StyleSheet } from 'react-native';

const ImageDarkener = props =>
    <View style = {styles.imageDarkener}/>


const styles = StyleSheet.create({
    imageDarkener: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.3
    }
})

export default ImageDarkener;