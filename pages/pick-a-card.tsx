import React, {useState, ComponentType} from 'react';
import {View} from 'react-native';
import Body, {
  ChangeType,
  GlobalData,
  Navigation,
  Player,
  Route,
} from '../components/body';
import {NewText} from '../components/html';
import FlippableCard from '../components/flippable-card';
import {getPlayers, logger} from '../settings/static';

export default (struct: {route: Route; navigation: Navigation}) => {
  //////////////////////////////
  //////// Previous info ///////
  //////////////////////////////
  const players = getPlayers(struct);
  logger(struct.route.name, '', 'players', players);

  //////////////////////////////
  ////// Inner componenet //////
  //////////////////////////////

  const PickACard: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
    const players = globalData.players;

    for (let index = 0; index < players.length; index++) {
      const element = players[index];
    }

    var contents: string[] = [];
    players.forEach((player: Player) => {
      contents.push(player.name);
      contents.push(player.word || 'default');
    });

    // const [word, setWord] = useState('');
    // const [player, setPlayer] = useState('');
    // const [btnContent, setBtnContent] = useState('See word');

    const [submit, setSubmit] = useState(false);

    return (
      <View>
        {submit ? null : (
          <FlippableCard
            contents={contents}
            redirect={() => {
              setSubmit(true);
            }}
          />
        )}
      </View>
    );
  };

  //////////////////////////////
  /////// Export component /////
  //////////////////////////////

  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: players}}
      onChangeFunction={(event: ChangeType) =>
        event.navigation.navigate('Voting', {players: players})
      }>
      <PickACard globalData={{players: players}} />
    </Body>
  );
};
