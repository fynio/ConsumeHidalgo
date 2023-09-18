import React, {useState, useEffect} from 'react';
import { ScrollView, Linking, Keyboard, TouchableWithoutFeedback, StyleSheet, View, Text, Alert, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Prueba = ( {navigation} ) => {    
  
  
  
    const [state, setSate] = React.useState(false);
    //input text
    const [user, setText] = React.useState('');
    const [pass, setPass] = React.useState('');
    //HelperText
    const [valUser, setValUser] = React.useState(false);
    const [valPass, setValPass] = React.useState(false);
    //revisa que exista un valor en la sesión
    const [sesione, setSesione] = React.useState(null);
    //boton cargaando
    const [validando, setValidando] = React.useState(false);

    useEffect(() => {
        // setTimeout(function(){SplashScreen.show();}, 600);
        removeData();
    }, []);

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@storage_Key', value);
        setSesione(value);
      } catch (e) {
        // saving error
      }
    }

    const removeData = async () => {
      try {
        await AsyncStorage.removeItem('@storage_Key');
        setSesione(null);
        setSate(true);
        RNRestart.Restart();              
      } catch (e) {
        // saving error
      }
    }

    const getData = async () => {      
      try {        
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {          
          setSesione(value);
          setSate(false);                    
        }
        else{
          setSate(true);          
        }
      } catch(e) {
         // error reading value
      }
    }

    const signIn = async () => {

      if(user.length<=0){
        setValUser(true);
      }
      else{
        setValUser(false);
      }
      if(pass.length<=0){
        setValPass(true);
      }
      else{
        setValPass(false);
      }
      
      setValUser( !user.includes('@') );

      if(user.includes('@') && user.length>0 && pass.length>0){
        let data = {user: user, pass: pass, origen: Platform.OS === 'ios' ? 2 : 1 };
        setValidando(true);
        try {
          await axios.post(global.url + 'login/', data)
          .then( function (response){
            setValidando(false);
            if(response.status==200){
              //console.log(response.data);
              if(response.data.codigo==1){
                storeData(response.data.nombre);
                setSate(false);
              }
              else{
                removeData(null);
                Alert.alert("Usuario o contraseña incorrecta!",
                "Tambien puedes revisa tu correo electrónico, para validar la cuenta .",
                  [ { text: "Aceptar" }]
                );
              }
            }
            else{
              Alert.alert("Conexión incompleta!",
                  "Imposible acceder al servidor en este momento.",
                  [ { text: "Aceptar" }]
              );
            }
          });             
        } catch (error) {
          setValidando(false);        
          Alert.alert("Servidor sin conexión!",
          error.code + " Imposible autentificar usuario en este momento.",
            [ { text: "Aceptar" }]
          );
        }
      }
    }
    return (     
      
       <View></View>
    );
        
};

export default Prueba;
