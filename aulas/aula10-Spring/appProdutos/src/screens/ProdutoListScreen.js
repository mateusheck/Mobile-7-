import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import api from '../services/api'
import ProdutoCard from '../components/ProdutoCard'
import FeedbackModal from '../components/FeedbackModal'

export default function ProdutoListScreen({ navigation }) {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [modal, setModal] = useState({
    visivel: false,
    tipo: '',
    mensagem: '',
  })

  const abrirModal = (tipo, mensagem) =>
    setModal({ visivel: true, tipo, mensagem })

  const fecharModal = () =>
    setModal({ visivel: false, tipo: '', mensagem: '' })

  const carregarProdutos = async () => {
    try {
      setLoading(true)

      const resposta = await api.get('/api/produtos')

      setProdutos(resposta.data)
    } catch (erro) {
      abrirModal(
        'erro',
        'Não foi possível carregar os produtos.'
      )
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await carregarProdutos()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      carregarProdutos()
    }, [])
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.textoCarregando}>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Produtos</Text>
          <Text style={styles.subtitulo}>
            {produtos.length} cadastrado(s)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => navigation.navigate('ProdutoForm')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            onPressDetalhes={() =>
              navigation.navigate('ProdutoDetail', { id: item.id })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      <FeedbackModal
        visivel={modal.visivel}
        tipo={modal.tipo}
        mensagem={modal.mensagem}
        onFechar={fecharModal}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 10,
    color: '#64748b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitulo: {
    color: '#94a3b8',
  },
  botaoNovo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
})