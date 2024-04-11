import {ReactNode} from 'react';
import {
  Text as OldText,
  TextStyle,
  View,
  TouchableOpacity,
  ViewStyle,
  Button as OldButton,
} from 'react-native';
import {colors} from '../settings/static';

export const NewText = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: TextStyle;
}) => {
  return <OldText style={{fontSize: 18, ...style}}>{children}</OldText>;
};

export const ErrorText = ({
  children,
  style,
  textStyle,
}: {
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <View style={{padding: 10, ...style}}>
      <OldText
        style={{
          fontSize: 20,
          textAlign: 'center',
          color: 'red',
          ...textStyle,
        }}>
        {children}
      </OldText>
    </View>
  );
};

export const NewButton = ({
  title,
  onPress,
  divStyle,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
  divStyle?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.lightblue,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...divStyle,
      }}
      onPress={onPress}>
      <NewText
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: colors.textBlack,
          ...textStyle,
        }}>
        {title}
      </NewText>
    </TouchableOpacity>
  );
};
