import type { CourseModule } from "../types";

export const afiliados: CourseModule = {
  id: "marketing-de-afiliados",
  number: 3,
  title: "Marketing de Afiliados",
  tagline: "Divulgue produtos de outras empresas com ética e estratégia.",
  description:
    "Aprenda o que é marketing de afiliados, como se tornar afiliado, como funcionam links, comissões e plataformas, e como divulgar produtos de terceiros com responsabilidade.",
  icon: "link",
  lessons: [
    {
      id: "o-que-e-afiliados",
      title: "O que é marketing de afiliados?",
      minutes: 8,
      summary:
        "É um modelo em que você indica produtos de uma empresa e recebe uma comissão quando alguém compra pela sua indicação.",
      sections: [
        {
          heading: "Como o modelo funciona",
          body: [
            "Existem três partes: o produtor (quem cria ou vende o produto), o afiliado (quem divulga) e o cliente (quem compra). O afiliado recebe um link exclusivo; quando um cliente compra através desse link, o sistema registra a venda e o afiliado recebe uma porcentagem combinada.",
            "O afiliado não precisa ter estoque, enviar produtos ou fazer atendimento pós-venda — isso é responsabilidade do produtor. Em compensação, o afiliado precisa gerar atenção e confiança.",
          ],
        },
        {
          heading: "Vantagens e desafios",
          body: [
            "Vantagens: baixo custo inicial, flexibilidade de horário e possibilidade de trabalhar com vários produtos. Desafios: concorrência, necessidade de construir audiência e dependência das regras do produtor. Não há garantia de comissões — elas dependem da qualidade da divulgação e do interesse do público.",
          ],
        },
      ],
      steps: [
        "Identifique um produto que você já usa e gosta.",
        "Pesquise se a empresa tem programa de afiliados.",
        "Leia as regras do programa com atenção.",
        "Anote qual é a comissão e como ela é paga.",
      ],
      example: {
        title: "Exemplo prático: blog de leitura",
        body: "Lucas escreve resenhas de livros. Ele se cadastra no programa de afiliados de uma grande livraria on-line e coloca seu link nas resenhas. Quando um leitor compra o livro pelo link, Lucas recebe uma pequena porcentagem do valor.",
      },
      keyPoints: [
        "Produtor cria, afiliado divulga, cliente compra.",
        "O afiliado recebe comissão pelas vendas geradas pelo seu link.",
        "Comissões não são garantidas: dependem da divulgação e do público.",
      ],
    },
    {
      id: "como-se-tornar-afiliado",
      title: "Como se tornar afiliado?",
      minutes: 9,
      summary:
        "Para se tornar afiliado, você se cadastra em uma plataforma ou programa, escolhe produtos, solicita afiliação e recebe seus links.",
      sections: [
        {
          heading: "Passo a passo geral",
          body: [
            "A maioria dos programas pede cadastro com dados pessoais, uma forma de recebimento (conta bancária ou carteira digital) e, às vezes, informações sobre onde você pretende divulgar. Alguns produtores aprovam automaticamente; outros analisam seu perfil antes de aceitar.",
          ],
        },
        {
          heading: "Leia as regras",
          body: [
            "Cada produtor define regras: canais permitidos, proibição de anúncios com o nome da marca, uso de imagens, prazos de pagamento e políticas de reembolso. Descumprir regras pode cancelar sua afiliação e suas comissões.",
          ],
        },
      ],
      steps: [
        "Escolha uma plataforma ou programa de afiliados confiável.",
        "Crie sua conta com dados verdadeiros.",
        "Configure a forma de recebimento.",
        "Procure produtos do seu nicho no catálogo.",
        "Leia a página do produto e as regras de divulgação.",
        "Solicite afiliação e aguarde aprovação.",
      ],
      example: {
        title: "Exemplo prático: nicho fitness",
        body: "Bruna cria conta em uma plataforma, procura “treino em casa” no catálogo e encontra um curso bem avaliado. Lê que anúncios com o nome do produto são proibidos, então decide divulgar apenas com conteúdo orgânico no Instagram.",
      },
      keyPoints: [
        "Cadastro, recebimento, escolha do produto e solicitação de afiliação.",
        "Regras do produtor devem ser seguidas à risca.",
        "Use sempre dados verdadeiros no cadastro.",
      ],
    },
    {
      id: "links-de-afiliados",
      title: "Como funcionam os links de afiliados?",
      minutes: 8,
      summary:
        "O link de afiliado é um endereço único que identifica você e registra as vendas feitas a partir da sua indicação.",
      sections: [
        {
          heading: "Rastreamento",
          body: [
            "Quando alguém clica no seu link, a plataforma salva uma informação no navegador da pessoa (um cookie) indicando que ela veio de você. Se a compra acontecer dentro do prazo de validade desse cookie — por exemplo, 30 ou 60 dias — a venda é atribuída a você.",
            "Algumas plataformas usam a regra do último clique (a comissão vai para o último afiliado clicado) e outras a do primeiro clique. Isso fica descrito nas regras do produto.",
          ],
        },
        {
          heading: "Boas práticas com links",
          body: [
            "Sempre informe que se trata de um link de afiliado — isso é transparência com seu público. Use encurtadores confiáveis para deixar o link legível e acompanhe quantos cliques cada link recebe para saber quais conteúdos funcionam melhor.",
          ],
        },
      ],
      steps: [
        "Gere seu link de afiliado na plataforma.",
        "Teste o link abrindo em uma janela anônima.",
        "Crie uma versão encurtada e fácil de ler.",
        "Adicione uma frase informando que é link de afiliado.",
        "Acompanhe os cliques no painel da plataforma.",
      ],
      example: {
        title: "Exemplo prático: link na bio",
        body: "Diego coloca na bio do Instagram uma página com seus links organizados por tema e escreve: “Alguns links são de afiliado: posso receber comissão sem custo extra para você.” Os seguidores apreciam a transparência.",
      },
      keyPoints: [
        "O link identifica você e registra a venda.",
        "Cookies têm prazo de validade definido pela plataforma.",
        "Informe sempre que o link é de afiliado.",
      ],
    },
    {
      id: "comissoes",
      title: "O que são comissões?",
      minutes: 8,
      summary:
        "Comissão é a parte do valor da venda que o afiliado recebe. Pode ser uma porcentagem, um valor fixo ou recorrente.",
      sections: [
        {
          heading: "Tipos de comissão",
          body: [
            "Porcentagem: você recebe uma fração do preço (ex.: 30%). Valor fixo: um valor definido por venda. Recorrente: em assinaturas, você recebe enquanto o cliente continuar pagando. Algumas empresas pagam por cadastro (lead) em vez de por venda.",
          ],
        },
        {
          heading: "Prazos e reembolsos",
          body: [
            "As comissões costumam ficar retidas por um período (prazo de garantia do produto). Se o cliente pedir reembolso nesse período, a comissão é cancelada. Por isso, recomendar produtos de qualidade é também uma questão de estratégia.",
            "Exemplo de cálculo: produto de R$ 200 com 40% de comissão = R$ 80 por venda, antes de taxas da plataforma. Esse é apenas um exemplo de conta — não representa ganho esperado.",
          ],
        },
      ],
      steps: [
        "Abra a página de um produto no programa de afiliados.",
        "Identifique o tipo de comissão.",
        "Verifique o prazo de liberação e as taxas.",
        "Faça a conta do valor líquido por venda.",
      ],
      example: {
        title: "Exemplo prático: assinatura mensal",
        body: "Um aplicativo de meditação paga 20% recorrente. Se uma pessoa assina por R$ 30/mês pela indicação de Fernanda, ela recebe R$ 6 por mês enquanto a assinatura continuar ativa.",
      },
      keyPoints: [
        "Comissões podem ser percentuais, fixas ou recorrentes.",
        "Reembolsos cancelam comissões.",
        "Considere taxas e prazos ao calcular valores.",
      ],
    },
    {
      id: "divulgar-produtos-terceiros",
      title: "Como divulgar produtos de outras empresas?",
      minutes: 11,
      summary:
        "A melhor divulgação de afiliado é útil: ajuda a pessoa a decidir, em vez de apenas empurrar um link.",
      sections: [
        {
          heading: "Formatos que funcionam",
          body: [
            "Resenhas honestas (pontos positivos e negativos), tutoriais mostrando o produto em uso, comparativos entre opções, listas (“5 itens para quem está começando a correr”) e respostas a dúvidas frequentes. Todos esses formatos entregam valor mesmo para quem não comprar.",
          ],
        },
        {
          heading: "Ética na divulgação",
          body: [
            "Nunca invente resultados, não use depoimentos falsos e não faça promessas que o produto não cumpre. Respeite as regras do produtor e as leis de proteção ao consumidor. Informe a relação comercial com clareza.",
          ],
        },
      ],
      steps: [
        "Escolha um formato: resenha, tutorial, comparativo ou lista.",
        "Use o produto ou estude-o profundamente antes de falar sobre ele.",
        "Liste prós e contras reais.",
        "Produza o conteúdo e adicione o link com aviso de afiliado.",
        "Responda dúvidas nos comentários.",
      ],
      example: {
        title: "Exemplo prático: comparativo de fones",
        body: "Thiago grava um vídeo comparando três fones de ouvido em qualidade de som, conforto e bateria. Ele indica qual é melhor para cada perfil e deixa links de afiliado para os três. Os espectadores confiam porque a análise é equilibrada.",
      },
      keyPoints: [
        "Conteúdo útil vende mais do que apenas um link.",
        "Resenhas, tutoriais e comparativos ajudam na decisão.",
        "Ética e transparência são obrigatórias.",
      ],
    },
    {
      id: "plataformas-de-afiliados",
      title: "Como funcionam as plataformas de afiliados?",
      minutes: 9,
      summary:
        "Plataformas de afiliados conectam produtores e afiliados, gerenciando links, vendas, pagamentos e comissões.",
      sections: [
        {
          heading: "O que a plataforma faz",
          body: [
            "Ela hospeda o catálogo de produtos, gera os links de afiliado, processa os pagamentos dos clientes, registra a origem de cada venda e distribui as comissões. Também oferece painéis com cliques, vendas e valores a receber.",
            "Existem plataformas voltadas a produtos digitais (cursos, e-books), programas de grandes lojas virtuais (produtos físicos) e redes que reúnem programas de várias empresas.",
          ],
        },
        {
          heading: "Como avaliar uma plataforma",
          body: [
            "Verifique a reputação da plataforma, a clareza das regras, as taxas cobradas, o prazo de pagamento, a qualidade do suporte e os produtos disponíveis no seu nicho.",
          ],
        },
      ],
      steps: [
        "Pesquise duas ou três plataformas conhecidas do seu nicho.",
        "Compare taxas, prazos de pagamento e regras.",
        "Leia avaliações de outros afiliados.",
        "Explore o painel e entenda os relatórios disponíveis.",
      ],
      example: {
        title: "Exemplo prático: escolhendo a plataforma",
        body: "Camila quer divulgar cursos de idiomas. Ela compara duas plataformas de produtos digitais: uma tem mais opções de cursos e outra paga em menos dias. Como está começando, ela prioriza a que tem produtos melhor avaliados no seu nicho.",
      },
      keyPoints: [
        "Plataformas conectam produtores e afiliados.",
        "Elas registram vendas e distribuem comissões.",
        "Compare reputação, taxas, prazos e suporte.",
      ],
    },
  ],
  quiz: [
    {
      question: "Quem é responsável pela entrega do produto no marketing de afiliados?",
      options: ["O afiliado", "O produtor", "O cliente", "A rede social"],
      answer: 1,
      explanation: "O produtor cuida da entrega e do pós-venda; o afiliado divulga.",
    },
    {
      question: "Para que serve o cookie de um link de afiliado?",
      options: [
        "Para deixar o site mais bonito",
        "Para registrar que o cliente veio pela sua indicação",
        "Para dar desconto ao cliente",
        "Para bloquear outros afiliados para sempre",
      ],
      answer: 1,
      explanation: "O cookie identifica a origem do clique durante um período definido.",
    },
    {
      question: "O que acontece com a comissão se o cliente pedir reembolso dentro da garantia?",
      options: [
        "O afiliado recebe em dobro",
        "Nada muda",
        "A comissão é cancelada",
        "O afiliado precisa devolver o produto",
      ],
      answer: 2,
      explanation: "Reembolsos dentro do prazo cancelam a comissão.",
    },
    {
      question: "Qual atitude é correta ao divulgar como afiliado?",
      options: [
        "Esconder que o link é de afiliado",
        "Inventar depoimentos para convencer",
        "Informar a relação comercial e mostrar prós e contras",
        "Prometer resultados garantidos",
      ],
      answer: 2,
      explanation: "Transparência e honestidade são essenciais e protegem sua reputação.",
    },
    {
      question: "O que é comissão recorrente?",
      options: [
        "Comissão paga uma única vez",
        "Comissão paga enquanto o cliente mantiver a assinatura",
        "Comissão paga só no Natal",
        "Comissão paga ao produtor",
      ],
      answer: 1,
      explanation: "Em produtos de assinatura, o afiliado pode receber a cada pagamento do cliente.",
    },
  ],
};
