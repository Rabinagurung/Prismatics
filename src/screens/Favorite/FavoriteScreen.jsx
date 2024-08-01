import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as database from '../../database';
import MasonryList from 'react-native-masonry-list';

export default function FavoriteScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        //Load the database here
        const loadedData = await database.load();
        console.log("Loaded Data:", loadedData); // Debug: Log the loaded data
        const formattedData = loadedData.map(item => ({
          uri: item.image_URL,
          id: item.id,
        }));
        console.log("Formatted Data:", formattedData); // Debug: Log the formatted data
        setData(formattedData)
      } catch (error) {
        console.error("Error loading data:", error); // Debug: Log any error
        Alert.alert('Error', 'There was an error loading the favourites page. Please try again later.');
      }
    })();
  }, []);

  const handleItemPress = (item) => {
    console.log("Item pressed:", item); // Debug: Log the pressed item
    navigation.navigate('DetailScreen', { item });
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <MasonryList
          images={data}
          onPressImage={handleItemPress}
          columns={2}
          style={styles.listContainer}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
});