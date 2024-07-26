import { StyleSheet, View, Text } from 'react-native';
import SearchBar from './SearchBar';
import WallpaperList from './WallpaperList';

export default function HomeOutput() {
  return (
      <View style={styles.container}>
        {/* <SearchBar /> */}
        <WallpaperList />
      </View>
  );
}


// /**
//  * 
//  * 
//  *     // <View style={styles.container}>
//       {/* <SearchBar /> */}
//       <View>
//         <Text>sdfsdf</Text>
//       </View>
//       {/* <Text>发生的分身乏术</Text> */}
//       {/* <WallpaperList /> */}
//     // </View>
//   /

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});
