import { View, Text } from 'react-native';
import HomeOutput from '../../components/HomeOuput/HomeOutput';
import styles from '../../styles/structure';
import SearchBar from '../../components/HomeOuput/SearchBar';


export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <SearchBar />
      <HomeOutput navigation={navigation} />
    </View>
  );
}
