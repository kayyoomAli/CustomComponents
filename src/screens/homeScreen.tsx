import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from 'react-native';

const HomeScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<any>(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<any>(false);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [filterWord, setFilterWord] = useState<any>('');
  // Fetch data from the provided API
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const allCategories = Array.from(
    new Set(products.map((product: any) => product.category)),
  );

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const addCategory = (category: any) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (category: any) => {
    const updatedCategories = selectedCategories.filter(
      (cat: any) => cat !== category,
    );
    setSelectedCategories(updatedCategories);
  };

  const handleSave = () => {
    // Filter products based on selectedCategories
    if (selectedCategories.length === 0) {
      setFilteredProducts(products); // No filter applied, show all products
    } else {
      const filtered = products.filter((product: any) =>
        selectedCategories.includes(product.category),
      );
      setFilteredProducts(filtered);
    }

    setIsBottomSheetVisible(false);
  };

  const handleSaveFilter = () => {
    // Filter products based on selectedCategories and filterWord

    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedCategories.includes(product.category),
      );
    }

    if (filterWord) {
      filtered = filtered.filter((product: any) =>
        product.description.includes(filterWord),
      );
    }

    setFilteredProducts(filtered);
    setIsBottomSheetVisible(false);
  };

  const handleCancel = () => {
    setIsBottomSheetVisible(false);
  };

  const renderItem = ({item}: any) => (
    <View
      style={{padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View>
      <Button title="Open Bottom Sheet" onPress={toggleBottomSheet} />
      <Button title="Filter by Word" onPress={toggleFilterModal} />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredProducts} // Use filteredProducts instead of products
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <Modal visible={isBottomSheetVisible} animationType="slide">
        <View>
          <Text>Choose Categories</Text>
          <FlatList
            data={allCategories}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  selectedCategories.includes(item)
                    ? removeCategory(item)
                    : addCategory(item)
                }>
                <Text>
                  {selectedCategories.includes(item) ? '✓ ' : ''} {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={handleSave}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={isFilterModalVisible} animationType="slide">
        <View>
          <Text>Filter by Word</Text>
          <TextInput
            placeholder="Enter a word to filter"
            onChangeText={text => setFilterWord(text)}
            value={filterWord}
          />
          <Button
            title="Apply Filter"
            onPress={() => {
              handleSaveFilter();
              toggleFilterModal();
            }}
          />

          <Button title="Cancel" onPress={toggleFilterModal} />
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
