// src/screens/HomeScreen.js

import React from 'react';
import { View, ScrollView, Text, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';

export default function HomeScreen() {
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
              onPress={() => navigation.navigate('Book')}
              accessibilityRole="button"
          >
            <Text style={commonStyles.buttonText}>Choose Book</Text>
          </Pressable>
          <Pressable
              style={({ pressed }) => [
                commonStyles.button,
                { width: screenWidth },
                pressed && commonStyles.buttonPressed,
              ]}
              onPress={() => {}} // Learn button does nothing
              accessibilityRole="button"
          >
            <Text style={commonStyles.buttonText}>Learn</Text>
          </Pressable>
        </ScrollView>
      </View>
  );
}
