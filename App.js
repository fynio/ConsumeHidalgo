
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminNavigation from './src/component/navigation/AdminNavigation'
import AppNavigation from './src/component/navigation/AppNavigation'
import IniciarSesion from './src/component/IniciarSesion';
import Principal from './src/component/Principal';
import Registrarme from './src/component/Registrarme'; 
import Contacto from './src/component/Contacto'; 
import Password from './src/component/RecuperarContrasena';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
DefaultTheme.colors.accent = '#6F7271';
DefaultTheme.colors.primary = '#3e4144';

const App = () =>{
  const Stack = createNativeStackNavigator();  
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen name="Registrarme" component={Registrarme} />
        <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
        <Stack.Screen name="RecuperarContrasena" component={Password} />
        <Stack.Screen name="Contacto" component={Contacto} /> 
        <Stack.Screen name="AppNavigation" component={AppNavigation} /> 
      </Stack.Navigator>
    </NavigationContainer>                       
    );
};
export default App;


