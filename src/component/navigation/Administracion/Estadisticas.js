import React, { useEffect} from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,  
  StyleSheet, 
  View,Text, Alert
} from 'react-native';

 

import { 
  BarChart,
  PieChart, 
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';

const Estadisticas = ( { navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
  
  const [datos, setDatos] = React.useState([]);
  const [opcion, setOpcion] = React.useState(0);
  const [typeChart, setTypeChart] = React.useState(1);

  const [labels, setLabels] = React.useState([]);
  const [datapie, setDataPie] = React.useState([
    {
      name: "Seoul",
      valor: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      valor: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      valor: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      valor: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      valor: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]);
  const colores = ["#76D7C4","#EBDEF0","#FADBD8","#F5B7B1","#F9EBEA","#C0392B","#C39BD3","#070707","#B03A2E","#17A589","#512E5F","#E74C3C","#A3E4D7","#F9EBEA","#F5EEF8","#117864","#FF1100","#0E6251","#AF7AC5","#A93226","#E8F8F5","#7B241C","#9B59B6","#FDEDEC","#922B21","#D98880","#F5B7B1","#943126","#D1F2EB","#76448A","#1ABC9C","#CB4335","#E6B0AA","#884EA0","#633974","#13CDF7","#48C9B0","#D7BDE2","#148F77","#F5B7B1","#641E16","#CD6155","#FFC300","#78281F"];
 
   
  
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  
 

const getDatosRegion = async () => {

  const storedToken = await AsyncStorage.getItem('@token');

  const url = global.url + "estadistica/Region";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
         labels_.push(`${row.region}`)
         datos_.push(parseInt(row.total));
         datospie_.push({'name':`${row.region}`, 'valor':row.total, 'color':colores[datospie_.length]});
      }
      labels_.push(``)
      datos_.push(0);

      setTimeout(async()=>{
          setLabels(labels_);
          setDatos(datos_);
          setDataPie(datospie_);
      },3000)

  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}


const getDatosMunicipio = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');

  const url = global.url + "estadistica/Municipio";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      //setLabels(["January", "February", "March", "April", "May", "June2"]);
      for (let row of resCat.data) {
        labels_.push(row.municipio)
        datos_.push(row.total);
        datospie_.push({'name':row.municipio, 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }
      labels_.push(``);
      datos_.push(0);
         setLabels(labels_)
      
       setDatos(datos_);
        setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}



const getDatosSexo = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/Sexo";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      datospie_.push({name:"Hombres", valor:parseInt(resCat.data[0].Hombres), color:'red', legendFontColor: "#7F7F7F", legendFontSize: 15});
      datospie_.push({name:"Mujeres", valor:parseInt(resCat.data[0].Mujeres), color:'blue', legendFontColor: "#7F7F7F", legendFontSize: 15});
      
      
      setLabels(labels_)
      
       setDatos(datospie_);
       setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}


const getDatosTamano = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/Tamano";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
        labels_.push(row.tamano)
        datos_.push(row.total);
        datospie_.push({'name':row.tamano, 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }



      labels_.push(``)
      datos_.push(0);
        setLabels(labels_)
      
         setDatos(datos_);
       setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}


const getDatosTipoUsuario = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/TipoDeUsuario";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
        labels_.push(row.tipo_usuario)
        datos_.push(row.total);
        datospie_.push({'name':row.tipo_usuario, 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }
       setLabels(labels_)
      
        setDatos(datos_);
       setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}


const getDatosEmpleosConservados = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/EmpleosConservados";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
        labels_.push("Total")
        datos_.push(row.total);
        datospie_.push({'name':"Total", 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }
      labels_.push(``)
      datos_.push(0);
      await    setLabels(labels_)
      
      await   setDatos(datos_);
      await   setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  }
}


const getDatosSector = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/Sector";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
        labels_.push(row.categoria_nombre)
        datos_.push(row.total);
        datospie_.push({'name':row.categoria_nombre, 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }
      await   setLabels(labels_)
      
      await   setDatos(datos_);
      await  setDataPie(datospie_);
  } catch (error) {
    Alert.alert(JSON.stringify(error));
      //Estrategia de cache
  }
}



const getDatosSubsector = async () => {
  
  const storedToken = await AsyncStorage.getItem('@token');
  const url = global.url + "estadistica/Subsector";
  try {
      const resCat = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
      });
      var labels_ = [];
      var datos_ = [];
      var datospie_ = [];
      
      for (let row of resCat.data) {
        labels_.push(row.nombre_categoria)
        datos_.push(row.total);
        datospie_.push({'name':row.nombre_categoria, 'valor':parseInt(row.total), 'color':colores[datospie_.length]});
      }
      labels_.push(``)
      datos_.push(0);
      await   setLabels(labels_)
      
      await   setDatos(datos_);
      await    setDataPie(datospie_);
  } catch (error) {
      //Estrategia de cache
      
    Alert.alert(JSON.stringify(error));
  }
}


