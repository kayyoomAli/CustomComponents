import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const CRUDExample = () => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const saveData = () => {
    if (selectedItemId) {
      // Update existing item
      const updatedData = data.map(item =>
        item.id === selectedItemId ? {...item, text: inputText} : item,
      );
      setData(updatedData);
      setSelectedItemId(null);
    } else {
      // Add new item
      const newData = [...data, {id: Date.now().toString(), text: inputText}];
      setData(newData);
    }
    setInputText('');
  };

  const deleteData = id => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  const updateData = id => {
    const selectedItem = data.find(item => item.id === id);
    if (selectedItem) {
      setInputText(selectedItem.text);
      setSelectedItemId(id);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
      <Button title="Update" onPress={() => updateData(item.id)} />
      <Button title="Delete" onPress={() => deleteData(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={text => setInputText(text)}
        placeholder="Enter text"
      />
      <Button title={selectedItemId ? 'Update' : 'Save'} onPress={saveData} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CRUDExample;
