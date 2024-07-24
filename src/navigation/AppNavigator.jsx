import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { GlobalStyles } from '../styles/structure';
import { useAuthentication } from '../components/Authorization/useAuthetication';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GlobalStyles.colors.white,
  },
};

export default function AppNavigator() {
  const user = useAuthentication();
  return (
    <NavigationContainer theme={theme}>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
