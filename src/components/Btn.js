import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ComponentStyles from '../styles/ComponentStyles';
import Colors from '../helpers/Colors';

export default function Btn({label, onClick, disabled, bgColor, color}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[ComponentStyles.btnContainer, { color: Colors.WHITE, backgroundColor: bgColor || Colors.PRIMARY }]}>
      <Text style={ComponentStyles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
