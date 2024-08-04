import { StyleSheet } from 'react-native';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const GlobalStyles = {
  colors: {
    white: '#FFFFFF',
    lavender: '#DADAF4', // Used in bottom nav
    lightSlateBlue: '#ADADE5', // Used in bottom nav icon
    slateBlue: '#7777F4', // Used in Bottom nav, fav icon in detail screen
    dodgerBlue: '#007AFF', // Used in cancel button for Search
    black: '#000000',
    offWhite: '#EFEFF0', // Used in filter in search screen
    lightGray: '#BFBFC1',
    darkGray: '#5F6368', // Used in icon in detail screen
  },
};

export default styles;

export const paperTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: GlobalStyles.colors.slateBlue,
    ...GlobalStyles.colors,
    outline: GlobalStyles.colors.lightGray,
    onBackground: GlobalStyles.colors.lightGray,
    surfaceDisabled: GlobalStyles.colors.lightSlateBlue,
  },
};
