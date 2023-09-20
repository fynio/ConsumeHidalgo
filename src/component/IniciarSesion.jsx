import React, { useState } from 'react';
import Constants from 'expo-constants';
import {StyleSheet,  SafeAreaView,TouchableWithoutFeedback,  ScrollView,
    Keyboard, Text, View,Image, Dimensions,TouchableOpacity, Linking, Alert} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Registrarme from './Registrarme';
const ScreenWidth = Dimensions.get('window').width;
const Space = ScreenWidth - (ScreenWidth * .2); 

global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";


const IniciarSesion = ( {navigation})=>{

    const [escribe, setEscribe] = React.useState(false);
    const [correo, setCorreo] = React.useState('admin@gmail.com');
    const [password, setPassword] = React.useState('1');


    //revisa que exista un valor en la sesión
    const [idTipoUsuario, setIdTipoUsuario] = React.useState(0);
    const [token, setToken] = React.useState(); 


    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        
        if (emailRegex.test(email)) {
            return true;
        }else{
            return false;
        }
      }


    const iniciarSesionHandler = async ()=>{
       
        try{
            if(validateEmail(correo)==false)
            {
                Alert.alert("Ingrese un correo electrónico válido");
                return 0;
            }
            if(password=="")
            {
                Alert.alert("Ingrese una contraseña");
                return 0;
            }
    
    
            let DATOS = {user: correo, pass: password, origen: Platform.OS === 'ios' ? 2 : 1 };
    
         
            const response = await axios.post( global.url + 'login/', DATOS);
      
        

            if(response.status==200){
      
                

                if(response.data.codigo==1){
      
                    await setIdTipoUsuario(JSON.stringify(response.data.id_tipo_usuario));
                    await setToken(JSON.stringify(response.data.token));
    
                    await AsyncStorage.setItem('@id_tipo_usuario', JSON.stringify(response.data.id_tipo_usuario));
                    await  AsyncStorage.setItem('@token', JSON.stringify(response.data.token).replace(/['"]+/g, ''));
                
                    if(JSON.stringify(response.data.id_tipo_usuario==2))
                    {
                        navigation.navigate("AppNavigation");
                     
                     
                    }
                    if(JSON.stringify(response.data.id_tipo_usuario==1))
                    {
                        navigation.navigate("AdminNavigation");
                     
                     
                    }

                }
                else{
                
                    Alert.alert(response.data.descripcion,"Tambien puedes revisa tu correo electrónico, para validar la cuenta .",
                        [ { text: "Aceptar" }]
                        );
                }
            }



        }catch(e){
            console.log(e); 
        }
    


    }

    return(

    
            <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss(); setEscribe(false); }}>     

            <ScrollView style={{backgroundColor:'rgb(255,255,255)'}}>    
                <View 
                        

                    style={{
                        width: Space, 
                     display:'flex', 
                     flexDirection:'column', 
                        marginTop:'14%', 
                        justifyContent:'center', 
                        marginHorizontal:'10%'
                    }}>

                    <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>

                        <Text style={styles.tituloText}>Iniciar sesión</Text>

                    </View>
               
                    <Text></Text>
                    <SafeAreaView>
                    <TextInput
                        autoCorrect={false}
                        mode="flat"
                        style={{ color:'red', backgroundColor:'rgba(200,200,200,0.1)', width:'100%', marginTop: '2%', textAlign: 'center' }}
                        value={correo}
                        label="Correo electrónico"
                        keyboardType="email-address"
                        onChangeText={correo => setCorreo(correo)}
                        maxLength={108}
                        autoCapitalize="none"
                    />

                    <Text></Text> 
                    <TextInput
                        autoCorrect={false}
                        mode="flat"
                        style={{ color:'red', backgroundColor:'rgba(200,200,200,0.1)', width:'100%', marginTop: '2%', textAlign: 'center' }}
                        value={password}
                        label="Contraseña"
                        keyboardType="visible-password"
                        onChangeText={password => setPassword(password)}
                        maxLength={108}
                        secureTextEntry={true} 
                        autoCapitalize="none"
                    />

                    <Text></Text>
                    <Text></Text>
                    <Button icon="key" mode="contained" onPress={() =>  iniciarSesionHandler()}>
                    Iniciar sesión
                    </Button>

                    <Text></Text>
                    <Text></Text> 
                    <Button  onPress={() => navigation.navigate('Registrarme')} style={{backgroundColor:'rgba(188,149,91,1)'}} icon="account-plus" mode="contained" >
                    Registrarme
                    </Button> 

                    <Text></Text>
                    <Text></Text>
                    <Button 
                        style={{ marginTop: '5%'}}
                        icon="arrow-left"
                        mode="contained"                             
                        onPress={() => navigation.navigate('Principal')}>
                        Regresar
                      </Button>
                              


                      <Text></Text>
                    <Text></Text>

                    <Text></Text>
                    <Text></Text>
                    <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <Image
                        style={styles.bottomImage}
                        source = {require('./../../assets/img/pueblo.png')} 
                        /> 
                    </View>

                    </SafeAreaView>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    
      

    )
}

const styles = StyleSheet.create({
    tituloText:{ 
        marginVertical:'4%',
        fontSize: 28, color: '#620C31', letterSpacing: 1
    },
    topImage:{height: 190, width: 120 },
    bottomImage:{height: 80, width: 150 },
    titulo:{marginHorizontal:'2%', alignItems:'center', marginTop:10},
    consume:{ fontSize: 35, color: '#050545', letterSpacing: 1, fontFamily:'Izmir-Heavy'},
    hidalgo:{ fontSize: 35, color: '#0080dc', letterSpacing: 1, fontFamily:'Izmir-Heavy'},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

 });



export default IniciarSesion;  