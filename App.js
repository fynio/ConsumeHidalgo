
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {Button, TextInput, Text, View, Image, TouchableOpacity} from 'react-native';

import IniciarSesion from './src/component/IniciarSesion';
import Registrarme from './src/component/Registrarme'; 

 import AppNavigation from './app/navigation/AppNavigation';
//import AdminNavigation from './app/navigation/AdminNavigation';


const Option1 = () => <View><Text>Opción 1</Text><Text>Opción 1</Text><Text>Opción 1</Text></View>;

const Option2 = () => <View><Text>Opción 2</Text></View>;
const Menu = () => <View><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text><Text>Menú</Text></View>;

// import Acceso from './views/acceso';
// import AppNavigation from './app/navigation/AppNavigation';
// import AdminNavigation from './app/navigation/AdminNavigation';
// import Registrar from './views/registrar';
// import Password from './views/password';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
DefaultTheme.colors.accent = '#BC945B';
DefaultTheme.colors.primary = '#620C31';

const App = () =>{
  const Stack = createNativeStackNavigator();  
    return (
      <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
 
      <Stack.Screen name="AppNavigation" component={AppNavigation} /> 
      <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen name="Registrarme" component={Registrarme} />

         {/*    <Stack.Screen name="AdminNavigation" component={AdminNavigation} /> */}

       {/* <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Password" component={Password} /> */}

      </Stack.Navigator>
    </NavigationContainer>                       
    );
};
export default App;


