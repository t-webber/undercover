import React, {ComponentType, ReactNode} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from './colors';
import {NewText, NewButton} from './html';

export type Player = {
  name: string;
  word: string | undefined;
  type: 'civilian' | 'undercover' | 'white' | undefined;
  score: number;
  kicked: boolean;
};

export const initPlayer = (
  name: string,
  word: string | undefined,
  type: 'civilian' | 'undercover' | 'white' | undefined,
): Player => ({
  name: name,
  word: word,
  type: type,
  score: 0,
  kicked: false,
});

export type GlobalData = {
  players: Player[];
  // counts?: {
  //   white: number;
  //   undercover: number;
  // };
};

interface InputStruct {
  globalData: GlobalData;
  children?: ReactNode;
  navigation: object;
  onChangeFunction: (event: any) => void;
}

export default function Body(inputStruct: InputStruct) {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          padding: 10,
          margin: 10,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {inputStruct.children}
      </View>
      <View
        style={{
          margin: 40,
          justifyContent: 'flex-end',
        }}>
        <NewButton
          title="Next"
          onPress={() =>
            inputStruct.onChangeFunction({
              navigation: inputStruct.navigation,
              globalData: inputStruct.globalData,
            })
          }
        />
      </View>
    </View>
  );
}
