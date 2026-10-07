# Feature Specification: Onboarding & Profile Updates

**Feature Branch**: `feature/onboarding-profile-updates`  
**Created**: 2026-10-07  
**Status**: Implemented  
**Input**: Nova Tela Inicial (SplashScreen) com logótipo oficial CajuTech, texto educativo e botão "INICIAR" navegando para Seleção de Perfil. Atualização do botão de perfil na tela de módulos para "Alterar Perfil" e substituição do cabeçalho da tela de perfil pelo Logótipo oficial do CajuTech.

---

## User Scenarios & Testing

### User Story 1 - Nova Tela Inicial (SplashScreen) (Priority: P1)
Como qualquer usuário que abre a aplicação, eu quero visualizar uma tela inicial limpa e acolhedora com o Logótipo do CajuTech, uma frase contextualizando o propósito educativo e um botão de ação "INICIAR", para que eu possa iniciar minha jornada de navegação e identificação.

- **Critério de Teste**: Ao abrir o aplicativo, a tela inicial renderiza o Logótipo oficial no centro, o texto "Aplicativo educativo sobre o cultivo do caju e o aproveitamento de seus derivados" e o botão verde "INICIAR". Ao clicar em "INICIAR", o usuário é direcionado para a tela de Seleção de Perfil (`/(auth)/login`).

### User Story 2 - Atualização do Fluxo e Cabeçalho do Perfil (Priority: P1)
Como usuário da aplicação, eu quero poder alterar meu perfil a partir da tela principal de módulos através do botão claramente rotulado "Alterar Perfil", e na tela de seleção de perfil encontrar o cabeçalho padronizado com o Logótipo oficial do CajuTech em vez de identificadores genéricos.

- **Critério de Teste**:
  - Na tela de módulos (`app/(tabs)/index.tsx`), o botão de perfil agora exibe o texto "Alterar Perfil" e navega para `/(auth)/login`.
  - Na tela de Seleção de Perfil (`app/(auth)/login.tsx`), o cabeçalho exibe o Logótipo oficial do CajuTech (`CajuTechLogo`) com placeholder explícito, mantendo as opções de rádio (Agricultor, Estudante, Visitante) e o botão "Continuar para a Aplicação".
