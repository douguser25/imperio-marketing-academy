export type TipCategory = "Começando" | "Redes sociais" | "Vendas" | "Conteúdo" | "Gestão" | "Ética";

export interface Tip {
  title: string;
  body: string;
  category: TipCategory;
}

export const tipCategories: TipCategory[] = [
  "Começando",
  "Redes sociais",
  "Vendas",
  "Conteúdo",
  "Gestão",
  "Ética",
];

export const tips: Tip[] = [
  { category: "Começando", title: "Um canal por vez", body: "Domine uma rede social antes de abrir a próxima. Foco acelera o aprendizado e evita perfis abandonados." },
  { category: "Começando", title: "Diário de resultados", body: "Anote toda semana alcance, interações e contatos. Em um mês você terá dados reais para decidir, em vez de achismos." },
  { category: "Começando", title: "Estude 20 minutos por dia", body: "Constância vence intensidade. Uma aula por dia nesta plataforma completa o curso em poucas semanas." },
  { category: "Redes sociais", title: "Responda nas primeiras horas", body: "Interagir com os comentários logo após publicar ajuda a conversa a crescer e mostra que há alguém real por trás do perfil." },
  { category: "Redes sociais", title: "Legendas com palavras-chave", body: "Escreva na legenda os termos que seu público pesquisaria. As redes também funcionam como buscadores." },
  { category: "Redes sociais", title: "Crie séries", body: "Conteúdos com nome e dia fixo (ex.: “Dica de quarta”) criam hábito e fazem as pessoas voltarem." },
  { category: "Vendas", title: "Responda antes de perguntarem", body: "Inclua as dúvidas mais frequentes na própria apresentação do produto: entrega, garantia, para quem é e para quem não é." },
  { category: "Vendas", title: "Mostre o produto em uso", body: "Demonstrações reais convencem mais do que fotos perfeitas. Mostre como funciona no dia a dia." },
  { category: "Vendas", title: "Simplifique o caminho", body: "Cada passo extra até a decisão faz pessoas desistirem. Revise e elimine etapas desnecessárias." },
  { category: "Conteúdo", title: "Reaproveite com inteligência", body: "Um vídeo pode virar carrossel, texto, Stories e e-mail. Adapte o formato para cada canal." },
  { category: "Conteúdo", title: "Luz da janela", body: "Gravar de frente para uma janela dá iluminação natural e bonita sem gastar nada." },
  { category: "Conteúdo", title: "Leia em voz alta", body: "Antes de publicar um texto, leia em voz alta. Frases difíceis de falar costumam ser difíceis de entender." },
  { category: "Gestão", title: "Separe as contas", body: "Use uma conta só para o negócio. Fica muito mais fácil saber se você está tendo lucro ou prejuízo." },
  { category: "Gestão", title: "Revisão mensal", body: "Reserve uma hora por mês para olhar seus indicadores, listar aprendizados e ajustar o plano." },
  { category: "Ética", title: "Desconfie de ganho garantido", body: "Ninguém pode garantir ganhos no mercado digital. Resultados dependem de estudo, prática, contexto e tempo." },
  { category: "Ética", title: "Avise quando for publicidade", body: "Informe com clareza quando um conteúdo é patrocinado ou contém link de afiliado. Transparência gera confiança." },
  { category: "Ética", title: "Depoimentos só reais", body: "Use apenas depoimentos verdadeiros e com autorização de quem os deu." },
];
