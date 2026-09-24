# Feature Specification: Identificação e Login Local (TEL-LOG-01)

**Feature Branch**: `002-local-login`  
**Created**: 2026-09-24  
**Status**: Draft  
**Input**: User description: "criar tela de login de forma local no projeto cajutech"

## Clarifications

### Session 2026-09-24
- Q: Ao alternar ou redefinir o perfil (User Story 3), como o aplicativo deve gerenciar o armazenamento local? → A: Perfil Único Ativo: a troca de perfil sobrescreve os dados locais anteriores, mantendo apenas 1 perfil ativo salvo por vez no dispositivo móvel.
- Q: Como deve ser tratada a localização (município) no primeiro acesso na tela de identificação local? → A: Padrão Automático: a tela de login coleta apenas Perfil e Nome. A localização assume o padrão "Piripiri - PI" sem exigir campos adicionais no primeiro acesso.
- Q: Como deve ser tratada a saída do usuário (Logout) nas opções do aplicativo? → A: Suporte duplo: o sistema oferece a ação de "Trocar de Perfil" diretamente e também "Sair / Redefinir", que remove a sessão do armazenamento local e devolve o usuário à tela de login limpa.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Seleção e Confirmação de Perfil Local (Priority: P1)

Como produtor rural, estudante ou visitante, quero escolher meu perfil de atuação (Agricultor, Estudante ou Visitante) e informar meu nome de exibição de maneira simples e rápida, para que o aplicativo personalize a minha experiência e o conteúdo exibido sem exigir conexão com a internet ou criação de contas com senhas complexas.

**Why this priority**: É a porta de entrada principal para a utilização personalizada do aplicativo. Sem a identificação local, o aplicativo não consegue determinar o contexto e as preferências do usuário, além de ser um requisito primordial da constituição (TEL-LOG-01).

**Independent Test**: Abrir a aplicação em estado inicial (sem sessão), acessar a tela de identificação local, selecionar um dos três perfis (ex: Agricultor), informar um nome de identificação, confirmar a entrada e constatar o redirecionamento imediato para a tela principal com o perfil ativo.

**Acceptance Scenarios**:

1. **Given** que o aplicativo está no primeiro acesso ou não possui sessão ativa, **When** o usuário chega à tela de identificação, **Then** ele deve visualizar os 3 perfis disponíveis (Agricultor/Produtor Rural, Estudante/Extensionista, Visitante/Consumidor) dispostos em cartões táteis de fácil leitura e alto contraste.
2. **Given** que o usuário selecionou um perfil e informou seu nome, **When** ele aciona o botão de confirmação, **Then** as informações devem ser registradas localmente no dispositivo e a navegação deve prosseguir para a tela principal em menos de 1 segundo.
3. **Given** que o usuário selecionou um perfil mas não preencheu o nome de exibição, **When** ele aciona a confirmação de entrada, **Then** o sistema deve atribuir um nome amigável padrão baseado no perfil escolhido (ex: "Produtor Rural", "Estudante", "Visitante") e permitir a continuidade sem erros ou travamentos.

---

### User Story 2 - Persistência da Sessão Local e Acesso Rápido (Priority: P2)

Como usuário diário que utiliza o aplicativo em campo ou na sala de aula, quero que minha identificação permaneça salva no dispositivo entre aberturas do aplicativo, para que eu não precise selecionar meu perfil repetidamente toda vez que abrir o CajuTech.

**Why this priority**: Evita atrito de uso e atende aos princípios de usabilidade rural direta e resposta rápida sob condições de trabalho no campo.

**Independent Test**: Identificar-se no aplicativo com um perfil específico, encerrar a execução da aplicação, reabri-la e constatar que a inicialização detecta a sessão existente e entra diretamente no painel principal, exibindo a saudação personalizada correspondente.

**Acceptance Scenarios**:

1. **Given** que existe uma identificação de perfil salva localmente, **When** o aplicativo é aberto, **Then** a tela de apresentação inicial valida a sessão salva e direciona o usuário diretamente ao painel principal em menos de 2 segundos.
2. **Given** que os dados de sessão salvos localmente estejam corrompidos ou ausentes, **When** o aplicativo é inicializado, **Then** o sistema deve redirecionar de forma suave e transparente para a tela de identificação local, sem apresentar mensagens de erro técnicas.

---

### User Story 3 - Alternância e Redefinição de Perfil Local (Priority: P3)

Como usuário que compartilha o aparelho móvel na família rural ou deseja explorar o conteúdo sob outra perspectiva, quero poder alterar meu perfil ou limpar a identificação atual a qualquer momento, para selecionar outro perfil de uso.

**Why this priority**: Dispositivos no ambiente da agricultura familiar frequentemente são compartilhados entre membros da família (ex: pais agricultores e filhos estudantes), exigindo flexibilidade para alternância de perfil sem perda de dados.

**Independent Test**: No painel principal ou configurações do aplicativo, acionar a opção de alternar/trocar perfil, confirmar o desejo de trocar e verificar que a tela de identificação local é reaberta permitindo escolher um novo perfil.

**Acceptance Scenarios**:

1. **Given** que o usuário está navegando com uma sessão ativa, **When** ele aciona a ação "Trocar Perfil" no menu ou cabeçalho, **Then** o sistema apresenta a tela de identificação local destacando o perfil atualmente ativo.
2. **Given** que o usuário seleciona um novo perfil e confirma, **When** a aplicação retorna à tela principal, **Then** os dados locais anteriores são sobrescritos pelo novo perfil único ativo e todas as recomendações, módulos em destaque e saudações são atualizados instantaneamente.
3. **Given** que o usuário está no aplicativo, **When** ele aciona a ação "Sair / Redefinir", **Then** a sessão local é completamente removida do dispositivo e o usuário é redirecionado à tela de identificação para um novo fluxo limpo.

