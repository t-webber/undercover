import React from 'react';
import {Text, View} from 'react-native';

const MySection = ({name}) => {
  return ( 
    <View style={{alignItems: 'center'}}>
        <Text style={{paddingTop: 20, fontSize: 30, fontWeight: '900'}}>{name}</Text>
    </View>
   );
}
 
export default MySection;