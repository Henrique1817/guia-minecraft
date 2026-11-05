import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Check,
  Compass,
  Copy,
  Grid,
  Layers,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useDimensionTheme } from '../context/ThemeContext';

type ShapeMode = 'hollow-circle' | 'filled-circle' | 'dome-3d';
type WallStyle = 'thin' | 'thick';
type MaterialType =
  | 'stone-bricks'
  | 'concrete'
  | 'glass'
  | 'quartz-block'
  | 'blue-ice'
  | 'beacon-mineral';

interface MaterialInfo {
  id: MaterialType;
  name: string;
  blockColorClass: string;
  borderColorClass: string;
  description: string;
  computeRawIngredients: (totalBlocks: number) => {
    item: string;
    quantity: number;
    packsText: string;
    note: string;
  }[];
}

const formatPacksAndShulkers = (count: number): string => {
  const packs = Math.floor(count / 64);
  const rem = count % 64;
  if (packs === 0) return `${rem} un.`;
  if (rem === 0) return `${packs} Packs (64)`;
  return `${packs} Packs + ${rem} un.`;
};

const MATERIALS_DATABASE: MaterialInfo[] = [
  {
    id: 'stone-bricks',
    name: 'Tijolos de Pedra / Ardósia (Castelos & Torres)',
    blockColorClass: 'bg-zinc-500',
    borderColorClass: 'border-zinc-300',
    description:
      'O bloco estrutural clássico para muralhas, faróis, pontes e salões subterrâneos.',
    computeRawIngredients: (totalBlocks) => {
      const coalNeeded = Math.ceil(totalBlocks / 8);
      const lavaBuckets = Math.ceil(totalBlocks / 100);
      return [
        {
          item: 'Pedra Lisa (minerada com Picareta Toque Suave / Silk Touch)',
          quantity: totalBlocks,
          packsText: formatPacksAndShulkers(totalBlocks),
          note: 'Use o Cortador de Pedras (Stonecutter) ou bancada 2x2 para converter 1:1 sem perdas.',
        },
        {
          item: 'Carvão (se precisar assar Pedregulho na Fornalha)',
          quantity: coalNeeded,
          packsText: formatPacksAndShulkers(coalNeeded),
          note: `Ou apenas ${lavaBuckets} Balde(s) de Lava (cada balde assa 100 blocos na Superfornalha!).`,
        },
      ];
    },
  },
  {
    id: 'concrete',
    name: 'Concreto Colorido (Mega Bases Modernas)',
    blockColorClass: 'bg-emerald-500',
    borderColorClass: 'border-emerald-300',
    description:
      'Feito com Pó de Concreto (4 Areias + 4 Cascalhos + 1 Corante = 8 Blocos). Cor pura e sem textura ruidosa.',
    computeRawIngredients: (totalBlocks) => {
      const crafts = Math.ceil(totalBlocks / 8);
      const sandNeeded = crafts * 4;
      const gravelNeeded = crafts * 4;
      const dyeNeeded = crafts;
      return [
        {
          item: 'Blocos de Areia (Sand)',
          quantity: sandNeeded,
          packsText: formatPacksAndShulkers(sandNeeded),
          note: '4 Areias para cada receita de 8 Pós de Concreto.',
        },
        {
          item: 'Blocos de Cascalho (Gravel)',
          quantity: gravelNeeded,
          packsText: formatPacksAndShulkers(gravelNeeded),
          note: 'Dica Pro: Troque Ouro com Piglins no Nether para ganhar toneladas de Cascalho sem minerar!',
        },
        {
          item: 'Corante da Cor Escolhida (Dye)',
          quantity: dyeNeeded,
          packsText: formatPacksAndShulkers(dyeNeeded),
          note: 'Use Farinha de Osso (Bone Meal) em flores de 2 blocos de altura para gerar corantes infinitos.',
        },
      ];
    },
  },
  {
    id: 'glass',
    name: 'Vidro / Cúpula Subaquática (Ocean Dome)',
    blockColorClass: 'bg-cyan-400/80',
    borderColorClass: 'border-cyan-200',
    description:
      'Ideal para cúpulas no fundo do oceano, tetos de estufas de aldeões e tubos de observação.',
    computeRawIngredients: (totalBlocks) => {
      const coalNeeded = Math.ceil(totalBlocks / 8);
      return [
        {
          item: 'Blocos de Areia (Para assar na Superfornalha)',
          quantity: totalBlocks,
          packsText: formatPacksAndShulkers(totalBlocks),
          note: 'Dica Pro: Um Bibliotecário Nível 3 também vende 4 Blocos de Vidro por 1 Esmeralda!',
        },
        {
          item: 'Carvão / Carvão Vegetal (Combustível)',
          quantity: coalNeeded,
          packsText: formatPacksAndShulkers(coalNeeded),
          note: 'Leve sempre uma picareta com Toque Suave (Silk Touch) caso erre um bloco de vidro!',
        },
      ];
    },
  },
  {
    id: 'quartz-block',
    name: 'Bloco de Quartzo Liso (Laboratórios & Templos)',
    blockColorClass: 'bg-slate-100',
    borderColorClass: 'border-white',
    description:
      'O bloco branco mais nobre do jogo. Pode ser feito com Quartzo do Nether ou comprado de Aldeões Pedreiros.',
    computeRawIngredients: (totalBlocks) => {
      const netherQuartzItems = totalBlocks * 4;
      return [
        {
          item: 'Quartzos do Nether (Minério solto — 4 por Bloco)',
          quantity: netherQuartzItems,
          packsText: formatPacksAndShulkers(netherQuartzItems),
          note: 'Use Fortuna III no Nether OU compre Blocos de Quartzo prontos no Aldeão Pedreiro Nível 5 (Mestre)!',
        },
      ];
    },
  },
  {
    id: 'blue-ice',
    name: 'Gelo Azul (Estrada Turbo de Barco no Nether — 72 blocos/s)',
    blockColorClass: 'bg-sky-500',
    borderColorClass: 'border-sky-200',
    description:
      'O bloco mais rápido do jogo para Barcos no teto do Nether. Exige 81 Gelos Comuns para cada 1 Gelo Azul!',
    computeRawIngredients: (totalBlocks) => {
      const packedIce = totalBlocks * 9;
      const regularIce = totalBlocks * 81;
      return [
        {
          item: 'Gelo Compactado (Packed Ice — 9 para cada Gelo Azul)',
          quantity: packedIce,
          packsText: formatPacksAndShulkers(packedIce),
          note: `${Math.ceil(packedIce / 1728)} Shulker Boxes de Gelo Compactado.`,
        },
        {
          item: 'Gelo Comum (Ice — 81 para cada 1 Gelo Azul)',
          quantity: regularIce,
          packsText: formatPacksAndShulkers(regularIce),
          note: 'Dica de Veterano: Na estrada do Nether, coloque 1 Gelo Azul a cada 2 blocos (intercalado com ar) — o barco mantém 100% da velocidade gastando metade do gelo!',
        },
      ];
    },
  },
  {
    id: 'beacon-mineral',
    name: 'Blocos de Ferro / Esmeralda (Pirâmide de Beacon Nível 4)',
    blockColorClass: 'bg-amber-400',
    borderColorClass: 'border-amber-200',
    description:
      'Para ativar o Sinalizador (Beacon) com Pressa II (Haste II) e Velocidade II na sua base.',
    computeRawIngredients: (totalBlocks) => {
      const ingotsNeeded = totalBlocks * 9;
      return [
        {
          item: 'Barras de Ferro / Esmeraldas / Ouro / Diamante (9 por Bloco)',
          quantity: ingotsNeeded,
          packsText: formatPacksAndShulkers(ingotsNeeded),
          note: 'Uma Pirâmide Nível 4 completa (9x9 + 7x7 + 5x5 + 3x3) exige exatamente 164 Blocos (1.476 Barras/Esmeraldas).',
        },
      ];
    },
  },
];

