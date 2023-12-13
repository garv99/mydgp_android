import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/UserActions';
import { showToast } from '../helpers/ShowToast';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '../routes/RouteNames';

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {isAuthenticated} = useSelector(state => state.user)

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.reset({index: 1, routes: [{name: RouteNames.AUTH.LOGINOTP}]});
    }
  }, [isAuthenticated]);

  const logoutHandler = () => {
    dispatch(logout())
    showToast('success', 'Logout successful');
  }

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={logoutHandler}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
