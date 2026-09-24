# Data Model: Catálogo de Derivados e Aproveitamento Integral do Caju

**Feature**: `002-catalogo-derivados`  
**Date**: 2026-09-24  
**Status**: Draft  

---

## 1. Entidades Principais

### `DerivadoDetail`

Representa o registro detalhado de um produto derivado do caju para exibição na rota dinâmica `app/(tabs)/derivados/[id].tsx`.

```typescript
export type DerivadoCategoria = 'castanha' | 'cajuina' | 'doces' | 'fibra';

export interface PassoProcessamento {
  ordem: number;                  // Número sequencial da etapa (1, 2, 3...)
  titulo: string;                 // Título resumido da etapa (ex: "Clarificação com Gelatina")
  descricao: string;              // Explicação passo a passo em linguagem acessível
  dica?: string;                  // Dica prática de campo ou observação técnica
}

export interface RendimentoInfo {
  materiaPrima: string;           // Quantidade base de matéria-prima (ex: "10 kg de pedúnculo fresco")
  produtoFinal: string;           // Rendimento esperado (ex: "~7 litros de cajuína filtrada")
  taxaAproveitamento: string;     // Percentual ou proporção (ex: "Aproveitamento de 70% do líquido")
  subprodutosSecundarios: string[]; // Resíduos ou subprodutos gerados (ex: ["2,5 kg de bagaço fibroso"])
}

export interface DerivadoDetail {
  id: DerivadoCategoria;          // Slug único correspondente ao parâmetro [id]
  title: string;                  // Nome completo (ex: "Cajuína Tradicional Piauiense")
  tag: string;                    // Badge de destaque (ex: "Patrimônio Cultural", "Alto Valor Agregado")
  icon: 'disc' | 'coffee' | 'sun' | 'layers'; // Ícone Feather correspondente
  materiaPrimaPrincipal: 'Pedúnculo (Falso Fruto)' | 'Castanha (Fruto Verdadeiro)' | 'Pedúnculo e Bagaço';
  tempoMedio: string;             // Tempo estimado total (ex: "3 a 4 horas", "2 dias para cura")
  dificuldade: 'Fácil' | 'Média' | 'Avançada';
  descricao: string;              // Resumo histórico e valor agronômico/econômico
  equipamentos: string[];         // Lista de utensílios e maquinários necessários
  insumos: string[];              // Ingredientes e insumos auxiliares (ex: gelatina, açúcar, água)
  rendimento: RendimentoInfo;     // Métricas de conversão e aproveitamento integral
  passos: PassoProcessamento[];   // Fases sequenciais de produção
  boasPraticas: string[];         // Normas sanitárias e de controle de qualidade
  avisosSeguranca?: string[];     // Alertas contra riscos (ex: LCC cáustico, vapor quente)
}
```

---

## 2. Dicionário de Dados do Catálogo (Dataset Inicial)

O dataset inclui as 4 categorias oficiais de derivados do caju no semiárido:

### 1. `cajuina`
- **Nome**: Cajuína Tradicional Piauiense
- **Tag**: Patrimônio Cultural
- **Matéria-prima**: Pedúnculo maduro (preferência por cajueiro-anão precoce)
- **Equipamentos**: Prensa manual de suco, tachos de aço inox, filtro de feltro/algodão, garrafas de vidro com tampa metálica e banho-maria.
- **Insumos**: Suco de caju natural, gelatina em pó sem sabor (agente clarificante: 2,5g por litro).
- **Rendimento**: 10 kg de pedúnculo → ~7 L de cajuína cristalina + 2,5 kg de bagaço para carne vegetal.
- **Passos**:
  1. *Lavagem e Sanitização*: Lavar em água corrente e solução clorada (50ppm) por 15 minutos.
  2. *Extração do Suco*: Prensagem para extrair o suco integral sem amassar o pedúnculo em excesso.
  3. *Clarificação*: Dissolver a gelatina em água morna e misturar ao suco para flocular os taninos ("trava" da garganta).
  4. *Filtragem*: Coar em tecido de algodão ou filtro prensa até o líquido ficar translúcido e amarelo-palha.
  5. *Envase e Pasteurização*: Envasar em garrafas de vidro limpas e cozinhar em banho-maria (100°C) por 60 a 90 minutos para caramelizar os açúcares naturais e adquirir a clássica cor âmbar.
