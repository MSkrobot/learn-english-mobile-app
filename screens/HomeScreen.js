// src/components/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TranslationInput from '../components/TranslationInput';
import { openDatabase } from '../database/open';


export default function HomeScreen() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const database = await openDatabase();
      setDb(database);
    };

    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      {db && <TranslationInput db={db} />}
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

