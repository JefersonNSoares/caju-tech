# Quickstart Guide: CajuTech Universal Setup

Guia rápido para desenvolvedores executarem e testarem a aplicação CajuTech nas plataformas Web e Android.

---

## 1. Pré-requisitos do Ambiente

- **Node.js**: v20.x ou superior (v26 instalado no ambiente)
- **npm**: v10.x ou superior (v11 instalado)
- **Expo CLI**: Gerenciado localmente via `npx expo`
- **Ambiente Android (opcional para teste nativo)**: Android Studio configurado com emulador ou dispositivo físico com Expo Go instalado
- **Navegador Web**: Chrome, Firefox, Safari ou Edge para teste da versão Web

---

## 2. Instalação de Dependências

No diretório raiz do projeto:

```bash
npm install
```

As dependências principais incluem:
- `expo`, `react`, `react-native`
- `expo-router`, `expo-constants`, `expo-status-bar`, `expo-linking`
- `react-native-web`, `react-dom`
- `nativewind`, `tailwindcss`
- `@expo/vector-icons`
- `@react-native-community/netinfo`
- `@react-native-async-storage/async-storage`

---

## 3. Executando a Aplicação

### 3.1 Executar na Web
```bash
npx expo start --web
```
A aplicação abrirá no navegador padrão (porta padrão: `http://localhost:8081`).

### 3.2 Executar no Android
```bash
npx expo start --android
```
Inicia o emulador Android configurado ou conecta ao dispositivo conectado via USB (com Depuração USB ativa).

### 3.3 Menu Interativo Universal
```bash
npx expo start
```
Pressione `w` no terminal para abrir na Web ou `a` para abrir no Android.

---

## 4. Verificação de Tipos e Qualidade

Para garantir que 100% dos arquivos respeitam o modo estrito do TypeScript:

```bash
npx tsc --noEmit
```

---

## 5. Diretrizes Essenciais de Desenvolvimento (Constituição)

1. **Hitbox Mínima**: Use sempre `AccessiblePressable` ou `Button` de `components/common/` para qualquer elemento interativo. Área mínima: **48x48dp**.
2. **Zero Telas em Branco**: Ao realizar requisições assíncronas, use os componentes de `components/feedback/` (`Skeleton`, `EmptyState`, `OfflineBanner`, `ErrorCard`).
3. **Consistência de Nomes**: Mantenha rigorosamente os nomes oficiais dos módulos: `Cultivo`, `Derivados`, `Sustentabilidade` e `Recursos`.
4. **Isolamento de Falhas**: Falhas em APIs externas não devem quebrar o aplicativo. Implemente sempre o botão "Tentar novamente" via `ErrorCard`.
