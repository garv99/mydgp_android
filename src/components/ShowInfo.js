import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import ComponentStyles from '../styles/ComponentStyles';

const ShowInfo = ({title, info, boldInfo}) => (
  <View
    style={[
      ComponentStyles.horizontalAlign,
      {marginHorizontal: 10, marginVertical: 2},
    ]}>
    <Text style={styles.textBold}>{title} - </Text>
    <Text style={[styles.textRegular, { fontWeight: boldInfo ? "bold" : '400' }]}>{info}</Text>
  </View>
);

const styles = StyleSheet.create({
  textBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textRegular: {
    fontSize: 14,
  },
});

export default ShowInfo;
