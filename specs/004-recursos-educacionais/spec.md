# Feature Specification: Recursos Educacionais e Navegação

**Responsável Técnico**: Samuel Carvalho  
**Feature Branch**: `feat/004-recursos-educacionais`  
**Created**: 2026-10-13  
**Status**: Implemented  
**Input**: Implementar e atualizar a Especificação 4 - Recursos Educacionais e Navegação, abrangendo o menu de navegação responsivo (Regra dos 2 Toques), o Quiz do Produtor e Estudante com feedback imediato e medalhas, a Cartilha Técnica Digital com leitura e persistência 100% offline, e o catálogo multimídia unificado com a lista oficial de vídeos e infográficos práticos.

---

## Catálogo de Vídeos Oficiais (Ordem e Links Homologados)

1. **Vídeo 1**: [Como fazer um enxerto de cajueiro por borbulha! Veja o passo a passo](https://youtu.be/ATr1cGaLVNY)
   - **ID YouTube**: `ATr1cGaLVNY`
   - **Categoria**: Enxertia e Propagação
   - **Foco Técnico**: Passo a passo da borbulhia no cajueiro, retirada da gema, preparo do cavalo e amarração.
2. **Vídeo 2**: [Poda de limpeza na cultura do caju - Gilmar Pereira de Farias (BA)](https://youtu.be/ksQSnMYUYAA)
   - **ID YouTube**: `ksQSnMYUYAA`
   - **Categoria**: Manejo e Poda
   - **Foco Técnico**: Demonstração de poda de limpeza pós-safra, eliminação de ramos secos e abertura de copa.
3. **Vídeo 3**: [Como fazer cajuína artesanalmente, método caseiro simples e prático](https://youtu.be/fKaccvevJXY)
   - **ID YouTube**: `fKaccvevJXY`
   - **Categoria**: Cajuína e Derivados
   - **Foco Técnico**: Clarificação com gelatina para remoção de taninos, filtragem e banho-maria.
4. **Vídeo 4**: [Sistema Irrigação de gotejamento pra plantar cajú](https://youtu.be/dAO3bhovIuk)
   - **ID YouTube**: `dAO3bhovIuk`
   - **Categoria**: Irrigação e Recursos Hídricos
   - **Foco Técnico**: Montagem e instalação de gotejamento localizado e dimensionamento hídrico na roça.

---

## Catálogo de Infográficos Práticos

1. **Infográfico 1**: Calendário Anual da Cajucultura no Semiárido (Podas, Adubação, Floração e Colheita).
2. **Infográfico 2**: Passo a Passo da Enxertia no Cajueiro (Borbulhia e Garfagem).
3. **Infográfico 3**: Fluxograma de Extração da Carne de Caju e Aproveitamento Integral do Bagaço.

---

## Princípios Mandatórios da Especificação

1. **Regra dos 2 Toques (TEL-NAV-01)**: A partir de `app/(tabs)/index.tsx`, qualquer recurso educativo (Quiz, Cartilha, Vídeos e Infográficos) é acessível em no máximo 2 toques (1º toque na aba Recursos, 2º toque no card do recurso).
2. **Acessibilidade Touch (Hitbox Mínima de 48x48dp)**: Todos os botões (abas da TabBar, filtros de mídia, botões de alternativas do quiz, botões de zoom e paginação da cartilha) possuem área clicável mínima de 48x48dp.
3. **Disponibilidade 100% Offline**: Perguntas do Quiz, capítulos da Cartilha Técnica e Infográficos funcionam sem internet, utilizando base de dados local e `@react-native-async-storage/async-storage`.
4. **Feedback Visual (Zero Telas em Branco - TEL-EST-01)**: Estados assíncronos com Skeleton Loader (< 300ms), telas vazias com EmptyState e erros com ErrorCard em linguagem rural amigável.
