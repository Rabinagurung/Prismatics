import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MasonryList from 'react-native-masonry-list';
import Loading from '../../components/UI/LoadingView';
import { api } from '../../api/users';
import { AuthContext } from '../../store/auth-context';

export default function FavoriteScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const userId = authCtx.userId;

  //Add favourite list
  const fetchFavourites = useCallback(async () => {
    setLoading(true);
    try {
      const loadedFavouritesData = await api.getUserFavourites(userId);

      const formattedData = loadedFavouritesData.documents.map((item) => {
        return {
          id: item.fields.id_API.stringValue,
          large: item.fields.image_URL_large.stringValue,
          uri: item.fields.image_URL_small.stringValue,
        };
      });

      setData(formattedData);
    } catch (_) {
    } finally {
      setLoading(false);
    }
  }, [userId]);

  //Load favourites list whenever the screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      fetchFavourites();
    }, [fetchFavourites])
  );

  const handleItemPress = (item) => {
    //console.log('Items from Favourite screen to Detail Screen: ', item);
    navigation.navigate('DetailScreen', { item });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <MasonryList
        images={data}
        onPressImage={handleItemPress}
        columns={2}
        style={styles.listContainer}
      />
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
