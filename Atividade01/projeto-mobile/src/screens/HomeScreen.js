import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:30 }}>
      <Text>Bem-Vindo ao aplicativo. </Text>
      <Text>Utilize o menu de navegação para acessar as telas de modais e as listas com rolagem.</Text>
    </View>
  );
}