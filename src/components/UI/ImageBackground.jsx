import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const withBackground = (Component) => {
  const WrappedComponent = (props) => (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <Component {...props} />
    </ImageBackground>
  );

  WrappedComponent.displayName = `withBackground(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default withBackground;
