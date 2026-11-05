import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Swords,
  Zap,
} from 'lucide-react';
import { useDimensionTheme } from '../context/ThemeContext';

interface BossTacticDossier {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  dangerRating: string;
  exclusiveRewards: string[];
  goldenRule: string;
  LoadoutChecklist: string[];
  stepByStepCheese: {
    step: number;
    title: string;
    detail: string;
    proTrick: string;
  }[];
  locateCommand: string;
}

const BOSS_DOSSIERS: BossTacticDossier[] = [
  {
    id: 'wither-bedrock-cheese',
    name: '1. Wither Boss Preso na Bedrock (Matar em 15s Sem Dano)',
    subtitle:
      'Nunca invoque o Wither ao ar livre perto da sua casa! Prenda a cabeça dele debaixo do Portal do The End para ele sufocar sozinho.',
    badge: 'Sinalizador (Beacon)',
    dangerRating: 'Risco Zero (Com Armadilha de Bedrock)',
    exclusiveRewards: [
      'Estrela do Nether (Nether Star) — obrigatória para fabricar o Sinalizador (Beacon)',
      'Rosa do Wither (Wither Rose) — quando o Wither mata mobs próximos (usada em Mega Farms)',
    ],
    goldenRule:
      'O Wither é classificado como Morto-Vivo (Undead) no código do Java! Uma Espada com Julgamento V (Smite V) causa +12,5 de dano extra por golpe nele, enquanto Afiação V (Sharpness V) causa apenas +3!',
    LoadoutChecklist: [
      '3 Crânios de Esqueleto Wither (obtidos na Fortaleza do Nether com Saque III)',
      '4 Areias das Almas (Soul Sand) ou Terra das Almas (Soul Soil)',
      '4 Blocos de Obsidiana (para montar a plataforma embaixo do portal do The End)',
      'Espada de Diamante/Netherita com Julgamento V (Smite V) + Poção de Força II',
    ],
    stepByStepCheese: [
      {
        step: 1,
        title: 'Cave embaixo do Portal de Saída do The End (Após derrotar o Dragão)',
        detail:
          'Vá até a fonte de Bedrock no centro da ilha do The End. Cave um túnel por baixo da bacia de Bedrock deixando exatamente 2 blocos de ar entre o fundo da Bedrock e a sua plataforma.',
        proTrick:
          'O pilar central de Bedrock tem um bloco mais baixo no meio. A plataforma de Obsidiana deve ficar exatamente 2 blocos abaixo desse piso da bacia!',
      },
      {
        step: 2,
        title: 'Deite o "T" de Areia das Almas na Horizontal',
        detail:
          'Em vez de montar o Wither em pé, coloque os 4 blocos de Areia das Almas deitados na horizontal sobre a Obsidiana, com a base do "T" apontando para o pilar central do portal.',
        proTrick:
          'Nunca coloque os 3 Crânios antes de conferir a altura: deve haver apenas 1 bloco de espaço vazio entre a Areia das Almas e o teto de Bedrock.',
      },
      {
        step: 3,
        title: 'Coloque os 3 Crânios e Afaste-se por 10 Segundos',
        detail:
          'Coloque os 3 Crânios de Wither nas pontas da Areia das Almas. O Wither vai nascer com as cabeças presas dentro da Bedrock indestrutível do portal! Ele ficará totalmente cego e imóvel.',
        proTrick:
          'Espere a barra de vida dele carregar até 100% (quando ele explode ao nascer) e finalize em 6 golpes com sua Espada Julgamento V (Smite V)!',
      },
    ],
    locateCommand: '/locate structure minecraft:fortress',
  },
  {
    id: 'warden-ancient-city',
    name: '2. Cidade Ancestral (Ancient City) & Como Burlar o Warden',
    subtitle:
      'O Warden tem 500 de Vida (mais que o Dragão e o Wither juntos!) e não dropa nada útil ao morrer. O segredo é saquear tudo em silêncio absoluto.',
    badge: 'Passos Furtivos III & Maçã Encantada',
    dangerRating: 'Letal (Hit Kill mesmo de Netherita)',
    exclusiveRewards: [
      'Livro Encantado: Passos Furtivos III (Swift Sneak III) — andar agachado a 75% da velocidade normal!',
      'Maçãs Douradas Encantadas (Notch Apples) — até 2 ou 3 no mesmo baú!',
      'Fragmentos de Eco (Echo Shards) — para criar a Bússola de Recuperação que aponta onde você morreu',
      'Molde de Armadura "Silêncio" (Silence Armor Trim) — o mais raro do jogo (1,2% de chance)',
    ],
    goldenRule:
      'Blocos de Lã e Tapetes bloqueiam 100% das ondas sonoras! Sempre leve 2 Packs de Lã na mão secundária para cercar os Emissores de Sculk (Sculk Shriekers) antes de abrir qualquer baú.',
    LoadoutChecklist: [
      '2 a 3 Packs de Lã (qualquer cor) ou Tapetes — sua proteção principal',
      'Enxada (Hoe) de Diamante/Netherita com Eficiência V — a ferramenta oficial que quebra blocos de Sculk instantaneamente!',
      'Poções de Visão Noturna (8:00 min) — para enxergar a cidade inteira de longe',
      'Elytra + Foguetes ou Ender Pearls + Bolas de Neve (para distrair o Warden se ele nascer)',
    ],
    stepByStepCheese: [
      {
        step: 1,
        title: 'Entenda a Regra dos 4 Avisos do Emissor de Sculk (Sculk Shrieker)',
        detail:
          'O Warden NÃO nasce no primeiro barulho! Você tem direito a 3 erros (a tela pisca escura). Só no 4º grito do Sculk Shrieker é que o Warden emerge do chão. A cada 10 minutos sem fazer barulho, seu nível de alerta diminui em 1.',
        proTrick:
          'Andar agachado (Shift) nunca ativa sensores de Sculk, mesmo se você pisar diretamente em cima deles!',
      },
      {
        step: 2,
        title: 'A Técnica do Casulo de Lã nos Baús',
        detail:
          'Quase todo baú da Cidade Ancestral tem um Emissor de Sculk escondido ao lado. Chegue agachado (Shift), coloque blocos de Lã entre o baú e os sensores ao redor, e só então abra o baú!',
        proTrick:
          'Assim que achar o livro Passos Furtivos III (Swift Sneak III) e colocá-lo na sua calça, você poderá explorar o resto da cidade 3x mais rápido sem nunca sair do Shift!',
      },
      {
        step: 3,
        title: 'O Que Fazer se o Warden Acordar?',
        detail:
          'Não tente lutar no chão! O ataque sônico dele atravessa paredes, escudos e ignora encantamentos de Proteção IV. Continue no Shift, jogue Bolas de Neve ou Flechas longe de você para ele ir investigar o barulho, ou suba uma torre de 22 blocos de Lã.',
        proTrick:
          'Depois de 60 segundos sem ouvir nenhuma vibração sua e sem sentir seu cheiro de perto, o Warden cava de volta para a terra e desaparece!',
      },
    ],
    locateCommand: '/locate structure minecraft:ancient_city',
  },
  {
    id: 'trial-chambers-mace',
    name: '3. Trial Chambers (1.21), O Breeze & Como Forjar a Clava (Mace)',
    subtitle:
      'As Câmaras de Provação subterrâneas guardam a arma mais apelona da história do Minecraft: a Clava com dano infinito por altura de queda.',
    badge: 'Clava (Mace) & Wind Charge',
    dangerRating: 'Médio / Alto (Ominous Trial)',
    exclusiveRewards: [
      'Núcleo Pesado (Heavy Core) — drop exclusivo do Cofre Sinistro (Ominous Vault) para criar a Clava',
      'Livro Encantado: Rajada de Vento (Wind Burst I a III) — lança você de volta para o alto a cada golpe!',
      'Vara de Breeze (Breeze Rod) — faz 4 Cargas de Vento (Wind Charges) para super pulos ou o cabo da Clava',
      'Maçãs Douradas, Tridentes, Bestas Encantadas e Blocos de Esmeralda/Diamante',
    ],
    goldenRule:
      'O Breeze é 100% imune a Flechas e Tridentes — ele reflete qualquer projétil de volta na sua cara! Ataque o Breeze sempre com Espada corpo-a-corpo ou rebata as bolas de vento dele.',
    LoadoutChecklist: [
      'Mapa do Explorador das Câmaras de Provação (comprado no Aldeão Cartógrafo Nível 3)',
      'Garrafa Sinistra (Ominous Bottle I a V) — dropada por Capitães Pillagers ou Cofres normais',
      'Escudo + Espada com Afiação V + Balde de Água (para apagar efeitos ou subir paredes)',
      '1 Vara de Breeze + 1 Núcleo Pesado (Heavy Core) na bancada para montar a Clava',
    ],
    stepByStepCheese: [
      {
        step: 1,
        title: 'Limpe os Trial Spawners Normais Primeiro',
        detail:
          'Aproxime-se das gaiolas laranjas (Trial Spawners). Elas geram ondas de mobs proporcionais ao número de jogadores. Ao vencer todas as ondas, o Spawner ejeta recompensas e Chaves de Provação (Trial Keys) e entra em recarga por 30 minutos.',
        proTrick:
          'Use as Chaves Normais nos Cofres comuns para ganhar Garrafas Sinistras (Ominous Bottles) se você ainda não tiver uma!',
      },
      {
        step: 2,
        title: 'Beba a Garrafa Sinistra (Ominous Bottle) para Ativar o Modo Sinistro',
        detail:
          'Ao beber a Garrafa Sinistra perto de um Trial Spawner (mesmo que ele já esteja em recarga de 30 min!), ele pega fogo azul instantaneamente e vira um Ominous Trial Spawner! Os mobs nascem já equipados com armaduras de Diamante/Ferro com Moldes.',
        proTrick:
          'Vencendo o Spawner Azul, você tem 30% de chance de ganhar a Chave Sinistra (Ominous Trial Key — a chave azul/vermelha com 3 caveiras).',
      },
      {
        step: 3,
        title: 'Abra os Cofres Sinistros (Ominous Vaults) nas Salas Altas',
        detail:
          'Os Cofres Sinistros ficam escondidos nos andares superiores das salas grandes (procure o cofre escuro com três rostos brilhantes). Use a Chave Sinistra nele para ter 7,5% de chance de tirar o Núcleo Pesado (Heavy Core) e 5,5% do livro Wind Burst!',
        proTrick:
          'Cada jogador do servidor pode abrir o mesmo Cofre Sinistro 1 vez! Se o primeiro não dropar o Heavy Core, chame um amigo ou procure os outros 3 a 4 Cofres Sinistros da mesma Trial Chamber.',
      },
    ],
    locateCommand: '/locate structure minecraft:trial_chambers',
  },
  {
    id: 'ocean-monument-doors',
    name: '4. Monumento Oceânico (3 Elder Guardians) & Truque da Porta + TNT',
    subtitle:
      'Como invadir o templo subaquático e coletar todas as Esponjas em 5 minutos mesmo sob o efeito de Fadiga de Mineração III.',
    badge: 'Esponjas & Lanterna do Mar',
    dangerRating: 'Médio (Fadiga de Mineração III)',
    exclusiveRewards: [
      '30+ Esponjas Úmidas (secam na Fornalha e sugam 65 blocos de água instantaneamente!)',
      '8 Blocos de Ouro escondidos no núcleo central do monumento (72 Barras de Ouro)',
      'Molde de Armadura "Maré" (Tide Armor Trim) — drop de 20% dos Elder Guardians',
    ],
    goldenRule:
      'Debaixo d’água a TNT normalmente não quebra nenhum bloco, MAS se você colocar 1 bloco de Areia ou Cascalho em cima da TNT e acender, a areia cai dentro da TNT acesa e faz ela explodir a parede do Monumento inteira!',
    LoadoutChecklist: [
      '3 Portas de Madeira (no Java Edition, colocar uma porta no fundo do mar cria uma cabine de ar infinita!)',
      '3 TNTs + 3 Blocos de Areia + 3 Blocos de Redstone (para abrir o teto e as laterais sem picareta!)',
      'Tridente com Empalamento V (Impaling V) ou Espada com Afiação V',
      '2 Baldes de Leite + Poção de Invisibilidade (Guardians ignoram jogadores invisíveis sem armadura!)',
    ],
    stepByStepCheese: [
      {
        step: 1,
        title: 'O Truque da TNT com Areia para Ignorar a Fadiga de Mineração',
        detail:
          'Há sempre 1 Elder Guardian no topo da pirâmide e 1 em cada asa lateral (Esquerda e Direita). Pouse no topo do Monumento, coloque 1 TNT, ponha 1 Areia em cima da TNT e ative com um Bloco de Redstone ao lado.',
        proTrick:
          'A Areia cai dentro da entidade da TNT e engana a física da água: ela abre um buraco perfeito direto na cabeça do Elder Guardian sem você precisar tomar Leite!',
      },
      {
        step: 2,
        title: 'Cabine de Oxigênio Infinito com Portas de Madeira (Exclusivo Java)',
        detail:
          'Entrou no Monumento? Coloque uma Porta de Madeira no chão. No Minecraft Java, a porta não fica alagada (waterlogged) automaticamente: você entra no bloco da porta e recupera 100% das bolhas de ar e ainda fica protegido do laser dos Guardians fechando a porta!',
        proTrick:
          'O laser do Guardian é interrompido imediatamente se você fechar a porta ou ficar atrás de um pilar de Prismarinho.',
      },
      {
        step: 3,
        title: 'Dica Pro do Tridente com Empalamento V (Impaling V)',
        detail:
          'No Java Edition, o encantamento Empalamento V (Impaling V) do Tridente adiciona +12,5 de dano contra todas as criaturas marinhas (Guardians, Elder Guardians, Afogados, Lulas). Com 5 golpes críticos você elimina cada um dos 3 chefes!',
        proTrick:
          'Secar Esponjas no Nether é instantâneo: basta colocar a Esponja Úmida no chão do Nether que ela seca na hora sem gastar carvão na fornalha!',
      },
    ],
    locateCommand: '/locate structure minecraft:monument',
  },
];