const QUICK_DIAMETER_PRESETS = [
  { diameter: 9, label: '9×9 (Torre Compacta / Moinho)' },
  { diameter: 13, label: '13×13 (Farol / Casa Redonda)' },
  { diameter: 15, label: '15×15 (Torre de Magia / Portal)' },
  { diameter: 19, label: '19×19 (Salão de Baús Circular)' },
  { diameter: 23, label: '23×23 (Arena / Cúpula Média)' },
  { diameter: 27, label: '27×27 (Cúpula Oceânica)' },
  { diameter: 31, label: '31×31 (Mega Torre Central)' },
];

export const VoxelCircleShulkerLab: React.FC = () => {
  const { playSound } = useDimensionTheme();

  // Circle & Dome Generator State
  const [diameter, setDiameter] = useState<number>(15);
  const [shapeMode, setShapeMode] = useState<ShapeMode>('hollow-circle');
  const [wallStyle, setWallStyle] = useState<WallStyle>('thin');
  const [domeSliceLayer, setDomeSliceLayer] = useState<number>(1);
  const [towerHeight, setTowerHeight] = useState<number>(16);
  const [selectedMaterialId, setSelectedMaterialId] = useState<MaterialType>('stone-bricks');
  const [customBlockOverride, setCustomBlockOverride] = useState<string>('');
  const [markedCells, setMarkedCells] = useState<Record<string, boolean>>({});
  const [hoveredCoord, setHoveredCoord] = useState<{ x: number; z: number } | null>(null);
  const [copiedSequence, setCopiedSequence] = useState<boolean>(false);

  const activeMaterial =
    MATERIALS_DATABASE.find((m) => m.id === selectedMaterialId) || MATERIALS_DATABASE[0];

  const maxDomeLayers = Math.ceil(diameter / 2);
  const safeDomeLayer = Math.min(Math.max(1, domeSliceLayer), maxDomeLayers);

  // Compute the effective radius for the current 2D slice
  // If shapeMode === 'dome-3d', slice 1 is the equator (base of dome), slice maxDomeLayers is the top cap
  const currentSliceDiameter = useMemo(() => {
    if (shapeMode !== 'dome-3d') return diameter;
    const sphereRadius = diameter / 2;
    // Height from equator (0 at layer 1, up to sphereRadius - 0.5 at top)
    const yHeight = safeDomeLayer - 1;
    const sliceRadius = Math.sqrt(Math.max(0.25, sphereRadius * sphereRadius - yHeight * yHeight));
    const computedDiam = Math.max(1, Math.round(sliceRadius * 2));
    // Keep same parity (odd/even) as base diameter so center aligns!
    if (computedDiam % 2 !== diameter % 2) {
      return Math.max(1, computedDiam - 1);
    }
    return computedDiam;
  }, [diameter, shapeMode, safeDomeLayer]);

  // Generate 2D Voxel Grid for `diameter x diameter`
  const voxelGridData = useMemo(() => {
    const size = diameter;
    const center = (size - 1) / 2;
    const effectiveRadius = currentSliceDiameter / 2;

    // First compute filled mask for the slice radius
    const filled: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const dx = c - center;
        const dz = r - center;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist <= effectiveRadius - 0.02) {
          filled[r][c] = true;
        }
      }
    }

    // Now compute final active cells depending on hollow vs filled
    const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    let activeCount = 0;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!filled[r][c]) continue;

        if (shapeMode === 'filled-circle') {
          grid[r][c] = true;
          activeCount++;
        } else {
          // For dome top layer, fill completely so the roof is closed
          if (shapeMode === 'dome-3d' && safeDomeLayer === maxDomeLayers) {
            grid[r][c] = true;
            activeCount++;
            continue;
          }

          // Check neighbors to see if this cell is on the perimeter
          const neighbors4 = [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1],
          ];
          const neighbors8 = [
            ...neighbors4,
            [r - 1, c - 1],
            [r - 1, c + 1],
            [r + 1, c - 1],
            [r + 1, c + 1],
          ];

          const checkSet = wallStyle === 'thin' ? neighbors4 : neighbors8;
          const isEdge = checkSet.some(([nr, nc]) => {
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) return true;
            return !filled[nr][nc];
          });

          if (isEdge) {
            grid[r][c] = true;
            activeCount++;
          }
        }
      }
    }

    return { grid, activeCount, center };
  }, [diameter, currentSliceDiameter, shapeMode, wallStyle, safeDomeLayer, maxDomeLayers]);

  // Compute total blocks across entire 3D Dome when in dome-3d mode
  const totalDomeBlocks3D = useMemo(() => {
    const size = diameter;
    const center = (size - 1) / 2;
    const sphereRadius = diameter / 2;
    let total = 0;

    for (let layer = 1; layer <= maxDomeLayers; layer++) {
      const yHeight = layer - 1;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const dx = c - center;
          const dz = r - center;
          const dist3D = Math.sqrt(dx * dx + dz * dz + yHeight * yHeight);
          if (dist3D <= sphereRadius - 0.02 && dist3D >= sphereRadius - 1.15) {
            total++;
          }
        }
      }
    }
    return total;
  }, [diameter, maxDomeLayers]);

  // Compute Builder's Pocket Sequence (top row segments from center to corner)
  const builderPatternSequence = useMemo(() => {
    const size = diameter;
    const { grid } = voxelGridData;
    // Extract upper-right quadrant run lengths along rows starting from top-most active row
    const rowRuns: number[] = [];
    const halfStart = Math.floor(size / 2);

    for (let r = 0; r <= halfStart; r++) {
      let countInRow = 0;
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) countInRow++;
      }
      // For the very top row of the circle, we take the full flat cap length
      if (rowRuns.length === 0 && countInRow > 0) {
        rowRuns.push(countInRow);
      } else if (rowRuns.length > 0) {
        // Count how many blocks exist on the right half of this row before it turns vertical
        let rightRun = 0;
        for (let c = halfStart; c < size; c++) {
          if (grid[r][c] && (r === 0 || !grid[r - 1][c])) {
            rightRun++;
          }
        }
        if (rightRun > 0 && rowRuns.length < 6) {
          rowRuns.push(rightRun);
        }
      }
    }

    if (rowRuns.length === 0) return `${currentSliceDiameter}`;
    return rowRuns.join(' — ');
  }, [diameter, currentSliceDiameter, voxelGridData]);

  // Total blocks for Shulker Calculator
  const computedProjectBlocks = useMemo(() => {
    if (customBlockOverride.trim() !== '') {
      const parsed = parseInt(customBlockOverride, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    if (shapeMode === 'dome-3d') {
      return totalDomeBlocks3D;
    }
    return voxelGridData.activeCount * Math.max(1, towerHeight);
  }, [customBlockOverride, shapeMode, totalDomeBlocks3D, voxelGridData.activeCount, towerHeight]);

  // Inventory breakdowns
  const fullPacks64 = Math.floor(computedProjectBlocks / 64);
  const leftoverBlocks = computedProjectBlocks % 64;
  const shulkerBoxesNeeded = (computedProjectBlocks / 1728).toFixed(2);
  const doubleChestsNeeded = (computedProjectBlocks / 3456).toFixed(2);

  const rawIngredientsList = useMemo(
    () => activeMaterial.computeRawIngredients(computedProjectBlocks),
    [activeMaterial, computedProjectBlocks]
  );

  const toggleCellMark = (r: number, c: number) => {
    playSound('click');
    const key = `${r}-${c}`;
    setMarkedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopySequence = () => {
    playSound('piston');
    const summary = `Mapa Voxel CraftLab (${diameter}x${diameter}) | Modo: ${
      shapeMode === 'dome-3d'
        ? `Cúpula 3D (Camada ${safeDomeLayer}/${maxDomeLayers})`
        : shapeMode === 'filled-circle'
        ? 'Disco Preenchido'
        : 'Torre/Muralha Oca'
    } | Sequência da Curva: [${builderPatternSequence}] | Blocos desta camada: ${
      voxelGridData.activeCount
    } | Total Projeto: ${computedProjectBlocks} blocos (${shulkerBoxesNeeded} Shulker Boxes)`;
    navigator.clipboard.writeText(summary);
    setCopiedSequence(true);
    setTimeout(() => setCopiedSequence(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner explaining the Voxel Architect + Shulker Box Calculator */}
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-5 sm:p-6 space-y-2 mc-bevel-block">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm sm:text-base font-bold text-emerald-300 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>
              Arquitetura Voxel: Gerador de Círculos, Torres & Cúpulas 3D + Calculadora de Shulker Boxes
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            Clique nos blocos do grid para marcar seu progresso!
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Construir torres redondas, faróis ou cúpulas subaquáticas no olho sempre acaba ficando torto. Escolha o <strong>Diâmetro</strong> abaixo, copie a <strong>Sequência de Curva</strong> e veja automaticamente quantos <strong>Packs de 64</strong>, <strong>Shulker Boxes</strong> e matérias-primas (Areia, Cascalho, Carvão, Gelo) levar na mochila!
        </p>
      </div>

      {/* Main 12-Col Layout: Left 7 Cols = Interactive Voxel Circle/Dome Grid | Right 5 Cols = Shulker & Raw Material Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 7 COLS: INTERACTIVE VOXEL CIRCLE & DOME GENERATOR */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-6 mc-bevel-block">
          {/* Controls Row 1: Shape Mode & Wall Thickness */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'hollow-circle', label: '⭕ Torre / Muralha Oca' },
                  { id: 'filled-circle', label: '🟢 Piso / Disco Cheio' },
                  { id: 'dome-3d', label: '🌐 Cúpula 3D (Camadas Y)' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setShapeMode(mode.id);
                    setMarkedCells({});
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    shapeMode === mode.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {shapeMode !== 'filled-circle' && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setWallStyle('thin');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    wallStyle === 'thin'
                      ? 'bg-zinc-100 text-slate-950 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Borda Fina (1x)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setWallStyle('thick');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    wallStyle === 'thick'
                      ? 'bg-zinc-100 text-slate-950 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Borda Dupla (Sem Quinas Abertas)
                </button>
              </div>
            )}
          </div>

          {/* Controls Row 2: Diameter Slider + Quick Presets */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="voxel-diameter-slider" className="text-xs font-bold text-zinc-200">
                Diâmetro do Círculo / Cúpula:{' '}
                <span className="text-emerald-400 font-mono text-sm">
                  {diameter} × {diameter} blocos
                </span>{' '}
                <span className="text-zinc-400 font-normal">
                  ({diameter % 2 === 1 ? 'Centro Ímpar 1×1 — Recomendado' : 'Centro Par 2×2 — Portas Duplas'})
                </span>
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDiameter((d) => Math.max(5, d - 2));
                    setMarkedCells({});
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
                >
                  -2
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDiameter((d) => Math.max(5, d - 1));
                    setMarkedCells({});
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDiameter((d) => Math.min(35, d + 1));
                    setMarkedCells({});
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDiameter((d) => Math.min(35, d + 2));
                    setMarkedCells({});
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
                >
                  +2
                </button>
              </div>
            </div>

            <input
              id="voxel-diameter-slider"
              type="range"
              min={5}
              max={35}
              value={diameter}
              onChange={(e) => {
                setDiameter(Number(e.target.value));
                setMarkedCells({});
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            {/* Quick Diameter Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {QUICK_DIAMETER_PRESETS.map((preset) => (
                <button
                  key={preset.diameter}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDiameter(preset.diameter);
                    setMarkedCells({});
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                    diameter === preset.diameter
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Dome Layer Slicer (Visible when shapeMode === 'dome-3d') */}
          {shapeMode === 'dome-3d' && (
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-indigo-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <span>
                    Fatiador de Cúpula 3D — Camada Atual: Y = {safeDomeLayer} de {maxDomeLayers}
                  </span>
                </span>
                <span className="font-mono text-violet-300">
                  Diâmetro desta Camada: {currentSliceDiameter}×{currentSliceDiameter} blocos
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDomeSliceLayer((l) => Math.max(1, l - 1));
                  }}
                  className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 shrink-0"
                >
                  ⬇ Camada Abaixo
                </button>
                <input
                  type="range"
                  min={1}
                  max={maxDomeLayers}
                  value={safeDomeLayer}
                  onChange={(e) => setDomeSliceLayer(Number(e.target.value))}
                  aria-label="Selecionar camada de altura Y da cúpula"
                  className="w-full accent-violet-400 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDomeSliceLayer((l) => Math.min(maxDomeLayers, l + 1));
                  }}
                  className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 shrink-0"
                >
                  ⬆ Camada Acima
                </button>
              </div>
              <p className="text-[11px] text-indigo-200/80">
                Comece na <strong>Camada 1 (Base no chão)</strong> e vá subindo 1 andar por vez até fechar a tampa da cúpula na Camada {maxDomeLayers}!
              </p>
            </div>
          )}

          {/* Builder's Pocket Formula Bar */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] text-zinc-400">
                Sequência de Blocos da Curva (Do Topo/Centro até a Quina):
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-emerald-400">
                [ {builderPatternSequence} ]
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {Object.keys(markedCells).length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setMarkedCells({});
                  }}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar Marcações</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopySequence}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedSequence ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Guia da Curva</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive 2D Voxel Blueprint Canvas */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center space-y-3 overflow-x-auto">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <span>
                Blocos nesta camada:{' '}
                <strong className="text-emerald-400">{voxelGridData.activeCount} blocos</strong>
              </span>
              <span>
                {hoveredCoord
                  ? `Coordenada do Bloco: X=${hoveredCoord.x}, Z=${hoveredCoord.z}`
                  : 'Passe o mouse ou clique nos blocos para marcar como construído'}
              </span>
            </div>

            <div
              className="grid gap-[2px] bg-slate-950 p-2.5 rounded-xl border border-zinc-800 w-full max-w-[500px] aspect-square"
              style={{
                gridTemplateColumns: `repeat(${diameter}, minmax(0, 1fr))`,
              }}
            >
              {voxelGridData.grid.map((row, rIdx) =>
                row.map((isActive, cIdx) => {
                  const relX = Math.round(cIdx - voxelGridData.center);
                  const relZ = Math.round(rIdx - voxelGridData.center);
                  const isCenter = Math.abs(cIdx - voxelGridData.center) < 0.6 && Math.abs(rIdx - voxelGridData.center) < 0.6;
                  const isAxis =
                    Math.abs(cIdx - voxelGridData.center) < 0.6 ||
                    Math.abs(rIdx - voxelGridData.center) < 0.6;
                  const cellKey = `${rIdx}-${cIdx}`;
                  const isMarkedDone = !!markedCells[cellKey];

                  return (
                    <button
                      key={cellKey}
                      type="button"
                      onClick={() => isActive && toggleCellMark(rIdx, cIdx)}
                      onMouseEnter={() => setHoveredCoord({ x: relX, z: relZ })}
                      onMouseLeave={() => setHoveredCoord(null)}
                      aria-label={`Bloco X ${relX} Z ${relZ}`}
                      className={`w-full h-full rounded-[2px] transition-all flex items-center justify-center ${
                        isActive
                          ? isMarkedDone
                            ? 'bg-lime-400 border border-white scale-95'
                            : `${activeMaterial.blockColorClass} border ${activeMaterial.borderColorClass} hover:brightness-125`
                          : isCenter
                          ? 'bg-amber-500/40 border border-amber-400/70'
                          : isAxis
                          ? 'bg-zinc-800/70'
                          : 'bg-zinc-900/40'
                      }`}
                    >
                      {isCenter && !isActive && (
                        <span className="text-[8px] font-mono text-amber-300 font-bold">+</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500/50 border border-amber-400 inline-block" />
                Centro (0, 0) e Linhas Guia
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-sm ${activeMaterial.blockColorClass} border ${activeMaterial.borderColorClass} inline-block`}
                />
                Bloco do Círculo ({ voxelGridData.activeCount } un.)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-lime-400 border border-white inline-block" />
                Marcado como Construído ({Object.values(markedCells).filter(Boolean).length})
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: SHULKER BOX, PACKS & RAW MATERIAL DECOMPOSER */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-6 mc-bevel-block">
          <div className="space-y-1 border-b border-zinc-800 pb-4">
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Boxes className="w-4 h-4" />
              <span>Logística de Construção Survival</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-100">
              Calculadora de Packs, Baús Duplos & Shulker Boxes
            </h3>
            <p className="text-xs text-zinc-400">
              Multiplique seu círculo pela altura da torre ou digite qualquer quantidade de blocos para descobrir quantas Shulker Boxes levar:
            </p>
          </div>

          {/* Tower Height or Custom Total Override */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <label htmlFor="tower-height-input" className="text-zinc-400 block">
                {shapeMode === 'dome-3d'
                  ? 'Camadas da Cúpula 3D:'
                  : 'Altura da Torre / Muralha (Andares):'}
              </label>
              {shapeMode === 'dome-3d' ? (
                <div className="text-sm font-mono font-bold text-violet-300 pt-1">
                  {maxDomeLayers} Camadas ({totalDomeBlocks3D} blocos)
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    id="tower-height-input"
                    type="number"
                    min={1}
                    max={320}
                    value={towerHeight}
                    onChange={(e) => {
                      setCustomBlockOverride('');
                      setTowerHeight(Math.max(1, Number(e.target.value) || 1));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-zinc-700 font-mono text-sm text-emerald-400 font-bold"
                  />
                  <span className="text-zinc-500 font-mono">blocos</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <label htmlFor="custom-blocks-input" className="text-zinc-400 block">
                Ou Digite um Total Personalizado:
              </label>
              <input
                id="custom-blocks-input"
                type="number"
                min={1}
                placeholder={`Auto (${
                  shapeMode === 'dome-3d'
                    ? totalDomeBlocks3D
                    : voxelGridData.activeCount * towerHeight
                })`}
                value={customBlockOverride}
                onChange={(e) => setCustomBlockOverride(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-zinc-700 font-mono text-sm text-amber-300 placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Quick Project Scale Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-zinc-400 mr-1">Projetos rápidos:</span>
            {[
              { label: 'Pirâmide Beacon (164)', val: '164' },
              { label: '1 Shulker Cheia (1.728)', val: '1728' },
              { label: '1 Baú Duplo (3.456)', val: '3456' },
              { label: 'Mega Base (10.000)', val: '10000' },
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => {
                  playSound('click');
                  setCustomBlockOverride(item.val);
                }}
                className={`px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                  customBlockOverride === item.val
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            {customBlockOverride && (
              <button
                type="button"
                onClick={() => setCustomBlockOverride('')}
                className="px-2 py-1 text-emerald-400 hover:underline"
              >
                Usar Círculo ({voxelGridData.activeCount * towerHeight})
              </button>
            )}
          </div>

          {/* 4 Metric Readout Cards */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[11px] text-zinc-400">Total de Blocos</div>
              <div className="text-xl font-bold text-zinc-100 tabular-nums mt-0.5">
                {computedProjectBlocks.toLocaleString('pt-BR')}
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">
                {voxelGridData.activeCount} por andar
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/40">
              <div className="text-[11px] text-emerald-300">Em Packs de 64</div>
              <div className="text-lg font-bold text-emerald-400 tabular-nums mt-0.5">
                {fullPacks64} Packs {leftoverBlocks > 0 ? `+ ${leftoverBlocks}` : ''}
              </div>
              <div className="text-[10px] text-emerald-300/70 mt-0.5">
                Slots ocupados: {Math.ceil(computedProjectBlocks / 64)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/25 border border-indigo-500/40">
              <div className="text-[11px] text-indigo-300">Shulker Boxes (27 Slots)</div>
              <div className="text-xl font-bold text-violet-300 tabular-nums mt-0.5">
                {shulkerBoxesNeeded} Shulkers
              </div>
              <div className="text-[10px] text-indigo-300/70 mt-0.5">
                1 Shulker = 1.728 blocos
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40">
              <div className="text-[11px] text-amber-300">Baús Duplos (54 Slots)</div>
              <div className="text-xl font-bold text-amber-300 tabular-nums mt-0.5">
                {doubleChestsNeeded} Baús
              </div>
              <div className="text-[10px] text-amber-300/70 mt-0.5">
                1 Baú Duplo = 3.456 blocos
              </div>
            </div>
          </div>

          {/* Material Selector & Raw Ingredients Breakdown */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <label htmlFor="material-decomposer-select" className="text-xs font-bold text-zinc-200 block">
              Decompositor de Matéria-Prima (Escolha o Bloco da Construção):
            </label>
            <select
              id="material-decomposer-select"
              value={selectedMaterialId}
              onChange={(e) => {
                playSound('click');
                setSelectedMaterialId(e.target.value as MaterialType);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
            >
              {MATERIALS_DATABASE.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>

            <p className="text-xs text-zinc-400 leading-relaxed">{activeMaterial.description}</p>

            <div className="space-y-2.5">
              {rawIngredientsList.map((raw, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between gap-2 font-bold text-zinc-100">
                    <span>{raw.item}</span>
                    <span className="font-mono text-emerald-400 shrink-0">{raw.packsText}</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Quantidade exata: {raw.quantity.toLocaleString('pt-BR')} unidades
                  </div>
                  <p className="text-[11px] text-amber-300/90 pt-0.5">{raw.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
