import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InicioAdministracion from './Administracion/InicioAdministracion';
import ValidarEmpresas from './Administracion/ValidarEmpresas';
import EmpresasAprobadas from './Administracion/EmpresasAprobadas';
//import Estadisticas from './Administracion/Estadisticas';
import CerrarSesion from '../CerrarSesion';
import IniciarSesion from './../IniciarSesion';
import RecuperarContrasena from  './../RecuperarContrasena';
import Principal from './../Principal';
import Registrarme from './../Registrarme'; 
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

 
import AppNavigation from  './AppNavigation'; 
 

function Root({navigation}) {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Administracion" component={InicioAdministracion} />
        <Drawer.Screen name="Validar empresas" component={ValidarEmpresas} />
        <Drawer.Screen name="Empresas aprobadas" component={EmpresasAprobadas} />
        
        <Drawer.Screen name="Cerrar sesion" component={CerrarSesion} />
      
    </Drawer.Navigator>
  ); 
}

function App({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator   initialRouteName="InicioAdministracion"  screenOptions={{ 
        headerShown: false, 
        headerStyle: {
            backgroundColor: '#3e4144'
        }, headerTintColor: '#fff', 
      }} >
        <Stack.Screen  name="Consume Hidalgo" component={Root} />
        <Stack.Screen  name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen  name="AdminNavigation" component={Root} />
        <Stack.Screen  name="Principal" component={Principal} />
        <Stack.Screen  name="Registrarme" component={Registrarme} />

        <Stack.Screen  name="AppNavigation" component={AppNavigation} />
        
        <Stack.Screen  name="RecuperarContrasena" component={RecuperarContrasena} />

        

      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default App;
