// src/components/HomeScreen.js

import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { initializeDatabase } from '../database/db';



export default function HomeScreen() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Heej</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
