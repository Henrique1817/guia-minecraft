import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sun, Moon, Eye, Layers } from 'lucide-react';
import { ASSET_PATHS } from '../data/tutorials';

interface SceneMode {
  id: 'golden-hour' | 'twilight-pbr';
  label: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  pipelineSummary: string;
  passLatencyMs: string;
  shadowMapSpec: string;
  giMode: string;
}

const SCENE_MODES: SceneMode[] = [
  {
    id: 'golden-hour',
    label: 'Vale Alpino (Golden Hour)',
    beforeLabel: 'Bedrock / Java Vanilla (OpenGL Fixo)',
    afterLabel: 'Ultra Realismo (Bliss DH + LabPBR + 256 LODs)',
    beforeImage: ASSET_PATHS.vanillaBedrockLandscape,
    afterImage: ASSET_PATHS.ultraShaderLandscape,
    pipelineSummary: 'Iris 1.8 + Sodium 0.6 + Distant Horizons 2.2',
    passLatencyMs: '6.8 ms / frame (147 FPS em 1440p)',
    shadowMapSpec: '2048px Cascaded Shadow Map + God Rays Volumétricos',
    giMode: 'Dispersão Rayleigh/Mie + Cáusticas de Água Físicas',
  },
  {
    id: 'twilight-pbr',
    label: 'Santuário Noturno (Path-Traced PBR)',
    beforeLabel: 'Iluminação por Lightmap Estático (Vanilla)',
    afterLabel: 'Path Tracing + Specular Maps + Aurora Boreal',
    beforeImage: ASSET_PATHS.vanillaBedrockLandscape,
    afterImage: ASSET_PATHS.pbrShaderTemple,
    pipelineSummary: 'Iris 1.8 + Rethinking Voxels + Patrix 64x LabPBR',
    passLatencyMs: '11.2 ms / frame (89 FPS em 1440p)',
    shadowMapSpec: 'Voxel Cone Tracing + Multi-Bounce GI',
    giMode: 'Reflexos Especulares LabPBR 1.3 em Pedra Molhada',
  },
];

export const VisualComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(54);
  const [sceneId, setSceneId] = useState<'golden-hour' | 'twilight-pbr'>('golden-hour');
  const [showWireframeOverlay, setShowWireframeOverlay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const activeScene = SCENE_MODES.find((s) => s.id === sceneId) || SCENE_MODES[0];

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, rawPercent));
    setSliderPosition(clamped);
  }, []);

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-5 sm:p-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-5 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <span>Comparador Óptico em Tempo Real</span>
            <span aria-hidden="true">·</span>
            <span>Arraste o divisor horizontal</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-100">
            Do Renderizador Base ao Pipeline Fotográfico
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-zinc-800">
            {SCENE_MODES.map((scene) => {
              const isActive = scene.id === sceneId;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setSceneId(scene.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {scene.id === 'golden-hour' ? (
                    <Sun className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                  <span>{scene.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowWireframeOverlay((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showWireframeOverlay
                ? 'bg-violet-600/20 border-violet-500/60 text-violet-200'
                : 'bg-slate-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Inspeção de Passes PBR</span>
          </button>
        </div>
      </div>

      {/* Interactive Split Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={(e) => updatePositionFromClientX(e.clientX)}
        className="relative w-full aspect-16/9 rounded-xl overflow-hidden select-none cursor-ew-resize border border-zinc-800 bg-slate-950"
      >
        {/* Right Layer (Ultra Realism / After) */}
        <img
          src={activeScene.afterImage}
          alt={activeScene.afterLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Optional PBR Inspection Grid Overlay */}
        {showWireframeOverlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(139, 92, 246, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.16) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          >
            <div className="absolute bottom-14 right-4 max-w-xs rounded-lg bg-slate-950/90 border border-violet-500/40 p-3 text-xs text-zinc-200 backdrop-blur-md">
              <p className="font-semibold text-violet-300 mb-1">
                Buffer LabPBR 1.3 Ativo
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Canal R: Rugosidade Perceptual · Canal G: Metalicidade F0 · Canal B: Porosidade & Subsurface Scattering · Canal A: Emissão Fotônica.
              </p>
            </div>
          </div>
        )}

        {/* Left Layer (Vanilla / Bedrock Before) clipped by sliderPosition */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={activeScene.beforeImage}
            alt={activeScene.beforeLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Top Corner Scrim Labels */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-md bg-slate-950/85 border border-zinc-800 text-xs text-zinc-300 pointer-events-none backdrop-blur-sm">
          {activeScene.beforeLabel}
        </div>

        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-slate-950/85 border border-violet-500/40 text-xs text-violet-200 pointer-events-none backdrop-blur-sm">
          {activeScene.afterLabel}
        </div>

        {/* Vertical Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Scrim Bar with Quick Percentage Presets */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono tabular-nums">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Corte Óptico: {Math.round(sliderPosition)}% Vanilla / {Math.round(100 - sliderPosition)}% Ultra Shader</span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {[
              { label: '100% Vanilla', val: 96 },
              { label: '50 / 50', val: 50 },
              { label: '100% Ultra Realismo', val: 4 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setSliderPosition(preset.val)}
                className="px-2.5 py-1 rounded bg-slate-900/90 hover:bg-zinc-800 text-xs text-zinc-200 border border-zinc-700/80 transition-colors whitespace-nowrap shrink-0"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Range Input + Telemetry Readout */}
      <div className="mt-5 pt-4 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <label
            htmlFor="comparison-range-slider"
            className="block text-xs text-zinc-400 mb-1.5 font-mono tabular-nums"
          >
            Posição da Cortina: {Math.round(sliderPosition)}%
          </label>
          <input
            id="comparison-range-slider"
            type="range"
            min={4}
            max={96}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="text-xs text-zinc-400">Pipeline de Renderização</div>
          <div className="text-sm font-medium text-zinc-100 mt-0.5">{activeScene.pipelineSummary}</div>
        </div>

        <div>
          <div className="text-xs text-zinc-400">Orçamento de Somras e Luz</div>
          <div className="text-sm font-medium text-zinc-100 mt-0.5">{activeScene.shadowMapSpec}</div>
        </div>

        <div>
          <div className="text-xs text-zinc-400">Tempo de Quadro Médio</div>
          <div className="text-sm font-mono tabular-nums text-emerald-400 font-semibold mt-0.5">
            {activeScene.passLatencyMs}
          </div>
        </div>
      </div>
    </div>
  );
};
