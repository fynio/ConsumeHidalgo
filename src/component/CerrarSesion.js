import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { useNavigation } from '@react-navigation/native';
const CerrarSesion = (  ) => {    
  
    const navigation = useNavigation();

    useEffect(() => { 
        removeData();
    }, []);

 
    const removeData = async () => {
      try {
    
        await AsyncStorage.removeItem('@storage_Key');
      
        
        navigation.navigate('Principal');

        RNRestart.Restart();              
      } catch (e) {
        // saving error
      }
    }
 
    
    return (     
      
       <View></View>
    );
        
};

export default CerrarSesion;
