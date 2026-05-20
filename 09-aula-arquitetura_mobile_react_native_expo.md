# Arquitetura de Desenvolvimento Mobile com Foco em React Native e Expo

## Objetivo

Este material apresenta os principais conceitos de arquitetura de desenvolvimento mobile, com foco em projetos modernos feitos com React Native e Expo. A proposta é mostrar como organizar o código para melhorar manutenção, escalabilidade, testes, reuso e integração com recursos do dispositivo e com APIs externas.

---

## 1. O que é arquitetura de desenvolvimento mobile

Arquitetura de software é a forma como o sistema é organizado em partes que possuem responsabilidades bem definidas. Em mobile, isso é ainda mais importante porque o aplicativo precisa lidar com interface, navegação, estado, persistência local, consumo de APIs, permissões, desempenho, funcionamento offline e integração com recursos nativos do aparelho.

Uma boa arquitetura ajuda a responder perguntas como:

1. Onde fica a regra de negócio.
2. Onde ficam as chamadas de API.
3. Onde ficam as regras de acesso ao armazenamento local.
4. Onde ficam os acessos à câmera, localização, notificações, biometria e outros recursos do dispositivo.
5. Como evitar que a interface fique acoplada à infraestrutura.

---

## 2. Principais abordagens de desenvolvimento mobile

### 2.1 Desenvolvimento nativo

Nesse modelo, o aplicativo é feito com a linguagem e as ferramentas oficiais de cada plataforma. No Android, o mais comum é Kotlin. No iOS, o mais comum é Swift.

**Vantagens:**

1. Melhor acesso aos recursos do sistema.
2. Maior controle de desempenho.
3. Melhor aderência às convenções da plataforma.

**Desvantagens:**

1. Dois códigos diferentes para manter.
2. Maior custo de desenvolvimento.
3. Reuso reduzido entre Android e iOS.

Esse modelo é excelente quando o projeto exige integração profunda com o sistema operacional, mas normalmente aumenta o esforço de manutenção.

### 2.2 Desenvolvimento híbrido

Nesse modelo, a aplicação é construída com tecnologias web e executada em um container mobile, geralmente com WebView.

**Vantagens:**

1. Curva de aprendizado menor para equipes web.
2. Reuso alto de código.
3. Entrega rápida para casos simples.

**Desvantagens:**

1. Menor sensação de aplicativo nativo.
2. Limitações em desempenho e experiência.
3. Integração com recursos do dispositivo pode ser mais restrita.

Esse modelo é útil em cenários específicos, mas costuma ser menos indicado para aplicações mobile mais exigentes.

### 2.3 Desenvolvimento cross platform

Nesse modelo, um único projeto gera aplicativos para Android e iOS, com acesso a recursos nativos. Os exemplos mais conhecidos são React Native e Flutter.

**Vantagens:**

1. Compartilhamento elevado de código.
2. Menor custo de manutenção.
3. Entrega mais rápida.
4. Boa experiência para equipes que desejam atender duas plataformas com um único time.

**Desvantagens:**

1. Ainda existe dependência de módulos nativos em alguns casos.
2. É necessário organizar bem a arquitetura para evitar um projeto confuso.
3. Em cenários muito específicos, pode ser preciso implementar partes nativas.

Para a maior parte dos projetos modernos, essa abordagem é uma das mais equilibradas.

---

## 3. Por que priorizar React Native com Expo

React Native permite criar interfaces móveis com componentes nativos, usando JavaScript ou TypeScript. O ecossistema Expo amplia essa experiência com ferramentas que aceleram o desenvolvimento, a execução local, os testes e a publicação.

O React Native descreve a plataforma como uma biblioteca JavaScript para construir interfaces nativas. A documentação atual também destaca a New Architecture, que substitui o bridge assíncrono por um modelo mais direto com JSI, Turbo Modules e Fabric. A Expo, por sua vez, se apresenta como um framework completo para React Native, com serviços de cloud e ferramentas para desenvolver, distribuir e publicar apps com mais produtividade.

Em projetos novos, Expo é uma escolha muito forte porque simplifica o início do desenvolvimento e já oferece um caminho claro para evolução do app. A documentação da Expo também destaca suporte a módulos nativos modernos, New Architecture, monorepos, roteamento por arquivos e integração com recursos de dispositivo.

---

## 4. Arquiteturas internas mais usadas em projetos mobile

