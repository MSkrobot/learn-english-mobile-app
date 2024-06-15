import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('translations.db');
        const isInitialized = await AsyncStorage.getItem('db_initialized');
        if (isInitialized !== 'true') {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS translations (id INTEGER PRIMARY KEY AUTOINCREMENT, english_word TEXT UNIQUE, polish_translation TEXT);
            `);
            console.log('Database initialized');
            await AsyncStorage.setItem('db_initialized', 'true');
            await addSampleTranslations(db);
        }
    } catch (error) {
        console.log('Error initializing database:', error);
    }
};

const addSampleTranslations = async (db) => {
    try {
        await db.execAsync(`
            INSERT INTO translations (english_word, polish_translation) VALUES ('dog', 'pies'), ('cat', 'kot'), ('cock', 'kogut');
        `);
        console.log('Sample translations added');
    } catch (error) {
        console.error('Error adding sample translations:', error);
    }
};

const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('translations.db');
};

// Eksport funkcji getTranslation
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