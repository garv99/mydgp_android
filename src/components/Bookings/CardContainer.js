import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Colors from '../../helpers/Colors';
import BookingsCard from './BookingsCard';

const CardContainer = ({emptyMessage, listData, heading, showHeading}) => {
  return (
    <View style={styles.container}>
      {showHeading ? <Text style={styles.heading}>{heading}</Text> : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        ListEmptyComponent={() => (
          <Text style={styles.emptylistText}>{emptyMessage}</Text>
        )}
        data={listData}
        renderItem={({item}) => <BookingsCard booking={item} />}
      />
    </View>
  );
};

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
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.DARK_GREEN,
    marginHorizontal: 5,
    marginVertical: 22,
  },
});

export default CardContainer;
