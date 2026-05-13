import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import api from '../services/api'
import FeedbackModal from '../components/FeedbackModal'

export default function ProdutoFormScreen({ navigation, route }) {
  const produtoId = route.params?.id ?? null
  const editando = produtoId !== null

  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [valor, setValor] = useState('')
  const [salvando, setSalvando] = useState(false)

  const [modal, setModal] = useState({
    visivel: false,
    tipo: '',
    mensagem: '',
  })

  const abrirModal = (tipo, mensagem) =>
    setModal({ visivel: true, tipo, mensagem })

  const fecharModal = () => {
    const tipo = modal.tipo

    setModal({
      visivel: false,
      tipo: '',
      mensagem: '',
    })

    if (tipo === 'sucesso') {
      navigation.goBack()
    }
  }

  useEffect(() => {
    if (!editando) return

    const carregarProduto = async () => {
      try {
        const resposta = await api.get(`/api/produtos/${produtoId}`)

        setNome(resposta.data.nome)
        setQuantidade(String(resposta.data.quantidade))
        setValor(String(resposta.data.valor))
      } catch (erro) {
        abrirModal('erro', 'Erro ao carregar produto.')
      }
    }

    carregarProduto()
  }, [])

  const salvarProduto = async () => {
    try {
      setSalvando(true)

      const payload = {
        nome,
        quantidade: Number(quantidade),
        valor: Number(valor),
      }

      if (editando) {
        await api.put(`/api/produtos/${produtoId}`, payload)
        abrirModal('sucesso', 'Produto atualizado!')
      } else {
        await api.post('/api/produtos', payload)
        abrirModal('sucesso', 'Produto cadastrado!')
      }
    } catch (erro) {
      abrirModal('erro', 'Erro ao salvar produto.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        {editando ? 'Editar Produto' : 'Novo Produto'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarProduto}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>
            {editando ? 'Atualizar' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

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
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  botao: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '700',
  },
})