//////////////////////////////
////////// Imports ///////////
//////////////////////////////

import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//////////////////////////////
/////////// Pages ////////////
//////////////////////////////

import GameSelection from './android/pages/GameSelection.tsx';
import AddPlayer from './android/pages/AddPlayer.tsx';

//////////////////////////////
///////// Navigation /////////
//////////////////////////////

const Stack = createNativeStackNavigator();

//////////////////////////////
//////////// Main ////////////
//////////////////////////////

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="AddPlayer">
        <Stack.Screen
          name="AddPlayer"
          component={AddPlayer}
          options={{title: 'AddPlayer'}}
        />
        <Stack.Screen
          name="GameSelection"
          component={GameSelection}
          options={{title: 'GameSelection'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
