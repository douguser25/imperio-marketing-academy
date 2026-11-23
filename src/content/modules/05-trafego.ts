import type { CourseModule } from "../types";

export const trafego: CourseModule = {
  id: "trafego-pago-e-organico",
  number: 5,
  title: "Tráfego Pago e Orgânico",
  tagline: "Entenda de onde vêm as visitas e como atraí-las.",
  description:
    "Aprenda o que é tráfego pago e orgânico, suas diferenças, como funcionam os anúncios, como criar estratégias de divulgação e como analisar os resultados.",
  icon: "traffic",
  lessons: [
    {
      id: "o-que-e-trafego-pago",
      title: "O que é tráfego pago?",
      minutes: 9,
      summary:
        "Tráfego pago são as visitas e visualizações que você consegue pagando para que plataformas exibam seu conteúdo como anúncio.",
      sections: [
        {
          heading: "Como funciona",
          body: [
            "Plataformas como Meta Ads (Facebook e Instagram), Google Ads, TikTok Ads e YouTube permitem que você pague para mostrar uma mensagem para um público escolhido. Você define quanto quer investir, por quanto tempo e para quem o anúncio aparece.",
            "O tráfego pago acelera o alcance, mas não substitui uma boa oferta. Anunciar algo confuso ou pouco confiável apenas faz mais pessoas verem algo que não funciona.",
          ],
        },
        {
          heading: "Formas de cobrança",
          body: [
            "CPM: custo por mil impressões (você paga a cada mil vezes que o anúncio aparece). CPC: custo por clique. CPA: custo por ação (cadastro, compra). A plataforma cobra conforme o objetivo escolhido e a concorrência pelo público.",
          ],
        },
      ],
      steps: [
        "Escolha uma plataforma de anúncios para estudar.",
        "Acesse a biblioteca de anúncios pública da plataforma (quando existir).",
        "Pesquise anúncios de marcas do seu nicho.",
        "Anote os formatos, textos e chamadas mais usados.",
      ],
      example: {
        title: "Exemplo prático: estúdio de pilates",
        body: "Um estúdio investe um pequeno valor diário em anúncios no Instagram para mulheres de 30 a 55 anos num raio de 5 km. O anúncio mostra uma aula experimental e um botão para enviar mensagem. O estúdio acompanha quantas mensagens recebe por real investido.",
      },
      keyPoints: [
        "Tráfego pago é alcance comprado em plataformas de anúncio.",
        "Formas de cobrança comuns: CPM, CPC e CPA.",
        "Anúncio acelera, mas não corrige uma oferta ruim.",
      ],
    },
    {
      id: "o-que-e-trafego-organico",
      title: "O que é tráfego orgânico?",
      minutes: 8,
      summary:
        "Tráfego orgânico são as visitas que chegam sem pagamento direto por anúncio: buscas, redes sociais, indicações e compartilhamentos.",
      sections: [
        {
          heading: "Fontes de tráfego orgânico",
          body: [
            "Buscadores (quando seu site ou vídeo aparece nos resultados sem ser anúncio), redes sociais (posts que alcançam pessoas naturalmente), indicações (boca a boca), grupos e comunidades, e e-mail para sua própria lista.",
          ],
        },
        {
          heading: "SEO: aparecer no Google",
          body: [
            "SEO é o conjunto de práticas para melhorar a posição de um site nos resultados de busca. Envolve escrever conteúdos que respondam bem às perguntas das pessoas, usar palavras-chave naturalmente, ter um site rápido e que funcione bem no celular, e conquistar menções de outros sites.",
            "O orgânico tem custo financeiro baixo, mas exige tempo e constância. Os resultados costumam crescer aos poucos.",
          ],
        },
      ],
      steps: [
        "Pesquise no Google uma dúvida do seu nicho.",
        "Observe quais páginas aparecem nos primeiros resultados.",
        "Anote o que elas têm em comum (títulos, tamanho, organização).",
        "Pense em como você responderia a mesma dúvida de forma ainda mais clara.",
      ],
      example: {
        title: "Exemplo prático: blog de jardinagem",
        body: "Um blog publica o artigo “Como cuidar de orquídea em apartamento: guia completo”. Meses depois, o artigo aparece nos primeiros resultados para essa busca e recebe visitas todos os dias sem custo com anúncios.",
      },
      keyPoints: [
        "Orgânico vem de buscas, redes, indicações e e-mail.",
        "SEO ajuda seu conteúdo a aparecer no Google.",
        "Custo baixo, mas resultados levam tempo.",
      ],
    },
    {
      id: "diferencas",
      title: "Quais são as diferenças?",
      minutes: 7,
      summary:
        "Pago é rápido e controlável, mas para quando o investimento para. Orgânico é mais lento, mas se acumula com o tempo.",
      sections: [
        {
          heading: "Comparação direta",
          body: [
            "Velocidade: o pago traz resultados em horas; o orgânico pode levar semanas ou meses. Custo: o pago exige investimento contínuo; o orgânico exige tempo e dedicação. Controle: no pago você escolhe exatamente o público; no orgânico, depende de algoritmos e buscas. Duração: o pago para quando você desliga; o orgânico pode continuar gerando visitas por muito tempo.",
          ],
        },
        {
          heading: "Usar os dois juntos",
          body: [
            "Muitas estratégias combinam os dois: o orgânico constrói autoridade e mostra o que o público gosta; o pago amplia o alcance dos conteúdos que já se mostraram bons. Para iniciantes, é recomendável aprender primeiro com o orgânico para entender o público antes de investir dinheiro.",
          ],
        },
      ],
      steps: [
        "Liste seus objetivos para os próximos 3 meses.",
        "Classifique cada um como urgente ou de longo prazo.",
        "Associe os urgentes ao tráfego pago e os de longo prazo ao orgânico.",
        "Defina um limite de investimento que não comprometa suas finanças.",
      ],
      example: {
        title: "Exemplo prático: impulsionar o que já funcionou",
        body: "Um criador percebe que um vídeo orgânico teve ótima retenção e muitos salvamentos. Em vez de criar um anúncio do zero, ele usa esse mesmo vídeo como anúncio, porque já sabe que o público gosta do conteúdo.",
      },
      keyPoints: [
        "Pago: rápido, controlável, contínuo.",
        "Orgânico: lento, acumulativo, de baixo custo.",
        "Combinar os dois costuma ser a melhor estratégia.",
      ],
    },
    {
      id: "como-funcionam-anuncios",
      title: "Como funcionam os anúncios",
      minutes: 12,
      summary:
        "Um anúncio é formado por objetivo, público, orçamento, criativo e destino. Entender cada parte evita desperdício.",
      sections: [
        {
          heading: "A estrutura de uma campanha",
          body: [
            "Campanha: define o objetivo (reconhecimento, tráfego, mensagens, cadastros, vendas). Conjunto de anúncios: define público, orçamento, posicionamentos e período. Anúncio: o criativo (imagem ou vídeo), o texto e o botão de chamada para ação.",
          ],
        },
        {
          heading: "Público e segmentação",
          body: [
            "Você pode segmentar por localização, idade, interesses e comportamentos, ou criar públicos a partir de pessoas que já interagiram com você (público de remarketing). Também existem públicos semelhantes, que buscam pessoas parecidas com seus melhores contatos.",
            "Sempre respeite as políticas das plataformas: anúncios com promessas enganosas, ganhos garantidos ou antes e depois exagerados podem ser reprovados e até bloquear sua conta.",
          ],
        },
      ],
      steps: [
        "Defina um objetivo único para a campanha.",
        "Descreva o público com base na sua persona.",
        "Defina um orçamento diário baixo para teste.",
        "Crie dois criativos diferentes para comparar.",
        "Escreva um texto claro com uma chamada para ação.",
        "Revise as políticas da plataforma antes de publicar.",
      ],
      example: {
        title: "Exemplo prático: teste A/B de criativos",
        body: "Uma escola de idiomas cria dois anúncios iguais, mudando só o vídeo: um com professor explicando e outro com depoimento de aluno. Após alguns dias, o depoimento gera mais mensagens pelo mesmo custo, então ele recebe o orçamento.",
      },
      keyPoints: [
        "Campanha (objetivo) → conjunto (público e orçamento) → anúncio (criativo).",
        "Segmentação e remarketing ajudam a falar com as pessoas certas.",
        "Respeite as políticas das plataformas.",
      ],
    },
    {
      id: "estrategias-de-divulgacao",
      title: "Como criar estratégias de divulgação",
      minutes: 10,
      summary:
        "Estratégia é um plano que liga objetivo, público, mensagem, canal, orçamento e prazo.",
      sections: [
        {
          heading: "Os componentes do plano",
          body: [
            "Objetivo (o que você quer alcançar, de forma mensurável). Público (quem você quer atingir). Mensagem (o que você vai dizer e qual benefício destacar). Canais (onde vai divulgar). Orçamento (tempo e dinheiro disponíveis). Prazo e indicadores (como vai saber se deu certo).",
          ],
        },
        {
          heading: "Estratégia por etapas do funil",
          body: [
            "Topo: conteúdos amplos para gerar conhecimento. Meio: conteúdos que aprofundam e geram contato (materiais gratuitos, lives). Fundo: ofertas claras e remarketing para quem já demonstrou interesse. Cada etapa tem um objetivo e uma métrica diferente.",
          ],
        },
      ],
      steps: [
        "Escreva um objetivo mensurável (ex.: 100 novos contatos em 30 dias).",
        "Defina a mensagem principal em uma frase.",
        "Escolha um canal orgânico e, se fizer sentido, um pago.",
        "Distribua conteúdos entre topo, meio e fundo.",
        "Marque uma data para revisar os resultados.",
      ],
      example: {
        title: "Exemplo prático: plano de um mês",
        body: "Objetivo: 150 inscritos numa aula gratuita de fotografia com celular. Semanas 1 e 2: vídeos com dicas rápidas (topo). Semana 3: convite para a aula gratuita (meio). Semana 4: anúncios de remarketing para quem assistiu aos vídeos. Revisão no dia 30.",
      },
      keyPoints: [
        "Estratégia liga objetivo, público, mensagem, canal, orçamento e prazo.",
        "Planeje conteúdos para cada etapa do funil.",
        "Defina metas mensuráveis e datas de revisão.",
      ],
    },
    {
      id: "analisar-resultados-trafego",
      title: "Como analisar resultados",
      minutes: 11,
      summary:
        "Analisar é comparar números com objetivos para decidir o que manter, ajustar ou pausar.",
      sections: [
        {
          heading: "Métricas essenciais",
          body: [
            "CTR (taxa de cliques): cliques ÷ impressões. Indica se o anúncio desperta interesse. CPC: quanto custa cada clique. Taxa de conversão: ações ÷ cliques. CPA: investimento ÷ ações. ROI: (retorno − investimento) ÷ investimento — mostra se o investimento compensou.",
          ],
        },
        {
          heading: "Como interpretar",
          body: [
            "CTR baixo sugere criativo ou público inadequado. CTR bom com conversão baixa indica problema na página ou na oferta. CPA alto pode exigir melhorar o funil inteiro. Evite decidir com poucos dados: espere um volume mínimo antes de concluir.",
          ],
        },
      ],
      steps: [
        "Abra os relatórios da sua campanha ou perfil.",
        "Calcule CTR, taxa de conversão e CPA.",
        "Compare com seu objetivo.",
        "Identifique a métrica mais fraca.",
        "Escolha uma ação de melhoria para essa métrica.",
      ],
      example: {
        title: "Exemplo prático: cálculo",
        body: "Um anúncio teve 10.000 impressões, 150 cliques e 6 cadastros com R$ 60 investidos. CTR = 1,5%. Taxa de conversão = 4%. CPA = R$ 10 por cadastro. Com esses números, dá para comparar com outros anúncios e decidir qual merece mais orçamento.",
      },
      keyPoints: [
        "CTR, CPC, conversão, CPA e ROI são as métricas base.",
        "Cada métrica fraca aponta para um ponto diferente do funil.",
        "Decida com dados suficientes, não com impressões iniciais.",
      ],
    },
  ],
  quiz: [
    {
      question: "O que significa CPC?",
      options: ["Custo por compra", "Custo por clique", "Custo por campanha", "Conteúdo por canal"],
      answer: 1,
      explanation: "CPC é o valor médio pago por cada clique no anúncio.",
    },
    {
      question: "Qual é uma característica do tráfego orgânico?",
      options: [
        "Para imediatamente quando você para de pagar",
        "Costuma crescer aos poucos e se acumular com o tempo",
        "Sempre traz resultados em horas",
        "Exige pagar por mil impressões",
      ],
      answer: 1,
      explanation: "O orgânico é mais lento, mas tende a se acumular com conteúdo consistente.",
    },
    {
      question: "Um anúncio tem 200 cliques em 10.000 impressões. Qual é o CTR?",
      options: ["0,2%", "2%", "20%", "50%"],
      answer: 1,
      explanation: "CTR = 200 ÷ 10.000 = 0,02 = 2%.",
    },
    {
      question: "CTR alto e conversão muito baixa geralmente indicam problema em:",
      options: [
        "Na página de destino ou na oferta",
        "No nome da campanha",
        "Na cor do logotipo",
        "Na quantidade de seguidores",
      ],
      answer: 0,
      explanation: "As pessoas clicam, mas não agem: a página ou a oferta precisa melhorar.",
    },
    {
      question: "Qual anúncio provavelmente será reprovado pelas plataformas?",
      options: [
        "Um que apresenta uma aula gratuita",
        "Um que promete ganhos financeiros garantidos",
        "Um que mostra um depoimento real",
        "Um que tem um botão “Saiba mais”",
      ],
      answer: 1,
      explanation: "Promessas de ganho garantido violam políticas e enganam o público.",
    },
  ],
};
