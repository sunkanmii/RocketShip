import React, { forwardRef, useState, memo } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { useSharedState } from '../store';
import { screenWidth } from '../App';


const rocketHeight = 64
const rocketWidth = 64
const RocketSelection = memo(forwardRef(({ rocketBottom, rocketLeft }, ref) => {
    const allRockets = ['ship004.png', 'space-ship.gif', 'ship005.png', 'ship006.png', 'ship007.png'];

    const [currSkin, setCurrSkin] = useState(allRockets[0]);
    const [currInd, setCurrInd] = useState(0);
    // set states from react-tracked
    const [state, setState] = useSharedState();
    const changeSkinGlobally = () => {
        setState((prev) => ({...prev, rocketSkin: currSkin}))
    }

    const toggleRocketSelectionScreen = () => {
        setState((prev) => ({...prev, rocketSelectionIsActive: !state.rocketSelectionIsActive}))
    }

    const nextSkin = () => {
        if (currInd == allRockets.length - 1) {
            setCurrInd(0);
        }
        else {
            setCurrInd(currInd => currInd + 1);
        }

        setCurrSkin(allRockets[currInd]);    
    }

    const prevSkin = () => {
        if (currInd == 0) {
            setCurrInd(allRockets.length - 1);
        }
        else {
            setCurrInd(currInd => currInd - 1);
        }
        setCurrSkin(allRockets[currInd]);
    }

    return (
        <View
            ref={ref}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr 1fr',
                gridTemplateRows: '2rem 2fr 1fr',
                justifyContent: 'center',
                justifyItems: 'center',
                alignContent: 'center',
                alignItems: 'center',
                height: '60vh',
                width: '70vw',
                backgroundColor: 'white',
                color: 'black',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transition: 'all .2 ease',
                transform: ' translateY(-50%) translateX(-50%)'
            }}>
            <Text
                style={{
                    gridArea: '1 / 2 / 2 / 3',

                }}
            >Rocket Selection</Text>
            
            <Pressable 
                style={{
                    gridArea: '1 / 3 / 2 / 4',
                    width: '2rem',
                    height: '2rem'
                }}
            onPress={toggleRocketSelectionScreen}>
                <Text>
                X
                </Text>
            </Pressable>

            <Pressable
                onPress={prevSkin}
                style={{
                    gridArea: '1 / 1 / 3 / 2'
                }}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/Space Pixel/icons8-double-left-100.png')} />
            </Pressable>
            {/* Diplay Rockets*/}
            <Image
                style={styles.tinyLogo}
                source={require(`../assets/Space Pixel/${currSkin}`)} />
            <Pressable
                onPress={nextSkin}
                style={{
                    gridArea: '2 / 3 / 3 / 4'
                }}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/Space Pixel/icons8-double-right-100.png')} />
            </Pressable>
            <Pressable
                onPress={changeSkinGlobally}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gridArea: '3 / 1 / 4 / 4',
                    border:'2px solid #9D1F1F',
                    width: '4rem',
                    height: '4rem'
                }}
            >
                <Text>Select</Text>
            </Pressable>
        </View>
    )
}))

const styles = StyleSheet.create({
    tinyLogo: {
        width: 64,
        height: '2rem',
        resizeMode: 'cover'
    },
    logo: {
        width: 23,
        height: 23,
    },
});

export default RocketSelection