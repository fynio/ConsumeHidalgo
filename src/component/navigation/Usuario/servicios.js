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
  
    
      useEffect( () => {
     

          getMunicipios();
       
            getCategorias();
          


   
    }, []);

    

   
 
    const [dataTarjeta, setTarjeta] = useState([]);
    const [buscando, setBuscando] = useState(false);

    const getMunicipios = async () => {
        
        const storedToken = await AsyncStorage.getItem('@token');
        const url = global.url + "municipios/";
        try {
             
            const resMun = await axios.post(url,{}, {
                headers: {
                    'Content-Type': 'application/json',
                      'Authorization': `Bearer ${storedToken}`
                    }
              });
            await setMunicipios(resMun.data);
        } catch (error) {
          
            //Estrategia de cache
        }
    }   


    const getCategorias = async () => {

        const storedToken = await AsyncStorage.getItem('@token');
        const url = global.url + "categorias/";

        try {
            const resCat = await axios.post(url, { tipo: 2 },  {
                headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${storedToken}`
                }
              } );
 
            setCategorias(resCat.data);
        } catch (error) {
          
        }
    }



       
    const getMunicipiosOP = async (itemValue) => {
        setTarjeta([]);
        setMunicipios([]);
        const storedToken = await AsyncStorage.getItem('@token');
        const url = global.url + "municipiosOperacion/";        
        try {
           
            const resMunOp = await axios.post(url, {idcategoria:itemValue}, {
                headers: {
                    'Content-Type': 'application/json',
                      'Authorization': `Bearer ${storedToken}`
                    }
              });
          
          
            setMunicipios(resMunOp.data);
            setSelectedLanguage("");            
        } catch (error) {
             
            //Estrategia de cache
        }
    }  

 
    const consProductos = async () => {

        const storedToken = await AsyncStorage.getItem('@token');
        let data = {origen: Platform.OS === 'ios' ? 2 : 1};
        setTarjeta([]);

        const url = global.url + "busqueda/";
        try {

            if(selectedCategoria=='' && selectedLanguage == '')
            {
                Alert.alert("Seleccione un municipio o una categoria");
                return 0;
            }
            
        setBuscando(true);
            const resPro = await axios.post(url, { tipo: 2, buscar:searchQuery, categoria:selectedCategoria,  municipio:selectedLanguage }, {
                headers: {
                    'Content-Type': 'application/json',
                      'Authorization': `Bearer ${storedToken}`
                    }
        
              });
              
            setBuscando(false);
            setTarjeta(resPro.data);
        } catch (error) {
            
            setBuscando(false); 
        }
    }



    return (
        <ScrollView>                      

            {/* inicio de searchbar y pickers */}
            <View style={styles.Header}>
                <Searchbar placeholder="Buscar Servicios"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                    <View >

              
                     <Picker selectedValue={selectedCategoria} onValueChange={(itemValue, itemIndex) => { setSelectedCategoria(itemValue); getMunicipiosOP(itemValue); }}>
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
                    <Text>Seleccione una opcion</Text>                    
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