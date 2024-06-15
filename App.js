import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { initializeDatabase } from './database/db';
import { name as appName } from './app.json'; // Upewnij się, że ta nazwa odpowiada nazwie w pliku app.json

const App = () => {
  useEffect(() => {
    initializeDatabase();  // Inicjalizacja bazy danych przy starcie aplikacji
  }, []);

  return <HomeScreen />;
};

AppRegistry.registerComponent(appName, () => App);

export default App;
