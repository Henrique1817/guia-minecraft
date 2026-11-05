import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  Trophy,
  Flame,
  UtensilsCrossed,
  Hammer,
  Sparkles,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import {
  SURVIVAL_STAGES,
  MEGA_FARMS_BLUEPRINTS,
  SurvivalProgressionStage,
  FarmBlueprint,
} from '../data/survivalMasteryData';
import { useDimensionTheme } from '../context/ThemeContext';

const STORAGE_KEY_CHECKPOINTS = 'craftlab_survival_checkpoints_v1';
const STORAGE_KEY_FARM_STEPS = 'craftlab_survival_farm_steps_v1';

export const SurvivalMasteryHub: React.FC = () => {
  const { playSound } = useDimensionTheme();
  const [activeSubTab, setActiveSubTab] = useState<'trilha-zeramento' | 'automacao-essencial' | 'mega-farms'>('trilha-zeramento');
  const [selectedFarmCategory, setSelectedFarmCategory] = useState<'Todas' | 'Comida Infinita' | 'XP & Recursos' | 'Redstone & Automação'>('Todas');
  const [selectedStageId, setSelectedStageId] = useState<string>(SURVIVAL_STAGES[0].id);
  const [selectedFarmId, setSelectedFarmId] = useState<string>(MEGA_FARMS_BLUEPRINTS[0].id);
  const [copiedMaterials, setCopiedMaterials] = useState<string | null>(null);

  // Farm steps completion persistence (keyed as `${farmId}-${step}`)
  const [completedFarmSteps, setCompletedFarmSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FARM_STEPS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FARM_STEPS, JSON.stringify(completedFarmSteps));
    } catch {
      // Storage safe
    }
  }, [completedFarmSteps]);

  const toggleFarmStep = (farmId: string, stepNumber: number) => {
    const key = `${farmId}-${stepNumber}`;
    setCompletedFarmSteps((prev) => {
      const nextVal = !prev[key];
      playSound(nextVal ? 'xp_orb' : 'click');
      return {
        ...prev,
        [key]: nextVal,
      };
    });
  };

  // Checkpoints persistence
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKPOINTS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKPOINTS, JSON.stringify(completedCheckpoints));
    } catch {
      // Storage safe
    }
  }, [completedCheckpoints]);

  const toggleCheckpoint = (id: string) => {
    setCompletedCheckpoints((prev) => {
      const nextVal = !prev[id];
      playSound(nextVal ? 'xp_orb' : 'click');
      return {
        ...prev,
        [id]: nextVal,
      };
    });
  };

  const activeStage = useMemo(() => {
    return SURVIVAL_STAGES.find((s) => s.id === selectedStageId) || SURVIVAL_STAGES[0];
  }, [selectedStageId]);

  const activeFarm = useMemo(() => {
    return MEGA_FARMS_BLUEPRINTS.find((f) => f.id === selectedFarmId) || MEGA_FARMS_BLUEPRINTS[0];
  }, [selectedFarmId]);

  // Overall progression stats
  const totalCheckpoints = useMemo(() => {
    return SURVIVAL_STAGES.reduce((sum, st) => sum + st.checkpoints.length, 0);
  }, []);

  const completedCheckpointsCount = useMemo(() => {
    return Object.values(completedCheckpoints).filter(Boolean).length;
  }, [completedCheckpoints]);

  const progressPercent = Math.round((completedCheckpointsCount / totalCheckpoints) * 100);

  const handleCopyMaterials = (farm: FarmBlueprint) => {
    playSound('chest_open');
    const text = [
      `# Lista de Materiais — ${farm.name}`,
      `Rendimento: ${farm.yieldRate}`,
      `Dificuldade: ${farm.difficulty}`,
      '',
      ...farm.materialsList.map((m) => `- ${m}`),
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedMaterials(farm.id);
    setTimeout(() => setCopiedMaterials(null), 2000);
  };

  return (
    <section
      id="guia-zeramento"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Guia Mestre de Sobrevivência & Engenharia Infinita</span>
            <span aria-hidden="true">·</span>
            <span>Do Dia 1 ao Pós-Dragão</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Como Aproveitar o Minecraft ao Máximo & Zerar
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Transforme sua experiência em algo único. Aprenda a técnica dos veteranos para nunca passar fome, monte fábricas automáticas de recursos infinitos e zere o jogo sem sofrimento usando as estratégias de exploração do Nether e The End.
          </p>
        </div>

        {/* Global Progression Pill */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-zinc-800 flex items-center gap-3 shrink-0">
          <div>
            <div className="text-xs text-zinc-400">Jornada de Zeramento</div>
            <div className="text-sm font-bold font-mono tabular-nums text-emerald-400">
              {completedCheckpointsCount} / {totalCheckpoints} Metas ({progressPercent}%)
            </div>
          </div>
          {completedCheckpointsCount > 0 && (
            <button
              type="button"
              onClick={() => setCompletedCheckpoints({})}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              title="Resetar progresso"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Switcher: 3 Subtabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveSubTab('trilha-zeramento')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'trilha-zeramento'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Trilha de Zeramento ({SURVIVAL_STAGES.length} Fases)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubTab('automacao-essencial');
              setSelectedFarmId('farm-vacas-entity-cramming');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'automacao-essencial'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-amber-400 hover:bg-zinc-800/80'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Automação Essencial (Comida & Início)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubTab('mega-farms');
              setSelectedFarmId('farm-ferro-compacta');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'mega-farms'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-violet-400 hover:bg-zinc-800/80'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>Mega Fábricas Técnicas (XP & Ferro)</span>
          </button>
        </div>

        <div className="text-xs text-zinc-400">
          {activeSubTab === 'trilha-zeramento' && 'Metas verificáveis para progressão segura no mundo'}
          {activeSubTab === 'automacao-essencial' && 'Farms de comida infinita (vacas, frangos, batatas) e papel'}
          {activeSubTab === 'mega-farms' && 'Engenharia industrial de ferro, ouro e XP endgame'}
        </div>
      </div>

      {/* VIEW 1: TRILHA DE ZERAMENTO */}
      {activeSubTab === 'trilha-zeramento' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Selector Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SURVIVAL_STAGES.map((stage) => {
              const isSelected = stage.id === activeStage.id;
              const doneInStage = stage.checkpoints.filter((c) => completedCheckpoints[c.id]).length;
              const allDone = doneInStage === stage.checkpoints.length;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-500/80 shadow-sm'
                      : 'bg-slate-950/80 border-zinc-800/90 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-semibold text-emerald-400">Fase {stage.stageNumber}</span>
                    <span className="font-mono tabular-nums">
                      {doneInStage}/{stage.checkpoints.length} concluídos
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100">{stage.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {stage.epicSubtitle}
                  </p>

                  <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>{stage.phase}</span>
                    <span className={allDone ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                      {allDone ? '✓ Fase Completa' : 'Em Andamento'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Stage Goals & Checkpoints (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <span>Fase {activeStage.stageNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStage.phase}</span>
              </div>

              <h3 className="text-2xl font-bold text-zinc-100">{activeStage.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{activeStage.epicSubtitle}</p>

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-emerald-300 flex items-center gap-2 mt-2">
                <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Objetivo Primário:</strong> {activeStage.primaryGoal}
                </span>
              </div>
            </div>

            {/* Checkpoints Checklist */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-zinc-300">
                Checkpoints Obrigatórios para Zerar:
              </div>

              {activeStage.checkpoints.map((cp) => {
                const isChecked = !!completedCheckpoints[cp.id];

                return (
                  <div
                    key={cp.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-zinc-900/70 border-zinc-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleCheckpoint(cp.id)}
                        className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
                        )}
                      </button>

                      <div className="space-y-2 flex-1 min-w-0">
                        <div
                          onClick={() => toggleCheckpoint(cp.id)}
                          className={`text-sm font-bold cursor-pointer ${
                            isChecked ? 'text-emerald-300 line-through' : 'text-zinc-100'
                          }`}
                        >
                          {cp.task}
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">{cp.detail}</p>

                        <div className="p-2.5 rounded-lg bg-slate-950/90 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-emerald-300">Segredo Pro: </strong>
                            {cp.proTip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage Veteran Secret */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-xs text-indigo-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Dica de Sobrevivência do Veterano: </strong>
                {activeStage.endgameSecret}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AUTOMAÇÃO ESSENCIAL (COMIDA INFINITA & PRIMÓRDIOS) */}
      {activeSubTab === 'automacao-essencial' && (
        <div className="space-y-8">
          {/* Concept Header & Saturation Guide */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/15 p-6 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
                <UtensilsCrossed className="w-5 h-5" />
                <span>O Segredo da Saturação no Java Edition</span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                Mecânica Crítica de Sobrevivência
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              No Minecraft Java, comer não serve apenas para encher as costeletas de fome: a <strong className="text-amber-300">Saturação</strong> é uma barra invisível que dita a velocidade em que você regenera vida em combates e quanto tempo você consegue correr sem fome. Estas 3 fábricas eliminam a necessidade de caçar e preparam você para o Nether com bife, frango e batatas infinitas.
            </p>

            {/* Saturation Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-zinc-100">
                  <span className="text-amber-400">🥩 Bife Assado (Vaca)</span>
                  <span className="text-emerald-400 font-mono">12.8 Sat.</span>
                </div>
                <div className="text-zinc-400 text-xs">
                  Restaura 8 pontos (4 coxas). Maior saturação comum do jogo. Essencial para lutar contra Blazes e Withers.
                </div>
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  Farm: Micro-Breeder 1x1 (24 Vacas)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-zinc-100">
                  <span className="text-amber-400">🍗 Frango Assado</span>
                  <span className="text-emerald-400 font-mono">7.2 Sat.</span>
                </div>
                <div className="text-zinc-400 text-xs">
                  Restaura 6 pontos (3 coxas). Produção 100% passiva: galinhas botam ovos, ejetor dispara e lava frita automaticamente.
                </div>
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  Farm: Cozinha Automática com Meio-Bloco
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-zinc-100">
                  <span className="text-amber-400">🥔 Batata / Cenoura</span>
                  <span className="text-emerald-400 font-mono">6.0 Sat.</span>
                </div>
                <div className="text-zinc-400 text-xs">
                  Crescimento instantâneo via farinha de osso em relógio de comparador. Rende até 1.800 batatas/hora segurando o botão direito.
                </div>
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  Farm: Nano Lavoura 0-Tick
                </div>
              </div>
            </div>
          </div>

          {/* Farm Quick Selector Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium mr-2">Selecione o Projeto de Base/Comida:</span>
            {MEGA_FARMS_BLUEPRINTS.filter(
              (f) =>
                f.category === 'Comida Infinita' ||
                f.id === 'farm-cana-bambu-observer' ||
                f.id === 'sistema-allay-organizacao-baus' ||
                f.id === 'guia-transporte-aldeao-cura' ||
                f.id === 'separador-itens-redstone-impulsesv' ||
                f.id === 'superfornalha-industrial-elevador'
            ).map((farm) => {
              const isSelected = farm.id === activeFarm.id;
              return (
                <button
                  key={farm.id}
                  type="button"
                  onClick={() => setSelectedFarmId(farm.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {farm.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          {/* Blueprint Detail Panel for Selected Essential Farm */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Blueprint Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-slate-950/90 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                    {activeFarm.category}
                  </span>
                  <span className="font-mono text-zinc-400">{activeFarm.difficulty}</span>
                </div>

                <h3 className="text-xl font-bold text-zinc-100">{activeFarm.name}</h3>

                <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-300 font-semibold">
                  ⚡ Rendimento: {activeFarm.yieldRate}
                </div>

                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <div className="font-semibold text-zinc-100">Como funciona a mecânica:</div>
                  <p className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    {activeFarm.mechanicsExplanation}
                  </p>
                </div>

                {/* Visual 5-Slot Hopper Diagram for Redstone Sorter */}
                {activeFarm.id === 'separador-itens-redstone-impulsesv' && (
                  <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/40 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400">
                        Esquema dos 5 Slots do Funil Filtro:
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400">
                        Força Sinal = 3 (46 itens)
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/60">
                        <div className="text-[10px] text-emerald-300 font-mono">Slot 1</div>
                        <div className="text-sm font-bold text-white font-mono">41x</div>
                        <div className="text-[10px] text-emerald-400 truncate">Item Alvo</div>
                      </div>
                      {[2, 3, 4, 5].map((slotNum) => (
                        <div
                          key={slotNum}
                          className="p-2 rounded-lg bg-slate-950 border border-zinc-700"
                        >
                          <div className="text-[10px] text-zinc-500 font-mono">Slot {slotNum}</div>
                          <div className="text-sm font-bold text-amber-400 font-mono">1x</div>
                          <div className="text-[10px] text-zinc-400 truncate">Renomeado</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      💡 Para itens que empilham até <strong className="text-zinc-200">16</strong> (Pérolas do End, Ovos, Placas), o Slot 1 estabiliza automaticamente em <strong className="text-emerald-400">10x unidades</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Materials Card */}
              <div className="rounded-2xl border border-zinc-800 bg-slate-950/90 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-200">Materiais para Construção:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyMaterials(activeFarm)}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    {copiedMaterials === activeFarm.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Lista</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeFarm.materialsList.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300 flex items-center gap-2"
                    >
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="truncate">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Construction Steps (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/90 p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <div className="text-sm font-bold text-zinc-100">
                    Passo a Passo Detalhado de Engenharia
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Siga as orientações de bloco e marque cada etapa concluída
                  </div>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300">
                  {activeFarm.steps.filter((s) => completedFarmSteps[`${activeFarm.id}-${s.step}`]).length} de {activeFarm.steps.length} etapas concluídas
                </div>
              </div>

              <div className="space-y-4">
                {activeFarm.steps.map((st) => {
                  const stepKey = `${activeFarm.id}-${st.step}`;
                  const isDone = !!completedFarmSteps[stepKey];

                  return (
                    <div
                      key={st.step}
                      className={`p-5 rounded-xl border transition-all space-y-3 ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleFarmStep(activeFarm.id, st.step)}
                          className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                          title={isDone ? 'Marcar como não concluído' : 'Marcar como concluído'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4
                              onClick={() => toggleFarmStep(activeFarm.id, st.step)}
                              className={`text-sm font-bold cursor-pointer ${
                                isDone ? 'text-emerald-300 line-through' : 'text-zinc-100'
                              }`}
                            >
                              Etapa {st.step}: {st.title}
                            </h4>
                            <span className="text-[11px] font-mono text-amber-400/90 font-semibold">
                              {isDone ? '✓ Feito no Jogo' : 'Clique para marcar'}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {st.action}
                          </p>

                          {/* Block Placement Orientation Guide */}
                          {st.blockPlacementGuide && (
                            <div className="p-3 rounded-lg bg-amber-950/25 border border-amber-500/35 text-xs text-amber-200 flex items-start gap-2.5">
                              <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-amber-300">Posicionamento de Bloco & Orientação: </strong>
                                {st.blockPlacementGuide}
                              </div>
                            </div>
                          )}

                          {/* Troubleshooting Advice */}
                          {st.troubleshooting && (
                            <div className="p-3 rounded-lg bg-rose-950/25 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-rose-300">Atenção (Erro Comum): </strong>
                                {st.troubleshooting}
                              </div>
                            </div>
                          )}

                          {/* Pro Tip */}
                          {st.proTip && (
                            <div className="p-2.5 rounded-lg bg-slate-950/90 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-emerald-300">Dica dos Veteranos: </strong>
                                {st.proTip}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MEGA FÁBRICAS TÉCNICAS (XP & FERRO) */}
      {activeSubTab === 'mega-farms' && (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950 border border-zinc-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium px-2">Filtrar Projetos:</span>
              {(['Todas', 'XP & Recursos', 'Redstone & Automação', 'Comida Infinita'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFarmCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedFarmCategory === cat
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-zinc-500 pr-2">
              Mostrando {
                selectedFarmCategory === 'Todas'
                  ? MEGA_FARMS_BLUEPRINTS.length
                  : MEGA_FARMS_BLUEPRINTS.filter((f) => f.category === selectedFarmCategory).length
              } blueprints
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Farm Selector Cards */}
            <div className="lg:col-span-5 space-y-3">
              {MEGA_FARMS_BLUEPRINTS
                .filter((farm) => selectedFarmCategory === 'Todas' || farm.category === selectedFarmCategory)
                .map((farm) => {
                  const isSelected = farm.id === activeFarm.id;
                  const isFood = farm.category === 'Comida Infinita';
                  const isXp = farm.category === 'XP & Recursos';

                  return (
                    <button
                      key={farm.id}
                      type="button"
                      onClick={() => setSelectedFarmId(farm.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-zinc-900 border-emerald-500/80 shadow-sm'
                          : 'bg-slate-950/80 border-zinc-800/90 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                        <span
                          className={`font-semibold ${
                            isFood ? 'text-amber-300' : isXp ? 'text-violet-300' : 'text-emerald-400'
                          }`}
                        >
                          {farm.category}
                        </span>
                        <span className="font-mono text-zinc-400">{farm.difficulty}</span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-100">{farm.name}</h3>

                      <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-emerald-400 font-mono">
                        Rendimento: {farm.yieldRate}
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Right Column: Selected Farm Blueprint Details */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/90 p-6 sm:p-8 space-y-6">
              <div className="border-b border-zinc-800 pb-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-emerald-400">{activeFarm.category}</span>
                  <span className="text-xs font-mono text-zinc-400">{activeFarm.difficulty}</span>
                </div>

                <h3 className="text-2xl font-bold text-zinc-100">{activeFarm.name}</h3>

                <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/40 text-xs text-emerald-300 font-semibold">
                  ⚡ Produção Estimada: {activeFarm.yieldRate}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  {activeFarm.mechanicsExplanation}
                </p>
              </div>

              {/* Materials List */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-200">Lista de Materiais Necessários:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyMaterials(activeFarm)}
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {copiedMaterials === activeFarm.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Lista Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Materiais</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeFarm.materialsList.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-slate-950/90 border border-zinc-800 text-zinc-300 flex items-center gap-2"
                    >
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Build Steps */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                  <div>
                    <div className="text-sm font-bold text-zinc-100">
                      Passo a Passo de Engenharia Industrial
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      Siga a sequência e marque cada etapa realizada no seu mundo
                    </div>
                  </div>
                  <div className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                    {activeFarm.steps.filter((s) => completedFarmSteps[`${activeFarm.id}-${s.step}`]).length} de {activeFarm.steps.length} etapas concluídas
                  </div>
                </div>

                {activeFarm.steps.map((st) => {
                  const stepKey = `${activeFarm.id}-${st.step}`;
                  const isDone = !!completedFarmSteps[stepKey];

                  return (
                    <div
                      key={st.step}
                      className={`p-5 rounded-xl border transition-all space-y-3 ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleFarmStep(activeFarm.id, st.step)}
                          className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                          title={isDone ? 'Marcar como não concluído' : 'Marcar como concluído'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4
                              onClick={() => toggleFarmStep(activeFarm.id, st.step)}
                              className={`text-sm font-bold cursor-pointer ${
                                isDone ? 'text-emerald-300 line-through' : 'text-zinc-100'
                              }`}
                            >
                              Etapa {st.step}: {st.title}
                            </h4>
                            <span className="text-[11px] font-mono text-emerald-400/90 font-semibold">
                              {isDone ? '✓ Feito no Jogo' : 'Clique para marcar'}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {st.action}
                          </p>

                          {/* Block Placement Orientation Guide */}
                          {st.blockPlacementGuide && (
                            <div className="p-3 rounded-lg bg-emerald-950/25 border border-emerald-500/35 text-xs text-emerald-200 flex items-start gap-2.5">
                              <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-emerald-300">Posicionamento de Bloco & Orientação: </strong>
                                {st.blockPlacementGuide}
                              </div>
                            </div>
                          )}

                          {/* Troubleshooting Advice */}
                          {st.troubleshooting && (
                            <div className="p-3 rounded-lg bg-rose-950/25 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-rose-300">Atenção (Erro Comum): </strong>
                                {st.troubleshooting}
                              </div>
                            </div>
                          )}

                          {/* Pro Tip */}
                          {st.proTip && (
                            <div className="p-2.5 rounded-lg bg-slate-950/90 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-emerald-300">Dica: </strong>
                                {st.proTip}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
