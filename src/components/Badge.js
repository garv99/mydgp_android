import {Text} from 'react-native';
import React from 'react';
import Colors from '../helpers/Colors';

export default function Badge({title, bgColor, color}) {
  return (
    <Text
      style={{
        elevation: 2,
        backgroundColor: bgColor || Colors.GREEN,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 5,
        textAlign: 'center',
        color: color || Colors.BLACK
      }}>
      {title}
    </Text>
  );
}
