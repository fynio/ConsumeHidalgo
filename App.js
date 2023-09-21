
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, View,} from 'react-native';
import AdminNavigation from './src/component/navigation/AdminNavigation'
import AppNavigation from './src/component/navigation/AppNavigation'
import IniciarSesion from './src/component/IniciarSesion';
import Principal from './src/component/Principal';
import Registrarme from './src/component/Registrarme'; 

 import Contacto from './src/component/Contacto'; 
import Password from './src/component/RecuperarContrasena';



import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
DefaultTheme.colors.accent = '#BC945B';
DefaultTheme.colors.primary = '#620C31';


 

import Inicio from './src/component/navigation/Usuario/Inicio';
import Productos from './src/component/navigation/Usuario/productos';
import Servicios from './src/component/navigation/Usuario/servicios';
import CerrarSesion from './src/component/CerrarSesion';
import RecuperarContrasena from  './src/component/RecuperarContrasena'; 


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();













const App = () =>{
  const Stack = createNativeStackNavigator();  
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen name="Registrarme" component={Registrarme} />
        <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
        <Stack.Screen name="OlvideContrasena" component={Password} />
        <Stack.Screen name="Contacto" component={Contacto} /> 
        <Stack.Screen name="AppNavigation" component={AppNavigation} /> 
      </Stack.Navigator>
    </NavigationContainer>                       
    );
};
export default App;


