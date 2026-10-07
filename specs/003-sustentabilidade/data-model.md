# Data Model: Sustentabilidade e Inovação

## Entidades Principais

### `PraticaSustentavel`
Representa um módulo ou processo de inovação sustentável (ex: Aproveitamento de Resíduos, Bioprodutos).

- `id`: string (ex: 'residuos', 'bioprodutos')
- `title`: string
- `tag`: string (badge categorizando o módulo, ex: 'Economia Circular')
- `description`: string (visão geral)
- `icon`: string (nome de ícone do Feather)
- `conteudo`: array de seções detalhadas

### `SecaoConteudo`
Representa uma subseção de uma prática na página de detalhes.

- `titulo`: string
- `texto`: string
- `itens`: array de strings (lista de pontos importantes)
- `dicaPratica`: string opcional
