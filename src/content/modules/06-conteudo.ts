import type { CourseModule } from "../types";

export const conteudo: CourseModule = {
  id: "criacao-de-conteudo",
  number: 6,
  title: "Criação de Conteúdo",
  tagline: "Textos, títulos, vídeos e identidade visual profissionais.",
  description:
    "Aprenda a criar conteúdos profissionais, escrever textos publicitários, criar títulos chamativos, produzir vídeos, usar ferramentas de edição e construir uma identidade visual.",
  icon: "pen",
  lessons: [
    {
      id: "conteudos-profissionais",
      title: "Como criar conteúdos profissionais",
      minutes: 10,
      summary:
        "Conteúdo profissional é útil, claro, organizado e consistente — não depende de equipamento caro.",
      sections: [
        {
          heading: "Os 4 tipos de conteúdo",
          body: [
            "Educativo: ensina algo (tutoriais, dicas). Entretenimento: diverte e gera conexão (humor, tendências). Inspiracional: motiva (histórias, conquistas). Conversão: apresenta uma oferta ou convite. Um bom calendário mistura os quatro tipos.",
          ],
        },
        {
          heading: "Qualidade percebida",
          body: [
            "O que transmite profissionalismo: áudio limpo, boa iluminação, texto sem erros, informação correta e organização visual. Antes de publicar, revise ortografia, verifique dados e confirme se a mensagem principal está clara.",
          ],
        },
      ],
      steps: [
        "Defina o objetivo do conteúdo (ensinar, divertir, inspirar, converter).",
        "Escreva a mensagem principal em uma frase.",
        "Organize em começo (gancho), meio (conteúdo) e fim (chamada).",
        "Produza e revise ortografia e informações.",
        "Publique e anote os resultados.",
      ],
      example: {
        title: "Exemplo prático: carrossel educativo",
        body: "Slide 1: “5 erros que fazem seu currículo ser ignorado”. Slides 2 a 6: um erro por slide com a correção. Slide 7: “Salve e envie para quem está procurando emprego”. Simples, organizado e útil.",
      },
      keyPoints: [
        "Misture conteúdos educativos, de entretenimento, inspiracionais e de conversão.",
        "Clareza e revisão transmitem profissionalismo.",
        "Toda peça precisa de um objetivo definido.",
      ],
    },
    {
      id: "textos-publicitarios",
      title: "Como desenvolver textos publicitários",
      minutes: 12,
      summary:
        "Copywriting é a escrita que leva o leitor a uma ação. Ele usa estruturas como AIDA e PAS para organizar a mensagem.",
      sections: [
        {
          heading: "Estrutura AIDA",
          body: [
            "Atenção: uma frase que faz a pessoa parar. Interesse: mostre que entende o problema dela. Desejo: apresente os benefícios e a transformação. Ação: diga claramente o próximo passo.",
          ],
        },
        {
          heading: "Estrutura PAS",
          body: [
            "Problema: descreva a dor com as palavras do cliente. Agitação: mostre as consequências de não resolver. Solução: apresente o produto ou serviço como caminho. Use a agitação com responsabilidade, sem exagerar nem criar medo artificial.",
          ],
        },
      ],
      steps: [
        "Escolha uma oferta ou ideia para divulgar.",
        "Escreva uma versão do texto usando AIDA.",
        "Escreva outra versão usando PAS.",
        "Leia em voz alta e corte palavras desnecessárias.",
        "Peça para alguém ler e dizer o que entendeu.",
      ],
      example: {
        title: "Exemplo prático: texto AIDA",
        body: "Atenção: “Seu cachorro puxa a guia o passeio inteiro?” Interesse: “Isso cansa você e estressa ele.” Desejo: “Com 10 minutos de treino por dia, os passeios ficam tranquilos e divertidos.” Ação: “Assista à aula gratuita no link da bio.”",
      },
      keyPoints: [
        "AIDA: atenção, interesse, desejo, ação.",
        "PAS: problema, agitação, solução.",
        "Texto bom é claro, direto e honesto.",
      ],
    },
    {
      id: "titulos-chamativos",
      title: "Como criar títulos chamativos",
      minutes: 8,
      summary:
        "O título decide se o conteúdo será lido. Bons títulos são específicos, prometem um benefício real e despertam curiosidade.",
      sections: [
        {
          heading: "Fórmulas de título",
          body: [
            "Números: “7 formas de economizar no mercado”. Como fazer: “Como organizar a semana em 15 minutos”. Erros: “3 erros que impedem seu vídeo de crescer”. Pergunta: “Você sabe ler o rótulo dos alimentos?” Resultado + tempo: “Aprenda o básico de Excel em uma tarde”.",
          ],
        },
        {
          heading: "Curiosidade sem enganar",
          body: [
            "Títulos sensacionalistas que não entregam o que prometem (caça-cliques) geram frustração e perda de confiança. O conteúdo precisa cumprir exatamente o que o título promete.",
          ],
        },
      ],
      steps: [
        "Escolha o tema de um conteúdo.",
        "Escreva 10 títulos usando fórmulas diferentes.",
        "Elimine os que são vagos ou exagerados.",
        "Escolha os 2 melhores e teste em posts diferentes.",
      ],
      example: {
        title: "Exemplo prático: do vago ao específico",
        body: "Vago: “Dicas de fotografia”. Específico: “5 ajustes no celular para fotos de comida mais bonitas”. O segundo diz exatamente o que a pessoa vai ganhar.",
      },
      keyPoints: [
        "Use números, “como fazer”, erros e perguntas.",
        "Seja específico sobre o benefício.",
        "Nunca prometa o que o conteúdo não entrega.",
      ],
    },
    {
      id: "produzir-videos",
      title: "Como produzir vídeos",
      minutes: 11,
      summary:
        "Produzir vídeos envolve roteiro, gravação e edição. Com um celular e boa organização, já é possível ter qualidade.",
      sections: [
        {
          heading: "Pré-produção",
          body: [
            "Escreva um roteiro simples: gancho, tópicos e chamada final. Separe o que vai aparecer (objetos, telas, ambiente). Escolha um horário com boa luz natural.",
          ],
        },
        {
          heading: "Gravação e edição",
          body: [
            "Use tripé ou apoie o celular. Grave cada trecho mais de uma vez. Na edição, corte silêncios, adicione legendas, inclua textos na tela para reforçar ideias e use música com licença de uso permitida. Vídeos curtos devem ir direto ao ponto.",
          ],
        },
      ],
      steps: [
        "Escreva um roteiro de até 6 linhas.",
        "Prepare o cenário e a iluminação.",
        "Grave em takes curtos.",
        "Edite: cortes, legendas e música permitida.",
        "Assista do início ao fim antes de publicar.",
      ],
      example: {
        title: "Exemplo prático: tutorial de 45 segundos",
        body: "Gancho: “Seu café fica amargo? O problema pode ser a água.” Tópicos: temperatura ideal, proporção e tempo. Final: “Teste amanhã e me conte nos comentários.” Gravado na bancada da cozinha com luz da janela.",
      },
      keyPoints: [
        "Roteiro simples evita vídeos confusos.",
        "Luz natural e áudio limpo elevam a qualidade.",
        "Legendas e cortes deixam o vídeo dinâmico.",
      ],
    },
    {
      id: "ferramentas-de-edicao",
      title: "Como utilizar ferramentas de edição",
      minutes: 9,
      summary:
        "Ferramentas de edição de imagem e vídeo — muitas gratuitas — ajudam a dar acabamento profissional aos conteúdos.",
      sections: [
        {
          heading: "Tipos de ferramentas",
          body: [
            "Design gráfico on-line com modelos prontos (ótimo para posts e carrosséis). Editores de vídeo para celular, com cortes, legendas automáticas e transições. Editores de vídeo para computador, para projetos mais longos. Bancos de imagens e músicas com licença gratuita.",
          ],
        },
        {
          heading: "Boas práticas",
          body: [
            "Crie modelos próprios para manter o padrão visual. Salve suas cores e fontes. Exporte vídeos no formato vertical (9:16) para redes de vídeo curto. Respeite direitos autorais: use apenas imagens e músicas com licença adequada.",
          ],
        },
      ],
      steps: [
        "Escolha uma ferramenta de design e uma de vídeo.",
        "Crie um modelo de post com suas cores e fontes.",
        "Edite um vídeo curto com legenda automática.",
        "Salve seus modelos para reutilizar.",
      ],
      example: {
        title: "Exemplo prático: modelo reutilizável",
        body: "Júlia cria um modelo de carrossel com fundo azul-marinho, títulos em dourado e uma fonte padrão. Toda semana, ela só troca os textos. Em minutos, produz posts com aparência consistente e profissional.",
      },
      keyPoints: [
        "Existem boas ferramentas gratuitas para imagem e vídeo.",
        "Modelos economizam tempo e mantêm padrão.",
        "Respeite os direitos autorais.",
      ],
    },
    {
      id: "identidade-visual",
      title: "Como criar uma identidade visual",
      minutes: 10,
      summary:
        "Identidade visual é o conjunto de cores, fontes, logotipo e estilo que faz sua marca ser reconhecida.",
      sections: [
        {
          heading: "Elementos da identidade",
          body: [
            "Paleta de cores (2 a 4 cores principais), tipografia (1 fonte para títulos e 1 para textos), logotipo ou assinatura, estilo de fotos (claras, escuras, coloridas, minimalistas) e tom de voz (formal, descontraído, técnico).",
          ],
        },
        {
          heading: "Coerência é o segredo",
          body: [
            "Quando todos os conteúdos seguem o mesmo padrão, as pessoas reconhecem sua marca antes mesmo de ler o nome. As cores também comunicam sensações: azul-marinho transmite confiança, dourado remete a excelência, verde a natureza e saúde.",
          ],
        },
      ],
      steps: [
        "Defina 3 palavras que descrevem sua marca.",
        "Escolha cores que transmitam essas palavras.",
        "Escolha uma fonte para títulos e outra para textos.",
        "Crie um guia simples com cores, fontes e exemplos.",
        "Aplique o guia em todos os conteúdos por 30 dias.",
      ],
      example: {
        title: "Exemplo prático: marca de consultoria",
        body: "Palavras: confiável, elegante, moderna. Cores: azul-marinho, dourado e branco. Fontes: uma serifada elegante para títulos e uma sem serifa para textos. Fotos com fundo escuro e iluminação suave. O resultado é reconhecível em qualquer rede.",
      },
      keyPoints: [
        "Cores, fontes, logotipo, estilo de fotos e tom de voz formam a identidade.",
        "Coerência gera reconhecimento.",
        "Um guia simples ajuda a manter o padrão.",
      ],
    },
  ],
  quiz: [
    {
      question: "O que significa a sigla AIDA?",
      options: [
        "Anúncio, Imagem, Desconto, Ação",
        "Atenção, Interesse, Desejo, Ação",
        "Alcance, Impressão, Dados, Análise",
        "Afiliado, Indicação, Divulgação, Assinatura",
      ],
      answer: 1,
      explanation: "AIDA organiza o texto em Atenção, Interesse, Desejo e Ação.",
    },
    {
      question: "Qual título é mais específico?",
      options: [
        "Dicas de saúde",
        "Coisas legais",
        "4 alongamentos para quem trabalha sentado",
        "Leia isto",
      ],
      answer: 2,
      explanation: "Ele diz exatamente o que a pessoa vai aprender e para quem é.",
    },
    {
      question: "Qual cuidado é essencial ao usar músicas em vídeos?",
      options: [
        "Usar qualquer música famosa",
        "Usar músicas com licença de uso permitida",
        "Deixar o volume no máximo",
        "Nunca usar música",
      ],
      answer: 1,
      explanation: "Respeitar direitos autorais evita remoção do conteúdo e problemas legais.",
    },
    {
      question: "O que faz parte da identidade visual?",
      options: [
        "Somente o logotipo",
        "Cores, fontes, logotipo, estilo de fotos e tom de voz",
        "O número de seguidores",
        "O preço dos produtos",
      ],
      answer: 1,
      explanation: "Identidade visual é o conjunto de elementos que tornam a marca reconhecível.",
    },
    {
      question: "Por que títulos caça-cliques são prejudiciais?",
      options: [
        "Porque são curtos demais",
        "Porque não entregam o que prometem e quebram a confiança",
        "Porque usam números",
        "Porque são proibidos em todas as redes",
      ],
      answer: 1,
      explanation: "Promessas não cumpridas frustram o público e afastam seguidores.",
    },
  ],
};
