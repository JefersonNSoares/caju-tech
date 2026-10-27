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

### `ParametrosResiduo` (TEL-SUST-04)
Parâmetros matemáticos e mercadológicos utilizados no cálculo de conversão e impacto financeiro:

- `id`: `TipoResiduo` ('casca' | 'bagaco')
- `nome`: string (ex: 'Casca (LCC)')
- `subtitulo`: string
- `unidadeEntrada`: string (ex: 'kg de castanha' ou 'kg de pedúnculo')
- `unidadeResiduo`: string (ex: 'L de LCC' ou 'kg de bagaço')
- `taxaRendimento`: number (ex: 0.20 para 20% ou 0.25 para 25%)
- `precoUnitario`: number (preço em R$ por unidade de resíduo, ex: R$ 4,50/L ou R$ 0,80/kg)
- `descricaoGanho`: string
- `tutorialRoute`: string (rota interna para aprofundamento técnico)

### `ResultadoSimulacao` (TEL-SUST-04)
Objeto resultante da computação instantânea no simulador:

- `tipo`: `TipoResiduo`
- `quantidadeEntradaKg`: number (valor saneado entre 0 e 100.000 kg)
- `quantidadeResiduo`: number (volume/massa estimada gerada)
- `unidadeResiduo`: string
- `valorEstimado`: number (valor em R$ formatado como moeda)
- `descricaoGanho`: string
- `rendimentoPercentual`: number
- `cotacaoReferencia`: string

