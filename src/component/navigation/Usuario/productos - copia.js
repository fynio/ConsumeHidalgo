/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';

import {  Avatar, Searchbar, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


import MyProducto from './producto';
import axios from 'axios';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";
const Productos = ({ navigation }) => {

 
  
    const [categorias, setCategorias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [idstore, setidstore] = React.useState(0);

    const [token, setToken] = useState(null);
  
    
    
      useEffect(async () => {
        const getToken = async () => {
            try {
              const storedToken = await AsyncStorage.getItem('@token');
              if (storedToken !== null) {
             
                setToken(storedToken);
              }
            } catch (error) {
              console.error('Error al obtener el token:', error);
            }
          };
      
          getToken();

          consMunicipios();
          consProductos();
            consCategorias();
          


   
    }, []);

    

   
 
    const [dataTarjeta, setTarjeta] = useState([]);
    const [buscando, setBuscando] = useState(true);

  
    const consCategorias = async () => {

        const storedToken = await AsyncStorage.getItem('@token');
        console.log("Este es el token consCategorias ",storedToken );
        const url = global.url + "categorias/";

        try {

   
            let headers = {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
                }
            const resCat = await axios.post(url, { tipo: 1 },  {
                headers: headers
              } );
 
              setBuscando(false);

            setCategorias(resCat.data);
        } catch (error) {
            console.log("Ocurrio un error en consCategorias", error);
            setBuscando(false);
            //Estrategia de cache
        }
    }

 
    const consProductos = async () => {

        const storedToken = await AsyncStorage.getItem('@token');
        console.log("Este es el token consProductos ",storedToken );
        let headers = {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }


        let data = {origen: Platform.OS === 'ios' ? 2 : 1, id_user : idstore};
        setTarjeta([]);
        setBuscando(true);
        const url = global.url + "busqueda/";
        try {
            const resPro = await axios.post(url, { tipo: 1, buscar:searchQuery, categoria:selectedCategoria,  municipio:selectedLanguage }, {
                headers: headers
              });
            setTarjeta(resPro.data);
            setBuscando(false);
            const id =global.id;
            setidstore(id);
            await axios.post(global.url + 'update/', data);   
        } catch (error) {
            console.log("Ocurrio un error", error);
            setBuscando(false);
        }
    }

   
    const consMunicipiosOP = async (itemValue) => {
        
        const storedToken = await AsyncStorage.getItem('@token');
        console.log("Este es el token consMunicipiosOP",storedToken );
        const url = global.url + "municipiosOperacion/";        
        try {
            let headers = {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
                }

            const resMunOp = await axios.post(url, {idcategoria:itemValue}, {
                headers: headers
              });
            console.log("Municipios",resMunOp);
            setMunicipios(resMunOp.data);
            setSelectedLanguage("");            
        } catch (error) {
            console.log("Este es el error en consMunicipiosOP", error);
            //Estrategia de cache
        }
    }  

    const consMunicipios = async () => {
        
        const storedToken = await AsyncStorage.getItem('@token');
        console.log("Este es el token consMunicipios",storedToken );
        const url = global.url + "municipios/";
        try {
            let headers = {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
                }
 
            const resMun = await axios.post(url, {
                headers: headers
              });
            await setMunicipios(resMun.data);
        } catch (error) {
            console.log("Ocurrio un error en consMunicipios", error);
            //Estrategia de cache
        }
    }   

    return (
        <ScrollView>                      

            {/* inicio de searchbar y pickers */}
            <View style={styles.Header}>
                <Searchbar placeholder="Buscar Productos"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                    <View >

              
                     <Picker selectedValue={selectedCategoria} onValueChange={(itemValue, itemIndex) => { setSelectedCategoria(itemValue); consMunicipiosOP(itemValue); }}>
                            <Picker.Item style={{ color: '#620C31' }} label="Todas las Categorias" value="" />
                            {categorias.map(categ => (
                                <Picker.Item style={{ color: '#620C31' }} key={categ.id_categoria} label={categ.nombre_categoria} value={categ.id_categoria} />
                            ))
                            }
                        </Picker> 
                    </View>
 
                    <View style={[styles.box]}>                        
                        <Picker selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                            <Picker.Item style={{ color: '#620C31' }} label="Todo el estado" value="" />
                            {municipios.map(munic => (
                                <Picker.Item style={{ color: '#620C31' }} key={munic.idmpio} label={munic.municipio} value={munic.idmpio} />
                            ))
                            }
                        </Picker>
                    </View> 
                    
                    <View style={{marginHorizontal:'5%'}}>
                        <Button 
                            style={{ marginTop: '1%'}}
                            icon="magnify-plus-outline"
                            mode="contained"                  
                            onPress={() => consProductos() }>
                            B u s c a r
                        </Button>  
                    </View>
                </View>
            {/* fin de search bar y pickers */}
            
            <View>
            {buscando?
                <ActivityIndicator style={{marginTop:'5%'}} size="large" />
            :
                <View></View>
            }

            {!buscando && dataTarjeta.length ===0? 
                <View style={{alignItems:'center', marginTop:'10%'}}> 
                    <Text>Sin resultados para esta busqueda</Text>                    
                </View>
            :
                <View></View>
            }
            
        <Pages containerStyle={{backgroundColor:'white',marginTop:'5%', height:450, marginVertical:'2%',}} indicatorColor={'#620C31'} >
                {dataTarjeta.map((tarjeta) => {                    
                    return (
                        <MyProducto myId={tarjeta.tid} titulo={tarjeta.titulo} descripcion={tarjeta.descripcion} sucursales={tarjeta.sucursales} direcciones={tarjeta.direcciones} masinformacion={tarjeta.masinformacion} key={'contenedor' + tarjeta.tid} />
                    );
                })}
        </Pages>
    </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    box: { backgroundColor: 'white', },
    Header: { backgroundColor: 'white', },
    productos: { marginHorizontal: '2%', marginVertical: '2%', },
});
export default Productos;