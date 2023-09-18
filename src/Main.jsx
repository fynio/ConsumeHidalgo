import React from 'react';
import Constants from 'expo-constants';
import {Button, TextInput, Text, View, Image, TouchableOpacity} from 'react-native';
import {Routes, NativeRouter, Redirect, Route, Switch, Link } from 'react-router-native';
import IniciarSesion from './component/IniciarSesion';
import Registrarme from './component/Registrarme';


const Main = ()=>{

    return(
        <NativeRouter> 
          <Routes>
            <Route path="/" element={
              <View>
               <IniciarSesion/>
              </View>
            } />
            <Route path="/Registrarme" element={
              <View>
               <Registrarme/>
              </View>
            } />

          </Routes>
      </NativeRouter>



    )
}
export default Main;  