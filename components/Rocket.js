import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Rocket = () => {
    return (
        <View style={styles.rocketStyle}>

        </View>
    )
}

const styles = StyleSheet.create({
    rocketStyle:{
        position: 'relative',
        display: 'inline-block',
        backgroundColor: 'red',
        height: '4rem',
        width: '4rem'
    },

})

export default Rocket