/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {Alert, Dimensions, SafeAreaView, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Text } from 'react-native-paper';
import { TextInput, Button, HelperText } from 'react-native-paper';
//import MyProducto from './producto';
import axios from 'axios';
import WebView from 'react-native-webview';

import stylesTheme from './../../../themes/theme';


global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
const ScreenWidth = Dimensions.get('window').width;
const ScreenHight = Dimensions.get('window').height;


const Tutoriales = ({ navigation }) => {



  const [cantidadCurrent, setCantidadCurrent] = useState(0);

  const [currentPage, setCurrentPage] = useState([]);
    const [tutoriales, setTutoriales] = useState([]);
    const [totalPages, setTotalpages] = useState(0);
      useEffect( () => {
        try {
          getTutoriales();
        } catch (error) {
          Alert.alert('Error al obtener los tutoriales:');
        }
          
    }, []);


    const prev = async () =>{
 
      const aux = cantidadCurrent - 1;
        if(aux<0)
        {
          return 0;
        }

        if(aux>=0 && aux<totalPages )
        {
          setCantidadCurrent(aux);
          await setCurrentPage(tutoriales[aux]);
        }
    }



    const next = async () =>{
      const aux = cantidadCurrent + 1;
      if(aux>=totalPages)
      {
        return 0;
      }

      if(aux>0 && aux<totalPages )
      {
        setCantidadCurrent(aux);
        await setCurrentPage(tutoriales[aux]);
      }

  }



      const getTutoriales = async () => {
        
        const url = global.url + "tutoriales/";
        try {
             
            const resTut = await axios.get(url);
    
         
            await setTutoriales(resTut.data);
            await setTotalpages(tutoriales.length);          
            await setCantidadCurrent(0);
            await setCurrentPage(resTut.data[cantidadCurrent]);
           return 1;
         
        } catch (error) {
          
            Alert.alert('OCURRIO UN ERROR');
                    //Estrategia de cache
        }
    }   

    const RenderItem = () => (
        <View style={{flex:1,   paddingVertical:20,  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{
            color: '#3e4144',
            paddingVertical: 20,
            fontSize: 21,
            textAlign: 'justify',
            width: ScreenWidth * 0.8,
          }}>
            {currentPage.nombre_tutorial}
          </Text> 



          <WebView 
            style={stylesTheme.WebviewTheme}
            source={{ uri: currentPage.url_tutorial }}
            startInLoadingState={true}  allowsFullscreenVideo={true}
            onError={(error) => console.error('Error al cargar el tutorial:', error)}
          />

        
            
        </View>
      );

      


    return (
  <SafeAreaView>

      <View style={stylesTheme.webviewPrincipal}>
           <Text  style={stylesTheme.tituloText}>Tutoriales</Text> 
          {
            tutoriales.length>=1?  
            <RenderItem  />
            :<View><Text>No existen tutoriales</Text></View>
          }
 
          <View style={stylesTheme.ContainerNavegationButtons}>
            <Button  
              onPress={prev} 
            icon="arrow-left-bold"
            mode="contained"    
            style={stylesTheme.BotonNavegacionIzq}>
              
            </Button>
            <Button 
              onPress={next}
            icon="arrow-right-bold"
            mode="contained"    
            style={stylesTheme.BotonNavegacionDer}>           
            </Button>
          </View>


          <Text>.</Text>
        
      </View>
    

  </SafeAreaView>
    );
};

export default Tutoriales;