
  //////////////////////////////
 ////////// Imports ///////////
//////////////////////////////

import React, {useState} from 'react';
import {SafeAreaView, TextInput, StyleSheet, View} from 'react-native';
import { Button, Text } from '@rneui/themed';
import Body from '../components/body';

  /////////////////////////////
 //////// Globa Data /////////
/////////////////////////////

var players: string[] = [];

  //////////////////////////////
 ////// Inner Component ///////
//////////////////////////////

const InnerAddPlayer = () => {

  const [text, setText] = useState('');

  const appendPlayer = () => {
    players.push(text);
    console.log(players);
    setText('');
  };

  const styles = StyleSheet.create({
    textStyle: {
      padding: 10,
      fontSize: 20,
      color: 'white',
    },
  });

  return (
    <SafeAreaView style={{padding: 10, margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <TextInput
        style={{height: 40, padding: 10, fontSize: 20, margin: 20}}
        placeholder="Enter username..."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        onSubmitEditing={() => appendPlayer()}
      />
      <Button title="Add" onPress={() => appendPlayer()}/>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {players.map((player, index) => {
          return (
            <Text key={index} style={styles.textStyle}>
              {player}
            </Text>
          )
        })}
      </View>
    </SafeAreaView>
  );
};

  //////////////////////////////
 ////// Export Component //////
//////////////////////////////

const AddPlayer = ({navigation}) => {
  console.log("AddPlayer : ", players);
  return Body({
    MyComponent: InnerAddPlayer,
    navigation: navigation,
    globalData: {},
    onChangeFunction: event =>
      event.navigation.navigate('GameSelection', {players: players}),
  });
};

export default AddPlayer;
