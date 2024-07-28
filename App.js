import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/styles/structure';

export default function App() {
  return (
    <>
      <PaperProvider theme={paperTheme}>
        <StatusBar />
        <AppNavigator />
      </PaperProvider>
    </>
  );
}

/**I hac */
