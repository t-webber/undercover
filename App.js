import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text, View, StyleSheet} from 'react-native';

import Header from './android/components/header.tsx';
import Footer from './android/components/footer.tsx';
import MySection from './android/components/section.tsx';

import GameSelection from './android/pages/GameSelection.tsx';
import AddPlayer from './android/pages/AddPlayer.tsx';

const App = () => {
  const Stack = createNativeStackNavigator();

  const AddPlayerScreen = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <AddPlayer />
          <Button
            inline
            rounded
            title="Finish"
            onPress={() => navigation.navigate('GameSelection')}
            style={{margin: 10}}
          />
        </View>
        <Footer style={{flex: 2}} />
      </View>
    );
  };

  const GameSelectionScreen = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <GameSelection />
          <Button
            title="Finish"
            onPress={() => navigation.navigate('AddPlayer')}
          />
        </View>
        <Footer style={{flex: 2}} />
      </View>
    );
  };

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="AddPlayer"
          component={AddPlayerScreen}
          options={{title: 'AddPlayer'}}
        />
        <Stack.Screen
          name="GameSelection"
          component={GameSelectionScreen}
          options={{title: 'GameSelection'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