Aqui a palavra arquitetura não se refere apenas à tecnologia usada para criar o app. Ela também se refere à forma como o código é dividido internamente.

### 4.1 MVC — Model, View, Controller

MVC é um dos padrões arquiteturais mais antigos e amplamente conhecidos no desenvolvimento de software, e foi um dos primeiros a ser adotado em projetos mobile.

#### Principais conceitos

- **Model**: Representa os dados e as regras ligadas a eles. É responsável por acessar, manipular e persistir informações — seja via banco de dados local, API ou qualquer outra fonte de dados.
- **View**: Representa a interface visual com a qual o usuário interage. Exibe os dados recebidos e captura as ações do usuário.
- **Controller**: Atua como intermediário. Recebe as ações da View, processa a lógica necessária e coordena as respostas entre a View e o Model.

#### Como funciona na prática

O fluxo clássico é: o usuário interage com a **View** → a **View** notifica o **Controller** → o **Controller** consulta ou atualiza o **Model** → o **Model** retorna os dados → o **Controller** atualiza a **View**.

Em frameworks mobile como UIKit (iOS), o próprio `ViewController` tende a assumir o papel de Controller, o que é historicamente natural para a plataforma.

#### Vantagens

- **Simplicidade inicial**: Fácil de entender e adotar em projetos pequenos ou por desenvolvedores iniciantes.
- **Suporte nativo**: Frameworks como UIKit foram projetados com MVC em mente, tornando a adoção natural no ecossistema Apple.
- **Curva de aprendizado baixa**: Por ser amplamente documentado e ensinado, há uma grande quantidade de recursos disponíveis.
- **Prototipagem rápida**: Ideal para criar MVPs e aplicações com escopo limitado rapidamente.

#### Pontos negativos

- **Massive View Controller**: Em mobile, o Controller (especialmente o `ViewController` no iOS) tende a acumular responsabilidades de navegação, lógica de negócio, formatação de dados e gerenciamento de estado, tornando-se um arquivo com centenas ou milhares de linhas. Esse antipadrão é tão comum que ganhou o apelido irônico de "Massive View Controller".
- **Baixa testabilidade**: Com a lógica misturada à camada de interface, isolar e testar comportamentos específicos se torna difícil.
- **Alto acoplamento**: View e Controller frequentemente ficam fortemente acoplados, dificultando reutilização e manutenção.
- **Escalabilidade limitada**: Conforme o projeto cresce, a falta de separação clara de responsabilidades gera dívida técnica rapidamente.

### 4.2 MVP — Model, View, Presenter

MVP surgiu como uma evolução do MVC, buscando resolver principalmente o problema de acoplamento entre interface e lógica, tornando o código mais testável e organizado.

#### Principais conceitos

- **Model**: Continua sendo responsável pelos dados e pelas regras de negócio. Não tem conhecimento da interface.
- **View**: Exibe os dados na tela e delega ao Presenter todas as decisões de lógica. A View é passiva — ela apenas renderiza o que o Presenter determina e encaminha eventos de usuário.
- **Presenter**: Contém a lógica de apresentação. Ele consulta o Model, processa as informações e instrui a View sobre o que exibir. Não tem referência direta a componentes de UI.

#### Como funciona na prática

O fluxo é: o usuário age na **View** → a **View** chama um método do **Presenter** → o **Presenter** processa e consulta o **Model** → o **Presenter** chama um método da **View** para atualizar a interface. A comunicação entre View e Presenter costuma ser feita por meio de **interfaces/contratos**, o que permite substituir implementações facilmente.

#### Vantagens

- **Alta testabilidade**: Como o Presenter não tem dependência de UI, ele pode ser testado com testes unitários puros, sem precisar de emulador ou framework de UI.
- **Separação clara de responsabilidades**: A View não toma decisões de lógica; o Presenter não sabe como a UI está construída.
- **Facilidade de manutenção**: Alterações na interface não afetam a lógica de apresentação e vice-versa.
- **Melhor organização em telas complexas**: Em formulários extensos, fluxos com múltiplos estados ou telas com muitas regras de exibição, o MVP traz clareza estrutural.

#### Pontos negativos

- **Aumento de boilerplate**: A criação de interfaces/contratos para cada tela gera mais arquivos e mais código estrutural, o que pode parecer excessivo em telas simples.
- **Presenter pode crescer demais**: Sem disciplina, o Presenter pode acumular responsabilidades assim como o Controller no MVC.
- **Gerenciamento manual de estado**: Em aplicações com estados complexos e assíncronos, o MVP pode exigir soluções adicionais para gerenciar estado de forma eficiente.
- **Verbosidade**: A comunicação bidirecional via interfaces torna o código mais detalhado e pode dificultar a leitura do fluxo completo de uma funcionalidade.

