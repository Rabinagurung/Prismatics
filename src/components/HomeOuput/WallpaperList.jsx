import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MasonryList from 'react-native-masonry-list';

const WallpaperList = ({ searchQuery, navigation }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage]);

  const fetchData = async () => {
    setIsLoadingNext(true);
    try {
      const queryParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''
      const response = await fetch(`https://wallhaven.cc/api/v1/search?page=${currentPage}${queryParam}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data= await response.json();
      const formattedData = data.data.map(item => ({
        uri: item.thumbs.small,
        large: item.thumbs.large,
        id: item.id,
      }));
      setData(prevData => [...prevData, ...formattedData]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoadingNext(false);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('DetailScreen', { item });
  };

  return (
    <View style={styles.container}>
      <MasonryList
        images={data}
        onPressImage={handleItemPress}
        columns={2}
        style={styles.listContainer}
        onEndReached={() => {
          setCurrentPage(prevPage => prevPage + 1);
          fetchData();
        }}
        refreshing={isLoadingNext}
        onRefresh={() => {
          setCurrentPage(1);
          setData([]);
          fetchData();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
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

export default WallpaperList;
