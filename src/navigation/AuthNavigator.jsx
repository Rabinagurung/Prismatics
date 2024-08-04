import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Authorization/LoginScreen';
import SignUpScreen from '../screens/Authorization/SignUpScreen';
import withBackground from '../components/UI/ImageBackground';

const Stack = createNativeStackNavigator();

const LoginScreenWithBackground = withBackground(LoginScreen);
const SignUpScreenWithBackground = withBackground(SignUpScreen);

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreenWithBackground}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreenWithBackground}
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
