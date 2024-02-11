import React from 'react';
import {Text, View} from 'react-native';

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b !== undefined ? b : a,
    paddingBottom: c !== undefined ? c : a,
    paddingLeft: d !== undefined ? d : (b !== undefined ? b : a)
  }
}

const Footer = () => {
  return (
  <View style={{display: 'flex', backgroundColor: 'black', alignItems: 'center', paddingTop: 10, paddingBottom: 10, alignContent: 'center'}}>
    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#61dafb'}}>2024 &copy; Fayet - Webber</Text>
  </View>
  );
}
export default Footer;
