import {
  StyleSheet,
  View,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../styles/structure';
import Loading from '../../components/UI/LoadingView';
import { api } from '../../api/users';
import { AuthContext } from '../../store/auth-context';
import BackButton from '../../components/UI/BackButton';

export default function DetailScreen({ route }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const authCtx = useContext(AuthContext);
  const [showToolbar, setshowToolbar] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedImageUri, setDownloadedImageUri] = useState(null);
  const [savingData, setSavingData] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);

  const { item } = route.params;

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
    console.log('Favourite Handler');
    setSavingData(true);
    if (isFavourited) {
      // Remove from favourites
      try {
        await api.deleteUserFavourites(authCtx.userId, item.id);
        setIsFavourited((prev) => !prev);
      } catch (error) {
        console.warn(error);
      }
      setIsFavourited(false);

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

  return (
    <ImageBackground
      resizeMode="cover"
      onLoadStart={() => setIsImageLoaded(true)}
      onLoadEnd={() => setIsImageLoaded(false)}
      style={styles.container}
      source={{ uri: item.large }}
      onPress={() => {
        setshowToolbar(!showToolbar);
      }}
    >
      <BackButton />
      {savingData && <Loading />}
      {isImageLoaded && <Loading />}
      <Pressable style={styles.imageContainer} activeOpacity={1}></Pressable>

      {/* {showToolbar && ( */}
      <View style={styles.toolbar}>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={downloadImage}
        >
          <Icon name="download" size={30} color="#fff" />
        </Pressable>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={favouriteHandler}
        >
          <Icon
            name="heart"
            size={30}
            color={isFavourited ? GlobalStyles.colors.dodgerBlue : '#fff'}
          />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
