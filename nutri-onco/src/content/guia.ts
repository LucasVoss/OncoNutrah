// Conteúdo educativo do site. Orientações gerais, de baixo risco, que não substituem
// a conduta da equipe. Revise com a nutricionista responsável antes de publicar.

export const primeirosPassos = [
  {
    n: "01",
    title: "Fale com a sua equipe",
    text: "Peça para incluir uma nutricionista no seu acompanhamento. Cada tipo de câncer e de tratamento muda o que o corpo precisa, e o plano deve ser feito para você.",
  },
  {
    n: "02",
    title: "Observe e anote",
    text: "Peso uma vez por semana, o que você conseguiu comer e como se sentiu. Essas anotações ajudam a equipe a agir cedo, antes que um sintoma vire perda de peso.",
  },
  {
    n: "03",
    title: "Ajuste aos poucos",
    text: "Não é hora de dieta da internet nem de cortar grupos de alimentos por conta própria. Pequenas mudanças, feitas com orientação, sustentam você durante o tratamento.",
  },
];

// Mensagem para quem recebeu uma estimativa de tempo de vida. Fala de possibilidade,
// não de promessa: estimativas são médias e a nutrição é parte do cuidado, não cura.
export const esperanca = {
  label: "Recebeu uma estimativa de tempo de vida?",
  title: "Saiba que você pode ampliar suas expectativas.",
  text: "Uma estimativa é uma média, não uma sentença. Uma alimentação saudável e bem orientada ajuda o corpo a responder melhor ao tratamento, a preservar força e peso e a viver os dias com mais qualidade. Para muitas famílias, isso também significa mais tempo juntos.",
  cta: "Conheça a história por trás da OncoNutrah",
};

export type Sintoma = {
  id: string;
  name: string;
  short: string;
  intro: string;
  dicas: string[];
  alerta: string[];
  color: "leaf" | "tomato" | "cabbage" | "grain";
};

