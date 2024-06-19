import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const databaseName = 'translationsLocal.db';
const databaseFilePath = `${FileSystem.documentDirectory}${databaseName}`;
const csvFileName = 'translations.csv';
const csvFilePath = `${FileSystem.documentDirectory}${csvFileName}`;

const createFile = async (inputFile, outputFile) => {
  const filePath = FileSystem.documentDirectory + outputFile;
  const asset = Asset.fromModule(require(`../assets/translations.csv`));
  await asset.downloadAsync(); // Ensure the asset is downloaded

  const content = await FileSystem.readAsStringAsync(asset.localUri);

  try {
    await FileSystem.writeAsStringAsync(filePath, content);
    console.log("Plik zapisany pomyślnie:", filePath);
  } catch (error) {
    console.error("Błąd zapisywania pliku:", error);
  }
};

const parseCSV = (csvContent) => {
  const lines = csvContent.split('\n').filter(line => line.trim().length > 0); // Filter out empty lines
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');

    // Ensure the current line has the same number of columns as the header
    if (currentLine.length === headers.length) {
      const obj = {};

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }

      result.push(obj);
    } else {
      console.warn(`Skipping malformed line: ${lines[i]}`);
    }
  }

  return result;
};

const populateDatabase = async (db, parsedCsv) => {
  try {
    const insertPromises = parsedCsv.map(row => {
      const { english_word, polish_translation } = row;
      return db.runAsync('INSERT INTO translations (english_word, polish_translation) VALUES (?, ?)', [english_word, polish_translation])
        .catch(error => {
          if (error.message.includes('UNIQUE constraint failed')) {
            console.log(`Skipping duplicate entry for: ${english_word}`);
          } else {
            throw error;
          }
        });
    });

    await Promise.all(insertPromises);
    console.log('Data inserted into translations table');
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  }
};

export const deleteDatabase = async () => {
  try {
    const dbFileExists = await FileSystem.getInfoAsync(databaseFilePath);
    console.log('Database file exists:', dbFileExists.exists);

    if (dbFileExists.exists) {
      await FileSystem.deleteAsync(databaseFilePath);
      console.log('Database file deleted successfully');
    } else {
      console.log('Database file does not exist, nothing to delete');
    }
  } catch (error) {
    console.error('Error deleting database:', error);
    throw error;
  }
};

//Nie uzywac tej funkcji!!
const checkTableExists = async (db, tableName) => {
  try {
    const result = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    return result.length > 0;
  } catch (error) {
    console.error('Error checking table existence:', error);
    throw error;
  }
};

export const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const tableExists = await checkTableExists(db, 'translations');

    if (!tableExists) {
      console.log('Table does not exists so - Creating database from CSV');
      await createFile(csvFileName, csvFileName);

      const csvData = await FileSystem.readAsStringAsync(csvFilePath);
      const parsedCsv = parseCSV(csvData);

      const db = await SQLite.openDatabaseAsync(databaseName);
      console.log('Database opened');

      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS translations (id INTEGER PRIMARY KEY AUTOINCREMENT, english_word TEXT UNIQUE, polish_translation TEXT);
      `);

      populateDatabase(db, parsedCsv);
      return db;
    }
    console.log('Table does exist');
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};
