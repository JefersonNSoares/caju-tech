# Quickstart: Módulo de Sustentabilidade e Inovação

Para validar este módulo localmente:

1. **Inicie o servidor de desenvolvimento Expo**:
   ```bash
   npm run web
   ```
   *Ou `npm run android` para emular dispositivo.*

2. **Navegue até o módulo**:
   - Clique na aba "Sustentabilidade" (`/sustentabilidade`) na tab bar.
   - Verifique se os 4 cards da listagem estão renderizados.

3. **Teste o Deep Link e a Rota Dinâmica**:
   - Pressione qualquer card ou visite a rota `http://localhost:8081/sustentabilidade/bioprodutos` no navegador (se estiver usando web).
   - Valide que a página de detalhes exibe os dados simulados do serviço e contém botões de navegação e as seções informativas.

4. **Teste o modo Offline (Fallback/EmptyState)**:
   - Navegue para uma rota inexistente, como `/sustentabilidade/invalido`.
   - O `EmptyState` deve ser exibido com uma mensagem amigável instruindo o retorno ao catálogo.