### 4.3 MVVM — Model, View, ViewModel

MVVM é atualmente um dos padrões mais populares em desenvolvimento mobile moderno, especialmente com a ascensão de frameworks reativos como Jetpack Compose (Android), SwiftUI (iOS) e Flutter.

#### Principais conceitos

- **Model**: Representa os dados e as regras de negócio da aplicação. Pode incluir repositórios, entidades de domínio e fontes de dados.
- **View**: É a camada de interface do usuário. Observa o ViewModel e se atualiza automaticamente quando os dados mudam. Não contém lógica de negócio.
- **ViewModel**: Expõe dados observáveis e ações para a View. Processa eventos da interface, coordena chamadas ao Model e mantém o estado da tela. Não tem referência à View.

#### Como funciona na prática

O fluxo é baseado em **reatividade**: a View observa propriedades do ViewModel (como `StateFlow`, `LiveData`, `@Published` ou `Signal`). Quando o usuário interage, a View chama uma ação no ViewModel → o ViewModel atualiza o estado → a View reage automaticamente à mudança de estado. Essa ligação é frequentemente chamada de **data binding**.

#### Vantagens

- **Reatividade nativa**: Combina perfeitamente com ferramentas modernas como Jetpack Compose, SwiftUI e Flutter, onde a UI é declarativa e reage ao estado.
- **Separação clara**: A View não precisa saber como os dados são obtidos; o ViewModel não precisa saber como a UI é construída.
- **Testabilidade**: O ViewModel pode ser testado unitariamente sem dependências de UI, assim como o Presenter no MVP.
- **Gerenciamento de estado simplificado**: O uso de streams e observables torna o gerenciamento de estado assíncrono mais previsível.
- **Reutilização**: Um ViewModel pode ser compartilhado entre múltiplas Views em cenários específicos (ex: fragmentos em Android).

#### Pontos negativos

- **Curva de aprendizado**: Para quem não está familiarizado com programação reativa (RxJava, Coroutines, Combine, Riverpod), o paradigma pode ser desafiador no início.
- **ViewModel pode crescer**: Sem uma divisão adicional (como casos de uso), o ViewModel pode acumular responsabilidades demais.
- **Complexidade em fluxos simples**: Para telas muito simples, a estrutura do MVVM pode parecer excessivamente elaborada.
- **Data binding bidirecional**: Quando mal utilizado, pode tornar o rastreamento de bugs mais difícil, pois mudanças podem ocorrer em múltiplas direções.

### 4.4 Clean Architecture

Clean Architecture é uma das abordagens mais recomendadas para projetos médios e grandes. Proposta por Robert C. Martin (Uncle Bob), ela vai além de um padrão de camadas — é uma filosofia de design que coloca as regras de negócio no centro do sistema.

#### Principais conceitos

A Clean Architecture organiza o sistema em **camadas concêntricas**, onde a regra fundamental é: **dependências só podem apontar para dentro**. As camadas mais internas não conhecem as externas.

- **Entities (Domínio)**: O núcleo da aplicação. Contém as entidades e regras de negócio puras, sem dependência de frameworks, banco de dados ou UI. São as regras mais estáveis do sistema.
- **Use Cases (Casos de Uso / Interactors)**: Orquestram o fluxo de dados entre as entidades. Cada caso de uso representa uma ação específica do sistema (ex: `FetchUserProfileUseCase`, `PlaceOrderUseCase`).
- **Interface Adapters**: Traduzem dados entre os formatos do núcleo e os formatos das camadas externas. Aqui vivem os Presenters, ViewModels, Controllers e Gateways.
- **Frameworks & Drivers**: A camada mais externa. Contém detalhes como banco de dados, APIs, UI, frameworks e SDKs. Tudo que é volátil e sujeito a mudança fica aqui.

#### Como funciona na prática

A UI chama um **Use Case** → o Use Case executa a lógica de negócio usando **Entities** → o Use Case acessa dados via **interfaces de repositório** (definidas no domínio, implementadas na camada de dados) → os dados retornam ao Use Case → o Use Case retorna o resultado → a camada de apresentação exibe.

#### Vantagens

