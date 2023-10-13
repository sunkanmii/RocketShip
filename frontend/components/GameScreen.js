import React, { useState, useEffect, useRef } from 'react';
import { useSharedState } from '../store'
import { StyleSheet, Text, View, Dimensions, Pressable, Animated, ImageBackground, Button, Alert, Image, LayoutAnimation } from 'react-native';
import Rocket from './Rocket';
import Obstacles from './Obstacles';
import RocketSelection from './RocketSelection';

// Random number generator for bottom CSS value
function generateRandomBottoms(amount, start, max) {
  let arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(Math.floor(Math.random() * (max - start + 1)) + start)
  }
  return arr;
}

// Screen width and height
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export default function GameScreen() {
  const [state, setState] = useSharedState();

  const toggleRocketSelectionScreen = () => {
    setState((prev) => ({ ...prev, rocketSelectionIsActive: !state.rocketSelectionIsActive }))
  }
  const gravity = 3;

  const rocketLeft = screenWidth / 2;
  const [rocketBottom, setRocketBottom] = useState(screenHeight / 2);

  
  
  // Random bottom animation state
  const [randomBottom] = useState(new Animated.Value(0));

  // Obstacle data
  const [obstacleData, setObstacleData] = useState(generateRandomBottoms(5, 1, screenWidth / 2));

  const obstacleComponentRefs = obstacleData.map(() => useRef(null));

  // Invincibility
  const [invincible, setInvincible] = useState(true);

  // Game Over states
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Obstacle values
  const obstacleWidth = 60;
  const midPoint = obstacleWidth / 2;
  const obstacleHeight = 60;
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstacleNegHeight, setObstaclesNegHeight] = useState(0);
  const gap = 50;
  let fallingRocketTimer;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerId2;
  
  // Animate background image
  const animateBackground = useRef(new Animated.Value(300)).current;
  
  useEffect(() => {
    Animated.timing(animateBackground, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [])
  // Rocket falling
  useEffect(() => {
    let timer = 30;
    if (rocketBottom > 0) {
      fallingRocketTimer = setInterval(() => {
        
        setRocketBottom(rocketBottom => rocketBottom - gravity)

      }, 30);

      return () => {
        clearInterval(fallingRocketTimer)
      }
    }

  }, [rocketBottom]);

  /**
   * Get many obstacles
  */

  let amount = 5;
  let obstacleAmountTimer;


  // Increase obstacle amount every 30s
  // Obstacles

  useEffect(() => {
    const obstaclesLeftTimerId = setInterval(() => {
      setObstaclesLeft((prevLeft) => prevLeft - 5);
    }, 30);

    return () => {
      clearInterval(obstaclesLeftTimerId);
    };
  }, []);

  useEffect(() => {
    if (obstaclesLeft + obstacleData[obstacleData.length - 1] <= -obstacleWidth) {
      
      // Reset obstaclesLeft and generate new obstacleData
      setObstaclesLeft(screenWidth);
      setObstacleData(generateRandomBottoms(5, 1, screenHeight));
    }
  }, [obstaclesLeft]);

  /**
   * Calculating distance travelled
   */
  const [startTime, setStartTime] = useState(null);
  const [distance, setDistance] = useState(0);
  const rocketSpeed = 10; // Adjust the speed as needed

  // Function to start the game
  const startGame = () => {
    setStartTime(Date.now());
    fallingRocketTimer();
  };

  // Function to calculate and update the distance
  const calculateDistance = () => {
    if (startTime) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
      const newDistance = (rocketSpeed * elapsedTime).toFixed(2);

      setDistance(newDistance);
    }
  };

  // Update the distance continuously
  let updateTimeInterval;
  useEffect(() => {
    updateTimeInterval = setInterval(calculateDistance, 100); // Update every 100 milliseconds
    return () => clearInterval(updateTimeInterval);
  }, [startTime]);


  // Fly function
  let flyDistance;
  const intervalRef = useRef(null);
  const fly = () => {
    if (!isGameOver && rocketBottom <= screenHeight - 30) {
      console.log(rocketBottom);
      console.log(screenHeight);
      setInvincible(false);
      setRocketBottom(rocketBottom => rocketBottom + 30);
    }
  }

  const longFly = () => {
    if (!isGameOver && rocketBottom <= screenHeight - 30) {

      intervalRef.current = setInterval(() => {
        setRocketBottom(rocketBottom => rocketBottom + 30);
      }, 30);
    }
  }
  const stopFlying = () => {
    clearInterval(intervalRef.current);
  }



  //Check for collisions
  function isColliding(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x &&
      rect1.x < rect2.x + rect2.width &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }

  const rocketRef = useRef(null);
  const [collision, setCollision] = useState(false);

  useEffect(() => {
    if (rocketRef.current) {
      rocketRef.current.measure((fx1, fy1, width1, height1, px1, py1) => {
        for (const obstacleRef of obstacleComponentRefs) {
          if (obstacleRef.current) {
            obstacleRef.current.measure(
              (fx2, fy2, width2, height2, px2, py2) => {
                const rect1 = {
                  x: px1,
                  y: py1,
                  width: width1,
                  height: height1,
                };
                const rect2 = {
                  x: px2,
                  y: py2,
                  width: width2,
                  height: height2,
                };

                // Check for collision
                const collisionDetected = isColliding(rect1, rect2);

                if (collisionDetected) {
                  setCollision(true);
                  gameOver();
                  return; // Exit the loop once a collision is detected
                }
              }
            );
          }
        }
      });
    }
  }, [rocketRef, obstacleComponentRefs]);


  const gameOver = () => {
    clearInterval(fallingRocketTimer);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(flyDistance);
    setIsGameOver(true);
  }


  return (
    <>

      <Pressable onPressIn={fly} onLongPress={longFly} onPressOut={stopFlying}>
        <Animated.ImageBackground
          style={{
            position: 'relative',
            flex: 1,
            backgroundSize: `${animateBackground.interpolate({
              inputRange: [0, 300],
              outputRange: [500, -500]
            })} ${animateBackground}`,
            justifyContent: 'center',
          }}
          source={require('../assets/Space Pixel/pngs/space-2.png')} resizeMode="cover">


          <Text
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '3',
              color: 'white',
            }}
          >Total Distance: {distance} meters</Text>
          <Pressable
            title="Change Rocket"
            style={styles.icon}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Image
              style={{
                width: '4rem',
                height: '4rem',
                paddingRight: '.1rem',
                position: 'relative',
                zIndex: 5
              }}
              source={require('../assets/Space Pixel/icons8-pause-100.png')} />
          </Pressable>


          <View style={styles.container}>
            <Rocket
              ref={rocketRef}
              rocketBottom={rocketBottom}
              rocketLeft={rocketLeft}
            />
            {obstacleData.map((item, index) => (
              <Obstacles
                key={index}
                ref={obstacleComponentRefs[index]}
                obstacleWidth={obstacleWidth}
                obstacleHeight={obstacleHeight}
                obstaclesLeft={obstaclesLeft + (index * 13)}
                gap={gap}
                color={'blue'}
                randomBottom={item}
              />
            ))}
          </View>


          <Pressable
            title="start"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#9D1F1F',
              position: 'absolute',
              zIndex: 4,
              bottom: 0,
              right: (screenWidth / 2) + 60,
              marginBottom: '2rem',
              width: '4rem',
              height: '4rem',
            }}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Text>Start</Text>
          </Pressable>

          <Pressable
            title="Change Skin"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#9D1F1F',
              position: 'absolute',
              zIndex: 4,
              bottom: 0,
              left: (screenWidth / 2) + 40,
              marginBottom: '2rem',
              width: '4rem',
              height: '4rem',
            }}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Text>Change Skin</Text>
          </Pressable>
          <Pressable
            title="Change Skin"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#9D1F1F',
              position: 'absolute',
              zIndex: 4,
              bottom: 0,
              left: (screenWidth / 2) + 40,
              marginBottom: '2rem',
              width: '4rem',
              height: '4rem',
            }}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Text>Change Skin</Text>
          </Pressable>

          <Pressable
            title="question mark"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Image
              style={{
                width: '4rem',
                height: '4rem',
                paddingRight: '.1rem',
                marginBottom: '2rem',
                zIndex: 7,
              }}
              source={require('../assets/Space Pixel/icons8-question-mark-100.png')} />
          </Pressable>
          {
            state.rocketSelectionIsActive ? <RocketSelection />
              :

              <Pressable
                title="Change Skin"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#9D1F1F',
                  position: 'absolute',
                  zIndex: 4,
                  bottom: 0,
                  left: (screenWidth / 2) + 40,
                  marginBottom: '2rem',
                  width: '4rem',
                  height: '4rem',
                }}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
                <Text>Change Skin</Text>
              </Pressable>
          }
          <Pressable
            title="Change Skin"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#9D1F1F',
              position: 'absolute',
              zIndex: 4,
              bottom: 0,
              left: (screenWidth / 2) + 40,
              marginBottom: '2rem',
              width: '4rem',
              height: '4rem',
            }}
            onPress={toggleRocketSelectionScreen}
          >
            <Text>Change Skin</Text>
          </Pressable>
        </Animated.ImageBackground>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    height: '100vh',
    position: 'relative',
    width: '100vw'
  },
  icon: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    width: '4rem',
    height: '4rem',
  }
});