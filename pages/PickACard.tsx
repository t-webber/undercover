import React, {useState, ComponentType} from 'react';
import {View} from 'react-native';
import Body, {GlobalData, Player} from '../components/body';
import {NewText} from '../components/html';
import FlippableCard from '../components/flippable-card';

const HeadCard = ({player}: {player: string}) => {
  console.log('HeadCard input = ', player);
  return (
    <View style={{backgroundColor: 'green'}}>
      <NewText>{player}</NewText>
    </View>
  );
};
const BackCard = ({player}: {player: string}) => {
  return (
    <View>
      <NewText>{player}</NewText>
    </View>
  );
};

// var players: Player[] = [];

const PickACard: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
  console.log(globalData);
  const players = globalData.players;
  console.log('Pick a card input = ', players);

  var contents: string[] = [];
  players.forEach((player: Player) => {
    contents.push(player.name);
    contents.push(player.word);
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

export default (struct: {route: {params: {players: any}}; navigation: any}) => {
  const players = struct.route.params.players;
  console.log('pick a card = ', players);
  return Body({
    MyComponent: PickACard,
    globalData: {players: players},
    navigation: struct.navigation,
    onChangeFunction: (event: any) => event.navigation.navigate('Voting'),
  });
};
