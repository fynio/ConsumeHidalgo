/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {  Avatar,  Button, Searchbar, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
//import MyProducto from './producto';
import axios from 'axios';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import WebView from 'react-native-webview';
import { collapsable } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
const ScreenWidth = Dimensions.get('window').width;
const Tutoriales = ({ navigation }) => {

 
    const [tutoriales, setTutoriales] = useState([]);

      useEffect( () => {
          getTutoriales();
          
    }, []);

      const getTutoriales = async () => {
        
        const storedToken = await AsyncStorage.getItem('@token');
        const url = global.url + "tutoriales/";
        try {
             
            const resTut = await axios.get(url);
            await setTutoriales(resTut.data);
        
        } catch (error) {
            console.log('OCURRIO UN ERROR',error);
                    //Estrategia de cache
        }
    }   

 
    return (
        <View>
        <ScrollView style={{
            paddingHorizontal:20,


        }}>  
  
              {
               tutoriales.map((item)=>{

                return(
                    <View style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                    }}>
                        <Text style={{  
                            color: '#620C31',
                            paddingVertical:20,
                            fontSize:21,
                            textAlign:'justify',
                            width:ScreenWidth*0.8,
                    }}>
                        {item.nombre_tutorial}</Text>
                        <WebView
                        source={{ uri: item.url_tutorial }}
                        style={styles.webview}
                        />

                        <Text></Text>
                        <Text></Text>
                    </View>
                )


                
                })

               
              }







        </ScrollView>
        </View>
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