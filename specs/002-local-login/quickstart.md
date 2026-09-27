# Quickstart & Verification Guide: Identificação e Login Local (TEL-LOG-01)

**Feature**: `002-local-login`  
**Target Platforms**: Web (React Native for Web) & Android (Expo SDK 52)  
**Status**: Ready  

---

## 1. Como Iniciar o Ambiente de Teste

Para rodar a aplicação localmente:

### No Navegador (Web):
```bash
npm run web
```
Acesse `http://localhost:8081` no navegador.

### No Dispositivo / Emulador (Android):
```bash
npm run android
```

---

## 2. Cenários de Verificação Prática

### Cenário 1: Primeiro Acesso (Identificação Local)
1. Certifique-se de que o aplicativo está sem dados salvos (ou abra em aba anônima no navegador).
2. O aplicativo abre na **Splash Screen** e redireciona automaticamente para `/(auth)/login` em menos de 2 segundos.
3. Na tela de login:
   - Verifique que os três perfis são exibidos com cartões táteis de alto contraste e ícones:
     - *Agricultor / Produtor Rural*
     - *Estudante / Extensionista*
     - *Visitante / Consumidor*
   - Verifique o campo opcional "Seu Nome ou Apelido" com altura mínima de 48dp.
4. Digite um nome (ex: `Manoel do Caju`) e selecione o perfil **Agricultor**.
5. Toque no botão "Continuar para a Aplicação".
6. **Resultado Esperado**: O app redireciona imediatamente para o painel principal (`/(tabs)`), exibindo a saudação "Olá, Manoel do Caju!".

---

### Cenário 2: Validação de Fallback de Nome Vazio
1. Limpe o storage ou acione a opção "Sair / Redefinir".
2. Na tela de login, selecione o perfil **Estudante / Extensionista** e deixe o campo de nome em branco.
3. Toque em "Continuar para a Aplicação".
4. **Resultado Esperado**: O sistema não exibe erro impeditivo; atribui o nome padrão `"Estudante"` e ingressa na aplicação sem atrito.

---

### Cenário 3: Persistência de Sessão e Inicialização Rápida (Splash)
1. Com uma sessão já salva no Cenário 1 ou 2, recarregue a página (F5 no navegador) ou reabra o app no Android.
2. A **Splash Screen** exibe o indicador suave e valida a sessão gravada no `AsyncStorage`.
3. **Resultado Esperado**: O usuário é redirecionado diretamente para a Home (`/(tabs)`) sem passar novamente pela tela de login, em menos de 2 segundos.

---

### Cenário 4: Troca de Perfil e Sobrescrita Local
1. No cabeçalho da Home ou menu de perfil, selecione "Trocar de Perfil".
2. A tela de identificação reabre destacando o perfil atual.
3. Escolha **Visitante / Consumidor** e confirme.
4. **Resultado Esperado**: O novo perfil sobrescreve o anterior no `AsyncStorage`; a Home passa a exibir conteúdos e destaques voltados para receitas e consumo.

---

### Cenário 5: Sair / Redefinir (Limpeza de Dados)
1. No menu de perfil ou configurações, selecione "Sair / Redefinir".
2. **Resultado Esperado**: Os registros `@cajutech:user_profile` e `@cajutech:auth_session` são removidos do dispositivo; o app retorna imediatamente à tela de login `/(auth)/login`. Ao reiniciar o app, ele volta a exigir identificação.

---

## 3. Verificação de Código e Tipagem

Para garantir que não há erros de tipagem TypeScript no projeto:

```bash
npm run typecheck
```
Deve completar sem erros (`tsc --noEmit`).
