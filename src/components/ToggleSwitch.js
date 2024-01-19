import React from 'react';
import { View } from 'react-native';
import {Switch} from 'react-native-switch';
import Colors from '../helpers/Colors';
import { Text } from 'react-native';

const ToggleSwitch = ({title, value, onValueChange}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: Colors.GRAY, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 4 }}>
      <Text style={{ marginRight: 7 }}>{title}</Text>
      <Switch
      circleSize={20}
        value={value}
        renderActiveText={false}
        renderInActiveText={false}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default ToggleSwitch;
