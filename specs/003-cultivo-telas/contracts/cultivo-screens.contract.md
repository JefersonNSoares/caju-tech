# Contract: Sub-telas de Cultivo e Componente de Vídeo

## Rotas do Módulo de Cultivo

| Rota | Descrição | Parâmetros |
|---|---|---|
| `app/(tabs)/cultivo/index.tsx` | Menu principal de navegação com 4 botões verticais | Nenhum |
| `app/(tabs)/cultivo/plantio.tsx` | Sub-tela com texto introdutório e 2 vídeos de Plantio | Nenhum |
| `app/(tabs)/cultivo/irrigacao.tsx` | Sub-tela com texto introdutório e 2 vídeos de Irrigação | Nenhum |
| `app/(tabs)/cultivo/poda.tsx` | Sub-tela com texto introdutório e 2 vídeos de Poda e Adubação | Nenhum |
| `app/(tabs)/cultivo/pragas.tsx` | Sub-tela com texto introdutório e 2 vídeos de Pragas e Doenças | Nenhum |

---

## Componente `VideoCardPlaceholder`

```typescript
export interface VideoCardPlaceholderProps {
  video: CultivoVideo;
  onPress: () => void;
  testID?: string;
}
```

- **Comportamento visual**:
  - Container de aspect ratio 16:9 estilizado com gradiente temático (verde/terra/caju)
  - Ícone de "play" centralizado em círculo translúcido com sombra (hitbox acessível)
  - Badge no canto superior exibindo a duração
  - Rodapé com título do vídeo e resumo sucinto

---

## Componente `VideoPlayerModal`

```typescript
export interface VideoPlayerModalProps {
  visible: boolean;
  video: CultivoVideo | null;
  onClose: () => void;
}
```

- **Comportamento**:
  - Exibe overlay escuro translúcido com animação suave
  - Exibe container do player 16:9 em destaque, com ícone de reprodução/pausa e barra de tempo
  - Exibe bloco de descrição/resumo completo do vídeo logo abaixo
  - Botão de fechar (hitbox >= 48x48dp) no topo ou rodapé
