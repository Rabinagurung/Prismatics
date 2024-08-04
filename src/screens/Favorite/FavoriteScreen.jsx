import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as database from '../../database';
import MasonryList from 'react-native-masonry-list';
import Loading from '../../components/UI/LoadingView';

export default function FavoriteScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //Load favourites list 
  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const loadedData = await database.load();
      const formattedData = loadedData.map(item => ({
        uri: item.image_URL_small,
        large: item.image_URL_large,
        id: item.id_API,
      }));
      setData(formattedData);
    } catch (error) {
      Alert.alert('Error', 'There was an error loading the favourites page. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  //Load favourites list whenever the screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      fetchFavourites();
    }, [])
  );

  const handleItemPress = (item) => {
    navigation.navigate('DetailScreen', { item });
  };

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
          <Loading />
        </View>
      ) : (
        <MasonryList
          images={data}
          onPressImage={handleItemPress}
          columns={2}
          style={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
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