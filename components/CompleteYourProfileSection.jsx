import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ProfileCompletionCard from './ProfileCompletionCard';

const CompleteYourProfileSection = (props) => {
    const {address, imageUri} = props;
    const isAddressCompleted = Boolean(address) ? 1 : 0;
    const isImageCompleted = Boolean(imageUri) ? 1 : 0;

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
                        onPress = {()=>{}}
                    />
                    <ProfileCompletionCard
                        iconName = "ios-camera"
                        msg = "Add a profile image"
                        buttonText = "Add image"
                        isCompleted = {isImageCompleted}
                        onCompletedButtonText = 'Change image'
                        onPress = {()=>{}}
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