- **Alta manutenibilidade**: A separação rigorosa entre camadas permite modificar uma sem impactar as outras.
- **Testabilidade excelente**: O domínio e os casos de uso são testáveis sem nenhuma dependência externa.
- **Independência de frameworks**: Trocar o banco de dados, a API ou até o framework de UI não exige reescrever as regras de negócio.
- **Escalabilidade**: É a escolha natural para equipes grandes e projetos de longa duração.
- **Clareza de intenção**: Cada camada tem uma responsabilidade bem definida, tornando o código mais autodocumentado.

#### Pontos negativos

- **Overhead inicial elevado**: Exige mais arquivos, mais abstrações e mais tempo de configuração inicial, o que pode ser excessivo para projetos pequenos.
- **Curva de aprendizado**: Entender e aplicar corretamente os princípios (especialmente a inversão de dependências) exige experiência e disciplina.
- **Risco de over-engineering**: Em apps simples, a estrutura completa pode ser desnecessariamente complexa.
- **Boilerplate**: A criação de interfaces de repositório, mapeadores de dados e modelos por camada gera um volume significativo de código estrutural.

### 4.5 Hexagonal Architecture — Ports and Adapters

Também chamada de **Ports and Adapters**, a Arquitetura Hexagonal foi proposta por Alistair Cockburn com o objetivo de isolar completamente o núcleo da aplicação de qualquer detalhe tecnológico externo.

#### Principais conceitos

- **Core (Núcleo / Domínio)**: Contém toda a lógica de negócio da aplicação. É completamente independente de banco de dados, frameworks, APIs, SDKs ou plataforma.
- **Ports (Portas)**: São interfaces definidas pelo núcleo que especificam como ele deseja se comunicar com o mundo externo. Existem dois tipos:
  - **Primary Ports (Driving)**: Definem como atores externos (UI, testes, jobs) acionam o núcleo.
  - **Secondary Ports (Driven)**: Definem como o núcleo acessa recursos externos (banco de dados, APIs, notificações).
- **Adapters (Adaptadores)**: São implementações concretas das portas. Cada adaptador conecta o núcleo a uma tecnologia específica. Exemplos: um adaptador de banco de dados local (Room/SQLite), um adaptador de API REST, um adaptador de cache, um adaptador de UI.

#### Como funciona na prática

O hexágono (núcleo) não sabe se está sendo acionado por uma tela mobile, um teste automatizado ou um job agendado — ele apenas expõe suas **portas primárias**. Da mesma forma, ele não sabe se os dados vêm de um banco local, de uma API ou de um arquivo — ele apenas usa suas **portas secundárias**. Os **adaptadores** fazem a ponte entre o mundo real e o núcleo.

#### Vantagens

- **Máxima isolação do domínio**: O núcleo nunca é "contaminado" por detalhes tecnológicos.
- **Troca de tecnologia sem impacto no domínio**: Mudar de REST para GraphQL, de SQLite para Realm, ou de modo online para offline é uma questão de trocar ou adicionar um adaptador.
- **Suporte robusto a modo offline**: A separação entre porta e adaptador torna natural a implementação de estratégias como cache-first, network-first ou offline-first.
- **Testabilidade extrema**: O núcleo pode ser testado com adaptadores falsos (mocks/stubs) sem nenhuma infraestrutura real.
- **Facilidade de integração com SDKs de terceiros**: Cada SDK fica encapsulado em seu próprio adaptador, sem vazar para o domínio.

#### Pontos negativos

- **Complexidade conceitual**: A distinção entre portas primárias e secundárias, e a disciplina para não cruzar fronteiras, exige maturidade da equipe.
- **Volume de código**: A criação de interfaces e adaptadores para cada ponto de integração pode gerar muito código estrutural.
- **Overhead para projetos pequenos**: Assim como a Clean Architecture, pode ser excessiva para aplicações simples ou equipes pequenas sem necessidade de alta flexibilidade.
- **Documentação escassa em mobile**: Comparado a padrões como MVVM ou Clean Architecture, há menos material específico para mobile sobre Hexagonal Architecture.

### 4.6 Onion Architecture

A Arquitetura Onion (Cebola), proposta por Jeffrey Palermo, é conceitualmente muito próxima da Clean Architecture e compartilha os mesmos princípios centrais. Seu nome vem da analogia com as camadas de uma cebola — onde o centro é o mais importante e as camadas externas dependem das internas, nunca o contrário.

