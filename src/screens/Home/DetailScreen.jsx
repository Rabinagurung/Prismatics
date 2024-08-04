import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as database from '../../database';
import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../styles/structure';
import Loading from '../../components/UI/LoadingView';
import { api } from '../../api/users';

import { AuthContext } from '../../store/auth-context';
import { Snackbar } from 'react-native-paper';

export default function DetailScreen({ route }) {
  const authCtx = useContext(AuthContext);
  const [showToolbar, setshowToolbar] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedImageUri, setDownloadedImageUri] = useState(null);
  const [savingData, setSavingData] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);

  const { item } = route.params;

  //console.log('Received Item: ', item);

  // Load favourites when the screen is in focus or item.id changes
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await api.isFavourite(authCtx.userId, item.id);
          setIsFavourited(true);
        } catch (_) {}
      })();
    }, [item.id, authCtx.userId])
  );

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const downloadImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'You need to grant media library permissions to save the image.'
      );
      return;
    }

    const image_URL = item.large;
    //console.log(image_URL);
    const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';

    const downloadResumable = FileSystem.createDownloadResumable(
      image_URL,
      fileUri,
      {},
      ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const progress = totalBytesWritten / totalBytesExpectedToWrite;
        //console.log(progress);

        setDownloadProgress(progress);
      }
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      setDownloadedImageUri(uri); // Save the URI to state
      // Save the image to the media library
      const asset = await MediaLibrary.createAssetAsync(uri);

      await MediaLibrary.createAlbumAsync('Download', asset, false);

      const downloadData = {
        id_API: item.id,
        image_URL_large: item.large,
        image_URL_small: item.uri,
      };
      try {
        const response = await api.addUserDownloads(
          authCtx.userId,
          downloadData
        );
        console.log(response);
      } catch (error) {
        console.warn(error);
      }

      Alert.alert(
        'Success',
        'Image Downloaded and Saved to Photos. You can set it as wallpaper now.'
      );
    } catch (e) {
      Alert.alert('Error', 'Image Download Failed.');
      console.error(e);
    }
  };

  // When user clicked on the favourites button
  const favouriteHandler = async () => {
    setSavingData(true);
    if (isFavourited) {
      // Remove from favourites
      try {
        await api.deleteUserFavourites(authCtx.userId, item.id);
        setIsFavourited((prev) => !prev);
      } catch (error) {
        console.warn(error);
      }
      await database.remove(authCtx.userId, item.id);
      setIsFavourited(false);

      Snackbar({});
      Alert.alert('Success', 'Image removed from your favourites!');
    } else {
      // Add to favourites
      const data = {
        id_API: item.id,
        image_URL_large: item.large,
        image_URL_small: item.uri,
      };

      //add user fav documents in firestore databse
      try {
        await api.addUserFavourites(authCtx.userId, data);
        setIsFavourited(true);
        Alert.alert('Success', 'Image added to your favourites!');
      } catch (_) {}
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
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      {showToolbar && (
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={downloadImage}>
            <Icon name="download" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={favouriteHandler}>
            <Icon
              name="heart"
              size={30}
              color={isFavourited ? GlobalStyles.colors.dodgerBlue : '#fff'}
            />
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