const getDatos = async (itemValue) => {
  
  try {
        
    setLabels([])
      
    setDatos([]);
    setDataPie([]);

  if(itemValue!=0  && itemValue!=undefined)
  {
   await  setLabels([])
      
   await setDatos([]);
   await  setDataPie([]);

    if(itemValue == 1){
     await setTypeChart(1);
     await  getDatosRegion();
    }else if(itemValue == 2){
      await    setTypeChart(1);
      await   getDatosMunicipio();
    }else if(itemValue == 3){
      await   setTypeChart(2);
      await     getDatosSexo();
    }else if(itemValue == 4){
      await   setTypeChart(1);
      await   getDatosTamano();
    }else if(itemValue == 5){
      await    setTypeChart(2);
      await   getDatosTipoUsuario();
    }else if(itemValue == 6){
      await   setTypeChart(1);
      await   getDatosEmpleosConservados();
    }else if(itemValue == 7){
      await   setTypeChart(2);
      await  getDatosSector();
    }else if(itemValue == 8){
      await  setTypeChart(1);
      await   getDatosSubsector();
    }
  }
} catch (error) {
  //Estrategia de cache
  
Alert.alert(JSON.stringify(error));
}
}





  return (
      <SafeAreaView style={styles.contenedor}>
        <View style={{
              width:'100%',
              height:'100%',
              flex: 1,
            }}>
              
              <Picker
                selectedValue={opcion}
                style={{backgroundColor:'white'}}
                onValueChange={(itemValue) =>getDatos(itemValue)}>
                <Picker.Item label="Seleccione una opción" value="0" color="black" backgroundColor='grey' />
                <Picker.Item label="Usuarios registrados por región" value="1" color="black" backgroundColor='grey' />
                <Picker.Item label="Usuarios registrados por municipio" value="2" color="black" backgroundColor='grey'/>
                <Picker.Item label="Usuarios registros por sexo" value="3" color="black" backgroundColor='grey'/>
                <Picker.Item label="Empresas agrupadas por tamaño" value="4" color="black" backgroundColor='grey'/>
                <Picker.Item label="Estadística de Roles de Usuario:" value="5" color="black" backgroundColor='grey'/>
                <Picker.Item label="Empleos conservados" value="6" color="black" backgroundColor='grey'/>
                <Picker.Item label="Empresas agrupadas por Sector" value="7" color="black" backgroundColor='grey'/>
                <Picker.Item label="Empresas agrupadas por Subsector" value="8" color="black" backgroundColor='grey'/>
              </Picker>
              {datos.length  > 0 && datapie.length>0 && labels.length>0 && datos!= undefined?
              <View>{typeChart == 1?
                <ScrollView
                  horizontal={true}
                  >
                  <BarChart
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          data: datos
                        }
                      ],
                      
                    }}
                    width={datos.length*50 + 100} // from react-native
                    height={500}
                    yAxisLabel=""
                    yAxisSuffix=""

                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    yAxisInterval={1} // optional, defaults to 1
                    verticalLabelRotation={45}
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#ffffff",
                      backgroundGradientTo: "#ffffff",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `#620C31`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                        fontSize:6,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                        fontSize:6,
                      }
                    }}
                    bezier
                    style={{
                      padding:32,
                      marginVertical: 8,
                      borderRadius: 16,
                      fontSize:6,
                      
                    }}
                  />
              
              </ScrollView>:
              <ScrollView
                  horizontal={true}
                  >
              <PieChart
                data={datapie}
                width={screenWidth}
                height={300}
                barPercentage={1}
                chartConfig={chartConfig}
                accessor={"valor"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
              />
              
              </ScrollView>
              }


              
              </View>:<View><Text>...</Text></View>}
          </View>
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

export default Estadisticas;
