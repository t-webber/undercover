//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React from 'react';
import {
  DarkTheme,
  NavigationContainer,
  NavigationProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/core';

//////////////////////////////
////////// Components ////////
//////////////////////////////

import Footer from './components/footer.tsx';

//////////////////////////////
/////////// Pages ////////////
//////////////////////////////

import GameSelection from './pages/game-selection.tsx';
import AddPlayer from './pages/add-player.tsx';
import PickACard from './pages/pick-a-card.tsx';
import Voting from './pages/voting.tsx';
import Scores from './pages/scores.tsx';

//////////////////////////////
////////// RouteProp<ParamListBase, string> ////////
//////////////////////////////

const Stack = createNativeStackNavigator();

//////////////////////////////
////////// Main //////////////
//////////////////////////////

export default function App() {
  return (
    <>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="AddPlayer">
          <Stack.Screen
            name="AddPlayer"
            component={AddPlayer}
            options={{title: 'Add the players'}}
          />
          <Stack.Screen
            name="GameSelection"
            component={GameSelection}
            options={{title: 'Game settings'}}
          />
          <Stack.Screen
            name="PickACard"
            component={PickACard}
            options={{title: 'Pick a card!'}}
          />
          <Stack.Screen
            name="Voting"
            component={Voting}
            options={{title: 'Take a vote!'}}
          />
          <Stack.Screen
            name="Scores"
            component={Scores}
            options={{title: 'Scores table'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer />
    </>
  );
}
