import { StyleSheet, View } from 'react-native';
import SearchBar from './SearchBar';
import WallpaperList from './WallpaperList';

export default function HomeOutput() {
  return (
    <View>
      <SearchBar />
      <WallpaperList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
