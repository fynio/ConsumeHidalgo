import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Cf = ( ) => {
    return (
        <View style={{}}>
            <View style={{marginTop:'10%', justifyContent:'center', marginHorizontal:'20%'}}>
                <Image
                    style={styles.topImage}
                    source = {require('../../../assets/img/logo.png')} 
                />
            </View>
        </View>
    );
 }

 const styles = StyleSheet.create({
    topImage:{height: 220, width: 220 },
    titulo:{marginHorizontal:'2%', alignItems:'center', marginTop:10},
    consume:{ fontSize: 35, color: '#050545', letterSpacing: 1 },
    hidalgo:{ fontSize: 35, color: '#3e4144', letterSpacing: 1},
 });

export default Cf;