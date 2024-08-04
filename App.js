import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/styles/structure';
import { AuthContext, AuthContextProvider } from './src/store/auth-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';

function Root() {
  const authCtx = useContext(AuthContext);
  const [isAppReady, setIsAppReady] = useState(false); //isAppReady: false

  const [loaded, error] = useFonts({
    Billabong: require('./assets/fonts/billabong.ttf'),
  }); //deafault: fasle, async = true

  useEffect(() => {
    (async () => {
      /* getItem of AsyncStorage actually returns promise so, IIFE is used.
        If there is storedToken found in AsyncStorage then, authenticate() of authCtx is called 
        which sets the token in the authCtx. 
        isAuthenticated boolean state depends on the token truthy or falsey value. 
        This state is used to swap between 2 different screen ie: AuthNavigator or MainNavigator.*/

      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

        if (storedToken && storedUserId && storedRefreshToken) {
          authCtx.authenticate(storedToken, storedUserId, storedRefreshToken);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        // eslint-disable-next-line
        setTimeout(() => {
          setIsAppReady(true);
        }, 1000);
      }
    })();
  }, [authCtx]);

  // console.log(isAppReady);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!loaded && !error) {
    // First: true && true -> After async task runs:  true //next: true, true //false
    return null;
  }

  if (!isAppReady)
    return (
      <View style={styles.splashContainer}>
        <LottieView
          source={require('./assets/splash_2.json')}
          style={styles.lottieAnimation}
          autoPlay
          loop
          resizeMode="contain"
        />
        <Text style={styles.prismatics}>Prismatics</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lottieAnimation: {
    height: 150,
    width: 150,
  },

  prismatics: {
    fontFamily: 'Billabong',
    fontSize: 40,
  },
});
