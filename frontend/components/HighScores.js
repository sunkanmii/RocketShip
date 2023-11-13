import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Card, Icon, SearchBar} from "@rneui/base";

// Import or require your locally stored search icon
const customSearchIcon = require('../assets/search/icons8-search-50.png');

function HighScores() {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (

    <View style={{ position: 'absolute', zIndex: 10, top: 0, left: 0, right: 0 }}>
      <Card containerStyle={{}} wrapperStyle={{}}>
        <Card.Title>HIGHSCORES</Card.Title>
        <Card.Divider />
        <SearchBar
          platform="default"
          containerStyle={{}}
          inputContainerStyle={{}}
          inputStyle={{}}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          searchIcon={<Icon
            name="react"
            size={15}
            color="#0FF"
          />}
          loadingProps={{}}
          onChangeText={newVal => setSearch(newVal)}
          onClearText={() => console.log(onClearText())}
          placeholder="Search name..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={search}
        />
        <View
          style={{
            position: "relative",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: "100%", height: 100 }}
            resizeMode="contain"
            source={{
              uri:
                "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4"
            }}
          />
          
          <Pressable>
            <Text>Country</Text>
          </Pressable>

          <Pressable>
            <Text>Regional</Text>
          </Pressable>

          <Pressable>
            <Text>Global</Text>
          </Pressable>
        </View>
      </Card>


    </View>
  )
}

export default HighScores