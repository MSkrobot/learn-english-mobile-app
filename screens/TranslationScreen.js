import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import TranslationInput from '../components/TranslationInput';
import { openDatabase, openTable } from '../database/open';

export default function TranslationScreen({ route, navigation }) {
    const { tableName } = route.params;
    const [db, setDb] = useState(null);
    const [isTableReady, setIsTableReady] = useState(false);

    useEffect(() => {
        const initializeDatabase = async () => {
            const database = await openDatabase();
            await openTable(database, tableName);
            setDb(database);
            setIsTableReady(true);
        };

        initializeDatabase();
    }, [tableName]);

    return (
        <View style={styles.container}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            {db && isTableReady && <TranslationInput db={db} tableName={tableName} />}
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
