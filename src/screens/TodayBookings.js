import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {showToast} from '../helpers/ShowToast';
import {clearErrors, getCurrentBookings} from '../actions/BookingsActions';
import Loader from '../components/Loader';
import Colors from '../helpers/Colors';
import BookingsCard from '../components/Bookings/BookingsCard';
import {useNavigation} from '@react-navigation/native';
import {Switch} from 'react-native-switch';

export default function TodayBookings() {
  const dispatch = useDispatch();
  const {loading, error, currentBookings} = useSelector(
    state => state.currentBookings,
  );
  const {isUpdated} = useSelector(state => state.updateBookingStatus);

  const updateDutyStatus = () => {
    setOnDuty(!onDuty)
    // TODO - make the call to the action to update the status on the backend
  }

  useEffect(() => {
    dispatch(getCurrentBookings());

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [error, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.earningsContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        ListEmptyComponent={() => (
          <Text style={styles.emptybookingsText}>
            No more bookings for today
          </Text>
        )}
        data={currentBookings}
        renderItem={({item}) => (
          <BookingsCard booking={item} showUpdateStatus={true} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  earningsContainer: {
    margin: 5,
  },
  emptybookingsText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.RED,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  flatlist: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 5,
  },
});
