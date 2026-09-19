# CajuTech — Project Context & Coding Guidelines

## 1. Project Overview & Context
O **CajuTech** é uma aplicação educativa e de gestão agrícola voltada para a cultura do cajueiro e o aproveitamento integral de seus derivados. Atende estudantes, extensionistas, produtores rurais e agricultores familiares do semiárido brasileiro.

O desenvolvimento segue a metodologia **Spec-Driven Development (SDD)**, na qual especificações modulares e regras funcionais orientam rigorosamente a implementação de código enxuto, testável e sem complexidade desnecessária.

---

## 2. Tech Stack & Platform Matrix

- **Framework**: React Native com Expo (SDK 51+)
- **Navegação**: Expo Router (File-based Routing com suporte universal a rotas web e nativas)
- **Alvos de Plataforma**:
  - **Mobile**: Android (foco em dispositivos de entrada/intermediários utilizados em campo)
  - **Web**: React Native for Web (painel responsivo acessível via navegadores desktop e móveis)[cite: 1]
- **Linguagem**: TypeScript (Strict Mode)
- **Estilização**: NativeWind (Tailwind CSS para React Native) ou StyleSheet modular responsivo
- **Ícones**: `@expo/vector-icons` (Lucide Icons / Feather)
- **Armazenamento Offline & Cache**: `@react-native-async-storage/async-storage`
- **Mídia e Documentos**:
  - Leitor de PDF: Leitor nativo / embed web para a Cartilha Técnica[cite: 1]
  - Vídeo: `expo-av` ou `react-native-video` com componente padronizado multiplataforma[cite: 1]
  - Imagens: `expo-image` (com cache e suporte a visualização ampliada/zoom para infográficos)[cite: 1]

---

## 3. Core Architectural Rules (Constitution)

1. **Zero Telas em Branco (TEL-EST-01)**:
   - Nenhuma tela deve carregar sem feedback imediato (< 400ms)[cite: 1].
   - Utilize obrigatoriamente *Skeleton Loaders* suaves ou indicadores discretos durante requisições[cite: 1].
   - Toda tela com consulta assíncrona deve suportar os quatro estados: *Carregando*, *Vazio*, *Offline/Indisponível* e *Erro*[cite: 1].
2. **Usabilidade Rural Direta**:
   - Mensagens amigáveis e diretas: nunca renderize mensagens de erro técnicas como `HTTP 500` ou `Network Timeout` para o usuário[cite: 1]. Use "Sinal ausente", "Sem conexão com a roça" ou "Instabilidade temporária"[cite: 1].
   - **Hitbox Mínima**: Alvos de toque (botões, cards interativos e abas) devem ter dimensão mínima de **48x48dp** para facilitar a interação sob sol forte ou manuseio com luvas de trabalho[cite: 1].
3. **Regra dos 2 Toques (TEL-NAV-01)**:
   - A partir da Home, qualquer módulo principal (Cultivo, Derivados, Sustentabilidade) ou recurso educativo (Quiz, Cartilha, Vídeos) deve ser acessível em no máximo 2 toques[cite: 1].
4. **Isolamento de Falhas e Retry Isolado**:
   - Falhas em APIs externas (ex.: dados de clima de Piripiri-PI ou cotações de mercado) não podem bloquear o carregamento de módulos locais nem travar a UI[cite: 1].
   - O botão "Tentar novamente" deve reexecutar apenas a operação que falhou, sem forçar recarregamento geral da aplicação[cite: 1].
5. **Consistência Terminológica**:
   - Nomes de botões, títulos de módulos e fluxos devem ser idênticos no mobile e na versão web[cite: 1]. Mantenha a nomenclatura oficial: `Cultivo`, `Derivados`, `Sustentabilidade` e `Recursos`[cite: 1].

---

## 4. Directory & Project Structure (Expo Router)

```text
cajutech/
├── app/
│   ├── (auth)/
│   │   ├── splash.tsx          # TEL-ENT-01: Splash screen com carregamento (<3s)
│   │   └── login.tsx           # TEL-LOG-01: Identificação (Estudante/Agricultor/Visitante)
│   ├── (tabs)/
│   │   ├── _layout.tsx         # TEL-NAV-01: Tab bar universal (5 rotas)
│   │   ├── index.tsx           # TEL-HOM-01: Dashboard / Home principal
│   │   ├── cultivo/
│   │   │   ├── index.tsx       # Módulo 1: Listagem de fases (Plantio, Irrigação, Manejo, Pragas)
│   │   │   └── [slug].tsx      # Detalhes técnicos e alerta por imagem
│   │   ├── derivados/
│   │   │   ├── index.tsx       # Módulo 2: Lista de derivados (Castanha, Sucos, Doces, etc.)
│   │   │   └── [id].tsx        # Detalhe do derivado, processo e aproveitamento do pedúnculo
│   │   ├── sustentabilidade/
│   │   │   └── index.tsx       # Módulo 3: Painel de gestão, clima (Piripiri-PI), cotação e KPIs
│   │   └── recursos/
│   │       ├── index.tsx       # Submenu: Quiz, Cartilha e Mídias
│   │       ├── quiz/
│   │       │   ├── index.tsx   # TEL-QUZ-01: Configuração e início
│   │       │   ├── round.tsx   # TEL-QUZ-02: Questão ativa com feedback imediato
│   │       │   └── result.tsx  # TEL-QUZ-03: Resultado, medalhas e reinício
│   │       ├── cartilha.tsx    # TEL-CAR-01: Leitor PDF e ação de download offline
│   │       └── midias.tsx      # TEL-MID-01: Catálogo com filtro unificado (Vídeos/Infográficos)
│   └── _layout.tsx             # Root layout, provedores globais e temas
├── components/
│   ├── common/                 # Botões, Cards, Badges acessíveis (Hitbox >= 48dp)
│   ├── feedback/               # TEL-EST-01: Skeleton, EmptyState, OfflineBanner, ErrorCard
│   ├── media/                  # VideoPlayer e ImageZoom padronizados
│   └── navigation/             # TabBar mobile e Sidebar responsiva para desktop web
├── constants/                  # Cores da identidade visual (paleta verde rural), rotas e textos
├── hooks/                      # useNetworkStatus, useQuizEngine, useOfflineStorage
├── services/                   # Chamadas de APIs (Clima, Cotações, Banco local de perguntas)
└── types/                      # Definições TypeScript dos modelos e módulos