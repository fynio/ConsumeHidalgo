import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-paper';

import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,  
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
const EmpresasAprobadas = ( { navigation }) => {
  global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
  useEffect(() => {
    getDatosAprobar();},[]);
  const [validando, setValidando] = React.useState(false);
  
  const [version, setVersion] = React.useState(false);
  const [datos, setDatos] = React.useState([]);
  const [negocio, setNegocio] = React.useState(null);

  const irProductos = ()=>{  navigation.navigate("Productos") }
  const irServicios = ()=>{  navigation.navigate("Servicios") }

  const [extraData, setExtraData] = useState(new Date());
  const [refreshing, setRefreshing] = useState(true);
  const handleRefresh = () => {
      setRefreshing(false), ()=>{getDatosAprobar()};
  }
  const ItemSeparator = () => <View style={{
      height: 1,
      backgroundColor: "rgba(0,0,0,0.1)",
      marginLeft: 0,
      marginRight: 0,
  }}/>

  
  
  useEffect(() => {
    
}, []);


const getDatosAprobar = async () => {
  setDatos([]);
    const storedToken = await AsyncStorage.getItem('@token');
 
    const url = global.url + "negocios_aprobados/";

           
  try {
      const resCat = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      setDatos(resCat.data);
      setRefreshing(false);
      setExtraData(new Date());
  } catch (error) {
    console.log("Ocurrio un error", error);
    setRefreshing(false);
      //Estrategia de cache
  }
}

const _listEmptyComponent = () => {
  return (
      <View style={{ alignItems:'center'}}>
        <Text style={{color:'black', fontWeight:'bold'}}>No hay negocios/servicios por validar</Text>
      </View>
  )
}
const data = []

const regresar = async () => {
  setNegocio(null)
}


const aprobar = async () => {
  setValidando(true)
  
  
  const storedToken = await AsyncStorage.getItem('@token');
 

  const url = global.url + "aprobar_productoServicio/"+negocio.id_ps;
  try {
      const resCat = await axios.post(url, negocio,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      if(resCat.data.codigo == 1){
        setNegocio(null);
        getDatosAprobar();
      }else{
        
        Alert.alert("Fallo al aprobar",
        "Revisa que los datos sean correctos.",
          [ { text: "Aceptar" }]
        );
      }
      setValidando(false)
  } catch (error) {
    
    console.log("Ocurrio un error", error);
    setValidando(false)
      //Estrategia de cache
  }
}

const irDetalle = async (item)=>{
  setLogo(null);
   
 

  try {
    const url = global.url + "aprobar_productoServicio/"+item.id_ps;
  const storedToken = await AsyncStorage.getItem('@token');
 
  console.log(storedToken);


      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      setNegocio(resCat.data);
      setValidando(false)
      if(resCat.data.imagen && resCat.data.imagen.length > 0){
        setLogo({uri:`https://consume.hidalgo.gob.mx/logo_negocio/${resCat.data.imagen}`})
      }
  } catch (error) {
    console.log("Ocurrio un error irDetalle", error);
    setValidando(false)
    
  }
  
  
}
var [logo,setLogo] = useState({});

  return (
      <SafeAreaView style={styles.contenedor}>
        <View style={{
              width:'100%',
              height:'100%',
              flex: 1,
            }}>
          { negocio?<ScrollView style={{padding:8}}>
            <Text  style={[{ color:'#620C31', flex:1, }]}>Revisando</Text>
            {logo?<Image
                style={{width: '100%', height: 100, resizeMode: 'contain'}}
                source={logo}
            />:<View></View>}
            <Text  style={styles.text}>Nombre</Text>
            <Text  style={styles.input}>{negocio.nombre_ps}</Text>

                      
            <Text  style={styles.text}>Descripción del negocio</Text>
            <Text  style={styles.input}>{negocio.descripcion}</Text>

                      
            <Text  style={[{ color:'#000000', flex:1, }]}>Matriz principal:</Text>
            <Text  style={styles.text}>Colonia</Text>
            <Text  style={styles.input}>{negocio.colonia}</Text>

                      
            <Text  style={styles.text}>Calle y número</Text>
            <Text  style={styles.input}>{negocio.calle}</Text>
            

                      
            <Text  style={styles.text}>Liga a sitio web</Text>
            <Text  style={styles.input}>{negocio.sitio_web}</Text>

            

            <Text  style={styles.text}>Liga a Facebook</Text>
            <Text  style={styles.input}>{negocio.facebook}</Text>
            

            <Text  style={styles.text}>Liga a Instagram</Text>
            <Text  style={styles.input}>{negocio.instagram}</Text>
                      

            <Text  style={styles.text}>Liga a Twitter</Text>
            <Text  style={styles.input}>{negocio.twitter}</Text>
            
                      

            <Text  style={styles.text}>MyApp</Text>
            <Text  style={styles.input}>{negocio.myapp}</Text>
            


            <Text  style={styles.text}>Telefono</Text>
            <Text  style={styles.input}>{negocio.telefono_fijo}</Text>
            

            <Text  style={styles.text}>Celular</Text>
            <Text  style={styles.input}>{negocio.telefono_celular}</Text>
            

            <Text  style={styles.text}>Empleados Hombres</Text>
            <Text  style={styles.input}>{negocio.empleados_h}</Text>

            
            <Text  style={styles.text}>Empleados Mujeres</Text>
            <Text  style={styles.input}>{negocio.empleados_m}</Text>
            

            <Text  style={styles.text}>Ventas mensuales</Text>
            <Text  style={styles.input}>{negocio.ventas_mensuales}</Text>

            <Text  style={styles.text}>Whatsapp</Text>
            <Text  style={styles.input}>{negocio.whatsapp}</Text>
            <Text></Text>
            <Text></Text>
            <View style={{marginBottom:15, flexDirection:'column', alignItems:'center'}}>
                <Button     style={{ margin: 'auto'}}
                    icon="arrow-left"
                    mode="contained"         onPress={() => regresar()}>Regresar</Button>
            <Text></Text>
            <Text></Text>
            </View>

          </ScrollView>
          :<FlatList
            style={{
              width:'100%',
              height:'100%',
              flex: 1,
            }}
              ListEmptyComponent={_listEmptyComponent}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              extraData={extraData}
              data={datos}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({item}) =>
              <View style={{marginBottom:15, flexDirection:'row'}}>
                <Text style={[{ color:'black', padding:8, flex:3, }]}>{item.nombre_ps}</Text>
                <Text style={[{ color:'#620C31', padding:8, flex:3, }]}>{item.nombre_propietario}</Text>
                <Text style={[{ color:'black', padding:8, flex:2, }]}>{item.nombre_categoria}</Text>
                <Button  style={{  flex:1, marginTop: '5%', maxHeight:40}}
                    icon="eye"
                    mode="contained" onPress={() => irDetalle(item)}>Ver</Button>
              </View>}
            />
          }
          </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor:{ 
    flex:1,
    alignItems:'center'
  },
  text:{
    flex:1,
    color:'#000000',
    paddingTop:16,
    padding:8,
  },
  input:{
    textAlign: 'center',
    color:'#000000',
    borderColor:'#cccccc',
    borderWidth:1,
    padding:8,
  },
  sesion:{ 
    marginHorizontal:'5%',
    fontSize:15,
    lineHeight:21,
    textAlign:'justify',
    color:'#000',
    fontFamily:'Roboto-Regular'
  },
  cabecera:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1, fontFamily:'Izmir-Heavy',
  },
  cabecera2:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1, fontFamily:'Izmir-Heavy',    
  },
azul:{
  marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#620C31', letterSpacing: 1, fontFamily:'Izmir-Heavy'
},
azulProductos:{
  marginTop:'-2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1, fontFamily:'Izmir-Heavy'
},

azulServicios:{
  marginTop:'2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1, fontFamily:'Izmir-Heavy'
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
    backgroundColor: '#620C31',
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
    fontFamily:'Izmir-Heavy',
    color:'white',
  },


});

export default EmpresasAprobadas;
