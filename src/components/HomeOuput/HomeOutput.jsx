import { StyleSheet, View } from 'react-native';
import WallpaperList from './WallpaperList';

export default function HomeOutput({ navigation }) {
  return (
    <View style={styles.container}>
      <WallpaperList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
