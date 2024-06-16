// src/components/TranslationInput.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getTranslation } from '../database/db';
import { openDatabase } from '../database/open';


export default function TranslationInput() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const handleTranslate = async () => {
    const db = await openDatabase();  
    const result = await getTranslation(word, db);
    if (result) {
      setTranslation(result);
    } else {
      console.log("No translation found.");
      setTranslation('No translation found.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={word}
        onChangeText={setWord}
        placeholder="Enter an English word"
      />
      <Button title="Translate" onPress={handleTranslate} />
      <Text style={styles.translation}>{translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  translation: {
    marginTop: 20,
  },
});
