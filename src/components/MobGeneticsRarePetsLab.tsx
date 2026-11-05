import React, { useState, useMemo } from 'react';
import {
  Check,
  Compass,
  Copy,
  Heart,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useDimensionTheme } from '../context/ThemeContext';

interface WolfVariantItem {
  id: string;
  name: string;
  englishName: string;
  coatColorBadge: string;
  biomeName: string;
  packSize: string;
  rarityNote: string;
  locateBiomeCommand: string;
}

const WOLF_VARIANTS_DATA: WolfVariantItem[] = [
  {
    id: 'snowy-wolf',
    name: '1. Lobo Nevado (Branco Ártico)',
    englishName: 'Snowy Wolf',
    coatColorBadge: 'Pelagem Branca Pura',
    biomeName: 'Bosque Nevado (Grove — na encosta de montanhas de neve)',
    packSize: 'Nasce sempre Solitário (1 por vez)',
    rarityNote:
      'O Lobo mais raro do jogo! Ao contrário dos outros que nascem em matilhas de 4, o Lobo Nevado sempre nasce sozinho.',
    locateBiomeCommand: '/locate biome minecraft:grove',
  },
  {
    id: 'rusty-wolf',
    name: '2. Lobo Enferrujado (Raposa Vermelha)',
    englishName: 'Rusty Wolf',
    coatColorBadge: 'Laranja Avermelhado',
    biomeName: 'Selva Esparsa (Sparse Jungle)',
    packSize: 'Matilha de 2 a 4 lobos',
    rarityNote:
      'Muito procurado por parecer uma raposa gigante ou cachorro Akita/Shiba Inu. Nasce nas bordas mais abertas das Selvas.',
    locateBiomeCommand: '/locate biome minecraft:sparse_jungle',
  },
  {
    id: 'black-wolf',
    name: '3. Lobo Negro (Pelagem Escura)',
    englishName: 'Black Wolf',
    coatColorBadge: 'Preto Intenso',
    biomeName: 'Taiga Antiga de Pinheiros (Old Growth Pine Taiga)',
    packSize: 'Matilha de 2 a 4 lobos',
    rarityNote:
      'Fica incrível usando Armadura de Lobo tingida de Vermelho ou Ciano! Encontrado nas Taigas gigantes com chão de Podzol.',
    locateBiomeCommand: '/locate biome minecraft:old_growth_pine_taiga',
  },
  {
    id: 'striped-wolf',
    name: '4. Lobo Listrado (Hiena dos Ermos)',
    englishName: 'Striped Wolf',
    coatColorBadge: 'Amarelo com Listras Escuras',
    biomeName: 'Ermos Arborizados (Wooded Badlands / Mesa)',
    packSize: 'Matilha de 4 a 8 lobos!',
    rarityNote:
      'Nasce no mesmo bioma onde vivem muitos Tatus! Você já doma o Lobo Listrado e coleta as Escamas de Tatu para a armadura dele no mesmo lugar.',
    locateBiomeCommand: '/locate biome minecraft:wooded_badlands',
  },
  {
    id: 'spotted-wolf',
    name: '5. Lobo Malhado (Cão Caçador Africano)',
    englishName: 'Spotted Wolf',
    coatColorBadge: 'Manchado Laranja, Branco e Preto',
    biomeName: 'Planalto de Savana (Savanna Plateau)',
    packSize: 'Matilha de 4 a 8 lobos!',
    rarityNote:
      'Nasce exclusivamente no topo dos planaltos altos de Savana, também lado a lado com os Tatus.',
    locateBiomeCommand: '/locate biome minecraft:savanna_plateau',
  },
  {
    id: 'ashen-wolf',
    name: '6. Lobo Cinzento (Fantasma da Neve)',
    englishName: 'Ashen Wolf',
    coatColorBadge: 'Cinza Azulado Frio',
    biomeName: 'Taiga Nevada (Snowy Taiga)',
    packSize: 'Matilha de 2 a 4 lobos',
    rarityNote:
      'Pelagem acinzentada camuflada para regiões frias. Muito fácil de encontrar procurando pinheiros cobertos de neve.',
    locateBiomeCommand: '/locate biome minecraft:snowy_taiga',
  },
  {
    id: 'chestnut-wolf',
    name: '7. Lobo Castanho',
    englishName: 'Chestnut Wolf',
    coatColorBadge: 'Marrom Escuro com Peito Claro',
    biomeName: 'Taiga Antiga de Abetos (Old Growth Spruce Taiga)',
    packSize: 'Matilha de 2 a 4 lobos',
    rarityNote:
      'Irmão do Lobo Negro, mas exclusivo das Taigas Antigas de Abetos (aquelas com árvores grossas em formato de cone).',
    locateBiomeCommand: '/locate biome minecraft:old_growth_spruce_taiga',
  },
  {
    id: 'woods-wolf',
    name: '8. Lobo dos Bosques (O Mais Comum)',
    englishName: 'Woods Wolf',
    coatColorBadge: 'Marrom Médio Florestal',
    biomeName: 'Floresta Comum (Forest)',
    packSize: 'Matilha de 4 lobos',
    rarityNote:
      'Como o bioma de Floresta comum é o mais abundante do Overworld, esta passou a ser a variante mais fácil de achar no início do Survival!',
    locateBiomeCommand: '/locate biome minecraft:forest',
  },
  {
    id: 'pale-wolf',
    name: '9. Lobo Pálido (O Clássico de 2011)',
    englishName: 'Pale Wolf',
    coatColorBadge: 'Branco Acinzentado Clássico',
    biomeName: 'Taiga Comum (Taiga sem neve)',
    packSize: 'Matilha de 4 lobos',
    rarityNote:
      'O lobo original do Minecraft desde a versão Beta 1.4! Hoje ele nasce especificamente na Taiga comum.',
    locateBiomeCommand: '/locate biome minecraft:taiga',
  },
];

