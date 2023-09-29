import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Rocket = React.forwardRef(({rocketBottom, rocketLeft}, ref) => {
    const rocketHeight = 64
    const rocketWidth = 64

    return (
        <View 
        ref={ref}
        style={{
            display: 'inline-block',
            backgroundColor: 'red',
            height: rocketHeight,
            width: rocketWidth,
            position: 'absolute',
            bottom: rocketBottom,
            left: rocketLeft - (rocketHeight/2),
            transition: 'all .2 ease',
        }}>

        </View>
    )
})


export default Rocket