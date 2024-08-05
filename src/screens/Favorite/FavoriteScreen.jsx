import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/UI/LoadingView';
import { api } from '../../api/users';
import { AuthContext } from '../../store/auth-context';
import WallListItem from '../../components/HomeOuput/WallpaperListItem';
import MasonryList from '@react-native-seoul/masonry-list';

export default function FavoriteScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const userId = authCtx.userId;

  console.log(data);
  //Add favourite list
  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        console.log('Check');
        try {
          const loadedFavouritesData = await api.getUserFavourites(userId);
          console.log('dcd', loadedFavouritesData?.documents?.length);
          const formattedData =
            loadedFavouritesData?.documents?.map((item) => {
              return {
                id: item.fields.id_API.stringValue,
                large: item.fields.image_URL_large.stringValue,
                uri: item.fields.image_URL_small.stringValue,
              };
            }) ?? [];

          console.log(formattedData);
          setData(formattedData);
        } catch (err) {
          console.warn(err);
        } finally {
          setLoading(false);
        }
      })();
    }, [userId])
  );

  // const fetchFavourites = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const loadedFavouritesData = await api.getUserFavourites(userId);
  //     console.log('dcd', loadedFavouritesData.documents.length);
  //     const formattedData = loadedFavouritesData.documents.map((item) => {
  //       return {
  //         id: item.fields.id_API.stringValue,
  //         large: item.fields.image_URL_large.stringValue,
  //         uri: item.fields.image_URL_small.stringValue,
  //       };
  //     });

  //     setData(formattedData);
  //   } catch (_) {
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [userId]);

  //Load favourites list whenever the screen is in focus
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchFavourites();
  //   }, [fetchFavourites])
  // );

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <MasonryList
        data={data}
        numColumns={2}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <WallListItem item={item} navigation={navigation} />
        )}
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
