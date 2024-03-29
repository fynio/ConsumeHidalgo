import React, {useEffect} from 'react'; 
import Bolsa from '../../bolsa';
import { Button } from 'react-native-paper';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import {
  SafeAreaView,
  ScrollView,  
  StyleSheet,
  Text,
  View,  TouchableOpacity,Linking
} from 'react-native';

// Configura una función para manejar las flechas de retroceso del sistema
const handleBackButton = () => {
  // Devuelve true para prevenir el comportamiento predeterminado de retroceso
  return true;
};


const Inicio =  ( { navigation }) => { 
 

const [token, setToken] = React.useState("");
 
  useEffect(() => {
    getToken();},[]); 


  const getToken = async () => {
 
      const storedToken = await AsyncStorage.getItem('@token');
     await  setToken(storedToken);
    try {

    } catch (error) {
  
        //Estrategia de cache
    }
  }
  
  BackHandler.addEventListener('hardwareBackPress', handleBackButton);
 
  return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView style={{margin:10}}>
          <Bolsa/>
          <View style={{flex:1, marginTop:'5%'}}>
            <Text style={styles.vino}>Bienvenido  <Text style={styles.vino}>administrador</Text></Text>
            <Text style={styles.sesion}>Esta sección servirá para el administrador</Text>
            
            <View >
              <View>
                <Text></Text>        
                <Button 
                    style={{ marginTop: '5%'}}
                    icon="check"
                    mode="contained"                  
                    onPress={() => navigation.navigate("Validar empresas")}>
                    Validar empresas
                </Button>          
                <Text></Text>       
                <Button  
                    icon="domain"
                    mode="contained"                  
                    onPress={() => navigation.navigate("Empresas aprobadas")}>
                  Ver empresas aprobadas
                </Button>                
       
                <Text></Text>        
             
                <TouchableOpacity onPress={() => Linking.openURL("https://consume.hidalgo.gob.mx/estadisticas.php?4dmin=" + token)}> 
                    <Button style={{color:'rgb(0,0,255)'}}  mode="outlined" >
                    Estadisticas
                        </Button> 


                </TouchableOpacity>


              </View>
            
            </View>
            
    {/* fin de botones parte 2 */}
          </View>         
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor:{ 
    flex:1,
    alignItems:'center'
  },   
  sesion:{ 
    marginHorizontal:'5%',
    fontSize:15,
    lineHeight:21,
    textAlign:'justify',
    color:'#000'
  },
  cabecera:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#6F7271', letterSpacing: 1
  },
  cabecera2:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#6F7271', letterSpacing: 1
  },

dorado:{
  backgroundColor:'#65727c'
},
vino:{
  marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#3e4144', letterSpacing: 1
},
vinoProductos:{
  marginTop:'-2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#3e4144', letterSpacing: 1
},

vinoServicios:{
  marginTop:'2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#3e4144', letterSpacing: 1
},
rowEnd: {
  marginTop:'3%',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '5%'
},
 row: {   
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  Vw_1: {
    flex: 1,
    height: 100,
    marginRight:10,
    marginLeft:10,
  },
  Vw_2: {
    marginRight:10,
    marginLeft:10,
  },
  Touchable: {
    backgroundColor: '#3e4144',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width:'80%',
    height:'40%',
    alignItems:'center',
    alignSelf:'center',
    marginTop:'6%',
  },
  TextoBoton:{
    color:'white',
  },


});

export default Inicio;
