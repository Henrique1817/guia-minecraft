import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Sliders,
  Eye,
  Cpu,
  Gauge,
  RotateCcw,
} from 'lucide-react';
import { SHADER_PRESETS, ASSET_PATHS, ShaderPreset } from '../data/tutorials';

interface PipelineFeatureToggle {
  id: string;
  label: string;
  configKey: string;
  configValueOn: string;
  configValueOff: string;
  costMs: number;
  vramGb: number;
  description: string;
}

const PIPELINE_TOGGLES: PipelineFeatureToggle[] = [
  {
    id: 'labpbr-pom',
    label: 'LabPBR 1.3 + Parallax Occlusion (POM 64 Samples)',
    configKey: 'MATERIAL_FORMAT=2\nPOM_ENABLED=true\nPOM_QUALITY=64',
    configValueOn: 'true',
    configValueOff: 'false',
    costMs: 1.8,
    vramGb: 1.4,
    description: 'Relevo tridimensional em tijolos e pedras + reflexos especulares físicos em metais e superfícies molhadas.',
  },
  {
    id: 'distant-horizons-lod',
    label: 'Integração Distant Horizons (256 Chunks LOD)',
    configKey: 'DH_TERRAIN_RENDERING=true\nDH_AMBIENT_OCCLUSION=true',
    configValueOn: 'true',
    configValueOff: 'false',
    costMs: 1.5,
    vramGb: 1.6,
    description: 'Renderiza cordilheiras e florestas até 256 chunks com neblina atmosférica contínua sem carregar ticks de blocos distantes.',
  },
  {
    id: 'volumetric-clouds-fog',
    label: 'Nuvens Volumétricas Multi-Camada & God Rays',
    configKey: 'LIGHTSHAFT_QUALI_DEFINE=3\nVOLUMETRIC_CLOUDS=true',
    configValueOn: 'true',
    configValueOff: 'false',
    costMs: 1.4,
    vramGb: 0.5,
    description: 'Feixes de luz crepusculares atravessando folhas e nuvens tridimensionais que projetam sombras no solo.',
  },
  {
    id: 'voxel-path-tracing',
    label: 'Voxel Cone Tracing & Luz Indireta Colorida (GI)',
    configKey: 'VOXEL_GI_BOUNCES=2\nCOLORED_LIGHTING_RADIUS=12',
    configValueOn: 'true',
    configValueOff: 'false',
    costMs: 3.9,
    vramGb: 1.8,
    description: 'Tochas, lanternas, lava e vitrais coloridos emitem luz rebatida realista com sombras suaves independentes.',
  },
  {
    id: 'water-caustics-waves',
    label: 'Cáusticas Submarinas & Refração Física da Água',
    configKey: 'WATER_REFLECT_QUALITY=2\nWATER_CAUSTICS=true',
    configValueOn: 'true',
    configValueOff: 'false',
    costMs: 0.9,
    vramGb: 0.3,
    description: 'Ondas geradas por ruído Gerstner com distorção óptica do fundo de rios e reflexo das nuvens.',
  },
];

