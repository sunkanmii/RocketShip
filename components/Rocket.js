import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


const rocketHeight = 64
const rocketWidth = 64
const Rocket = React.forwardRef(({rocketBottom, rocketLeft}, ref) => {

    return (
        <View 
        ref={ref}
        style={{
            display: 'flex',
            height: 'fit-content',
            width: rocketWidth,
            position: 'absolute',
            bottom: rocketBottom,
            left: rocketLeft - (rocketHeight/2),
            transition: 'all .2 ease',
        }}>
            <Image
        style={styles.tinyLogo}
        source={
            require('../assets/Space Pixel/space-ship.gif')
          }
      />
        </View>
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
  });

export default Rocket