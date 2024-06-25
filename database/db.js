export const addOrUpdateTranslation = async (englishWord, polishTranslation, db, tableName) => {
  try {
    if (!englishWord || !polishTranslation) {
      return;
    }

    const existingTranslation = await getTranslation(englishWord, db, tableName);
    if (existingTranslation) {
      await db.runAsync(`UPDATE ${tableName} SET polish_translation = ? WHERE english_word = ?`, [polishTranslation, englishWord]);
      console.log(`Translation updated for ${englishWord}: ${polishTranslation}`);
    } else {
      await db.runAsync(`INSERT INTO ${tableName} (english_word, polish_translation) VALUES (?, ?)`, [englishWord, polishTranslation]);
      console.log(`Translation added for ${englishWord}: ${polishTranslation}`);
    }
  } catch (error) {
    console.error('Error adding or updating translation:', error);
  }
};

export const getTranslation = async (word, db, tableName) => {
  try {
    const row = await db.getFirstAsync(`SELECT polish_translation FROM ${tableName} WHERE english_word = ?`, [word]);
    return row ? row.polish_translation : null;
  } catch (error) {
    console.log('Error fetching translation:', error);
    return null;
  }
};

export const printTables = async (db) => {
  try {
    const tables = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table'`);
    console.log('Tables in the database:', tables);
    for (const table of tables) {
      console.log(`Structure of table ${table.name}:`);
      const structure = await db.getAllAsync(`PRAGMA table_info(${table.name})`);
      console.log(structure);
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
  }
};

export const printAllTranslations = async (db, tableName) => {
  try {
    console.log(`Printing all translations from ${tableName}:`);
    const allRows = await db.getAllAsync(`SELECT english_word, polish_translation FROM ${tableName}`);
    allRows.forEach(row => {
      if (row.english_word && row.polish_translation) {
        console.log(`${row.english_word}: ${row.polish_translation}`);
      }
    });
  } catch (error) {
    console.log('Error printing translations:', error);
  }
};

export const removeNullTranslations = async (db, tableName) => {
  try {
    await db.runAsync(`DELETE FROM ${tableName} WHERE english_word IS NULL OR polish_translation IS NULL`);
    console.log('Removed records with NULL values');
  } catch (error) {
    console.log('Error removing null translations:', error);
  }
};

export const deleteAllTranslations = async (db, tableName) => {
  try {
    await db.runAsync(`DELETE FROM ${tableName}`);  // This deletes all records from the table
    console.log(`All translations have been deleted from the ${tableName} table.`);
  } catch (error) {
    console.error('Error deleting all translations:', error);
  }
};