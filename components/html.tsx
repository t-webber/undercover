import {ReactNode} from 'react';
import {Text as OldText, TextStyle, View, ViewStyle} from 'react-native';

const NewText = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: TextStyle;
}) => {
  return <OldText style={{fontSize: 16, ...style}}>{children}</OldText>;
};

const Error = ({children, style}: {children: ReactNode; style?: ViewStyle}) => {
  return (
    <View style={{padding: 10, ...style}}>
      <OldText
        style={{
          fontSize: 20,
          textAlign: 'center',
        }}>
        {children}
      </OldText>
    </View>
  );
};

export {NewText, Error};
