export interface PhraseStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  rotation: number;
  delay: number;
}

export interface PhraseEntry {
  id: string;
  text: string;
  author: string;
  context?: string;
  style: PhraseStyle;
  media?: {
    type: 'youtube' | 'image' | 'link';
    src: string;
    caption?: string;
  };
}

export const phrases: PhraseEntry[] = [
  {
    id: 'matrix-vision',
    text: "We're not just racing, we're building legends",
    author: 'Matrix',
    context: 'League founding speech',
    style: { fontSize: 'text-2xl', fontWeight: 'font-bold', fontStyle: 'italic', color: 'text-[#9FFE88]', rotation: -2, delay: 0 },
    media: { type: 'image', src: '/MxlLegacyLogo.webp', caption: 'Frühes MXL Branding' }
  },
  {
    id: 'speedking-motto',
    text: 'Fast is temporary, legendary is forever',
    author: 'SpeedKing',
    context: 'Championship victory speech',
    style: { fontSize: 'text-lg', fontWeight: 'font-semibold', fontStyle: 'normal', color: 'text-[#F4F4F4]', rotation: 1, delay: 200 },
    media: { type: 'link', src: 'https://placehold.co/800x450?text=SpeedKing+Finale', caption: 'Finale Highlight' }
  },
  {
    id: 'phoenix-wisdom',
    text: 'We came for the racing, but we stayed for each other',
    author: 'PhoenixRider',
    context: 'Community motto',
    style: { fontSize: 'text-xl', fontWeight: 'font-medium', fontStyle: 'italic', color: 'text-[#9FFE88]/80', rotation: -1, delay: 400 }
  },
  {
    id: 'racemancer-tech',
    text: "Data doesn't lie, but it tells stories",
    author: 'Racemancer',
    context: 'Setup Sunday session',
    style: { fontSize: 'text-base', fontWeight: 'font-normal', fontStyle: 'normal', color: 'text-[#F4F4F4]/70', rotation: 2, delay: 600 },
    media: { type: 'youtube', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Telemetrie-Analyse' }
  },
  {
    id: 'community-spirit',
    text: "In MXL, everyone's victory is everyone's victory",
    author: 'Community',
    style: { fontSize: 'text-lg', fontWeight: 'font-medium', fontStyle: 'normal', color: 'text-[#9FFE88]/90', rotation: -1.5, delay: 800 }
  },
  {
    id: 'matrix-legacy',
    text: 'Some endings are not endings at all, but new beginnings in disguise',
    author: 'Matrix',
    context: 'Final season announcement',
    style: { fontSize: 'text-xl', fontWeight: 'font-bold', fontStyle: 'italic', color: 'text-[#F4F4F4]', rotation: 1.5, delay: 1000 }
  },
  {
    id: 'rookie-wisdom',
    text: 'Every champion was once a beginner who refused to give up',
    author: 'Rookie Mentor Program',
    style: { fontSize: 'text-sm', fontWeight: 'font-light', fontStyle: 'italic', color: 'text-[#F4F4F4]/60', rotation: -0.5, delay: 1200 }
  },
  {
    id: 'speedking-humble',
    text: 'Winning is great, but helping others improve is legendary',
    author: 'SpeedKing',
    context: 'Mentorship program',
    style: { fontSize: 'text-lg', fontWeight: 'font-semibold', fontStyle: 'normal', color: 'text-[#9FFE88]', rotation: 2.5, delay: 1400 }
  },
  {
    id: 'phoenix-heart',
    text: "MXL isn't just a league, it's a family",
    author: 'PhoenixRider',
    style: { fontSize: 'text-xl', fontWeight: 'font-bold', fontStyle: 'normal', color: 'text-[#F4F4F4]/90', rotation: -2.5, delay: 1600 }
  },
  {
    id: 'racemancer-share',
    text: 'Knowledge shared is knowledge multiplied',
    author: 'Racemancer',
    style: { fontSize: 'text-base', fontWeight: 'font-medium', fontStyle: 'italic', color: 'text-[#9FFE88]/70', rotation: 1, delay: 1800 }
  },
  {
    id: 'final-thought',
    text: 'The checkered flag may wave, but the memories race on forever',
    author: 'MXL Legacy',
    style: { fontSize: 'text-2xl', fontWeight: 'font-bold', fontStyle: 'italic', color: 'text-[#9FFE88]', rotation: -1, delay: 2000 }
  },
  {
    id: 'matrix-philosophy',
    text: 'Respect on track, friendship off track',
    author: 'Matrix',
    context: 'League rules introduction',
    style: { fontSize: 'text-lg', fontWeight: 'font-semibold', fontStyle: 'normal', color: 'text-[#F4F4F4]/80', rotation: 0.5, delay: 2200 }
  },
  {
    id: 'community-bond',
    text: 'Different countries, different languages, one passion',
    author: 'Global Community',
    style: { fontSize: 'text-base', fontWeight: 'font-normal', fontStyle: 'italic', color: 'text-[#F4F4F4]/70', rotation: -1.5, delay: 2400 }
  },
  {
    id: 'speedking-rivalry',
    text: 'The best rivalries are built on mutual respect',
    author: 'SpeedKing',
    context: 'Post-race interview',
    style: { fontSize: 'text-lg', fontWeight: 'font-medium', fontStyle: 'normal', color: 'text-[#9FFE88]/80', rotation: 2, delay: 2600 }
  },
  {
    id: 'phoenix-support',
    text: 'In our darkest moments, MXL was our light',
    author: 'PhoenixRider',
    context: 'Personal reflection',
    style: { fontSize: 'text-xl', fontWeight: 'font-medium', fontStyle: 'italic', color: 'text-[#F4F4F4]', rotation: -0.5, delay: 2800 }
  }
];

export function getPhraseById(id: string): PhraseEntry | undefined {
  return phrases.find((p) => p.id === id);
}
