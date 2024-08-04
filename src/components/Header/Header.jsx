import { Text, View } from 'react-native';
import { GlobalStyles } from '../../styles/structure';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
  return (
    <SafeAreaView style={{ backgroundColor: GlobalStyles.colors.white }}>
      <View
        style={{
          // backgroundColor: 'red',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginHorizontal: 16,
          backgroundColor: 'red',
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: 'Billabong',
            color: GlobalStyles.colors.black,
          }}
        >
          Prismatics
        </Text>
      </View>
    </SafeAreaView>
  );
}
