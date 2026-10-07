# Quickstart & Validação: Módulo de Cultivo

Este guia detalha o fluxo de teste e validação das novas sub-telas de Cultivo.

## 1. Teste de Navegação Principal (US1)

1. Inicie a aplicação: `npm run web` ou `npx expo start`.
2. Acesse a aba **Cultivo**.
3. Verifique visualmente que os 4 botões estão:
   - Alinhados verticalmente (um abaixo do outro).
   - Ocupando a largura proporcional da tela com limite máximo responsivo no desktop.
4. Clique em cada um dos 4 botões:
   - **Plantio e Espaçamento** -> abre `/cultivo/plantio`
   - **Irrigação e Recursos Hídricos** -> abre `/cultivo/irrigacao`
   - **Poda e Adubação** -> abre `/cultivo/poda`
   - **Controle de Pragas e Doenças** -> abre `/cultivo/pragas`

---

## 2. Teste das Sub-telas de Conteúdo (US2)

1. Em cada sub-tela, verifique:
   - Presença do botão de voltar com hitbox >= 48x48dp.
   - Presença do texto explicativo/orientações agronômicas no topo.
   - Presença da seção com 2 cards de vídeo demonstrativos.
2. Clique no botão de voltar para retornar a `/cultivo`.

---

## 3. Teste do Placeholder de Vídeo e Player Modal (US3)

1. Em qualquer sub-tela, clique no card/placeholder de um dos vídeos.
2. Verifique se o Player Modal é aberto:
   - Player ampliado em formato 16:9 com capa e controles.
   - Título do vídeo em destaque.
   - Resumo e descrição técnica completa visível e legível.
   - Botão de fechar (X) acessível fecha o modal e retorna para a sub-tela.
