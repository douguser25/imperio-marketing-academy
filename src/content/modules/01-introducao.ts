import type { CourseModule } from "../types";

export const introducao: CourseModule = {
  id: "introducao-marketing-digital",
  number: 1,
  title: "Introdução ao Marketing Digital",
  tagline: "A base de tudo: entenda o mercado antes de agir.",
  description:
    "Descubra o que é marketing digital, como ele funciona na prática, por onde começar sem nenhuma experiência e quais oportunidades existem nesse mercado.",
  icon: "rocket",
  lessons: [
    {
      id: "o-que-e-marketing-digital",
      title: "O que é marketing digital?",
      minutes: 8,
      summary:
        "Marketing digital é o conjunto de ações que uma pessoa ou empresa faz na internet para atrair, conquistar e manter clientes.",
      sections: [
        {
          heading: "A definição simples",
          body: [
            "Marketing é tudo aquilo que aproxima um produto ou serviço das pessoas que precisam dele. Quando essas ações acontecem em canais on-line — redes sociais, buscadores como o Google, e-mail, sites, aplicativos de mensagem — chamamos de marketing digital.",
            "Ele não é apenas “postar nas redes”. Envolve entender quem é o público, criar mensagens que façam sentido para essas pessoas, escolher os canais certos e medir os resultados para melhorar continuamente.",
          ],
        },
        {
          heading: "Por que ele é diferente do marketing tradicional",
          body: [
            "No marketing tradicional (TV, rádio, outdoor, jornal), a mensagem é a mesma para todo mundo e é difícil saber quantas pessoas realmente prestaram atenção. No digital, você consegue direcionar a mensagem para grupos específicos e acompanhar números como visualizações, cliques e mensagens recebidas.",
            "Outra diferença importante é o custo de entrada: é possível começar com pouco ou nenhum dinheiro, usando conteúdo gratuito, e ir investindo conforme aprende.",
          ],
        },
      ],
      steps: [
        "Pense em um produto que você comprou recentemente pela internet.",
        "Lembre por onde você conheceu esse produto (anúncio, vídeo, indicação, busca no Google).",
        "Anote o que fez você confiar e decidir comprar.",
        "Perceba: cada um desses pontos foi uma ação de marketing digital.",
      ],
      example: {
        title: "Exemplo prático: a padaria do bairro",
        body: "Uma padaria cria um perfil no Instagram, posta fotos do pão saindo do forno às 7h e cadastra o endereço no Google Maps. Pessoas próximas veem as fotos, encontram a padaria ao pesquisar “padaria perto de mim” e passam a visitá-la. Isso é marketing digital aplicado a um negócio local.",
      },
      keyPoints: [
        "Marketing digital é atrair, conquistar e manter clientes usando a internet.",
        "Permite direcionar mensagens e medir resultados.",
        "Pode ser iniciado com baixo custo, focando em aprendizado.",
      ],
    },
    {
      id: "como-funciona",
      title: "Como o marketing digital funciona?",
      minutes: 10,
      summary:
        "Todo processo de marketing digital segue uma jornada: a pessoa descobre, se interessa, avalia e decide. Seu trabalho é acompanhar cada etapa.",
      sections: [
        {
          heading: "A jornada do cliente",
          body: [
            "Ninguém compra algo no primeiro segundo em que ouve falar dele. Existe um caminho, chamado de jornada do cliente, que costuma ter quatro etapas: descoberta (a pessoa percebe que tem um problema ou desejo), consideração (pesquisa possíveis soluções), decisão (escolhe uma opção) e fidelização (volta a comprar e indica para outras pessoas).",
            "Em cada etapa, a pessoa precisa de um tipo diferente de conteúdo. Na descoberta, conteúdos educativos funcionam melhor. Na decisão, ela quer provas: depoimentos, demonstrações, garantia e clareza sobre o que vai receber.",
          ],
        },
        {
          heading: "O funil de vendas",
          body: [
            "O funil é uma forma visual de representar essa jornada. No topo entram muitas pessoas que só estão conhecendo o assunto; no meio ficam as que demonstraram interesse; no fundo, as que estão prontas para decidir. É normal que o número de pessoas diminua a cada etapa.",
            "Os principais canais que alimentam o funil são: conteúdo orgânico (posts, vídeos, artigos), tráfego pago (anúncios), e-mail marketing, mensagens diretas e buscadores.",
          ],
        },
      ],
      steps: [
        "Escolha um tema que você domina ou quer aprender (ex.: culinária saudável).",
        "Liste uma dúvida de quem está começando (topo do funil).",
        "Liste uma comparação que alguém faria antes de escolher (meio do funil).",
        "Liste uma objeção de quem está quase decidindo (fundo do funil).",
        "Cada item da lista é uma ideia de conteúdo para uma etapa da jornada.",
      ],
      example: {
        title: "Exemplo prático: curso de violão",
        body: "Topo: vídeo “3 erros de quem começa a tocar violão”. Meio: post comparando aprender sozinho x com professor. Fundo: depoimento de um aluno mostrando a evolução em 3 meses e explicando como as aulas funcionam. Cada conteúdo conversa com uma fase diferente da jornada.",
      },
      keyPoints: [
        "A jornada do cliente tem descoberta, consideração, decisão e fidelização.",
        "O funil ajuda a planejar conteúdos para cada etapa.",
        "Cada canal digital pode atuar em uma ou mais etapas.",
      ],
    },
    {
      id: "comecar-do-zero",
      title: "Como começar do zero?",
      minutes: 12,
      summary:
        "Começar do zero exige organização: escolher um foco, aprender o básico, praticar com pequenos projetos e analisar o que funcionou.",
      sections: [
        {
          heading: "Mentalidade de iniciante",
          body: [
            "Quem começa costuma querer aprender tudo ao mesmo tempo: anúncios, vídeos, afiliados, copywriting. Isso gera confusão. O melhor caminho é escolher um foco inicial e dominar o básico dele antes de avançar.",
            "Também é importante ter expectativas realistas. Resultados no digital dependem de consistência, testes e aprendizado. Não existe fórmula garantida de ganho rápido — desconfie de quem promete isso.",
          ],
        },
        {
          heading: "Ferramentas mínimas para começar",
          body: [
            "Você precisa de pouco: um celular com câmera razoável, acesso à internet, uma conta em pelo menos uma rede social e um lugar para anotar ideias e resultados (pode ser uma planilha gratuita).",
            "Com o tempo, você pode adicionar ferramentas de edição de imagem e vídeo, agendamento de posts e análise de dados — muitas delas têm versões gratuitas.",
          ],
        },
      ],
      steps: [
        "Defina um nicho (área de interesse) com que você se identifica.",
        "Escolha um único canal para começar (ex.: Instagram ou TikTok).",
        "Estude o básico desse canal durante uma semana, usando os módulos desta plataforma.",
        "Publique conteúdos com regularidade (ex.: 3 vezes por semana) por 30 dias.",
        "Anote números semanais: alcance, comentários, seguidores, mensagens.",
        "Revise o que funcionou melhor e ajuste o plano para o mês seguinte.",
      ],
      example: {
        title: "Exemplo prático: plano de 30 dias",
        body: "Ana gosta de organização doméstica. Ela escolhe o TikTok, grava vídeos curtos com dicas de organização às segundas, quartas e sextas e anota os resultados em uma planilha. No fim do mês, percebe que vídeos de “antes e depois” têm o dobro de visualizações e decide produzir mais desse formato.",
      },
      keyPoints: [
        "Escolha um foco e um canal antes de expandir.",
        "Consistência e análise valem mais que perfeição.",
        "Desconfie de promessas de ganho rápido e garantido.",
      ],
    },
    {
      id: "oportunidades-do-mercado",
      title: "Quais são as oportunidades desse mercado?",
      minutes: 9,
      summary:
        "O mercado digital oferece caminhos como afiliação, prestação de serviços, criação de conteúdo e gestão de redes para empresas.",
      sections: [
        {
          heading: "Principais caminhos profissionais",
          body: [
            "Afiliado: divulga produtos de outras empresas e recebe comissão por venda realizada a partir da sua indicação. Social media: cuida das redes sociais de empresas. Gestor de tráfego: cria e otimiza anúncios pagos. Copywriter: escreve textos persuasivos. Criador de conteúdo: produz vídeos, posts e artigos para construir uma audiência. Editor de vídeo e designer: produzem materiais visuais.",
            "Muitos profissionais combinam mais de uma habilidade. Um social media, por exemplo, costuma saber um pouco de design, texto e análise de resultados.",
          ],
        },
        {
          heading: "Como avaliar qual caminho combina com você",
          body: [
            "Pense no que você gosta de fazer: escrever, falar, analisar números, criar imagens? Cada caminho exige habilidades diferentes. Também considere seu tempo disponível e se você prefere trabalhar com seus próprios projetos ou atendendo clientes.",
            "Lembre-se: toda oportunidade exige estudo e prática. Os resultados variam de pessoa para pessoa e dependem de dedicação, qualidade e contexto.",
          ],
        },
      ],
      steps: [
        "Leia a lista de caminhos profissionais acima.",
        "Marque os dois que mais despertaram seu interesse.",
        "Pesquise perfis de pessoas que trabalham com eles e observe a rotina.",
        "Escolha um para estudar com prioridade nos próximos módulos.",
      ],
      example: {
        title: "Exemplo prático: escolhendo um caminho",
        body: "Carlos gosta de números e planilhas, mas não gosta de aparecer em vídeos. Ele percebe que gestão de tráfego combina mais com ele do que criação de conteúdo, e decide focar no Módulo 5 (Tráfego Pago e Orgânico) depois de terminar a base.",
      },
      keyPoints: [
        "Existem vários caminhos: afiliado, social media, tráfego, copy, conteúdo.",
        "Escolha com base nas suas habilidades e preferências.",
        "Resultados dependem de estudo, prática e contexto — nunca são garantidos.",
      ],
    },
    {
      id: "empresas-na-internet",
      title: "Como empresas usam a internet para conquistar clientes?",
      minutes: 10,
      summary:
        "Empresas combinam presença em buscas, redes sociais, conteúdo, anúncios e atendimento rápido para atrair e manter clientes.",
      sections: [
        {
          heading: "Estratégias mais comuns",
          body: [
            "Presença no Google: ter perfil no Google Meu Negócio e um site ajuda a ser encontrado por quem pesquisa. Redes sociais: mostram bastidores, produtos e depoimentos, criando proximidade. Conteúdo educativo: blogs e vídeos que resolvem dúvidas atraem pessoas interessadas. Anúncios: aceleram o alcance para públicos específicos. E-mail e WhatsApp: mantêm contato com quem já demonstrou interesse.",
          ],
        },
        {
          heading: "O papel do relacionamento",
          body: [
            "Conquistar um cliente novo costuma custar mais do que manter um cliente atual. Por isso, empresas investem em pós-venda: mensagens de agradecimento, suporte rápido, conteúdos exclusivos e programas de indicação.",
            "Um cliente satisfeito vira divulgador. Avaliações positivas e indicações são uma das formas mais fortes de marketing que existem.",
          ],
        },
      ],
      steps: [
        "Escolha uma marca que você admira.",
        "Pesquise o nome dela no Google e veja o que aparece.",
        "Visite as redes sociais e observe que tipos de posts ela faz.",
        "Repare se ela responde comentários e como trata os clientes.",
        "Anote três estratégias que você poderia adaptar para um pequeno negócio.",
      ],
      example: {
        title: "Exemplo prático: loja de cosméticos local",
        body: "Uma loja publica tutoriais de maquiagem com produtos que vende, responde dúvidas no direct em poucos minutos e pede que clientes deixem avaliações no Google. Em alguns meses, passa a ser recomendada nas buscas da região e recebe novos clientes por indicação.",
      },
      keyPoints: [
        "Empresas combinam buscas, redes, conteúdo, anúncios e mensagens.",
        "Relacionamento e pós-venda geram indicações.",
        "Estratégias de grandes marcas podem ser adaptadas para pequenos negócios.",
      ],
    },
  ],
  quiz: [
    {
      question: "O que melhor define marketing digital?",
      options: [
        "Apenas postar fotos nas redes sociais",
        "Ações na internet para atrair, conquistar e manter clientes",
        "Vender produtos em uma loja física",
        "Fazer propaganda na televisão",
      ],
      answer: 1,
      explanation:
        "Marketing digital envolve todo o processo on-line de atrair, conquistar e manter clientes, não apenas postar.",
    },
    {
      question: "Qual é a ordem correta da jornada do cliente?",
      options: [
        "Decisão, descoberta, fidelização, consideração",
        "Consideração, decisão, descoberta, fidelização",
        "Descoberta, consideração, decisão, fidelização",
        "Fidelização, decisão, consideração, descoberta",
      ],
      answer: 2,
      explanation: "A pessoa primeiro descobre, depois considera opções, decide e, por fim, pode se fidelizar.",
    },
    {
      question: "Qual é a melhor atitude de quem está começando do zero?",
      options: [
        "Aprender todos os canais ao mesmo tempo",
        "Escolher um foco e um canal, praticar com consistência e analisar",
        "Esperar ter equipamentos profissionais",
        "Seguir quem promete ganhos rápidos garantidos",
      ],
      answer: 1,
      explanation: "Foco, consistência e análise são a base de um começo sólido.",
    },
    {
      question: "O que faz um afiliado?",
      options: [
        "Cria anúncios para empresas",
        "Divulga produtos de outras empresas e recebe comissão por venda indicada",
        "Edita vídeos para criadores",
        "Gerencia o estoque de uma loja",
      ],
      answer: 1,
      explanation: "O afiliado indica produtos de terceiros e é comissionado pelas vendas geradas pela sua indicação.",
    },
    {
      question: "Por que empresas investem em pós-venda?",
      options: [
        "Porque é obrigatório por lei",
        "Porque manter clientes e gerar indicações costuma ser mais eficiente",
        "Para diminuir o número de clientes",
        "Porque anúncios não funcionam",
      ],
      answer: 1,
      explanation: "Clientes satisfeitos voltam a comprar e indicam a marca para outras pessoas.",
    },
  ],
};
