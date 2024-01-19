import {View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import {deviceHeight, deviceWidth} from '../helpers/Dimensions';
import {Image} from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import {useDispatch, useSelector} from 'react-redux';
import Enums from '../helpers/Enums';
import { toggleDutyStatus } from '../actions/UserActions';
import BookingRequests from './BookingRequests';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user);
  const [onDuty, setOnDuty] = useState(
    user?.status === Enums.SERVICE_PROVIDER_STATUS.ACTIVE ? true : false,
  );

  const updateDutyStatus = () => {
    setOnDuty(!onDuty);
    dispatch(toggleDutyStatus(onDuty ? Enums.SERVICE_PROVIDER_STATUS.INACTIVE : Enums.SERVICE_PROVIDER_STATUS.ACTIVE))
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 20,
          }}>
          <ToggleSwitch
            title={onDuty ? 'ON DUTY' : 'OFF DUTY'}
            value={onDuty}
            onValueChange={updateDutyStatus}
          />
        </View>
      ),
    });
  }, [navigation, onDuty]);

  return onDuty ? (
    <BookingRequests />
  ) : (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight,
        width: deviceWidth,
      }}>
      <Image
        source={require('../utils/off_duty.gif')}
        style={{
          height: 280,
        }}
      />
      <Text style={{fontSize: 22}}>Hello Captain!</Text>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
        Go On Duty to start Earning!
      </Text>
    </View>
  );
}

{/* <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight,
        width: deviceWidth,
      }}>
      <Image
        source={require('../utils/on_duty.gif')}
        style={{
          // width: 250,
          height: 280,
        }}
      />
    </View> */}