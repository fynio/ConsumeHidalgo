import React, {useState, useEffect} from 'react';
import { IconButton } from 'react-native-paper';
import { Image, ScrollView, TextInput, Linking, StyleSheet, Text, Alert, View,} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contacto = ( { navigation } ) => {
  const [ubicación, setUbicación] = React.useState(null);
  const [whatsapp, setWhatsapp] = React.useState('....');
  const [telefono, setTelefono] = React.useState('....');
  const [email, setEmail] = useState('....');
  const [horario, setHorario] = useState('....');
  const [correo, setCorreo] = useState('....');
  const [facebook, setFacebook] = useState('....');
  const [twitter, setTwitter] = useState('....'); 
  const [link, setLink] = useState(null);
  
  const getValores = async () => {    
    try {
      await axios.post(global.url+ 'contacto/')
      .then( function (response){        
        if(response.status==200){
          setUbicación(response.data.direccion_contacto);
          setWhatsapp(response.data.whatsapp);
          setTelefono(response.data.telefono_contacto);
          setEmail(response.data.correo);
          setHorario(response.data.horario_atencion);
          storeData(response.data.direccion_contacto,response.data.whatsapp, response.data.telefono_contacto, response.data.correo, response.data.horario_atencion);
        }
      });
    }
    catch (error) {
      getData();     
    }        
  }

  const getData = async () => {      
    try {        
      const Ub = await AsyncStorage.getItem('@Ubicación');
      const Wh = await AsyncStorage.getItem('@Whatsapp');
      const Tl = await AsyncStorage.getItem('@Telefono');
      const EM = await AsyncStorage.getItem('@Email');
      const Ho = await AsyncStorage.getItem('@Horario');
      if(Ub !== null) {          
        setUbicación(Ub);
        setWhatsapp(Wh);
        setTelefono(Tl);
        setEmail(EM);
        setHorario(Ho);                              
        return 1;
      }
      else{        
        Alert.alert("Servidor sin conexión!",
                  " Imposible obtener datos.",
                   [ { text: "Aceptar" }]
                 );        
        return 0;
      }
    } catch(e) {
       // error reading value
    }
  }

  const storeData = async (Ub, Wh, Tl, Em, Ho) => {
    try {
      await AsyncStorage.setItem('@Ubicación', Ub);
      await AsyncStorage.setItem('@Whatsapp', Wh);
      await AsyncStorage.setItem('@Telefono', Tl);
      await AsyncStorage.setItem('@Email', Em);
      await AsyncStorage.setItem('@Horario', Ho);      
    } catch (e) {
      // saving error
    }
  }

  const consLinks = async () => {
    const url = global.url + "redes/";
    try {
        const resLinks = await axios.post(url);
        setLink(resLinks.data);
        setCorreo(resLinks.data.Correo);
        setTwitter(resLinks.data.Twitter);
        setFacebook(resLinks.data.Facebook);
    } catch (error) {
      Alert.alert("Servidor sin conexión!",
                  " Imposible obtener datos.",
                   [ { text: "Aceptar" }]
                 ); 
        //Estrategia de cache
    }
}


  

  useEffect(() => { 
    getValores()
    consLinks();
  },[]);

 return (
   <ScrollView>
    <Text style={styles.cabecera}>
      Contáctanos
    </Text>

    <Text style={styles.azul}>
      ¿Tienes dudas de cómo crear un perfil de redes sociales para tu negocio?
    </Text>

    <Text style={styles.azul}>
    O ¿Cómo manejar la plataforma?
    </Text>

    <View style={{marginHorizontal:'4%', marginTop:'5%'}}>
      <Text style={{color:'#393939'}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Ubicación: </Text>
        {ubicación}</Text>
    </View>

    <View style={{marginHorizontal:'4%', marginTop:'5%'}}>
      <Text style={{color:'#393939'}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Whatsapp: </Text>
        {whatsapp}
      </Text>
    </View>

    <View style={{marginHorizontal:'4%', marginTop:'5%'}}>
      <Text style={{color:'#393939'}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Teléfono: </Text>
        {telefono}
      </Text>
    </View>

    <View style={{marginHorizontal:'4%', marginTop:'5%'}}>
      <Text style={{color:'#393939'}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>E-mail: </Text>
        {email}
      </Text>
    </View>
    
    <View style={{marginHorizontal:'4%', marginTop:'5%'}}>
      <Text style={{color:'#393939'}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Horario de atención: </Text>
        {horario}
      </Text>
      


    </View>
    
    
    <View style={styles.rowEnd}>
    {facebook?
      <IconButton    
        icon="facebook"
        color="#3e4144"
        size={40}
        onPress={ () => Linking.openURL ( facebook )}
      />
      :
        <View></View>
    }

{twitter?
  <IconButton
    icon="twitter"
    color="#3e4144"
    size={40}
    onPress={() => Linking.openURL ( twitter )}
  />
  :
    <View></View>
  }

{correo?
  <IconButton
    flexDirection='row'
    icon="email"
    color="#3e4144"
    size={40}
    onPress={() => Linking.openURL ( correo )}
  />
  :
    <View></View>
  }
  </View>

   </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowEnd: {
    marginTop:'15%',
    marginHorizontal:'15%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%'
  },
  cabecera:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 34, color: '#6F7271', letterSpacing: 1,
    textAlign:'center',
  },
  azul:{
    marginHorizontal:'5%',
    marginVertical:'2%',
    fontSize: 16, color: '#3e4144', letterSpacing: 1,
    textAlign:'center'
  },

});

export default Contacto;