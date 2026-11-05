import React, { useState, useMemo } from 'react';
import {
  Cpu,
  HardDrive,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ASSET_PATHS } from '../data/tutorials';

export type SystemRamOption = 8 | 16 | 32;
export type GpuTierOption = 'integrada' | 'entrada' | 'highend';
export type WorkloadOption = 'jogo-puro' | 'shaders-realistas' | 'modpack-pesado';

interface HardwareRecommendation {
  xmxFlagShort: string;
  allocatedGb: number;
  fullJvmArguments: string;
  maxTextureResolution: '32x' | '64x' | '128x' | '512x';
  textureReason: string;
  idealShaderProfile: 'Baixo' | 'Médio' | 'Alto' | 'Ultra';
  shaderSuggestion: string;
  diagnosticTitle: string;
  diagnosticNote: string;
  isWarning: boolean;
}

export const HardwareJvmCalculator: React.FC = () => {
  const [systemRam, setSystemRam] = useState<SystemRamOption>(16);
  const [gpuTier, setGpuTier] = useState<GpuTierOption>('entrada');
  const [workload, setWorkload] = useState<WorkloadOption>('shaders-realistas');
  const [copiedShort, setCopiedShort] = useState<boolean>(false);
  const [copiedFull, setCopiedFull] = useState<boolean>(false);

  const recommendation: HardwareRecommendation = useMemo(() => {
    // 1. Calculate optimal RAM allocation (-Xmx)
    let allocatedGb = 4;
    if (systemRam === 8) {
      if (workload === 'jogo-puro') allocatedGb = 3;
      else if (workload === 'shaders-realistas') allocatedGb = 4;
      else allocatedGb = 5;
    } else if (systemRam === 16) {
      if (workload === 'jogo-puro') allocatedGb = 4;
      else if (workload === 'shaders-realistas') allocatedGb = 6;
      else allocatedGb = 8;
    } else {
      // 32 GB
      if (workload === 'jogo-puro') allocatedGb = 4;
      else if (workload === 'shaders-realistas') allocatedGb = 8;
      else allocatedGb = 10;
    }

    const xmxFlagShort = `-Xmx${allocatedGb}G`;
    const fullJvmArguments =
      systemRam >= 16
        ? `-Xmx${allocatedGb}G -Xms${allocatedGb}G -XX:+UnlockExperimentalVMOptions -XX:+UseZGC -XX:+ZGenerational -XX:+AlwaysPreTouch -XX:+DisableExplicitGC`
        : `-Xmx${allocatedGb}G -Xms${allocatedGb}G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=35 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC`;

    // 2. Calculate Max Texture Resolution (32x, 64x, 128x, 512x)
    let maxTextureResolution: '32x' | '64x' | '128x' | '512x' = '64x';
    let textureReason = '';

    if (gpuTier === 'integrada') {
      maxTextureResolution = '32x';
      textureReason =
        'Placas integradas compartilham a RAM do sistema. Pacotes 32x (ex: Faithful 32x ou Prime’s HD 32x) mantêm alta nitidez sem estourar o buffer de vídeo.';
    } else if (gpuTier === 'entrada') {
      if (workload === 'modpack-pesado') {
        maxTextureResolution = '64x';
        textureReason =
          'Como Modpacks já carregam milhares de texturas extras na VRAM, manter 64x garante 60+ FPS estáveis sem engasgos.';
      } else {
        maxTextureResolution = '128x';
        textureReason =
          'Placas GTX/RTX de entrada (6GB–8GB VRAM) rodam pacotes PBR como Patrix 64x/128x com folga excelente.';
      }
    } else {
      // RTX High-End
      if (workload === 'modpack-pesado' && systemRam === 8) {
        maxTextureResolution = '128x';
        textureReason =
          'Sua GPU suporta 512x, mas com 8 GB de RAM no sistema é recomendado limitar a 128x para evitar paginação em disco.';
      } else {
        maxTextureResolution = '512x';
        textureReason =
          'Com ampla VRAM dedicada e largura de banda PCIe, você pode usar texturas 256x/512x com Parallax Occlusion Mapping (POM 3D) no máximo.';
      }
    }

    // 3. Calculate Ideal Shader Profile (Baixo, Médio, Alto, Ultra)
    let idealShaderProfile: 'Baixo' | 'Médio' | 'Alto' | 'Ultra' = 'Médio';
    let shaderSuggestion = '';

    if (gpuTier === 'integrada') {
      idealShaderProfile = 'Baixo';
      shaderSuggestion =
        'Use MakeUp - UltraFast ou Complementary no perfil "Low / Potato" com Shadow Resolution em 1024px.';
    } else if (gpuTier === 'entrada') {
      if (workload === 'modpack-pesado') {
        idealShaderProfile = 'Médio';
        shaderSuggestion =
          'Em modpacks pesados, use BSL ou Complementary no perfil "Medium" (Shadow Distance: 12 chunks) para manter 75+ FPS.';
      } else {
        idealShaderProfile = 'Alto';
        shaderSuggestion =
          'Complementary Unbound ou Bliss Shader no perfil "High" com LabPBR ativo e nuvens volumétricas.';
      }
    } else {
      // RTX High-End
      idealShaderProfile = 'Ultra';
      shaderSuggestion =
        'Complementary Unbound no perfil "Ultra" ou Path Tracing completo (Rethinking Voxels / SEUS PTGI) + Distant Horizons em 256 chunks.';
    }

    // 4. Diagnostic Alert
    const isWarning =
      (systemRam === 8 && workload === 'modpack-pesado') ||
      (gpuTier === 'integrada' && workload === 'shaders-realistas');

    const diagnosticTitle = isWarning
      ? 'Atenção: Combinação Exige Otimização Rigorosa (Sodium + FerriteCore)'
      : `Configuração Equilibrada (${allocatedGb} GB para o Jogo / ${systemRam - allocatedGb} GB Livres para Windows & GPU)`;

    const diagnosticNote =
      systemRam === 8 && workload === 'modpack-pesado'
        ? 'Com 8 GB de RAM total no PC, feche o navegador antes de abrir modpacks grandes e instale obrigatoriamente os mods FerriteCore e ModernFix.'
        : gpuTier === 'integrada' && workload === 'shaders-realistas'
        ? 'Em vídeo integrado (Intel Iris / AMD Vega), reduza a escala de renderização no menu do Iris para 75% para dobrar o FPS com Shaders ativos.'
        : 'Nunca aloque toda a RAM do PC para o Minecraft: o driver da placa de vídeo e o Distant Horizons precisam de memória livre fora do Java (Off-Heap).';

    return {
      xmxFlagShort,
      allocatedGb,
      fullJvmArguments,
      maxTextureResolution,
      textureReason,
      idealShaderProfile,
      shaderSuggestion,
      diagnosticTitle,
      diagnosticNote,
      isWarning,
    };
  }, [systemRam, gpuTier, workload]);

  const handleCopyShortFlag = () => {
    navigator.clipboard.writeText(recommendation.xmxFlagShort);
    setCopiedShort(true);
    setTimeout(() => setCopiedShort(false), 2000);
  };

  const handleCopyFullFlags = () => {
    navigator.clipboard.writeText(recommendation.fullJvmArguments);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  return (
    <section
      id="calculadora"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-2">
            <span>Ferramenta Interativa de Diagnóstico</span>
            <span aria-hidden="true">·</span>
            <span>Dimensionamento Automático de JVM, Texturas e Shaders</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Calculadora Interativa de Hardware & RAM
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Selecione a memória RAM instalada no seu PC, o nível da sua placa de vídeo e o objetivo de uso. O sistema calcula na hora o argumento exato da JVM, a resolução máxima de Resource Pack e o perfil ideal de Shader.
          </p>
        </div>
      </div>

      {/* Main Grid: 3 Selectors on Left (7 cols) + Automatic Results Dashboard on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: User Hardware & Workload Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Quantidade de RAM do PC */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">
                1. Quantidade de Memória RAM Total do seu PC
              </span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                {systemRam} GB RAM Instalados
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {([8, 16, 32] as const).map((ram) => {
                const isSelected = systemRam === ram;
                return (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => setSystemRam(ram)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                        : 'bg-zinc-900/90 text-zinc-200 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-lg font-mono tabular-nums font-bold">{ram} GB</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        isSelected ? 'text-slate-900 font-medium' : 'text-zinc-400'
                      }`}
                    >
                      {ram === 8
                        ? 'PC / Notebook Entrada'
                        : ram === 16
                        ? 'Padrão Gamer Ideal'
                        : 'Workstation / Entusiasta'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input 2: Placa de Vídeo (GPU) */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">
                2. Sua Placa de Vídeo (GPU)
              </span>
              <span className="text-zinc-400">
                Define o orçamento de Shaders e VRAM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'integrada' as const,
                  title: 'Integrada',
                  sub: 'Intel UHD / Iris Xe / AMD Radeon Vega',
                },
                {
                  id: 'entrada' as const,
                  title: 'GTX / RTX de Entrada',
                  sub: 'GTX 1650, RTX 3050, RTX 3060, RX 6600',
                },
                {
                  id: 'highend' as const,
                  title: 'RTX High-End',
                  sub: 'RTX 4070+, RTX 4080, RX 7800 XT / 7900',
                },
              ].map((gpu) => {
                const isSelected = gpuTier === gpu.id;
                return (
                  <button
                    key={gpu.id}
                    type="button"
                    onClick={() => setGpuTier(gpu.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-950/50 border-emerald-500 text-zinc-100'
                        : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-sm font-bold text-zinc-100">{gpu.title}</div>
                    <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {gpu.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input 3: O que você quer rodar */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">
                3. O que você quer rodar?
              </span>
              <span className="text-zinc-400">
                Ajusta o tamanho do Heap da JVM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'jogo-puro' as const,
                  title: 'Só Jogo Puro',
                  sub: 'Vanilla + Sodium & Lithium para FPS máximo',
                },
                {
                  id: 'shaders-realistas' as const,
                  title: 'Shaders Realistas',
                  sub: 'Complementary / BSL + Texturas PBR 3D',
                },
                {
                  id: 'modpack-pesado' as const,
                  title: 'Modpack Pesado',
                  sub: '150+ Mods, Distant Horizons ou Automação',
                },
              ].map((item) => {
                const isSelected = workload === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWorkload(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-950/50 border-emerald-500 text-zinc-100'
                        : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-sm font-bold text-zinc-100">{item.title}</div>
                    <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {item.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Callout */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              recommendation.isWarning
                ? 'bg-amber-950/25 border-amber-500/50'
                : 'bg-emerald-950/20 border-emerald-500/40'
            }`}
          >
            {recommendation.isWarning ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <p
                className={`font-semibold ${
                  recommendation.isWarning ? 'text-amber-200' : 'text-emerald-300'
                }`}
              >
                {recommendation.diagnosticTitle}
              </p>
              <p className="text-zinc-300 mt-1">{recommendation.diagnosticNote}</p>
            </div>
          </div>
        </div>

        {/* Right: Automatic Outputs Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <div className="text-xs text-emerald-400 font-semibold">
                Resultado Calculado Automaticamente
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mt-0.5">
                Parâmetros Recomendados para seu PC
              </h3>
            </div>
            <img
              src={ASSET_PATHS.voxelHardwareOptimization}
              alt="Ícone Técnico de Motor Voxel"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-lg object-cover border border-zinc-800 shrink-0"
            />
          </div>

          {/* Output 1: Exact JVM Argument */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Argumento de Memória da JVM</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Alocar {recommendation.allocatedGb} GB ({recommendation.allocatedGb * 1024} MB)
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <code className="text-xl font-bold font-mono text-emerald-400">
                {recommendation.xmxFlagShort}
              </code>
              <button
                type="button"
                onClick={handleCopyShortFlag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                {copiedShort ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar {recommendation.xmxFlagShort}</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Linha Completa com Garbage Collector Otimizado:</span>
                <button
                  type="button"
                  onClick={handleCopyFullFlags}
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  {copiedFull ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Linha Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar Linha Completa</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-2.5 rounded bg-slate-950/90 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all">
                {recommendation.fullJvmArguments}
              </pre>
            </div>
          </div>

          {/* Output 2 & 3: Texture Resolution + Ideal Shader Profile */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resolução Máx. de Textura</span>
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-zinc-100 mt-1.5">
                {recommendation.maxTextureResolution}
              </div>
              <div className="text-xs text-emerald-400 mt-1">
                Resource Pack PBR / HD
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-indigo-500/40">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Perfil Ideal de Shader</span>
              </div>
              <div className="text-2xl font-bold text-violet-300 mt-1.5">
                Perfil {recommendation.idealShaderProfile}
              </div>
              <div className="text-xs text-indigo-300 mt-1">
                Preset de Qualidade Iris
              </div>
            </div>
          </div>

          {/* Detailed Explanation of Recommendations */}
          <div className="space-y-2.5 text-xs text-zinc-300 border-t border-zinc-800 pt-4 leading-relaxed">
            <p>
              <strong className="text-zinc-100">Por que Texturas {recommendation.maxTextureResolution}:</strong>{' '}
              {recommendation.textureReason}
            </p>
            <p>
              <strong className="text-violet-300">Sugestão de Shader ({recommendation.idealShaderProfile}):</strong>{' '}
              {recommendation.shaderSuggestion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
