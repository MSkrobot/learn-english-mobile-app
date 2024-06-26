import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BookScreen() {
    const navigation = useNavigation();
    let screenWidth = Dimensions.get('window').width; // Get the screen width
    screenWidth = screenWidth > 600 ? screenWidth - 300 : screenWidth - 10;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { width: screenWidth },
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'translations' })}
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Translations</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { width: screenWidth },
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'because_i_could_not_stop_for_death' })}
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Because I could not stop for Death</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { width: screenWidth },
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate('Translation', { tableName: 'middle_passage' })}
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Middle Passage</Text>
                </Pressable>
                {/* Add more buttons here */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        paddingVertical: 16,
        backgroundColor: '#f0f0f0',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'left',
        backgroundColor: '#e9e9ed',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#5e5e5b',
        shadowColor: '#30302f',
        shadowOpacity: 0,
        shadowRadius: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 4,
        height: 70,
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: '#ddd',
        shadowOpacity: 0.4,
        shadowOffset: { width: 6, height: 2},
    },
    buttonText: {
        color: '#3e3c3c',
        fontSize: 17,
        textAlign: 'center',
    },
});