#### Principais conceitos

A Onion Architecture organiza o sistema em **anéis concêntricos**:

- **Domain Model (Centro)**: O núcleo absoluto. Contém as entidades do domínio e os objetos de valor. Não tem dependências externas.
- **Domain Services**: Contém serviços de domínio que operam sobre as entidades. Lógica de negócio que não pertence a uma entidade específica.
- **Application Services**: Orquestra os casos de uso da aplicação. Coordena o fluxo de dados entre o domínio e as camadas externas.
- **Infrastructure / UI (Camadas externas)**: Banco de dados, APIs, frameworks de UI, SDKs externos. Tudo que é detalhe de implementação. Essas camadas dependem das internas por meio de interfaces/abstrações.

#### Como funciona na prática

Cada camada só pode depender das camadas mais internas que ela. A UI depende dos Application Services → os Application Services dependem dos Domain Services → os Domain Services dependem do Domain Model. As dependências de infraestrutura (banco, API) são sempre injetadas via interfaces definidas nas camadas internas (inversão de dependência).

#### Diferença em relação à Clean Architecture

Enquanto a Clean Architecture define explicitamente camadas como Entities, Use Cases, Interface Adapters e Frameworks, a Onion Architecture foca mais nos **princípios de dependência** do que em uma estrutura rígida de camadas. Na prática, ambas chegam a resultados muito similares e são frequentemente combinadas.

#### Vantagens

- **Núcleo de domínio protegido**: As regras mais importantes do negócio ficam completamente isoladas de tecnologia e frameworks.
- **Alta flexibilidade tecnológica**: Mudar de framework, banco de dados ou serviço externo não afeta o domínio.
- **Favorece DDD (Domain-Driven Design)**: A estrutura é natural para times que adotam práticas de design orientado ao domínio.
- **Testabilidade**: O domínio e os serviços de aplicação podem ser testados isoladamente com dependências substituídas por mocks.
- **Longevidade do código**: Apps construídos com Onion Architecture tendem a envelhecer melhor, pois não ficam presos a versões específicas de bibliotecas ou frameworks.

#### Pontos negativos

- **Curva de aprendizado**: Requer domínio de princípios SOLID, especialmente inversão de dependência e inversão de controle.
- **Risco de rigidez excessiva**: Em times sem maturidade, a definição das camadas pode se tornar um debate interminável em vez de uma decisão pragmática.
- **Overhead de abstrações**: A necessidade de interfaces para praticamente toda dependência aumenta o volume de código e pode dificultar a navegação em IDEs.
- **Inadequada para projetos simples**: Para apps com baixa complexidade de negócio, a estrutura completa é desproporcional ao problema.

### 4.7 Comparativo rápido

| Arquitetura | Melhor Para | Testabilidade | Complexidade | Escalabilidade |
|---|---|---|---|---|
| MVC | Protótipos, apps simples | Baixa | Baixa | Baixa |
| MVP | Apps médios, telas complexas | Alta | Média | Média |
| MVVM | Apps modernos com UI reativa | Alta | Média | Alta |
| Clean Architecture | Apps médios e grandes | Muito Alta | Alta | Muito Alta |
| Hexagonal | Apps com múltiplas integrações | Muito Alta | Alta | Muito Alta |
| Onion | Apps com domínio rico (DDD) | Muito Alta | Alta | Muito Alta |

---

## 5. Arquitetura recomendada para React Native com Expo

Para projetos com Expo, uma composição muito sólida é:

1. Camada de apresentação.
2. Camada de aplicação ou casos de uso.
3. Camada de domínio.
4. Camada de dados.
5. Camada de infraestrutura e acesso ao sistema.

Essa estrutura permite que o app cresça com organização.

### 5.1 Camada de apresentação

É a camada mais próxima do usuário.

Ela inclui:

1. Telas.
2. Componentes visuais.
3. Navegação.
4. Estados de interface.
5. Validações simples de formulário.
6. Feedback visual, como loading, erro e sucesso.

**Importância:**

A camada de apresentação deve ser simples. Ela não deve conter regra de negócio complexa. O objetivo é mostrar informações, capturar ações e repassar essas ações para a camada adequada.

No contexto mobile, isso é essencial porque a experiência da tela precisa ser rápida, legível e responsiva, sem depender de lógica pesada dentro do componente.

### 5.2 Camada de aplicação

Essa camada coordena os casos de uso do sistema.

