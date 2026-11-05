import React, { useState } from 'react';
import {
  Stethoscope,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Terminal,
  Copy,
  Check,
  FileText,
  Cpu,
  RotateCcw,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface DiagnosticStep {
  stepNumber: number;
  title: string;
  action: string;
  commandOrSetting: string;
  expectedResult: string;
}

interface DiagnosticResult {
  diagnosisTitle: string;
  detectedBottleneck: string;
  severity: string;
  hardwareSummary: string;
  steps: DiagnosticStep[];
  quickTip: string;
}

interface PresetScenario {
  id: string;
  label: string;
  category: 'Sintoma de FPS' | 'Texto da Tela F3' | 'Relatório de Crash';
  content: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'shader-15fps-igpu',
    label: 'Shader a 15 FPS em PC com Placa de Vídeo',
    category: 'Sintoma de FPS',
    content:
      'Instalei o Complementary Shader Unbound no Minecraft 1.21 mas meu FPS caiu para 15 mesmo tendo um notebook gamer com placa NVIDIA RTX 3050 e 16GB de RAM. Sem shader também não passa de 45 FPS e o cooler do processador fica no máximo.',
  },
  {
    id: 'f3-dump-sample',
    label: 'Exemplo de Texto da Tela F3 (Gargalo Triplo)',
    category: 'Texto da Tela F3',
    content: `Minecraft 1.21.1 (1.21.1/fabric/release)
22 fps T: 120 vsyncfancy B: 2
Sodium Renderer (0.6.0+mc1.21.1)
D: 28, pC: 000, pU: 00, aB: 14
Java: 21.0.3 64bit | Mem: 94% 1925/2048MB | Allocated: 100% 2048MB
CPU: 12x 12th Gen Intel(R) Core(TM) i5-12450H
Display: 1920x1080 (Intel Corporation)
Intel(R) UHD Graphics
4.6.0 - Build 31.0.101.4502
Loaded Shaderpack: ComplementaryUnbound_r5.3.zip (Profile: ULTRA, ShadowDistance: 24.0)`,
  },
  {
    id: 'crash-log-sample',
    label: 'Crash Log: Jogo Fecha ao Abrir (Exit Code 1)',
    category: 'Relatório de Crash',
    content: `---- Minecraft Crash Report ----
Time: 2026-11-05 18:14:22
Description: Initializing game
net.fabricmc.loader.impl.FormattedException: Incompatible mod set!
Mod resolution failed:
- Mod 'Litematica' (litematica) 0.19.50 requires version 0.21.0 or later of mod 'MaLiLib' (malilib), which is missing!
- Found conflicting rendering mods: OptiFine_1.21.1_HD_U_J1.jar and sodium-fabric-0.6.0+mc1.21.1.jar in /mods folder.
Exit Code: 1`,
  },
  {
    id: 'stutter-modpack',
    label: 'Congeladas de 1 Segundo a Cada 5 Segundos',
    category: 'Sintoma de FPS',
    content:
      'Estou jogando um modpack com 180 mods e Distant Horizons. Meu FPS fica em 110, mas a cada 4 ou 5 segundos a tela congela totalmente por 1 segundo inteiro enquanto corro pelo mapa, e depois volta ao normal. Tenho 16GB de RAM no PC.',
  },
];

