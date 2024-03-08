import React, {ReactNode, FunctionComponent, ComponentType} from 'react';
import {View, Button, ViewStyle} from 'react-native';
import Footer from './footer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from './colors';

export type Player = {
  name: string;
  word: string;
  type: 'civilian' | 'undercover' | 'white';
};

export type GlobalData = {
  players: Player[];
};

interface InputStruct {
  MyComponent: ComponentType<{globalData: GlobalData}>;
  globalData: GlobalData;
  navigation?: any;
  onChangeFunction: any;
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
        <inputStruct.MyComponent globalData={inputStruct.globalData} />
      </View>
      <View
        style={{
          margin: 40,
          justifyContent: 'flex-end',
        }}>
        <Button
          title="Next"
          onPress={() => inputStruct.onChangeFunction(inputStruct)}
          style={{backgroundColor: colors.lightblue}}
        />
      </View>
    </View>
  );
}
