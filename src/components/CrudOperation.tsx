import React, { useState, useCallback } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

interface Item {
  id: string;
  text: string;
}

const CrudOps: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const addItem = () => {
    if (inputText.trim() !== '') {
      setData((prevData) => [...prevData, { id: String(Date.now()), text: inputText }]);
      setInputText('');
    }
  };

  const deleteItem = useCallback((itemId: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <TouchableOpacity onPress={addItem} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
});

export default CrudOps;
