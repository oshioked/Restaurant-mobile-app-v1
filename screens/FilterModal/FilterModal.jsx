import React from 'react';
import { View, StyleSheet, Text, ScrollView, Modal } from 'react-native';

const FilterModal = props =>{
    return(
        <Modal style = {{opacity: 0.3}} visible = {props.visible}>
            <ScrollView>
                <Text>FilterModal</Text>
            </ScrollView>            
        </Modal>

    )
}

const styles = StyleSheet.create({
    

})

export default FilterModal;