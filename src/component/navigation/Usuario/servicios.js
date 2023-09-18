/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Avatar, Searchbar, Button,Text } from 'react-native-paper';
//import { Picker } from '@react-native-picker/picker';
import MyProducto from '../component/producto';
import axios from 'axios';
import { Pages } from 'react-native-pages';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Servicios = ({ navigation }) => {

    const [categorias, setCategorias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [idstore, setidstore] = React.useState(0);



    const [dataTarjeta, setTarjeta] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        consCategorias();
        consMunicipios();
        consProductos();
    }, []);

    const consProductos = async () => {
        let data = {origen: Platform.OS === 'ios' ? 2 : 1, id_user : idstore};
        setTarjeta([]);
        setBuscando(true);
        const url =  global.url + "busqueda/";
        try {
            const resPro = await axios.post(url, { tipo: 2, buscar:searchQuery, categoria:selectedCategoria,  municipio:selectedLanguage });
            setTarjeta(resPro.data);
            setBuscando(false);
            const id =global.id;
            setidstore(id);
            await axios.post( global.url + 'update/', data);
        } catch (error) {
            setBuscando(false);
        }
    }

    const consCategorias = async () => {
        const url =  global.url + "categorias/";
        try {
            const resCat = await axios.post(url, { tipo: 2 });
            setCategorias(resCat.data);
        } catch (error) {
            //Estrategia de cache
        }
    }

    const consMunicipiosOP = async (itemValue) => {
        const url =  global.url + "municipiosOperacion/";        
        try {
            const resMunOp = await axios.post(url, {idcategoria:itemValue});
            setMunicipios(resMunOp.data);
            setSelectedLanguage(""); 
        } catch (error) {
            //console.log(error);
            //Estrategia de cache
        }
    }

    const consMunicipios = async () => {
        const url =  global.url + "municipios/";
        try {
            const resMun = await axios.post(url);
            setMunicipios(resMun.data);
        } catch (error) {
            //Estrategia de cache
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

                    {/* <View style={[styles.box]}>
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
                    </View> */}
                    
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
                    //console.log(tarjeta.masinformacion.horario); 
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
    box: { flex: 1, backgroundColor: 'white', },
    Header: { backgroundColor: 'white', },
    productos: { marginHorizontal: '2%', marginVertical: '2%', },
});
export default Servicios;