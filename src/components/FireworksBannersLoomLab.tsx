import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  Flame,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useDimensionTheme } from '../context/ThemeContext';

interface BannerLayerStep {
  layerNumber: number;
  dyeColor: string;
  dyeColorHex: string;
  loomPatternName: string;
  patternStencilRequired?: string;
  visualExplanation: string;
}

interface EpicBannerRecipe {
  id: string;
  name: string;
  subtitle: string;
  baseBannerColor: string;
  baseHex: string;
  accentHex: string;
  secondaryHex: string;
  emblemSymbol: string;
  shieldCompatibilityNote: string;
  layers: BannerLayerStep[];
  giveCommand: string;
}

const EPIC_BANNERS_DATA: EpicBannerRecipe[] = [
  {
    id: 'charged-creeper-neon',
    name: '1. Creeper Elétrico Radioativo (Charged Creeper)',
    subtitle:
      'O estandarte mais icônico do Minecraft para colocar no Escudo e nas torres da sua Creeper Farm.',
    baseBannerColor: 'Estandarte Preto (6 Lãs Pretas + 1 Graveto)',
    baseHex: '#09090b',
    accentHex: '#10b981',
    secondaryHex: '#22d3ee',
    emblemSymbol: '🧨',
    shieldCompatibilityNote:
      'Fica nítido no Escudo! O contraste entre o fundo preto, o gradiente ciano e o rosto verde-limão destaca de longe.',
    layers: [
      {
        layerNumber: 1,
        dyeColor: 'Corante Ciano (Azul + Verde)',
        dyeColorHex: '#06b6d4',
        loomPatternName: 'Gradiente Inferior (Base Gradient)',
        visualExplanation: 'Cria o brilho elétrico azulado subindo da base do estandarte.',
      },
      {
        layerNumber: 2,
        dyeColor: 'Corante Verde-Limão',
        dyeColorHex: '#84cc16',
        loomPatternName: 'Tijolos (Field Masoned)',
        visualExplanation: 'Cria a textura de escamas/pixels iluminados ao fundo.',
      },
      {
        layerNumber: 3,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#18181b',
        loomPatternName: 'Borda Dentada (Bordure Indented)',
        visualExplanation: 'Fecha as laterais com espinhos escuros dando profundidade.',
      },
      {
        layerNumber: 4,
        dyeColor: 'Corante Verde-Limão',
        dyeColorHex: '#10b981',
        loomPatternName: 'Figura de Creeper (Creeper Charge)',
        patternStencilRequired: 'Molde de Creeper (1 Papel + 1 Cabeça de Creeper)',
        visualExplanation: 'Estampa o rosto oficial do Creeper brilhando no centro!',
      },
    ],
    giveCommand:
      '/give @s minecraft:black_banner[minecraft:banner_patterns=[{pattern:"gradient_up",color:"cyan"},{pattern:"bricks",color:"lime"},{pattern:"curly_border",color:"black"},{pattern:"creeper",color:"lime"}]]',
  },
  {
    id: 'eye-of-the-end',
    name: '2. Olho do Fim & Portal Dimensional (The End Watcher)',
    subtitle:
      'Perfeito para marcar a sala do seu Portal do The End ou usar no Escudo durante explorações nas End Cities.',
    baseBannerColor: 'Estandarte Ciano ou Verde-Escuro',
    baseHex: '#0f172a',
    accentHex: '#a855f7',
    secondaryHex: '#34d399',
    emblemSymbol: '👁️',
    shieldCompatibilityNote:
      'Usa zero moldes raros nos 5 primeiros passos — qualquer jogador consegue fazer no Tear em 1 minuto!',
    layers: [
      {
        layerNumber: 1,
        dyeColor: 'Corante Verde-Limão',
        dyeColorHex: '#34d399',
        loomPatternName: 'Listras Verticais (Paly)',
        visualExplanation: 'Forma o brilho esmeralda da íris do Olho de Ender.',
      },
      {
        layerNumber: 2,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Losango Central (Lozenge / Rhombus)',
        visualExplanation: 'Desenha a pupila vertical afiada no centro exato do olho.',
      },
      {
        layerNumber: 3,
        dyeColor: 'Corante Magenta ou Roxo',
        dyeColorHex: '#a855f7',
        loomPatternName: 'Círculo Central (Roundel)',
        visualExplanation: 'Adiciona o núcleo energético do The End.',
      },
      {
        layerNumber: 4,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Triângulo Superior (Inverted Chevron)',
        visualExplanation: 'Fecha a pálpebra superior do olho.',
      },
      {
        layerNumber: 5,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Triângulo Inferior (Chevron)',
        visualExplanation: 'Fecha a pálpebra inferior, completando o formato amendoado do olho!',
      },
      {
        layerNumber: 6,
        dyeColor: 'Corante Roxo',
        dyeColorHex: '#9333ea',
        loomPatternName: 'Borda Dentada (Bordure Indented)',
        visualExplanation: 'Emoldura o escudo com partículas roxas de teleporte.',
      },
    ],
    giveCommand:
      '/give @s minecraft:cyan_banner[minecraft:banner_patterns=[{pattern:"small_stripes",color:"lime"},{pattern:"rhombus",color:"black"},{pattern:"circle",color:"magenta"},{pattern:"triangle_top",color:"black"},{pattern:"triangle_bottom",color:"black"},{pattern:"curly_border",color:"purple"}]]',
  },
  {
    id: 'wither-king-skull',
    name: '3. Coroa & Caveira do Rei Wither (Nether Emperor)',
    subtitle:
      'Visual intimidador em Preto, Dourado e Carmesim usando o Molde de Crânio no Tear.',
    baseBannerColor: 'Estandarte Preto',
    baseHex: '#09090b',
    accentHex: '#f59e0b',
    secondaryHex: '#ef4444',
    emblemSymbol: '💀',
    shieldCompatibilityNote:
      'Combina perfeitamente com Armaduras de Netherita adornadas com Molde de Ouro!',
    layers: [
      {
        layerNumber: 1,
        dyeColor: 'Corante Vermelho',
        dyeColorHex: '#ef4444',
        loomPatternName: 'Gradiente Superior (Gradient)',
        visualExplanation: 'Cria o céu ardente do Nether no topo do estandarte.',
      },
      {
        layerNumber: 2,
        dyeColor: 'Corante Amarelo / Dourado',
        dyeColorHex: '#f59e0b',
        loomPatternName: 'Flor / Sol Raiado (Flower Charge)',
        patternStencilRequired: 'Molde de Flor (1 Papel + 1 Margarida / Oxeye Daisy)',
        visualExplanation: 'Cria uma aureola/coroa dourada atrás da caveira.',
      },
      {
        layerNumber: 3,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#18181b',
        loomPatternName: 'Meia-Lua Inferior (Base)',
        visualExplanation: 'Limpa a parte de baixo da flor para deixar apenas as pontas da coroa no alto.',
      },
      {
        layerNumber: 4,
        dyeColor: 'Corante Branco',
        dyeColorHex: '#f4f4f5',
        loomPatternName: 'Crânio e Ossos (Skull Charge)',
        patternStencilRequired: 'Molde de Crânio (1 Papel + 1 Crânio de Wither)',
        visualExplanation: 'Estampa a caveira branca logo abaixo da coroa dourada!',
      },
      {
        layerNumber: 5,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Borda Simples (Bordure)',
        visualExplanation: 'Acabamento limpo para encaixar nas bordas de madeira do Escudo.',
      },
    ],
    giveCommand:
      '/give @s minecraft:black_banner[minecraft:banner_patterns=[{pattern:"gradient",color:"red"},{pattern:"flower",color:"yellow"},{pattern:"stripe_bottom",color:"black"},{pattern:"skull",color:"white"},{pattern:"border",color:"black"}]]',
  },
  {
    id: 'nether-portal-vortex',
    name: '4. Portal do Nether Flamejante (100% Sem Moldes Raros)',
    subtitle:
      'Ideal para sinalizar entradas de túneis no Nether Hub sem precisar gastar nenhuma cabeça de mob.',
    baseBannerColor: 'Estandarte Roxo',
    baseHex: '#3b0764',
    accentHex: '#d946ef',
    secondaryHex: '#09090b',
    emblemSymbol: '🌀',
    shieldCompatibilityNote:
      'Não exige nenhum Molde de Estandarte! Usa apenas Lã e Corantes básicos direto no Tear.',
    layers: [
      {
        layerNumber: 1,
        dyeColor: 'Corante Magenta',
        dyeColorHex: '#d946ef',
        loomPatternName: 'Listras Verticais (Paly)',
        visualExplanation: 'Simula os feixes de luz do interior do Portal do Nether.',
      },
      {
        layerNumber: 2,
        dyeColor: 'Corante Branco',
        dyeColorHex: '#f4f4f5',
        loomPatternName: 'Faixa Central Vertical (Pale)',
        visualExplanation: 'Cria o brilho intenso no centro do vórtice.',
      },
      {
        layerNumber: 3,
        dyeColor: 'Corante Roxo',
        dyeColorHex: '#9333ea',
        loomPatternName: 'Gradiente Superior + Inferior',
        visualExplanation: 'Suaviza o branco para parecer névoa roxa translúcida.',
      },
      {
        layerNumber: 4,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Tijolos (Field Masoned)',
        visualExplanation: 'Adiciona a textura de blocos de Obsidiana Chorona.',
      },
      {
        layerNumber: 5,
        dyeColor: 'Corante Preto',
        dyeColorHex: '#09090b',
        loomPatternName: 'Borda Simples (Bordure)',
        visualExplanation: 'Forma a moldura retangular externa de Obsidiana 4x5 do portal!',
      },
    ],
    giveCommand:
      '/give @s minecraft:purple_banner[minecraft:banner_patterns=[{pattern:"small_stripes",color:"magenta"},{pattern:"stripe_center",color:"white"},{pattern:"gradient",color:"purple"},{pattern:"bricks",color:"black"},{pattern:"border",color:"black"}]]',
  },
];

