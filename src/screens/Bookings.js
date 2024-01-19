import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../helpers/ShowToast';
import {clearErrors, getFutureBookings} from '../actions/BookingsActions';
import Loader from '../components/Loader';
import {FlatList} from 'react-native';
import BookingsCard from '../components/Bookings/BookingsCard';
import Colors from '../helpers/Colors';

export default function Bookings() {
  const dispatch = useDispatch();
  const {loading, error, futureBookings} = useSelector(
    state => state.futureBookings,
  );

  useEffect(() => {
    dispatch(getFutureBookings());

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [error]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        ListEmptyComponent={() => (
          <Text style={styles.emptylistText}>No bookings yet</Text>
        )}
        data={futureBookings}
        renderItem={({item}) => <BookingsCard booking={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  emptylistText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.RED,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  flatlist: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
