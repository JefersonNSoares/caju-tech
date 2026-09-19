<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Zero Telas em Branco (TEL-EST-01)
  - [PRINCIPLE_2_NAME] → II. Linguagem e Usabilidade Rural
  - [PRINCIPLE_3_NAME] → III. Regra dos 2 Toques
  - [PRINCIPLE_4_NAME] → IV. Consistência Terminológica e Visual
  - [PRINCIPLE_5_NAME] → V. Isolamento e Retry em Falhas
- Added sections:
  - Plataforma e Stack Tecnológica
  - Estrutura Modular
- Removed sections: None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->

# CajuTech Constitution

## Core Principles

### I. Zero Telas em Branco (TEL-EST-01)
Toda requisição assíncrona deve obrigatoriamente implementar estados compartilhados: Skeleton/Spinner suave em menos de 400ms, estado vazio amigável, estado offline transparente e erro sem expor termos técnicos ou stack traces.
**Rationale**: Garantir que o usuário nunca se sinta perdido ou diante de uma interface travada, especialmente em condições de rede instável.

### II. Linguagem e Usabilidade Rural
Vocabulário direto e acessível, evitando jargões técnicos (ex.: "Sinal ausente" em vez de "Erro de rede"). Alvos de toque (hitbox) mínimos de 48x48 pontos para facilitar o uso no campo sob sol forte ou com mãos rústicas.
**Rationale**: Inclusão digital e facilidade de uso para o público-alvo em seu ambiente de trabalho real.

### III. Regra dos 2 Toques
A arquitetura de navegação deve garantir que qualquer módulo principal (Cultivo, Derivados, Sustentabilidade) ou recurso educativo (Quiz, Cartilha, Mídias) seja alcançável em no máximo 2 toques a partir da tela inicial.
**Rationale**: Eficiência de acesso à informação em situações de uso rápido ou em campo.

### IV. Consistência Terminológica e Visual
Unidade absoluta de rótulos entre módulos móveis e versão web (ex.: "Cultivo", "Derivados", "Sustentabilidade", "Recursos"). A paleta visual rural/verde e componentes reutilizáveis devem ser estritamente mantidos.
**Rationale**: Reduzir a carga cognitiva e fortalecer a identidade visual e funcional do projeto em todas as plataformas.

### V. Isolamento e Retry em Falhas
Falhas em APIs externas (como meteorologia ou cotação) nunca devem bloquear a interface ou impedir o acesso aos dados locais. O botão "Tentar Novamente" deve reexecutar apenas a chamada específica que falhou.
**Rationale**: Resiliência do aplicativo, garantindo que funcionalidades core permaneçam disponíveis mesmo com falhas de serviços de terceiros.

## Plataforma e Stack Tecnológica

- **Core**: React Native com Expo (Expo Router).
- **Multiplataforma Universal**: Compatibilidade estrita entre Android e Web (React Native for Web).
- **Estilização**: Design responsivo e acessível (NativeWind/Tailwind ou StyleSheet estruturado).
- **Mídia**: Leitor de PDF embutido, player de vídeo padronizado e visualizador de infográficos com zoom.
- **Offline**: Suporte a cache local (PWA/AsyncStorage) para navegação e recursos educativos sem sinal.

## Estrutura Modular

- **Autenticação**: Splash screen fluida (< 3s), Login simples e seleção de perfil (Estudante, Agricultor, Visitante).
- **Navegação Global**: Tab bar inferior (Home, Cultivo, Derivados, Sustentabilidade, Recursos) e menu web adaptativo.
- **Módulo 1 (Cultivo)**: Plantio, irrigação, manejo, pragas e alerta de identificação por imagem.
- **Módulo 2 (Derivados)**: Catálogo de subprodutos, receitas e processos de aproveitamento do pedúnculo.
- **Módulo 3 (Sustentabilidade & Gestão)**: Dashboard com KPIs de produção, cotação e dados meteorológicos de Piripiri-PI.
- **Módulo 4 (Recursos)**: Quiz interativo, Cartilha Digital PDF, vídeos e infográficos com filtros.

## Governance

O Spec-Driven Development (SDD) é a metodologia obrigatória, com foco em consistência terminológica, critérios de aceitação verificáveis e ausência de complexidade desnecessária. Esta constituição supera qualquer prática ad-hoc. Mudanças requerem atualização desta base e propagação para os templates.

**Version**: 1.0.0 | **Ratified**: 2026-09-19 | **Last Amended**: 2026-09-19
