# Navigation Routes Contract (TEL-NAV-01 & Princípio III / IV)

Este contrato define a estrutura de rotas do Expo Router, garantindo navegação universal (Web e Android) e a **Regra dos 2 Toques**.

---

## 1. Route Tree & Structure

A estrutura de arquivos em `app/` segue rigorosamente o padrão especificado em `GEMINI.md`:

```text
app/
├── _layout.tsx                 # Root layout com SafeArea, Provedor de Tema e Network Provider
├── (auth)/
│   ├── _layout.tsx             # Stack layout de autenticação
│   ├── splash.tsx              # TEL-ENT-01: Carregamento inicial rápido (<3s)
│   └── login.tsx               # TEL-LOG-01: Identificação de perfil (Estudante/Agricultor/Visitante)
└── (tabs)/
    ├── _layout.tsx             # TEL-NAV-01: Tab bar universal com 5 abas principais
    ├── index.tsx               # TEL-HOM-01: Dashboard / Início
    ├── cultivo/
    │   └── index.tsx           # Módulo 1: Listagem das fases do cultivo
    ├── derivados/
    │   └── index.tsx           # Módulo 2: Catálogo de derivados e subprodutos
    ├── sustentabilidade/
    │   └── index.tsx           # Módulo 3: Clima de Piripiri-PI, cotações e KPIs
    └── recursos/
        └── index.tsx           # Módulo 4: Submenu de Quiz, Cartilha e Mídias
```

---

## 2. Nomenclatura Oficial e Rótulos (Princípio IV)

Os títulos exibidos na barra de navegação inferior e menus da versão web devem ser estritamente padronizados:

| Rota | Título da Aba | Ícone Sugerido | Descrição |
|---|---|---|---|
| `(tabs)/index` | **Início** | `home` | Painel central com resumo e atalhos rápidos |
| `(tabs)/cultivo` | **Cultivo** | `sprout` / `tree` | Manejo, plantio, pragas e orientações agronômicas |
| `(tabs)/derivados` | **Derivados** | `package` / `box` | Castanha, polpa, sucos e subprodutos |
| `(tabs)/sustentabilidade` | **Sustentabilidade** | `bar-chart-2` / `cloud-sun` | Clima local, dados ecológicos e cotações |
| `(tabs)/recursos` | **Recursos** | `book-open` / `help-circle` | Quiz educativo, cartilha técnica e vídeos |

---

## 3. Garantias de Usabilidade Rural

1. **Regra dos 2 Toques (TEL-NAV-01)**:
   - Toque 1: Selecionar a aba desejada na Tab Bar inferior ou menu web.
   - Toque 2: Clicar no cartão ou recurso desejado dentro da tela do módulo.
2. **Área de Toque da Tab Bar**:
   - Cada botão de aba deve ocupar no mínimo 48x48dp de área clicável.
3. **Plataforma Web Responsiva**:
   - No mobile, exibe a TabBar inferior fixa.
   - Em telas maiores (Desktop Web), a navegação pode se adaptar responsivamente para uma barra superior ou lateral, mantendo exatamente os mesmos nomes e rotas.
