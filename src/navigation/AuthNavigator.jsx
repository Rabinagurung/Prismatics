import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Authorization/LoginScreen';
import SignUpScreen from '../screens/Authorization/SignUpScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
