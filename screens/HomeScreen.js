import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TranslationInput from '../components/TranslationInput';
import { initializeDatabase } from '../database/db';

export default function HomeScreen() {
  useEffect(() => {
    initializeDatabase();  // Inicjalizacja bazy danych na ekranie głównym
  }, []);

  return (
    <View style={styles.container}>
      <TranslationInput />
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
