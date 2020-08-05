import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Polyline from '@mapbox/polyline';
import DeliveryContactCard from '../../components/DeliveryContactCard';
import { OrderTabIcon } from '../../components/TabBarIcons';

const TrackOrderScreen = props =>{
    const [mapRegion, setMapRegion] = useState({latitude: null, longitude: null});
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    let mealLocation = {
        latitude: mapRegion.latitude + 0.01,
        longitude: mapRegion.longitude  + 0.02
    }

    const initailRegion = {
        latitude:  mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0421
    }
    




    const getUserLocation = useCallback(async () =>{
        try {
            const {coords} = await Location.getCurrentPositionAsync();
            setMapRegion({latitude: coords.latitude, longitude: coords.longitude});
        } catch (error) {
        }
    }, [setMapRegion])

    
    const getRouteCoords = useCallback(async () =>{
        const mealCoordinates = `${mealLocation.longitude},${mealLocation.latitude}`;
        const buyerCoordinates = `${mapRegion.longitude},${mapRegion.latitude}`
        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${mealCoordinates};${buyerCoordinates}?access_token=pk.eyJ1IjoiZGFuaWVsb3Nob3MiLCJhIjoiY2tibXd0MmZhMDFnODJ3cG5scTFiZmE2byJ9.700eqknNYDEvWmvfWQsIWQ`)
            const data = await response.json();
            const points = Polyline.decode(data.routes[0].geometry)
            const routeCoords = points.map(point => ({
                latitude: point[0],
                longitude: point[1]
            }))
            setRouteCoordinates(routeCoords); 
        } catch (error) {

        }

    }, [mealLocation, mapRegion])

    useEffect(()=>{
        if(!mapRegion.latitude)return;
        getRouteCoords();
    }, [mapRegion])

    useEffect(()=>{
        const getUserLocAndRoute = async () =>{
            await getUserLocation();
        }
        getUserLocAndRoute()
    }, [getUserLocation, ])    





    return(
            <View style = {{flex: 1, justifyContent: 'center'}}>
                {
                mapRegion.latitude ?
                <>
                    <MapView 
                        // provider = {PROVIDER_GOOGLE} 
                        showsUserLocation = {true} 
                        showsMyLocationButton = {true} 
                        style = {styles.mapView} 
                        initialRegion = {initailRegion}
                    >
                        <MapView.Polyline
                            strokeColor = 'red'
                            strokeWidth = {3}
                            coordinates = {routeCoordinates}
                        />
                        
                        <Marker
                            coordinate = {{latitude: mealLocation.latitude, longitude: mealLocation.longitude}}
                        >
                            <OrderTabIcon iconColor = 'brown'/>
                        </Marker>
                    </MapView>
                    <View style = {styles.contentContainer}>
                        <DeliveryContactCard style = {styles.contactCard}/> 
                    </View>  
                </>
                :
                <ActivityIndicator size = 'large'/>                        
                }
                          
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
        width: '100%',
        paddingVertical: 10
    },
    contactCard: {
    }
})

export default TrackOrderScreen;