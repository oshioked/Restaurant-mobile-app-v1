import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import MapView, {Overlay} from 'react-native-maps'
import DeliveryContactCard from '../../components/DeliveryContactCard';

const TrackOrderScreen = props =>{
    const initailRegion = {
        latitude:  5.51737,
        longitude: 5.75006,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    return(
        <View style = {{flex: 1}}>
            <MapView style = {styles.mapView} initialRegion = {initailRegion}/>
                <View style = {styles.contentContainer}>
                    <DeliveryContactCard style = {styles.contactCard}/> 
                </View>
        </View>
        
    )
}

TrackOrderScreen.navigationOptions = navData =>{
    return({
        headerTitle: 'Track your order'
    })
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    contentContainer: {
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        width: '100%',
        paddingBottom: 20,
        flex: 1
    },
    contactCard: {
    }
})

export default TrackOrderScreen;