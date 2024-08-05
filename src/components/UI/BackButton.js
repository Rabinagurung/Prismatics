import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => [
        styles.back,
        styles.shadow,
        {
          marginTop: insets.top,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Octicons name="arrow-left" size={30} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 15,
    padding: 4,
    zIndex: 100,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BackButton;
