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

  const handleProcessFile = async () => {
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
      await handleProcessFile();
    }
  } catch (error) {
    console.log('Error initializing database:', error);
  }

  await printAllTranslations();
};

export const getTranslation = async (word) => {
  try {
    const db = await openDatabase();
    const row = await db.getFirstAsync('SELECT polish_translation FROM translations WHERE english_word = ?', [word]);
    return row ? row.polish_translation : null;
  } catch (error) {
    console.log('Error fetching translation:', error);
    return null;
  }
};

//Sprawdzenie czy dzialczy
export const printAllTranslations = async () => {
    console.log(await getTranslation("cow"));
};