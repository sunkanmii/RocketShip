import React from 'react';
import { Pressable, View } from 'react-native';
import { Card } from "@rneui/base";

function DeathScreen() {
  return (
    <View>
       
        <Text>
            Game Over!
        </Text>

        <Pressable>
            <Text>
                Play Again
            </Text>
        </Pressable>

        <Pressable>
            <Text>
                Get HighScores
            </Text>
        </Pressable>

        <Pressable>
            <Text>
                Main Menu
            </Text>
        </Pressable>
    </View>
  )
}

export default DeathScreen