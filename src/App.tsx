/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Search,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  ArrowRight,
  Download,
  RotateCcw,
  BookOpen,
  Sparkles,
  Terminal,
  ExternalLink,
  Stethoscope,
  Keyboard,
  Layers,
  Flame,
  Trees,
  Orbit,
  Boxes,
  Compass,
  X,
} from 'lucide-react';
import {
  TUTORIALS_DATA,
  JOURNEY_TRACKS,
  TutorialItem,
  SkillLevel,
  TutorialCategory,
  ASSET_PATHS,
} from './data/tutorials';
import { ShaderPipelineLab } from './components/ShaderPipelineLab';
import { HardwareJvmCalculator } from './components/HardwareJvmCalculator';
import { ResourceComparatorSection } from './components/ResourceComparatorSection';
import { DoctorFpsCrashAi } from './components/DoctorFpsCrashAi';
import { KeyboardMouseAcademy } from './components/KeyboardMouseAcademy';
import { ModpackBuilder } from './components/ModpackBuilder';
import { SurvivalMasteryHub } from './components/SurvivalMasteryHub';
import { DimensionWorldExplorer } from './components/DimensionWorldExplorer';
import { VeteranEngineeringLab } from './components/VeteranEngineeringLab';
import { useDimensionTheme, DimensionTheme } from './context/ThemeContext';

const STORAGE_KEY_STEPS = 'craftlab_completed_steps_v2';

type PlatformTab = 'all' | 'dimensions' | 'survival-mastery' | 'veteran-lab' | 'modpack-builder' | 'doctor-ai' | 'academy' | 'tutorials' | 'calculator' | 'comparator';

