import {View, Text, Image} from 'react-native';
import React from 'react';
import Logo from '../../images/dummy_logo.png'
import AuthComponentStyles from '../../styles/AuthComponentStyles';

export default function AuthHeader() {
  return (
    <View style={AuthComponentStyles.bgContainer}>
      <Image source={Logo} style={AuthComponentStyles.logo} />
      <Text style={AuthComponentStyles.companyName}>MY DGP</Text>
    </View>
  );
}
