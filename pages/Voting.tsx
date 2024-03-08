import React, {useState} from 'react';
import {View} from 'react-native';
import Body from '../components/body';
import {GlobalData, Player} from '../components/body';
import {ComponentType} from 'react';
import {NewText, NewButton} from '../components/html';
import {colors} from '../components/colors';

export default (struct: {route: {params: GlobalData}; navigation: object}) => {
  const players = struct.route.params.players;

  const KickPlayer = ({
    players,
    playerIndex,
  }: {
    players: Player[];
    setPlayers: any;
    playerIndex: number;
  }) => {
    console.log('[Voting]\t KickPlayer (players) = ', players);
    console.log('[Voting]\t KickPlayer (index) = ', playerIndex);
    const name = players[playerIndex].name;
    const player: Player = players[playerIndex];
    const [boxmessage, setBoxmessage] = useState('');
    const [btnMessage, setBtnMessage] = useState(
      player.kicked ? 'Kicked' : 'Kick',
    );

    const handleKick = () => {
      if (player.kicked) {
        setBoxmessage(
          'Player already kicked, and his team was: ' + player.type + 's.',
        );
        return;
      }
      player.kicked = true;
      setBtnMessage('Kicked');
    };
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 10,
            width: '80%',
            margin: 10,
            backgroundColor: colors.darkblue,
          }}>
          <NewText>{name}</NewText>
          <NewButton
            onPress={handleKick}
            title={btnMessage}
            divStyle={{paddingHorizontal: 10, borderRadius: 10}}
          />
        </View>
        <NewText>{boxmessage}</NewText>
      </>
    );
  };

  const Voting: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
    console.log('[Voting]\t Input (players) = ', globalData);
    const [players, setPlayers] = useState(globalData.players);
    return (
      <View>
        {players.map((player: Player, index: number) => (
          <KickPlayer
            players={players}
            setPlayers={setPlayers}
            playerIndex={index}
          />
        ))}
      </View>
    );
  };

  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: players}}
      onChangeFunction={(event: any) =>
        event.navigation.navigate('AddPlayer', {players: players})
      }>
      <Voting globalData={{players: players}} />
    </Body>
  );

  // export default (struct: {route: {params: GlobalData}; navigation: object}) => {
  //   const players = struct.route.params.players;
  //   console.log('[Voting]\t Players = ', players);
  //   return Body({
  //     // MyComponent: Voting,
  //     globalData: {players: players},
  //     navigation: struct.navigation,
  //     onChangeFunction: (event: any) =>
  //       event.navigation.navigate('AddPlayer', {players: players}),
  //   });
};
