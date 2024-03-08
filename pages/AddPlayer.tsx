//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React, {useState, useEffect, ComponentType} from 'react';
import {
  SafeAreaView,
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import Body from '../components/body';
import {NewText} from '../components/html';
import {GlobalData, Player} from '../components/body';
import {colors} from '../components/colors';

/////////////////////////////
//////// Globa Data /////////
/////////////////////////////

var players: Player[] = [
  {name: 'Alice', word: 'butter', type: 'civilian'},
  {name: 'Bob', word: 'butter', type: 'civilian'},
  {name: 'Charlie', word: 'blue', type: 'undercover'},
];

//////////////////////////////
////// Inner Component ///////
//////////////////////////////

const AddPlayer: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [text, setText] = useState('');

  const appendPlayer = () => {
    if (text.trim() !== '') {
      players.push({name: text, word: 'butter', type: 'civilian'});
    }
    // console.log(players);
    setText('');
  };

  const styles = StyleSheet.create({
    textStyle: {
      padding: 10,
      fontSize: 20,
      color: colors.textWhite,
    },
  });

  return (
    <>
      <View>
        <TextInput
          style={{height: 40, padding: 10, fontSize: 20, margin: 20}}
          placeholder="Enter username..."
          onChangeText={newText => setText(newText)}
          defaultValue={text}
          onSubmitEditing={() => appendPlayer()}
        />
        <Button title="Add" onPress={() => appendPlayer()} />
      </View>
      {keyboardStatus === 'Hidden' ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {players.map((player, index) => {
            return (
              <NewText key={index} style={styles.textStyle}>
                {player.name}
              </NewText>
            );
          })}
        </View>
      ) : null}
    </>
  );
};

//////////////////////////////
////// Export Component //////
//////////////////////////////

export default ({navigation}: {navigation: any}) => {
  console.log('AddPlayer : ', players);
  return Body({
    MyComponent: AddPlayer,
    navigation: navigation,
    globalData: {players: players},
    onChangeFunction: (event: any) =>
      event.navigation.navigate('GameSelection', {players: players}),
  });
};
