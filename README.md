# CajuTech — Aplicativo Universal da Cajucultura

O **CajuTech** é uma aplicação educativa e de gestão voltada para a cultura do cajueiro e o aproveitamento integral de seus derivados, atendendo estudantes, extensionistas, produtores rurais e agricultores familiares do semiárido brasileiro.

Construído sob a metodologia **Spec-Driven Development (SDD)**, o projeto roda de forma unificada no **Android** e na **Web**.

---

## 🚀 Tecnologias

- **Framework**: React Native com Expo (SDK 52)
- **Navegação**: Expo Router v4 (File-based Routing universal)
- **Alvos**: Mobile (Android) e Web (React Native for Web)
- **Linguagem**: TypeScript em modo estrito (`strict: true`)
- **Estilização**: NativeWind v4 (Tailwind CSS) e Design Tokens rurais em `constants/theme.ts`
- **Ícones**: `@expo/vector-icons` (Feather)
- **Rede & Offline**: `@react-native-community/netinfo` com fallback nativo web (`navigator.onLine`)
- **Persistência Offline**: `@react-native-async-storage/async-storage`

---

## 🏛️ Princípios Constitucionais

1. **Zero Telas em Branco (TEL-EST-01)**: Estados assíncronos obrigatórios (Skeleton < 400ms, EmptyState, OfflineBanner, ErrorCard com retry).
2. **Linguagem e Usabilidade Rural**: Hitbox mínima obrigatória de **48x48dp** em botões e áreas interativas, e linguagem acessível sem jargões técnicos.
3. **Regra dos 2 Toques (TEL-NAV-01)**: Qualquer módulo principal ou recurso educacional é acessível em no máximo 2 toques a partir da tela inicial.
4. **Consistência Terminológica**: Rótulos e rotas idênticos no mobile e na web (`Início`, `Cultivo`, `Derivados`, `Sustentabilidade`, `Recursos`).
5. **Isolamento de Falhas e Retry**: Instabilidades em serviços externos não bloqueiam a UI nem forçam o recarregamento geral do app.

---

## 📦 Estrutura de Diretórios

```text
caju-tech/
├── app/
│   ├── _layout.tsx             # Root layout universal com SafeArea e banner offline
│   ├── (auth)/
│   │   ├── _layout.tsx         # Stack layout de autenticação
│   │   ├── splash.tsx          # TEL-ENT-01: Splash screen com carregamento (<3s)
│   │   └── login.tsx           # TEL-LOG-01: Seleção de perfil (Agricultor, Estudante, Visitante)
│   └── (tabs)/
│       ├── _layout.tsx         # TEL-NAV-01: Tab bar universal (5 rotas) + menu web responsivo
│       ├── index.tsx           # TEL-HOM-01: Dashboard / Início
│       ├── cultivo/index.tsx   # Módulo 1: Listagem das fases do cultivo
│       ├── derivados/index.tsx # Módulo 2: Catálogo de derivados e subprodutos
│       ├── sustentabilidade/index.tsx # Módulo 3: Clima de Piripiri-PI, cotações e KPIs
│       └── recursos/index.tsx  # Módulo 4: Submenu de Quiz, Cartilha e Mídias
├── components/
│   ├── common/                 # Primitivas acessíveis (AccessiblePressable, Button, Card >= 48dp)
│   ├── feedback/               # Skeleton, EmptyState, OfflineBanner, ErrorCard
│   └── navigation/             # TabBar mobile e WebSidebar responsiva
├── constants/
│   └── theme.ts                # Paleta verde rural, dimensões de toque e espaçamentos
├── hooks/
│   └── useNetworkStatus.ts     # Hook universal de conectividade online/offline
└── types/                      # Definições TypeScript estritas
```

---

## 💻 Como Executar

### 1. Instalação de dependências
```bash
npm install
```

### 2. Executar no Navegador Web
```bash
npm run web
# ou
npx expo start --web
```

### 3. Executar no Android
```bash
npm run android
# ou
npx expo start --android
```

### 4. Verificação de Tipos (TypeScript)
```bash
npm run typecheck
# ou
npx tsc --noEmit
```