const RARE_PETS_DOSSIERS = [
  {
    id: 'wolf-armadillo-armor',
    title: '🛡️ Armadura de Lobo (Tatu / Armadillo Scutes) — Sobrevive a Creeper!',
    tag: 'Novidade 1.20.5 / 1.21',
    summary:
      'Os lobos domesticados agora têm 40 de Vida (20 Corações, o dobro de antes!) e podem vestir a Armadura de Lobo feita com 6 Escamas de Tatu.',
    mechanics: [
      'Onde achar Tatus: Biomas de Savana (Savanna) e Ermos (Badlands). Nunca bata no Tatu (ele se enrola e não dropa nada ao morrer!).',
      'Truque do Pincel (Brush): Faça um Pincel (1 Pena + 1 Barra de Cobre + 1 Graveto) e clique com o botão direito no Tatu várias vezes! Ele solta Escamas na hora sem você precisar esperar 5 minutos.',
      'Absorção de 100% do Dano: Enquanto a Armadura de Lobo não quebrar, o seu cachorro recebe ZERO dano de vida! Ele aguenta até uma explosão de Creeper à queima-roupa.',
      'Como Consertar e Tingir: Quando a armadura do lobo aparecer rachada, clique nele com mais Escamas de Tatu para restaurar 100% da durabilidade. Você também pode tingi-la com qualquer corante na bancada!',
    ],
  },
  {
    id: 'arctic-fox-sword',
    title: '🦊 Raposa Branca do Ártico com Espada de Netherita na Boca!',
    tag: 'Guarda-Costas Secreto',
    summary:
      'Pouca gente sabe: quando você cruza duas Raposas com Bagas Doces (Sweet Berries), o filhote nasce leal a você e ataca qualquer monstro que tentar te bater — usando a arma que estiver na boca dele!',
    mechanics: [
      'Como Domesticar: Raposas adultas sempre fogem de você. Chegue agachado (Shift) de noite e dê Bagas Doces (Sweet Berries) ou Bagas Brilhantes para 2 raposas. O filhote que nascer será seu amigo! Prenda o filhote numa Guia (Lead) até crescer.',
      'Dano da Espada na Boca: Se você jogar uma Espada com Afiação V, Aspecto Flamejante II e Saque III no chão perto da sua raposa domesticada, ela pega a espada na boca!',
      'O Ataque da Raposa aplica 100% dos encantamentos da espada (incluindo Fogo e Saque III nos drops!), e a espada NÃO gasta durabilidade na boca dela!',
    ],
  },
  {
    id: 'cats-creepers-phantoms',
    title: '🐈 Gatos de Vila: Escudo Anti-Creeper & Presentes ao Acordar',
    tag: 'Proteção de Base',
    summary:
      'Domar Gatos nas vilas (com Bacalhau ou Salmão cru) não é só decoração: eles têm 2 mecânicas técnicas vitais para qualquer base Survival.',
    mechanics: [
      'Campo de Força Anti-Creeper e Anti-Phantom: Creepers fogem aterrorizados de qualquer Gato em um raio de 6 blocos, e Phantoms (Fantasmas da insônia) nunca conseguem dar rasante em você se houver um gato perto!',
      'Presentes da Manhã (70% de chance ao dormir): Se você deixar um gato solto (não sentado) perto da sua cama quando dormir, ao acordar ele traz presentes raros como Membrana de Phantom, Linha de Aranha e Pés de Coelho!',
    ],
  },
  {
    id: 'brown-panda-parrots',
    title: '🐼 Panda Marrom (1,9%) & Papagaios Dançarinos (Cuidado com o Biscoito!)',
    tag: 'Colecionador na Selva',
    summary:
      'As Selvas (Jungles) escondem os dois animais mais carismáticos do jogo: os Pandas com código genético recessivo e os Papagaios que imitam sons de monstros.',
    mechanics: [
      'Genética Real dos Pandas: O Panda Marrom e o Panda Fraco (que espirra Bola de Slime!) possuem genes recessivos. Cruze dois Pandas cercados por pelo menos 8 blocos de Bambu plantados ao redor.',
      'Regra Vital dos Papagaios: Dome Papagaios APENAS com Sementes (Trigo, Melancia, Abóbora ou Beterraba). NUNCA dê Biscoito (Cookie) para um Papagaio — o chocolate é tóxico para aves e mata o papagaio instantaneamente!',
      'Festa com Jukebox: Coloque um Disco de Música em uma Jukebox perto dos seus papagaios para todos eles começarem a dançar e mudar de cor!',
    ],
  },
];

