import React, {useEffect} from 'react'; 
import Bolsa from './bolsa';

import {
  SafeAreaView,
  ScrollView,  
  StyleSheet,
  Text,
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
                    <TouchableOpacity onPress={() => Linking.openURL("https://consume.hidalgo.gob.mx/aviso_de_privacidad.php")}>
                    <Text style={{ textAlign:'right',  color: 'rgba(105, 28, 49, 1)' }}>Aviso de privacidad</Text>
                    </TouchableOpacity>

                    <Text></Text>
                    <Text></Text>
                    <Button icon="key" mode="contained" onPress={() => navigation.navigate('IniciarSesion')}>
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
                    mode="outlined"
                    icon="account-plus"  onPress={() => console.log('Pressed')}>
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
 
const styles = StyleSheet.create({
    
    bottomImage:{height: 80, width: 150 },
    topImage:{height: 190, width: 120 },
  contenedor:{ 
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },   
  sesion:{ 
    fontSize:15,
    lineHeight:21,
    textAlign:'justify',
    color:'#000'
  },
  cabecera:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1
  },
  cabecera2:{
    marginHorizontal:'5%',
    marginVertical:'4%',
    fontSize: 28, color: '#BC945B', letterSpacing: 1
  },



azul:{ 
    marginVertical:'4%',
    fontSize: 28, color: '#620C31', letterSpacing: 1
},
azulProductos:{
  marginTop:'-2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1
},

azulServicios:{
  marginTop:'2%',
  marginHorizontal:'5%',
  marginVertical:'4%',
  fontSize:20, color: '#620C31', letterSpacing: 1
},
rowEnd: {
  marginTop:'3%',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '5%'
},
 row: {   
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  Vw_1: {
    flex: 1,
    height: 100,
    marginRight:10,
    marginLeft:10,
  },
  Vw_2: {
    marginRight:10,
    marginLeft:10,
  },
  Touchable: {
    backgroundColor: '#620C31',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width:'80%',
    height:'40%',
    alignItems:'center',
    alignSelf:'center',
    marginTop:'6%',
  },
  TextoBoton:{
    color:'white',
  },


});

export default Principal;
