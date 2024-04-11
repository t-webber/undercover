import React, {ComponentType, ReactNode} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../settings/static';
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
  message?: string;
  // counts?: {
  //   white: number;
  //   undercover: number;
  // };
};

export type Navigation = {
  addListener: any;
  canGoBack: any;
  dispatch: any;
  getId: any;
  getParent: any;
  getState: any;
  goBack: any;
  isFocused: any;
  navigate: any;
  pop: any;
  popToTop: any;
  push: any;
  removeListener: any;
  replace: any;
  reset: any;
  setOptions: any;
  setParams: any;
};

export type Route = {
  key: string;
  name: string;
  params: GlobalData;
  path: undefined;
};

export type ChangeType = {
  globalData: GlobalData;
  navigation: any;
};

interface InputStruct {
  globalData: GlobalData;
  children?: ReactNode;
  navigation: object;
  onChangeFunction: (event: ChangeType) => void;
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
              globalData: inputStruct.globalData,
              navigation: inputStruct.navigation,
            })
          }
        />
      </View>
    </View>
  );
}
