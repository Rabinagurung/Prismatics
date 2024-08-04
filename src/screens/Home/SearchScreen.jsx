import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SearchBar from '../../components/HomeOuput/SearchBar';
import WallpaperList from '../../components/HomeOuput/WallpaperList';

export default function SearchScreen({ route, navigation }) {
  const [query, setQuery] = useState(route.params?.query || '');
  navigation.setOptions({
    title: query ? `Search results for: ${query}` : 'Search results',
  });

  useEffect(() => {
    if (route.params?.query) {
      setQuery(route.params.query);
    }
  }, [route.params?.query]);

  return (
    <View style={styles.container}>
      <WallpaperList searchQuery={query} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
