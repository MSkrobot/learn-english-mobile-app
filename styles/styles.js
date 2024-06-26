// styles/styles.js

import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        paddingVertical: 70,
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
        shadowOffset: { width: 6, height: 2 },
    },
    buttonText: {
        color: '#3e3c3c',
        fontSize: 17,
        textAlign: 'center',
    },
});
