import React ,{useState} from 'react';
import { ScrollView, Text, StyleSheet, View, Alert,ActivityIndicator} from 'react-native';
import {TextInput, Button, HelperText } from 'react-native-paper';
 
import axios from 'axios';

const RecuperarContrasena = ( {navigation} ) => {
  const [mail, setMail] = React.useState('');
  const [valUser, setValUser] = React.useState(false);
  const [enviando, setEnviado] = useState(false);

  const [validando, setValidando] = React.useState(false);
  const signMail = async () =>{
    if(mail.length<=0){
      setValUser(true);
    }
    else{
      setValUser(false);
    }
    
    setValUser( !mail.includes('@') );

    if(mail.includes('@') && mail.length>0){
      let data = {email: mail };
      const url = global.url + "recupera/";
      setEnviado(true);
      try {
          await axios.post(url, data)
          .then( function (response){
 


            if(response.status==200){    
              setEnviado(false);          
               if(response.data.code==1){                
                Alert.alert("¡Bien hecho!",
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
              setEnviado(false);
              Alert.alert("Conexión incompleta!",
                  "Imposible acceder al servidor en este momento.",
                  [ { text: "Aceptar" }]
              );
            }
          });             
        } catch (error) {
          setValidando(false);
          setEnviado(false);        
          Alert.alert("Servidor sin conexión!",
          error.code + " Ocurrio un error",
            [ { text: "Aceptar" }]
          );
        }
      }
  }

 return (
<ScrollView >
 
    <View style={{marginHorizontal:'10%', marginVertical:'30%'}}>
    <Text style={styles.fs}>¡Recuperación de contraseña!</Text>
    <Text style={styles.fc}>Ingresa el correo electrónico registrado</Text>
    <View style={styles.contenedorBody} >
    <TextInput
         mode="flat"
         style={styles.input}
        value={mail}
        underlineColorAndroid="transparent"
        keyboardType="email-address"
        onChangeText={mail => setMail(mail)}
        placeholder={'Escribe tu correo'}
        maxLength={58} />
        <HelperText type="error" visible={valUser}>
          Escrbe tu dirección de correo electrónico!
        </HelperText>       

        <Button 
          style={{ marginTop: '5%'}}
          icon="send"
          mode="contained"
          color="#3e4144"
          onPress={ () => signMail() }>
            Enviar Correo
          </Button>
        
          {enviando?
                <ActivityIndicator style={{marginTop:'5%'}} size="large" />
            :
                <View></View>
          }

          <Button 
          style={{ marginTop: '5%'}}
          icon="arrow-left"
          mode="contained" 
          onPress={() => navigation.navigate('IniciarSesion')}>
            Regresar
          </Button>

          
      </View>
    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
    consume:{ fontSize: 30, color: '#6F7271', letterSpacing: 1, textAlign:'center'},
    hidalgo:{ fontSize: 30, color: '#3e4144', letterSpacing: 1, textAlign:'center'},    
    titulo:{marginTop:'3%',},
    fs:{fontSize: 25, color: '#6F7271', letterSpacing: 1, textAlign:'center', marginTop:'7%'},
    fc:{fontSize: 15, color: '#6F7271', letterSpacing: 1, textAlign:'center', marginTop:'7%'},
    contenedorBody:{flex: 1,justifyContent: "center", alignItems: "center"},
    input: {height: 20, width:'90%',marginRight:'4%',marginLeft:'4%',padding: 10,marginTop:'10%'},
});

export default RecuperarContrasena;