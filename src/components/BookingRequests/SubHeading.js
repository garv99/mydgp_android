import React from 'react';
import {Text} from 'react-native';
import ComponentStyles from '../../styles/ComponentStyles';

const SubHeading = ({heading, styles}) => {
  return <Text style={[ComponentStyles.bookingRequestHeading, styles]}>{heading}</Text>;
};

export default SubHeading;
