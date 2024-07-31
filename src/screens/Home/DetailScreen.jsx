import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';

export default function DetailScreen({route}) {
  const [showToolbar, setshowToolbar] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedImageUri, setDownloadedImageUri] = useState(null);
  const { item } = route.params;

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

    const image_URL = item.thumbs.original;
    console.log(item.thumbs);
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
      Alert.alert('Success', 'Image Downloaded and Saved to Photos.');
    } catch (e) {
      Alert.alert('Error', 'Image Download Failed.');
      console.error(e);
    }
  };

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
          source={{uri:item.thumbs.original}} 
          style={styles.image}
          resizeMode="contain">
        </Image>
      </TouchableOpacity>
      {showToolbar && (
            <View style={styles.toolbar}>
              <TouchableOpacity onPress={downloadImage}>
                <Text>Download</Text>
              </TouchableOpacity>
              <Text>favorite</Text>
              <Text>{downloadProgress}</Text>
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
