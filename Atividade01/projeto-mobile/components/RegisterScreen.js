import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/FirebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      if (!auth || !db) {
        throw new Error("Firebase não carregou");
      }

      if (!name || !email || !password || !birthDate) {
        setModalMessage('Preencha todos os campos');
        setIsSuccess(false);
        setModalVisible(true);
        return;
      }

      let userCreated = null;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      userCreated = userCredential.user;

      await setDoc(doc(db, 'users', userCreated.uid), {
        name,
        email,
        birthDate,
        createdAt: new Date().toISOString()
      });

      setModalMessage('Cadastro realizado com sucesso');
      setIsSuccess(true);
      setModalVisible(true);

    } catch (error) {
      console.log(error); 

      setIsSuccess(false);

      if (error.code === 'auth/email-already-in-use') {
        setModalMessage('Email já em uso');
      } else if (error.code === 'auth/weak-password') {
        setModalMessage('Senha muito fraca');
      } else {
        setModalMessage('Erro: ' + error.message);
      }

      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              {isSuccess ? 'Sucesso' : 'Erro'}
            </Text>

            <Text style={{ marginBottom: 20 }}>{modalMessage}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={{ color: '#fff' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
  },
});