export const sintomas: Sintoma[] = [
  {
    id: "nausea",
    name: "Náusea e vômitos",
    short: "Enjoo",
    intro:
      "Um dos efeitos mais comuns da quimioterapia e de alguns tipos de radioterapia. Costuma ser controlável com medicação e ajustes nas refeições.",
    dicas: [
      "Faça refeições pequenas a cada 2 ou 3 horas: o estômago vazio também piora o enjoo.",
      "Prefira alimentos frios ou em temperatura ambiente, que têm menos cheiro, e secos, como torradas e biscoito de água e sal.",
      "Evite frituras, preparações muito gordurosas, muito doces ou muito temperadas.",
      "Beba líquidos em pequenos goles entre as refeições, não junto com elas.",
      "Fique sentado ou recostado por cerca de 30 minutos depois de comer.",
      "Tome o remédio para enjoo nos horários indicados, não só quando o enjoo já começou.",
    ],
    alerta: [
      "Vômitos que duram mais de 24 horas",
      "Não conseguir manter nem líquidos no estômago",
      "Sinais de desidratação: urina escura ou pouca, tontura, boca muito seca",
    ],
    color: "leaf",
  },
  {
    id: "apetite",
    name: "Falta de apetite",
    short: "Apetite",
    intro:
      "A doença, o tratamento, a dor e o próprio impacto emocional podem tirar a fome. O objetivo passa a ser comer o suficiente mesmo sem vontade.",
    dicas: [
      "Coma em horários marcados, sem esperar a fome aparecer.",
      "Comece o prato pela proteína: ovo, frango, peixe, feijão, iogurte.",
      "Deixe cada garfada mais nutritiva: um fio de azeite, abacate, pasta de amendoim, leite em pó no mingau.",
      "Deixe lanches fáceis à mão: iogurte, frutas, castanhas, queijo, vitaminas.",
      "Aproveite os momentos em que se sente melhor, muitas vezes de manhã, para a refeição maior.",
    ],
    alerta: [
      "Perda de peso sem querer, mesmo que pareça pequena",
      "Roupas ficando largas ou perda de força perceptível",
      "Passar um dia inteiro comendo muito pouco",
    ],
    color: "grain",
  },
  {
    id: "paladar",
    name: "Alteração do paladar",
    short: "Paladar",
    intro:
      "Gosto metálico, comida sem sabor ou enjoo de alimentos que antes você gostava. Geralmente melhora semanas depois do fim do tratamento.",
    dicas: [
      "Se o gosto for metálico, use talheres de plástico ou bambu.",
      "Tempere com ervas, alho, cebola, limão e gengibre, desde que não haja feridas na boca.",
      "Se a carne vermelha ficou com gosto ruim, troque por frango, ovos, peixe, laticínios ou leguminosas.",
      "Marinadas suaves (ervas, azeite, limão) ajudam a melhorar o sabor das carnes.",
      "Escove os dentes e faça bochechos antes das refeições para limpar o paladar.",
    ],
    alerta: [
      "A alteração está fazendo você deixar de comer",
      "Aparecem placas brancas ou feridas na boca",
    ],
    color: "cabbage",
  },
  {
    id: "mucosite",
    name: "Feridas na boca (mucosite)",
    short: "Mucosite",
    intro:
      "Inflamação dolorida na boca e na garganta, comum em algumas quimioterapias e na radioterapia de cabeça e pescoço.",
    dicas: [
      "Prefira texturas macias e úmidas: purês, sopas mornas, ovos mexidos, mingau, vitaminas.",
      "Evite alimentos ácidos (laranja, abacaxi, tomate), picantes, muito salgados e crocantes.",
      "Coma morno ou frio. Uma fruta não ácida gelada pode aliviar.",
      "Use canudo para levar o líquido direto para o fundo da boca.",
      "Escove com escova macia e evite enxaguantes com álcool.",
    ],
    alerta: [
      "Dor que impede comer ou beber",
      "Placas brancas, sangramento ou febre",
    ],
    color: "tomato",
  },
  {
    id: "diarreia",
    name: "Diarreia",
    short: "Diarreia",
    intro:
      "Pode ser causada por quimioterapia, imunoterapia, radioterapia na região abdominal ou infecções. A prioridade é a hidratação.",
    dicas: [
      "Beba líquidos ao longo do dia em pequenos goles: água, água de coco, soro de reidratação oral.",
      "Prefira alimentos que ajudam a firmar as fezes: frutas cozidas e não ácidas (como maçã e pera), arroz e batata.",
      "Reduza gorduras, frituras, café, álcool e adoçantes como sorbitol.",
      "Evite leite e derivados, inclusive os zero lactose, que continuam tendo caseína (proteína do leite). Prefira bebidas vegetais, como as de amêndoas ou de aveia.",
      "Faça refeições pequenas e frequentes.",
    ],
    alerta: [
      "4 ou mais evacuações por dia além do seu normal",
      "Sangue nas fezes, febre ou cólicas fortes",
      "Sinais de desidratação",
    ],
    color: "leaf",
  },
  {
    id: "constipacao",
    name: "Intestino preso",
    short: "Constipação",
    intro:
      "Frequente com remédios para dor e para enjoo, além da menor atividade física e de comer pouco.",
    dicas: [
      "Beba água ao longo de todo o dia.",
      "Aumente as fibras aos poucos, se a equipe liberar: frutas com casca, verduras, aveia, feijões, sementes.",
      "Ameixa, mamão e laranja com bagaço costumam ajudar.",
      "Caminhadas leves estimulam o intestino, dentro do que for liberado para você.",
      "Tente ir ao banheiro em horários regulares, como depois do café da manhã.",
    ],
    alerta: [
      "Mais de 3 dias sem evacuar",
      "Barriga muito distendida, dor forte ou vômitos",
    ],
    color: "grain",
  },
  {
    id: "fadiga",
    name: "Cansaço (fadiga)",
    short: "Fadiga",
    intro:
      "O cansaço do tratamento não passa só com descanso. Comer bem, se hidratar e se movimentar com orientação fazem diferença.",
    dicas: [
      "Nos dias bons, cozinhe porções extras e congele para os dias difíceis.",
      "Tenha refeições prontas e lanches práticos em casa.",
      "Aceite ajuda de familiares e amigos com compras e preparo.",
      "Mantenha a hidratação: até a desidratação leve aumenta o cansaço.",
      "Atividade física leve e orientada tem boas evidências contra a fadiga.",
    ],
    alerta: [
      "Cansaço súbito e muito intenso",
      "Falta de ar, palidez ou tontura",
    ],
    color: "cabbage",
  },
  {
    id: "boca-seca",
    name: "Boca seca",
    short: "Boca seca",
    intro:
      "Muito comum na radioterapia de cabeça e pescoço e com alguns medicamentos. Dificulta mastigar, engolir e sentir o gosto.",
    dicas: [
      "Mantenha água sempre por perto e beba pequenos goles com frequência.",
      "Prefira alimentos úmidos, com molhos, caldos e purês.",
      "Chupe gelo ou balas sem açúcar para estimular a saliva.",
      "Evite álcool, enxaguantes com álcool e excesso de café.",
      "Capriche na higiene bucal: a boca seca aumenta o risco de cáries.",
    ],
    alerta: [
      "Dificuldade para engolir ou engasgos frequentes",
      "Feridas ou dor na boca",
    ],
    color: "tomato",
  },
];

