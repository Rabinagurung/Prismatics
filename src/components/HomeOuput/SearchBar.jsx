import { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/structure';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchScreen', {
        query: searchQuery,
      });
    } else {
      Alert.alert('Search', 'Please enter a search term.');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-sharp"
        size={18}
        color={GlobalStyles.colors.darkGray}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={GlobalStyles.colors.darkGray}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearchSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dadee2',
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    placeholderTextColor: 'red',
  },
});
