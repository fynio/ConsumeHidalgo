import React  from 'react'; 
import {  SafeAreaView,TouchableWithoutFeedback,  ScrollView,
    Keyboard, Text, View,Image, Dimensions,TouchableOpacity, Linking, Alert} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'; 
const ScreenWidth = Dimensions.get('window').width;
const Space = ScreenWidth - (ScreenWidth * .2); 

import styles from './../themes/theme';
global.url = "https://consume.hidalgo.gob.mx/API/public/index.php/";


const IniciarSesion = ( {navigation})=>{

    const [escribe, setEscribe] = React.useState(false);
    const [correo, setCorreo] = React.useState('admin@gmail.com');
    const [contrasena, setcontrasena] = React.useState('1');
  

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
            if(contrasena=="")
            {
                Alert.alert("Ingrese una contraseña");
                return 0;
            }
    
    
            let DATOS = {user: correo, pass: contrasena, origen: Platform.OS === 'ios' ? 2 : 1 };
    
         
            const response = await axios.post( global.url + 'login/', DATOS);
      
        

            if(response.status==200){
      
                

                if(response.data.codigo==1){
      
    
                    await  AsyncStorage.setItem('@token', JSON.stringify(response.data.token).replace(/['"]+/g, ''));
                
                    if(JSON.stringify(response.data.id_tipo_usuario==2))
                    {
                        navigation.navigate("AppNavigation");
                     
                     
                    }
                    if(JSON.stringify(response.data.id_tipo_usuario==1|| response.data.id_tipo_usuario==0))
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

            <ScrollView style={{backgroundColor:'rgb(255,255,255)', height:'100%',   display:'flex',flexDirection:'column'}}>    
                <View 
                        

                    style={{
                        width: Space, 
                     display:'flex', 
                     flexDirection:'column', 
                        marginTop:'40%', 
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
                        value={contrasena}
                        label="Contraseña"
                        keyboardType="visible-contrasena"
                        onChangeText={contrasena => setcontrasena(contrasena)}
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

 

export default IniciarSesion;  