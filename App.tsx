//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Footer from './components/footer.tsx';

//////////////////////////////
/////////// Pages ////////////
//////////////////////////////

import GameSelection from './pages/GameSelection.tsx';
import AddPlayer from './pages/AddPlayer.tsx';
import PickACard from './pages/PickACard.tsx';

//////////////////////////////
///////// Navigation /////////
//////////////////////////////

const Stack = createNativeStackNavigator();

//////////////////////////////
//////////// Main ////////////
//////////////////////////////

const App = () => {
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
            component={PickACard}
            options={{title: 'Take a vote!'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer />
    </>
  );
};

export default App;
