/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Text } from 'react-native-paper';
//import MyProducto from './producto';
import axios from 'axios';
import WebView from 'react-native-webview';

global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
const ScreenWidth = Dimensions.get('window').width;
const Tutoriales = ({ navigation }) => {

 
    const [tutoriales, setTutoriales] = useState([]);

      useEffect( () => {
          getTutoriales();
          
    }, []);

      const getTutoriales = async () => {
        
        const url = global.url + "tutoriales/";
        try {
             
            const resTut = await axios.get(url);
            await setTutoriales(resTut.data);
        
        } catch (error) {
            console.log('OCURRIO UN ERROR',error);
                    //Estrategia de cache
        }
    }   

    const renderItem = ({ item }) => (
        <View style={{flex:1, paddingVertical:20,  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{
            color: '#620C31',
            paddingVertical: 20,
            fontSize: 21,
            textAlign: 'justify',
            width: ScreenWidth * 0.8,
          }}>
            {item.nombre_tutorial}
          </Text> 
          <WebView
            source={{ uri: item.url_tutorial }}
            style={styles.webview}
            startInLoadingState={true}
            scalesPageToFit={true}   
            javaScriptEnabled={true}
        domStorageEnabled={true}
          />

        
           
        </View>
      );

      


    return (
  <SafeAreaView style={{flex:1}}>
   
      <Text>Tutoriales</Text>

      <FlatList
      data={tutoriales}
      keyExtractor={(item, index) => `WebView${index}`} // Utiliza un identificador único como key
      renderItem={renderItem}

      />

    <Text>.</Text>

  </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    webview: {
        width:ScreenWidth*0.8, 
        height:((ScreenWidth*0.8)/16)*9,
        flex: 1,
      },
    box: { backgroundColor: 'white', },
    Header: { backgroundColor: 'white', },
    productos: { marginHorizontal: '2%', marginVertical: '2%', },
});
export default Tutoriales;