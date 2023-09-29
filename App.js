import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import Rocket from './components/Rocket';
import Obstacles from './components/Obstacles';

// Random number generator for bottom CSS value
 function generateRandomBottoms(amount, max){
   let arr = [];
   for (let i = 0; i < amount; i++){
     arr.push(Math.floor(Math.random() * (max - 1 + 1)) + 1)
   }
   return arr;
 }


export default function App() {
  const gravity = 3;
  
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const rocketLeft = screenWidth / 2;
  const [rocketBottom, setRocketBottom] = useState(screenHeight / 2)

  // Obstacle data
  const [obstacleData, setObstacleData] = useState(generateRandomBottoms(5, screenHeight));
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


  // Rocket falling
  useEffect(() => {
    if (rocketBottom > 0) {
      fallingRocketTimer = setInterval(() => {
        setRocketBottom(rocketBottom => rocketBottom - gravity)

      }, 200)

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
    if (obstaclesLeft <= -obstacleWidth) {
      // Reset obstaclesLeft and generate new obstacleData
      setObstaclesLeft(screenWidth);
      setObstacleData(generateRandomBottoms(5, screenHeight));
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
    if (!isGameOver) {
      setInvincible(false);
      setRocketBottom(rocketBottom => rocketBottom + 30);
    }
  }

  const longFly = () => {
    if (!isGameOver) {
      intervalRef.current = setInterval(() => {
        setRocketBottom(rocketBottom => rocketBottom + 30)
      }, 100);
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
  const asteroidRef = useRef(null);
  const [collision, setCollision] = useState(false);

  const [rocketRect, setRocketRect] = useState(null);
  const [asteroidRect, setAsteroidRect] = useState(null);

  useEffect(() => {
    if (rocketRef.current && asteroidRef.current) {
      rocketRef.current.measure((fx1, fy1, width1, height1, px1, py1) => {
        asteroidRef.current.measure((fx2, fy2, width2, height2, px2, py2) => {
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
          setCollision(collisionDetected);
        });
      });
    }

    // Stop the game once you hit something
    if (collision) {
      gameOver();
    }
  });



  const gameOver = () => {
    clearInterval(fallingRocketTimer);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerId2);
    clearInterval(flyDistance);
    setIsGameOver(true);
  }

  return (
    <>
      <Text
        style={{
          position: 'absolute',
          top:'0',
          left: '0',
          zIndex: '3'
        }}
        >Total Distance: {distance} meters</Text>
    <Pressable onTouchStart={startGame} onPressIn={fly} onLongPress={longFly} onPressOut={stopFlying}>
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
          obstaclesLeft={obstaclesLeft}
          gap={gap}
          color={'blue'}
          randomBottom={item}
          />
        ))}
      </View>
    </Pressable>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: '1',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    height: '100vh',
    position: 'relative',
    width: '100vw'
  }
  // transition:{
  // }
});
