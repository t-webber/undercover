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

//////////////////////////////
///////// Static Data ////////
//////////////////////////////

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
/////// Inner Component ///////
///////////////////////////////

const GameSelection: ComponentType<{globalData: GlobalData}> = ({
  globalData,
}) => {
  const nbPlayers = globalData.players.length;

  const defaultMrWhiteCOunt = Math.floor((1 / 5) * nbPlayers);
  const defaultUndercoverCOunt = Math.floor((1 / 5) * nbPlayers);

  const [mrWhiteCount, setMrWhiteCount] = useState(defaultMrWhiteCOunt);
  const [undercoversCount, setUndercoversCount] = useState(
    defaultUndercoverCOunt,
  );
  const maxWrongWord = Math.floor(nbPlayers / 2);

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
      {mrWhiteCount + undercoversCount < maxWrongWord ? null : (
        <View style={{display: 'flex'}}>
          <Error>
            There are more Mr Whites and undercovers than civilians !
          </Error>
          <Error>Expected at least {maxWrongWord} civilians.</Error>
        </View>
      )}
    </SafeAreaView>
  );
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

export default (struct: {
  route: {
    key: string;
    name: string;
    params: {players: Player[]};
    path: string | undefined;
  };
  navigation: {
    addListener: any;
    canGoBack: any;
    dispatch: any;
    getId: any;
    getParent: any;
    getState: any;
    goBack: any;
    isFocused: any;
    navigate: any;
    pop: any;
    popToTop: any;
    push: any;
    removeListener: any;
    replace: any;
    reset: any;
    setOptions: any;
    setParams: any;
  };
}) => {
  let players = struct.route.params.players;
  console.log('GameSelection : ', players);
  return Body({
    MyComponent: GameSelection,
    globalData: {players: players},
    navigation: struct.navigation,
    onChangeFunction: (event: any) =>
      event.navigation.navigate('PickACard', {players: players}),
  });
};
