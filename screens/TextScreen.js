// src/screens/BookScreen.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { commonStyles } from '../styles/styles';

export default function TextScreen() {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
                <CustomButton label="Translations" onPress={() => navigation.navigate('Translation', { tableName: 'translations' })} />
                <CustomButton label="Casey at the bat" onPress={() => navigation.navigate('Translation', { tableName: 'casey_at_the_bat' })} />
            </ScrollView>
        </View>
    );
}
