import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import api from '../services/api'
import FeedbackModal from '../components/FeedbackModal'
import ConfirmacaoModal from '../components/ConfirmacaoModal'

export default function ProdutoDetailScreen({ navigation, route }) {
  const { id } = route.params

  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)

  const [feedback, setFeedback] = useState({
    visivel: false,
    tipo: '',
    mensagem: '',
  })

  const [confirmacao, setConfirmacao] = useState(false)

  const abrirFeedback = (tipo, mensagem) =>
    setFeedback({ visivel: true, tipo, mensagem })

  const fecharFeedback = () => {
    const tipo = feedback.tipo

    setFeedback({
      visivel: false,
      tipo: '',
      mensagem: '',
    })

    if (tipo === 'sucesso') {
      navigation.goBack()
    }
  }

  useEffect(() => {
    carregarProduto()
  }, [])

  const carregarProduto = async () => {
    try {
      const resposta = await api.get(`/api/produtos/${id}`)
      setProduto(resposta.data)
    } catch (erro) {
      abrirFeedback('erro', 'Erro ao carregar produto.')
    } finally {
      setLoading(false)
    }
  }

  const excluirProduto = async () => {
    setConfirmacao(false)

    try {
      await api.delete(`/api/produtos/${id}`)
      abrirFeedback('sucesso', 'Produto excluído!')
    } catch (erro) {
      abrirFeedback('erro', 'Erro ao excluir produto.')
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.nome}>{produto.nome}</Text>

        <Text style={styles.info}>
          Quantidade: {produto.quantidade}
        </Text>

        <Text style={styles.info}>
          Valor: R$ {produto.valor}
        </Text>

        <Text style={styles.info}>
          ID: {produto.id}
        </Text>
      </View>

      <View style={styles.acoes}>

        <TouchableOpacity
          style={[styles.botao, styles.editar]}
          onPress={() =>
            navigation.navigate('ProdutoForm', { id: produto.id })
          }
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.excluir]}
          onPress={() => setConfirmacao(true)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>

      </View>

      <ConfirmacaoModal
        visivel={confirmacao}
        mensagem={`Deseja excluir "${produto.nome}"?`}
        onConfirmar={excluirProduto}
        onCancelar={() => setConfirmacao(false)}
      />

      <FeedbackModal
        visivel={feedback.visivel}
        tipo={feedback.tipo}
        mensagem={feedback.mensagem}
        onFechar={fecharFeedback}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  botao: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  editar: {
    backgroundColor: '#16a34a',
  },
  excluir: {
    backgroundColor: '#dc2626',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '700',
  },
})