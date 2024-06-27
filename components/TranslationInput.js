import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { getTranslation } from '../database/db';

export default function TranslationInput({ db, tableName, textContent }) {
  const [translation, setTranslation] = useState('');

  const cleanWord = (word) => {
    return word.replace(/[^a-zA-Z]/g, '').toLowerCase();
  };

  const handleTranslate = useCallback(async (word) => {
    const cleanedWord = cleanWord(word);
    const result = await getTranslation(cleanedWord, db, tableName);
    if (result) {
      setTranslation(result);
    } else {
      console.log("No translation found.");
      setTranslation('No translation found.');
    }
  }, [db, tableName]);

  const words = useMemo(() => textContent.split(/\s+/), [textContent]);

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleTranslate(item)}>
        <Text style={styles.word}>{item} </Text>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <FlatList
            data={words}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.textContainer}
            numColumns={1}  // Fixed single column
        />
        <Text style={styles.translation}>{translation}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,  // Padding for the container
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    marginRight: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  translation: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
