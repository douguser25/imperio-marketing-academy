import type { CourseModule } from "../types";

export const vendasOnline: CourseModule = {
  id: "vendas-online",
  number: 2,
  title: "Como Fazer Vendas Online",
  tagline: "Do primeiro contato à decisão do cliente.",
  description:
    "Entenda como funcionam as vendas pela internet, como encontrar clientes em potencial, escolher e apresentar produtos, conquistar confiança e melhorar resultados.",
  icon: "cart",
  lessons: [
    {
      id: "como-funcionam-vendas-internet",
      title: "Como funcionam as vendas pela internet",
      minutes: 9,
      summary:
        "Uma venda on-line acontece quando uma oferta clara encontra a pessoa certa, no momento certo, com confiança suficiente para ela decidir.",
      sections: [
        {
          heading: "Os elementos de uma venda on-line",
          body: [
            "Toda venda digital tem quatro elementos: um produto ou serviço que resolve um problema real, um público que tem esse problema, um canal onde esse público está (rede social, busca, e-mail) e uma oferta clara explicando o que a pessoa recebe, como e por quanto.",
            "Se um desses elementos falha, a venda não acontece. Um ótimo produto mostrado para o público errado não vende; um público certo com uma oferta confusa também não.",
          ],
        },
        {
          heading: "Onde as vendas acontecem",
          body: [
            "As vendas podem ser concluídas em sites próprios, em marketplaces (grandes lojas virtuais que reúnem vários vendedores), em plataformas de produtos digitais ou diretamente por mensagens. Em todos os casos, o vendedor precisa explicar bem e transmitir segurança.",
          ],
        },
      ],
      steps: [
        "Escolha um produto qualquer (ex.: garrafa térmica).",
        "Descreva o problema que ele resolve (manter a bebida na temperatura).",
        "Defina quem tem esse problema (quem trabalha fora, pratica esportes).",
        "Indique onde esse público está (Instagram de academia, grupos de corrida).",
        "Escreva em uma frase o que a pessoa recebe ao escolher esse produto.",
      ],
      example: {
        title: "Exemplo prático: marmitas saudáveis",
        body: "Problema: falta de tempo para cozinhar de forma saudável. Público: profissionais que trabalham em escritório. Canal: Instagram e WhatsApp. Oferta: “Kit com 10 marmitas balanceadas, entregues toda segunda-feira”. Os quatro elementos estão presentes e claros.",
      },
      keyPoints: [
        "Produto, público, canal e oferta precisam estar alinhados.",
        "Uma oferta confusa afasta até o público certo.",
        "Vendas podem acontecer em sites, marketplaces ou mensagens.",
      ],
    },
    {
      id: "encontrar-clientes",
      title: "Como encontrar possíveis clientes",
      minutes: 10,
      summary:
        "Encontrar clientes começa por entender quem eles são, onde estão e o que procuram — isso se chama definir o público-alvo e a persona.",
      sections: [
        {
          heading: "Público-alvo e persona",
          body: [
            "Público-alvo é a descrição geral de quem pode se interessar (ex.: mulheres de 25 a 40 anos que praticam yoga). Persona é um personagem detalhado que representa esse público: nome, rotina, desafios, desejos e objeções.",
            "Com uma persona definida, fica muito mais fácil escrever mensagens, escolher canais e criar conteúdos que realmente conversem com as pessoas.",
          ],
        },
        {
          heading: "Onde procurar",
          body: [
            "Observe comentários em perfis do seu nicho, grupos e comunidades on-line, pesquisas no Google e perguntas frequentes em fóruns. Essas fontes revelam as dúvidas e dores reais das pessoas — matéria-prima para seus conteúdos e ofertas.",
          ],
        },
      ],
      steps: [
        "Dê um nome para sua persona (ex.: “Juliana, 32 anos”).",
        "Descreva a rotina dela em três frases.",
        "Liste três problemas que ela enfrenta relacionados ao seu nicho.",
        "Liste três motivos que fariam ela hesitar antes de comprar.",
        "Anote onde ela passa tempo on-line.",
      ],
      example: {
        title: "Exemplo prático: persona para curso de inglês",
        body: "Rafael, 28 anos, analista administrativo. Quer uma promoção que exige inglês, mas tem pouco tempo e vergonha de errar. Usa LinkedIn e YouTube. Conteúdos ideais: aulas curtas de inglês para o trabalho e histórias de quem superou a timidez.",
      },
      keyPoints: [
        "Público-alvo é o grupo geral; persona é o retrato detalhado.",
        "Comentários e comunidades revelam dores reais.",
        "A persona orienta mensagens, canais e conteúdos.",
      ],
    },
    {
      id: "escolher-produtos",
      title: "Como escolher produtos para divulgar",
      minutes: 9,
      summary:
        "Bons produtos para divulgar resolvem problemas reais, têm boa reputação e combinam com o público que você atende.",
      sections: [
        {
          heading: "Critérios de escolha",
          body: [
            "Avalie: o produto resolve um problema claro? Tem avaliações positivas e reais? A empresa responsável é confiável e oferece suporte? O preço é coerente com o que entrega? Você recomendaria para um amigo?",
            "Evite produtos com promessas exageradas, sem informações claras ou com muitas reclamações. Sua reputação está ligada ao que você recomenda.",
          ],
        },
        {
          heading: "Alinhamento com o nicho",
          body: [
            "Um produto excelente, mas fora do seu nicho, tende a gerar pouco interesse da sua audiência. Prefira produtos que façam sentido para as pessoas que já acompanham você ou que você quer atrair.",
          ],
        },
      ],
      steps: [
        "Liste três produtos do seu nicho.",
        "Pesquise avaliações de clientes em sites independentes.",
        "Verifique a política de troca, garantia e suporte.",
        "Dê uma nota de 0 a 10 para cada critério.",
        "Escolha o produto com melhor equilíbrio de notas.",
      ],
      example: {
        title: "Exemplo prático: nicho de pets",
        body: "Paula compara três comedouros automáticos. Um é barato, mas tem muitas reclamações de defeito; outro é caro e pouco conhecido; o terceiro tem boas avaliações, garantia de 1 ano e suporte rápido. Ela escolhe o terceiro para recomendar.",
      },
      keyPoints: [
        "Escolha produtos que resolvem problemas reais e têm boa reputação.",
        "Sua credibilidade depende do que você recomenda.",
        "Prefira produtos alinhados ao seu nicho.",
      ],
    },
    {
      id: "apresentar-produtos",
      title: "Como apresentar produtos corretamente",
      minutes: 11,
      summary:
        "Apresentar bem é mostrar o problema, a solução e a transformação, com clareza, honestidade e provas.",
      sections: [
        {
          heading: "Característica x benefício",
          body: [
            "Característica é o que o produto tem; benefício é o que ele faz pela pessoa. “Bateria de 5000 mAh” é característica. “Passa o dia todo fora de casa sem se preocupar com carregador” é benefício. As pessoas decidem principalmente pelos benefícios.",
          ],
        },
        {
          heading: "Uma estrutura simples de apresentação",
          body: [
            "1) Comece pelo problema que a pessoa sente. 2) Apresente o produto como solução. 3) Mostre como ele funciona na prática (demonstração). 4) Traga provas: avaliações, resultados, comparações honestas. 5) Explique condições: o que está incluso, garantia, como receber. 6) Faça um convite claro para a próxima ação.",
            "Seja sempre honesto sobre limitações. Mostrar para quem o produto não é indicado aumenta a confiança de quem é o público certo.",
          ],
        },
      ],
      steps: [
        "Escolha um produto e liste cinco características.",
        "Transforme cada característica em um benefício.",
        "Escreva um parágrafo seguindo a estrutura problema → solução → prova → convite.",
        "Inclua uma frase sobre para quem o produto não é indicado.",
      ],
      example: {
        title: "Exemplo prático: mochila para notebook",
        body: "“Cansado de dor nas costas carregando o notebook? Esta mochila tem alças acolchoadas e divisória protegida — você leva tudo com conforto e segurança. Mais de 2 mil avaliações com nota 4,8. Ideal para notebooks de até 15,6 polegadas; não indicada para modelos maiores.”",
      },
      keyPoints: [
        "Benefícios convencem mais do que características.",
        "Use a estrutura problema → solução → demonstração → prova → convite.",
        "Ser honesto sobre limitações aumenta a confiança.",
      ],
    },
    {
      id: "conquistar-confianca",
      title: "Como conquistar a confiança dos consumidores",
      minutes: 9,
      summary:
        "Confiança nasce de transparência, consistência, provas sociais e bom atendimento.",
      sections: [
        {
          heading: "Os pilares da confiança",
          body: [
            "Transparência: informações claras sobre preço, prazos e condições. Consistência: publicar com frequência e manter a mesma postura ao longo do tempo. Prova social: depoimentos, avaliações e exemplos reais. Autoridade: demonstrar conhecimento por meio de conteúdo útil. Atendimento: responder rápido e com respeito.",
          ],
        },
        {
          heading: "O que destrói a confiança",
          body: [
            "Promessas exageradas, depoimentos falsos, esconder informações, pressionar a pessoa com urgência artificial e ignorar reclamações. Uma única atitude desonesta pode desfazer meses de trabalho.",
          ],
        },
      ],
      steps: [
        "Revise seu perfil e veja se está claro quem você é e o que oferece.",
        "Reúna depoimentos reais (com autorização) de quem já usou o produto.",
        "Crie uma lista de perguntas frequentes com respostas claras.",
        "Defina um prazo máximo para responder mensagens.",
      ],
      example: {
        title: "Exemplo prático: confeiteira iniciante",
        body: "Marta publica bastidores da produção, mostra a cozinha limpa, posta avaliações de clientes e responde todas as mensagens em até uma hora. Mesmo sem loja física, as pessoas confiam em fazer encomendas com ela.",
      },
      keyPoints: [
        "Transparência, consistência e provas sociais geram confiança.",
        "Depoimentos devem ser sempre reais e autorizados.",
        "Atendimento rápido e respeitoso faz diferença.",
      ],
    },
    {
      id: "melhorar-resultados",
      title: "Como melhorar os resultados",
      minutes: 10,
      summary:
        "Melhorar resultados é um ciclo: medir, identificar gargalos, testar mudanças e repetir.",
      sections: [
        {
          heading: "Métricas básicas",
          body: [
            "Alcance: quantas pessoas viram. Engajamento: quantas interagiram. Cliques: quantas foram até a oferta. Taxa de conversão: dos que chegaram à oferta, quantos decidiram comprar. Ticket médio: valor médio por compra.",
            "Ao olhar esses números em sequência, você descobre em qual etapa as pessoas estão desistindo.",
          ],
        },
        {
          heading: "Testes simples",
          body: [
            "Mude uma coisa por vez: o título, a imagem, o horário de publicação ou a forma de apresentar o benefício. Compare os resultados por alguns dias. Se mudar tudo ao mesmo tempo, você não saberá o que realmente fez diferença.",
          ],
        },
      ],
      steps: [
        "Anote alcance, cliques e conversões da última semana.",
        "Identifique a etapa com maior queda.",
        "Escolha uma única mudança para testar nessa etapa.",
        "Rode o teste por pelo menos 7 dias.",
        "Compare e mantenha a versão vencedora.",
      ],
      example: {
        title: "Exemplo prático: muitos cliques, poucas compras",
        body: "Um post recebe 500 cliques, mas só 2 compras. O problema não é o alcance, e sim a página da oferta. Ao incluir perguntas frequentes e fotos reais do produto, as compras sobem para 9 com o mesmo número de cliques.",
      },
      keyPoints: [
        "Meça cada etapa: alcance, cliques, conversão.",
        "Encontre o gargalo antes de mudar algo.",
        "Teste uma variável por vez.",
      ],
    },
  ],
  quiz: [
    {
      question: "Quais são os quatro elementos de uma venda on-line?",
      options: [
        "Logo, cor, fonte e slogan",
        "Produto, público, canal e oferta",
        "Preço, desconto, frete e cupom",
        "Instagram, TikTok, Facebook e YouTube",
      ],
      answer: 1,
      explanation: "Produto, público, canal e oferta precisam estar alinhados para a venda acontecer.",
    },
    {
      question: "Qual frase é um BENEFÍCIO?",
      options: [
        "Tela de 6,5 polegadas",
        "Feito de alumínio",
        "Assista a filmes com conforto em qualquer lugar",
        "Pesa 180 gramas",
      ],
      answer: 2,
      explanation: "Benefício descreve o que o produto faz pela pessoa; as outras opções são características.",
    },
    {
      question: "O que é uma persona?",
      options: [
        "Um perfil falso nas redes",
        "Um retrato detalhado e fictício do cliente ideal",
        "O nome da empresa",
        "Um tipo de anúncio",
      ],
      answer: 1,
      explanation: "A persona representa o cliente ideal com rotina, dores, desejos e objeções.",
    },
    {
      question: "Qual atitude DESTRÓI a confiança?",
      options: [
        "Responder mensagens rapidamente",
        "Mostrar depoimentos reais",
        "Fazer promessas exageradas",
        "Explicar claramente as condições",
      ],
      answer: 2,
      explanation: "Promessas exageradas geram frustração e afastam clientes.",
    },
    {
      question: "Ao testar melhorias, o ideal é:",
      options: [
        "Mudar tudo de uma vez",
        "Mudar uma variável por vez e comparar",
        "Não medir nada",
        "Mudar algo a cada hora",
      ],
      answer: 1,
      explanation: "Mudando uma coisa por vez você identifica o que realmente fez diferença.",
    },
  ],
};
