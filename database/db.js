// src/database/db.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { processTextFile } from '../utils/fileUtils';
import * as FileSystem from 'expo-file-system';
import { openDatabase } from './open';

const saveTextFile = async () => {
  const filePath = FileSystem.documentDirectory + 'example.txt';
  const content = "Random text to be translated cat dog gay cow";

  try {
    await FileSystem.writeAsStringAsync(filePath, content);
    console.log("Plik zapisany pomyślnie:", filePath);
  } catch (error) {
    console.error("Błąd zapisywania pliku:", error);
  }
};

const handleProcessFile = async (db) => {
  const filePath = FileSystem.documentDirectory + 'example.txt';
  await processTextFile(filePath, db);
};

export const initializeDatabase = async () => {
  try {
    const db = await openDatabase();
    const isInitialized = await AsyncStorage.getItem('db_initialized');
    if (isInitialized !== 'true') {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS translations (id INTEGER PRIMARY KEY AUTOINCREMENT, english_word TEXT UNIQUE, polish_translation TEXT);
      `);
      console.log('Database initialized');
      await AsyncStorage.setItem('db_initialized', 'true');
      await saveTextFile();
      await handleProcessFile(db);
    }
    //await removeNullTranslations(db);
    await printAllTranslations(db);
  } catch (error) {
    console.log('Error initializing database:', error);
  }
};

export const getTranslation = async (word, db) => {
  try {
    const row = await db.getFirstAsync('SELECT polish_translation FROM translations WHERE english_word = ?', [word]);
    return row ? row.polish_translation : null;
  } catch (error) {
    console.log('Error fetching translation:', error);
    return null;
  }
};

export const printAllTranslations = async (db) => {
  try {
    const allRows = await db.getAllAsync('SELECT english_word, polish_translation FROM translations');
    allRows.forEach(row => {
      if (row.english_word && row.polish_translation) {
        console.log(`${row.english_word}: ${row.polish_translation}`);
      }
    });
  } catch (error) {
    console.log('Error printing translations:', error);
  }
};

export const removeNullTranslations = async (db) => {
  try {
    await db.runAsync('DELETE FROM translations WHERE english_word IS NULL OR polish_translation IS NULL');
    console.log('Removed records with NULL values');
  } catch (error) {
    console.log('Error removing null translations:', error);
  }
};
