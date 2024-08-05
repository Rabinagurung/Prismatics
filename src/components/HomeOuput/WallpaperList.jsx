import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import WallListItem from './WallpaperListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WallpaperList = ({ searchQuery, navigation }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const insets = useSafeAreaInsets();

  const fetchData = useCallback(async () => {
    setIsLoadingNext(true);

    try {
      const queryParam = searchQuery
        ? `&q=${encodeURIComponent(searchQuery)}`
        : '';

      //const queryParam_2 = `&categories=111&purity=100&sorting=random&ratios=9x16,10x16&resolutions=1080x1920,720x1280,1440x2560&per_page=10`;

      const response = await fetch(
        `https://wallhaven.cc/api/v1/search?page=${currentPage}${queryParam}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const formattedData = data.data.map((item) => ({
        uri: item.thumbs.small,
        large: item.path,
        id: item.id,
      }));
      setData((prevData) => [...prevData, ...formattedData]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoadingNext(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <MasonryList
        data={data}
        numColumns={2}
        style={[
          styles.listContainer,
          { marginTop: searchQuery ? insets.top : 0 },
        ]}
        renderItem={({ item }) => (
          <WallListItem item={item} navigation={navigation} />
        )}
        onEndReached={() => {
          setCurrentPage((prevPage) => prevPage + 1);
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
    marginTop: 90,
    backgroundColor: 'white',
  },
});

export default WallpaperList;
