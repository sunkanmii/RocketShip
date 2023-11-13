import React, { forwardRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const Obstacles = forwardRef(({ index, color, randomBottom, obstacleWidth, obstacleHeight, gap, obstaclesLeft }, ref) => {
  return (
    <Animated.View
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
        transform: [
          {
            translateX: obstaclesLeft
          }
        ],
        
        top: (randomBottom),
        transition: 'all .1 ease',
        borderRadius: '5rem',
        zIndex: 14,
      }}>
      <Image
        style={styles.svg}
        source={
          require('../assets/Space Pixel/BluePlanet.png')
        }
      />
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  svgContainer: {
    display: 'flex',
    width: 64,
    height: '3rem',
    position: 'relative'
  },
  svg: {
    width: 68,
    height: 68,
    position: 'absolute',
  },
});

export default Obstacles;