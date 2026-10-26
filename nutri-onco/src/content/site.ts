// Tudo que é "da marca" fica aqui: nome, links, preços e textos de venda.
// Itens marcados com TODO precisam ser trocados pelos dados reais antes de publicar.

export const site = {
  brand: "OncoNutrah",
  tagline: "Nutrição durante o tratamento do câncer",
  description:
    "Um guia claro para quem recebeu um diagnóstico de câncer: como se alimentar bem durante o tratamento e o que fazer em cada sintoma.",
  // Seção "Quem está com você": sem nomes, a equipe é apresentada após a compra
  about: {
    title: "Feito por nutricionistas, para caminhar com você",
    team: {
      title: "Quem está por trás dos ebooks",
      text: "Todos os ebooks da OncoNutrah foram desenvolvidos por nutricionistas profissionais.",
      afterPurchase: "Após a compra, junto com o material, você recebe mais informações sobre os nutricionistas responsáveis pelo conteúdo.",
    },
    tagline: "Cuidado, acolhimento e nutrição para caminhar com você. ❤️",
    bio: [
      "Quando o câncer chega, muitas coisas mudam. Surgem medos, dúvidas e desafios que envolvem não apenas quem recebe o diagnóstico, mas toda a família. E, em meio a tantos sentimentos, até a hora de comer pode se tornar difícil.",
      "A OncoNutrah nasceu para estar ao seu lado nesses momentos. Criada por nutricionistas, nossa iniciativa busca transformar o conhecimento nutricional em orientações simples, práticas e acolhedoras para pacientes, familiares e cuidadores.",
      "Queremos ajudar você a encontrar caminhos possíveis para cuidar da alimentação, lidar com as dificuldades do tratamento e preservar, sempre que possível, a força, o conforto e a qualidade de vida de quem você ama.",
      "Você não precisa ter todas as respostas, nem enfrentar tudo isso sozinho.",
      "Estamos aqui para acolher suas dúvidas, oferecer informação confiável e lembrar que, mesmo nos dias mais difíceis, cada gesto de cuidado importa.",
    ],
    closing: "OncoNutrah — porque cuidar de quem você ama também é uma forma de amor.",
    // Relato pessoal. "Há um mês" é relativo à data de publicação: revisar com o tempo.
    story: {
      title: "Por que este material existe",
      paragraphs: [
        "Este material começou a ser pensado há 10 anos, nas conversas com pacientes e famílias que chegavam com as mesmas perguntas: o que comer, como comer quando nada desce, como ajudar quem a gente ama a se manter forte.",
        "Ele ganhou um sentido ainda maior de um jeito que eu nunca imaginei. Há um mês, perdi meu sogro para o câncer. Quando ele foi diagnosticado, a estimativa era de seis semanas de vida. Com uma alimentação cuidada e orientada, ajustada a cada fase do tratamento e a cada sintoma, ele viveu nove meses conosco.",
        "Não foi só a comida. Foi o tratamento, foi o cuidado de todos ao redor dele. Mas a alimentação deu ao corpo dele condições de seguir em frente, e deu a nós algo que não tem preço: tempo juntos.",
        "E, há um mês, recebemos também o diagnóstico de câncer do meu irmão mais novo. Hoje eu vivo os dois lados: o da nutricionista e o da família que senta à mesa sem saber por onde começar. Conheço esse medo de perto.",
        "Por isso a OncoNutrah existe: para que você tenha nas mãos, desde o primeiro dia, aquilo que eu gostaria que toda família tivesse.",
      ],
      signature: "Uma das nutricionistas da OncoNutrah",
    },
  },
  whatsappUrl: "https://wa.me/5500000000000", // TODO
  instagramUrl: "https://www.instagram.com/onconutrah/",};

export const nav = [
  { href: "#comece", label: "Comece aqui" },
  { href: "#sintomas", label: "Sintomas" },
  { href: "#pilares", label: "No prato" },
  { href: "#mitos", label: "Mitos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export type Ebook = {
  id: string;
  title: string;
  subtitle: string;
  pages: string;
  includes: string[];
  price: number;
  oldPrice?: number;
  checkoutUrl: string;
  color: "leaf" | "tomato" | "cabbage" | "grain";
  featured?: boolean;
};

// TODO: títulos, preços e links de checkout (Hotmart, Kiwify, Eduzz, Stripe...)
export const ebooks: Ebook[] = [
  {
    id: "sintomas",
    title: "Sintomas na Mesa",
    subtitle: "O que comer, o que evitar e quando chamar a equipe, sintoma por sintoma.",
    pages: "86 páginas",
    includes: [
      "12 sintomas explicados em linguagem simples",
      "Listas de alimentos que ajudam e que atrapalham",
      "Sinais de alerta para levar à equipe",
    ],
    price: 47,
    checkoutUrl: "#",
    color: "leaf",
  },
  {
    id: "receitas",
    title: "Receitas para Dias Difíceis",
    subtitle: "Pratos macios, frios, nutritivos e fáceis para quando comer é um desafio.",
    pages: "40 receitas",
    includes: [
      "Organizadas por sintoma e por textura",
      "Versões ricas em proteína e calorias",
      "Preparos de até 20 minutos",
    ],
    price: 37,
    checkoutUrl: "#",
    color: "tomato",
  },
  {
    id: "colecao",
    title: "Coleção Completa",
    subtitle: "Os três guias juntos para atravessar o tratamento com mais segurança.",
    pages: "3 ebooks + bônus",
    includes: [
      "Sintomas na Mesa",
      "Receitas para Dias Difíceis",
      "Primeiros 30 Dias",
      "Bônus: diário alimentar e de sintomas para imprimir",
    ],
    price: 79,
    oldPrice: 111,
    checkoutUrl: "#",
    color: "cabbage",
    featured: true,
  },
  {
    id: "30dias",
    title: "Primeiros 30 Dias",
    subtitle: "Um roteiro para o primeiro mês depois do diagnóstico, para sair do susto e montar uma rotina.",
    pages: "52 páginas",
    includes: [
      "Checklist da semana 1 à semana 4",
      "Perguntas para levar à consulta",
      "Lista de compras e despensa básica",
    ],
    price: 27,
    checkoutUrl: "#",
    color: "grain",
  },
];
