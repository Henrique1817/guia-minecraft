export interface ModItem {
  id: string;
  name: string;
  role: string;
  category: 'Performance' | 'Gráficos & Shaders' | 'Mecânicas & Utilitários' | 'Mundo & Terreno' | 'Decoração & Móveis Seguros' | 'Legado / Proibido';
  loaders: ('Fabric' | 'NeoForge' | 'Forge')[];
  versions: string[];
  dependencies: string[]; // IDs of required mods
  incompatibilities: string[]; // IDs of conflicting mods
  shaderNote?: string;
  modrinthUrl: string;
  recommended: boolean;
  description: string;
}

export const MODS_DATABASE: ModItem[] = [
  // PERFORMANCE & BASE
  {
    id: 'fabric-api',
    name: 'Fabric API',
    role: 'Biblioteca Base de Eventos',
    category: 'Performance',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: ['optifine'],
    modrinthUrl: 'https://modrinth.com/mod/fabric-api',
    recommended: true,
    description: 'Camada de ganchos essencial para que 99% dos mods da versão Fabric funcionem.',
  },
  {
    id: 'sodium',
    name: 'Sodium',
    role: 'Motor de Renderização OpenGL',
    category: 'Performance',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: ['optifine'],
    modrinthUrl: 'https://modrinth.com/mod/sodium',
    recommended: true,
    description: 'Substitui o motor gráfico legado do Minecraft. Triplica o FPS e elimina quedas bruscas.',
  },
  {
    id: 'lithium',
    name: 'Lithium',
    role: 'Otimização de Física e Ticks (MSPT)',
    category: 'Performance',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/lithium',
    recommended: true,
    description: 'Otimiza inteligência artificial de criaturas, física de blocos e redstone sem alterar a gameplay.',
  },
  {
    id: 'ferrite-core',
    name: 'FerriteCore',
    role: 'Compressão de Memória RAM (-45%)',
    category: 'Performance',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/ferrite-core',
    recommended: true,
    description: 'Compacta os estados de blocos armazenados na memória RAM do computador.',
  },
  {
    id: 'entity-culling',
    name: 'Entity Culling',
    role: 'Pular Desenho Atrás de Paredes',
    category: 'Performance',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/entityculling',
    recommended: true,
    description: 'Usa raycasting assíncrono para não gastar FPS renderizando baús e animais atrás de paredes.',
  },
  {
    id: 'modernfix',
    name: 'ModernFix',
    role: 'Correção de Vazamento de Memória & Carregamento',
    category: 'Performance',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/modernfix',
    recommended: true,
    description: 'Reduz o tempo de inicialização do jogo pela metade e estabiliza o heap da JVM.',
  },
  {
    id: 'indium',
    name: 'Indium',
    role: 'Ponte de Compatibilidade Sodium (FREX)',
    category: 'Performance',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['sodium'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/indium',
    recommended: true,
    description: 'Necessário para mods como Continuity e Litematica rodarem perfeitamente sobre o Sodium.',
  },

  // GRÁFICOS & SHADERS
  {
    id: 'iris',
    name: 'Iris Shaders',
    role: 'Carregador Moderno de Shaders & PBR',
    category: 'Gráficos & Shaders',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['sodium', 'fabric-api'],
    incompatibilities: ['optifine'],
    modrinthUrl: 'https://modrinth.com/mod/iris',
    recommended: true,
    description: 'Permite carregar pacotes de shaders (Complementary, BSL, Bliss) em conjunto com o Sodium.',
  },
  {
    id: 'distant-horizons',
    name: 'Distant Horizons',
    role: 'Renderizador de Horizonte 256 Chunks LOD',
    category: 'Gráficos & Shaders',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: ['optifine'],
    shaderNote: 'Exige Shaders com suporte a DH (Bliss, Complementary r5.3+, Photon). Shaders sem suporte deixam os chunks pretos.',
    modrinthUrl: 'https://modrinth.com/mod/distanthorizons',
    recommended: false,
    description: 'Gera malhas simplificadas no horizonte para enxergar cordilheiras a quilômetros de distância sem lag.',
  },
  {
    id: 'continuity',
    name: 'Continuity',
    role: 'Vidros Conectados & Texturas Unificadas',
    category: 'Gráficos & Shaders',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api', 'indium'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/continuity',
    recommended: true,
    description: 'Remove as bordas divisórias entre blocos de vidro e estantes de livros, unificando a aparência.',
  },
  {
    id: 'lambdynamiclights',
    name: 'LambDynamicLights',
    role: 'Iluminação Dinâmica ao Segurar Tocha',
    category: 'Gráficos & Shaders',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/lambdynamiclights',
    recommended: false,
    description: 'Tochas, lanternas e itens luminosos iluminam o ambiente enquanto você caminha segurando na mão.',
  },

  // MECÂNICAS & UTILITÁRIOS
  {
    id: 'malilib',
    name: 'MaLiLib',
    role: 'Biblioteca Base do Litematica / MiniHUD',
    category: 'Mecânicas & Utilitários',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/malilib',
    recommended: true,
    description: 'Biblioteca técnica obrigatória criada pelo masa para gerenciar atalhos e configurações.',
  },
  {
    id: 'litematica',
    name: 'Litematica',
    role: 'Hologramas 3D & Lista de Construção',
    category: 'Mecânicas & Utilitários',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['malilib', 'fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/litematica',
    recommended: true,
    description: 'Projeta hologramas azuis dentro do seu mundo para construir megaprojetos e farms sem errar blocos.',
  },
  {
    id: 'minihud',
    name: 'MiniHUD',
    role: 'HUD Técnico de Coordenadas e Luz',
    category: 'Mecânicas & Utilitários',
    loaders: ['Fabric'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['malilib', 'fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/minihud',
    recommended: false,
    description: 'Exibe coordenadas XYZ compactas, orientação da bússola, FPS e nível de luz dos blocos.',
  },
  {
    id: 'mouse-tweaks',
    name: 'Mouse Tweaks',
    role: 'Mecânica Aprimorada de Inventário',
    category: 'Mecânicas & Utilitários',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/mouse-tweaks',
    recommended: true,
    description: 'Permite arrastar com o botão do mouse para distribuir ou coletar itens no inventário rapidamente.',
  },
  {
    id: 'appleskin',
    name: 'AppleSkin',
    role: 'Indicador de Saturação de Comida',
    category: 'Mecânicas & Utilitários',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/appleskin',
    recommended: true,
    description: 'Mostra na barra de comida exatamente quanta saturação cada alimento recupera antes de comer.',
  },

  // MUNDO & TERRENO
  {
    id: 'tectonic',
    name: 'Tectonic',
    role: 'Montanhas Continentais & Rios Largos',
    category: 'Mundo & Terreno',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/tectonic',
    recommended: false,
    description: 'Reformula a geração de terreno com montanhas de 300 blocos de altura e cânions navegáveis.',
  },
  {
    id: 'chunky',
    name: 'Chunky',
    role: 'Pré-Gerador Assíncrono de Chunks',
    category: 'Mundo & Terreno',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: [],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/chunky',
    recommended: false,
    description: 'Pré-carrega o mapa em segundo plano para você voar de elytra sem esperar os chunks renderizarem.',
  },

  // DECORAÇÃO, MÓVEIS SEGUROS & ARMAZENAMENTO (100% MODRINTH CERTIFICADOS)
  {
    id: 'handcrafted',
    name: 'Handcrafted',
    role: 'Móveis Nobres Vanilla+ (Camas, Mesas, Sofás)',
    category: 'Decoração & Móveis Seguros',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/handcrafted',
    recommended: true,
    description: 'Adiciona móveis de altíssima qualidade que combinam com o visual do Minecraft. Camas com lençóis estofados, sofás onde você pode sentar, balcões de cozinha, prateleiras funcionais e mesas. 100% gratuito e seguro no Modrinth.',
  },
  {
    id: 'mrcrayfish-furniture-refurbished',
    name: "MrCrayfish's Furniture: Refurbished",
    role: 'Eletrodomésticos, Cozinha e Salas Modernas',
    category: 'Decoração & Móveis Seguros',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/refurbished-furniture',
    recommended: true,
    description: 'A versão moderna do lendário mod de móveis. Geladeiras que congelam e guardam comida, fogões com grill, luminárias conectáveis e armários com gavetas funcionais sem risco de malware.',
  },
  {
    id: 'macaws-furniture',
    name: "Macaw's Furniture",
    role: 'Carpintaria Rústica & Gaveteiros Leves',
    category: 'Decoração & Móveis Seguros',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/macaws-furniture',
    recommended: true,
    description: 'Adiciona dezenas de variações para cada tipo de madeira do jogo: estantes de livros, mesas de cabeceira, guarda-roupas e cômodas. Não consome FPS nem gera lag.',
  },
  {
    id: 'toms-storage',
    name: "Tom's Simple Storage Mod",
    role: 'Robô de Triagem & Terminal Central de Baús',
    category: 'Decoração & Móveis Seguros',
    loaders: ['Fabric', 'NeoForge', 'Forge'],
    versions: ['1.21.1', '1.21', '1.20.4'],
    dependencies: ['fabric-api'],
    incompatibilities: [],
    modrinthUrl: 'https://modrinth.com/mod/toms-storage',
    recommended: true,
    description: 'Conecta todos os baús da sua casa em 1 único terminal com barra de pesquisa. Inclui cabos simples, funil sem fio e organizador automático estilo "robozinho" sem a complexidade de eletricidade de outros mods.',
  },

  // MODS LEGADOS OU INCOMPATÍVEIS (PARA ALERTAS DIDÁTICOS)
  {
    id: 'optifine',
    name: 'OptiFine (Legado)',
    role: 'Mod Gráfico Fechado dos Anos 2012–2020',
    category: 'Legado / Proibido',
    loaders: ['Forge'],
    versions: ['1.20.4'],
    dependencies: [],
    incompatibilities: ['sodium', 'iris', 'fabric-api'],
    modrinthUrl: 'https://optifine.net',
    recommended: false,
    description: 'Mod de código fechado que quebra compatibilidade com Sodium, Iris e a maioria dos mods da 1.21.',
  },
];

export interface CompatibilityReport {
  hasCriticalConflict: boolean;
  conflicts: {
    modA: string;
    modB: string;
    reason: string;
    resolution: string;
  }[];
  missingDependencies: {
    modName: string;
    missingDependencyName: string;
    missingDependencyId: string;
    reason: string;
  }[];
  shaderAlerts: {
    modName: string;
    note: string;
  }[];
  recommendedMissing: {
    name: string;
    role: string;
    id: string;
  }[];
}

export function checkModpackCompatibility(selectedModIds: string[]): CompatibilityReport {
  const selectedSet = new Set(selectedModIds);
  const conflicts: CompatibilityReport['conflicts'] = [];
  const missingDependencies: CompatibilityReport['missingDependencies'] = [];
  const shaderAlerts: CompatibilityReport['shaderAlerts'] = [];

  // 1. Check direct incompatibilities
  selectedModIds.forEach((modId) => {
    const mod = MODS_DATABASE.find((m) => m.id === modId);
    if (!mod) return;

    mod.incompatibilities.forEach((conflictId) => {
      if (selectedSet.has(conflictId)) {
        const conflictMod = MODS_DATABASE.find((m) => m.id === conflictId);
        // Avoid duplicate pair report
        const alreadyReported = conflicts.some(
          (c) =>
            (c.modA === mod.name && c.modB === (conflictMod?.name || conflictId)) ||
            (c.modA === (conflictMod?.name || conflictId) && c.modB === mod.name)
        );
        if (!alreadyReported) {
          conflicts.push({
            modA: mod.name,
            modB: conflictMod?.name || conflictId,
            reason: `Ambos os mods tentam reescrever o mesmo subsistema gráfico do Minecraft e fecharão o jogo com código de saída 1 (Exit Code 1).`,
            resolution: `Remova o ${conflictMod?.name || conflictId} e mantenha o stack moderno ${mod.name}.`,
          });
        }
      }
    });

    // 2. Check dependencies
    mod.dependencies.forEach((depId) => {
      if (!selectedSet.has(depId)) {
        const depMod = MODS_DATABASE.find((m) => m.id === depId);
        missingDependencies.push({
          modName: mod.name,
          missingDependencyName: depMod?.name || depId,
          missingDependencyId: depId,
          reason: `O mod ${mod.name} precisa da biblioteca ${depMod?.name || depId} para inicializar seus ganchos.`,
        });
      }
    });

    // 3. Shader warnings
    if (mod.shaderNote) {
      shaderAlerts.push({
        modName: mod.name,
        note: mod.shaderNote,
      });
    }
  });

  // 4. Recommended performance foundations missing
  const recommendedMissing: CompatibilityReport['recommendedMissing'] = [];
  ['fabric-api', 'sodium', 'lithium', 'ferrite-core'].forEach((foundationId) => {
    if (!selectedSet.has(foundationId)) {
      const fMod = MODS_DATABASE.find((m) => m.id === foundationId);
      if (fMod) {
        recommendedMissing.push({
          name: fMod.name,
          role: fMod.role,
          id: fMod.id,
        });
      }
    }
  });

  return {
    hasCriticalConflict: conflicts.length > 0 || missingDependencies.length > 0,
    conflicts,
    missingDependencies,
    shaderAlerts,
    recommendedMissing,
  };
}
