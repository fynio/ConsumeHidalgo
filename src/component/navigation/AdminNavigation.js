import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RNRestart from 'react-native-restart';
import { SafeAreaView, ScrollView, StyleSheet, Image, Text, View, Pressable } from 'react-native';

// import Inicio from '../../src/component/Inicio';
// import Perfil from '../../src/component/perfil';
// import Productos from '../../src/component/productos';
// import Servicios from '../../src/component/servicios';
// import Contacto from '../../src/component/contacto';
// import Aviso from '../../src/component/aprivacidad';
import Prueba from '../../src/component/prueba';
import AprobarDatos from '../../src/component/admin/aprobardatos';
import Graficas from '../../src/component/admin/graficas';
import NegociosAprobados from '../../src/component/admin/negociosaprobados';



// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const AdminNavigation = () => {

  function LogoTitle() {
    return (
      <View style={{flexDirection: 'row', flex:1}}>
        
        
        <View style={{ width:'100%', paddingHorizontal:'0%', justifyContent:'center'}}>
          <Text style={{color:'#FFF', fontFamily:'Izmir-Heavy', fontSize:15, letterSpacing:2}}>
            Consume Hidalgo
          </Text>
        </View>
        
       

      </View>      
    );
  }

  return (
    <NavigationContainer independent={true}>      
      <Drawer.Navigator initialRouteName="Inicio" screenOptions={{ 
        headerStyle: {
            backgroundColor: '#620C31'
        }, headerTintColor: '#fff', 
      }}>
        <Drawer.Screen icon="home" name="Inicio" component={AprobarDatos}  options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
        {/* <Drawer.Screen name="Aprobados" component={NegociosAprobados} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
        <Drawer.Screen name="Graficas" component={Graficas} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
        <Drawer.Screen name="Cerrar sesión" component={Prueba} options={{ headerShown: false }} /> */}
        {/*<Drawer.Screen name="Aviso de privacidad"  component={Aviso} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} /> */}
       </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({ });

export default AdminNavigation;