Ela responde a perguntas como:

1. O que acontece quando o usuário faz login.
2. O que acontece quando o usuário salva um pedido.
3. O que acontece quando o usuário atualiza um perfil.
4. O que acontece quando o usuário solicita dados novos da API.

**Importância:**

A camada de aplicação conecta interface, domínio e dados. Ela evita que a regra do fluxo fique espalhada em vários componentes.

No mobile, essa camada é muito importante porque muitas ações do usuário precisam orquestrar múltiplas etapas, como validar entrada, consultar API, salvar localmente e atualizar a interface.

### 5.3 Camada de domínio

É o coração do sistema.

Ela contém:

1. Entidades.
2. Regras de negócio.
3. Contratos.
4. Casos de uso puros.
5. Regras independentes de framework.

**Importância:**

A camada de domínio precisa sobreviver mesmo que a interface mude, a API mude ou a biblioteca de persistência mude.

Em mobile, isso traz estabilidade ao projeto. Se a aplicação depende de uma API externa, o domínio não deve conhecer o formato bruto do servidor. Ele deve trabalhar com estruturas próprias do negócio.

### 5.4 Camada de dados

É a camada que conversa com o mundo externo.

Ela inclui:

1. Requisições HTTP.
2. Consumo de APIs.
3. Leitura e escrita em armazenamento local.
4. Conversão de DTOs.
5. Mapeamento entre dados externos e entidades internas.
6. Cache.
7. Sincronização offline.

**Importância:**

Essa camada isola o sistema de detalhes externos. Se a API mudar, a camada de dados absorve essa mudança. Se a aplicação trocar de banco local, o restante do sistema tende a ser preservado.

No mobile, isso é decisivo porque os dados podem vir da internet, mas o app também precisa funcionar com rede instável, sem conexão e com cache local.

### 5.5 Camada de infraestrutura e sistema operacional

Essa camada concentra o contato com recursos do aparelho.

Ela inclui:

1. Câmera.
2. GPS e localização.
3. Biometria.
4. Notificações.
5. Arquivos.
6. Armazenamento seguro.
7. Bluetooth.
8. Sensores.
9. Permissões.
10. Integrações com bibliotecas nativas.

**Importância:**

É nessa camada que o app passa a conversar com o sistema operacional.

No React Native com Expo, isso pode acontecer por meio de módulos e APIs do próprio ecossistema Expo, ou por módulos nativos quando o caso exigir uma capacidade mais específica. A documentação da Expo informa que o Expo Modules API permite escrever recursos nativos em Swift e Kotlin com menos boilerplate, e a documentação do React Native descreve os Turbo Native Modules e a New Architecture como o caminho moderno para integrar JavaScript e código nativo.

---

## 6. Como as camadas trabalham juntas

Um fluxo comum em mobile segue esta ordem:

1. O usuário interage com a tela.
2. A camada de apresentação dispara uma ação.
3. A camada de aplicação decide o fluxo.
4. A camada de domínio valida as regras.
5. A camada de dados busca ou envia informações.
6. A camada de infraestrutura executa integrações específicas.
7. O resultado volta para a interface.

Esse fluxo é importante porque evita que a tela saiba demais sobre API, banco local ou sistema operacional.

### 6.1 Exemplo de acesso direto ao sistema

Suponha que o usuário queira ativar a câmera para tirar uma foto.

**Fluxo:**

1. A tela mostra o botão.
2. O clique vai para um caso de uso.
3. O caso de uso pede autorização.
4. A infraestrutura verifica a permissão no sistema.
5. O módulo nativo ou biblioteca Expo abre a câmera.
6. A imagem retorna para a camada de dados ou diretamente para o fluxo da aplicação.
7. A tela atualiza o estado.

Aqui a camada de apresentação não conhece detalhes da câmera. Ela apenas solicita a ação.

### 6.2 Exemplo de consumo de API

Suponha que o usuário queira listar produtos.

**Fluxo:**

1. A tela solicita os produtos.
2. A camada de aplicação chama um caso de uso.
3. O caso de uso pede os dados para um repositório.
4. O repositório chama a fonte remota.
5. A fonte remota executa a requisição HTTP.
6. Os dados retornam como DTO.
7. O mapeador converte o DTO em entidade.
8. O resultado volta para a interface.

Aqui a camada de domínio não depende do formato do JSON da API.

---

## 7. Regras importantes para um projeto bem arquitetado