export default function App() {
  const { theme, setTheme, themeClasses, playSound } = useDimensionTheme();
  const [activePlatformTab, setActivePlatformTab] = useState<PlatformTab>('all');
  const [selectedLevel, setSelectedLevel] = useState<'Todos' | SkillLevel>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | TutorialCategory>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTutorialId, setActiveTutorialId] = useState<string>(TUTORIALS_DATA[0].id);
  const [activeDetailTab, setActiveDetailTab] = useState<'steps' | 'alerts' | 'hardware'>('steps');
  const [copiedCommandKey, setCopiedCommandKey] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Track completed tutorial steps (keyed as `${tutorialId}-${stepNumber}`)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEPS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STEPS, JSON.stringify(completedSteps));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [completedSteps]);

  const filteredTutorials = useMemo(() => {
    return TUTORIALS_DATA.filter((tut) => {
      const matchesLevel = selectedLevel === 'Todos' || tut.level === selectedLevel;
      const matchesCategory =
        selectedCategory === 'Todas' || tut.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        tut.title.toLowerCase().includes(q) ||
        tut.subtitle.toLowerCase().includes(q) ||
        tut.summary.toLowerCase().includes(q) ||
        tut.steps.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            (s.commandOrPath && s.commandOrPath.toLowerCase().includes(q))
        ) ||
        tut.recommendedMods.some((m) => m.name.toLowerCase().includes(q));
      return matchesLevel && matchesCategory && matchesQuery;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const activeTutorial: TutorialItem = useMemo(() => {
    const foundInFiltered = filteredTutorials.find((t) => t.id === activeTutorialId);
    if (foundInFiltered) return foundInFiltered;
    if (filteredTutorials.length > 0) return filteredTutorials[0];
    return TUTORIALS_DATA[0];
  }, [filteredTutorials, activeTutorialId]);

  const handleSelectJourneyTrack = (level: SkillLevel) => {
    const nextLevel = selectedLevel === level ? 'Todos' : level;
    setSelectedLevel(nextLevel);
    setSelectedCategory('Todas');
    if (nextLevel !== 'Todos') {
      const firstMatch = TUTORIALS_DATA.find((t) => t.level === nextLevel);
      if (firstMatch) {
        setActiveTutorialId(firstMatch.id);
      }
    }
    if (activePlatformTab !== 'all' && activePlatformTab !== 'tutorials') {
      setActivePlatformTab('all');
    }
    setTimeout(() => {
      const element = document.getElementById('guias');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const toggleStepCompletion = (tutorialId: string, stepNumber: number) => {
    const key = `${tutorialId}-${stepNumber}`;
    setCompletedSteps((prev) => {
      const nextChecked = !prev[key];
      if (nextChecked) {
        playSound('xp_orb');
      } else {
        playSound('click');
      }
      return {
        ...prev,
        [key]: nextChecked,
      };
    });
  };

  const resetAllProgress = () => {
    playSound('click');
    setCompletedSteps({});
  };

  const handleCopySnippet = (text: string, keyId: string) => {
    playSound('piston');
    navigator.clipboard.writeText(text);
    setCopiedCommandKey(keyId);
    setTimeout(() => setCopiedCommandKey(null), 2000);
  };

  // Compute total steps and completed count
  const totalStepCount = useMemo(
    () => TUTORIALS_DATA.reduce((sum, t) => sum + t.steps.length, 0),
    []
  );
  const completedStepCount = useMemo(
    () => Object.values(completedSteps).filter(Boolean).length,
    [completedSteps]
  );
  const progressPercentage = Math.round((completedStepCount / totalStepCount) * 100);

  const exportMarkdownText = useMemo(() => {
    const lines: string[] = [
      '# CraftLab — Hub de Otimização, Mods e Shaders para Minecraft Java',
      `Progresso concluído: ${completedStepCount}/${totalStepCount} passos (${progressPercentage}%)`,
      '',
    ];
    TUTORIALS_DATA.forEach((tut) => {
      lines.push(`## ${tut.indexNumber}. ${tut.title} (${tut.level} · ${tut.estimatedTime})`);
      tut.steps.forEach((s) => {
        const done = completedSteps[`${tut.id}-${s.stepNumber}`] ? '[x]' : '[ ]';
        lines.push(`- ${done} Passo ${s.stepNumber}: ${s.title}`);
        if (s.commandOrPath) {
          lines.push(`  Comando/Argumento: \`${s.commandOrPath}\``);
        }
        lines.push(`  Verificação: ${s.verificationCheck}`);
      });
      lines.push('');
    });
    return lines.join('\n');
  }, [completedSteps, completedStepCount, totalStepCount, progressPercentage]);

  const handleDownloadMarkdown = () => {
    const blob = new Blob([exportMarkdownText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'craftlab-checklist-minecraft-java.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(exportMarkdownText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${themeClasses.pageBg}`}>
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${themeClasses.headerBg}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Brand Title, single text element */}
          <a
            href="#topo"
            onClick={() => setActivePlatformTab('all')}
            className="text-xl font-bold tracking-tight text-zinc-100 whitespace-nowrap shrink-0 font-display"
          >
            CraftLab
          </a>

          {/* Zone 2: 7 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a
              href="#guia-zeramento"
              onClick={() => setActivePlatformTab('survival-mastery')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Zerar o Mine
            </a>
            <a
              href="#modpack-builder"
              onClick={() => setActivePlatformTab('modpack-builder')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Modpacks
            </a>
            <a
              href="#guias"
              onClick={() => setActivePlatformTab('all')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Tutoriais
            </a>
            <a
              href="#doutor-fps"
              onClick={() => setActivePlatformTab('doctor-ai')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Doutor FPS
            </a>
            <a
              href="#calculadora"
              onClick={() => setActivePlatformTab('all')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Calculadora
            </a>
            <a
              href="#recursos"
              onClick={() => setActivePlatformTab('all')}
              className="hover:text-emerald-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Comparador
            </a>
            <a
              href="#shaders"
              onClick={() => setActivePlatformTab('all')}
              className="hover:text-violet-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Shaders
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Exportar Progresso ({progressPercentage}%)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="topo" className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 sm:py-12 space-y-16">
        {/* Platform Navigation Tabs Bar (Includes "Doutor FPS & Crash (IA)") */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActivePlatformTab('all');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'all'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Visão Completa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActivePlatformTab('dimensions');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'dimensions'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-400 hover:bg-zinc-800/80'
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              <span>Mundos, Blocos 3D & Sons</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActivePlatformTab('survival-mastery');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'survival-mastery'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-400 hover:bg-zinc-800/80'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Zerar o Mine & Mega Farms</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('anvil');
                setActivePlatformTab('veteran-lab');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'veteran-lab'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-amber-400 hover:bg-zinc-800/80'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Bigorna & Engine Veterana</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('modpack-builder')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'modpack-builder'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Verificador de Modpacks</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('doctor-ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'doctor-ai'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-emerald-400 hover:bg-zinc-800/80'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doutor FPS & Crash (IA)</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('academy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'academy'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Academia Teclado & Mouse</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('tutorials')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'tutorials'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guias Step-by-Step ({TUTORIALS_DATA.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'calculator'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Calculadora de Hardware & RAM</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatformTab('comparator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activePlatformTab === 'comparator'
                  ? 'bg-violet-600 text-white'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comparador & Shaders</span>
            </button>
          </div>

          {/* Dimension Theme Switcher (Overworld / Nether / The End) + Progress */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Seletor de Tema de Dimensão"
              className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-zinc-800"
            >
              {(
                [
                  { id: 'overworld' as DimensionTheme, label: 'Overworld', icon: Trees },
                  { id: 'nether' as DimensionTheme, label: 'Nether', icon: Flame },
                  { id: 'end' as DimensionTheme, label: 'The End', icon: Orbit },
                ] as const
              ).map((dim) => {
                const IconComp = dim.icon;
                const isActive = theme === dim.id;
                return (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => setTheme(dim.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{dim.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-zinc-400 font-mono tabular-nums">
              Checklist: <strong className="text-emerald-400">{completedStepCount}/{totalStepCount}</strong>
            </div>
          </div>
        </div>

        {/* Dedicated View when user selects "Doutor FPS & Crash (IA)" tab */}
        {activePlatformTab === 'doctor-ai' && <DoctorFpsCrashAi />}

        {/* 1. Hero Section & Real-time Search + 3-Track Journey Selector (Shown in 'all') */}
        {activePlatformTab === 'all' && (
          <section id="jornada" className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Copy & Real-Time Search Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                    <span>Hub Definitivo Minecraft Java Edition</span>
                    <span aria-hidden="true">·</span>
                    <span>Do Celular/Console ao PC Ultra Realista</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
                    Domine do <span className="text-emerald-400">Atalho F3</span> aos{' '}
                    <span className="text-violet-400">Shaders PBR 3D</span>
                  </h1>

                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                    Migrando do Bedrock (celular/console) para o PC ou buscando extrair cada gota de FPS e fidelidade gráfica? Siga guias interativos passo a passo com verificação em tempo real, calculadora de memória JVM e o diagnóstico inteligente <strong>Doutor FPS & Crash (IA)</strong>.
                  </p>
                </div>

                {/* Real-Time Search Box in Hero */}
                <div className="p-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquisar em tempo real: F3, Sodium, Patrix, RTX, Litematica, -Xmx..."
                      aria-label="Pesquisar tutoriais em tempo real"
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Limpar busca"
                        className="p-1.5 text-zinc-400 hover:text-zinc-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <a
                    href="#guias"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Ver {filteredTutorials.length} Guias</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Quick Filter Shortcuts + Jump to AI Doctor */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                  <button
                    type="button"
                    onClick={() => setActivePlatformTab('doctor-ai')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Abrir Doutor FPS & Crash (IA)</span>
                  </button>
                  <span>Buscas rápidas:</span>
                  {['F3 + G', 'Sodium', 'Complementary', 'javaw.exe', 'Distant Horizons', 'Litematica'].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          const el = document.getElementById('guias');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors whitespace-nowrap shrink-0"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Right Visual Showcase Card (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col">
                <div className="relative flex-1 min-h-[260px] overflow-hidden">
                  <img
                    src={ASSET_PATHS.ultraShaderLandscape}
                    alt="Paisagem Minecraft Java com Shaders Realistas, Luz Volumétrica e Distant Horizons"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                  <div className="absolute bottom-4 inset-x-4">
                    <div className="text-xs text-emerald-400 font-mono">
                      Iris 1.8 + Sodium 0.6 + Distant Horizons 2.2
                    </div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      6 Guias Práticos + Diagnóstico de FPS com IA
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800 bg-slate-950/80 flex items-center justify-between gap-4 text-xs">
                  <div className="text-zinc-400">
                    Seu progresso salvo:{' '}
                    <strong className="text-emerald-400 font-mono tabular-nums">
                      {completedStepCount} de {totalStepCount} passos concluídos ({progressPercentage}%)
                    </strong>
                  </div>
                  {completedStepCount > 0 && (
                    <button
                      type="button"
                      onClick={resetAllProgress}
                      className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resetar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive 3-Track Journey Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Selecione sua Trilha de Evolução (Clique para filtrar os guias abaixo)</span>
                {selectedLevel !== 'Todos' && (
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('Todos')}
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    Mostrar Todas as 3 Trilhas
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                {JOURNEY_TRACKS.map((track) => {
                  const isSelected = selectedLevel === track.level;
                  const isViolet = track.accentColor === 'violet';
                  const isBlue = track.accentColor === 'blue';

                  return (
                    <button
                      key={track.level}
                      type="button"
                      onClick={() => handleSelectJourneyTrack(track.level)}
                      className={`text-left p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? isViolet
                            ? 'bg-indigo-950/40 border-violet-400 shadow-sm'
                            : isBlue
                            ? 'bg-blue-950/35 border-blue-400 shadow-sm'
                            : 'bg-emerald-950/35 border-emerald-400 shadow-sm'
                          : 'bg-zinc-900/45 border-zinc-800/90 hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-semibold ${
                              isViolet
                                ? 'text-violet-300'
                                : isBlue
                                ? 'text-blue-300'
                                : 'text-emerald-400'
                            }`}
                          >
                            Trilha {track.level} · {track.tagline}
                          </span>
                          <span className="font-mono text-zinc-400">
                            {TUTORIALS_DATA.filter((t) => t.level === track.level).length} guias
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
                          {track.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {track.description}
                        </p>

                        <ul className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs text-zinc-300">
                          {track.highlights.map((hl) => (
                            <li key={hl} className="leading-relaxed">
                              <span
                                className={
                                  isViolet
                                    ? 'text-violet-400 mr-1.5'
                                    : isBlue
                                    ? 'text-blue-400 mr-1.5'
                                    : 'text-emerald-400 mr-1.5'
                                }
                              >
                                •
                              </span>
                              {hl}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold">
                        <span
                          className={
                            isViolet
                              ? 'text-violet-300'
                              : isBlue
                              ? 'text-blue-300'
                              : 'text-emerald-400'
                          }
                        >
                          {isSelected ? 'Filtro Ativo — Clique para ver todos' : `Filtrar Trilha ${track.level}`}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 1.5. Interactive Dimension World Explorer (Overworld, Nether, The End Blocks & Sounds) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'dimensions') && (
          <DimensionWorldExplorer
            onNavigateToSection={(targetTab) => setActivePlatformTab(targetTab)}
          />
        )}

        {/* 2. Interactive Step-by-Step Tutorial Viewer (#guias) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'tutorials') && (
          <section id="guias" className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
                  <span>Visualizador Step-by-Step Interativo</span>
                  <span aria-hidden="true">·</span>
                  <span>{TUTORIALS_DATA.length} Guias Completos com Verificação</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
                  Guias Práticos: Do Básico à Engenharia Avançada
                </h2>
              </div>

              {/* Segmented Control for Skill Level */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                  {(['Todos', 'Iniciante', 'Intermediário', 'Avançado'] as const).map((lvl) => {
                    const active = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'text-zinc-400 hover:text-zinc-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  'Todas',
                  'Migração & Atalhos',
                  'Performance & GPU',
                  'Shaders & PBR 3D',
                  'Modpacks & Engenharia',
                ] as const
              ).map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-zinc-100 text-slate-950 border-zinc-100 font-semibold'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {cat === 'Todas' ? 'Todas as Categorias' : cat}
                  </button>
                );
              })}
            </div>

            {/* Master-Detail Layout for Tutorials */}
            {filteredTutorials.length === 0 ? (
              <div className="p-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-center space-y-3">
                <p className="text-base font-semibold text-zinc-200">
                  Nenhum guia encontrado para "{searchQuery}" no filtro selecionado.
                </p>
                <p className="text-xs text-zinc-400">
                  Limpe a pesquisa ou selecione "Todos" para visualizar os 6 guias completos.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('Todos');
                    setSelectedCategory('Todas');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition-colors"
                >
                  Restaurar Todos os Guias
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Guide Selector Cards (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredTutorials.map((tut) => {
                    const isSelected = tut.id === activeTutorial.id;
                    const doneInTut = tut.steps.filter(
                      (s) => completedSteps[`${tut.id}-${s.stepNumber}`]
                    ).length;

                    return (
                      <button
                        key={tut.id}
                        type="button"
                        onClick={() => {
                          setActiveTutorialId(tut.id);
                          setActiveDetailTab('steps');
                        }}
                        className={`w-full text-left p-5 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-zinc-900 border-emerald-500/80 shadow-sm'
                            : 'bg-zinc-900/40 border-zinc-800/90 hover:border-zinc-700'
                        }`}
                      >
                        {/* Clean Unboxed Static Metadata Line */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                          <span
                            className={
                              tut.level === 'Iniciante'
                                ? 'text-emerald-400 font-medium'
                                : tut.level === 'Intermediário'
                                ? 'text-violet-300 font-medium'
                                : 'text-blue-300 font-medium'
                            }
                          >
                            Nível {tut.level}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{tut.estimatedTime}</span>
                          <span aria-hidden="true">·</span>
                          <span>{tut.category}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                          {tut.indexNumber}. {tut.title}
                        </h3>

                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                          {tut.subtitle}
                        </p>

                        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono tabular-nums">
                          <span>{tut.targetFpsGain}</span>
                          <span
                            className={
                              doneInTut === tut.steps.length
                                ? 'text-emerald-400 font-semibold'
                                : 'text-zinc-400'
                            }
                          >
                            {doneInTut}/{tut.steps.length} concluídos
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Active Tutorial Deep-Dive Viewer (7 cols) */}
                <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
                  {/* Active Module Header */}
                  <div className="border-b border-zinc-800 pb-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span className="text-emerald-400 font-semibold">
                        Guia {activeTutorial.indexNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Nível {activeTutorial.level}</span>
                      <span aria-hidden="true">·</span>
                      <span>Tempo: {activeTutorial.estimatedTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTutorial.modloader}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                      {activeTutorial.title}
                    </h3>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {activeTutorial.summary}
                    </p>
                  </div>

                  {/* Sub-Navigation Tabs inside Tutorial Detail */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('steps')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          activeDetailTab === 'steps'
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'text-zinc-400 hover:text-zinc-100'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Passo a Passo ({activeTutorial.steps.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('alerts')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          activeDetailTab === 'alerts'
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'text-zinc-400 hover:text-zinc-100'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Alertas ({activeTutorial.verificationAlerts.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('hardware')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          activeDetailTab === 'hardware'
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'text-zinc-400 hover:text-zinc-100'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Dicas de Hardware ({activeTutorial.hardwareTips.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Interactive Step-by-Step with Checkbox, Copy Command, and Verification Box */}
                  {activeDetailTab === 'steps' && (
                    <div className="space-y-4">
                      {activeTutorial.steps.map((step) => {
                        const stepKey = `${activeTutorial.id}-${step.stepNumber}`;
                        const isDone = !!completedSteps[stepKey];

                        return (
                          <div
                            key={step.stepNumber}
                            className={`p-5 rounded-xl border transition-colors ${
                              isDone
                                ? 'bg-emerald-950/20 border-emerald-500/40'
                                : 'bg-slate-950/80 border-zinc-800/90'
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleStepCompletion(activeTutorial.id, step.stepNumber)
                                }
                                aria-label={`Marcar passo ${step.stepNumber} como concluído`}
                                className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
                                )}
                              </button>

                              <div className="flex-1 min-w-0 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h4
                                    onClick={() =>
                                      toggleStepCompletion(activeTutorial.id, step.stepNumber)
                                    }
                                    className={`text-base font-bold cursor-pointer ${
                                      isDone ? 'text-emerald-300 line-through' : 'text-zinc-100'
                                    }`}
                                  >
                                    Passo 0{step.stepNumber}: {step.title}
                                  </h4>
                                  <span
                                    className={`text-xs font-mono ${
                                      isDone ? 'text-emerald-400 font-semibold' : 'text-zinc-400'
                                    }`}
                                  >
                                    {isDone ? 'Concluído' : 'Marcar como feito'}
                                  </span>
                                </div>

                                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                  {step.description}
                                </p>

                                {/* Copy Command / Argument Box */}
                                {step.commandOrPath && (
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                                    <div className="min-w-0">
                                      {step.commandLabel && (
                                        <div className="text-[11px] text-zinc-400 mb-0.5">
                                          {step.commandLabel}:
                                        </div>
                                      )}
                                      <code className="text-xs font-mono text-emerald-300 break-all">
                                        {step.commandOrPath}
                                      </code>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCopySnippet(step.commandOrPath!, stepKey)
                                      }
                                      className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                                    >
                                      {copiedCommandKey === stepKey ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                                          <span>Copiado!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span>Copiar Comando/Argumento</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}

                                {/* Dedicated Verification Box ("Como saber se deu certo") */}
                                <div className="p-3 rounded-lg bg-emerald-950/25 border border-emerald-500/30 flex items-start gap-2.5 text-xs">
                                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <div className="text-zinc-200 leading-relaxed">
                                    <strong className="text-emerald-300">Verificação: </strong>
                                    {step.verificationCheck}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tab 2: Verification Alerts */}
                  {activeDetailTab === 'alerts' && (
                    <div className="space-y-4">
                      {activeTutorial.verificationAlerts.map((alert) => {
                        const isCritical = alert.severity === 'Crítico';
                        const isWarning = alert.severity === 'Atenção';

                        return (
                          <div
                            key={alert.id}
                            className={`p-5 rounded-xl border ${
                              isCritical
                                ? 'bg-red-950/20 border-red-500/40'
                                : isWarning
                                ? 'bg-amber-950/20 border-amber-500/40'
                                : 'bg-emerald-950/20 border-emerald-500/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {isCritical ? (
                                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                              ) : isWarning ? (
                                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                              ) : (
                                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                              )}

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`font-semibold ${
                                      isCritical
                                        ? 'text-red-300'
                                        : isWarning
                                        ? 'text-amber-300'
                                        : 'text-emerald-300'
                                    }`}
                                  >
                                    Severidade: {alert.severity}
                                  </span>
                                </div>

                                <h4 className="text-base font-bold text-zinc-100">
                                  {alert.title}
                                </h4>

                                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                  {alert.detail}
                                </p>

                                <div className="p-3 rounded-lg bg-slate-950/80 border border-zinc-800 text-xs text-zinc-200 leading-relaxed">
                                  <strong className="text-emerald-400">Como Resolver:</strong>{' '}
                                  {alert.resolution}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tab 3: Hardware Tips */}
                  {activeDetailTab === 'hardware' && (
                    <div className="space-y-4">
                      {activeTutorial.hardwareTips.map((tip, idx) => (
                        <div
                          key={`${tip.component}-${idx}`}
                          className="p-5 rounded-xl border border-zinc-800 bg-slate-950/80 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-emerald-400" />
                              <h4 className="text-base font-bold text-zinc-100">
                                Subsistemas de {tip.component}
                              </h4>
                            </div>
                            <span className="text-xs font-mono text-emerald-400">
                              Impacto: {tip.fpsImpact}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800">
                              <div className="text-zinc-400">Especificação Mínima</div>
                              <div className="text-zinc-100 font-semibold mt-0.5">
                                {tip.minimumSpec}
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800">
                              <div className="text-zinc-400">Especificação Recomendada</div>
                              <div className="text-emerald-300 font-semibold mt-0.5">
                                {tip.recommendedSpec}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            <strong className="text-zinc-100">Recomendação Técnica:</strong>{' '}
                            {tip.optimizationAdvice}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommended Mods Footer with Direct Safe Links */}
                  <div className="pt-5 border-t border-zinc-800">
                    <div className="text-xs font-semibold text-zinc-300 mb-3">
                      Downloads Oficiais e Verificados deste Guia (Modrinth)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTutorial.recommendedMods.map((mod) => (
                        <a
                          key={mod.name}
                          href={mod.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-slate-950 hover:bg-zinc-900 border border-zinc-800/90 hover:border-emerald-500/50 flex items-start justify-between gap-2 text-xs transition-colors"
                        >
                          <div>
                            <div className="font-bold text-zinc-100">{mod.name}</div>
                            <div className="text-zinc-400 mt-0.5">{mod.role}</div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono shrink-0">
                            <span>{mod.source}</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Guia Mestre de Sobrevivência, Zeramento & Mega Farms */}
        {(activePlatformTab === 'all' || activePlatformTab === 'survival-mastery') && (
          <SurvivalMasteryHub />
        )}

        {/* Laboratório do Veterano: Bigorna Binária, Bancada 3x3 & Mecânicas da Engine */}
        {(activePlatformTab === 'all' || activePlatformTab === 'veteran-lab') && (
          <VeteranEngineeringLab />
        )}

        {/* Gerador & Verificador de Conflito de Modpacks */}
        {(activePlatformTab === 'all' || activePlatformTab === 'modpack-builder') && (
          <ModpackBuilder />
        )}

        {/* Academia de Teclado & Mouse (Ex-Mobile) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'academy') && (
          <KeyboardMouseAcademy />
        )}

        {/* Doutor FPS & Crash (IA) also shown in full view flow */}
        {activePlatformTab === 'all' && <DoctorFpsCrashAi />}

        {/* 3. Interactive Hardware & RAM Calculator (#calculadora) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'calculator') && (
          <HardwareJvmCalculator />
        )}

        {/* 4. Visual Resource Comparator Cards + Before/After Slider (#recursos) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'comparator') && (
          <ResourceComparatorSection />
        )}

        {/* 5. Shader & PBR Pipeline Laboratory (#shaders) */}
        {(activePlatformTab === 'all' || activePlatformTab === 'comparator') && (
          <ShaderPipelineLab />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-900 bg-slate-950 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <strong className="text-zinc-300 font-display">CraftLab</strong> — Hub de Tutoriais, Diagnóstico com IA, Shaders e Engenharia para Minecraft Java Edition.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActivePlatformTab('doctor-ai')}
              className="hover:text-emerald-400 transition-colors"
            >
              Doutor FPS & Crash (IA)
            </button>
            <a href="#guias" className="hover:text-zinc-300 transition-colors">
              Tutoriais
            </a>
            <a href="#calculadora" className="hover:text-zinc-300 transition-colors">
              Calculadora RAM
            </a>
            <a href="#recursos" className="hover:text-zinc-300 transition-colors">
              Comparador
            </a>
            <a href="#shaders" className="hover:text-zinc-300 transition-colors">
              Shaders
            </a>
          </div>
        </div>
      </footer>

      {/* Export Checklist & Setup Summary Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="text-xs text-emerald-400 font-medium">
                  Checklist Salvo no Navegador
                </div>
                <h3 className="text-xl font-bold text-zinc-100">
                  Exportar Guia & Progresso de Instalação
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                aria-label="Fechar janela de exportação"
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Resumo em Markdown com todos os comandos e verificações</span>
                <span className="font-mono tabular-nums text-emerald-400">
                  {completedStepCount}/{totalStepCount} passos marcados ({progressPercentage}%)
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-zinc-800 text-xs font-mono text-zinc-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {exportMarkdownText}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Relatório Copiado</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" />
                    <span>Copiar Markdown</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Arquivo (.md)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
