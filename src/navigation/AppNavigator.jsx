import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { GlobalStyles } from '../styles/structure';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GlobalStyles.colors.white,
  },
};

export default function AppNavigator() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer theme={theme}>
      {!authCtx.isAuthenticated ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}
