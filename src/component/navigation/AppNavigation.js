import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Usuario/Inicio';
import Producto from './Usuario/producto';
import Productos from './Usuario/productos';
function EmptyScreen() {
  return <View />;
}

function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Inicio" component={Inicio} />
      <Drawer.Screen name="Productos" component={Productos} />
      <Stack.Screen name="Settings" component={EmptyScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Consume Hidalgo" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
