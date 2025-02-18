import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const progress = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => navigation.replace('Auth'));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '100%']
        }) }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#ddd',
    marginTop: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2A9D8F',
  }
});
