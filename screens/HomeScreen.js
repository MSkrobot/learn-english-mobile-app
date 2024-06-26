// src/screens/HomeScreen.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { commonStyles } from '../styles/styles';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
      <View style={commonStyles.container}>
        <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
          <CustomButton label="Choose Book" onPress={() => navigation.navigate('Book')} />
          <CustomButton label="Learn" onPress={() => {}} />
        </ScrollView>
      </View>
  );
}
