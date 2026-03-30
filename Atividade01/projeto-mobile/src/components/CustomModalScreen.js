import React, { useState } from 'react';
import {  Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../styles/CustomModalSytles';

/**
 * Componente CustomModalScreen
 * @param {string} animation - Recebe 'slide', 'fade' ou 'none' para definir a transição.
 * @param {string} themeColor - Recebe uma cor em Hexadecimal para personalizar a interface.
 */
const CustomModalScreen = ({ animation, themeColor }) => {
  
  // HOOK DE ESTADO: Controle de visibilidade
  // O Modal no React Native é 'declarativo'. Ele só aparece se 'visible' for true.
  // Iniciamos com 'false' para que o modal permaneça oculto até a interação do usuário.
  const [visible, setVisible] = useState(false);

  return (
    // SAFEAREAVIEW: Protege o conteúdo contra recortes físicos (Notch) e barras de status.
    // Usamos um array no style para combinar o estilo fixo com uma cor de fundo dinâmica.
    // O '+ 10' no final da themeColor aplica uma transparência de 10% (padrão Hexadecimal).
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: themeColor + '10' }]}>
      
      {/* EXIBIÇÃO DO MODO: Mostra ao usuário qual tipo de animação está sendo testada */}
      <Text style={[styles.headerText, { color: themeColor }]}>
        Modo: {animation.toUpperCase()}
      </Text>
      
      {/* BOTÃO DE ATIVAÇÃO: Ao ser pressionado (onPress), altera o estado para 'true' */}
      <TouchableOpacity 
        style={[styles.mainButton, { backgroundColor: themeColor }]} 
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}> TIPO {animation.toUpperCase()}</Text>
      </TouchableOpacity>

      {/* COMPONENTE MODAL: A camada sobreposta de alto nível */}
      <Modal
        animationType={animation} // Define como o modal entra na tela (slide, fade ou none)
        transparent={true}        // Essencial para que possamos ver o overlay escurecido por baixo
        visible={visible}          // Conecta a visibilidade ao nosso estado 'visible'
        // ACESSIBILIDADE ANDROID: Permite fechar o modal ao apertar o botão físico de voltar
        onRequestClose={() => setVisible(false)} 
      >
        {/* 
            ESTRATÉGIA DE BACKDROP (FUNDO):
            Este TouchableOpacity ocupa a tela toda (flex: 1) e serve para capturar
            toques fora do card branco. Ao tocar aqui, o modal fecha.
            activeOpacity={1} garante que o fundo não mude de cor ao ser clicado.
        */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setVisible(false)} // Fecha o modal ao detectar toque fora do card
        >
          {/* 
              CARD DO MODAL (O CONTEÚDO):
              Envolvido em uma View para que toques dentro dele não fechem o modal acidentalmente,
              pois a View não propaga o evento de clique para o TouchableOpacity pai.
          */}
          <View style={styles.modalCard}>
            
            {/* INDICADOR VISUAL: Barra colorida no topo para reforçar a identidade da aba */}
            <View style={[styles.colorIndicator, { backgroundColor: themeColor }]} />
            
            <Text style={styles.modalTitle}>Animação {animation}</Text>
            
            <Text style={styles.modalBody}>
              Esta transição demonstra o comportamento nativo do tipo "{animation}".
            </Text>
            
            {/* BOTÃO DE FECHAMENTO MANUAL: Uma alternativa clara de saída dentro do card */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>FECHAR</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// Estilos detalhados para garantir uma interface limpa


export default CustomModalScreen;