import React, {useState} from 'react';
import {TextInput, StyleSheet, ScrollView, View} from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';

var players: string[] = [];

const AddPlayer = () => {
  const [text, setText] = useState('');

  const appendPlayer = () => {
    players.push(text);
    console.log(players);
    setText('');
  };

  const changePage = () => {

    console.log('change page');
  };

  const styles = StyleSheet.create({
    textStyle: {
      padding: 10,
      fontSize: 20,
      color: 'white',
    },
  });

  return (
    <View style={{padding: 10, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{height: 40, padding: 10, fontSize: 20, margin: 20}}
        placeholder="Enter username..."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      {/* <Text style={{padding: 10, fontSize: 42}}>{text}</Text> */}
      <Button title="Add" onPress={() => appendPlayer()}/>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10
        }}>
        {players.map((player, index) => {
          return (
            <Text key={index} style={styles.textStyle}>
              {player}
            </Text>
          )
        })}
      </View>
    </View>
  );
};




export default AddPlayer;
