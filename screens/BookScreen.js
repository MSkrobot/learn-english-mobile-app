// src/screens/BookScreen.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { commonStyles } from '../styles/styles';

export default function BookScreen() {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
                <CustomButton label="Translations" onPress={() => navigation.navigate('Translation', { tableName: 'translations' })} />
                <CustomButton label="Because I could not stop for Death" onPress={() => navigation.navigate('Translation', { tableName: 'because_i_could_not_stop_for_death' })} />
                <CustomButton label="Middle Passage" onPress={() => navigation.navigate('Translation', { tableName: 'middle_passage' })} />
            </ScrollView>
        </View>
    );
}
