import React from 'react';
import {View, ViewStyle} from 'react-native';
import {NewText} from './html';
import {colors} from './colors';

const Footer = ({style}: {style?: ViewStyle}) => {
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        alignContent: 'center',
        ...style,
      }}>
      <NewText style={{fontWeight: 'bold', color: colors.lightblue}}>
        2024 &copy; Underwebber
      </NewText>
    </View>
  );
};

export default Footer;
