import type { CourseModule } from "../types";

export const psicologia: CourseModule = {
  id: "psicologia-das-vendas",
  number: 7,
  title: "Psicologia das Vendas",
  tagline: "Entenda as pessoas para se comunicar melhor — com ética.",
  description:
    "Descubra como funciona o comportamento do consumidor, o que influencia uma decisão de compra, como transmitir confiança, apresentar benefícios, se comunicar com clientes e usar a persuasão de forma ética.",
  icon: "brain",
  lessons: [
    {
      id: "comportamento-do-consumidor",
      title: "Como funciona o comportamento dos consumidores",
      minutes: 10,
      summary:
        "Pessoas decidem com emoção e justificam com razão. Entender necessidades, desejos e medos ajuda a se comunicar melhor.",
      sections: [
        {
          heading: "Necessidades e desejos",
          body: [
            "Necessidade é algo que a pessoa precisa (se alimentar, se deslocar). Desejo é a forma específica como ela quer atender essa necessidade (um restaurante japonês, um carro elétrico). O marketing não cria necessidades, mas mostra opções que conversam com desejos existentes.",
          ],
        },
        {
          heading: "Emoção e razão",
          body: [
            "Muitas decisões começam com uma emoção — segurança, pertencimento, status, conforto, medo de perder — e depois a pessoa busca argumentos racionais para confirmar a escolha (preço, especificações, garantia). Uma boa comunicação respeita os dois lados.",
          ],
        },
      ],
      steps: [
        "Escolha um produto do seu nicho.",
        "Liste a necessidade básica que ele atende.",
        "Liste o desejo específico que ele satisfaz.",
        "Identifique a emoção principal envolvida.",
        "Liste dois argumentos racionais que confirmam a decisão.",
      ],
      example: {
        title: "Exemplo prático: tênis de corrida",
        body: "Necessidade: praticar exercício com segurança. Desejo: um tênis leve e bonito. Emoção: sentir-se capaz e motivado. Razões: amortecimento, durabilidade e avaliações positivas. A comunicação mostra a sensação de superação e depois os dados técnicos.",
      },
      keyPoints: [
        "Necessidade é o que se precisa; desejo é como se quer atender.",
        "Decisões combinam emoção e razão.",
        "Comunique a sensação e confirme com fatos.",
      ],
    },
    {
      id: "decisao-de-compra",
      title: "O que influencia uma decisão de compra",
      minutes: 10,
      summary:
        "Fatores como prova social, autoridade, reciprocidade, escassez real e facilidade influenciam a decisão.",
      sections: [
        {
          heading: "Gatilhos de decisão mais estudados",
          body: [
            "Prova social: tendemos a confiar no que outras pessoas aprovam. Autoridade: confiamos em quem demonstra conhecimento. Reciprocidade: quando recebemos algo de valor, tendemos a retribuir. Escassez: algo limitado parece mais valioso. Compromisso: quem dá um pequeno passo tende a continuar. Afinidade: compramos de quem nos identificamos.",
          ],
        },
        {
          heading: "Barreiras à compra",
          body: [
            "Dúvidas não respondidas, medo de errar, processo complicado, falta de informações sobre entrega ou garantia e preço sem justificativa clara. Remover barreiras costuma ser tão importante quanto motivar.",
          ],
        },
      ],
      steps: [
        "Liste as 5 dúvidas mais comuns sobre seu produto.",
        "Crie uma resposta clara para cada uma.",
        "Identifique quais gatilhos você já usa de forma honesta.",
        "Simplifique ao máximo o caminho até a decisão.",
      ],
      example: {
        title: "Exemplo prático: reciprocidade",
        body: "Uma nutricionista oferece gratuitamente um cardápio semanal em PDF. As pessoas experimentam, gostam do conteúdo e, quando precisam de acompanhamento, lembram dela primeiro.",
      },
      keyPoints: [
        "Prova social, autoridade e reciprocidade influenciam decisões.",
        "Escassez só deve ser usada quando for real.",
        "Remover dúvidas e barreiras é essencial.",
      ],
    },
    {
      id: "transmitir-confianca",
      title: "Como transmitir confiança",
      minutes: 8,
      summary:
        "Confiança se transmite com coerência entre o que você diz e o que faz, clareza e provas verificáveis.",
      sections: [
        {
          heading: "Sinais de confiança",
          body: [
            "Mostrar seu rosto e sua história, ter canais de contato visíveis, apresentar políticas claras (troca, garantia, privacidade), exibir avaliações reais, responder críticas com respeito e manter regularidade de presença.",
          ],
        },
        {
          heading: "Linguagem que transmite segurança",
          body: [
            "Use frases claras e específicas. Evite exageros como “o melhor do mundo” ou “resultado garantido”. Prefira “ajudou mais de 300 alunos a organizar a rotina” (se for verdade) a afirmações vagas.",
          ],
        },
      ],
      steps: [
        "Revise seu perfil ou página e procure informações faltando.",
        "Adicione forma de contato e horário de atendimento.",
        "Substitua frases exageradas por dados reais.",
        "Responda com educação a qualquer crítica pendente.",
      ],
      example: {
        title: "Exemplo prático: respondendo uma crítica",
        body: "Cliente: “Meu pedido atrasou.” Resposta: “Olá, Maria! Sentimos muito pelo atraso. Já verificamos e seu pedido chega amanhã. Vamos enviar o código de rastreio por mensagem.” Quem lê percebe responsabilidade.",
      },
      keyPoints: [
        "Coerência entre discurso e prática gera confiança.",
        "Prefira dados reais a exageros.",
        "Críticas bem respondidas aumentam a credibilidade.",
      ],
    },
    {
      id: "apresentar-beneficios",
      title: "Como apresentar benefícios",
      minutes: 9,
      summary:
        "Apresentar benefícios é traduzir o produto em ganhos concretos para a vida do cliente.",
      sections: [
        {
          heading: "A técnica do “o que significa para você”",
          body: [
            "Para cada característica, pergunte: “e o que isso significa para o cliente?”. Repita a pergunta até chegar ao ganho real. “Aula gravada” → “assiste quando quiser” → “aprende mesmo com rotina corrida”.",
          ],
        },
        {
          heading: "Benefícios tangíveis e emocionais",
          body: [
            "Tangíveis: economia de tempo, de dinheiro, praticidade. Emocionais: tranquilidade, confiança, orgulho, pertencimento. Uma boa apresentação combina os dois tipos, sempre sem prometer o que não pode ser garantido.",
          ],
        },
      ],
      steps: [
        "Liste 5 características do produto.",
        "Aplique a pergunta “o que isso significa para você?” duas vezes em cada uma.",
        "Separe benefícios tangíveis e emocionais.",
        "Escolha os 3 mais fortes para destacar.",
      ],
      example: {
        title: "Exemplo prático: aspirador robô",
        body: "Característica: programação automática. Benefício tangível: a casa limpa sem você precisar parar o que está fazendo. Benefício emocional: chegar do trabalho e encontrar tudo em ordem, com mais tempo para a família.",
      },
      keyPoints: [
        "Pergunte “o que isso significa para você?”.",
        "Combine benefícios tangíveis e emocionais.",
        "Destaque os benefícios mais relevantes para a persona.",
      ],
    },
    {
      id: "comunicacao-com-clientes",
      title: "Como se comunicar com clientes",
      minutes: 10,
      summary:
        "Boa comunicação é ouvir mais, perguntar melhor e responder com clareza e empatia.",
      sections: [
        {
          heading: "Escuta ativa",
          body: [
            "Antes de apresentar qualquer solução, entenda a situação da pessoa. Faça perguntas abertas: “O que você já tentou?”, “O que é mais importante para você nessa escolha?”. Repita com suas palavras o que entendeu para confirmar.",
          ],
        },
        {
          heading: "Respondendo objeções",
          body: [
            "Objeções são dúvidas, não ataques. “Está caro” pode significar “não entendi o valor”. Responda com informação, não com pressão. Se o produto não for adequado para aquela pessoa, diga com honestidade — isso preserva sua reputação.",
          ],
        },
      ],
      steps: [
        "Prepare 3 perguntas abertas para iniciar conversas.",
        "Liste as 3 objeções mais comuns que você recebe.",
        "Escreva respostas informativas e respeitosas para cada uma.",
        "Pratique uma conversa simulada com alguém.",
      ],
      example: {
        title: "Exemplo prático: objeção de preço",
        body: "Cliente: “Achei caro.” Resposta: “Entendo! Posso te mostrar o que está incluso? São 12 aulas, material de apoio e suporte por 3 meses. Se preferir começar pelo conteúdo gratuito, também tenho uma aula aberta.”",
      },
      keyPoints: [
        "Ouça e pergunte antes de oferecer.",
        "Objeções são dúvidas: responda com informação.",
        "Honestidade vale mais do que uma venda forçada.",
      ],
    },
    {
      id: "persuasao-etica",
      title: "Como utilizar técnicas de persuasão de maneira ética",
      minutes: 11,
      summary:
        "Persuasão ética ajuda a pessoa a tomar uma boa decisão. Manipulação tenta levá-la a uma decisão que não é boa para ela.",
      sections: [
        {
          heading: "A diferença entre persuadir e manipular",
          body: [
            "Persuasão ética usa informações verdadeiras, respeita o tempo da pessoa e só oferece algo que realmente pode ajudá-la. Manipulação usa mentiras, pressão excessiva, escassez falsa, medo exagerado ou depoimentos inventados.",
          ],
        },
        {
          heading: "Um teste simples",
          body: [
            "Pergunte-se: “Eu ficaria confortável se o cliente soubesse exatamente como e por que usei essa técnica?” e “Essa pessoa estará melhor depois dessa decisão?”. Se a resposta for não, não use. Além da ética, práticas enganosas podem violar o Código de Defesa do Consumidor.",
          ],
        },
      ],
      steps: [
        "Revise suas comunicações recentes.",
        "Marque qualquer prazo, escassez ou número que não seja real.",
        "Substitua por informações verdadeiras.",
        "Aplique o teste das duas perguntas antes de cada publicação.",
      ],
      example: {
        title: "Exemplo prático: escassez real x falsa",
        body: "Falsa: um cronômetro que reinicia toda vez que a página é aberta. Real: “A turma tem 20 vagas porque as aulas são ao vivo com correção individual.” A segunda é verdadeira e explica o motivo do limite.",
      },
      keyPoints: [
        "Persuasão ética informa; manipulação engana.",
        "Use apenas escassez, números e depoimentos reais.",
        "Práticas enganosas também podem ser ilegais.",
      ],
    },
  ],
  quiz: [
    {
      question: "Qual é a diferença entre necessidade e desejo?",
      options: [
        "Não há diferença",
        "Necessidade é o que se precisa; desejo é a forma específica de atender",
        "Desejo é sempre mais barato",
        "Necessidade só existe em produtos digitais",
      ],
      answer: 1,
      explanation: "A necessidade é básica; o desejo é a escolha específica para atendê-la.",
    },
    {
      question: "O que é prova social?",
      options: [
        "Uma prova escrita",
        "A tendência de confiar no que outras pessoas aprovam",
        "Um documento de identidade",
        "O número do telefone da empresa",
      ],
      answer: 1,
      explanation: "Avaliações e depoimentos reais são exemplos de prova social.",
    },
    {
      question: "Qual exemplo representa escassez ÉTICA?",
      options: [
        "Cronômetro falso que sempre reinicia",
        "“Últimas unidades” quando há estoque grande",
        "Turma limitada a 20 vagas por ter correção individual",
        "Inventar que o preço vai subir amanhã",
      ],
      answer: 2,
      explanation: "A limitação é real e tem um motivo verdadeiro.",
    },
    {
      question: "Quando um cliente diz “está caro”, o melhor é:",
      options: [
        "Ignorar a mensagem",
        "Pressionar com urgência",
        "Explicar o que está incluso e entender a necessidade dele",
        "Discutir com o cliente",
      ],
      answer: 2,
      explanation: "Objeções são dúvidas; informação e empatia são o melhor caminho.",
    },
    {
      question: "Qual pergunta ajuda a saber se a persuasão é ética?",
      options: [
        "“Vou vender mais rápido?”",
        "“A pessoa estará melhor depois dessa decisão?”",
        "“Meu concorrente faz isso?”",
        "“Alguém vai perceber?”",
      ],
      answer: 1,
      explanation: "Persuasão ética busca uma decisão boa para o cliente.",
    },
  ],
};
