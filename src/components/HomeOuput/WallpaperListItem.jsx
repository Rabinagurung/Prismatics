import { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const WallListItem = ({ item, navigation }) => {
  const handleItemPress = useCallback(() => {
    navigation.navigate('DetailScreen', { item });
  }, [item, navigation]);

  const randomHeight = useMemo(() => {
    const heights = [100, 150, 200, 250, 300];
    return heights[Math.floor(Math.random() * heights.length)];
  }, []);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.imageContainer,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={handleItemPress}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          height: randomHeight,
          alignSelf: 'stretch',
        }}
        contentFit="cover"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
});
export default WallListItem;
