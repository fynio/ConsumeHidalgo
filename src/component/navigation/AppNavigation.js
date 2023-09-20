import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Usuario/Inicio';
import Productos from './Usuario/productos';
import Servicios from './Usuario/servicios';
import Prueba from './../Prueba';
import IniciarSesion from './../IniciarSesion';
import Principal from './../Principal';
import Registrarme from './../Registrarme'; 
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

 
 

function Root({navigation}) {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Inicio" component={Inicio} />
       <Drawer.Screen name="Productos" component={Productos} />
     <Drawer.Screen name="Servicios" component={Servicios} /> 
        
        <Drawer.Screen name="Cerrar sesion" component={Prueba} />
      
    </Drawer.Navigator>
  ); 
}

function App({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator   initialRouteName="Inicio"  screenOptions={{ 
        headerShown: false, 
        headerStyle: {
            backgroundColor: '#620C31'
        }, headerTintColor: '#fff', 
      }} >
        <Stack.Screen  name="Consume Hidalgo" component={Root} />
        <Stack.Screen  name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen  name="AppNavigation" component={Root} />
        <Stack.Screen  name="Principal" component={Principal} />
        <Stack.Screen  name="Registrarme" component={Registrarme} />

        

      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default App;