export const pilares = [
  {
    title: "Proteína em toda refeição",
    text: "Ajuda a preservar a massa muscular, que sustenta força, imunidade e tolerância ao tratamento. Ovos, frango, peixe, carnes, laticínios, feijões, lentilha, grão-de-bico e tofu.",
    color: "grain",
  },
  {
    title: "Energia suficiente",
    text: "Durante o tratamento, o corpo costuma precisar de mais energia, não menos. Dietas restritivas por conta própria aumentam o risco de desnutrição.",
    color: "leaf",
  },
  {
    title: "Hidratação contínua",
    text: "Água, sucos, chás liberados, sopas e frutas contam. Urina clara ao longo do dia é um bom sinal. Algumas pessoas têm restrição de líquidos: siga a sua equipe.",
    color: "cabbage",
  },
  {
    title: "Segurança dos alimentos",
    text: "Com a imunidade baixa, higienize frutas e verduras, cozinhe bem carnes e ovos e evite alimentos crus de origem animal, como sushi, ovo mole e leite não pasteurizado.",
    color: "tomato",
  },
];

export const mitos = [
  {
    claim: "O açúcar alimenta o câncer, então preciso cortar todo carboidrato.",
    verdict: "Mito",
    answer:
      "Todas as células do corpo usam glicose, inclusive as saudáveis. Cortar carboidratos não deixa o tumor sem alimento e pode levar à perda de peso e de músculo. Moderar açúcar e ultraprocessados é bom, mas sem radicalismo.",
  },
  {
    claim: "Jejum ou dietas muito restritivas potencializam o tratamento.",
    verdict: "Mito",
    answer:
      "Até agora não há evidência suficiente para recomendar jejum ou dietas como a cetogênica fora de estudos clínicos. Elas podem agravar a desnutrição, que já é comum durante o tratamento.",
  },
  {
    claim: "Se é natural, não faz mal.",
    verdict: "Mito",
    answer:
      "Chás, fitoterápicos e suplementos em altas doses podem interagir com a quimioterapia e outros remédios. A erva-de-são-joão, por exemplo, reduz o efeito de vários medicamentos. Conte para a equipe tudo o que você toma.",
  },
  {
    claim: "Perder peso durante o tratamento é normal e não tem problema.",
    verdict: "Mito",
    answer:
      "Perda de peso sem querer, especialmente de massa muscular, está ligada a mais efeitos colaterais e pior tolerância ao tratamento. Ela merece atenção desde o início, mesmo em quem estava acima do peso.",
  },
  {
    claim: "Alimentos alcalinos mudam o pH do corpo e combatem o tumor.",
    verdict: "Mito",
    answer:
      "A alimentação não muda o pH do sangue, que o organismo mantém dentro de uma faixa estreita. Frutas e verduras fazem bem por outros motivos: fibras, vitaminas e variedade.",
  },
  {
    claim: "Proteína é uma das prioridades durante o tratamento.",
    verdict: "Verdade",
    answer:
      "A necessidade de proteína costuma aumentar. Distribuí-la ao longo do dia ajuda a manter o músculo. Quando a comida não basta, a nutricionista pode indicar suplementos específicos.",
  },
];

export const faq = [
  {
    q: "Os ebooks substituem a consulta com nutricionista ou médico?",
    a: "Não. Eles são materiais educativos para você entender o que está acontecendo, se organizar e chegar às consultas com perguntas melhores. A conduta para o seu caso é sempre da sua equipe.",
  },
  {
    q: "Quem escreveu os ebooks?",
    a: "Todos os ebooks foram desenvolvidos por nutricionistas profissionais. Após a compra, junto com o material, você recebe mais informações sobre os nutricionistas responsáveis pelo conteúdo.",
  },
  {
    q: "Servem para qualquer tipo de câncer?",
    a: "As orientações são gerais e servem para a maioria dos tratamentos (quimioterapia, radioterapia, imunoterapia e cirurgia). Alguns casos, como cânceres de cabeça e pescoço, do aparelho digestivo ou com restrições específicas, precisam de ajustes individuais. O próprio material indica quando isso acontece.",
  },
  {
    q: "Posso dar de presente para um familiar ou cuidador?",
    a: "Pode, e muitos compram exatamente para isso. A linguagem foi pensada tanto para quem está em tratamento quanto para quem cuida.",
  },
  {
    q: "Como recebo os ebooks?",
    a: "Logo após a confirmação do pagamento, você recebe por e-mail o link para baixar os arquivos em PDF. Eles funcionam no celular, no computador e podem ser impressos.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia a partir da compra. Se o material não fizer sentido para você, é só pedir o reembolso integral.",
  },
];
