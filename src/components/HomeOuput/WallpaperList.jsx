import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MasonryList from 'react-native-masonry-list';

const WallpaperList =  ({ navigation }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://wallhaven.cc/api/v1/search?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedData = data.data.map(item => ({
        thumbs: item.thumbs,
        id: item.id,
        url: item.thumbs.original,
      }));
      
      setData(currentData => [...currentData, ...formattedData]);
    } catch (err) {
      setError(err);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => {
      handleItemPress(item);
    }}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.url }}
          style={ styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return <View style={styles.container}>
          <MasonryList
            images={data.map(item => ({ source: { uri: item.url }, data: item }))}
            completeCustomComponent={renderItem}
            columns={2} // 设置列数
            style={styles.listContainer}
            onEndReached={() => {
              setCurrentPage(currentPage + 1)
              fetchData();
              }
            }
          />
      </View>;
}

export default WallpaperList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
  center: {
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
  imageContainer: {
    margin: 5, 
    borderRadius: 10, 
    overflow: 'hidden' 
  },
  image: {
    width: '100%',
    height: 200,
  },
});
