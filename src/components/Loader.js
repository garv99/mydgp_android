import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import ComponentStyles from '../styles/ComponentStyles';
import Colors from '../helpers/Colors';

const Loader = () => {
  return (
    <View style={ComponentStyles.loaderContainer}>
      <View style={ComponentStyles.loaderSubContainer}>
        <ActivityIndicator size={46} color={Colors.PRIMARY} />
      </View>
    </View>
  );
}

export default Loader;
