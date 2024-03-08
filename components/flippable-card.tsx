import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import {colors} from './colors';

interface FlippableCardProps {
  contents: string[];
  redirect: () => void;
}

const CardContent = ({
  contents,
  index,
}: {
  contents: string[];
  index: number;
}) => {
  return (
    <View>
      <Text
        style={{fontSize: 60, textAlign: 'center', color: colors.textBlack}}>
        {index % 2 == 0 ? 'Player' : 'Word'}
      </Text>
      <Text
        style={{fontSize: 40, textAlign: 'center', color: colors.textBlack}}>
        {contents[index]}
      </Text>
    </View>
  );
};

const Flippable: React.FC<FlippableCardProps> = ({contents, redirect}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (index === contents.length - 1) {
      redirect();
    }
    setIndex(index + 1);
    Animated.timing(rotateValue, {
      toValue: rotateValue.__getValue() === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [index, setIndex] = useState(0);

  const frontInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle: ViewStyle = {
    transform: [{rotateY: frontInterpolate}],
    backfaceVisibility: 'hidden',
  };

  const backAnimatedStyle: ViewStyle = {
    transform: [{rotateY: backInterpolate}],
    backfaceVisibility: 'hidden',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <CardContent contents={contents} index={index} />
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <CardContent contents={contents} index={index} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightblue,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },

  container: {
    backgroundColor: colors.darkblue,
    width: '100%',
  },
});

export default Flippable;
