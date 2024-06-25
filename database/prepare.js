import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { openDatabase } from './open';
import { translateWord } from '../api/translate';
import { addOrUpdateTranslation, printAllTranslations, deleteAllTranslations } from './db';



//Czytanie zawartosci przygotowanego pliku w pamieci telefonu
const readTextFile = async (filePath) => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(filePath);
      // Clean up the content: remove non-letter characters and convert to lowercase
      const cleanedContent = fileContents.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
      return cleanedContent.split(/\s+/); // Split the cleaned text into words
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
};
  
//Przetwarzanie zawartosci i dodawanie jej do bazy dancyh
const addFileToDataBase = async (outputFile, db) => {
    const filePath = FileSystem.documentDirectory + outputFile;
    const words = await readTextFile(filePath);
  
    for (let word of words) {
      const translation = await translateWord(word);
      if (translation) {
        // Convert translation to lowercase before adding or updating in the database
        const translationLowerCase = translation.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/g, '').toLowerCase();
        await addOrUpdateTranslation(word, translationLowerCase, db);
      }
    }
  
    console.log("All words processed and added to database.");
};


//Przy dodawaniu nowych plikow wejsciowych do bazy tutaj dodawac nowe case'y
const getAsset = (inputFile) => {
    switch (inputFile) {
        case 'input.txt':
          return require('../assets/input.txt');
        default:
          throw new Error('Invalid input file specified');
      }
};

  
//Zapisywanie pliku z assets/input.txt do pamieci telefonu pod nazwa example.txt
const createFile = async (inputFile, outputFile) => {
  const filePath = FileSystem.documentDirectory + outputFile;
  const asset = Asset.fromModule(getAsset(inputFile));
  await asset.downloadAsync(); // Ensure the asset is downloaded

  const content = await FileSystem.readAsStringAsync(asset.localUri);

  try {
    await FileSystem.writeAsStringAsync(filePath, content);
    console.log("Plik zapisany pomyślnie:", filePath);
  } catch (error) {
    console.error("Błąd zapisywania pliku:", error);
  }
};


//Przerobic jakos sensownie te funkcje
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
      await createFile('input.txt', 'example.txt');
      await addFileToDataBase('example.txt', db);
    }
    //await removeNullTranslations(db);
    //await createFile('input.txt', 'example.txt');
    //await addFileToDataBase('example.txt', db);
    //await deleteAllTranslations(db);
    //await printAllTranslations(db);
  } catch (error) {
    console.log('Error initializing database:', error);
  }
};