import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Bolsa = ( ) => {
    return (
        <View style={{}}>
            <View style={{marginTop:'10%', justifyContent:'center', marginHorizontal:'20%'}}>
                <Image
                    style={styles.topImage}
                    source = {require('../../assets/img/encuentra.png')} 
                />
            </View>           
        </View>
    );
 }

 const styles = StyleSheet.create({
    topImage:{height: 200, width: 200 },    
 });

export default Bolsa;