const MACE_TARGETS = [
  { name: 'Zumbi / Creeper / Esqueleto', hp: 20, hearts: 10 },
  { name: 'Bruxa / Enderman / Piglin Bruto', hp: 50, hearts: 25 },
  { name: 'Golem de Ferro / Devastador (Ravager)', hp: 100, hearts: 50 },
  { name: 'Guardião-Mestre (Elder Guardian)', hp: 80, hearts: 40 },
  { name: 'Ender Dragon (Dragão do Fim)', hp: 200, hearts: 100 },
  { name: 'Wither Boss (Java Edition)', hp: 300, hearts: 150 },
  { name: 'O Warden (Guardião das Profundezas)', hp: 500, hearts: 250 },
];

export const BossesRaidTacticsLab: React.FC = () => {
  const { playSound } = useDimensionTheme();

  // Selected Boss Dossier
  const [selectedBossId, setSelectedBossId] = useState<string>(BOSS_DOSSIERS[0].id);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Interactive Mace (Clava 1.21) Fall Damage Simulator State
  const [fallHeightBlocks, setFallHeightBlocks] = useState<number>(22);
  const [densityLevel, setDensityLevel] = useState<number>(5);
  const [useStrengthTwo, setUseStrengthTwo] = useState<boolean>(true);

  const activeBoss =
    BOSS_DOSSIERS.find((b) => b.id === selectedBossId) || BOSS_DOSSIERS[0];

  // Official Minecraft 1.21 Mace Fall Damage Formula
  const maceCalculation = useMemo(() => {
    const baseWeaponDamage = 6 + (useStrengthTwo ? 6 : 0);
    if (fallHeightBlocks < 1.5) {
      return {
        totalDamage: baseWeaponDamage,
        totalHearts: (baseWeaponDamage / 2).toFixed(1),
        heightBonus: 0,
        densityBonus: 0,
      };
    }

    const tier1Blocks = Math.min(3, fallHeightBlocks);
    const tier2Blocks = Math.max(0, Math.min(5, fallHeightBlocks - 3));
    const tier3Blocks = Math.max(0, fallHeightBlocks - 8);

    const heightBonus = tier1Blocks * 4 + tier2Blocks * 2 + tier3Blocks * 1;
    const densityBonus = fallHeightBlocks * (0.5 * densityLevel);
    const totalDamage = Math.round(baseWeaponDamage + heightBonus + densityBonus);

    return {
      totalDamage,
      totalHearts: (totalDamage / 2).toFixed(1),
      heightBonus: Math.round(heightBonus),
      densityBonus: Math.round(densityBonus),
    };
  }, [fallHeightBlocks, densityLevel, useStrengthTwo]);

  const handleCopyCommand = (cmd: string, id: string) => {
    playSound('anvil');
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Interactive Simulator: 1.21 Mace (Clava) One-Shot Fall Damage Calculator */}
      <div className="rounded-2xl border border-amber-500/40 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Simulador Oficial Minecraft 1.21 — A Clava (Mace) & Dano de Queda Livre</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
              Calculadora de Hit Kill da Clava (Densidade V + Wind Charge)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Ajuste a altura do seu pulo para ver o dano exato da Clava e descobrir de quantos blocos você precisa cair para derrotar o <strong>Wither</strong> ou o <strong>Warden</strong> com <strong>1 único golpe</strong> (e zerar seu próprio dano de queda ao acertar!):
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/50 text-center shrink-0 min-w-[210px]">
            <div className="text-[11px] font-mono text-amber-300">Dano Total do Golpe</div>
            <div className="text-3xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
              {maceCalculation.totalDamage} HP
            </div>
            <div className="text-xs font-mono text-zinc-200 mt-0.5">
              ({maceCalculation.totalHearts} ❤️ Corações arrancados)
            </div>
          </div>
        </div>

        {/* Sliders & Enchantment Toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="mace-fall-slider" className="font-bold text-zinc-200">
                  Altura da Queda Livre:
                </label>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {fallHeightBlocks} blocos de altura
                </span>
              </div>

              <input
                id="mace-fall-slider"
                type="range"
                min={2}
                max={100}
                value={fallHeightBlocks}
                onChange={(e) => setFallHeightBlocks(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              {/* Quick Height Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
                {[
                  { h: 9, label: '9b (1 Wind Charge)' },
                  { h: 22, label: '22b (Hit Kill Golem/Ravager)' },
                  { h: 49, label: '49b (Hit Kill Dragão)' },
                  { h: 77, label: '77b (Hit Kill Wither)' },
                  { h: 95, label: '95b (Hit Kill WARDEN!)' },
                ].map((preset) => (
                  <button
                    key={preset.h}
                    type="button"
                    onClick={() => {
                      playSound('anvil');
                      setFallHeightBlocks(preset.h);
                    }}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      fallHeightBlocks === preset.h
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Density Level & Strength II */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-zinc-300 font-bold">Encantamento Densidade (Density):</div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setDensityLevel(lvl);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono font-bold border transition-colors ${
                        densityLevel === lvl
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {lvl === 0 ? 'Sem' : `V${lvl}`}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  Bônus Densidade: +{maceCalculation.densityBonus} de dano
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                <div className="text-zinc-300 font-bold">Poção de Força II (+6 Dano Base):</div>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setUseStrengthTwo((v) => !v);
                  }}
                  className={`w-full py-2 px-3 rounded-lg font-bold border transition-colors ${
                    useStrengthTwo
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {useStrengthTwo ? '✓ Poção de Força II Ativa' : 'Sem Poção de Força'}
                </button>
                <div className="text-[11px] text-zinc-400">
                  Acertar o alvo anula 100% do seu dano de queda!
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Boss One-Shot Kill Radar */}
          <div className="lg:col-span-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
            <div className="text-xs font-bold text-zinc-200 flex items-center justify-between">
              <span>Radar de Hit Kill (Quem morre com 1 golpe nesta altura?):</span>
              <span className="font-mono text-emerald-400">
                {maceCalculation.totalDamage} Dano vs Vida do Chefe
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MACE_TARGETS.map((mob) => {
                const isOneShot = maceCalculation.totalDamage >= mob.hp;
                const percentRemoved = Math.min(
                  100,
                  Math.round((maceCalculation.totalDamage / mob.hp) * 100)
                );

                return (
                  <div
                    key={mob.name}
                    className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                      isOneShot
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                        : 'bg-slate-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 font-bold">
                      <span className="truncate text-zinc-100">{mob.name}</span>
                      <span className="font-mono shrink-0">{mob.hp} HP</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono">
                      <span
                        className={
                          isOneShot ? 'text-emerald-400 font-bold' : 'text-amber-400'
                        }
                      >
                        {isOneShot ? '💀 HIT KILL (1 GOLPE!)' : `Tira ${percentRemoved}% da vida`}
                      </span>
                      <span>{mob.hearts} ❤️</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Boss & Raid Tactical Dossiers Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Selector Cards for the 4 Lethal Structures/Bosses */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-zinc-400 px-1">
            Escolha o Chefe ou Estrutura para Ver a Tática Infalível:
          </div>

          {BOSS_DOSSIERS.map((dossier) => {
            const isSelected = dossier.id === activeBoss.id;
            return (
              <button
                key={dossier.id}
                type="button"
                onClick={() => {
                  playSound('anvil');
                  setSelectedBossId(dossier.id);
                }}
                className={`w-full text-left p-5 rounded-2xl border transition-all mc-bevel-block ${
                  isSelected
                    ? 'bg-zinc-900 border-emerald-400 shadow-sm'
                    : 'bg-slate-950/90 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-emerald-400 font-semibold">{dossier.badge}</span>
                  <span className="font-mono text-amber-300">{dossier.dangerRating}</span>
                </div>
                <div className="text-base font-bold text-zinc-100 leading-snug">
                  {dossier.name}
                </div>
                <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {dossier.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right 7 Cols: Deep-Dive Tactical Guide */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Swords className="w-4 h-4" />
                <span>Recompensa Principal: {activeBoss.badge}</span>
              </span>
              <span className="font-mono text-amber-300">
                Periculosidade: {activeBoss.dangerRating}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">{activeBoss.name}</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {activeBoss.subtitle}
            </p>
          </div>

          {/* Golden Rule Highlight */}
          <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5">
                Regra de Ouro (O Que Ninguém Te Conta):
              </strong>
              {activeBoss.goldenRule}
            </div>
          </div>

          {/* Exclusive Loot & Inventory Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Recompensas Exclusivas:</span>
              </div>
              <ul className="space-y-1.5 text-zinc-200">
                {activeBoss.exclusiveRewards.map((rew, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-emerald-400 font-bold mr-1.5">•</span>
                    {rew}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                <span>O Que Levar no Inventário:</span>
              </div>
              <ul className="space-y-1.5 text-zinc-200">
                {activeBoss.LoadoutChecklist.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-amber-400 font-bold mr-1.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3-Step Tactical Execution */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-zinc-200">
              Execução Passo a Passo (Sem Perder Seus Itens):
            </div>

            {activeBoss.stepByStepCheese.map((st) => (
              <div
                key={st.step}
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs"
              >
                <div className="font-bold text-zinc-100 text-sm">
                  Passo 0{st.step}: {st.title}
                </div>
                <p className="text-zinc-300 leading-relaxed">{st.detail}</p>
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-300">Pulo do Gato: </strong>
                    {st.proTrick}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Locate Command Footer */}
          <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="font-mono text-zinc-400">
              Comando para achar no mapa:{' '}
              <code className="text-emerald-300">{activeBoss.locateCommand}</code>
            </div>
            <button
              type="button"
              onClick={() => handleCopyCommand(activeBoss.locateCommand, activeBoss.id)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
            >
              {copiedCmd === activeBoss.id ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Comando Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar /locate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