export const DoctorFpsCrashAi: React.FC = () => {
  const [inputCategory, setInputCategory] = useState<
    'Sintoma de FPS' | 'Texto da Tela F3' | 'Relatório de Crash'
  >('Sintoma de FPS');
  const [userInput, setUserInput] = useState<string>(PRESET_SCENARIOS[0].content);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [copiedStepIndex, setCopiedStepIndex] = useState<number | null>(null);

  const handleSelectPreset = (preset: PresetScenario) => {
    setInputCategory(preset.category);
    setUserInput(preset.content);
    setErrorMsg(null);
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) {
      setErrorMsg('Por favor, descreva seu problema ou cole o texto do F3 / Crash Log.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/doctor-fps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          inputCategory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao analisar o diagnóstico.');
      }

      setResult(data as DiagnosticResult);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Falha de comunicação com o servidor de diagnóstico.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCommand = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStepIndex(idx);
    setTimeout(() => setCopiedStepIndex(null), 2000);
  };

  return (
    <section
      id="doutor-fps"
      className="rounded-3xl border border-emerald-500/35 bg-gradient-to-b from-slate-950 via-emerald-950/15 to-slate-950 p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <Stethoscope className="w-4 h-4" />
            <span>Diagnóstico Inteligente com IA (Gemini 2.5 Flash)</span>
            <span aria-hidden="true">·</span>
            <span>Análise de F3, Crash Logs e Gargalos de GPU/RAM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Doutor FPS & Crash (IA)
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Cole o texto da sua tela de <code className="text-emerald-300 font-mono">F3</code>, um relatório de erro (<code className="text-emerald-300 font-mono">Crash Log</code>) ou descreva o que está acontecendo. A IA verifica instantaneamente se o jogo está na placa integrada Intel/AMD em vez da dedicada, se falta RAM alocada na JVM ou se a Render Distance está sobrecarregando seu PC, entregando <strong>3 passos práticos</strong> para resolver.
          </p>
        </div>

        {result && (
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setErrorMsg(null);
            }}
            className="self-start lg:self-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar Resultado</span>
          </button>
        )}
      </div>

      {/* Main Split Interface: Input Form on Left (5 cols) + 3-Step AI Output on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Panel */}
        <form onSubmit={handleAnalyze} className="lg:col-span-5 space-y-5">
          {/* Category Selector */}
          <div>
            <div className="text-xs font-medium text-zinc-300 mb-2">
              1. O que você deseja analisar?
            </div>
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-zinc-800">
              {(
                ['Sintoma de FPS', 'Texto da Tela F3', 'Relatório de Crash'] as const
              ).map((cat) => {
                const active = inputCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setInputCategory(cat)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 truncate ${
                      active
                        ? 'bg-emerald-500 text-slate-950 font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Example Scenarios */}
          <div>
            <div className="text-xs font-medium text-zinc-400 mb-2">
              Ou teste agora com um caso real em 1 clique:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SCENARIOS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="text-[11px] text-emerald-400 font-medium">
                    {preset.category}
                  </div>
                  <div className="text-xs text-zinc-200 font-semibold truncate mt-0.5">
                    {preset.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="doctor-fps-textarea" className="font-medium text-zinc-200">
                2. Cole o texto do F3, Crash Log ou descreva o problema
              </label>
              <button
                type="button"
                onClick={() => setUserInput('')}
                className="text-zinc-400 hover:text-zinc-200"
              >
                Limpar texto
              </button>
            </div>
            <textarea
              id="doctor-fps-textarea"
              rows={8}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Ex: "Instalei o Shader mas meu FPS caiu para 15 mesmo tendo placa de vídeo RTX 3060..." ou cole o log completo do erro aqui.'
              className="w-full p-4 rounded-xl bg-slate-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-mono text-zinc-100 placeholder:text-zinc-600 leading-relaxed resize-y"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analisando Placa de Vídeo, RAM e Logs com Gemini 2.5 Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Diagnosticar Problema & Gerar 3 Passos Práticos</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right Column: AI Diagnosis Output (7 cols) */}
        <div className="lg:col-span-7">
          {!result && !isLoading ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-medium">
                    Pronto para Análise Técnica
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">
                    O que o Doutor FPS & Crash verifica automaticamente:
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Cpu className="w-4 h-4" />
                    <span>1. GPU Integrada vs. RTX</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Detecta se o <code className="text-zinc-200 font-mono">javaw.exe</code> está preso na Intel UHD / Radeon Vega em vez da sua placa de vídeo dedicada.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
                    <Terminal className="w-4 h-4" />
                    <span>2. Alocação de RAM (-Xmx)</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Identifica se o jogo está engasgando no limite padrão de 2 GB ou sofrendo pausas de Garbage Collector.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                    <FileText className="w-4 h-4" />
                    <span>3. Chunks, Shaders & Mods</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Aponta Render Distance/Shadow Distance exageradas e conflitos fatais como OptiFine + Sodium.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Dica rápida:</strong> Clique em{' '}
                <strong className="text-emerald-400">"Diagnosticar Problema & Gerar 3 Passos Práticos"</strong>{' '}
                ao lado para testar imediatamente com o cenário carregado ou cole seu próprio relato!
              </div>
            </div>
          ) : isLoading ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-zinc-900/50 p-12 text-center space-y-4">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-100">
                  Inspecionando Telemetria de Hardware e Parâmetros da JVM...
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  O Gemini 2.5 Flash está cruzando os dados da sua GPU, alocação de RAM, Render Distance e mods para montar os 3 passos de correção.
                </p>
              </div>
            </div>
          ) : (
            result && (
              <div className="rounded-2xl border border-emerald-500/40 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
                {/* Diagnosis Summary Banner */}
                <div className="border-b border-zinc-800 pb-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-emerald-400 font-semibold">
                      Gargalo Detectado: {result.detectedBottleneck}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        result.severity === 'Crítico'
                          ? 'text-red-300 font-semibold'
                          : 'text-amber-300 font-semibold'
                      }
                    >
                      Severidade {result.severity}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                    {result.diagnosisTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {result.hardwareSummary}
                  </p>
                </div>

                {/* 3 Practical Steps */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-emerald-400">
                    Plano de Ação Direto (3 Passos Práticos):
                  </div>

                  {result.steps.map((step, idx) => (
                    <div
                      key={step.stepNumber || idx}
                      className="p-5 rounded-xl bg-slate-950/90 border border-zinc-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-zinc-100">
                          Passo 0{step.stepNumber || idx + 1}: {step.title}
                        </h4>
                        <span className="text-xs font-mono text-emerald-400">
                          Ação 0{idx + 1}/03
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {step.action}
                      </p>

                      {step.commandOrSetting && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                          <code className="text-xs font-mono text-emerald-300 break-all">
                            {step.commandOrSetting}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyCommand(step.commandOrSetting, idx)}
                            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                          >
                            {copiedStepIndex === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      <div className="pt-1 flex items-start gap-2 text-xs text-zinc-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-zinc-200">Resultado esperado:</strong>{' '}
                          {step.expectedResult}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra Quick Tip */}
                {result.quickTip && (
                  <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-zinc-200 leading-relaxed">
                    <strong className="text-emerald-400">Dica Extra do Doutor FPS: </strong>
                    {result.quickTip}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
