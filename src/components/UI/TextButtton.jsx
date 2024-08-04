import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../styles/structure';

export default function TextButton({ text, title, onPress }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.textButton}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  textButton: {
    color: GlobalStyles.colors.slateBlue,
  },
});
