import React from 'react';
import { View, StyleSheet } from 'react-native';
import WallpaperList from '../../components/HomeOuput/WallpaperList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../components/UI/BackButton';

export default function SearchScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const query = route.params?.query;

  return (
    <View style={[styles.container, { maginTop: insets.top }]}>
      <BackButton />
      <WallpaperList searchQuery={query} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