export const ShaderPipelineLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SHADER_PRESETS[0].id);
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    'labpbr-pom': true,
    'distant-horizons-lod': true,
    'volumetric-clouds-fog': true,
    'voxel-path-tracing': false,
    'water-caustics-waves': true,
  });
  const [shadowResolution, setShadowResolution] = useState<number>(2048);
  const [renderScale, setRenderScale] = useState<number>(100);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);

  const currentPreset: ShaderPreset =
    SHADER_PRESETS.find((p) => p.id === selectedPresetId) || SHADER_PRESETS[0];

  const handleToggleFeature = (id: string) => {
    setActiveToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetDefaults = () => {
    setActiveToggles({
      'labpbr-pom': true,
      'distant-horizons-lod': true,
      'volumetric-clouds-fog': true,
      'voxel-path-tracing': selectedPresetId === 'rethinking-voxels-ptgi',
      'water-caustics-waves': true,
    });
    setShadowResolution(2048);
    setRenderScale(100);
  };

  // Compute simulated frame time (ms), estimated FPS at 1440p on a mid-high GPU (e.g. RTX 4070 / RX 7800 XT), and VRAM
  const extraToggleMs = PIPELINE_TOGGLES.reduce(
    (acc, item) => (activeToggles[item.id] ? acc + item.costMs : acc),
    0
  );
  const extraToggleVram = PIPELINE_TOGGLES.reduce(
    (acc, item) => (activeToggles[item.id] ? acc + item.vramGb : acc),
    0
  );

  const shadowMultiplier =
    shadowResolution === 1024 ? 0.82 : shadowResolution === 2048 ? 1.0 : 1.38;
  const scaleMultiplier = (renderScale / 100) * (renderScale / 100);

  const totalFrameTimeMs = Number(
    ((currentPreset.baseCostMs + extraToggleMs) * shadowMultiplier * scaleMultiplier).toFixed(1)
  );
  const estimatedFps = Math.max(24, Math.min(240, Math.round(1000 / totalFrameTimeMs)));
  const totalVramGb = Number(
    (currentPreset.vramUsageGb * 0.65 + extraToggleVram + (shadowResolution === 4096 ? 1.2 : 0.4)).toFixed(1)
  );

  const generatedShaderProfileText = [
    `# CraftLab Shader Profile — ${currentPreset.name}`,
    `# Salve como: shaderpacks/${currentPreset.id}.zip.txt`,
    `shadowMapResolution=${shadowResolution}`,
    `shadowDistance=${activeToggles['distant-horizons-lod'] ? '160.0' : '192.0'}`,
    `SHADER_RENDER_QUALITY=${(renderScale / 100).toFixed(2)}`,
    ...PIPELINE_TOGGLES.map((t) =>
      activeToggles[t.id] ? t.configKey : `# DESATIVADO: ${t.id}`
    ),
  ].join('\n');

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(generatedShaderProfileText);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2200);
  };

  return (
    <section
      id="shaders"
      className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 p-6 sm:p-10"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-indigo-500/20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-300 mb-2">
            <span>Engenharia Óptica & Iluminação Global</span>
            <span aria-hidden="true">·</span>
            <span>Iris 1.8 + LabPBR 1.3</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Laboratório de Shaders & Pipeline PBR
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Personalize os passes de sombreamento, mapas especulares e traçado de raios. Veja o impacto imediato no orçamento de milissegundos por quadro (Frametime), consumo de VRAM e exporte o arquivo <code className="text-indigo-300 font-mono">.zip.txt</code> pronto para a pasta <code className="text-indigo-300 font-mono">shaderpacks</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="self-start lg:self-auto flex items-center gap-2 px-4 py-2 text-xs font-medium text-indigo-200 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Perfil Recomendado</span>
        </button>
      </div>

      {/* Preset Selector Tabs */}
      <div className="mt-8">
        <div className="text-xs text-indigo-300/90 mb-3 font-medium">
          1. Escolha a Arquitetura Base do Shaderpack
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHADER_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  if (preset.id === 'rethinking-voxels-ptgi') {
                    setActiveToggles((prev) => ({ ...prev, 'voxel-path-tracing': true }));
                  }
                }}
                className={`text-left p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-950/45 border-violet-400/80 text-zinc-100 shadow-sm'
                    : 'bg-zinc-900/50 border-zinc-800/90 text-zinc-300 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs text-indigo-300 mb-1.5">
                  <span>{preset.pipeline}</span>
                  <span className="font-mono tabular-nums">{preset.baseCostMs} ms base</span>
                </div>
                <div className="text-base font-bold text-zinc-100">{preset.name}</div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {preset.description}
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span>Padrão: {preset.pbrSupport}</span>
                  <span className="text-violet-300 font-medium">
                    {isSelected ? 'Selecionado' : 'Ativar'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Sandbox */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Passes & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs text-indigo-300/90 mb-3 font-medium">
              2. Módulos de Renderização e Sombreamento Físico
            </div>
            <div className="space-y-3">
              {PIPELINE_TOGGLES.map((item) => {
                const isEnabled = !!activeToggles[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleFeature(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggleFeature(item.id);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                      isEnabled
                        ? 'bg-indigo-950/35 border-indigo-500/50'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-zinc-100">
                          {item.label}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                            isEnabled
                              ? 'bg-violet-500/20 text-violet-200 border border-violet-400/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {isEnabled ? 'ATIVO' : 'OFF'}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-zinc-400">
                          +{item.costMs} ms · +{item.vramGb} GB VRAM
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resolution & Shadow Map Controls */}
          <div className="p-5 rounded-xl border border-zinc-800/90 bg-zinc-900/50 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-300 font-medium">Resolução do Shadow Map</span>
                <span className="font-mono tabular-nums text-indigo-300 font-semibold">
                  {shadowResolution} x {shadowResolution}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1024, 2048, 4096].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setShadowResolution(res)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono tabular-nums border transition-colors whitespace-nowrap shrink-0 ${
                      shadowResolution === res
                        ? 'bg-violet-600 text-white border-violet-400 font-semibold'
                        : 'bg-slate-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {res}px
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                2048px oferece o melhor equilíbrio entre bordas de sombra suaves e alto FPS.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="shader-render-scale" className="text-zinc-300 font-medium">
                  Escala Interna de Renderização
                </label>
                <span className="font-mono tabular-nums text-indigo-300 font-semibold">
                  {renderScale}% ({renderScale < 100 ? 'Upscaling CAS' : 'Nativo'})
                </span>
              </div>
              <input
                id="shader-render-scale"
                type="range"
                min={65}
                max={125}
                step={5}
                value={renderScale}
                onChange={(e) => setRenderScale(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer mt-1"
              />
              <div className="flex justify-between text-xs font-mono tabular-nums text-zinc-500 mt-1">
                <span>65% (+FPS)</span>
                <span>100% (Nativo)</span>
                <span>125% (SSAA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Preview, Telemetry & Config Export (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Visual Preview Card */}
          <div className="rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950">
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={
                  activeToggles['voxel-path-tracing']
                    ? ASSET_PATHS.pbrShaderTemple
                    : ASSET_PATHS.ultraShaderLandscape
                }
                alt={currentPreset.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/85 border border-indigo-500/40 text-xs text-indigo-200 font-mono">
                {currentPreset.lightingModel.split('+')[0]}
              </div>

              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2">
                <div>
                  <div className="text-xs text-indigo-300">Simulação em 1440p (RTX 4070 / RX 7800 XT)</div>
                  <div className="text-lg font-bold text-white">{currentPreset.name}</div>
                </div>
              </div>
            </div>

            {/* Live Performance Metrics Bar */}
            <div className="p-4 grid grid-cols-3 gap-3 border-t border-zinc-800/90 bg-zinc-900/70">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Gauge className="w-3.5 h-3.5 text-violet-400" />
                  <span>FPS Estimado</span>
                </div>
                <div className="text-xl font-bold font-mono tabular-nums text-zinc-100 mt-1">
                  {estimatedFps} <span className="text-xs font-normal text-zinc-400">FPS</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Frametime</span>
                </div>
                <div className="text-xl font-bold font-mono tabular-nums text-indigo-300 mt-1">
                  {totalFrameTimeMs} <span className="text-xs font-normal text-zinc-400">ms</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Alocação VRAM</span>
                </div>
                <div
                  className={`text-xl font-bold font-mono tabular-nums mt-1 ${
                    totalVramGb > 8.0 ? 'text-amber-300' : 'text-emerald-400'
                  }`}
                >
                  {totalVramGb} <span className="text-xs font-normal text-zinc-400">GB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exportable .zip.txt Configuration */}
          <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Arquivo de Configuração (.zip.txt)</span>
              </div>

              <button
                type="button"
                onClick={handleCopyProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
              >
                {copiedConfig ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Perfil</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
              {generatedShaderProfileText}
            </pre>

            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
              <Eye className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                GPU Recomendada para este perfil: <strong className="text-zinc-200">{currentPreset.recommendedGpu}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