export const MobGeneticsRarePetsLab: React.FC = () => {
  const { playSound } = useDimensionTheme();

  // Horse Genetics Calculator State
  const [parentASpeed, setParentASpeed] = useState<number>(11.5);
  const [parentBSpeed, setParentBSpeed] = useState<number>(13.2);
  const [parentAJump, setParentAJump] = useState<number>(3.8);
  const [parentBJump, setParentBJump] = useState<number>(4.6);

  // Blue Axolotl Probability Calculator State
  const [axolotlBreeds, setAxolotlBreeds] = useState<number>(400);

  // Selected Wolf Variant Copy Feedback
  const [copiedCmdId, setCopiedCmdId] = useState<string | null>(null);

  // Official Horse Breeding Genetics Calculation
  // Minecraft averages Parent A + Parent B + a random third horse value (mean ~9.56 b/s speed, ~2.76b jump)
  const horseOffspringStats = useMemo(() => {
    const speciesMeanSpeed = 9.56;
    const speciesMaxRandomSpeed = 14.23;
    const speciesMinRandomSpeed = 4.84;

    const expectedSpeed = Number(((parentASpeed + parentBSpeed + speciesMeanSpeed) / 3).toFixed(2));
    const maxPossibleSpeed = Number(
      Math.min(14.23, (parentASpeed + parentBSpeed + speciesMaxRandomSpeed) / 3).toFixed(2)
    );
    const minPossibleSpeed = Number(
      Math.max(4.84, (parentASpeed + parentBSpeed + speciesMinRandomSpeed) / 3).toFixed(2)
    );

    const speciesMeanJump = 2.76;
    const expectedJump = Number(((parentAJump + parentBJump + speciesMeanJump) / 3).toFixed(2));
    const maxPossibleJump = Number(
      Math.min(5.29, (parentAJump + parentBJump + 5.29) / 3).toFixed(2)
    );

    return {
      expectedSpeed,
      maxPossibleSpeed,
      minPossibleSpeed,
      expectedJump,
      maxPossibleJump,
      speedVsSprintRatio: (maxPossibleSpeed / 5.61).toFixed(1),
    };
  }, [parentASpeed, parentBSpeed, parentAJump, parentBJump]);

  // Blue Axolotl 1 in 1200 Cumulative Probability
  const axolotlProbability = useMemo(() => {
    const singleChance = 1 / 1200;
    const cumulativeProb = (1 - Math.pow(1 - singleChance, axolotlBreeds)) * 100;
    const bucketsNeeded = axolotlBreeds * 2;
    return {
      percentage: cumulativeProb.toFixed(1),
      bucketsNeeded,
    };
  }, [axolotlBreeds]);

  const handleCopyCmd = (cmd: string, id: string) => {
    playSound('xp_orb');
    navigator.clipboard.writeText(cmd);
    setCopiedCmdId(id);
    setTimeout(() => setCopiedCmdId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Grid: 1) Horse Genetics Simulator + 2) Blue Axolotl 1/1200 Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Cols: Horse Breeding Genetics Simulator */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-5 mc-bevel-block flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Laboratório de Genética Equina (Cavalos Perfeitos)</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mt-0.5">
                  Simulador de Cruzamento: Velocidade Máxima (14,23 b/s) & Salto (5,29b)
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300">
                Alimento de Cruzamento: Maçã ou Cenoura Dourada
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              No código do Minecraft, o potro herda a média de <strong>(Pai + Mãe + 1 Terceiro Gene Aleatório) ÷ 3</strong>. Ajuste a velocidade e o salto dos seus dois cavalos atuais para ver o potencial máximo do filhote:
            </p>

            {/* Sliders for Parent A & Parent B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5">
                <div className="font-bold text-emerald-400">🐴 Cavalo A (Pai):</div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">Velocidade:</span>
                    <span className="text-zinc-100 font-bold">{parentASpeed} blocos/s</span>
                  </div>
                  <input
                    type="range"
                    min={4.8}
                    max={14.23}
                    step={0.1}
                    value={parentASpeed}
                    onChange={(e) => setParentASpeed(Number(e.target.value))}
                    aria-label="Velocidade do Cavalo A"
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">Salto:</span>
                    <span className="text-zinc-100 font-bold">{parentAJump} blocos</span>
                  </div>
                  <input
                    type="range"
                    min={1.2}
                    max={5.29}
                    step={0.1}
                    value={parentAJump}
                    onChange={(e) => setParentAJump(Number(e.target.value))}
                    aria-label="Salto do Cavalo A"
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5">
                <div className="font-bold text-amber-300">🐎 Cavalo B (Mãe):</div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">Velocidade:</span>
                    <span className="text-zinc-100 font-bold">{parentBSpeed} blocos/s</span>
                  </div>
                  <input
                    type="range"
                    min={4.8}
                    max={14.23}
                    step={0.1}
                    value={parentBSpeed}
                    onChange={(e) => setParentBSpeed(Number(e.target.value))}
                    aria-label="Velocidade do Cavalo B"
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">Salto:</span>
                    <span className="text-zinc-100 font-bold">{parentBJump} blocos</span>
                  </div>
                  <input
                    type="range"
                    min={1.2}
                    max={5.29}
                    step={0.1}
                    value={parentBJump}
                    onChange={(e) => setParentBJump(Number(e.target.value))}
                    aria-label="Salto do Cavalo B"
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Offspring Genetic Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40">
              <div className="text-[11px] text-emerald-300">Teto de Velocidade do Potro</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                Até {horseOffspringStats.maxPossibleSpeed} b/s
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Média: {horseOffspringStats.expectedSpeed} b/s (Máx: 14,23)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/40">
              <div className="text-[11px] text-amber-300">Teto de Salto do Potro</div>
              <div className="text-lg font-bold text-amber-400 mt-0.5">
                Até {horseOffspringStats.maxPossibleJump} blocos
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Média: {horseOffspringStats.expectedJump}b (Máx: 5,29)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Comparado a Correr a Pé</div>
              <div className="text-lg font-bold text-zinc-100 mt-0.5">
                {horseOffspringStats.speedVsSprintRatio}x mais rápido
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">
                Jogador correndo = 5,61 b/s
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Blue Axolotl 1 in 1200 Calculator */}
        <div className="lg:col-span-5 rounded-2xl border border-indigo-500/40 bg-slate-950/95 p-6 space-y-5 mc-bevel-block flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-violet-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>O Pet Mais Raro do Minecraft (0,083%)</span>
              </span>
              <span className="font-mono text-indigo-300">1 em 1.200</span>
            </div>

            <h3 className="text-xl font-bold text-zinc-100">
              Calculadora do Lendário Axolote Azul (Mudkip)
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed">
              O <strong>Axolote Azul</strong> nunca nasce sozinho nas cavernas! Ele só pode ser obtido cruzando dois Axolotes com <strong>Baldes de Peixe Tropical</strong> (chance exata de <code>1 / 1.200</code> por filhote).
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="axolotl-breeds-slider" className="text-zinc-300 font-bold">
                  Quantos Filhotes Você Cruzou:
                </label>
                <span className="font-mono font-bold text-violet-300 text-sm">
                  {axolotlBreeds} cruzamentos
                </span>
              </div>

              <input
                id="axolotl-breeds-slider"
                type="range"
                min={10}
                max={3000}
                step={10}
                value={axolotlBreeds}
                onChange={(e) => setAxolotlBreeds(Number(e.target.value))}
                className="w-full accent-violet-400 cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-2.5 pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40">
                  <div className="text-[10px] text-indigo-300">Chance Acumulada</div>
                  <div className="text-lg font-bold text-violet-300">
                    {axolotlProbability.percentage}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400">Peixes Tropicais Gastos</div>
                  <div className="text-sm font-bold text-zinc-200 mt-0.5">
                    {axolotlProbability.bucketsNeeded} Baldes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 space-y-2">
            <div className="text-[11px] text-zinc-400">
              Quer invocar o Axolote Azul agora no seu mundo para ver de perto?
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs">
              <code className="text-violet-300 truncate">
                /summon minecraft:axolotl ~ ~ ~ &#123;Variant:4&#125;
              </code>
              <button
                type="button"
                onClick={() =>
                  handleCopyCmd(
                    '/summon minecraft:axolotl ~ ~ ~ {Variant:4}',
                    'summon-blue-axolotl'
                  )
                }
                className="px-3 py-1 rounded-lg bg-violet-500 hover:bg-violet-400 text-slate-950 font-sans font-bold text-xs shrink-0 transition-colors"
              >
                {copiedCmdId === 'summon-blue-axolotl' ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: All 9 Wolf Variants Biome Atlas */}
      <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-5 mc-bevel-block">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Coleção Completa 1.20.5 / 1.21 — As 9 Raças de Lobos por Bioma</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5">
              Onde Encontrar Cada uma das 9 Variantes de Lobos (+ Comando /locate biome)
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Dica: Leve Ossos + Guia (Lead) ou Barco!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WOLF_VARIANTS_DATA.map((wolf) => (
            <div
              key={wolf.id}
              className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-semibold">{wolf.coatColorBadge}</span>
                  <span className="font-mono text-zinc-500">{wolf.englishName}</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-100">🐺 {wolf.name}</h4>
                <div className="text-xs text-amber-300 font-medium">
                  Bioma: {wolf.biomeName}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{wolf.rarityNote}</p>
              </div>

              <div className="pt-2.5 border-t border-zinc-800/90 flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-zinc-400 truncate">{wolf.locateBiomeCommand}</span>
                <button
                  type="button"
                  onClick={() => handleCopyCmd(wolf.locateBiomeCommand, wolf.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 shrink-0 font-sans font-semibold flex items-center gap-1"
                >
                  {copiedCmdId === wolf.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Localizar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Wolf Armor (Armadillo), Sword-Wielding Foxes, Cats & Pandas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {RARE_PETS_DOSSIERS.map((pet) => (
          <div
            key={pet.id}
            className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-4 mc-bevel-block flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{pet.tag}</span>
                </span>
                <span className="font-mono text-zinc-500">Survival 100%</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-zinc-100">{pet.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{pet.summary}</p>

              <div className="space-y-2 pt-1">
                {pet.mechanics.map((mec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 flex items-start gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{mec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
