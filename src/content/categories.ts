import type { CourseModule, Lesson } from "./types";

/** A reference to an existing module (all its lessons) or to one specific lesson. */
export interface ContentRef {
  module: string;
  lesson?: string;
}

export interface Subcategory {
  id: string;
  title: string;
  description: string;
  items: ContentRef[];
}

export interface Category {
  id: string;
  title: string;
  icon: "megaphone" | "share" | "briefcase" | "cpu";
  subcategories: Subcategory[];
}

const M1 = "introducao-marketing-digital";
const M2 = "vendas-online";
const M3 = "marketing-de-afiliados";
const M4 = "redes-sociais-e-divulgacao";
const M5 = "trafego-pago-e-organico";
const M6 = "criacao-de-conteudo";
const M7 = "psicologia-das-vendas";
const M8 = "gestao-e-estrategias";
const M9 = "inteligencia-artificial-no-marketing";

/** Navigation only: groups the existing lessons by theme. Lessons are not duplicated. */
export const categories: Category[] = [
  {
    id: "marketing-digital",
    title: "Marketing Digital",
    icon: "megaphone",
    subcategories: [
      {
        id: "vendas",
        title: "Vendas",
        description: "Como vender pela internet e entender a decisão de compra.",
        items: [{ module: M2 }, { module: M7 }],
      },
      {
        id: "trafego-pago",
        title: "Tráfego Pago",
        description: "Anúncios, segmentação, estratégias e análise de resultados.",
        items: [{ module: M5 }],
      },
      {
        id: "marketing-de-afiliados",
        title: "Marketing de Afiliados",
        description: "Links, comissões, plataformas e divulgação ética.",
        items: [{ module: M3 }],
      },
      {
        id: "copywriting",
        title: "Copywriting",
        description: "Textos que comunicam benefícios e levam à ação.",
        items: [
          { module: M6, lesson: "textos-publicitarios" },
          { module: M6, lesson: "titulos-chamativos" },
          { module: M2, lesson: "apresentar-produtos" },
          { module: M7, lesson: "apresentar-beneficios" },
          { module: M7, lesson: "persuasao-etica" },
        ],
      },
    ],
  },
  {
    id: "redes-sociais",
    title: "Redes Sociais",
    icon: "share",
    subcategories: [
      {
        id: "instagram",
        title: "Instagram",
        description: "Perfil, Reels, Stories e crescimento orgânico.",
        items: [
          { module: M4, lesson: "instagram-tiktok-facebook" },
          { module: M4, lesson: "divulgar-nas-redes" },
          { module: M4, lesson: "alcance-organico" },
          { module: M4, lesson: "seguidores-interessados" },
        ],
      },
      {
        id: "tiktok",
        title: "TikTok",
        description: "Vídeos curtos, ganchos e alcance para novos públicos.",
        items: [
          { module: M4, lesson: "instagram-tiktok-facebook" },
          { module: M4, lesson: "videos-de-divulgacao" },
          { module: M4, lesson: "alcance-organico" },
        ],
      },
      {
        id: "youtube",
        title: "YouTube",
        description: "Roteiro, gravação, edição e construção de audiência em vídeo.",
        items: [
          { module: M6, lesson: "produzir-videos" },
          { module: M4, lesson: "videos-de-divulgacao" },
          { module: M6, lesson: "titulos-chamativos" },
          { module: M4, lesson: "criar-audiencia" },
        ],
      },
      {
        id: "criacao-de-conteudo",
        title: "Criação de Conteúdo",
        description: "Conteúdos profissionais, vídeos e identidade visual.",
        items: [{ module: M6 }],
      },
    ],
  },
  {
    id: "empreendedorismo",
    title: "Empreendedorismo",
    icon: "briefcase",
    subcategories: [
      {
        id: "negocios-digitais",
        title: "Negócios Digitais",
        description: "Como o mercado digital funciona e quais caminhos existem.",
        items: [{ module: M1 }],
      },
      {
        id: "planejamento",
        title: "Planejamento",
        description: "Metas, estratégias e planos de divulgação.",
        items: [
          { module: M1, lesson: "comecar-do-zero" },
          { module: M5, lesson: "estrategias-de-divulgacao" },
          { module: M8, lesson: "estrategias-melhores" },
          { module: M8, lesson: "planejar-crescimento" },
        ],
      },
      {
        id: "gestao-de-negocios",
        title: "Gestão de Negócios",
        description: "Organização, custos, lucros e análise de resultados.",
        items: [{ module: M8 }],
      },
    ],
  },
  {
    id: "tecnologia",
    title: "Tecnologia",
    icon: "cpu",
    subcategories: [
      {
        id: "inteligencia-artificial",
        title: "Inteligência Artificial",
        description: "Como usar IA no marketing digital de forma responsável.",
        items: [{ module: M9 }],
      },
      {
        id: "ferramentas-digitais",
        title: "Ferramentas Digitais",
        description: "Editores, plataformas, links e painéis de anúncios.",
        items: [
          { module: M6, lesson: "ferramentas-de-edicao" },
          { module: M9, lesson: "ia-para-imagens-e-videos" },
          { module: M3, lesson: "plataformas-de-afiliados" },
          { module: M3, lesson: "links-de-afiliados" },
          { module: M5, lesson: "como-funcionam-anuncios" },
        ],
      },
    ],
  },
];

export function findSubcategory(id: string) {
  for (const category of categories) {
    const sub = category.subcategories.find((s) => s.id === id);
    if (sub) return { category, sub };
  }
  return undefined;
}

/** Resolves a subcategory's references against the current course, skipping removed content. */
export function resolveLessons(sub: Subcategory, modules: CourseModule[]) {
  const out: { module: CourseModule; lesson: Lesson }[] = [];
  const seen = new Set<string>();
  for (const ref of sub.items) {
    const module = modules.find((m) => m.id === ref.module);
    if (!module) continue;
    const lessons = ref.lesson ? module.lessons.filter((l) => l.id === ref.lesson) : module.lessons;
    for (const lesson of lessons) {
      const key = `${module.id}/${lesson.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ module, lesson });
    }
  }
  return out;
}