export const FireworksBannersLoomLab: React.FC = () => {
  const { playSound } = useDimensionTheme();

  // Elytra & Crossbow Firework Calculator State
  const [rocketPacksCount, setRocketPacksCount] = useState<number>(4); // 4 packs = 256 rockets
  const [flightDurationTier, setFlightDurationTier] = useState<1 | 2 | 3>(1);
  const [rocketPurpose, setRocketPurpose] = useState<'elytra-safe' | 'crossbow-nuke'>(
    'elytra-safe'
  );
  const [starCountForWeapon, setStarCountForWeapon] = useState<number>(7);

  // Loom Banner Studio State
  const [selectedBannerId, setSelectedBannerId] = useState<string>(EPIC_BANNERS_DATA[0].id);
  const [previewLayerLimit, setPreviewLayerLimit] = useState<number>(6);
  const [copiedBannerCmd, setCopiedBannerCmd] = useState<string | null>(null);

  const activeBanner =
    EPIC_BANNERS_DATA.find((b) => b.id === selectedBannerId) || EPIC_BANNERS_DATA[0];

  // Calculate Rocket Ingredients & Ballistics
  const rocketStats = useMemo(() => {
    const totalRockets = rocketPacksCount * 64;
    const craftsNeeded = Math.ceil(totalRockets / 3); // 1 craft makes 3 rockets
    const paperNeeded = craftsNeeded; // 1 paper per craft (equals sugarcane needed)

    if (rocketPurpose === 'elytra-safe') {
      const gunpowderNeeded = craftsNeeded * flightDurationTier;
      const boostSeconds =
        flightDurationTier === 1 ? '1,0s' : flightDurationTier === 2 ? '1,5s' : '2,2s';
      const selfExplosionDamage = 0;

      return {
        totalRockets,
        paperNeeded,
        gunpowderNeeded,
        boostSeconds,
        selfExplosionDamage,
        crossbowSingleDamage: 0,
        crossbowMultishotDamage: 0,
      };
    } else {
      // Crossbow Nuke Mode: 1 gunpowder for rocket flight + 1 gunpowder per Firework Star
      const gunpowderForFlight = craftsNeeded * 1;
      const gunpowderForStars = craftsNeeded * starCountForWeapon;
      const totalGunpowder = gunpowderForFlight + gunpowderForStars;

      // Damage formula: 5 base + 2 per additional star
      const singleRocketDamage = 5 + starCountForWeapon * 2;
      const multishotTripleDamage = singleRocketDamage * 3;

      return {
        totalRockets,
        paperNeeded,
        gunpowderNeeded: totalGunpowder,
        boostSeconds: '1,0s (Munição Explosiva)',
        selfExplosionDamage: singleRocketDamage,
        crossbowSingleDamage: singleRocketDamage,
        crossbowMultishotDamage: multishotTripleDamage,
      };
    }
  }, [rocketPacksCount, flightDurationTier, rocketPurpose, starCountForWeapon]);

  const formatPacks = (items: number) => {
    const p = Math.floor(items / 64);
    const r = items % 64;
    if (p === 0) return `${r} un.`;
    if (r === 0) return `${p} Packs`;
    return `${p} Packs + ${r} un.`;
  };

  const handleCopyCommand = (cmd: string, id: string) => {
    playSound('piston');
    navigator.clipboard.writeText(cmd);
    setCopiedBannerCmd(id);
    setTimeout(() => setCopiedBannerCmd(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: ELYTRA ROCKET & MULTISHOT CROSSBOW BALLISTICS CALCULATOR */}
      <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Oficina Pirotécnica: Propulsão de Elytra vs Munição de Besta (Multishot)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
              Calculadora de Foguetes (Duração 1, 2 e 3) & Bazuca de 7 Estrelas
            </h3>
          </div>

          {/* Mode Switcher: Safe Elytra vs Lethal Crossbow */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setRocketPurpose('elytra-safe');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                rocketPurpose === 'elytra-safe'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              🪽 Foguetes para Voar de Elytra (0 Dano)
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('anvil');
                setRocketPurpose('crossbow-nuke');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                rocketPurpose === 'crossbow-nuke'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              🏹 Munição de Besta (7 Estrelas Explosivas)
            </button>
          </div>
        </div>

        {/* Critical Warning about Firework Stars + Elytra */}
        <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-300 block mb-0.5">
              Erro Clássico que Mata Jogadores no Hardcore:
            </strong>
            Para voar de <strong>Elytra</strong>, junte APENAS <strong>1 Papel + Pólvora</strong>! Nunca coloque <em>Estrela de Fogo de Artifício (Firework Star)</em> nos seus foguetes de voo: foguetes coloridos explodem na sua mão ao impulsionar e tiram até <strong>9,5 Corações por clique</strong> em pleno ar! Guarde os foguetes com Estrelas exclusivamente para atirar com a <strong>Besta (Crossbow)</strong>.
          </div>
        </div>

        {/* Calculator Controls & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 Cols: Sliders & Tier Selection */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="rocket-packs-slider" className="font-bold text-zinc-200">
                  Quantidade de Foguetes para Fabricar:
                </label>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {rocketPacksCount} Packs ({rocketStats.totalRockets} Foguetes)
                </span>
              </div>

              <input
                id="rocket-packs-slider"
                type="range"
                min={1}
                max={27}
                value={rocketPacksCount}
                onChange={(e) => setRocketPacksCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {[
                  { p: 2, label: '2 Packs (128)' },
                  { p: 5, label: '5 Packs (320)' },
                  { p: 9, label: '9 Packs (576)' },
                  { p: 27, label: '1 Shulker Cheia (1.728)' },
                ].map((item) => (
                  <button
                    key={item.p}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setRocketPacksCount(item.p);
                    }}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      rocketPacksCount === item.p
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {rocketPurpose === 'elytra-safe' ? (
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5 text-xs">
                <div className="font-bold text-zinc-200">
                  Escolha a Potência de Voo (Pólvoras por Receita):
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      {
                        tier: 1 as const,
                        title: 'Duração 1 (1 Pólvora)',
                        desc: 'O melhor custo-benefício! Gasta 3x menos pólvora no dia a dia.',
                      },
                      {
                        tier: 2 as const,
                        title: 'Duração 2 (2 Pólvoras)',
                        desc: 'Equilíbrio ideal para explorar biomas no Overworld.',
                      },
                      {
                        tier: 3 as const,
                        title: 'Duração 3 (3 Pólvoras)',
                        desc: 'Turbo máximo para cruzar o vazio do The End.',
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.tier}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setFlightDurationTier(opt.tier);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        flightDurationTier === opt.tier
                          ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
                          : 'bg-slate-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-bold text-zinc-100">{opt.title}</div>
                      <p className="text-[10px] mt-1 leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2.5 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>Estrelas de Fogo de Artifício dentro do Foguete:</span>
                  <span className="font-mono">{starCountForWeapon} Estrelas (Máx: 7)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={starCountForWeapon}
                  onChange={(e) => setStarCountForWeapon(Number(e.target.value))}
                  aria-label="Número de Estrelas de Fogo de Artifício"
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <p className="text-[11px] text-zinc-300">
                  Na Bancada 3×3: coloque <strong>1 Papel + 1 Pólvora + até 7 Estrelas de Fogo de Artifício</strong>. Equipe o foguete na <strong>Mão Secundária (Tecla F)</strong> e dispare com uma Besta encantada com <strong>Rajada (Multishot) + Recarga Rápida III</strong>!
                </p>
              </div>
            )}
          </div>

          {/* Right 6 Cols: Ingredients & Damage Readout */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="text-zinc-400">Papel / Cana-de-Açúcar Necessária</div>
              <div className="text-xl font-bold text-zinc-100">
                {formatPacks(rocketStats.paperNeeded)}
              </div>
              <div className="text-[11px] text-zinc-500">
                ({rocketStats.paperNeeded} unidades de Papel)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/40 space-y-1">
              <div className="text-emerald-300">Pólvora Total (Creeper Farm)</div>
              <div className="text-xl font-bold text-emerald-400">
                {formatPacks(rocketStats.gunpowderNeeded)}
              </div>
              <div className="text-[11px] text-emerald-300/70">
                ({rocketStats.gunpowderNeeded} Pólvoras no total)
              </div>
            </div>

            {rocketPurpose === 'elytra-safe' ? (
              <>
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="text-zinc-400">Tempo de Propulsão por Foguete</div>
                  <div className="text-xl font-bold text-sky-400">{rocketStats.boostSeconds}</div>
                  <div className="text-[11px] text-zinc-500">
                    Incline a câmera a 40° ao decolar
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-300">Dano de Explosão no Jogador</div>
                  <div className="text-xl font-bold text-emerald-400">0 HP (100% Seguro)</div>
                  <div className="text-[11px] text-zinc-400">Sem Estrela de Fogo de Artifício</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                  <div className="text-amber-300">Dano de 1 Foguete (Tiro Simples)</div>
                  <div className="text-xl font-bold text-amber-400">
                    {rocketStats.crossbowSingleDamage} HP (
                    {(rocketStats.crossbowSingleDamage / 2).toFixed(1)} ❤️)
                  </div>
                  <div className="text-[11px] text-amber-200/70">Dano em área que ignora Escudo!</div>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-1">
                  <div className="text-rose-300">Com Besta "Rajada" (Multishot 3x)</div>
                  <div className="text-xl font-bold text-rose-400">
                    Até {rocketStats.crossbowMultishotDamage} HP!
                  </div>
                  <div className="text-[11px] text-rose-200/80">
                    Dispara 3 foguetes gastando apenas 1!
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: VISUAL LOOM BANNER & CUSTOM SHIELD STUDIO */}
      <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Oficina do Tear (Loom) — Estandartes de 6 Camadas & Escudos Decorados</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5">
              Receitas Passo a Passo no Tear para Estampar no Seu Escudo
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            1 Escudo + 1 Estandarte na Bancada = Escudo Personalizado!
          </span>
        </div>

        {/* Banner Recipe Selector + Step-by-Step Loom Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Selector Cards + Live Shield/Banner Emblem Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2.5">
              {EPIC_BANNERS_DATA.map((banner) => {
                const isSelected = banner.id === activeBanner.id;
                return (
                  <button
                    key={banner.id}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedBannerId(banner.id);
                      setPreviewLayerLimit(banner.layers.length);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all mc-bevel-block ${
                      isSelected
                        ? 'bg-zinc-900 border-emerald-400 shadow-sm'
                        : 'bg-slate-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-semibold">
                        {banner.layers.length} Camadas no Tear
                      </span>
                      <span className="font-mono text-zinc-400">{banner.baseBannerColor}</span>
                    </div>
                    <div className="text-base font-bold text-zinc-100">
                      {banner.emblemSymbol} {banner.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual Banner & Shield Preview Box */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center space-y-4">
              <div className="text-xs font-mono text-zinc-400">
                Pré-Visualização no Estandarte & Escudo (Camada {Math.min(previewLayerLimit, activeBanner.layers.length)} de {activeBanner.layers.length})
              </div>

              <div className="flex items-center justify-center gap-8 py-2">
                {/* Banner Graphic */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div
                    className="w-24 h-44 rounded-t-md rounded-b-xl border-2 border-zinc-600 shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${activeBanner.baseHex} 0%, ${activeBanner.secondaryHex} 55%, ${activeBanner.accentHex} 100%)`,
                    }}
                  >
                    <div className="absolute inset-1.5 border border-white/20 rounded-lg pointer-events-none" />
                    <span className="text-4xl drop-shadow">{activeBanner.emblemSymbol}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Estandarte</span>
                </div>

                {/* Shield Graphic */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div
                    className="w-28 h-44 rounded-lg border-4 border-amber-700 shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle, ${activeBanner.accentHex} 0%, ${activeBanner.baseHex} 75%)`,
                    }}
                  >
                    {/* Iron rivets on shield rim */}
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-zinc-300" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-zinc-300" />
                    <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-zinc-300" />
                    <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-zinc-300" />
                    <span className="text-4xl drop-shadow">{activeBanner.emblemSymbol}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300">No Escudo</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                {activeBanner.shieldCompatibilityNote}
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Step-by-Step Loom Layer Instructions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="text-xs text-emerald-400 font-bold">
                Passo 0 (Base na Bancada):
              </div>
              <div className="text-sm font-bold text-zinc-100">
                Comece com 1 {activeBanner.baseBannerColor}
              </div>
              <p className="text-xs text-zinc-400">
                Abra o <strong>Tear (Loom — feito com 2 Linhas + 2 Tábuas)</strong> e aplique os corantes na ordem exata abaixo:
              </p>
            </div>

            <div className="space-y-3">
              {activeBanner.layers.map((layer) => (
                <div
                  key={layer.layerNumber}
                  onClick={() => {
                    playSound('click');
                    setPreviewLayerLimit(layer.layerNumber);
                  }}
                  className="p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 cursor-pointer transition-colors space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-zinc-100 flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/40 inline-block shrink-0"
                        style={{ backgroundColor: layer.dyeColorHex }}
                      />
                      <span>
                        Camada {layer.layerNumber}: {layer.loomPatternName}
                      </span>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      Slot de Corante: {layer.dyeColor}
                    </span>
                  </div>

                  {layer.patternStencilRequired && (
                    <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 font-mono text-[11px]">
                      📜 Exige no 3º Slot do Tear: {layer.patternStencilRequired} (O molde não é consumido!)
                    </div>
                  )}

                  <p className="text-zinc-300 leading-relaxed">{layer.visualExplanation}</p>
                </div>
              ))}
            </div>

            {/* Final Step: Apply to Shield + Copy /give Command */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">
                    Dica de Ouro — Clone Seu Estandarte Antes de Colocar no Escudo!
                  </strong>{' '}
                  Se você colocar o Estandarte decorado ao lado de um Estandarte liso da mesma cor base na bancada, você cria uma <strong>cópia idêntica de graça</strong>! Assim você guarda a matriz num baú e pode estampar quantos Escudos quiser.
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <code className="font-mono text-[11px] text-zinc-300 truncate">
                  {activeBanner.giveCommand}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyCommand(activeBanner.giveCommand, activeBanner.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-colors"
                >
                  {copiedBannerCmd === activeBanner.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Comando Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar /give Banner</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
