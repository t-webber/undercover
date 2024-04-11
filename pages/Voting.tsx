import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Body, {ChangeType, Navigation, Route} from '../components/body';
import {GlobalData, Player} from '../components/body';
import {ComponentType} from 'react';
import {NewText, NewButton} from '../components/html';
import {colors, logger, logError, getPlayers} from '../settings/static';
import {scores} from '../settings/game-settings';

//////////////////////////
//// Statci functions ////
//////////////////////////

const hardLeft = (players: Player[]) => {
  var under = 0;
  var white = 0;
  var civilian = 0;
  logger('Voting', 'hardLeft', 'players', players);
  players.forEach(player => {
    if (!player.kicked) {
      switch (player.type) {
        case 'white': {
          white++;
          break;
        }
        case 'undercover': {
          under++;
          break;
        }
        case 'civilian': {
          civilian++;
          break;
        }
        default: {
          logError(
            'Voting',
            'hardLeft',
            'Player type is undefined',
            `Players = ${players}`,
          );
        }
      }
    }
  });
  logger('Voting', 'hardLeft', 'result', [civilian, under, white]);
  return [civilian, under, white];
};

//////////////////////////
////////// Main //////////
//////////////////////////

export default (struct: {route: Route; navigation: Navigation}) => {
  /////////////////////////
  ////// Previous info ////
  /////////////////////////
  const players = getPlayers(struct);
  // logError(struct.route.name, '', 'env', process.env.DEV_MODE);

  /////////////////////////
  ////// how many left ////
  /////////////////////////

  const [civilianLeft, setCivilianLeft] = useState(hardLeft(players)[0]);
  const [undercoverLeft, setUndercoverLeft] = useState(hardLeft(players)[1]);
  const [whiteLeft, setWhiteLeft] = useState(hardLeft(players)[2]);

  const leftEffect = () => {
    const [civilian, under, white] = hardLeft(players);
    setCivilianLeft(civilian);
    setUndercoverLeft(under);
    setWhiteLeft(white);
    console.log(civilian);
    if (civilian <= 1) {
      players.forEach(player => {
        if (player.type === 'civilian' && !player.kicked) {
          player.kicked = true;
          player.score -= scores.civilian;
        }
      });
      logger(struct.route.name, 'leftEffect', 'One civilian left', civilian);
      struct.navigation.navigate('Scores', {
        players: players,
        message: 'Civilians lost!',
      });
    } else if (white == 0 && under == 0) {
      logger(struct.route.name, 'leftEffect', 'Only civilians left', civilian);
      struct.navigation.navigate('Scores', {
        players: players,
        message: 'Civilians won!',
      });
    }
  };

  useEffect(leftEffect);

  /////////////////////////
  ////// Kick handle //////
  /////////////////////////

  const KickPlayer = ({
    players,
    playerIndex,
  }: {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    playerIndex: number;
  }) => {
    logger(struct.route.name, 'KickPlayer', 'players', players);
    logger(struct.route.name, 'KickPlayer', 'index', playerIndex);
    const name = players[playerIndex].name;
    const player: Player = players[playerIndex];
    const [boxmessage, setBoxmessage] = useState('');
    const [btnMessage, setBtnMessage] = useState(
      player.kicked ? 'Kicked' : 'Kick',
    );

    const handleKick = () => {
      leftEffect();
      if (player.kicked) {
        setBoxmessage(
          'Player already kicked, and his team was: ' + player.type + 's.',
        );
        return;
      }
      player.kicked = true;
      if (player.type === undefined) {
        logError(
          struct.route.name,
          'handleKick',
          'Player to be kicked but type not set',
        );
        player.score = 0;
      } else {
        player.score -= scores[player.type];
      }
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
            paddingVertical: 10,
            margin: 10,
            backgroundColor: colors.darkblue,
          }}>
          <NewText>{name}</NewText>
          <NewButton
            onPress={handleKick}
            title={btnMessage}
            divStyle={{
              paddingHorizontal: 10,
              borderRadius: 10,
              position: 'absolute',
              right: 0,
            }}
          />
        </View>
        <NewText>{boxmessage}</NewText>
      </>
    );
  };

  //////////////////////////////
  ////// Inner componenet //////
  //////////////////////////////

  const Voting: ComponentType<{globalData: GlobalData}> = ({globalData}) => {
    logger(struct.route.name, 'Inner', 'globalData', globalData);
    const [players, setPlayers] = useState(globalData.players);
    return (
      <View style={{width: '100%', margin: 50}}>
        <ScrollView style={{marginHorizontal: 50}}>
          {players.map((player: Player, index: number) => (
            <KickPlayer
              players={players}
              setPlayers={setPlayers}
              playerIndex={index}
              key={index}
            />
          ))}
        </ScrollView>
        <View style={{padding: 30, paddingBottom: 0}}>
          <NewText style={{textAlign: 'center'}}>
            There are {civilianLeft} civilians, {undercoverLeft} undercovers and{' '}
            {whiteLeft} Mr. White left.
          </NewText>
        </View>
      </View>
    );
  };

  ///////////////////////////////
  ////// Export componenet //////
  ///////////////////////////////

  return (
    <Body
      navigation={struct.navigation}
      globalData={{players: players}}
      onChangeFunction={(event: ChangeType) =>
        struct.navigation.navigate('Voting', {players: players})
      }>
      <Voting globalData={{players: players}} />
    </Body>
  );
};