---

### Edge Cases

- **Ausência total de sinal de rede**: O fluxo de identificação e login local deve ser 100% autossuficiente e offline, não realizando chamadas remotas nem emitindo avisos de falha de conexão durante a autenticação.
- **Entrada de nomes com espaços ou caracteres especiais**: O campo de identificação deve aceitar caracteres da língua portuguesa (acentos agudos, circunflexos, cedilhas), eliminando espaços em branco no início e no fim, e limitando o tamanho máximo para 40 caracteres a fim de preservar o layout visual.
- **Fechamento abrupto do aplicativo durante a seleção**: Se o aplicativo for finalizado antes da confirmação, nenhum dado parcial corrompido deve ser mantido, garantindo que o próximo início exiba novamente a tela de identificação de forma limpa.
- **Armazenamento local do dispositivo indisponível ou cheio**: Se a gravação local falhar, o sistema deve manter a sessão em memória temporária para permitir o uso contínuo pelo usuário, exibindo um aviso discreto e amigável sobre a impossibilidade de salvar a preferência permanentemente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar três perfis de identificação locais pré-definidos: "Agricultor / Produtor Rural", "Estudante / Extensionista" e "Visitante / Consumidor".
- **FR-002**: O sistema DEVE permitir que o usuário informe um nome ou apelido de exibição de até 40 caracteres para personalizar sua experiência.
- **FR-003**: O sistema DEVE atribuir automaticamente uma identificação padrão amigável caso o usuário opte por não preencher seu nome no momento da confirmação.
- **FR-004**: O sistema DEVE persistir a escolha de perfil e a identificação do usuário em armazenamento local persistente no dispositivo, garantindo operação 100% offline.
- **FR-005**: O sistema DEVE verificar a existência de uma sessão local válida durante o ciclo de inicialização (tela de apresentação), direcionando automaticamente para o painel principal caso a sessão exista.
- **FR-006**: O sistema DEVE permitir a troca ou redefinição de perfil a partir da interface principal do aplicativo, sobrescrevendo os dados locais armazenados pelo novo perfil único ativo selecionado.
- **FR-007**: Todos os elementos acionáveis da tela de login (cartões de perfil, campos de texto e botões) DEVEM ter área de toque mínima de 48x48dp, adequados para manuseio no campo ou sob sol forte.
- **FR-008**: O sistema DEVE fornecer feedback imediato (< 400ms) a qualquer toque ou seleção de perfil, garantindo que o estado visual reflita a escolha sem hesitação.
- **FR-009**: Todas as mensagens, descrições e rótulos da tela de login DEVEM utilizar linguagem clara, acolhedora e contextualizada com a realidade do produtor rural e da cajucultura no semiárido.
- **FR-010**: O sistema DEVE definir automaticamente o município de referência padrão como "Piripiri - PI" no perfil criado, sem exigir campos adicionais de entrada na tela inicial de identificação.
- **FR-011**: O sistema DEVE fornecer uma ação explícita de "Sair / Redefinir", que limpa todos os dados da sessão local armazenados no dispositivo e retorna o usuário à tela de identificação.

### Key Entities *(include if feature involves data)*

- **Perfil de Usuário Local**: Entidade que armazena os dados do operador único no dispositivo. Contém o papel de atuação (`farmer`, `student`, `visitor`), nome de exibição formatado, cidade ou região de referência (padrão automático: "Piripiri - PI") e data de criação/atualização da identificação.
- **Sessão Local**: Entidade que controla o estado de ativação da sessão no aparelho, indicando se o usuário já completou o processo de integração inicial e se o direcionamento automático para a tela principal deve ser acionado na inicialização.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das operações de identificação, seleção de perfil e persistência de sessão devem operar com êxito sem necessidade de conexão com a internet.
- **SC-002**: Novos usuários conseguem selecionar seu perfil e ingressar na aplicação em menos de 10 segundos no primeiro uso.
- **SC-003**: O tempo de inicialização e validação da sessão salva (da tela de apresentação até o painel principal) deve ser inferior a 2 segundos em dispositivos móveis de entrada.
- **SC-004**: O tempo de resposta tátil e visual ao selecionar um perfil ou acionar o botão de confirmação deve ser inferior a 200 milissegundos.
- **SC-005**: 100% dos elementos interativos da interface de identificação cumprem o padrão de acessibilidade com área de contato mínima de 48x48dp.
- **SC-006**: A persistência da sessão deve reter com 100% de integridade os dados do usuário entre reinicializações do aplicativo ou do dispositivo.

## Accessibility & Consistency (Constitution)

- **Terminologia Oficial**: A tela deve manter consonância com os módulos estruturais do projeto: `Cultivo`, `Derivados`, `Sustentabilidade` e `Recursos`.
- **Hitbox Mínima**: Alvos de toque com dimensão mínima de 48x48dp em botões, campos de texto e cartões de perfil.
- **Estados Visuais**: Suporte a estados de carregamento suave (< 400ms) e transições estáveis sem telas em branco.
- **Linguagem Direta**: Mensagens focadas na realidade do semiárido e sem termos técnicos de infraestrutura ou códigos de erro.

## Assumptions

- A identificação é puramente local e não requer autenticação por senha ou credenciais complexas, priorizando usabilidade direta para agricultores familiares e estudantes.
- As informações de perfil são armazenadas localmente no próprio aparelho do usuário, sem compartilhamento com servidores remotos nesta etapa.
- A personalização de conteúdo por perfil atuará como filtro visual e priorização de módulos, sem restringir ou bloquear o acesso às demais áreas da aplicação.
