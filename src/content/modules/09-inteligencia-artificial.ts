import type { CourseModule } from "../types";

export const inteligenciaArtificial: CourseModule = {
  id: "inteligencia-artificial-no-marketing",
  number: 9,
  title: "Inteligência Artificial no Marketing",
  tagline: "Use a IA como assistente — com critério, revisão e ética.",
  description:
    "Entenda o que é inteligência artificial, como usá-la para criar conteúdo, escrever bons comandos, produzir imagens e vídeos, analisar dados e atender clientes, sempre de forma responsável.",
  icon: "sparkles",
  lessons: [
    {
      id: "o-que-e-ia",
      title: "O que é inteligência artificial e como ela chega ao marketing",
      minutes: 9,
      summary:
        "Inteligência artificial (IA) são sistemas que aprendem padrões a partir de muitos dados e conseguem gerar textos, imagens, análises e respostas.",
      sections: [
        {
          heading: "Uma explicação sem complicação",
          body: [
            "Ferramentas de IA generativa foram treinadas com enormes quantidades de textos, imagens e outros dados. Com isso, aprenderam padrões: como frases costumam ser construídas, como uma imagem de “pôr do sol” costuma ser, que respostas combinam com certas perguntas. Quando você pede algo, a ferramenta gera um resultado novo com base nesses padrões.",
            "Isso não significa que a IA “sabe” ou “pensa” como uma pessoa. Ela pode errar, inventar informações que parecem verdadeiras e reproduzir vieses presentes nos dados. Por isso, ela funciona melhor como assistente do que como responsável final pelo trabalho.",
          ],
        },
        {
          heading: "Onde a IA aparece no marketing",
          body: [
            "Hoje a IA está presente em muitas etapas: sugerir ideias de conteúdo, escrever rascunhos de legendas e e-mails, criar ou editar imagens, gerar legendas automáticas em vídeos, resumir comentários de clientes, responder perguntas frequentes e até ajudar plataformas de anúncios a encontrar públicos.",
            "Para quem está começando, a principal vantagem é ganhar tempo em tarefas repetitivas e ter um ponto de partida quando a página está em branco. O seu conhecimento do público continua sendo o que faz o conteúdo funcionar.",
          ],
        },
      ],
      steps: [
        "Escolha uma ferramenta de IA de texto gratuita e confiável.",
        "Peça: “Explique o que é funil de vendas para um iniciante em 5 frases”.",
        "Compare a resposta com o que você aprendeu no Módulo 1.",
        "Anote o que estava certo, o que estava incompleto e o que estava errado.",
      ],
      example: {
        title: "Exemplo prático: assistente, não substituto",
        body: "Bianca pede à IA 10 ideias de posts para sua confeitaria. Ela descarta as genéricas, adapta três ao seu estilo e acrescenta fotos reais dos bolos. A IA economizou tempo no começo, mas foi o conhecimento de Bianca sobre seus clientes que tornou os posts bons.",
      },
      keyPoints: [
        "IA gera resultados a partir de padrões aprendidos em grandes volumes de dados.",
        "Ela pode errar ou inventar informações: sempre revise.",
        "Use a IA como assistente para ganhar tempo, não como substituta do seu critério.",
      ],
    },
    {
      id: "ia-para-criar-conteudo",
      title: "Como usar IA para ideias, textos e roteiros",
      minutes: 10,
      summary:
        "A IA ajuda a sair do zero: gerar ideias, organizar tópicos, criar rascunhos e variações de títulos. O acabamento é seu.",
      sections: [
        {
          heading: "Tarefas em que a IA ajuda bastante",
          body: [
            "Brainstorm de pautas para um mês, listas de perguntas frequentes do seu nicho, rascunhos de legendas, roteiros de vídeos curtos com gancho e chamada para ação, variações de títulos para testes A/B e revisão de ortografia e clareza.",
          ],
        },
        {
          heading: "Como dar a sua cara ao texto",
          body: [
            "Textos gerados por IA tendem a soar genéricos. Depois do rascunho, inclua suas histórias, exemplos reais, dados verificados e o vocabulário do seu público. Corte frases vazias e exageros. Leia em voz alta: se não parece algo que você diria, reescreva.",
            "Nunca publique informações técnicas, números ou citações sem conferir em fontes confiáveis.",
          ],
        },
      ],
      steps: [
        "Peça à IA 15 ideias de conteúdo para sua persona (descreva quem ela é).",
        "Escolha as 3 mais úteis.",
        "Peça um roteiro de 30 segundos para uma delas, com gancho, 3 tópicos e chamada final.",
        "Reescreva o roteiro com suas palavras e um exemplo pessoal.",
        "Confira qualquer dado ou afirmação antes de gravar.",
      ],
      example: {
        title: "Exemplo prático: do genérico ao autêntico",
        body: "Rascunho da IA: “Organizar a casa traz muitos benefícios para a sua vida.” Versão final: “Eu perdia 15 minutos toda manhã procurando a chave. Uma caixinha na entrada resolveu. Hoje vou te mostrar mais 3 truques assim.” A segunda tem personalidade e um benefício concreto.",
      },
      keyPoints: [
        "Use a IA para ideias, estrutura e rascunhos.",
        "Personalize com histórias, exemplos e linguagem do seu público.",
        "Verifique dados antes de publicar.",
      ],
    },
    {
      id: "escrever-bons-comandos",
      title: "Como escrever bons comandos (prompts)",
      minutes: 10,
      summary:
        "A qualidade da resposta depende da qualidade do pedido. Bons comandos dão contexto, objetivo, formato e restrições.",
      sections: [
        {
          heading: "A estrutura de um bom comando",
          body: [
            "Papel: diga como a IA deve agir (“Atue como um redator de redes sociais”). Contexto: explique o negócio e o público. Tarefa: diga exatamente o que quer. Formato: defina tamanho, tom e estrutura (lista, tabela, 3 parágrafos). Restrições: o que evitar (sem promessas exageradas, sem jargões).",
          ],
        },
        {
          heading: "Converse e refine",
          body: [
            "Raramente a primeira resposta é a ideal. Peça ajustes específicos: “deixe mais curto”, “use um tom mais descontraído”, “troque o exemplo por um de academia”. Também é útil pedir várias opções e escolher a melhor.",
            "Não compartilhe dados pessoais de clientes, senhas ou informações confidenciais nos comandos.",
          ],
        },
      ],
      steps: [
        "Escreva um comando simples: “Crie uma legenda para um post de pão caseiro”.",
        "Reescreva usando papel, contexto, tarefa, formato e restrições.",
        "Compare as duas respostas.",
        "Peça dois ajustes específicos na melhor resposta.",
        "Salve o comando final como modelo para reutilizar.",
      ],
      example: {
        title: "Exemplo prático: comando completo",
        body: "“Atue como redator de Instagram. Tenho uma padaria de bairro e meu público são famílias da região. Escreva 3 opções de legenda para um post de pão caseiro saindo do forno, com até 40 palavras, tom acolhedor, terminando com convite para visitar a loja. Não use promessas exageradas nem hashtags demais.”",
      },
      keyPoints: [
        "Papel, contexto, tarefa, formato e restrições.",
        "Refine com pedidos específicos.",
        "Não coloque dados sensíveis nos comandos.",
      ],
    },
    {
      id: "ia-para-imagens-e-videos",
      title: "IA para imagens, vídeos e design",
      minutes: 9,
      summary:
        "Ferramentas de IA criam e editam imagens, removem fundos, geram legendas automáticas e ajudam na edição de vídeos.",
      sections: [
        {
          heading: "Usos práticos",
          body: [
            "Remover ou trocar o fundo de fotos de produtos, criar ilustrações e capas, sugerir paletas de cores, ampliar imagens, gerar legendas automáticas em vídeos, cortar silêncios e transformar vídeos longos em trechos curtos.",
          ],
        },
        {
          heading: "Cuidados importantes",
          body: [
            "Não use IA para mostrar um produto diferente do real: a imagem precisa representar o que o cliente vai receber. Evite criar imagens de pessoas reais sem autorização e respeite marcas e direitos autorais. Em muitos contextos, é recomendável informar quando uma imagem foi gerada por IA.",
            "Mantenha a identidade visual: use suas cores e fontes também nas peças criadas com IA.",
          ],
        },
      ],
      steps: [
        "Tire uma foto de um objeto com o celular.",
        "Use uma ferramenta de IA para remover o fundo.",
        "Coloque a foto sobre um fundo com as cores da sua identidade visual.",
        "Compare com a foto original e avalie se o produto continua fiel ao real.",
      ],
      example: {
        title: "Exemplo prático: vitrine de produtos",
        body: "Uma artesã fotografa suas bolsas em casa, remove o fundo com IA e aplica um fundo neutro padronizado. O catálogo fica organizado e profissional, e as bolsas aparecem exatamente como são.",
      },
      keyPoints: [
        "IA acelera edição de imagens e vídeos.",
        "Imagens devem representar o produto real.",
        "Respeite direitos autorais e a imagem de pessoas.",
      ],
    },
    {
      id: "ia-para-analise-e-atendimento",
      title: "IA para pesquisa, análise e atendimento",
      minutes: 10,
      summary:
        "A IA ajuda a resumir comentários, organizar dados, sugerir melhorias e responder perguntas frequentes — com supervisão humana.",
      sections: [
        {
          heading: "Pesquisa e análise",
          body: [
            "Você pode colar comentários (sem dados pessoais) e pedir um resumo das dúvidas e reclamações mais comuns. Pode também pedir ajuda para entender uma planilha de resultados, sugerir hipóteses para uma queda de alcance ou montar uma análise SWOT inicial.",
            "Lembre-se: a IA pode interpretar números de forma errada. Confira os cálculos importantes você mesmo.",
          ],
        },
        {
          heading: "Atendimento",
          body: [
            "Assistentes automáticos podem responder perguntas frequentes (horários, prazos, formas de contato) a qualquer hora. Deixe sempre claro que é um atendimento automático e ofereça um caminho fácil para falar com uma pessoa em casos mais complexos.",
          ],
        },
      ],
      steps: [
        "Reúna 20 comentários recentes do seu perfil, removendo nomes.",
        "Peça à IA para agrupar as dúvidas por tema.",
        "Escolha os 3 temas mais citados.",
        "Transforme cada tema em um conteúdo ou em uma resposta pronta de atendimento.",
      ],
      example: {
        title: "Exemplo prático: perguntas frequentes",
        body: "Um curso de idiomas resume com IA as mensagens do mês e descobre que metade pergunta sobre horários e nível. Cria um destaque nos Stories e respostas rápidas para essas dúvidas, reduzindo o tempo de atendimento.",
      },
      keyPoints: [
        "IA ajuda a resumir e organizar informações.",
        "Confira números e conclusões importantes.",
        "Atendimento automático deve ser transparente e ter opção humana.",
      ],
    },
    {
      id: "uso-responsavel-da-ia",
      title: "Uso ético e responsável da IA",
      minutes: 9,
      summary:
        "Usar IA com responsabilidade é proteger dados, verificar informações, ser transparente e nunca enganar o público.",
      sections: [
        {
          heading: "Regras de ouro",
          body: [
            "Privacidade: não insira dados pessoais de clientes, senhas ou informações confidenciais. Veracidade: confira fatos, números e citações. Transparência: não apresente conteúdo de IA como depoimento real nem crie pessoas falsas para promover produtos. Direitos: respeite marcas, imagens de pessoas e obras protegidas.",
          ],
        },
        {
          heading: "IA não é atalho para ganhos garantidos",
          body: [
            "Muita gente promete “ganhar dinheiro fácil com IA”. Desconfie. A IA é uma ferramenta que pode aumentar sua produtividade, mas resultados continuam dependendo de estudo, estratégia, qualidade e consistência — exatamente o que você aprendeu nos módulos anteriores.",
          ],
        },
      ],
      steps: [
        "Crie um checklist pessoal com as 4 regras de ouro.",
        "Revise um conteúdo que você fez com IA usando o checklist.",
        "Corrija qualquer informação não verificada.",
        "Decida como você vai sinalizar conteúdos feitos com IA quando necessário.",
      ],
      example: {
        title: "Exemplo prático: depoimento falso x real",
        body: "Errado: gerar com IA a foto e o depoimento de uma “cliente” que não existe. Certo: pedir autorização a uma cliente real para usar o depoimento dela e usar a IA apenas para corrigir a ortografia do texto.",
      },
      keyPoints: [
        "Proteja dados e verifique informações.",
        "Nunca use IA para enganar o público.",
        "IA aumenta produtividade, mas não garante resultados.",
      ],
    },
  ],
  quiz: [
    {
      question: "Qual é a melhor forma de enxergar a IA no marketing?",
      options: [
        "Uma substituta completa do profissional",
        "Uma assistente que acelera tarefas, com revisão humana",
        "Uma fonte sempre correta de informações",
        "Uma forma garantida de ganhar dinheiro",
      ],
      answer: 1,
      explanation: "A IA ajuda a ganhar tempo, mas pode errar; o critério humano continua essencial.",
    },
    {
      question: "O que um bom comando (prompt) deve conter?",
      options: [
        "Apenas uma palavra-chave",
        "Papel, contexto, tarefa, formato e restrições",
        "Dados pessoais dos clientes",
        "Somente emojis",
      ],
      answer: 1,
      explanation: "Quanto mais claro o pedido, melhor e mais útil é a resposta.",
    },
    {
      question: "Qual uso de imagem com IA é adequado?",
      options: [
        "Mostrar o produto mais bonito do que ele realmente é",
        "Remover o fundo de uma foto real do produto",
        "Criar uma cliente falsa com depoimento inventado",
        "Usar a imagem de uma celebridade sem autorização",
      ],
      answer: 1,
      explanation: "A imagem continua fiel ao produto real; apenas a apresentação melhora.",
    },
    {
      question: "O que NÃO deve ser colocado em uma ferramenta de IA?",
      options: [
        "Uma descrição da sua persona",
        "O tema de um post",
        "Senhas e dados pessoais de clientes",
        "O tom de voz desejado",
      ],
      answer: 2,
      explanation: "Dados sensíveis e confidenciais devem ser protegidos.",
    },
    {
      question: "Um atendimento automático com IA deve:",
      options: [
        "Fingir ser uma pessoa",
        "Ser transparente e oferecer opção de falar com um humano",
        "Responder qualquer coisa, mesmo sem saber",
        "Bloquear quem faz perguntas difíceis",
      ],
      answer: 1,
      explanation: "Transparência e um caminho para atendimento humano preservam a confiança.",
    },
  ],
};
