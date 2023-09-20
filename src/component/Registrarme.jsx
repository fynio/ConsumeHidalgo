import React, {useState, useEffect} from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Alert,
  SafeAreaView,
  Linking,
  Keyboard,
  ScrollView,  
  StyleSheet,
  Text,
  View, TouchableOpacity,  Image,Dimensions,TouchableWithoutFeedback
} from 'react-native';

import { TextInput, Button, HelperText } from 'react-native-paper';

const ScreenWidth = Dimensions.get('window').width;
const Space = ScreenWidth - (ScreenWidth * .2); 
const Registrar = ( {navigation} ) => { 
    //input text
    const [user, setText] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [passCon, setPassCon] = React.useState('');
    const [apePat, setApePAT] = React.useState('');
    const [apeMat, setApeMAT] = React.useState('');
    const [nombre, setName] = React.useState('');
    const [curp, setCurp] = React.useState('');
  
    //HelperText
    const [valUser, setValUser] = React.useState(false);
    const [valPass, setValPass] = React.useState(false);
    const [valApeMat, setValApeMat] = React.useState(false);
    const [valApePat, setValApePat] = React.useState(false);
    const [valName, setValName] = React.useState(false);
    const [valCurp, setValCurp] = React.useState(false);
    const [escribe, setEscribe] = React.useState(false);
    const [htcurp, sethtCurp] = React.useState(false);
    const [htpass, sethtPass] = React.useState(false);
    //icono eye-off
    const [showPassword, setPassword] = React.useState(false);
    //boton cargaando
    const [validando, setValidando] = React.useState(false);

    const [state, setSate] = React.useState(true);

 
    const saveData = async () => {

      if(user.length<=0){ setValUser(true); } else{ setValUser(false);} 
      if(pass.length<=0){ setValPass(true); } else{ setValPass(false);}
      if(apePat.length<=0){ setValApePat(true);} else{ setValApePat(false);} 
      if(apeMat.length<=0){setValApeMat(true); } else{setValApeMat(false);}
      if(nombre.length<=0){setValName(true); }else{setValName(false);} 
      if(curp.length<=0){ setValCurp(true); } else{ setValCurp(false); }
      if(curp.length==18){sethtCurp(false); } else{sethtCurp(true);}
      if(pass==passCon){sethtPass(false);}else{sethtPass(true);}
     
      
      setValUser( !user.includes('@') );

      if(user.includes('@') && user.length>0 && pass.length>0 && pass==passCon && nombre.length>0 && apeMat.length>0 && apePat.length>0 && curp.length==18){
        let data = {user: user, pass: pass, nombre: nombre, apePat: apePat, apeMat: apeMat, curp: curp };
        setValidando(true);
        try {
          await axios.post(global.url + 'registrar/', data)
          .then( function (response){
            
         //   Alert.alert(JSON.stringify(response));
            setValidando(false);
            if(response.status==200){          
                    
               if(response.data.code==1){
                Alert.alert("Correcto!",
                response.data.text,
                  [ { text: "Ok", onPress: () => navigation.navigate('IniciarSesion') }]
                );
               }
               else{              
                 Alert.alert("Error!",
                 response.data.text,
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
      
        <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss(); setEscribe(false); }}>           
          <ScrollView  >  
                                                                                    
            <View style={styles.titulo}>                           
                <Text style={styles.tituloText}>Registro</Text>         
            </View>
            <View style={styles.texto}>
                     
                   <View>
                   <TextInput
                        mode="flat"
                        style={{ marginTop: '3%', textAlign: 'center' }}
                        value={nombre}
                        label="Nombre"
                        keyboardType="default"
                        onChangeText={nombre => setName(nombre)}
                        autoCapitalize="none"
                        maxLength={32} />
                      <HelperText type="error" visible={valName}>
                        Escribe tu nombre!
                      </HelperText>
                      <TextInput
                        mode="flat"
                        autoCapitalize="none" 
                        style={{ marginTop: '3%', textAlign: 'center' }}
                        value={apePat}
                        label="Apellido paterno"
                        keyboardType="default"
                        onChangeText={apePat => setApePAT(apePat)}
                        maxLength={32} />
                      <HelperText type="error" visible={valApePat}>
                        Escribe tu apellido paterno!
                      </HelperText>
                      <TextInput
                        mode="flat"
                        autoCapitalize="none"
                        style={{ marginTop: '3%', textAlign: 'center' }}
                        value={apeMat}
                        label="Apellido materno"
                        keyboardType="default"
                        onChangeText={apeMat => setApeMAT(apeMat)}
                        maxLength={32} />
                      <HelperText type="error" visible={valApeMat}>
                        Escribe tu apellido materno!
                      </HelperText>
                   <TextInput
                        mode="flat"
                        autoCapitalize="none"
                        style={{ marginTop: '3%', textAlign: 'center' }}
                        value={curp}
                        label="Curp (18 dígitos)"
                        keyboardType="default"
                        onChangeText={curp => setCurp(curp)}
                        maxLength={18} />
                        {valCurp?
                        <HelperText type="error" visible={valCurp}>
                        Escribe tu curp!
                      </HelperText>
                      :
                      <HelperText type="error" visible={htcurp}>
                        Curp no valido!
                      </HelperText>}
                      
                      
                      <TextInput
                        mode="flat"
                        autoCapitalize="none"
                        style={{ marginTop: '3%', textAlign: 'center' }}
                        value={user}
                        label="Correo electrónico"
                        keyboardType="email-address"
                        onChangeText={user => setText(user)}
                        maxLength={58} />
                      <HelperText type="error" visible={valUser}>
                        Escribe tu dirección de correo electrónico!
                      </HelperText>

                      <TextInput
                        mode="flat"
                        autoCapitalize="none"
                        style={{ marginTop: '3%', textAlign: 'center'}}
                        value={pass}
                        label="Contraseña"
                        keyboardType="default"                 
                        onChangeText={pass => setPass(pass)}
                        maxLength = {20}
                        secureTextEntry={!showPassword}
                        right={<TextInput.Icon 
                          name={showPassword ? "eye-off" : "eye"}
                          onPress={() => setPassword(!showPassword)}
                          color="#620C31"/>}                    
                      />
                      <HelperText type="error" visible={valPass}>
                        Escribe tu Contraseña!
                      </HelperText>
                      <TextInput
                        mode="flat"
                        autoCapitalize="none"
                        style={{ marginTop: '3%', textAlign: 'center'}}
                        value={passCon}
                        label="Confirma tu contraseña"
                        keyboardType="default"                 
                        onChangeText={passCon => setPassCon(passCon)}
                        maxLength = {20}
                        secureTextEntry={!showPassword}
                        right={<TextInput.Icon 
                          name={showPassword ? "eye-off" : "eye"}
                          onPress={() => setPassword(!showPassword)}
                          color="#620C31"/>}                    
                      />
                      {valPass?
                        <HelperText type="error" visible={valPass}>
                        Escribe tu contraseña!
                      </HelperText>
                      :
                      <HelperText type="error" visible={htpass}>
                        Verifica tu contraseña!
                      </HelperText>}
                    {!validando?

                      <View>

                      <Text></Text>
                    <Text></Text>
                    <TouchableOpacity onPress={() => Linking.openURL("https://consume.hidalgo.gob.mx/aviso_de_privacidad.php")}>
                    <Text style={{ textAlign:'right',  color: 'rgba(105, 28, 49, 1)' }}>Aviso de privacidad</Text>
                    </TouchableOpacity>

                    <Button 
                        style={{ marginTop: '5%'}}
                        icon="account-check-outline"
                        mode="contained"                             
                        onPress={() => saveData()}>
                        Registrar
                      </Button>
                      </View>



                    :
                      <View></View>
                    }
                    {!validando?
                      <Button 
                        style={{ marginTop: '5%'}}
                        icon="arrow-left"
                        mode="contained"                             
                        onPress={() => navigation.navigate('Principal')}>
                        Regresar
                      </Button>
                    :
                      <View></View>
                    }

                    </View>
                
                    </View>
            
                
                
          </ScrollView>
        </TouchableWithoutFeedback>
    );
        
};

const styles = StyleSheet.create({
  tituloText:{ 
    marginVertical:'4%',
    textAlign:'center',
    fontSize: 28, color: '#620C31', letterSpacing: 1
},

    titulo:{
      width: Space, 
      marginTop:'14%', 
      justifyContent:'center', 
      marginHorizontal:'10%', 
    },

    contenedor:{ flex:1 },        
    termo:{ flex:.25, justifyContent:'center'},
    cterm:{ flex:.8, marginHorizontal:'30%'},    
    texto:{ marginHorizontal:'10%', justifyContent:'center', marginTop:'2%', marginVertical:'10%'},
    fs:{fontSize: 25, color: '#BC945B', letterSpacing: 1, textAlign:'center', marginTop:'1%'},
    ftext:{fontSize: 16, marginTop:'2%', color: '#BC945B', letterSpacing: 1, textAlign:'center'},
    get:{fontSize: 25, color: '#620C31', letterSpacing: 1, textAlign:'center'},
    consume:{ fontSize: 30, color: '#BC945B', letterSpacing: 1, textAlign:'center',marginTop:'4%'},
    hidalgo:{ fontSize: 30, color: '#620C31', letterSpacing: 1, textAlign:'center',marginTop:'4%'},    
});
//export default function Acceso ({navigator});
export default Registrar;