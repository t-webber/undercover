//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React, {ComponentType} from 'react';
import {View, ViewStyle, ScrollView, TextStyle} from 'react-native';
import Body, {
  Navigation,
  Route,
  GlobalData,
  Player,
  ChangeType,
} from '../components/body';
import {NewText} from '../components/html';
import {getPlayers, logger} from '../settings/static';

export default (struct: {route: Route; navigation: Navigation}) => {
  const inplayers = getPlayers(struct);

  const message =
    struct.route.params.message || 'End of game, all remaining players win!';

  const sorted = inplayers.sort((p1, p2) => p2.score - p1.score);

  //////////////////////////////
  ////// Inner Component ///////
  //////////////////////////////

  //   const liStyle: ViewStyle = {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'space-evenly',
  //     width: '100%',
  //     margin: 15,
  //   };

  //   const liTitleStyle: TextStyle = {
  //     fontSize: 22,
  //     fontWeight: '700',
  //   };

  //   const liTextStyle: TextStyle = {
  //     textAlign: 'left',
  //   };

  const liStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  };

  const liTitleStyle: TextStyle = {
    fontSize: 22,
    fontWeight: '700',
  };

  const liTextStyle: TextStyle = {
    fontSize: 18,
  };

  const Scores: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
    return (
      <View style={{width: '100%', margin: 50, marginTop: 0}}>
        <NewText
          style={{margin: 50, marginTop: 0, fontWeight: '600', fontSize: 30}}>
          {message}
        </NewText>
        <ScrollView>
          <View style={liStyle}>
            <NewText style={liTitleStyle}>Player</NewText>
            <NewText style={liTitleStyle}>Score</NewText>
          </View>
          {sorted.map((player: Player, index: number) => (
            <View style={liStyle}>
              <NewText key={index} style={liTextStyle}>
                {player.name}
              </NewText>
              <NewText
                key={100 + index}
                style={{textAlign: 'center', ...liTextStyle}}>
                {player.score}
              </NewText>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  //////////////////////////////
  ////// Export Component //////
  //////////////////////////////

  logger(struct.route.name, 'export', 'players', inplayers);
  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: inplayers}}
      onChangeFunction={(event: ChangeType) =>
        event.navigation.navigate('GameSelection', {players: inplayers})
      }>
      <Scores globalData={{players: inplayers}} />
    </Body>
  );
};
