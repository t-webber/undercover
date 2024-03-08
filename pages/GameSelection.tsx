//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React, {useState, ComponentType} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {NewText, Error} from '../components/html';
import {Slider} from '@react-native-assets/slider';
import Body, {Player} from '../components/body';
import {GlobalData} from '../components/body';

export default (struct: {route: {params: GlobalData}; navigation: object}) => {
  //////////////////////////////
  //////// Previous info ///////
  //////////////////////////////

  var players = struct.route.params.players;
  console.log('[GameSelection]\t OldPlayers = ', players);

  const nbPlayers = players.length;

  const defaultMrWhiteCOunt = Math.floor((1 / 5) * nbPlayers);
  const defaultUndercoverCOunt = Math.floor((1 / 5) * nbPlayers);

  const [mrWhiteCount, setMrWhiteCount] = useState(defaultMrWhiteCOunt);
  const [undercoversCount, setUndercoversCount] = useState(
    defaultUndercoverCOunt,
  );
  const maxWrongWord = Math.floor(nbPlayers / 2);

  /////////////////////////////
  /////////// Styles //////////
  /////////////////////////////

  const backgroundStyle: ViewStyle = {
    height: Dimensions.get('window').height,
    overflow: 'hidden',
  };

  const paramViewStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    padding: 10,
  };

  const paramTextStyle: TextStyle = {
    width: '30%',
    textAlign: 'center',
  };

  const paramValueStyle: ViewStyle = {
    width: '10%',
  };

  ///////////////////////////////
  ///////// Static data /////////
  ///////////////////////////////

  const generateWords = () => {
    return ['good word', 'bad word'];
  };

  const [goodWord, badWord] = generateWords();

  function shuffle(array: Player[]) {
    var currentIndex = array.length;

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const randomElse = (taken: number[], max: number) => {
    var index = Math.floor(Math.random() * (max - 1));
    while (taken.includes(index)) {
      index = Math.floor(Math.random() * (max - 1));
    }
    return index;
  };

  ///////////////////////////////
  /////// Inner component ///////
  ///////////////////////////////

  const GameSelection: ComponentType<{globalData: GlobalData}> = ({
    globalData,
  }) => {
    return (
      <SafeAreaView
        style={{
          ...backgroundStyle,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <View style={{...paramViewStyle}}>
            <NewText style={{...paramTextStyle}}>Mr. White count</NewText>
            <Slider
              value={mrWhiteCount}
              onValueChange={val => {
                setMrWhiteCount(val);
              }}
              minimumValue={0}
              maximumValue={maxWrongWord}
              step={1}
              style={{flex: 1, paddingHorizontal: 10}}
            />
            <NewText style={{...paramValueStyle}}>{mrWhiteCount}</NewText>
          </View>
          <View style={{...paramViewStyle}}>
            <NewText style={{...paramTextStyle}}>Undercovers count</NewText>
            <Slider
              value={undercoversCount}
              onValueChange={val => {
                setUndercoversCount(val);
              }}
              minimumValue={0}
              maximumValue={maxWrongWord}
              step={1}
              style={{flex: 1, paddingHorizontal: 10}}
            />
            <NewText style={{...paramValueStyle}}>{undercoversCount}</NewText>
          </View>
        </View>
        {mrWhiteCount + undercoversCount <= maxWrongWord ? null : (
          <View style={{display: 'flex'}}>
            <Error>
              There are more Mr Whites and undercovers than civilians !
            </Error>
            <Error>Expected at least {maxWrongWord + 1} civilians.</Error>
          </View>
        )}
      </SafeAreaView>
    );
  };

  ///////////////////////////////
  ////// Attribute words ////////
  ///////////////////////////////

  const attributeWords = () => {
    console.log('[GameSelection]\t attributeWords');

    var undercoversIndexes: number[] = [];
    var mrWhiteIndexes: number[] = [];

    for (let index = 0; index < mrWhiteCount; index++) {
      mrWhiteIndexes.push(randomElse(mrWhiteIndexes, players.length - 1));
    }

    for (let index = 0; index < undercoversCount; index++) {
      undercoversIndexes.push(
        randomElse(
          undercoversIndexes.concat(mrWhiteIndexes),
          players.length - 1,
        ),
      );
    }

    console.log(
      '[GameSelection]\t attributewords (MrWhiteIndexes) = ',
      mrWhiteIndexes,
    );
    console.log(
      '[GameSelection]\t attributewords (UndercoversIndexes) = ',
      undercoversIndexes,
    );

    players.forEach((player, index) => {
      console.log(
        "[GameSelection]\t attributewords (player's index) = ",
        index,
      );

      if (mrWhiteIndexes.includes(index)) {
        player.type = 'white';
        player.word = 'You are a Mr. White!';
      } else if (undercoversIndexes.includes(index)) {
        player.type = 'undercover';
        player.word = badWord;
      } else {
        player.type = 'civilian';
        player.word = goodWord;
      }
    });
    players = shuffle(players);
    console.log(
      "[GameSelection]\t attributewords (player's type) = ",
      players[0],
    );
    while (players[0].type !== 'civilian') {
      players = shuffle(players);
    }
    console.log('[GameSelection]\t attributewords (output) = ', players);
  };

  ///////////////////////////////
  ////// Export component ///////
  ///////////////////////////////

  // {
  //   "navigation": {
  //     "addListener": "[[Function addListener]]",
  //     "canGoBack": "[[Function canGoBack]]",
  //     "dispatch": "[[Function dispatch]]",
  //     "getId": "[[Function getId]]",
  //     "getParent": "[[Function getParent]]",
  //     "getState": "[[Function anonymous]]",
  //     "goBack": "[[Function anonymous]]",
  //     "isFocused": "[[Function isFocused]]",
  //     "navigate": "[[Function anonymous]]",
  //     "pop": "[[Function anonymous]]",
  //     "popToTop": "[[Function anonymous]]",
  //     "push": "[[Function anonymous]]",
  //     "removeListener": "[[Function removeListener]]",
  //     "replace": "[[Function anonymous]]",
  //     "reset": "[[Function anonymous]]",
  //     "setOptions": "[[Function setOptions]]",
  //     "setParams": "[[Function anonymous]]"
  //   },
  //   "route": {
  //     "key": "GameSelection-i59b0zB7NMsqq4eNrFkTk",
  //     "name": "GameSelection",
  //     "params": {"players": "[[Array]]"},
  //     "path": "undefined"
  //   }
  // }

  // let players = struct.route.params.players;
  const onChangeFunction = (event: any) => {
    if (mrWhiteCount + undercoversCount > maxWrongWord) {
      return;
    }
    attributeWords();

    console.log('[GameSelection]\t NewPlayers = ', players);
    event.navigation.navigate('PickACard', {players: players});
  };
  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: players}}
      onChangeFunction={onChangeFunction}>
      <GameSelection globalData={{players: players}} />
    </Body>
  );
};
