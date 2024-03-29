import React  from 'react'; 
import Bolsa from '../../bolsa';
import { Button } from 'react-native-paper';
import { BackHandler } from 'react-native';
import {
  SafeAreaView,
  ScrollView,  
  StyleSheet,
  Text,
  View,  
} from 'react-native';
// Configura una función para manejar las flechas de retroceso del sistema
const handleBackButton = () => {
  // Devuelve true para prevenir el comportamiento predeterminado de retroceso
  return true;
};


const Inicio = ( { navigation }) => {  

  BackHandler.addEventListener('hardwareBackPress', handleBackButton);
 
  const irProductos = ()=>{  navigation.navigate("Productos") }
  const irServicios = ()=>{  navigation.navigate("Servicios") }

  return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView>
          <Bolsa/>
          <View style={{flex:1, marginTop:'5%'}}>
            <Text style={styles.azul}>Encuentra <Text style={styles.azul}>todo</Text> lo que necesitas</Text>
            <Text style={styles.sesion}>Conoce los mejores precios, servicios y negocios. Haz trato con proveedores de tu localidad o municipio. Promocionate y apoya la compra y consumo local.</Text>
            
    {/* fin de botones parte 1 */}
            <Text style={styles.azul}>Comprar o Solicitar un <Text style={styles.azul}>servicio</Text></Text>          
            <Text  style={styles.azulProductos}>Productos:</Text>
            <Text style={styles.sesion}>En esta sección encontrarás negocios, productos disponibles y podrás ponerte en contacto con la empresas de tu municipio y hacer tu compra.</Text>
            <Text style={styles.azulServicios}>Servicios:</Text>
            <Text style={styles.sesion}>En esta sección encontrarás servicios disponibles y podrás ponerte en contacto con la empresas de tu municipio y solicitar un servicio.</Text>
    {/* botones parte 2 */}
            <View style={styles.rowEnd}>
              <View style={[styles.Vw_1, styles.Vw_2]}>
                <Button 
                    style={{ marginTop: '5%'}}
                    icon="basket"
                    mode="contained"                  
                    onPress={() => irProductos()}>
                    Productos
                </Button>                
              </View>
              <View style={[styles.Vw_1]}>
              <Button 
                    style={{ marginTop: '5%'}}
                    icon="basket-fill"
                    mode="contained"                  
                    onPress={() => irServicios()}>
                    Servicios
                </Button>               
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
azul:{
  marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#3e4144', letterSpacing: 1
},
azulProductos:{
  marginTop:'-2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#3e4144', letterSpacing: 1
},

azulServicios:{
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
