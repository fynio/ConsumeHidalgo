import React, {useEffect} from 'react'; 
import Bolsa from './bolsa';
import styles from './../themes/theme';
 
import {
    Keyboard,
  SafeAreaView,
  ScrollView,   
  Text,Linking,
  View, TouchableOpacity,  Image,Dimensions,TouchableWithoutFeedback
} from 'react-native';

import { TextInput, Button, HelperText } from 'react-native-paper';

const ScreenWidth = Dimensions.get('window').width;
const Space = ScreenWidth - (ScreenWidth * .2); 

const Principal = ( { navigation }) => { 
 
  return (
  
     

            <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss(); setEscribe(false); }}>     

            <ScrollView style={{backgroundColor:'rgb(255,255,255)'}}>    
                <View 
                        

                    style={{
                        width: Space, 
                        marginTop:'14%', 
                        justifyContent:'center', 
                        marginHorizontal:'10%'
                    }}>

               
                    <SafeAreaView>

 
                    <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>


                <Image
                style={styles.topImage}
                source = {require('./../../assets/img/logo.png')} 
                />

                </View> 


                <Text></Text>
                    <Text></Text>
                    <Text style={styles.sesion}>Plataforma diseñada por la Secretaría de Desarrollo Económico de Hidalgo, con la finalidad de apoyar a la sociedad hidalguense mejorando la relación entre empresas comerciales, industriales y productores que ofrecen bienes y servicios, sin costo de inscripción, mensualidades ni comisiones por venta realizada. </Text>
         
                    <Text></Text>
                    <Text></Text>
                    <TouchableOpacity onPress={() => Linking.openURL("https://consume.hidalgo.gob.mx/politicas_de_privacidad.html")}>
                    <Text style={{ textAlign:'right',  color: '#3e4144' }}>Aviso de privacidad</Text>
                    </TouchableOpacity>

                    <Text></Text>
                    <Text></Text>
                    <Button icon="key" mode="contained" onPress={() => navigation.navigate('IniciarSesion')}>
                    Iniciar sesión
                    </Button>

                    <Text></Text>
                    <Text></Text> 
                    <Button  onPress={() => navigation.navigate('Registrarme')} style={{backgroundColor:'#65727c'}} icon="account-plus" mode="contained" >
                    Registrarme
                    </Button>  

                    <Text></Text>
                    <Text></Text>
                    <Button 
                    mode="outlined"
                    icon="account-plus"  onPress={() => navigation.navigate('RecuperarContrasena')}  >
                    Olvide la contraseña
                    </Button>

                    <Text></Text>
                    <Text></Text>
                    <TouchableOpacity onPress={() => Linking.openURL("https://consume.hidalgo.gob.mx/dar_de_baja.php")}>
                    <Button style={{color:'rgb(0,0,255)'}} icon="arrow-down-bold" mode="outlined" >
                        Darme de baja
                        </Button> 
                    </TouchableOpacity>

 
                  

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


 
  );
};
 

export default Principal;
