import type { CourseModule } from "../types";

export const redesSociais: CourseModule = {
  id: "redes-sociais-e-divulgacao",
  number: 4,
  title: "Redes Sociais e Divulgação",
  tagline: "Instagram, TikTok e Facebook trabalhando a seu favor.",
  description:
    "Aprenda a usar as principais redes sociais, divulgar produtos, criar vídeos, conseguir alcance orgânico, atrair seguidores interessados e construir uma audiência.",
  icon: "share",
  lessons: [
    {
      id: "instagram-tiktok-facebook",
      title: "Como utilizar Instagram, TikTok e Facebook",
      minutes: 12,
      summary:
        "Cada rede tem um público, um formato e uma linguagem. Entender essas diferenças evita esforço desperdiçado.",
      sections: [
        {
          heading: "Instagram",
          body: [
            "Focado em imagem e vídeo curto. Formatos: feed (posts e carrosséis), Reels (vídeos curtos com grande potencial de alcance), Stories (conteúdo de 24 horas, ótimo para bastidores e relacionamento) e Direct (mensagens). Bio clara e destaques organizados ajudam o visitante a entender seu perfil em segundos.",
          ],
        },
        {
          heading: "TikTok",
          body: [
            "Baseado em vídeos curtos e em um algoritmo que mostra conteúdos para pessoas que ainda não seguem você. Isso facilita o alcance para iniciantes. Funciona bem com conteúdo autêntico, tendências, humor, tutoriais rápidos e histórias.",
          ],
        },
        {
          heading: "Facebook",
          body: [
            "Público com faixa etária mais ampla. Grupos e comunidades são muito fortes, assim como o Marketplace para negócios locais. Páginas permitem publicar conteúdo e são a base para anúncios no ecossistema da Meta (Facebook e Instagram).",
          ],
        },
      ],
      steps: [
        "Crie ou revise seu perfil na rede escolhida.",
        "Use uma foto clara e um nome fácil de encontrar.",
        "Escreva uma bio dizendo quem você ajuda e como.",
        "Configure o perfil como profissional/comercial para ver estatísticas.",
        "Publique três conteúdos de apresentação.",
      ],
      example: {
        title: "Exemplo prático: bio que funciona",
        body: "Bio fraca: “Amo a vida ✨”. Bio forte: “Ensino receitas saudáveis em até 15 minutos 🥗 | Novos vídeos toda terça e sexta | Receitas grátis no link”. Quem chega entende imediatamente o que vai encontrar.",
      },
      keyPoints: [
        "Instagram: visual, Reels, Stories e Direct.",
        "TikTok: vídeos curtos com alcance para não seguidores.",
        "Facebook: grupos, comunidades e base para anúncios.",
      ],
    },
    {
      id: "divulgar-nas-redes",
      title: "Como divulgar produtos nas redes sociais",
      minutes: 10,
      summary:
        "A divulgação eficiente equilibra conteúdo de valor e conteúdo de oferta, sem transformar o perfil em vitrine.",
      sections: [
        {
          heading: "A regra do equilíbrio",
          body: [
            "Uma referência comum é que a maior parte do conteúdo eduque, entretenha ou inspire, e uma parte menor apresente ofertas. Quando o perfil só tem propaganda, as pessoas perdem o interesse. Quando há valor constante, a oferta é recebida com naturalidade.",
          ],
        },
        {
          heading: "Formatos de divulgação",
          body: [
            "Demonstração do produto em uso, bastidores, perguntas e respostas, depoimentos reais, antes e depois (quando verdadeiro), Stories com enquetes e caixas de perguntas, e lives explicando o produto.",
          ],
        },
      ],
      steps: [
        "Monte um calendário semanal com 5 conteúdos.",
        "Faça 4 deles focados em valor (dicas, tutoriais, histórias).",
        "Faça 1 focado na oferta, mostrando o produto em uso.",
        "Use Stories para responder dúvidas sobre o produto.",
        "Avalie as reações no fim da semana.",
      ],
      example: {
        title: "Exemplo prático: semana de uma loja de plantas",
        body: "Segunda: dica de rega. Terça: plantas para apartamento. Quarta: bastidores da estufa. Quinta: erro comum que mata suculentas. Sexta: vídeo apresentando o kit de suculentas com informações de entrega.",
      },
      keyPoints: [
        "Mais valor, menos propaganda.",
        "Mostre o produto em uso e responda dúvidas.",
        "Planeje a semana com antecedência.",
      ],
    },
    {
      id: "videos-de-divulgacao",
      title: "Como criar vídeos de divulgação",
      minutes: 11,
      summary:
        "Bons vídeos curtos têm gancho forte, conteúdo direto e uma chamada para ação clara.",
      sections: [
        {
          heading: "Estrutura de um vídeo curto",
          body: [
            "Gancho (0–3 segundos): uma frase ou imagem que prende a atenção (“Você está guardando o tomate do jeito errado”). Desenvolvimento: entregue o que prometeu, de forma rápida e visual. Chamada para ação: diga o que a pessoa deve fazer (salvar, comentar, seguir, acessar o link).",
          ],
        },
        {
          heading: "Gravação com celular",
          body: [
            "Grave na vertical, com luz natural de frente para você (perto de uma janela). Limpe a lente da câmera. Use um ambiente silencioso ou um microfone simples. Legendas aumentam a compreensão, pois muitas pessoas assistem sem som.",
          ],
        },
      ],
      steps: [
        "Escreva o gancho em uma frase.",
        "Liste 3 pontos principais do conteúdo.",
        "Defina a chamada para ação.",
        "Grave na vertical com boa iluminação.",
        "Edite cortando pausas e adicione legendas.",
      ],
      example: {
        title: "Exemplo prático: roteiro de 30 segundos",
        body: "Gancho: “Seu celular descarrega rápido? Faça isso.” Conteúdo: três ajustes de configuração mostrados na tela. Chamada: “Salve para não esquecer e siga para mais dicas.”",
      },
      keyPoints: [
        "Os primeiros 3 segundos definem se a pessoa continua assistindo.",
        "Grave na vertical, com boa luz e áudio limpo.",
        "Termine com uma chamada para ação clara.",
      ],
    },
    {
      id: "alcance-organico",
      title: "Como conseguir alcance organicamente",
      minutes: 10,
      summary:
        "Alcance orgânico vem de conteúdo que as pessoas assistem até o fim, salvam, compartilham e comentam.",
      sections: [
        {
          heading: "Como os algoritmos decidem",
          body: [
            "As redes querem manter as pessoas usando o aplicativo. Por isso, mostram mais os conteúdos que geram tempo de visualização, salvamentos, compartilhamentos e comentários. Não existe truque secreto: o caminho é criar algo que valha a pena ver.",
          ],
        },
        {
          heading: "Práticas que ajudam",
          body: [
            "Publique com frequência regular. Use palavras-chave na legenda (as redes também funcionam como buscadores). Aproveite tendências quando fizerem sentido para seu nicho. Responda comentários rapidamente. Faça colaborações com perfis do mesmo nicho.",
          ],
        },
      ],
      steps: [
        "Veja quais dos seus conteúdos tiveram mais salvamentos.",
        "Identifique o tema e o formato em comum.",
        "Crie três novos conteúdos seguindo esse padrão.",
        "Inclua palavras-chave na legenda.",
        "Responda todos os comentários nas primeiras horas.",
      ],
      example: {
        title: "Exemplo prático: palavra-chave na legenda",
        body: "Em vez de “Olha que delícia!”, a legenda diz “Receita de bolo de banana sem açúcar e sem farinha, pronta em 30 minutos”. Quem pesquisa “bolo de banana sem açúcar” dentro da rede pode encontrar o vídeo.",
      },
      keyPoints: [
        "Retenção, salvamentos e compartilhamentos impulsionam o alcance.",
        "Use palavras-chave nas legendas.",
        "Consistência e interação com o público fazem diferença.",
      ],
    },
    {
      id: "seguidores-interessados",
      title: "Como conquistar seguidores interessados",
      minutes: 9,
      summary:
        "Seguidores interessados valem mais do que muitos seguidores. Foque em atrair pessoas que se identificam com seu tema.",
      sections: [
        {
          heading: "Qualidade acima de quantidade",
          body: [
            "Comprar seguidores ou usar truques como “siga para seguir” cria números vazios: pessoas que não interagem e não se interessam pelo que você oferece. Isso ainda prejudica o alcance, pois o algoritmo percebe pouca interação.",
          ],
        },
        {
          heading: "Como atrair as pessoas certas",
          body: [
            "Fale sempre sobre o mesmo grupo de temas. Resolva problemas específicos da sua persona. Mostre sua personalidade e sua história. Participe de conversas em perfis do seu nicho com comentários úteis.",
          ],
        },
      ],
      steps: [
        "Defina 3 temas fixos para seu perfil.",
        "Crie uma série de conteúdos com um nome (ex.: “Dica de segunda”).",
        "Comente de forma útil em 5 perfis do nicho por dia.",
        "Convide quem interage a acompanhar a série.",
      ],
      example: {
        title: "Exemplo prático: série temática",
        body: "Um perfil de finanças pessoais cria a série “Economia de 1 minuto”, com vídeos semanais. As pessoas passam a seguir para não perder o próximo episódio, e os seguidores novos são realmente interessados no tema.",
      },
      keyPoints: [
        "Nunca compre seguidores.",
        "Temas consistentes atraem o público certo.",
        "Séries de conteúdo criam hábito e expectativa.",
      ],
    },
    {
      id: "criar-audiencia",
      title: "Como criar uma audiência",
      minutes: 10,
      summary:
        "Audiência é um grupo de pessoas que confia em você e acompanha seu conteúdo com frequência. Ela é construída com relacionamento.",
      sections: [
        {
          heading: "De seguidores a comunidade",
          body: [
            "Seguidores olham; comunidade participa. Para chegar lá, converse com as pessoas: responda mensagens, faça perguntas, use as respostas para criar novos conteúdos e mostre que você ouve o público.",
          ],
        },
        {
          heading: "Canais próprios",
          body: [
            "Redes sociais podem mudar regras a qualquer momento. Por isso, é inteligente levar parte da audiência para canais que você controla, como lista de e-mails ou grupo de mensagens, sempre com consentimento e oferecendo algo útil (um guia gratuito, por exemplo).",
          ],
        },
      ],
      steps: [
        "Faça uma caixa de perguntas nos Stories.",
        "Transforme as melhores perguntas em conteúdos.",
        "Cite (com autorização) quem enviou a pergunta.",
        "Crie um material gratuito útil para seu público.",
        "Ofereça esse material em troca do e-mail, com consentimento.",
      ],
      example: {
        title: "Exemplo prático: comunidade de corredores",
        body: "Um perfil de corrida cria um desafio de 21 dias. Os participantes postam seus treinos e marcam o perfil. Ao final, quem participou se sente parte de um grupo e continua acompanhando os conteúdos.",
      },
      keyPoints: [
        "Audiência nasce de relacionamento e escuta.",
        "Use as dúvidas do público como pauta.",
        "Tenha canais próprios, como lista de e-mails.",
      ],
    },
  ],
  quiz: [
    {
      question: "Qual rede costuma mostrar vídeos para quem ainda não segue o perfil, facilitando o alcance de iniciantes?",
      options: ["E-mail", "TikTok", "Site institucional", "SMS"],
      answer: 1,
      explanation: "O algoritmo do TikTok distribui conteúdos para pessoas que ainda não seguem o criador.",
    },
    {
      question: "O que é o “gancho” de um vídeo?",
      options: [
        "A música de fundo",
        "Os primeiros segundos que prendem a atenção",
        "O link na bio",
        "O nome do perfil",
      ],
      answer: 1,
      explanation: "O gancho é o início que faz a pessoa continuar assistindo.",
    },
    {
      question: "Qual prática PREJUDICA o perfil?",
      options: [
        "Responder comentários",
        "Usar palavras-chave na legenda",
        "Comprar seguidores",
        "Publicar com regularidade",
      ],
      answer: 2,
      explanation: "Seguidores comprados não interagem e reduzem o alcance real.",
    },
    {
      question: "Qual sinal ajuda um conteúdo a ter mais alcance orgânico?",
      options: [
        "Muitas hashtags sem relação",
        "Salvamentos e compartilhamentos",
        "Postar só uma vez por ano",
        "Legendas vazias",
      ],
      answer: 1,
      explanation: "Salvamentos, compartilhamentos e tempo de visualização mostram que o conteúdo tem valor.",
    },
    {
      question: "Por que ter canais próprios, como lista de e-mails?",
      options: [
        "Porque redes sociais são proibidas",
        "Para não depender totalmente das regras das redes",
        "Para enviar spam",
        "Porque e-mail é mais bonito",
      ],
      answer: 1,
      explanation: "Canais próprios dão mais controle sobre o contato com a audiência.",
    },
  ],
};
