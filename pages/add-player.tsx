//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React, {useState, useEffect, ComponentType} from 'react';
import {Keyboard, TextInput, StyleSheet, View} from 'react-native';
import Body, {
  Navigation,
  Route,
  GlobalData,
  Player,
  initPlayer,
  ChangeType,
} from '../components/body';
import {NewText, NewButton} from '../components/html';
import {colors, logger} from '../settings/static';

export default (struct: {route: Route; navigation: Navigation}) => {
  /////////////////////////////
  //////// Static Data ////////
  /////////////////////////////

  var players: Player[] = [];

  // if (process.env.DEV_MODE) {
  // players = [
  //   {name: 'A', word: undefined, type: undefined, score: 0, kicked: false},
  //   {name: 'B', word: undefined, type: undefined, score: 5, kicked: false},
  //   {name: 'C', word: undefined, type: undefined, score: 0, kicked: false},
  //   {name: 'D', word: undefined, type: undefined, score: 0, kicked: false},
  // ];
  // }E

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

    const [player, setText] = useState('');

    const appendPlayer = () => {
      if (player.trim() !== '') {
        players.push(initPlayer(player, undefined, undefined));
      }
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
            defaultValue={player}
            onSubmitEditing={() => appendPlayer()}
          />
          <NewButton title="Add" onPress={() => appendPlayer()} />
        </View>
        {keyboardStatus === 'Hidden' ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {players.map((player, index) => (
              <NewText key={index} style={styles.textStyle}>
                {player.name}
              </NewText>
            ))}
          </View>
        ) : null}
      </>
    );
  };

  //////////////////////////////
  ////// Export Component //////
  //////////////////////////////

  logger(struct.route.name, 'export', 'players', players);
  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: players}}
      onChangeFunction={(event: ChangeType) => {
        if (players.length > 1) {
          event.navigation.navigate('GameSelection', {players: players});
        }
      }}>
      <AddPlayer globalData={{players: players}} />
    </Body>
  );
};
