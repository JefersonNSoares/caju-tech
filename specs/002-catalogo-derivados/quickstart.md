# Quickstart: Catálogo de Derivados e Aproveitamento Integral do Caju

**Feature**: `002-catalogo-derivados`  
**Branch**: `002-catalogo-derivados`  
**Date**: 2026-09-24  

---

## 1. Visão Geral

Este documento orienta como executar, testar e validar a funcionalidade do Catálogo de Derivados e a nova rota dinâmica `[id].tsx` (`/derivados/[id]`) no Android e na Web.

---

## 2. Pré-requisitos

Certifique-se de que as dependências do projeto estejam instaladas:

```bash
npm install
```

---

## 3. Validação de Tipos (TypeScript)

Para assegurar que todos os modelos, contratos e componentes estão 100% livres de erros de tipagem estrita:

```bash
npm run typecheck
# ou
npx tsc --noEmit
```

---

## 4. Execução no Navegador Web

Inicie a aplicação no modo Web:

```bash
npm run web
# ou
npx expo start --web
```

### Casos de Teste na Web:
1. Abra o navegador na URL exibida (geralmente `http://localhost:8081`).
2. Clique na aba **Derivados** no menu inferior ou lateral.
3. Clique em **Cajuína Tradicional Piauiense**:
   - Valide a navegação para `/derivados/cajuina`.
   - Confirme a exibição das métricas de rendimento (10kg -> ~7L de cajuína).
   - Confirme os 5 passos sequenciais de processamento.
   - Clique no botão de voltar (seta) e confirme o retorno para a listagem.
4. Teste os demais derivados:
   - `/derivados/castanha` (Castanha e LCC)
   - `/derivados/doces` (Doces, Polpas e Compotas)
   - `/derivados/fibra` (Fibra de Caju - Carne Vegetal)
5. **Teste de Caso de Borda (ID Inexistente)**:
   - Digite diretamente na barra de endereço: `http://localhost:8081/derivados/produto-inexistente`.
   - Confirme que a aplicação renderiza o `EmptyState` com mensagem rural e botão para retornar à lista, sem telas em branco nem erros no console.

---

## 5. Execução no Dispositivo / Emulador Android

Inicie a aplicação no modo Android:

```bash
npm run android
# ou
npx expo start --android
```

### Validações Específicas Mobile:
1. **Hitbox Mínima**: Inspecione o botão de voltar e cards interativos para garantir que todos possuem dimensão mínima de 48x48dp.
2. **Rolagem Fluida**: Role a lista de passos até o final e verifique a legibilidade dos textos em tela estreita.
3. **Modo Offline**: Ative o modo avião no dispositivo e navegue pelas telas de derivados; todo o conteúdo técnico deve continuar disponível imediatamente.
