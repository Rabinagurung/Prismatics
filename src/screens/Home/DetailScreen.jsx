import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as database from '../../database';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../styles/structure';
import Loading from '../../components/UI/LoadingView';

export default function DetailScreen({ route }) {
  const [showToolbar, setshowToolbar] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const { item } = route.params;

  //Load favourites when the component is focused or item.id changes
  useEffect(() => {
    (async () => {
      const favourites = await database.load();
      const isFav = favourites.some(fav => fav.id_API === item.id);
      setIsFavourited(isFav);
    })()
  }, [item.id])

  //Load favourites when the screen is in focus or item.id changes
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const favourites = await database.load();
        const isFav = favourites.some(fav => fav.id_API === item.id);
        setIsFavourited(isFav);
      })()
    }, [item.id])
  );

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const downloadImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'You need to grant media library permissions to save the image.');
      return;
    }

    const image_URL = item.large;
    console.log(image_URL);
    const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';

    const downloadResumable = FileSystem.createDownloadResumable(
      image_URL,
      fileUri,
      {},
      ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const progress = totalBytesWritten / totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      }
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      setDownloadedImageUri(uri); // Save the URI to state

      // Save the image to the media library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Success', 'Image Downloaded and Saved to Photos. You can set it as wallpaper now.');
    } catch (e) {
      Alert.alert('Error', 'Image Download Failed.');
      console.error(e);
    }
  };

  // When user clicked on the favourites button
  const favouriteImage = async () => {
    setSavingData(true);
    if (isFavourited) {
      // Remove from favourites
      const favourites = await database.load();
      const favItem = favourites.find(fav => fav.id_API === item.id);
      if (favItem) {
        await database.remove(favItem.id);
        setIsFavourited(false);
        Alert.alert('Success', 'Image removed from your favourites!');
      }
    } else {
      // Add to favourites
      const data = {
        id_API: item.id,
        image_URL_large: item.large,
        image_URL_small: item.uri,
      };
      const id = await database.save(data);
      if (id) {
        setIsFavourited(true);
        Alert.alert('Success', 'Image added to your favourites!');
      } else {
        Alert.alert('Failed', 'Image did not get added to your favourites.');
      }
    }
    setSavingData(false);
  };

  if (savingData) {
    return (
      <View style={styles.imageContainer}>
        <Loading />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          setshowToolbar(!showToolbar);
        }}
        activeOpacity={1}
      >
        <Image
          source={{ uri: item.large }}
          style={styles.image}
          resizeMode="contain">
        </Image>
      </TouchableOpacity>
      {showToolbar && (
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={downloadImage}>
            <Icon name="download" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={favouriteImage}>
            <Icon name="heart" size={30} color={isFavourited ? GlobalStyles.colors.dodgerBlue : "#fff"} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
