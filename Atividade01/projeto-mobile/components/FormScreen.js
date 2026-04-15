import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';

import { db } from '../config/FirebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function FormScreen({ navigation }) {
  const [nomeCarro, setNomeCarro] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [dataAluguel, setDataAluguel] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSave = async () => {
    try {
      if (!nomeCarro || !nomeCliente || !valorAluguel || !dataAluguel) {
        setModalMessage('Preencha todos os campos');
        setModalVisible(true);
        return;
      }

      await addDoc(collection(db, 'carros'), {
        nomeCarro,
        nomeCliente,
        valorAluguel: Number(valorAluguel), 
        dataAluguel: Timestamp.fromDate(new Date(dataAluguel)), 
        createdAt: Timestamp.now()
      });

      setModalMessage('Salvo com sucesso!');
      setModalVisible(true);

      setNomeCarro('');
      setNomeCliente('');
      setValorAluguel('');
      setDataAluguel('');

    } catch (error) {
      console.log(error);
      setModalMessage('Erro: ' + error.message);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluguel</Text>

      <TextInput
        style={styles.input}
        placeholder="Carro"
        value={nomeCarro}
        onChangeText={setNomeCarro}
      />

      <TextInput
        style={styles.input}
        placeholder="Cliente"
        value={nomeCliente}
        onChangeText={setNomeCliente}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor (ex: 150.50)"
        value={valorAluguel}
        onChangeText={setValorAluguel}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={dataAluguel}
        onChangeText={setDataAluguel}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>{modalMessage}</Text>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: 'blue', padding: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  }
});