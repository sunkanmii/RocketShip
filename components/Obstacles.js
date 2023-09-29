import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Obstacles = React.forwardRef(({color, randomBottom, obstacleWidth, obstacleHeight, gap, obstaclesLeft}, ref) => {
    return (
        <>
            <View 
            ref={ref}
            style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                top: (randomBottom/16).toFixed(2) + "rem",
                transition: 'all .1 ease',
                borderRadius: '5rem',
            }}
            />

        </>
    )
})

export default Obstacles;