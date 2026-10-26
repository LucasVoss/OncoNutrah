// Classes completas para o Tailwind encontrar no build
export type Tone = 'leaf' | 'tomato' | 'cabbage' | 'grain';

export const toneText: Record<Tone, string> = {
  leaf: 'text-leaf',
  tomato: 'text-tomato',
  cabbage: 'text-cabbage',
  grain: 'text-grain',
};

export const toneBg: Record<Tone, string> = {
  leaf: 'bg-leaf',
  tomato: 'bg-tomato',
  cabbage: 'bg-cabbage',
  grain: 'bg-grain',
};
