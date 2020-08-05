import React, { useState, useEffect, useCallback } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import Card from '../../components/Card';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { saveUserAddress } from '../../Redux/user/user.actions';
import { ActivityIndicator } from 'react-native';

const GetLocationMapScreen = props =>{
    const [userLocation, setUserLocation] = useState({
        lat: null,
        lng: null
    });
    const [selectedLocation, setSelectedLocation] = useState();
    const [address, setAddress] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [loadingAddress, setLoadingAddress] = useState(false);

    
    const verifyLocationPermission = useCallback(async () =>{
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status != 'granted'){
            Alert.alert(
                'Insufficient permission',
                'Grant location permission to use this feature',
                [
                    {
                        text: 'Okay'
                    }
                ]
            )
            return false;
        }
        return true;
    }, [])

    const getUserLocation = useCallback(async () =>{
        const hasPermission = await verifyLocationPermission();
        if(!hasPermission){
            return;
        }

        const location = await Location.getCurrentPositionAsync();
        setUserLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }, [])


    useEffect(()=>{
        getUserLocation()
    }, [getUserLocation])

    const mapRegion = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const onLocationSelect = (event) =>{
        setIsSaving(false)
        setSelectedLocation({
            longitude: event.nativeEvent.coordinate.longitude,
            latitude: event.nativeEvent.coordinate.latitude
        })
    }

    const dispatch = useDispatch();
    const onSaveClick = useCallback(async () =>{
        if(!address){
            return;
        }
        setIsSaving(true)
        await dispatch(saveUserAddress(address));
        setIsSaving(false)
        props.navigation.goBack();
    }, [address, dispatch, saveUserAddress])

    useEffect(()=>{
        props.navigation.setParams({
            onSaveClick,
            isSaving
        })
    }, [onSaveClick, isSaving])

    const getSelectedLocationAddress = useCallback(async () =>{
        setLoadingAddress(true)
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedLocation.longitude},${selectedLocation.latitude}.json?access_token=pk.eyJ1IjoiZGFuaWVsb3Nob3MiLCJhIjoiY2tibXd0MmZhMDFnODJ3cG5scTFiZmE2byJ9.700eqknNYDEvWmvfWQsIWQ`);
        const data = await response.json();
        const locationAddress = (data.features[0].place_name);
        setLoadingAddress(false)
        setAddress(locationAddress)
    }, [selectedLocation])

    useEffect(() => {
        if(!selectedLocation)return;
        getSelectedLocationAddress();
    }, [getSelectedLocationAddress])

    return(
        <View style = {{flex: 1, justifyContent: 'center'}}>
            {
                userLocation.lat ?
               <>
                <MapView 
                    showsMyLocationButton = {true} 
                    // provider = {PROVIDER_GOOGLE} 
                    style = {{flex: 1}} 
                    showsUserLocation = {true} 
                    onPress = {onLocationSelect} 
                    initialRegion = {mapRegion}
                >
                    {
                        selectedLocation? 
                        <Marker draggable title = "Selected Location" coordinate = {selectedLocation}/>
                        : null
                    }
                </MapView>
                <View style = {{position: 'absolute', top: 20, width: '100%'}}>
                    <Card style = {styles.addressCard}>
                        <View style = {styles.addressContainer}>
                            {
                                loadingAddress ?
                                    <View style = {{flexDirection: 'row'}}>
                                        <ActivityIndicator size = 'small' color = 'grey'/>
                                        <Text style = {{opacity: 0.5, fontWeight: '500', marginLeft: 10}}>Loading Address</Text>
                                    </View>            
                                :
                                (address ? 
                                    <Text><Text style = {{fontWeight: '700'}}>Address:  </Text>{address}</Text>
                                :
                                    <Text style = {{opacity: 0.5, fontWeight: '500'}}>No Address Selected</Text>
                                )
                            }
                        </View>
                    </Card> 
                </View>
                </>
                : 

                <ActivityIndicator size = "large"/>
            }
            
        </View>
    )
}

GetLocationMapScreen.navigationOptions = (navData) =>{
    const onSaveClick = navData.navigation.getParam('onSaveClick');
    const isSaving = navData.navigation.getParam("isSaving");
    return({
        headerRight: () =>(
            isSaving?
            <ActivityIndicator size = 'small' style = {{marginRight: 10}}/>
            :
            <TouchableOpacity activeOpacity = {0.7} onPress = {onSaveClick}>
                <Text style = {styles.headerSaveText}>Save</Text>
            </TouchableOpacity>
        )
    })
}

const styles = StyleSheet.create({
    headerSaveText: {
        fontSize: 16,
        marginRight: 15
    },
    addressCard:{
        position: 'absolute',
        bottom: 0
    },
    addressContainer:{
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        padding: 15,
        paddingVertical: 30,
        alignItems: 'center',
    }
})

export default GetLocationMapScreen;