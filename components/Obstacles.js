import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

const Obstacles = React.forwardRef(({ index, color, randomBottom, obstacleWidth, obstacleHeight, gap, obstaclesLeft }, ref) => {
    return (
        <View
            ref={ref}
            style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                width: 64,
                height: 'fit-content',
                left: obstaclesLeft,
                top: (randomBottom),
                transition: 'all .1 ease',
                borderRadius: '5rem',
            }}>
            <Image
                style={styles.tinyLogo}
                source={
                  require('../assets/Space Pixel/Asteroid-Large.png')
                }
              />
            </View>
    )
})

const styles = StyleSheet.create({
    tinyLogo: {
      width: 64,
      height: '3rem',
      resizeMode: 'cover'
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

export default Obstacles;