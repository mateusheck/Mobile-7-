import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ListScreen() {
  const [dados, setDados] = useState([]);

  const buscarDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'carros'));

      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setDados(lista);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Aluguéis</Text>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              Carro: {item.nomeCarro}
            </Text>

            <Text style={styles.text}>
              Cliente: {item.nomeCliente}
            </Text>

            <Text style={styles.text}>
              Valor: R$ {Number(item.valorAluguel).toFixed(2)}
            </Text>

            <Text style={styles.text}>
              Data: {item.dataAluguel?.toDate?.().toLocaleDateString() || 'Sem data'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  text: {
    fontSize: 16,
    marginBottom: 5
  }
});