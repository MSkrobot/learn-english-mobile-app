// src/utils/fileUtils.js

import * as FileSystem from 'expo-file-system';
import { translateWord } from '../api/translate';
import { getTranslation } from '../database/db';

export const readTextFile = async (filePath) => {
  try {
    const fileContents = await FileSystem.readAsStringAsync(filePath);
    return fileContents.split(/\s+/); // Podziel tekst na słowa
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

export const processTextFile = async (filePath, db) => {
  const words = await readTextFile(filePath);

  for (let word of words) {
    const translation = await translateWord(word);
    console.log(translation);
    if (translation) {
      await addOrUpdateTranslation(word, translation, db);
    }
  }

  console.log("All words processed and added to database.");
};

export const addOrUpdateTranslation = async (englishWord, polishTranslation, db) => {
  try {
    if (!englishWord || !polishTranslation) {
      return;
    }

    const existingTranslation = await getTranslation(englishWord, db);
    if (existingTranslation) {
      await db.runAsync('UPDATE translations SET polish_translation = ? WHERE english_word = ?', [polishTranslation, englishWord]);
      console.log(`Translation updated for ${englishWord}: ${polishTranslation}`);
    } else {
      await db.runAsync('INSERT INTO translations (english_word, polish_translation) VALUES (?, ?)', [englishWord, polishTranslation]);
      console.log(`Translation added for ${englishWord}: ${polishTranslation}`);
    }
  } catch (error) {
    console.error('Error adding or updating translation:', error);
  }
};
