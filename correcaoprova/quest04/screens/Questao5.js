import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

function Mensagem({ texto }) {
  return (
    <View>
      <Text style={styles.msg}>{texto}</Text>
    </View>
  );
}

export default function Questao5() {
  const [texto, setTexto] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite seu texto"
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />

      <Mensagem texto={texto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  msg: {
    fontSize: 20,
  },
});