- **Boas Práticas**: Esterilização térmica das garrafas antes do envase e choque térmico controlado para evitar quebra do vidro.

### 2. `castanha`
- **Nome**: Castanha de Caju e LCC
- **Tag**: Alto Valor Agregado
- **Matéria-prima**: Castanha crua desprendida do pedúnculo
- **Equipamentos**: Termômetro, tacho de autoclavagem ou estufa, máquina de corte manual/mecânica, mesas de despeliculagem.
- **Rendimento**: 10 kg de castanha in natura → ~2,2 kg a 2,5 kg de amêndoas inteiras (W1/W240) + 1,5 kg de LCC residual.
- **Passos**:
  1. *Limpeza e Seleção*: Remoção de pedras, impurezas e separação por calibre.
  2. *Umidificação e Tratamento Térmico*: Hidratação e aquecimento controlado para facilitar o desprendimento da casca da amêndoa.
  3. *Corte e Decorticação*: Rompimento da casca externa garantindo integridade da amêndoa.
  4. *Estufagem e Despeliculagem*: Secagem em estufa (~70°C) para soltar a película marrom e limpeza manual final.
  5. *Classificação e Embalagem*: Separação por tipo comercial (inteira, quebrada, xerém) e fechamento a vácuo.
- **Segurança**: Uso obrigatório de luvas de proteção contra o Líquido da Casca da Castanha (LCC), altamente cáustico.

### 3. `doces`
- **Nome**: Doces, Polpas e Compotas
- **Tag**: Agricultura Familiar
- **Matéria-prima**: Pedúnculo descascado e desengaçado
- **Equipamentos**: Tachos abertos ou tachos de cobre/inox, despolpadeira mecânica, refratômetro simples (opcional).
- **Rendimento**: 10 kg de caju limpo → 6 kg de doce em calda ou 8 kg de polpa integral congelada.
- **Passos**:
  1. *Furação e Espremedura Leve*: Perfurar o caju e retirar o excesso de líquido adstringente.
  2. *Branqueamento*: Escaldar em água fervente por 3 minutos para fixar a cor e amaciar as fibras.
  3. *Cocção com Calda*: Cozimento lento em fogo brando com calda de açúcar (brix ~55°) até translúcido.
  4. *Envase a Quente*: Colocação em potes de vidro esterilizados ainda a quente (> 85°C) e fechamento invertido.
- **Boas Práticas**: Manter o tempo de cozimento constante para preservar o aroma e evitar escurecimento excessivo.

### 4. `fibra`
- **Nome**: Fibra de Caju (Carne Vegetal)
- **Tag**: Inovação e Zero Desperdício
- **Matéria-prima**: Bagaço residual da prensagem do caju para suco ou cajuína
- **Equipamentos**: Prensas de parafuso/hidráulica, desfiadores, moedores e tachos de lavagem.
- **Rendimento**: 5 kg de bagaço prensado → 4,5 kg de carne vegetal pronta para tempero e preparações culinárias.
- **Passos**:
  1. *Desodorização e Lavagens*: Lavar o bagaço 3 a 4 vezes com água corrente para retirar a acidez e o aroma residual de suco.
  2. *Prensagem a Seco*: Retirar o máximo de umidade possível até a massa ficar solta e desfiada.
  3. *Refoga e Pré-Cozimento*: Cozinhar com temperos típicos (alho, cebola, urucum/colorau, cheiro-verde).
  4. *Moldagem*: Moldar em forma de hambúrguer, almôndega ou recheio para tortas e coxinhas.
- **Boas Práticas**: Utilizar o bagaço no mesmo dia da extração do suco para evitar fermentação indesejada da fibra.

---

## 3. Regras de Validação e Transição

1. **Parâmetro de Rota (`id`)**:
   - Deve ser validado contra o conjunto `['cajuina', 'castanha', 'doces', 'fibra']`.
   - Se inválido ou ausente, a interface transiciona imediatamente para o estado vazio com o componente `EmptyState`.
2. **Navegação de Retorno**:
   - Ao clicar no botão de voltar, deve retornar para `/(tabs)/derivados` via `router.back()` ou fallback explícito para `/(tabs)/derivados`.
3. **Responsividade**:
   - O contêiner principal limita a largura máxima a 800px no ambiente web desktop, mantendo padding fluido de 16px em dispositivos móveis.
