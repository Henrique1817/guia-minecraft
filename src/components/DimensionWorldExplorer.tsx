import React, { useState } from 'react';
import {
  Trees,
  Flame,
  Orbit,
  Volume2,
  VolumeX,
  Pickaxe,
  Sparkles,
  Compass,
  ArrowRight,
  Layers,
  Hammer,
} from 'lucide-react';
import { useDimensionTheme, DimensionTheme } from '../context/ThemeContext';
import { MinecraftSoundType } from '../utils/minecraftSounds';

export interface VoxelBlockItem {
  id: string;
  name: string;
  englishName: string;
  dimension: DimensionTheme;
  bestLayerOrLocation: string;
  toolRequired: string;
  topColor: string;
  leftColor: string;
  rightColor: string;
  speckleColor: string;
  survivalUse: string;
  automationSecret: string;
}

const DIMENSION_VOXEL_BLOCKS: VoxelBlockItem[] = [
  // OVERWORLD BLOCKS
  {
    id: 'grass-block',
    name: 'Bloco de Grama',
    englishName: 'Grass Block',
    dimension: 'overworld',
    bestLayerOrLocation: 'Superfície (Y=63 a Y=200)',
    toolRequired: 'Pá com Toque Suave (Silk Touch)',
    topColor: '#22c55e',
    leftColor: '#78350f',
    rightColor: '#451a03',
    speckleColor: '#4ade80',
    survivalUse:
      'Necessário para o nascimento de animais passivos (vacas, ovelhas, galinhas) e base da sua fazenda principal.',
    automationSecret:
      'Para levar grama até cavernas subterrâneas sem encantamento de Toque Suave, faça uma escada de terra ligada à superfície ou mate um Enderman que esteja segurando um bloco de grama!',
  },
  {
    id: 'deepslate-diamond',
    name: 'Minério de Diamante (Ardósia)',
    englishName: 'Deepslate Diamond Ore',
    dimension: 'overworld',
    bestLayerOrLocation: 'Camada Y=-58 a Y=-54',
    toolRequired: 'Picareta de Ferro+ com Fortuna III',
    topColor: '#334155',
    leftColor: '#1e293b',
    rightColor: '#0f172a',
    speckleColor: '#38bdf8',
    survivalUse:
      'Fonte principal para armaduras e ferramentas de alto nível antes da Netherita.',
    automationSecret:
      'Mine sempre na camada Y=-54 (logo no nível do teto dos lagos de lava) usando um Alçapão (Trapdoor) para deitar em 1x1 bloco: você expõe 3x mais blocos por minuto do que cavando túneis de 2 blocos de altura!',
  },
  {
    id: 'redstone-block',
    name: 'Bloco de Redstone',
    englishName: 'Block of Redstone',
    dimension: 'overworld',
    bestLayerOrLocation: 'Fabricado (9 Pós de Redstone)',
    toolRequired: 'Qualquer Picareta',
    topColor: '#ef4444',
    leftColor: '#dc2626',
    rightColor: '#991b1b',
    speckleColor: '#fca5a5',
    survivalUse:
      'Fonte móvel de energia nível 15 constante que pode ser empurrada por pistões.',
    automationSecret:
      'É o coração dos relógios de pistão (Hopper Clocks) e das Flying Machines que colhem plantações gigantes de bambu e cana-de-açúcar.',
  },
  {
    id: 'composter-block',
    name: 'Composteira',
    englishName: 'Composter',
    dimension: 'overworld',
    bestLayerOrLocation: 'Fabricada com 7 Lajes de Madeira',
    toolRequired: 'Machado',
    topColor: '#92400e',
    leftColor: '#78350f',
    rightColor: '#451a03',
    speckleColor: '#84cc16',
    survivalUse:
      'Transforma sementes excedentes em Farinha de Osso (Bonemeal) e dá a profissão de Fazendeiro aos aldeões.',
    automationSecret:
      'Segredo Anti-Lag: Coloque Composteiras em cima de funis expostos na sua sala de baús para reduzir o uso de CPU dos funis em 65%!',
  },
  {
    id: 'observer-block',
    name: 'Observador',
    englishName: 'Observer',
    dimension: 'overworld',
    bestLayerOrLocation: 'Fabricado (Pedregulho + Redstone + Quartzo)',
    toolRequired: 'Picareta',
    topColor: '#52525b',
    leftColor: '#3f3f46',
    rightColor: '#27272a',
    speckleColor: '#f43f5e',
    survivalUse:
      'Detecta instantaneamente quando uma planta cresce ou um bloco muda na frente do "rosto" dele.',
    automationSecret:
      'Indispensável para fábricas 100% automáticas de Cana-de-Açúcar, Bambu, Melancia e Abóbora: quando a planta cresce no 3º bloco, o observador aciona o pistão sem precisar de relógio!',
  },
  {
    id: 'crafting-table',
    name: 'Bancada de Trabalho',
    englishName: 'Crafting Table',
    dimension: 'overworld',
    bestLayerOrLocation: 'Fabricada com 4 Tábuas',
    toolRequired: 'Machado',
    topColor: '#b45309',
    leftColor: '#92400e',
    rightColor: '#78350f',
    speckleColor: '#fde68a',
    survivalUse:
      'Libera a grade 3x3 de criação de todas as ferramentas e componentes de redstone.',
    automationSecret:
      'No Minecraft 1.21+, combine-a com ferro e redstone para criar o "Crafter" (Bancada Automática), que fabrica blocos de ouro, ferro e foguetes sozinho a cada pulso de redstone!',
  },

  // NETHER BLOCKS
  {
    id: 'ancient-debris',
    name: 'Detritos Ancestrais (Netherita)',
    englishName: 'Ancient Debris',
    dimension: 'nether',
    bestLayerOrLocation: 'Camada Y=15 no Nether',
    toolRequired: 'Picareta de Diamante ou Netherita',
    topColor: '#442c27',
    leftColor: '#36211d',
    rightColor: '#241512',
    speckleColor: '#d6a89a',
    survivalUse:
      'Fundido com 4 barras de ouro, cria a Barra de Netherita (imune a lava e com mais durabilidade que diamante).',
    automationSecret:
      'Como Detritos Ancestrais são 100% imunes a explosões, cave um túnel na camada Y=15 do Nether e exploda Camas ou TNTs a cada 5 blocos: toda a rocha derrete e os Detritos ficam flutuando no ar!',
  },
  {
    id: 'magma-block',
    name: 'Bloco de Magma',
    englishName: 'Magma Block',
    dimension: 'nether',
    bestLayerOrLocation: 'Costas de Lava (Y=27 a Y=36)',
    toolRequired: 'Qualquer Picareta',
    topColor: '#9a3412',
    leftColor: '#7c2d12',
    rightColor: '#431407',
    speckleColor: '#fb923c',
    survivalUse:
      'Causa dano de fogo a monstros que pisam nele (exceto jogadores agachados no Shift) e puxa entidades para o fundo da água.',
    automationSecret:
      'Usado em plataformas gigantes na camada Y=128 (Teto do Nether) para construir a Fábrica de Ouro e XP: somente Zombified Piglins nascem sobre o Bloco de Magma!',
  },
  {
    id: 'soul-sand',
    name: 'Areia das Almas',
    englishName: 'Soul Sand',
    dimension: 'nether',
    bestLayerOrLocation: 'Vales da Areia das Almas & Fortalezas',
    toolRequired: 'Pá (Encantamento Velocidade das Almas nas botas)',
    topColor: '#453028',
    leftColor: '#36241d',
    rightColor: '#231712',
    speckleColor: '#38bdf8',
    survivalUse:
      'Base para plantar Fungo do Nether (Nether Wart) para poções e invocar o boss Wither.',
    automationSecret:
      'Embaixo de uma coluna de fontes de água, a Areia das Almas cria um Elevador de Bolhas Ascendente que joga seus itens da mina até a sala de baús em segundos!',
  },
  {
    id: 'nether-gold-ore',
    name: 'Minério de Ouro do Nether',
    englishName: 'Nether Gold Ore',
    dimension: 'nether',
    bestLayerOrLocation: 'Todo o Nether (Y=10 a Y=117)',
    toolRequired: 'Picareta com Fortuna III ou Toque Suave',
    topColor: '#7f1d1d',
    leftColor: '#651717',
    rightColor: '#450a0a',
    speckleColor: '#facc15',
    survivalUse:
      'Fornece pepitas de ouro que formam barras para negociar Pérolas do End com os Piglins.',
    automationSecret:
      'Se minerado com Picareta de Toque Suave (Silk Touch) e assado na fornalha, ele garante sempre 1 Barra de Ouro inteira (9 pepitas) mais XP completo!',
  },
  {
    id: 'bedrock-roof',
    name: 'Rocha-Mãe do Teto (Y=128)',
    englishName: 'Nether Roof Bedrock',
    dimension: 'nether',
    bestLayerOrLocation: 'Camada Y=127 / Y=128 do Nether',
    toolRequired: 'Atravessável com Escada + Pérola do End',
    topColor: '#3f3f46',
    leftColor: '#27272a',
    rightColor: '#18181b',
    speckleColor: '#a1a1aa',
    survivalUse:
      'Acima da camada Y=128 existe uma planície infinita e vazia onde nenhum Ghast ou monstro nasce no chão.',
    automationSecret:
      'Suba até Y=127 com escadas de mão, mire na quina superior da rocha e atire uma Pérola do End para sair em cima do teto. Construa rodovias de gelo lá em cima para viajar 8.000 blocos em 1 minuto!',
  },
  {
    id: 'respawn-anchor',
    name: 'Âncora de Renascimento',
    englishName: 'Respawn Anchor',
    dimension: 'nether',
    bestLayerOrLocation: 'Fabricada (6 Obsidianas Choronas + 3 Glowstone)',
    toolRequired: 'Picareta de Diamante/Netherita',
    topColor: '#4c1d95',
    leftColor: '#1e1b4b',
    rightColor: '#0f172a',
    speckleColor: '#facc15',
    survivalUse:
      'Como camas explodem no Nether, a Âncora permite salvar seu ponto de renascimento dentro da dimensão vermelha.',
    automationSecret:
      'Carregue-a com até 4 blocos de Pedra Luminosa (Glowstone). Nunca tente ativá-la no Overworld, pois ela explode com força maior que TNT!',
  },

  // THE END BLOCKS
  {
    id: 'end-portal-frame',
    name: 'Moldura do Portal do End',
    englishName: 'End Portal Frame',
    dimension: 'end',
    bestLayerOrLocation: 'Stronghold no Overworld',
    toolRequired: 'Indestrutível no Survival (Ativada com 12 Olhos do Fim)',
    topColor: '#0f766e',
    leftColor: '#d6d3d1',
    rightColor: '#a8a29e',
    speckleColor: '#34d399',
    survivalUse:
      'Abre a passagem definitiva para a ilha central do Dragão do Fim (Ender Dragon).',
    automationSecret:
      'Jogue areia ou cascalho no Portal do End com pistões para criar duplicadores técnicos ou enviar blocos instantaneamente entre dimensões!',
  },
  {
    id: 'end-stone',
    name: 'Pedra do End',
    englishName: 'End Stone',
    dimension: 'end',
    bestLayerOrLocation: 'Ilha Principal e Ilhas Externas do End',
    toolRequired: 'Qualquer Picareta',
    topColor: '#fef08a',
    leftColor: '#fde047',
    rightColor: '#eab308',
    speckleColor: '#ca8a04',
    survivalUse:
      'Possui a maior resistência a explosões entre todos os blocos mineráveis rápidos e o Dragão não consegue destruí-la.',
    automationSecret:
      'Ao lutar contra o Dragão ou construir pontes sobre o vazio (Void), use sempre Pedra do End ou Obsidiana para que o rasante do Dragão nunca apague a ponte sob seus pés!',
  },
  {
    id: 'shulker-box',
    name: 'Caixa de Shulker',
    englishName: 'Shulker Box',
    dimension: 'end',
    bestLayerOrLocation: 'End Cities (2 Cascos de Shulker + 1 Baú)',
    toolRequired: 'Quebra até com a mão mantendo os 27 slots cheios',
    topColor: '#9333ea',
    leftColor: '#7e22ce',
    rightColor: '#581c87',
    speckleColor: '#e9d5ff',
    survivalUse:
      'A única caixa do jogo que conserva todos os 27 slots de itens dentro dela quando você a quebra e guarda na mochila.',
    automationSecret:
      'Guarde 27 Caixas de Shulker coloridas e renomeadas dentro de 1 Baú do Fim (Ender Chest) para carregar 46.656 itens no seu bolso em qualquer lugar do mundo!',
  },
  {
    id: 'dragon-egg',
    name: 'Ovo do Dragão',
    englishName: 'Dragon Egg',
    dimension: 'end',
    bestLayerOrLocation: 'Topo da Fonte Central após derrotar o 1º Dragão',
    toolRequired: '1 Tocha colocada 2 blocos abaixo (Gravidade)',
    topColor: '#3b0764',
    leftColor: '#1e1b4b',
    rightColor: '#090414',
    speckleColor: '#d946ef',
    survivalUse:
      'O bloco mais raro do Minecraft: existe apenas 1 exemplar por mundo.',
    automationSecret:
      'Nunca tente minerar o Ovo direto (ele se teleporta). Dê 1 clique nele para ele sair do pedestal, cave 2 blocos abaixo de onde ele pousou, coloque uma Tocha no fundo e quebre o bloco que o sustenta: ele cairá sobre a tocha e dropará como item!',
  },
  {
    id: 'chorus-flower',
    name: 'Flor do Coro',
    englishName: 'Chorus Flower',
    dimension: 'end',
    bestLayerOrLocation: 'Ilhas Distantes do End (Pós-End Gateway)',
    toolRequired: 'Atire uma Flecha com Arco para colher a flor intacta',
    topColor: '#a855f7',
    leftColor: '#7e22ce',
    rightColor: '#581c87',
    speckleColor: '#f5d0fe',
    survivalUse:
      'Gera Frutas do Coro (Chorus Fruit) que podem ser comidas mesmo com a barra de fome cheia.',
    automationSecret:
      'Salva-Vidas contra Lava e Vazio: comer uma Fruta do Coro enquanto você está caindo de uma torre alta ou afundando na lava teleporta você instantaneamente para o chão sólido mais próximo, zerando o dano de queda!',
  },
  {
    id: 'one-cycle-bed',
    name: 'Cama Explosiva (One-Cycle)',
    englishName: 'Explosive Bed Strategy',
    dimension: 'end',
    bestLayerOrLocation: 'Usada no Pedestal Central do Dragão',
    toolRequired: '3 Lãs + 3 Tábuas + 1 Bloco de Escudo (Obsidiana)',
    topColor: '#ef4444',
    leftColor: '#f8fafc',
    rightColor: '#991b1b',
    speckleColor: '#fca5a5',
    survivalUse:
      'No The End e no Nether, tentar dormir faz a cama detonar com poder superior ao de um bloco de TNT.',
    automationSecret:
      'Posicione 1 bloco de Obsidiana entre suas pernas e a cama para bloquear 95% do dano em você. Quando a cabeça do Dragão encostar acima da cama, clique com o botão direito: 4 a 5 camas derrotam o boss inteiro!',
  },
];

