import React, { useState, useMemo } from 'react';
import {
  Boxes,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  MODS_DATABASE,
  ModItem,
  checkModpackCompatibility,
  CompatibilityReport,
} from '../data/modpackDatabase';

export const ModpackBuilder: React.FC = () => {
  const [targetVersion, setTargetVersion] = useState<string>('1.21.1');
  const [selectedLoader, setSelectedLoader] = useState<'Fabric' | 'NeoForge'>('Fabric');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchModQuery, setSearchModQuery] = useState<string>('');
  const [copiedExport, setCopiedExport] = useState<boolean>(false);

  // Default pre-selected foundation
  const [selectedModIds, setSelectedModIds] = useState<string[]>([
    'fabric-api',
    'sodium',
    'lithium',
    'ferrite-core',
    'iris',
  ]);

  // Run compatibility engine
  const report: CompatibilityReport = useMemo(() => {
    return checkModpackCompatibility(selectedModIds);
  }, [selectedModIds]);

  const toggleMod = (modId: string) => {
    setSelectedModIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const autoFixDependencies = () => {
    const missingIds = report.missingDependencies.map((d) => d.missingDependencyId);
    setSelectedModIds((prev) => Array.from(new Set([...prev, ...missingIds])));
  };

  const removeConflictingMod = (conflictName: string) => {
    const target = MODS_DATABASE.find((m) => m.name === conflictName);
    if (target) {
      setSelectedModIds((prev) => prev.filter((id) => id !== target.id));
    }
  };

  const applyPreset = (presetType: 'fps-boost' | 'shaders-dh' | 'technical-builder' | 'cozy-furniture') => {
    if (presetType === 'fps-boost') {
      setSelectedModIds([
        'fabric-api',
        'sodium',
        'lithium',
        'ferrite-core',
        'entity-culling',
        'modernfix',
        'appleskin',
        'mouse-tweaks',
      ]);
    } else if (presetType === 'shaders-dh') {
      setSelectedModIds([
        'fabric-api',
        'sodium',
        'lithium',
        'ferrite-core',
        'indium',
        'iris',
        'distant-horizons',
        'continuity',
        'tectonic',
      ]);
    } else if (presetType === 'cozy-furniture') {
      setSelectedModIds([
        'fabric-api',
        'sodium',
        'lithium',
        'ferrite-core',
        'handcrafted',
        'mrcrayfish-furniture-refurbished',
        'macaws-furniture',
        'toms-storage',
        'mouse-tweaks',
        'appleskin',
      ]);
    } else {
      // Technical builder
      setSelectedModIds([
        'fabric-api',
        'sodium',
        'lithium',
        'ferrite-core',
        'indium',
        'malilib',
        'litematica',
        'minihud',
        'mouse-tweaks',
        'appleskin',
        'chunky',
      ]);
    }
  };

  const filteredCatalog = useMemo(() => {
    return MODS_DATABASE.filter((mod) => {
      const matchesCategory = selectedCategory === 'Todos' || mod.category === selectedCategory;
      const q = searchModQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        mod.name.toLowerCase().includes(q) ||
        mod.role.toLowerCase().includes(q) ||
        mod.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchModQuery]);

  const exportManifestText = useMemo(() => {
    const activeMods = MODS_DATABASE.filter((m) => selectedModIds.includes(m.id));
    const lines = [
      `# CraftLab Modpack Manifesto — Minecraft ${targetVersion} (${selectedLoader})`,
      `# Total de Mods Selecionados: ${activeMods.length}`,
      `# Status de Compatibilidade: ${report.hasCriticalConflict ? 'CONFLITO DETECTADO' : '100% COMPATÍVEL & VERIFICADO'}`,
      '',
      '## Lista de Mods com Links Oficiais Modrinth:',
    ];

    activeMods.forEach((mod, idx) => {
      lines.push(`${idx + 1}. [${mod.name}](${mod.modrinthUrl}) — ${mod.role} (${mod.category})`);
    });

    if (report.shaderAlerts.length > 0) {
      lines.push('', '## Alertas de Shaders:');
      report.shaderAlerts.forEach((a) => {
        lines.push(`- ${a.modName}: ${a.note}`);
      });
    }

    return lines.join('\n');
  }, [selectedModIds, targetVersion, selectedLoader, report]);

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(exportManifestText);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([exportManifestText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `craftlab-modpack-${targetVersion}-${selectedLoader.toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="modpack-builder"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <Boxes className="w-4 h-4" />
            <span>Matriz de Compatibilidade & Otimização de Modpacks</span>
            <span aria-hidden="true">·</span>
            <span>Detecção Ativa de Conflitos (Exit Code 1)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Gerador & Verificador de Conflito de Modpacks
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Monte seu pacote de mods personalizado com garantia de estabilidade. O motor verifica conflitos fatais (como tentar rodar OptiFine com Sodium), aponta dependências obrigatórias ausentes e alerta sobre shaders compatíveis com o Distant Horizons.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => applyPreset('fps-boost')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 hover:border-emerald-500/50 text-xs font-semibold text-emerald-300 transition-colors whitespace-nowrap"
          >
            ⚡ Preset: FPS Máximo
          </button>
          <button
            type="button"
            onClick={() => applyPreset('shaders-dh')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 hover:border-violet-500/50 text-xs font-semibold text-violet-300 transition-colors whitespace-nowrap"
          >
            🎨 Preset: Shaders + 256 LOD
          </button>
          <button
            type="button"
            onClick={() => applyPreset('technical-builder')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 hover:border-blue-500/50 text-xs font-semibold text-blue-300 transition-colors whitespace-nowrap"
          >
            📐 Preset: Engenheiro Técnico
          </button>
          <button
            type="button"
            onClick={() => applyPreset('cozy-furniture')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-colors whitespace-nowrap"
          >
            🛋️ Preset: Casa & Móveis Seguros
          </button>
        </div>
      </div>

      {/* Real-time Compatibility Diagnostic Banner */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          report.conflicts.length > 0
            ? 'bg-red-950/25 border-red-500/60'
            : report.missingDependencies.length > 0
            ? 'bg-amber-950/25 border-amber-500/60'
            : 'bg-emerald-950/20 border-emerald-500/40'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {report.conflicts.length > 0 ? (
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            ) : report.missingDependencies.length > 0 ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            )}

            <div className="space-y-1">
              <h3
                className={`text-base font-bold ${
                  report.conflicts.length > 0
                    ? 'text-red-300'
                    : report.missingDependencies.length > 0
                    ? 'text-amber-300'
                    : 'text-emerald-300'
                }`}
              >
                {report.conflicts.length > 0
                  ? `Conflito Crítico Detectado: ${report.conflicts.length} incompatibilidade(s)`
                  : report.missingDependencies.length > 0
                  ? `Dependência Obrigatória Ausente: ${report.missingDependencies.length} mod(s) necessário(s)`
                  : `Modpack 100% Estável & Compatível (${selectedModIds.length} mods ativos)`}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {report.conflicts.length > 0
                  ? 'Dois ou mais mods selecionados conflitam diretamente e causarão fechamento imediato do jogo (Exit Code 1).'
                  : report.missingDependencies.length > 0
                  ? 'Alguns mods exigem bibliotecas complementares para carregar com sucesso.'
                  : 'Nenhum conflito de renderização ou dependência ausente encontrada. Pronto para jogar!'}
              </p>
            </div>
          </div>

          {/* Quick Auto-Fix Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
            {report.missingDependencies.length > 0 && (
              <button
                type="button"
                onClick={autoFixDependencies}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Instalar Dependências Ausentes</span>
              </button>
            )}

            {report.conflicts.map((c) => (
              <button
                key={c.modA}
                type="button"
                onClick={() => removeConflictingMod(c.modA === 'OptiFine (Legado)' ? c.modA : c.modB)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/50 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover {c.modA === 'OptiFine (Legado)' ? c.modA : c.modB}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Conflict / Dependency Cards (if any) */}
        {(report.conflicts.length > 0 || report.missingDependencies.length > 0 || report.shaderAlerts.length > 0) && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2.5 text-xs">
            {report.conflicts.map((conf, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-red-500/40 text-red-200 leading-relaxed">
                <strong className="text-red-400">{conf.modA} 💥 {conf.modB}:</strong> {conf.reason}{' '}
                <span className="text-zinc-300 font-medium">({conf.resolution})</span>
              </div>
            ))}

            {report.missingDependencies.map((dep, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-amber-500/40 text-amber-200 leading-relaxed">
                <strong className="text-amber-400">{dep.modName}:</strong> precisa de{' '}
                <strong className="text-zinc-100">{dep.missingDependencyName}</strong>. {dep.reason}
              </div>
            ))}

            {report.shaderAlerts.map((sh, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-indigo-500/40 text-indigo-200 leading-relaxed">
                <strong className="text-violet-300">{sh.modName} (Shader Alert):</strong> {sh.note}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two-Column Modpack Workspace: Catalog on Left (7 cols) + Selected Active Manifest on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mod Catalog with Filters */}
        <div className="lg:col-span-7 space-y-5">
          {/* Controls: Version + Loader + Search */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Versão do Minecraft
              </label>
              <select
                value={targetVersion}
                onChange={(e) => setTargetVersion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="1.21.1">Minecraft 1.21.1 (Mais Recente)</option>
                <option value="1.21">Minecraft 1.21 (Tricky Trials)</option>
                <option value="1.20.4">Minecraft 1.20.4 (LTS Estável)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Modloader
              </label>
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-950 border border-zinc-800">
                {(['Fabric', 'NeoForge'] as const).map((ldr) => (
                  <button
                    key={ldr}
                    type="button"
                    onClick={() => setSelectedLoader(ldr)}
                    className={`py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedLoader === ldr
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {ldr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Buscar Mod
              </label>
              <input
                type="text"
                value={searchModQuery}
                onChange={(e) => setSearchModQuery(e.target.value)}
                placeholder="Ex: Sodium, Iris, Litematica..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-zinc-800 text-xs">
            {['Todos', 'Performance', 'Gráficos & Shaders', 'Decoração & Móveis Seguros', 'Mecânicas & Utilitários', 'Mundo & Terreno', 'Legado / Proibido'].map(
              (cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>

          {/* Mod Cards List */}
          <div className="space-y-3">
            {filteredCatalog.map((mod) => {
              const isSelected = selectedModIds.includes(mod.id);
              const isLegacy = mod.category === 'Legado / Proibido';

              return (
                <div
                  key={mod.id}
                  onClick={() => toggleMod(mod.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMod(mod.id);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? isLegacy
                        ? 'bg-red-950/25 border-red-500'
                        : 'bg-emerald-950/20 border-emerald-500/70 shadow-sm'
                      : 'bg-slate-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-zinc-100 text-base">{mod.name}</span>
                        <span className="text-zinc-400 font-mono">· {mod.role}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                            isLegacy ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {mod.category}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-500">
                        <span>Loaders: {mod.loaders.join(', ')}</span>
                        {mod.dependencies.length > 0 && (
                          <span className="text-amber-400/90">
                            Exige: {mod.dependencies.join(', ')}
                          </span>
                        )}
                        {mod.incompatibilities.length > 0 && (
                          <span className="text-red-400/90">
                            Conflita com: {mod.incompatibilities.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                          isSelected
                            ? isLegacy
                              ? 'bg-red-600 text-white'
                              : 'bg-emerald-500 text-slate-950'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {isSelected ? '✓ Adicionado' : '+ Adicionar'}
                      </span>

                      <a
                        href={mod.modrinthUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        <span>Modrinth</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Pack Summary, Manifest & 1-Click Export */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-slate-950 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="text-xs text-emerald-400 font-semibold">
                  Seu Modpack em Construção
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mt-0.5">
                  {selectedModIds.length} Mods Selecionados
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedModIds([])}
                className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
              >
                Limpar Todos
              </button>
            </div>

            {/* Selected Active Mod Pills */}
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-1">
              {selectedModIds.length === 0 ? (
                <div className="text-xs text-zinc-500 py-4 text-center w-full">
                  Nenhum mod selecionado. Escolha no catálogo ao lado ou aplique um dos presets acima!
                </div>
              ) : (
                selectedModIds.map((id) => {
                  const m = MODS_DATABASE.find((item) => item.id === id);
                  const isConflict = m?.category === 'Legado / Proibido';
                  return (
                    <span
                      key={id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        isConflict
                          ? 'bg-red-950/60 border-red-500/60 text-red-200'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                      }`}
                    >
                      <span>{m?.name || id}</span>
                      <button
                        type="button"
                        onClick={() => toggleMod(id)}
                        className="text-zinc-400 hover:text-red-400 ml-0.5"
                        title="Remover mod"
                      >
                        ×
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            {/* Quick Export Manifest Preview */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Manifesto de Instalação (Markdown):</span>
                <span className="font-mono text-emerald-400">Pronto para Modrinth / Prism</span>
              </div>

              <pre className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {exportManifestText}
              </pre>
            </div>

            {/* Export Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyManifest}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                {copiedExport ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Lista</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadManifest}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar (.md)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
