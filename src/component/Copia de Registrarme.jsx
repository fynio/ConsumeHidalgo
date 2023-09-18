import React, { useEffect, useState }  from 'react';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';


import {StyleSheet,  SafeAreaView,TouchableWithoutFeedback,  ScrollView,
    Keyboard, Text, View,Image, Dimensions,TouchableOpacity, Linking, Alert} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
const ScreenWidth = Dimensions.get('window').width;
const Space = ScreenWidth - (ScreenWidth * .2);





const Registrarme = ({navigation})=>{


  const [token, setToken] = useState(null);

    const [escribe, setEscribe] = useState(false);
   // const [data, setData] = React.useState(token);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@token');
        if (storedToken !== null) {
       
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    getToken();
  }, []);




    return(
        <TouchableWithoutFeedback onPress={ ()=>{ Keyboard.dismiss(); setEscribe(false); }}>           
            <ScrollView>    
                <View style={{
                width: Space,
                marginTop:'14%', 
                justifyContent:'center', 
                marginHorizontal:'10%'}}>
                    
                    <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Image
                    style={styles.topImage}
                    source = {require('./../../assets/img/logo.png')} 
                    /> 
                    </View>
                  <Text> </Text>
                  <Text>{token}</Text>



                    <TouchableOpacity>
              
                        <Button  
                        onPress={() => navigation.navigate('IniciarSesion')}
                        style={{backgroundColor:'white'}}
                        mode="outlined"
                        icon="arrow-left">
                        Regresar
                        </Button> 
                            
                    </TouchableOpacity>
                        
      

                
                </View>





            </ScrollView>
        </TouchableWithoutFeedback>

    )
}



const styles = StyleSheet.create({
    topImage:{height: 240, width: 190 },
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
export default Registrarme;  