### 7.1 Use separação por responsabilidade

Cada camada deve fazer apenas o que lhe compete.

Se uma tela começa a conter regra de negócio, requisição HTTP e gravação local ao mesmo tempo, o projeto fica difícil de manter.

### 7.2 Prefira dependência de abstrações

A camada interna não deve depender diretamente da externa.

Por exemplo, o domínio não deve conhecer diretamente a biblioteca de HTTP. Ele deve conhecer uma interface ou contrato de repositório.

### 7.3 Mantenha o componente visual simples

Em mobile, componentes complexos tendem a ficar difíceis de testar e reutilizar.

O ideal é que a tela seja responsável por renderização e eventos de interface, deixando a lógica pesada para outras camadas.

### 7.4 Separe estado de interface e estado de servidor

Nem todo dado que chega da API deve ser tratado como estado da tela.

Alguns dados são temporários. Outros são persistentes. Outros representam cache. Essa distinção melhora a organização e evita bugs.

### 7.5 Tenha uma estratégia de offline

Aplicativos mobile frequentemente lidam com internet instável.

É importante prever cache, persistência local, sincronização e tratamento de erro amigável.

### 7.6 Planeje a integração com recursos nativos desde o início

Mesmo que o projeto comece simples, ele pode precisar de câmera, localização, push notification, biometria ou armazenamento seguro.

Quando a arquitetura já prevê essa camada, o projeto cresce com menos retrabalho.

---

## 8. Estrutura de pastas sugerida para Expo

Uma organização possível é:

```text
src/
  app/
  components/
  features/
    auth/
    profile/
    products/
  domain/
    entities/
    usecases/
    repositories/
  data/
    api/
    dtos/
    mappers/
    repositories/
    storage/
  infrastructure/
    device/
    permissions/
    notifications/
  hooks/
  navigation/
  services/
  utils/
  assets/
```

### Como pensar nessa estrutura

1. `app` pode conter a inicialização do projeto, provedores globais e configuração geral.
2. `components` reúne componentes reutilizáveis.
3. `features` organiza o código por funcionalidade.
4. `domain` guarda as regras mais estáveis.
5. `data` trata integrações com API e armazenamento.
6. `infrastructure` lida com sistema operacional e recursos nativos.
7. `hooks`, `services` e `utils` concentram suporte técnico.

Esse modelo ajuda muito quando o projeto cresce.

---

## 9. Expo e acesso a recursos nativos

Expo oferece um ambiente excelente para acelerar o desenvolvimento, mas isso não significa limitação. A plataforma evoluiu para suportar integrações modernas, módulos nativos e fluxos de desenvolvimento mais flexíveis. A documentação também destaca Expo Go, development build, EAS e o suporte a módulos nativos e novas arquiteturas.

Na prática, isso significa:

1. Você pode começar rápido.
2. Pode evoluir para integrações mais avançadas.
3. Pode manter o código organizado em camadas.
4. Pode acessar hardware e APIs do aparelho sem abandonar a produtividade do ecossistema.

---

## 10. Boas recomendações para projetos reais

1. Use TypeScript desde o início.
2. Adote Clean Architecture ou uma variação simples dela.
3. Separe features por domínio de negócio.
4. Mantenha o acesso à API em repositórios.
5. Evite lógica complexa dentro de componentes.
6. Trate erros, loading e cache de forma consistente.
7. Planeje modo offline quando fizer sentido.
8. Centralize integrações nativas em uma camada própria.
9. Crie contratos claros entre interface, domínio e dados.
10. Tenha testes pelo menos nas regras de negócio mais importantes.

---

## 11. Conclusão

Para desenvolvimento mobile moderno, especialmente com React Native e Expo, a melhor escolha costuma ser combinar a produtividade do cross platform com uma arquitetura interna forte.

A recomendação mais segura para projetos novos é usar Expo como base, organizar o projeto com princípios de Clean Architecture, separar bem apresentação, domínio, dados e infraestrutura, e tratar integrações nativas e consumo de APIs como responsabilidades distintas.

Com isso, o aplicativo fica mais fácil de manter, testar, ampliar e adaptar ao crescimento do produto.

---

## 12. Leituras recomendadas

1. Documentação oficial do React Native.
2. Documentação oficial da Expo.
3. Conteúdos sobre Clean Architecture.
4. Conteúdos sobre MVVM, MVP e MVC.
5. Guias sobre módulos nativos, permissões, navegação e persistência local.
