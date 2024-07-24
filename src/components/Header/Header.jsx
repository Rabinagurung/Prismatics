import { Text, View } from 'react-native';
import { GlobalStyles } from '../../styles/structure';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
  return (
    <SafeAreaView style={{ backgroundColor: GlobalStyles.colors.white }}>
      <View
        style={{
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            color: GlobalStyles.colors.darkGray,
          }}
        >
          Prismatics
        </Text>
      </View>
    </SafeAreaView>
  );
}
