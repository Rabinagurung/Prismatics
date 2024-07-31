import { View, Text } from 'react-native';
import HomeOutput from '../../components/HomeOuput/HomeOutput';
import styles from '../../styles/structure';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <HomeOutput navigation={navigation} />
    </View>
  );
}
