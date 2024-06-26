// src/components/CustomButton.js

import React from 'react';
import { Text, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';

export default function CustomButton({ label, onPress }) {
    let screenWidth = Dimensions.get('window').width;
    screenWidth = screenWidth > 600 ? screenWidth - 300 : screenWidth - 10;

    return (
        <Pressable
            style={({ pressed }) => [
                commonStyles.button,
                { width: screenWidth },
                pressed && commonStyles.buttonPressed,
            ]}
            onPress={onPress}
            accessibilityRole="button"
        >
            <Text style={commonStyles.buttonText}>{label}</Text>
        </Pressable>
    );
}