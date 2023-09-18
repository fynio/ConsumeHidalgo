import React from 'react';
import { View, Text, Button } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>Pantalla de Perfil</Text>
      <Button
        title="Ir a la Pantalla de Inicio"
        onPress={() => navigation.navigate('Inicio')}
      />
    </View>
  );
}

export default ProfileScreen; 


