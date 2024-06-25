import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TranslationInput from '../components/TranslationInput';
import { openDatabase, openTable } from '../database/open';

export default function HomeScreen() {
  const [db, setDb] = useState(null);
  const [selectedTable, setSelectedTable] = useState('translations');
  const [isTableReady, setIsTableReady] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      const database = await openDatabase();
      setDb(database);
    };

    initializeDatabase();
  }, []);

  const handleTableSelection = async () => {
    if (db) {
      await openTable(db, selectedTable);
      setIsTableReady(true);
    }
  };

  return (
      <View style={styles.container}>
        <Picker
            selectedValue={selectedTable}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue) => setSelectedTable(itemValue)}
        >
          <Picker.Item label="Translations" value="translations" />
          <Picker.Item label="Because I could not stop for Death" value="because_i_could_not_stop_for_death" />
          <Picker.Item label="Middle Passage" value="middle_passage" />
        </Picker>
        <Button title="Load Table" onPress={handleTableSelection} />
        {db && isTableReady && <TranslationInput db={db} tableName={selectedTable} />}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
