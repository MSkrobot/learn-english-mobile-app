// src/screens/TranslationScreen.js

import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import TranslationInput from '../components/TranslationInput';
import { openDatabase, openTable } from '../database/open';
import { commonStyles } from '../styles/styles';

export default function TranslationScreen({ route, navigation }) {
    const { tableName } = route.params;
    const [db, setDb] = useState(null);
    const [isTableReady, setIsTableReady] = useState(false);
    const [textContent, setTextContent] = useState('');

    useEffect(() => {
        const initializeDatabase = async () => {
            const database = await openDatabase();
            const text = await openTable(database, tableName);
            setDb(database);
            setTextContent(text);
            setIsTableReady(true);
        };

        initializeDatabase();
    }, [tableName]);

    return (
        <View style={commonStyles.container}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            {db && isTableReady && <TranslationInput db={db} tableName={tableName} textContent={textContent} />}
        </View>
    );
}
