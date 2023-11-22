import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface Item {
  id: string;
  name: string;
  selected: boolean;
}

const data: Item[] = [
  { id: '1', name: 'Item 1', selected: false },
  { id: '2', name: 'Item 2', selected: false },
  { id: '3', name: 'Item 3', selected: false },
  // Add more items as needed
];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(data);

  const handleSelectItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
      <View style={[styles.item, { backgroundColor: item.selected ? 'lightblue' : 'white' }]}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
