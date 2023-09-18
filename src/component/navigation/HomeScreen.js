import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Pantalla de Inicio</Text>
      <Button
        title="Ir a la Pantalla de Perfil"
        onPress={() => navigation.navigate('Perfil')}
      />
    </View>
  );
}

export default HomeScreen;