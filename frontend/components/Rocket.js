import React, {  forwardRef, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';
import { useSharedState } from '../store';

const rocketHeight = 64
const rocketWidth = 64

const Rocket = forwardRef(({ fallDownValue, rocketBottom, rocketRotateUp }, ref) => {
  const [state, setState] = useSharedState();

  return (
    <Animated.View
      ref={ref}
      style={[styles.rocketStyle,
        {
          bottom: fallDownValue,
          
        }
      ]}>
      <Image
        style={styles.tinyLogo}
        source={
          require(`../assets/Space Pixel/${state.rocketSkin}`)
        }
      />
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  tinyLogo: {
    width: rocketHeight,
    height: '2rem',
    resizeMode: 'cover'
  },
  logo: {
    width: 66,
    height: 58,
  },
  rocketStyle: {
    display: 'flex',
    height: 'fit-content',
    width: rocketWidth,
    position: 'absolute',
    left: '1rem',
    transition: 'all .2 ease'
  }
});

export default Rocket