import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ProfileCompletionCard from './ProfileCompletionCard';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { onImageUploadHandler } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserImage } from '../Redux/user/user.actions';
import { Alert } from 'react-native';

const CompleteYourProfileSection = (props) => {
    const {address, imageUri} = props;
    const isAddressCompleted = Boolean(address) ? 1 : 0;
    const isImageCompleted = Boolean(imageUri) ? 1 : 0;
    const userId = useSelector(state => state.user.id);

    const dispatch = useDispatch();

    const onClickLocation = () =>{
        props.navigation.navigate("Location");
    }

    const verifyCameraPermission = async () =>{
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(!result.granted){
            Alert.alert(
                'Insufficient permission',
                'Grant camera permission to use this feature',
                [
                    {
                        text: 'Okay'
                    }
                ]
            )
            return false;
        }
        return true;
    }

    const openCameraHandler = async () =>{
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 2],
            quality: 0.0000000001
        })
        await uploadSelectedImageToFirebase(image)
    }

    const openLibraryHandler = async () =>{
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 2],
            quality: 0.0000000001
        })
        await uploadSelectedImageToFirebase(image)
    }

    const uploadSelectedImageToFirebase = async (image) =>{
        if(image.cancelled)return;
        props.setIsImageUploading(true);
        const imageUrl = await onImageUploadHandler(image.uri, userId);
        props.setIsImageUploading(false);
        dispatch(saveUserImage(imageUrl))
    }

    const takeImageHandler = async () =>{
        const hasPermission = await verifyCameraPermission();
        
        if(!hasPermission){
            return
        }

        await Alert.alert(
            "Choose method", 
            "Pick an option to get image",
            [
                {
                    text: 'Take picture',
                    onPress: openCameraHandler
                },
                {
                    text: 'Select from your library',
                    onPress: openLibraryHandler
                },
                {
                    text: 'Cancel'
                }
            ]
        )




    }

    return(
        <View style = {{...styles.completeProfileSection, width: Dimensions.get('window').width}}>
            <View style = {{marginLeft: 15}}>
                <Text style = {{fontWeight: '500', fontSize: 14, marginBottom: 5}}>Complete your profile</Text>
                <Text style = {{fontSize: 12, opacity: 0.7}}>{isAddressCompleted + isImageCompleted} OF 3 COMPLETE</Text>
            </View>
            <View style = {{width: '100%'}}>
                <ScrollView contentContainerStyle = {{marginVertical: 20, paddingLeft: 15}} horizontal = {true}>
                    <ProfileCompletionCard
                        iconName = "ios-pin"
                        msg = "Add a default location"
                        buttonText = "Pick on map"
                        isCompleted = {isAddressCompleted}
                        onCompletedButtonText = 'Change location'
                        onPress = {onClickLocation}
                    />
                    <ProfileCompletionCard
                        iconName = "ios-camera"
                        msg = "Add a profile image"
                        buttonText = "Add image"
                        isCompleted = {isImageCompleted}
                        onCompletedButtonText = 'Change image'
                        onPress = {takeImageHandler}
                    />
                    <ProfileCompletionCard
                        iconName = "ios-card"
                        msg = "Add your card"
                        buttonText = "Add card"
                        isCompleted = {false}
                        onCompletedButtonText = 'Add new card'
                        onPress = {()=>{}}                                
                    />
                </ScrollView>                            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    completeProfileSection: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#f9f9f9',
        borderColor: '#c7c7c7',
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2
    }
})


export default CompleteYourProfileSection;