//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React, {useState, ComponentType, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  SafeAreaView,
  Dimensions,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {NewText, ErrorText} from '../components/html';
import {Slider} from '@react-native-assets/slider';
import Body, {
  ChangeType,
  Navigation,
  Player,
  Route,
  GlobalData,
} from '../components/body';
import RNFS from 'react-native-fs';
import {getPlayers, logError, logger} from '../settings/static';
import {scores} from '../settings/game-settings';

export default (struct: {route: Route; navigation: Navigation}) => {
  const generateRandomWord = async () => {
    try {
      const fileContent = await RNFS.readFileAssets('db.csv');
      // logger(
      //   struct.route.name,
      //   'generateRandomWord',
      //   'File content',
      //   fileContent,
      // );
      const lines = fileContent.split('\n');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      logger(struct.route.name, 'generateRandomWord', 'randomLine', randomLine);
      return randomLine;
    } catch (err) {
      logError('GameSelection', 'generateRandomWord', 'File not found', err);
    }
    // const filePath = RNFS.DocumentDirectoryPath + '/words/db.csv';
    // const data = await RNFS.readFile(filePath);
    // const lines = data.split('\n');
    // const randomLine = lines[Math.floor(Math.random() * lines.length)];
    // console.log('[GameSelecton] (generate random word) word = ', randomLine);
    // return randomLine;
  };

  //   const generateWords = async () => {
  //     const filePath = RNFS.DocumentDirectoryPath + '/words/db.csv';
  //     const data = await RNFS.readFile(filePath);
  //     console.log('[GameSelecton] (generate words) data = ', data);

  //     return ['good word', 'bad word'];
  //   };

  //   const [goodWord, badWord] = await generateWords();
  const [goodWord, setGoodWord] = useState('');
  const [badWord, setBadWord] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      generateRandomWord()
        .then(word => {
          if (word === undefined) {
            logError(struct.route.name, 'useEffect', 'Empty line in file', '');
          } else {
            let [good, bad] = word.split(';');
            setGoodWord(good);
            setBadWord(bad);
          }
        })
        .catch(err =>
          logError(struct.route.name, 'useEffect', 'File not found', err),
        );
    }, []),
  );

  // useEffect(() => {
  //   generateRandomWord()
  //     .then(word => {
  //       if (word === undefined) {
  //         logError(struct.route.name, 'useEffect', 'Empty line in file', '');
  //       } else {
  //         let [good, bad] = word.split(';');
  //         setGoodWord(good);
  //         setBadWord(bad);
  //       }
  //     })
  //     .catch(err =>
  //       logError(struct.route.name, 'useEffect', 'File not found', err),
  //     );
  // }, [mrWhiteCount, undercoversCount]);

  //////////////////////////////
  //////// Previous info ///////
  //////////////////////////////

  var players = getPlayers(struct);
  logger(struct.route.name, '', 'players', players);

  const nbPlayers = players.length;

  const defaultMrWhiteCOunt = Math.floor((1 / 5) * nbPlayers);
  const defaultUndercoverCOunt = Math.floor((1 / 5) * nbPlayers);

  const [mrWhiteCount, setMrWhiteCount] = useState(defaultMrWhiteCOunt);
  const [undercoversCount, setUndercoversCount] = useState(
    defaultUndercoverCOunt,
  );
  const maxWrongWord = nbPlayers / 2;

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
              maximumValue={Math.ceil(maxWrongWord)}
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
              maximumValue={Math.ceil(maxWrongWord)}
              step={1}
              style={{flex: 1, paddingHorizontal: 10}}
            />
            <NewText style={{...paramValueStyle}}>{undercoversCount}</NewText>
          </View>
        </View>
        {mrWhiteCount + undercoversCount < maxWrongWord ? null : (
          <View style={{display: 'flex'}}>
            <ErrorText>
              There are more Mr Whites and undercovers than civilians !
            </ErrorText>
            <ErrorText>
              Expected at least {maxWrongWord + 1} civilians.
            </ErrorText>
          </View>
        )}
      </SafeAreaView>
    );
  };

  ///////////////////////////////
  ////// Attribute words ////////
  ///////////////////////////////

  const attributeWords = () => {
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

    logger(
      struct.route.name,
      'attributeWords',
      'MrWhiteIndexes',
      mrWhiteIndexes,
    );
    logger(
      struct.route.name,
      'attributeWords',
      'UndercoversIndexes',
      undercoversIndexes,
    );

    players.forEach((player, index) => {
      logger(struct.route.name, 'attributeWords', "player's index", index);
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
      player.score += scores[player.type];
      player.kicked = false;
    });
    players = shuffle(players);
    logger(struct.route.name, 'attributeWords', "player's type", players[0]);
    while (players[0].type === 'white') {
      players = shuffle(players);
    }
    logger(struct.route.name, 'attributeWords', 'players', players);
  };

  ///////////////////////////////
  ////// Export component ///////
  ///////////////////////////////

  // let players = struct.route.params.players;
  const onChangeFunction = (event: ChangeType) => {
    if (mrWhiteCount + undercoversCount > maxWrongWord) {
      return;
    }
    attributeWords();

    logger(struct.route.name, 'attributeWords', 'players', players);
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
