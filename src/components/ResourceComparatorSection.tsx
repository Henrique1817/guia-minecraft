import React from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  FolderOpen,
  ShieldCheck,
} from 'lucide-react';
import { RESOURCE_COMPARISON_CARDS } from '../data/tutorials';
import { VisualComparisonSlider } from './VisualComparisonSlider';

export const ResourceComparatorSection: React.FC = () => {
  return (
    <section id="recursos" className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <span>Arquitetura do Ecossistema Java</span>
            <span aria-hidden="true">·</span>
            <span>Fontes Seguras & Verificadas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Comparador Visual: Mods vs. Resource Packs vs. Shaders
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Quem migra do console/celular costuma confundir o papel de cada pacote. Entenda exatamente o que cada camada modifica no jogo, em qual pasta instalar e acesse diretamente os repositórios verificados do Modrinth.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Baixe apenas de repositórios auditados (Modrinth / CurseForge)</span>
        </div>
      </div>

      {/* 3 Explanatory Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {RESOURCE_COMPARISON_CARDS.map((card) => {
          const isShader = card.id === 'shaders';
          const isPack = card.id === 'resourcepacks';

          return (
            <div
              key={card.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
                isShader
                  ? 'bg-indigo-950/20 border-indigo-500/40'
                  : 'bg-zinc-900/50 border-zinc-800/90'
              }`}
            >
              <div className="space-y-5">
                {/* Card Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold ${
                        isShader
                          ? 'text-violet-300'
                          : isPack
                          ? 'text-emerald-300'
                          : 'text-emerald-400'
                      }`}
                    >
                      {card.id === 'mods'
                        ? 'Camada 01 · Mecânicas & Motor'
                        : card.id === 'resourcepacks'
                        ? 'Camada 02 · Superfície & Modelos 3D'
                        : 'Camada 03 · Luz, Água & Sombra'}
                    </span>
                    {card.id === 'mods' ? (
                      <Cpu className="w-4 h-4 text-emerald-400" />
                    ) : card.id === 'resourcepacks' ? (
                      <Layers className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-violet-400" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-100">{card.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* What it changes */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {card.whatItChanges}
                </p>

                {/* Technical Specs Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <FolderOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400">Formato e Pasta: </span>
                      <span className="font-mono text-zinc-100">
                        {card.fileFormatAndFolder}
                      </span>
                    </div>
                  </div>
                  <div className="text-zinc-400">
                    <strong className="text-zinc-200">Requisito:</strong> {card.loaderRequired}
                  </div>
                  <div className="text-zinc-400">
                    <strong className="text-zinc-200">Impacto no Hardware:</strong>{' '}
                    {card.performanceImpact}
                  </div>
                </div>

                {/* Concrete Examples */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-300">
                    Principais Exemplos da Comunidade:
                  </div>
                  <div className="space-y-2">
                    {card.examples.map((ex) => (
                      <div
                        key={ex.name}
                        className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-xs"
                      >
                        <span className="font-bold text-zinc-100">{ex.name}: </span>
                        <span className="text-zinc-400">{ex.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Safe Link to Modrinth */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80">
                <a
                  href={card.modrinthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isShader
                      ? 'bg-violet-600 hover:bg-violet-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  <span>{card.modrinthLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Optical Before/After Slider */}
      <VisualComparisonSlider />
    </section>
  );
};
