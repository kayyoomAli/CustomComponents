import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

interface Tab2Props {
  data: number[]; // Replace with your actual data type
}

const TabTwo: React.FC<Tab2Props> = ({data}) => {
  // Your data rendering logic here
  const renderItem = ({item, index}: {item: number}) => (
    <View>
      <Text>{index}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default TabTwo;
