import type { CourseModule } from "../types";

export const gestao: CourseModule = {
  id: "gestao-e-estrategias",
  number: 8,
  title: "Gestão e Estratégias",
  tagline: "Organize, meça e planeje o crescimento com segurança.",
  description:
    "Aprenda a organizar um negócio digital, calcular custos e lucros, analisar resultados, identificar erros, desenvolver estratégias melhores e planejar o crescimento.",
  icon: "chart",
  lessons: [
    {
      id: "organizar-negocio-digital",
      title: "Como organizar um negócio digital",
      minutes: 10,
      summary:
        "Organização é ter rotina, processos claros, ferramentas simples e separação entre finanças pessoais e do negócio.",
      sections: [
        {
          heading: "Rotina e processos",
          body: [
            "Defina blocos fixos na semana para cada tipo de tarefa: planejamento, produção de conteúdo, atendimento, análise e estudo. Documente como você faz as tarefas repetitivas (um checklist simples) — isso evita esquecimentos e facilita delegar no futuro.",
          ],
        },
        {
          heading: "Formalização e finanças",
          body: [
            "Separe uma conta bancária para o negócio, registre todas as entradas e saídas e informe-se sobre a formalização adequada à sua atividade (no Brasil, muitos começam como MEI, quando a atividade é permitida). Consulte um contador em caso de dúvida.",
          ],
        },
      ],
      steps: [
        "Monte um calendário semanal com blocos de tarefas.",
        "Crie checklists para as 3 tarefas mais repetidas.",
        "Separe uma conta para o negócio.",
        "Crie uma planilha de entradas e saídas.",
        "Pesquise a formalização adequada à sua atividade.",
      ],
      example: {
        title: "Exemplo prático: semana organizada",
        body: "Segunda: planejamento e roteiros. Terça e quarta: gravação e edição. Quinta: publicações e atendimento. Sexta: análise de números e estudo. Com essa divisão, Renato deixou de trabalhar de forma desorganizada e passou a produzir com mais regularidade.",
      },
      keyPoints: [
        "Rotina com blocos de tarefas aumenta a produtividade.",
        "Checklists padronizam processos.",
        "Separe finanças pessoais e do negócio.",
      ],
    },
    {
      id: "custos-e-lucros",
      title: "Como calcular custos e lucros",
      minutes: 12,
      summary:
        "Lucro é o que sobra depois de pagar todos os custos. Sem esse cálculo, é impossível saber se o negócio é sustentável.",
      sections: [
        {
          heading: "Tipos de custo",
          body: [
            "Custos fixos: não mudam com o volume de vendas (assinaturas de ferramentas, internet, contador). Custos variáveis: mudam conforme as vendas (taxas da plataforma, impostos, frete, investimento em anúncios por venda).",
          ],
        },
        {
          heading: "Fórmulas básicas",
          body: [
            "Faturamento = preço × quantidade vendida. Lucro = faturamento − custos fixos − custos variáveis. Margem de lucro = lucro ÷ faturamento × 100. Ponto de equilíbrio = quantidade mínima de vendas para cobrir os custos fixos.",
            "Os números dos exemplos são ilustrativos, para praticar o cálculo — não representam resultados esperados.",
          ],
        },
      ],
      steps: [
        "Liste todos os seus custos fixos mensais.",
        "Liste os custos variáveis por venda.",
        "Calcule o lucro por unidade (preço − custos variáveis).",
        "Divida os custos fixos pelo lucro por unidade para achar o ponto de equilíbrio.",
        "Revise esses números todo mês.",
      ],
      example: {
        title: "Exemplo prático: cálculo ilustrativo",
        body: "Produto a R$ 100. Custos variáveis por venda: R$ 35 (taxas, impostos, anúncio). Lucro por unidade: R$ 65. Custos fixos: R$ 260/mês. Ponto de equilíbrio: 260 ÷ 65 = 4 vendas. A partir da 5ª venda no mês, o negócio começa a ter lucro.",
      },
      keyPoints: [
        "Custos fixos e variáveis precisam ser registrados.",
        "Lucro = faturamento − todos os custos.",
        "O ponto de equilíbrio mostra o mínimo necessário.",
      ],
    },
    {
      id: "analisar-resultados-negocio",
      title: "Como analisar resultados",
      minutes: 10,
      summary:
        "Analisar resultados é acompanhar indicadores-chave regularmente e transformar números em decisões.",
      sections: [
        {
          heading: "Indicadores-chave (KPIs)",
          body: [
            "Escolha poucos indicadores que realmente importam para seu objetivo: alcance, novos contatos, taxa de conversão, faturamento, lucro, custo por cliente e satisfação. Acompanhar dezenas de números ao mesmo tempo confunde mais do que ajuda.",
          ],
        },
        {
          heading: "Painel simples",
          body: [
            "Uma planilha com uma linha por semana e uma coluna por indicador já funciona como painel. Gráficos simples ajudam a ver tendências: o número está subindo, caindo ou parado?",
          ],
        },
      ],
      steps: [
        "Escolha de 3 a 5 indicadores-chave.",
        "Crie uma planilha com uma linha por semana.",
        "Preencha os números toda sexta-feira.",
        "Crie um gráfico para cada indicador.",
        "Escreva uma conclusão e uma ação por semana.",
      ],
      example: {
        title: "Exemplo prático: leitura de tendência",
        body: "Em quatro semanas, o alcance cresceu, mas os novos contatos ficaram iguais. Conclusão: o conteúdo atrai, mas a chamada para ação está fraca. Ação: incluir um convite claro para o material gratuito ao final de cada vídeo.",
      },
      keyPoints: [
        "Acompanhe poucos indicadores relevantes.",
        "Uma planilha semanal já é um painel eficaz.",
        "Todo número deve gerar uma conclusão e uma ação.",
      ],
    },
    {
      id: "identificar-erros",
      title: "Como identificar erros",
      minutes: 9,
      summary:
        "Erros fazem parte do processo. O importante é identificá-los cedo, entender a causa e corrigir.",
      sections: [
        {
          heading: "Erros comuns de iniciantes",
          body: [
            "Falar com todo mundo (sem público definido), mudar de estratégia toda semana, investir em anúncios sem testar a oferta, não medir resultados, copiar concorrentes sem adaptar, negligenciar o atendimento e não controlar as finanças.",
          ],
        },
        {
          heading: "Técnica dos 5 porquês",
          body: [
            "Diante de um problema, pergunte “por quê?” cinco vezes seguidas para chegar à causa raiz. Exemplo: poucas vendas → poucas pessoas chegam à oferta → o link não aparece nos vídeos → não havia chamada para ação → não existia um roteiro padrão. Causa raiz: falta de roteiro.",
          ],
        },
      ],
      steps: [
        "Escolha um resultado abaixo do esperado.",
        "Aplique a técnica dos 5 porquês.",
        "Identifique a causa raiz.",
        "Defina uma correção simples.",
        "Acompanhe se o resultado melhora nas semanas seguintes.",
      ],
      example: {
        title: "Exemplo prático: muitos seguidores, poucos contatos",
        body: "Lívia percebeu que ganhou seguidores com vídeos de humor sem relação com seu serviço de consultoria. A causa raiz era conteúdo desalinhado com o público-alvo. Ela passou a fazer humor dentro do seu tema, atraindo pessoas realmente interessadas.",
      },
      keyPoints: [
        "Errar é normal; o problema é não perceber.",
        "Os 5 porquês levam à causa raiz.",
        "Corrija uma coisa por vez e acompanhe.",
      ],
    },
    {
      id: "estrategias-melhores",
      title: "Como desenvolver estratégias melhores",
      minutes: 10,
      summary:
        "Estratégias melhoram com ciclos de planejar, executar, medir e ajustar — o chamado ciclo PDCA.",
      sections: [
        {
          heading: "O ciclo PDCA",
          body: [
            "Planejar (Plan): defina objetivo e ações. Executar (Do): coloque em prática. Checar (Check): compare resultados com o objetivo. Agir (Act): mantenha o que funcionou e ajuste o que não funcionou. Depois, recomece o ciclo com mais conhecimento.",
          ],
        },
        {
          heading: "Análise SWOT",
          body: [
            "Uma ferramenta simples para pensar estrategicamente: Forças (o que você faz bem), Fraquezas (o que precisa melhorar), Oportunidades (tendências e espaços no mercado) e Ameaças (concorrência, mudanças nas plataformas). Ela ajuda a escolher onde focar.",
          ],
        },
      ],
      steps: [
        "Faça uma análise SWOT do seu projeto.",
        "Escolha uma força para explorar e uma fraqueza para corrigir.",
        "Planeje um ciclo PDCA de 30 dias.",
        "Ao final, registre o que aprendeu.",
      ],
      example: {
        title: "Exemplo prático: SWOT de um criador",
        body: "Forças: boa didática. Fraquezas: pouca regularidade. Oportunidades: aumento da procura por cursos curtos. Ameaças: muitos criadores no mesmo tema. Estratégia: publicar tutoriais curtos três vezes por semana, destacando a didática como diferencial.",
      },
      keyPoints: [
        "PDCA: planejar, executar, checar, agir.",
        "SWOT ajuda a definir foco estratégico.",
        "Cada ciclo gera aprendizado para o próximo.",
      ],
    },
    {
      id: "planejar-crescimento",
      title: "Como planejar o crescimento de um negócio",
      minutes: 11,
      summary:
        "Crescer com segurança é aumentar o que já funciona, de forma gradual, sem comprometer a qualidade nem as finanças.",
      sections: [
        {
          heading: "Metas SMART",
          body: [
            "Metas devem ser Específicas, Mensuráveis, Atingíveis, Relevantes e Temporais. Em vez de “quero crescer”, use “aumentar a lista de e-mails de 200 para 500 contatos até o fim do trimestre”.",
          ],
        },
        {
          heading: "Caminhos de crescimento",
          body: [
            "Aumentar a frequência dos conteúdos que funcionam, entrar em um novo canal, criar parcerias, melhorar o atendimento para gerar indicações, automatizar tarefas repetitivas e, quando fizer sentido, delegar. Crescimento sustentável é gradual e baseado em dados.",
            "Reserve parte dos recursos para imprevistos e nunca invista dinheiro que comprometa suas necessidades básicas.",
          ],
        },
      ],
      steps: [
        "Escreva uma meta SMART para os próximos 90 dias.",
        "Liste o que já funciona e pode ser ampliado.",
        "Escolha um caminho de crescimento.",
        "Divida a meta em metas mensais.",
        "Defina uma reserva para imprevistos.",
      ],
      example: {
        title: "Exemplo prático: plano de 90 dias",
        body: "Meta: dobrar os inscritos na newsletter em 90 dias. Mês 1: melhorar o material gratuito. Mês 2: incluir convite em todos os vídeos. Mês 3: fazer duas parcerias com perfis do mesmo nicho. Revisão quinzenal dos números.",
      },
      keyPoints: [
        "Use metas SMART.",
        "Amplie o que já funciona antes de inventar algo novo.",
        "Cresça de forma gradual e financeiramente segura.",
      ],
    },
  ],
  quiz: [
    {
      question: "Qual é um custo VARIÁVEL?",
      options: [
        "Assinatura mensal de uma ferramenta",
        "Taxa da plataforma cobrada a cada venda",
        "Mensalidade do contador",
        "Plano de internet",
      ],
      answer: 1,
      explanation: "A taxa por venda muda conforme o volume de vendas.",
    },
    {
      question: "Produto de R$ 50, custo variável de R$ 20 e custos fixos de R$ 300. Qual o ponto de equilíbrio?",
      options: ["6 vendas", "10 vendas", "15 vendas", "30 vendas"],
      answer: 1,
      explanation: "Lucro por unidade = R$ 30. 300 ÷ 30 = 10 vendas.",
    },
    {
      question: "O que significa o “C” do ciclo PDCA?",
      options: ["Comprar", "Checar", "Copiar", "Cancelar"],
      answer: 1,
      explanation: "Check: comparar os resultados com o objetivo planejado.",
    },
    {
      question: "Qual meta é SMART?",
      options: [
        "Quero crescer muito",
        "Ficar famoso",
        "Aumentar a lista de e-mails de 200 para 500 até o fim do trimestre",
        "Vender mais algum dia",
      ],
      answer: 2,
      explanation: "É específica, mensurável, atingível, relevante e tem prazo.",
    },
    {
      question: "Para que serve a técnica dos 5 porquês?",
      options: [
        "Para escrever títulos",
        "Para encontrar a causa raiz de um problema",
        "Para calcular impostos",
        "Para escolher cores",
      ],
      answer: 1,
      explanation: "Perguntar “por quê?” repetidamente revela a origem do problema.",
    },
  ],
};
