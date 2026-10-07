# Data Model: Sub-telas de Cultivo e Conteúdo Multimídia

## Entidades Principais

### `CultivoStage`
Representa uma fase técnica do cultivo do cajueiro (`plantio`, `irrigacao`, `poda`, `pragas`).

- `id`: `'plantio' | 'irrigacao' | 'poda' | 'pragas'`
- `route`: string (ex: `'/cultivo/plantio'`)
- `title`: string (ex: `'Plantio e Espaçamento'`)
- `subtitle`: string (ex: `'Preparo do solo, coveamento e adubação básica'`)
- `icon`: string (nome do ícone Feather, ex: `'target'`, `'droplet'`, `'scissors'`, `'shield'`)
- `badge`: string (ex: `'Fase Inicial'`, `'Manejo Hídrico'`, etc.)
- `intro`: string (texto explicativo geral sobre a etapa)
- `orientacoes`: string[] (dicas e boas práticas agronômicas numeradas ou em tópicos)
- `videos`: `CultivoVideo[]` (exatamente 2 vídeos por etapa)

---

### `CultivoVideo`
Representa um vídeo técnico educativo do módulo de cultivo.

- `id`: string (ex: `'plantio-v1'`, `'plantio-v2'`)
- `title`: string (ex: `'Preparo e Dimensões da Cova'`)
- `duration`: string (ex: `'04:30 min'`)
- `summary`: string (resumo descritivo completo e orientações transmitidas no vídeo)
- `coverTheme`: string (paleta ou identificador de capa para o mockup)
- `badge`: string (ex: `'Técnica Prática'`, `'Passo a Passo'`)
