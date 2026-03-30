import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    // Container principal da tela que recebe o componente
    screenContainer: {
        flex: 1,                    // Faz a View ocupar 100% do espaço disponível na tela
        justifyContent: 'center',    // Alinha o botão de abrir no centro vertical (eixo principal)
        alignItems: 'center',        // Alinha o botão de abrir no centro horizontal (eixo secundário)
        padding: 20                  // Garante uma margem de segurança nas laterais da tela
    },

    // Estilo do título que identifica o tipo de animação na tela
    headerText: {
        fontSize: 24,               // Tamanho grande para hierarquia visual de título
        fontWeight: '900',          // Peso máximo da fonte para dar destaque e clareza
        marginBottom: 20            // Afasta o título do botão que vem logo abaixo
    },

    // Estilo do botão que dispara a abertura do Modal
    mainButton: {
        paddingVertical: 15,        // Espaçamento interno em cima e embaixo para aumentar a área de toque
        paddingHorizontal: 30,      // Espaçamento interno nas laterais para o botão não ficar "apertado"
        borderRadius: 12,           // Arredonda as bordas para um visual moderno e amigável
        elevation: 4                // Adiciona uma sombra projetada (específico para Android)
    },

    // Estilo do texto dentro do botão principal
    buttonText: {
        color: '#fff',              // Branco para garantir contraste máximo com as cores de fundo
        fontSize: 16,               // Tamanho padrão de leitura confortável para botões
        fontWeight: 'bold'          // Negrito para destacar a ação do botão
    },

    // Camada de fundo que sobrepõe a tela quando o modal abre (Backdrop)
    modalOverlay: {
        flex: 1,                    // Ocupa toda a extensão da tela para bloquear interações no fundo
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor preta com 70% de transparência para dar foco ao Modal
        justifyContent: 'center',    // Centraliza o card branco verticalmente
        alignItems: 'center'         // Centraliza o card branco horizontalmente
    },

    // O card branco que contém a informação do Modal
    modalCard: {
        width: '80%',               // Ocupa 80% da largura da tela, deixando as bordas do fundo visíveis
        backgroundColor: '#fff',     // Fundo branco sólido para legibilidade
        borderRadius: 20,           // Bordas bem arredondadas para transmitir suavidade
        padding: 25,                // Espaçamento interno para o conteúdo não tocar nas bordas do card
        alignItems: 'center',       // Centraliza todos os textos e botões dentro do card
        overflow: 'hidden'          // Corta qualquer elemento filho que tente sair do limite arredondado do card
    },

    // Linha colorida no topo do modal para identificação visual rápida
    colorIndicator: {
        width: '120%',              // Um pouco maior que o card para cobrir as curvas das bordas
        height: 10,                 // Espessura da barra colorida
        position: 'absolute',       // Retira do fluxo de texto para "colar" no topo do card
        top: 0                      // Fixa exatamente na extremidade superior do Modal
    },

    // Título interno do Modal
    modalTitle: {
        fontSize: 22,               // Tamanho de destaque para o título interno
        fontWeight: 'bold',         // Negrito para autoridade da informação
        marginTop: 15,              // Espaço para não encostar na barra colorida do topo
        marginBottom: 10            // Espaço antes do texto descritivo
    },

    // Texto descritivo que explica a animação ao usuário
    modalBody: {
        fontSize: 16,               // Tamanho padrão para leitura de corpo de texto
        textAlign: 'center',        // Centraliza o texto para manter a simetria do card
        color: '#666',              // Cinza escuro para ser menos agressivo que o preto puro
        marginBottom: 20            // Espaço antes do botão de fechar
    },

    // Botão secundário para fechar o Modal (Estilo Ghost/Outline)
    closeButton: {
        borderWidth: 1,             // Adiciona uma borda fina em vez de fundo sólido
        borderColor: '#ddd',        // Cor de borda neutra para não competir com o botão principal
        paddingVertical: 10,        // Altura do botão de fechar
        paddingHorizontal: 20,      // Largura do botão de fechar
        borderRadius: 8             // Bordas levemente arredondadas
    },

    // Texto do botão de fechar
    closeButtonText: {
        color: '#666',              // Cor neutra para indicar uma ação secundária ou de cancelamento
        fontWeight: 'bold'          // Negrito para facilitar a leitura da ação de saída
    },
});