interface DimensionWorldExplorerProps {
  onNavigateToSection?: (tab: 'survival-mastery' | 'modpack-builder' | 'tutorials') => void;
}

export const DimensionWorldExplorer: React.FC<DimensionWorldExplorerProps> = ({
  onNavigateToSection,
}) => {
  const { theme, setTheme, isSoundMuted, toggleSoundMute, playSound } = useDimensionTheme();

  // Filter blocks for current dimension
  const dimensionBlocks = DIMENSION_VOXEL_BLOCKS.filter((b) => b.dimension === theme);

  const [selectedBlockId, setSelectedBlockId] = useState<string>(dimensionBlocks[0]?.id || 'grass-block');
  const [blockHitCounts, setBlockHitCounts] = useState<Record<string, number>>({});
  const [shakingBlockId, setShakingBlockId] = useState<string | null>(null);

  // Interactive XP Bar State
  const [xpPoints, setXpPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('craftlab_player_xp_v1');
      return saved ? parseInt(saved, 10) : 140;
    } catch {
      return 140;
    }
  });

  // Nether 1:8 Portal Calculator State
  const [overworldX, setOverworldX] = useState<string>('800');
  const [overworldZ, setOverworldZ] = useState<string>('-1200');

  // Overworld Mining Y-Level Selector
  const [selectedOreLayer, setSelectedOreLayer] = useState<'diamond' | 'iron' | 'redstone' | 'coal'>('diamond');

  const xpLevel = Math.floor(xpPoints / 100);
  const xpBarPercent = xpPoints % 100;

  const activeBlock =
    dimensionBlocks.find((b) => b.id === selectedBlockId) || dimensionBlocks[0];

  const handleSelectDimension = (nextDim: DimensionTheme) => {
    setTheme(nextDim);
    const firstBlock = DIMENSION_VOXEL_BLOCKS.find((b) => b.dimension === nextDim);
    if (firstBlock) {
      setSelectedBlockId(firstBlock.id);
    }
  };

  const handleMineBlock = (block: VoxelBlockItem) => {
    setSelectedBlockId(block.id);
    setShakingBlockId(block.id);
    setTimeout(() => setShakingBlockId(null), 180);

    const currentHits = (blockHitCounts[block.id] || 0) + 1;
    if (currentHits >= 3) {
      // Block breaks on 3rd hit!
      playSound('block_break');
      setTimeout(() => playSound('xp_orb'), 90);

      const nextXp = xpPoints + 35;
      if (Math.floor(nextXp / 100) > Math.floor(xpPoints / 100)) {
        setTimeout(() => playSound('level_up'), 220);
      }
      setXpPoints(nextXp);
      try {
        localStorage.setItem('craftlab_player_xp_v1', String(nextXp));
      } catch {
        // ignore
      }

      setBlockHitCounts((prev) => ({ ...prev, [block.id]: 0 }));
    } else {
      playSound('block_hit');
      setBlockHitCounts((prev) => ({ ...prev, [block.id]: currentHits }));
    }
  };

  const soundButtons: { label: string; sound: MinecraftSoundType; desc: string }[] = [
    { label: 'Orbe de XP', sound: 'xp_orb', desc: 'Som de experiência' },
    { label: 'Level Up!', sound: 'level_up', desc: 'Subir de nível' },
    { label: 'Quebrar Bloco', sound: 'block_break', desc: 'Minerar bloco' },
    { label: 'Pistão Redstone', sound: 'piston', desc: 'Ativar circuito' },
    { label: 'Abrir Baú', sound: 'chest_open', desc: 'Sala de baús' },
    { label: 'Bigorna', sound: 'anvil', desc: 'Forjar encantamento' },
  ];

  const calculatedNetherX = Math.round((parseFloat(overworldX) || 0) / 8);
  const calculatedNetherZ = Math.round((parseFloat(overworldZ) || 0) / 8);

  return (
    <section
      id="dimensoes-minecraft"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/55 p-6 sm:p-10 space-y-8 mc-bevel-block relative overflow-hidden"
    >
      {/* Top Header: Dimension Portal Switcher + Audio Toggle + Minecraft XP Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <Compass className="w-4 h-4" />
            <span>Atlas Interativo de Blocos, Sons & Dimensões</span>
            <span aria-hidden="true">·</span>
            <span>Overworld · Nether · The End</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Explore cada Dimensão: Clique nos Blocos para Minerar & Ouvir
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Alterne entre os 3 mundos do Minecraft para mudar toda a atmosfera, paleta de cores, blocos exclusivos, efeitos sonoros e calculadoras técnicas daquela dimensão.
          </p>
        </div>

        {/* Interactive Player XP Bar & Sound Control */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Minecraft Authentic XP Level Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-zinc-800 min-w-[230px] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Barra de XP (Mine os Blocos)</span>
              <span className="font-mono font-bold text-lime-400 tabular-nums">
                Nível {xpLevel}
              </span>
            </div>
            {/* Segmented Minecraft XP Bar */}
            <div className="h-3 w-full rounded bg-zinc-900 border border-zinc-700 overflow-hidden relative p-0.5">
              <div
                className="h-full bg-lime-400 transition-all duration-200 rounded-xs"
                style={{ width: `${xpBarPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono tabular-nums flex justify-between">
              <span>{xpPoints} XP Total</span>
              <span>Faltam {100 - xpBarPercent} XP p/ Nv. {xpLevel + 1}</span>
            </div>
          </div>

          {/* Audio Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleSoundMute}
            className={`px-4 py-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              isSoundMuted
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                : 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            {isSoundMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span>Sons: Desativados</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Sons do Jogo: Ativos</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 PORTAL CARDS: OVERWORLD, NETHER, THE END */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(
          [
            {
              id: 'overworld' as DimensionTheme,
              title: '1. Overworld (Mundo Superior)',
              subtitle: 'Superfície, Vilas, Redstone & Cavernas Deepslate (Y=-59)',
              badge: 'Esmeralda & Ardósia',
              icon: Trees,
              portalPreviewBg: 'from-emerald-950/60 to-slate-950',
            },
            {
              id: 'nether' as DimensionTheme,
              title: '2. The Nether (Submundo)',
              subtitle: 'Fortalezas de Blaze, Detritos Y=15 & Teto de Bedrock Y=128',
              badge: 'Carmesim & Lava (1 Bloco = 8)',
              icon: Flame,
              portalPreviewBg: 'from-rose-950/60 to-slate-950',
            },
            {
              id: 'end' as DimensionTheme,
              title: '3. The End (O Fim)',
              subtitle: 'Batalha do Dragão com Camas, End Cities, Elytra & Shulkers',
              badge: 'Púrpura & Vazio Cósmico',
              icon: Orbit,
              portalPreviewBg: 'from-purple-950/60 to-slate-950',
            },
          ] as const
        ).map((dim) => {
          const IconComp = dim.icon;
          const isCurrent = theme === dim.id;
          return (
            <button
              key={dim.id}
              type="button"
              onClick={() => handleSelectDimension(dim.id)}
              className={`text-left p-5 rounded-2xl border transition-all bg-gradient-to-br ${dim.portalPreviewBg} mc-bevel-block ${
                isCurrent
                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 shadow-md'
                  : 'border-zinc-800 hover:border-zinc-700 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-emerald-400 font-semibold">{dim.badge}</span>
                <span className="text-zinc-400 font-mono">
                  {isCurrent ? '✓ Dimensão Ativa' : 'Entrar no Portal →'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconComp className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-zinc-100">{dim.title}</h3>
              </div>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{dim.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE VOXEL BLOCKS WORKBENCH + SELECTED BLOCK INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Interactive 3D Isometric Voxel Block Grid (Click 3x to Break & Earn XP) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Pickaxe className="w-4 h-4 text-emerald-400" />
              <span>
                Bancada de Blocos de{' '}
                {theme === 'overworld' ? 'Overworld' : theme === 'nether' ? 'Nether' : 'The End'}{' '}
                (Clique 3x no Bloco para Quebrar e Ganhar XP!)
              </span>
            </div>
            <span className="text-xs text-zinc-400 font-mono">6 Blocos Técnicos</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {dimensionBlocks.map((block) => {
              const isSelected = block.id === activeBlock.id;
              const hits = blockHitCounts[block.id] || 0;
              const isShaking = shakingBlockId === block.id;

              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => handleMineBlock(block)}
                  className={`group p-4 rounded-2xl border text-left transition-all mc-inventory-slot relative overflow-hidden ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-400 shadow-sm'
                      : 'bg-slate-950/90 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {/* Mining Progress Indicator */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>{hits === 0 ? 'Intacto' : `Rachando ${hits}/3`}</span>
                    <span className="text-emerald-400 font-semibold">+35 XP</span>
                  </div>

                  {/* Isometric 3D Voxel Cube SVG */}
                  <div
                    className={`w-20 h-20 mx-auto my-1 flex items-center justify-center ${
                      isShaking ? 'animate-block-hit' : 'animate-voxel-float'
                    }`}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-md"
                      aria-hidden="true"
                    >
                      {/* Top Face */}
                      <polygon
                        points="50,12 88,32 50,52 12,32"
                        fill={block.topColor}
                        stroke="#090d16"
                        strokeWidth="2"
                      />
                      {/* Left Face */}
                      <polygon
                        points="12,32 50,52 50,90 12,70"
                        fill={block.leftColor}
                        stroke="#090d16"
                        strokeWidth="2"
                      />
                      {/* Right Face */}
                      <polygon
                        points="50,52 88,32 88,70 50,90"
                        fill={block.rightColor}
                        stroke="#090d16"
                        strokeWidth="2"
                      />
                      {/* Pixel Ore / Texture Speckles */}
                      <rect x="44" y="26" width="6" height="6" fill={block.speckleColor} />
                      <rect x="55" y="32" width="5" height="5" fill={block.speckleColor} />
                      <rect x="26" y="52" width="7" height="7" fill={block.speckleColor} />
                      <rect x="35" y="66" width="6" height="6" fill={block.speckleColor} />
                      <rect x="64" y="54" width="7" height="7" fill={block.speckleColor} />
                      <rect x="58" y="68" width="5" height="5" fill={block.speckleColor} />

                      {/* Mining Cracks Overlay when hit 1 or 2 times */}
                      {hits >= 1 && (
                        <path
                          d="M50,32 L42,46 L52,58 L38,72"
                          stroke="#000000"
                          strokeWidth="3"
                          fill="none"
                        />
                      )}
                      {hits >= 2 && (
                        <path
                          d="M30,40 L50,52 L68,44 M50,52 L65,72"
                          stroke="#000000"
                          strokeWidth="3.5"
                          fill="none"
                        />
                      )}
                    </svg>
                  </div>

                  <div className="mt-2">
                    <div className="text-xs font-bold text-zinc-100 truncate">{block.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono truncate">
                      {block.englishName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Minecraft Soundboard Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-200 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Mesa de Efeitos Sonoros Sintetizados (Clique para Testar)</span>
              </span>
              <span className="text-zinc-500 font-mono">Web Audio API</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {soundButtons.map((btn) => (
                <button
                  key={btn.sound}
                  type="button"
                  onClick={() => playSound(btn.sound)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 text-left transition-colors"
                >
                  <div className="text-xs font-bold text-emerald-400">🔊 {btn.label}</div>
                  <div className="text-[11px] text-zinc-400 truncate">{btn.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Active Block Blueprint + Dimension-Specific Interactive Calculator */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Block Technical Inspector */}
          <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-4 mc-bevel-block">
            <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-3">
              <span className="font-semibold text-emerald-400">
                Inspeção Técnica de Bloco ({activeBlock.englishName})
              </span>
              <span className="font-mono text-zinc-400">{activeBlock.bestLayerOrLocation}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-zinc-100">{activeBlock.name}</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Ferramenta Ideal: <strong className="text-zinc-200">{activeBlock.toolRequired}</strong>
              </p>
            </div>

            <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <strong className="text-zinc-100 block mb-1">Função na Sobrevivência:</strong>
                {activeBlock.survivalUse}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/40 text-emerald-200">
                <strong className="text-emerald-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Segredo de Automação & Engenharia:</span>
                </strong>
                {activeBlock.automationSecret}
              </div>
            </div>
          </div>

          {/* DIMENSION-SPECIFIC INTERACTIVE TOOL */}
          {theme === 'overworld' && (
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Radar de Camadas do Overworld (1.18 – 1.21)</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(
                  [
                    { id: 'diamond', label: '💎 Diamante (Y=-58)', layer: 'Camada Y=-58 (Com Alçapão 1x1)', tip: 'Leve balde de água para transformar lagos de lava de Y=-54 em obsidiana instantânea.' },
                    { id: 'iron', label: '⛏️ Ferro (Y=16)', layer: 'Camada Y=16 ou Picos de Montanha (Y=232)', tip: 'Use Fortuna III no minério de ferro bruto: cada bloco rende até 4 ferros!' },
                    { id: 'redstone', label: '🔴 Redstone (Y=-58)', layer: 'Camada Y=-58 a Y=-63', tip: 'Com Fortuna III cada minério solta até 8 pós de redstone para seus separadores.' },
                    { id: 'coal', label: '🪨 Carvão & Cobre (Y=48)', layer: 'Camada Y=96 (Carvão) / Y=48 (Cobre)', tip: 'Cobre em Câmaras de Julgamento (Trial Chambers) já vem encerado e pronto.' },
                  ] as const
                ).map((ore) => (
                  <button
                    key={ore.id}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedOreLayer(ore.id);
                    }}
                    className={`p-2 rounded-xl border text-left font-semibold transition-colors ${
                      selectedOreLayer === ore.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {ore.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                {selectedOreLayer === 'diamond' && (
                  <>
                    <div className="font-bold text-emerald-400">Coordenada Ideal: Y = -58 a Y = -54</div>
                    <p>Aperte F3 e mantenha seus pés na altura Y=-58. Cave usando um alçapão na altura do rosto para entrar em modo natação (1 bloco de altura).</p>
                  </>
                )}
                {selectedOreLayer === 'iron' && (
                  <>
                    <div className="font-bold text-emerald-400">Coordenada Ideal: Y = 16 (Subsolo) ou Y = 232 (Montanhas)</div>
                    <p>Para ferro infinito sem minerar, construa a Fábrica de Ferro com 3 Aldeões e 1 Zumbi (~400 barras/hora).</p>
                  </>
                )}
                {selectedOreLayer === 'redstone' && (
                  <>
                    <div className="font-bold text-emerald-400">Coordenada Ideal: Y = -58 (Junto aos Diamantes)</div>
                    <p>Essencial para construir o Separador Automático de Baús ImpulseSV e a Superfornalha de 8 bocas.</p>
                  </>
                )}
                {selectedOreLayer === 'coal' && (
                  <>
                    <div className="font-bold text-emerald-400">Coordenada Ideal: Y = 96 (Colinas) e Y = 48 (Cobre)</div>
                    <p>Dica: Você pode substituir o carvão das fornalhas por Baldes de Lava ou Blocos de Alga Seca renováveis.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {theme === 'nether' && (
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>Calculadora de Portais 1:8 (Overworld ↔ Nether)</span>
              </div>
              <p className="text-xs text-zinc-400">
                Digite as coordenadas X e Z da sua base ou vila no Overworld para descobrir onde construir o portal exato no Nether:
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Overworld X:</label>
                  <input
                    type="number"
                    value={overworldX}
                    onChange={(e) => setOverworldX(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Overworld Z:</label>
                  <input
                    type="number"
                    value={overworldZ}
                    onChange={(e) => setOverworldZ(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-emerald-500/40 text-xs font-mono flex items-center justify-between">
                <span className="text-zinc-300">Posição Exata no Nether:</span>
                <span className="text-sm font-bold text-emerald-400 tabular-nums">
                  X: {calculatedNetherX} · Z: {calculatedNetherZ}
                </span>
              </div>
            </div>
          )}

          {theme === 'end' && (
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Orbit className="w-4 h-4" />
                <span>Logística do Fim: Mochila Infinita & 5 Camas no Dragão</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">1 Ender Chest com 27 Shulkers:</span>
                  <span className="text-emerald-400 font-bold">729 Slots (46.656 Itens)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Dano por Cama na Cabeça do Dragão:</span>
                  <span className="text-emerald-400 font-bold">~48 a 55 Corações</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Queda da Enderman Farm:</span>
                  <span className="text-emerald-400 font-bold">42 Blocos (1 Hit = Nv. 30)</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Jump to Dimension Farms */}
          {onNavigateToSection && (
            <button
              type="button"
              onClick={() => {
                playSound('piston');
                onNavigateToSection('survival-mastery');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Hammer className="w-4 h-4" />
              <span>
                Abrir Fábricas & Guia de Zeramento de{' '}
                {theme === 'overworld' ? 'Overworld' : theme === 'nether' ? 'Nether' : 'The End'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
