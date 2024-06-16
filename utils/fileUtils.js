// src/utils/fileUtils.js

import * as FileSystem from 'expo-file-system';
import { translateWord } from '../api/translate';
import { openDatabase } from '../database/open';

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
      await addTranslation(word, translation, db);
    }
  }

  console.log("All words processed and added to database.");
};

export const addTranslation = async (englishWord, polishTranslation, db) => {
    try {
      await db.execAsync(`
        INSERT INTO translations (english_word, polish_translation) VALUES (?, ?)
      `, [englishWord, polishTranslation]);
      console.log(`Translation added for ${englishWord}: ${polishTranslation}`);
    } catch (error) {
      console.error('Error adding translation:', error);
    }
  };
