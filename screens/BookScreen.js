// src/screens/BookScreen.js

import React from 'react';
import { View, ScrollView, Text, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';

export default function BookScreen() {
    const navigation = useNavigation();
    let screenWidth = Dimensions.get('window').width;
    screenWidth = screenWidth > 600 ? screenWidth - 300 : screenWidth - 10;

    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
                <Pressable
                    style={({ pressed }) => [
                        commonStyles.button,
                        { width: screenWidth },
                        pressed && commonStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'translations' })}
                    accessibilityRole="button"
                >
                    <Text style={commonStyles.buttonText}>Translations</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        commonStyles.button,
                        { width: screenWidth },
                        pressed && commonStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'because_i_could_not_stop_for_death' })}
                    accessibilityRole="button"
                >
                    <Text style={commonStyles.buttonText}>Because I could not stop for Death</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        commonStyles.button,
                        { width: screenWidth },
                        pressed && commonStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'middle_passage' })}
                    accessibilityRole="button"
                >
                    <Text style={commonStyles.buttonText}>Middle Passage</Text>
                </Pressable>
                {/* Add more buttons here */}
            </ScrollView>
        </View>
    );
}
