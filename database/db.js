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


export const printTables = async (db) => {
  try {
    const tables = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'");
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
    console.log('Printing all translations: ');
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

export const deleteAllTranslations = async (db) => {
  try {
    await db.runAsync('DELETE FROM translations');  // This deletes all records from the table
    console.log('All translations have been deleted from the database.');
  } catch (error) {
    console.error('Error deleting all translations:', error);
  }
};