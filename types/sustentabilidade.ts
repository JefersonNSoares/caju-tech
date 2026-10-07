export interface SecaoConteudo {
  titulo: string;
  texto: string;
  itens?: string[];
  dicaPratica?: string;
}

export interface PraticaSustentavel {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: any; // using any for feather icon names temporarily or string if preferred
  conteudo: SecaoConteudo[];
}
