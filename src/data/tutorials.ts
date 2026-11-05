export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export type TutorialCategory =
  | 'Migração & Atalhos'
  | 'Performance & GPU'
  | 'Shaders & PBR 3D'
  | 'Modpacks & Engenharia';

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  commandOrPath?: string;
  commandLabel?: string;
  verificationCheck: string;
}

export interface VerificationAlert {
  id: string;
  severity: 'Crítico' | 'Atenção' | 'Verificação';
  title: string;
  detail: string;
  resolution: string;
}

export interface HardwareTip {
  component: 'GPU' | 'RAM' | 'CPU' | 'Armazenamento' | 'JVM';
  minimumSpec: string;
  recommendedSpec: string;
  optimizationAdvice: string;
  fpsImpact: string;
}

export interface TutorialItem {
  id: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  level: SkillLevel;
  estimatedTime: string;
  category: TutorialCategory;
  edition: string;
  modloader: string;
  summary: string;
  targetFpsGain: string;
  vramRequirement: string;
  steps: TutorialStep[];
  verificationAlerts: VerificationAlert[];
  hardwareTips: HardwareTip[];
  recommendedMods: {
    name: string;
    role: string;
    source: string;
    url: string;
  }[];
}

export interface JourneyTrack {
  level: SkillLevel;
  tagline: string;
  title: string;
  description: string;
  highlights: string[];
  accentColor: 'emerald' | 'violet' | 'blue';
}

export interface ResourceComparisonItem {
  id: 'mods' | 'resourcepacks' | 'shaders';
  title: string;
  subtitle: string;
  whatItChanges: string;
  fileFormatAndFolder: string;
  loaderRequired: string;
  performanceImpact: string;
  examples: {
    name: string;
    detail: string;
  }[];
  modrinthUrl: string;
  modrinthLabel: string;
}

export interface ShaderPreset {
  id: string;
  name: string;
  pipeline: 'Iris + Sodium (OpenGL/Vulkan)' | 'OptiFine / Iris Path-Traced';
  lightingModel: string;
  vramUsageGb: number;
  baseCostMs: number;
  pbrSupport: 'LabPBR 1.3 Completo' | 'Integrated PBR + Normal Maps';
  atmosphereFeatures: string[];
  description: string;
  recommendedGpu: string;
  accentTone: 'violet' | 'indigo' | 'blue';
}

export const ASSET_PATHS = {
  ultraShaderLandscape: '/src/assets/images/ultra_shader_landscape_1793887698629.jpg',
  vanillaBedrockLandscape: '/src/assets/images/vanilla_bedrock_landscape_1793887700528.jpg',
  pbrShaderTemple: '/src/assets/images/pbr_shader_temple_1793887701235.jpg',
  voxelHardwareOptimization: '/src/assets/images/voxel_hardware_optimization_1793887701578.jpg',
};

export const JOURNEY_TRACKS: JourneyTrack[] = [
  {
    level: 'Iniciante',
    tagline: 'Migração Celular/Console para PC',
    title: 'Iniciante: Domínio do Java & FPS Instantâneo',
    description:
      'Entenda as diferenças mecânicas entre Bedrock e Java, domine os atalhos de teclado/mouse que aceleram o inventário e instale a dupla Iris + Sodium para triplicar o FPS.',
    highlights: [
      'Diferenças de Redstone, Combate (Cooldown) e Off-hand entre Bedrock e Java',
      'Atalhos F3, F3+G (Chunks), Shift-Click, Tecla F e Roleta do Mouse',
      'Instalação em 1 clique do Iris + Sodium para substituir o OpenGL legado',
    ],
    accentColor: 'emerald',
  },
  {
    level: 'Intermediário',
    tagline: 'Realismo Visual & Sintonia de GPU',
    title: 'Intermediário: Shaders, PBR 3D & GPU Dedicada',
    description:
      'Configure Shaders cinematográficos (Complementary Unbound e BSL), texturas com relevo 3D (Patrix e Prime’s HD), aloque a memória RAM certa na JVM e force o uso da sua NVIDIA RTX no Windows.',
    highlights: [
      'Shaders Complementary Unbound & BSL com iluminação volumétrica e reflexos',
      'Resource Packs LabPBR 1.3 com Parallax Occlusion Mapping (relevo 3D real)',
      'Forçar javaw.exe na GPU dedicada NVIDIA RTX e ajuste de flags -Xmx',
    ],
    accentColor: 'violet',
  },
  {
    level: 'Avançado',
    tagline: 'Modpacks, Automação & Engenharia',
    title: 'Avançado: Launchers, Horizonte Infinito & Litematica',
    description:
      'Isole instâncias com Prism Launcher ou Modrinth App, renderize 256 chunks sem lag usando Distant Horizons, projete hologramas com Litematica e suba servidores locais.',
    highlights: [
      'Gerenciamento de instâncias isoladas no Prism Launcher e Modrinth App',
      'Distant Horizons 2.2+ com visão de 256 chunks integrada a Shaders',
      'Hologramas de construção com Litematica e criação de servidor Paper/Fabric',
    ],
    accentColor: 'blue',
  },
];

export const RESOURCE_COMPARISON_CARDS: ResourceComparisonItem[] = [
  {
    id: 'mods',
    title: 'Mods (Modificações de Código)',
    subtitle: 'Alteram a programação, física, interface, geração de mundo e motor de FPS.',
    whatItChanges:
      'Reescrevem ou expandem o código Java do jogo. Podem desde otimizar o motor de renderização (Sodium) e exibir hologramas técnicos (Litematica) até adicionar centenas de máquinas, dimensões e magias.',
    fileFormatAndFolder: 'Arquivos .jar colocados na pasta /mods',
    loaderRequired: 'Exige Fabric, NeoForge ou Quilt instalados na instância',
    performanceImpact:
      'Mods de otimização aumentam até +300% de FPS; mods de conteúdo exigem mais CPU e Memória RAM.',
    examples: [
      { name: 'Sodium & Lithium', detail: 'Multiplicam a taxa de quadros e otimizam a física do jogo.' },
      { name: 'Distant Horizons', detail: 'Adiciona sistema LOD para enxergar 256 chunks sem lag.' },
      { name: 'Litematica', detail: 'Projeta esquemas holográficos 3D para construções complexas.' },
    ],
    modrinthUrl: 'https://modrinth.com/mods',
    modrinthLabel: 'Explorar Mods Verificados no Modrinth',
  },
  {
    id: 'resourcepacks',
    title: 'Resource Packs (Pacotes de Recursos)',
    subtitle: 'Mudam texturas dos blocos, modelos 3D de itens, sons, fontes e mapas de relevo PBR.',
    whatItChanges:
      'Substituem os arquivos visuais e sonoros sem alterar as regras do jogo. Quando combinados com Shaders compatíveis com LabPBR, fornecem mapas de rugosidade, metalicidade e relevo 3D (POM).',
    fileFormatAndFolder: 'Arquivos .zip colocados na pasta /resourcepacks',
    loaderRequired: 'Funciona nativamente (PBR e texturas conectadas usam Iris + Continuity)',
    performanceImpact:
      'Impacta diretamente o consumo de VRAM da placa de vídeo conforme a resolução (32x a 512x).',
    examples: [
      { name: 'Patrix 32x / 64x', detail: 'Transformação fotográfica completa com suporte a relevo 3D PBR.' },
      { name: "Prime's HD Textures", detail: 'Fidelidade fiel ao estilo clássico com mapas especulares e normais.' },
      { name: 'Fresh Animations', detail: 'Reanima todos os aldeões e criaturas com movimentos fluidos.' },
    ],
    modrinthUrl: 'https://modrinth.com/resourcepacks',
    modrinthLabel: 'Baixar Resource Packs no Modrinth',
  },
  {
    id: 'shaders',
    title: 'Shaders (Pipelines de Luz e Sombra)',
    subtitle: 'Transformam a iluminação, sombras dinâmicas, água física, nuvens e reflexos.',
    whatItChanges:
      'Substituem o pipeline gráfico fixo por cálculos matemáticos de luz em tempo real na GPU: feixes solares volumétricos, ondas com refração óptica, reflexos em superfícies molhadas e Path Tracing.',
    fileFormatAndFolder: 'Arquivos .zip colocados na pasta /shaderpacks',
    loaderRequired: 'Exige o mod Iris Shaders (junto ao Sodium)',
    performanceImpact:
      'Alto uso de placa de vídeo (GPU). Ajustável através de perfis Baixo, Médio, Alto e Ultra.',
    examples: [
      { name: 'Complementary Unbound', detail: 'O shader mais estável e completo, com PBR integrado e nuvens 3D.' },
      { name: 'BSL Shaders', detail: 'Atmosfera cinematográfica suave com excelente desempenho em GPUs intermediárias.' },
      { name: 'Bliss / Rethinking Voxels', detail: 'Integração nativa com Distant Horizons e iluminação global voxelizada.' },
    ],
    modrinthUrl: 'https://modrinth.com/shaders',
    modrinthLabel: 'Baixar Shaders Oficiais no Modrinth',
  },
];

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: 'migracao-pc-atalhos-bedrock-vs-java',
    indexNumber: '01',
    title: 'Do Celular/Console para o PC: Diferenças Bedrock vs Java e Atalhos de Elite',
    subtitle: 'Domine a memória muscular do teclado/mouse, os segredos da tela F3 e as mudanças mecânicas da Java Edition.',
    level: 'Iniciante',
    estimatedTime: '15 min',
    category: 'Migração & Atalhos',
    edition: 'Java Edition 1.21+',
    modloader: 'Nativo / Qualquer Loader',
    summary:
      'Quem migra do celular (MCPE) ou console (Bedrock) para o PC encontra um jogo com física de Redstone determinística, sistema de combate com tempo de recarga, uso livre da segunda mão (Off-hand) e dezenas de atalhos de diagnóstico e inventário que economizam horas de jogo.',
    targetFpsGain: '3x velocidade de gerenciamento de inventário',
    vramRequirement: 'Qualquer PC / Notebook',
    steps: [
      {
        stepNumber: 1,
        title: 'Entendendo Combate (Cooldown), Segunda Mão (Tecla F) e Redstone na Java Edition',
        description:
          'Diferente do Bedrock onde você pode clicar freneticamente, na Java Edition cada arma tem uma barra de recarga abaixo da mira: espere carregar 100% para dar dano máximo e golpe em área (Sweeping Edge). Além disso, você pode segurar QUALQUER item na segunda mão (tochas, comidas, picareta para consertar com Mending) apertando a tecla F.',
        commandOrPath: 'Options > Video Settings > Attack Indicator: Crosshair',
        commandLabel: 'Configuração de Mira',
        verificationCheck:
          'Como saber se deu certo: Equipe uma espada, dê um golpe e veja uma pequena barra com ícone de adaga carregando exatamente abaixo da mira central.',
      },
      {
        stepNumber: 2,
        title: 'Atalhos de Inventário que Mudam a Gameplay (Teclado + Mouse)',
        description:
          'Pare de arrastar itens um por um! Use Shift + Clique Esquerdo para transferir um pack inteiro instantaneamente; passe o mouse sobre um item e aperte de 1 a 9 para enviá-lo direto para a barra rápida; segure Shift + Duplo Clique Esquerdo em um item (segurando outro na mão) para mover TODOS os packs iguais de um baú de uma só vez; e use Ctrl + Q para dropar o pack inteiro no chão.',
        commandOrPath: 'Shift + Duplo Clique Esquerdo | Teclas 1-9 | Tecla F | Botão do Meio (Scroll)',
        commandLabel: 'Combo de Atalhos',
        verificationCheck:
          'Como saber se deu certo: Olhe para um bloco já colocado no mundo e clique com a Roda do Mouse (Botão do Meio): o bloco igual do seu inventário irá direto para a sua mão.',
      },
      {
        stepNumber: 3,
        title: 'Dominando o Painel Técnico F3 e os Sub-Atalhos de Engenharia',
        description:
          'A tecla F3 abre o raio-x técnico do jogo (FPS, coordenadas XYZ, bioma e placa de vídeo ativa). Mas o verdadeiro poder está nas combinações: F3 + G mostra as bordas exatas dos Chunks (16x16 blocos); F3 + B mostra a hitbox das entidades e a direção do olhar; e F3 + H exibe a durabilidade exata das ferramentas e o ID de cada item.',
        commandOrPath: 'F3 + G (Bordas de Chunk) | F3 + H (Durabilidade Exata) | F3 + Q (Lista de Comandos)',
        commandLabel: 'Atalhos F3',
        verificationCheck:
          'Como saber se deu certo: Pressione F3 + G dentro do jogo; uma grade tridimensional amarela e azul aparecerá ao seu redor delimitando o chunk atual.',
      },
      {
        stepNumber: 4,
        title: 'Comandos Essenciais de Mundo e Alternância Rápida de Modo de Jogo',
        description:
          'Em mundos de teste ou criativos com comandos ativados, você não precisa digitar /gamemode toda vez. Segure F3 + F4 para abrir a roleta visual de modos (Sobrevivência, Criativo, Espectador, Aventura) e F3 + N para alternar instantaneamente entre o modo atual e o modo Espectador (atravessar paredes para inspecionar cavernas e circuitos).',
        commandOrPath: '/gamerule keepInventory true | /locate structure minecraft:ancient_city',
        commandLabel: 'Copiar Comandos Úteis',
        verificationCheck:
          'Como saber se deu certo: Segure F3 e toque em F4; um menu seletor com 4 ícones aparecerá no centro da tela sem precisar abrir o chat.',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-mouse-accel',
        severity: 'Atenção',
        title: 'Sensibilidade Estranha ou Mira "Flutuando" no PC',
        detail:
          'O Windows ativa por padrão a opção "Aprimorar precisão do ponteiro", que causa aceleração irregular na câmera do Minecraft.',
        resolution:
          'Dentro do Minecraft Java, vá em Opções > Controles > Configurações de Mouse e deixe "Entrada Bruta (Raw Input): LIGADO".',
      },
      {
        id: 'alert-fn-key',
        severity: 'Verificação',
        title: 'Teclado de Notebook Aumentando Volume ou Brilho ao Apertar F3',
        detail:
          'Em muitos notebooks e teclados compactos (60%), a linha F1–F12 executa funções multimídia por padrão.',
        resolution:
          'Segure a tecla Fn + F3 ou ative o Fn Lock (Fn + Esc) para que o F3 funcione diretamente com um toque.',
      },
    ],
    hardwareTips: [
      {
        component: 'CPU',
        minimumSpec: 'Dual-Core moderno / i3 ou Ryzen 3',
        recommendedSpec: 'Processador 6 núcleos (Ryzen 5 5600 / i5-12400F)',
        optimizationAdvice:
          'A edição Java processa toda a lógica de entidades e Redstone na CPU. Desligar "Entity Shadows" nas opções de vídeo alivia imediatamente processadores de entrada.',
        fpsImpact: '+20% FPS em vilas e fazendas com muitos animais.',
      },
    ],
    recommendedMods: [
      {
        name: 'Mouse Tweaks',
        role: 'Permite arrastar o mouse segurando clique para distribuir ou coletar itens rapidamente',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/mouse-tweaks',
      },
      {
        name: 'Jade (WTHIT)',
        role: 'Mostra no topo da tela qual bloco você está olhando e o conteúdo de baús e fornalhas',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/jade',
      },
      {
        name: 'Appleskin',
        role: 'Exibe na barra de fome quanto de saturação cada alimento recupera',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/appleskin',
      },
    ],
  },
  {
    id: 'instalacao-iris-sodium-triplicar-fps',
    indexNumber: '02',
    title: 'Motor Gráfico Moderno: Instalação Limpa do Sodium + Iris Shaders',
    subtitle: 'Aposente o antigo OptiFine e multiplique seus FPS com o otimizador oficial da comunidade Java.',
    level: 'Iniciante',
    estimatedTime: '20 min',
    category: 'Migração & Atalhos',
    edition: 'Java Edition 1.21+',
    modloader: 'Fabric Loader / Iris Installer',
    summary:
      'O Minecraft Java puro usa um renderizador OpenGL antigo que desperdiça até 70% do potencial da sua placa de vídeo. A dupla Sodium (reescrita do motor de blocos) + Iris (suporte a Shaders modernos) é o padrão ouro atual, entregando até 3x mais FPS e carregamento instantâneo de pacotes gráficos.',
    targetFpsGain: '+180% a +300% FPS no mesmo hardware',
    vramRequirement: 'Integrada ou Dedicada (2 GB+)',
    steps: [
      {
        stepNumber: 1,
        title: 'Instalação do Java 21 (64-Bits) Atualizado',
        description:
          'Antes de rodar o instalador do Iris ou do Fabric para as versões 1.20.5 e 1.21+, garanta que o Java 21 de 64 bits (Eclipse Adoptium Temurin) esteja instalado no Windows.',
        commandOrPath: 'winget install EclipseAdoptium.Temurin.21.JDK',
        commandLabel: 'Comando Winget (PowerShell)',
        verificationCheck:
          'Como saber se deu certo: Abra o Prompt de Comando, digite "java -version" e veja se aparece "openjdk version 21.0.x 64-Bit Server VM".',
      },
      {
        stepNumber: 2,
        title: 'Download e Execução do Instalador Unificado Iris + Sodium',
        description:
          'Baixe o "Iris Universal Installer" (.jar) no site oficial ou Modrinth. Dê dois cliques nele, selecione a versão do seu jogo (ex: 1.21.1), escolha a opção "Iris + Sodium" e clique em Install.',
        commandOrPath: '%appdata%\\.minecraft\\mods',
        commandLabel: 'Copiar Caminho da Pasta',
        verificationCheck:
          'Como saber se deu certo: Abra o Minecraft Launcher oficial e verifique se surgiu um novo perfil chamado "Iris & Sodium for 1.21.1" ao lado do botão Jogar.',
      },
      {
        stepNumber: 3,
        title: 'Configuração de Performance no Novo Menu de Vídeo do Sodium',
        description:
          'Dentro do jogo, vá em Opções > Configurações de Vídeo. Note que a interface mudou completamente! Na aba "Performance", ative "Use Block Face Culling", "Use Fog Occlusion" e "Always Defer Chunk Updates".',
        commandOrPath: 'Always Defer Chunk Updates: ON | Use Block Face Culling: ON',
        commandLabel: 'Ajuste Recomendado',
        verificationCheck:
          'Como saber se deu certo: Aperte F3 durante a partida e olhe na terceira linha do canto superior direito: deve aparecer "Sodium Renderer (0.6.x)" em letras verdes.',
      },
      {
        stepNumber: 4,
        title: 'Adicionando Lithium e FerriteCore para Estabilizar o 1% Low FPS',
        description:
          'Se você escolheu o modo "Fabric" no instalador, coloque os arquivos .jar do Lithium (otimiza física e IA dos mobs) e do FerriteCore (reduz o uso de memória RAM pela metade) dentro da pasta .minecraft/mods.',
        commandOrPath: 'sodium-fabric.jar + iris-fabric.jar + lithium-fabric.jar + ferritecore.jar',
        commandLabel: 'Lista da Pasta Mods',
        verificationCheck:
          'Como saber se deu certo: Aperte F3 e observe no canto superior direito o indicador "Mem:": o consumo de memória ficará estável abaixo de 2500 MB mesmo correndo por novos biomas.',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-optifine-conflict',
        severity: 'Crítico',
        title: 'Proibido Misturar OptiFine com Sodium na Mesma Pasta',
        detail:
          'Colocar o OptiFine junto com o Sodium causa fechamento imediato do jogo (Exit Code 1), pois ambos tentam substituir o mesmo motor gráfico.',
        resolution:
          'Remova completamente o OptiFine. Para ter a tecla de Zoom igual ao OptiFine no Fabric, instale o mod leve "Zoomify" ou "Logical Zoom".',
      },
    ],
    hardwareTips: [
      {
        component: 'CPU',
        minimumSpec: '4 Threads',
        recommendedSpec: '8 a 16 Threads',
        optimizationAdvice:
          'Em Configurações de Vídeo > Performance > Chunk Update Threads, deixe em "0 (Auto)" ou defina para metade dos threads do seu processador para evitar micro-engasgos.',
        fpsImpact: 'Zera as quedas de FPS ao quebrar ou colocar blocos rapidamente.',
      },
    ],
    recommendedMods: [
      {
        name: 'Sodium',
        role: 'Motor de renderização moderno que multiplica o FPS',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/sodium',
      },
      {
        name: 'Iris Shaders',
        role: 'Carregador oficial de Shaders compatível com o Sodium',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/iris',
      },
      {
        name: 'Lithium',
        role: 'Otimização profunda de física, mobs e ticks de mundo',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/lithium',
      },
      {
        name: 'FerriteCore',
        role: 'Reduz o consumo de memória RAM em até 45%',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/ferrite-core',
      },
    ],
  },
  {
    id: 'shaders-realistas-pbr-3d-patrix-primes',
    indexNumber: '03',
    title: 'Shaders Realistas (Complementary Unbound & BSL) + Texturas PBR 3D (Patrix / Prime’s HD)',
    subtitle: 'Ative iluminação volumétrica, água cristalina com refração e blocos com relevo tridimensional real.',
    level: 'Intermediário',
    estimatedTime: '25 min',
    category: 'Shaders & PBR 3D',
    edition: 'Java Edition 1.21+',
    modloader: 'Fabric + Iris Shaders',
    summary:
      'Para sair do visual chapado e alcançar o realismo fotográfico sem perder a identidade do Minecraft, combinamos um Shaderpack moderno (Complementary Unbound ou BSL) com um Resource Pack que possui mapas físicos LabPBR (como Patrix ou Prime’s HD Textures), criando profundidade 3D e reflexos em metais e pedras molhadas.',
    targetFpsGain: '60 a 120 FPS em 1080p/1440p com visual cinematográfico',
    vramRequirement: '4 GB a 8 GB de VRAM dedicados',
    steps: [
      {
        stepNumber: 1,
        title: 'Importando o Complementary Unbound ou BSL Shaders sem Descompactar',
        description:
          'Baixe o arquivo .zip do Complementary Shaders - Unbound (ou BSL Shaders) pelo Modrinth. Mova o arquivo .zip diretamente para a pasta "shaderpacks" (nunca extraia o arquivo .zip!).',
        commandOrPath: '%appdata%\\.minecraft\\shaderpacks',
        commandLabel: 'Copiar Caminho shaderpacks',
        verificationCheck:
          'Como saber se deu certo: Dentro do jogo, aperte a tecla de atalho "O" (menu do Iris), clique sobre o nome do Shader e depois em "Aplicar": o céu, a água e as sombras mudarão na hora.',
      },
      {
        stepNumber: 2,
        title: 'Instalando Resource Pack com Suporte LabPBR (Prime’s HD ou Patrix 32x/64x)',
        description:
          'Baixe um pacote de texturas com mapas normais e especulares (ex: Prime’s HD Textures, Patrix 32x ou Vanilla PBR) e coloque o arquivo .zip na pasta "resourcepacks". Ative-o em Opções > Pacotes de Recursos.',
        commandOrPath: '%appdata%\\.minecraft\\resourcepacks',
        commandLabel: 'Copiar Caminho resourcepacks',
        verificationCheck:
          'Como saber se deu certo: Aproxime-se de um bloco de minério de ferro, ouro ou tijolo de pedra; a textura terá uma definição muito mais nítida.',
      },
      {
        stepNumber: 3,
        title: 'Ativando o Relevo 3D (Parallax Occlusion Mapping - POM) e Reflexos PBR',
        description:
          'Com o menu de Shaders aberto (tecla O), clique em "Configurações do Pacote de Shaders" > "Materiais (Materials)". Mude o formato de "IntegratedPBR" para "LabPBR 1.3" e ative a opção "Parallax Occlusion Mapping (POM)" para criar relevo 3D real nos blocos.',
        commandOrPath: 'Shader Settings > Materials > Material Format: LabPBR | POM: ON',
        commandLabel: 'Rota no Menu do Shader',
        verificationCheck:
          'Como saber se deu certo: Olhe na diagonal para um caminho de pedregulhos ou tijolos sob a luz do sol: as pedras saltarão para fora do bloco com sombras próprias entre as frestas.',
      },
      {
        stepNumber: 4,
        title: 'Ajuste de Ouro para Ganhar +35% de FPS sem Perder Beleza',
        description:
          'Nas configurações do Shader, vá em "Performance / Sombras" e reduza a "Shadow Distance (Distância das Sombras)" de 24 chunks para 12 ou 14 chunks, mantendo a resolução de sombra em 2048px.',
        commandOrPath: 'shadowDistance=128.0 | shadowMapResolution=2048',
        commandLabel: 'Parâmetros de Sombra',
        verificationCheck:
          'Como saber se deu certo: Aperte F3 e veja sua taxa de quadros subir de 30% a 40% imediatamente, sem qualquer diferença perceptível nas sombras próximas ao seu personagem.',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-pbr-mismatch',
        severity: 'Atenção',
        title: 'Blocos Brilhando como Espelho ou com Cores Estranhas',
        detail:
          'Se o Shader estiver configurado no modo "IntegratedPBR" enquanto você usa um pacote de textura feito no padrão "LabPBR", o cálculo de reflexo ficará invertido.',
        resolution:
          'Sempre alinhe o modo de materiais do Shader (LabPBR vs IntegratedPBR) com o pacote de recursos que estiver ativo no momento.',
      },
    ],
    hardwareTips: [
      {
        component: 'GPU',
        minimumSpec: 'GTX 1650 / RX 6500 XT (Perfil Médio + Texturas 32x)',
        recommendedSpec: 'RTX 3060 / RTX 4060 / RX 6750 XT (Perfil Alto/Ultra + 64x/128x)',
        optimizationAdvice:
          'Texturas 512x consomem mais de 10 GB de VRAM quando combinadas com mapas PBR. Em placas de 6 GB ou 8 GB, use resoluções 32x ou 64x para zero travamentos.',
        fpsImpact: 'Evita quedas bruscas de FPS causadas por falta de memória de vídeo.',
      },
    ],
    recommendedMods: [
      {
        name: 'Complementary Shaders - Unbound',
        role: 'Shader realista completo com água física e suporte impecável a LabPBR',
        source: 'Modrinth',
        url: 'https://modrinth.com/shader/complementary-unbound',
      },
      {
        name: 'BSL Shaders',
        role: 'Shader cinematográfico leve com iluminação suave e excelente performance',
        source: 'Modrinth',
        url: 'https://modrinth.com/shader/bsl-shaders',
      },
      {
        name: 'Continuity',
        role: 'Conecta as bordas de blocos de vidro, arenito e estantes de livros',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/continuity',
      },
    ],
  },
  {
    id: 'forcar-gpu-dedicada-rtx-alocacao-ram-jvm',
    indexNumber: '04',
    title: 'Forçar Placa de Vídeo Dedicada (NVIDIA RTX / AMD) no Windows & Alocação Correta de RAM',
    subtitle: 'Corrija o bug clássico onde o Minecraft roda na placa integrada do processador e ajuste os argumentos da JVM.',
    level: 'Intermediário',
    estimatedTime: '15 min',
    category: 'Performance & GPU',
    edition: 'Java Edition (Windows 10 / 11)',
    modloader: 'Todos os Launchers',
    summary:
      'Como o Minecraft Java roda dentro de uma máquina virtual (arquivo javaw.exe) e não como um executável .exe comum de jogo, o Windows frequentemente o executa na placa de vídeo integrada (Intel UHD / AMD Radeon Graphics) em vez da sua NVIDIA RTX. Este guia resolve isso definitivamente e ensina a alocar a memória RAM certa.',
    targetFpsGain: 'De 35 FPS na iGPU para 250+ FPS na RTX dedicada',
    vramRequirement: 'Placas NVIDIA GTX/RTX ou AMD Radeon RX',
    steps: [
      {
        stepNumber: 1,
        title: 'Descobrindo o Caminho Exato do Executável javaw.exe Ativo',
        description:
          'Com o Minecraft aberto em um mundo, abra o Gerenciador de Tarefas do Windows (Ctrl + Shift + Esc). Clique na seta ao lado de "Minecraft" ou "OpenJDK Platform binary", clique com o botão direito nele e selecione "Abrir local do arquivo". Copie o endereço completo da pasta onde está o javaw.exe.',
        commandOrPath: 'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.5.11-hotspot\\bin\\javaw.exe',
        commandLabel: 'Caminho Padrão JDK 21',
        verificationCheck:
          'Como saber se deu certo: Você terá no seu Ctrl+C o caminho exato que termina em "\\bin\\javaw.exe".',
      },
      {
        stepNumber: 2,
        title: 'Forçando "Alto Desempenho" nas Configurações Gráficas do Windows 10/11',
        description:
          'Abra Configurações do Windows > Sistema > Tela > Elementos Gráficos (Graphics). Em "Adicionar um aplicativo", escolha "Aplicativo da área de trabalho", clique em "Procurar", cole o caminho do javaw.exe copiado no passo 1, clique em "Opções" e marque "Alto Desempenho (Sua GPU NVIDIA RTX / Radeon)".',
        commandOrPath: 'ms-settings:display-advancedgraphics',
        commandLabel: 'Atalho Direto do Windows',
        verificationCheck:
          'Como saber se deu certo: Reinicie o jogo, entre no mundo e aperte F3. No lado direito, em "Display:", deve aparecer explicitamente "NVIDIA GeForce RTX..." ou "AMD Radeon RX...".',
      },
      {
        stepNumber: 3,
        title: 'Otimização no Painel de Controle da NVIDIA para OpenGL / Vulkan',
        description:
          'Abra o Painel de Controle da NVIDIA > Gerenciar as configurações em 3D > Aba "Configurações do Programa". Adicione o mesmo javaw.exe, mude "GPU de renderização OpenGL" para a sua placa RTX, e defina "Modo de gerenciamento de energia" para "Preferir desempenho máximo".',
        commandOrPath: 'OpenGL Rendering GPU: NVIDIA GeForce RTX | Power Management: Maximum Performance',
        commandLabel: 'Configuração Painel NVIDIA',
        verificationCheck:
          'Como saber se deu certo: Os clocks da GPU não cairão mais pela metade quando você olhar para áreas simples, eliminando micro-oscilações de FPS.',
      },
      {
        stepNumber: 4,
        title: 'Configurando a Alocação de Memória RAM na JVM (-Xmx) sem Exageros',
        description:
          'Por padrão, o launcher aloca apenas 2 GB de RAM (-Xmx2G), o que é insuficiente para Shaders. No entanto, nunca aloque mais de 8 GB ou 10 GB mesmo se tiver 32 GB no PC! Memória demais acumula lixo na JVM e causa travadas de 1 segundo. Use 4 GB para jogo leve ou 6 GB a 8 GB para Shaders e Modpacks.',
        commandOrPath: '-Xmx6G -Xms6G -XX:+UnlockExperimentalVMOptions -XX:+UseZGC -XX:+ZGenerational',
        commandLabel: 'Copiar Argumento JVM (6GB)',
        verificationCheck:
          'Como saber se deu certo: Aperte F3 no jogo e olhe na segunda linha do canto superior direito: deve mostrar "Mem: xx% xxxx/6144MB".',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-hdmi-motherboard',
        severity: 'Crítico',
        title: 'Cabo HDMI / DisplayPort Conectado na Placa-Mãe em Desktops',
        detail:
          'Em PCs de mesa (Desktop), se o cabo do monitor estiver plugado na parte alta do gabinete (saída da placa-mãe) em vez da parte baixa horizontal (saída da placa de vídeo), a GPU dedicada ficará inativa.',
        resolution:
          'Verifique atrás do gabinete se o cabo DisplayPort ou HDMI está conectado diretamente nas saídas horizontais da sua placa de vídeo dedicada.',
      },
    ],
    hardwareTips: [
      {
        component: 'RAM',
        minimumSpec: '8 GB no PC -> Alocar -Xmx4G',
        recommendedSpec: '16 GB a 32 GB no PC -> Alocar -Xmx6G ou -Xmx8G',
        optimizationAdvice:
          'Use nossa Calculadora Interativa de Hardware abaixo para obter o argumento exato conforme sua placa de vídeo e quantidade de RAM.',
        fpsImpact: 'Elimina 100% dos congelamentos periódicos de limpeza de memória.',
      },
    ],
    recommendedMods: [
      {
        name: 'ModernFix',
        role: 'Otimiza o carregamento de modelos e reduz drasticamente o uso de RAM em modpacks',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/modernfix',
      },
      {
        name: 'EntityCulling',
        role: 'Pula a renderização de baús e criaturas que estão escondidos atrás de paredes',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/entityculling',
      },
    ],
  },
  {
    id: 'prism-launcher-modrinth-distant-horizons-256-chunks',
    indexNumber: '05',
    title: 'Launchers Dedicados (Prism / Modrinth App) & Horizonte Infinito com Distant Horizons',
    subtitle: 'Gerencie instâncias isoladas sem bagunçar arquivos e enxergue montanhas a 256 chunks de distância sem lag.',
    level: 'Avançado',
    estimatedTime: '35 min',
    category: 'Modpacks & Engenharia',
    edition: 'Java Edition 1.21+',
    modloader: 'Prism Launcher / Modrinth App (Fabric)',
    summary:
      'Jogadores avançados não usam a pasta .minecraft padrão, pois misturar mods de versões diferentes corrompe mundos. Com o Prism Launcher ou Modrinth App, você cria instâncias independentes em segundos e pode instalar o revolucionário Distant Horizons para enxergar 256 chunks de distância com o peso de apenas 10 chunks.',
    targetFpsGain: 'Horizonte de 256 Chunks rodando a 80+ FPS',
    vramRequirement: '6 GB+ VRAM e 16 GB RAM recomendados',
    steps: [
      {
        stepNumber: 1,
        title: 'Criando uma Instância Isolada no Prism Launcher ou Modrinth App',
        description:
          'Instale o Prism Launcher (ou Modrinth App), conecte sua conta Microsoft oficial e clique em "Adicionar Instância". Escolha a versão 1.21.1, selecione o loader "Fabric" e crie o perfil. Cada instância terá sua própria pasta exclusiva de mods, mundos e shaders.',
        commandOrPath: 'winget install PrismLauncher.PrismLauncher',
        commandLabel: 'Instalar Prism via Winget',
        verificationCheck:
          'Como saber se deu certo: Clique em "Editar Instância > Mods > Baixar Mods" dentro do próprio Prism Launcher: você poderá instalar qualquer mod do Modrinth com 1 clique sem abrir o navegador.',
      },
      {
        stepNumber: 2,
        title: 'Instalando Distant Horizons 2.2+ junto com Iris 1.8 e Bliss/Complementary',
        description:
          'Pelo baixador integrado do launcher, adicione: Sodium, Iris Shaders, Indium (se aplicável à subversão) e Distant Horizons (versão 2.2+). Para que os shaders funcionem nos chunks distantes, use o Bliss Shader ou Complementary Unbound r5.3+.',
        commandOrPath: 'Real Render Distance: 10 Chunks | Distant Horizons LOD: 128 ou 256 Chunks',
        commandLabel: 'Proporção Ideal de Chunks',
        verificationCheck:
          'Como saber se deu certo: Ao lado da opção de Render Distance nas configurações de vídeo, aparecerá um novo botão com o ícone de horizonte do Distant Horizons.',
      },
      {
        stepNumber: 3,
        title: 'Configurando o Gerador de LOD sem Sobrecarregar o Processador',
        description:
          'Abra as configurações do Distant Horizons: deixe "Enable Rendering: True", defina "LOD Chunk Render Distance" para 128 ou 256, e configure "CPU Load" para "2 - Low Impact" ou "3 - Balanced" enquanto estiver jogando normalmente.',
        commandOrPath: 'CPU Load: Balanced | Quality Preset: Medium | Overdraw Prevention: Medium',
        commandLabel: 'Configuração DH Estável',
        verificationCheck:
          'Como saber se deu certo: Suba em uma montanha alta: conforme você caminha ou deixa o jogo gerar o mapa por alguns minutos, cordilheiras inteiras continuarão visíveis até onde a vista alcança.',
      },
      {
        stepNumber: 4,
        title: 'Geração de Terreno em Escala Real com Tectonic + Terralith',
        description:
          'Para aproveitar 256 chunks de visão, adicione os mods de geração de mundo Tectonic e Terralith antes de criar seu novo mapa. Eles criam cadeias de montanhas de mais de 300 blocos de altura, rios largos navegáveis e biomas alpinos.',
        commandOrPath: 'Mods de Terreno: Tectonic + Terralith + Cristel Lib',
        commandLabel: 'Combo de Geração Continental',
        verificationCheck:
          'Como saber se deu certo: Crie um novo mundo e observe os picos nevados gigantescos com transições suaves de florestas no horizonte distante.',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-dh-cpu-warmup',
        severity: 'Atenção',
        title: 'Uso Alto de CPU nos Primeiros 15 Minutos de um Mundo Novo',
        detail:
          'O Distant Horizons precisa construir o banco de dados SQLite dos chunks distantes na primeira vez que você cria o mundo.',
        resolution:
          'Use o mod "Chunky" para pré-gerar um raio de 1000 blocos enquanto faz uma pausa, ou mantenha o perfil de CPU do Distant Horizons em "Low Impact".',
      },
    ],
    hardwareTips: [
      {
        component: 'Armazenamento',
        minimumSpec: 'SSD SATA com 10 GB livres',
        recommendedSpec: 'SSD NVMe M.2 com 25 GB livres',
        optimizationAdvice:
          'Os arquivos LOD do Distant Horizons ficam salvos em um banco SQLite dentro da pasta do mundo e podem ocupar de 2 GB a 8 GB por dimensão.',
        fpsImpact: 'Carregamento instantâneo do horizonte ao entrar no mundo.',
      },
    ],
    recommendedMods: [
      {
        name: 'Distant Horizons',
        role: 'Renderiza até 256+ chunks de distância usando sistema de nível de detalhe (LOD)',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/distanthorizons',
      },
      {
        name: 'Tectonic',
        role: 'Reformula a topografia do mundo com montanhas continentais e rios profundos',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/tectonic',
      },
      {
        name: 'Chunky',
        role: 'Pré-gerador rápido de chunks para preparar mundos antes de explorar',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/chunky',
      },
    ],
  },
  {
    id: 'engenharia-litematica-hologramas-servidor-local',
    indexNumber: '06',
    title: 'Engenharia com Litematica (Hologramas 3D) & Criação de Servidor Local Otimizado',
    subtitle: 'Projete construções e farms complexas bloco a bloco com hologramas e hospede seu próprio servidor Paper/Fabric.',
    level: 'Avançado',
    estimatedTime: '40 min',
    category: 'Modpacks & Engenharia',
    edition: 'Java Edition 1.21+',
    modloader: 'Fabric Loader',
    summary:
      'No nível técnico da Java Edition, você não precisa copiar construções olhando vídeos pausados: o mod Litematica projeta um holograma 3D dentro do seu mundo sobrevivência, aponta blocos colocados errados em vermelho e gera a lista exata de materiais. Além disso, você aprenderá a abrir um servidor local dedicado para jogar com amigos sem lag.',
    targetFpsGain: 'Construção 5x mais rápida com verificação automática de erros',
    vramRequirement: 'Qualquer GPU compatível + 16 GB RAM para Servidor + Jogo',
    steps: [
      {
        stepNumber: 1,
        title: 'Instalando Litematica e a Biblioteca MaLiLib no Fabric',
        description:
          'O Litematica exige obrigatoriamente a biblioteca "MaLiLib" da mesma versão do jogo. Baixe ambos no Modrinth e coloque na pasta mods da sua instância. Crie também a pasta "schematics" dentro da pasta da instância para guardar seus projetos .litematic.',
        commandOrPath: 'mods/litematica-fabric.jar + mods/malilib-fabric.jar',
        commandLabel: 'Arquivos Obrigatórios',
        verificationCheck:
          'Como saber se deu certo: Entre no mundo e pressione a tecla "M": o menu principal do Litematica abrirá no centro da tela.',
      },
      {
        stepNumber: 2,
        title: 'Carregando um Holograma, Posicionando com o Graveto e Lista de Materiais',
        description:
          'Aperte M > Load Schematics e escolha seu arquivo .litematic. Segure um Graveto (Stick) na mão: ele funciona como a ferramenta do Litematica! Use Ctrl + Roda do Mouse para trocar o modo do graveto para "Schematic Placement" e posicione o holograma. Aperte M + L para abrir a Lista de Materiais exata.',
        commandOrPath: 'Tecla M (Menu) | M + C (Configurações) | M + L (Material List) | PageUp / PageDown (Camadas)',
        commandLabel: 'Atalhos do Litematica',
        verificationCheck:
          'Como saber se deu certo: O holograma translúcido azul aparecerá no mundo; se você colocar um bloco errado dentro dele, o bloco ficará destacado em vermelho vivo.',
      },
      {
        stepNumber: 3,
        title: 'Ativando o "Easy Place Mode" para Construir Automaticamente',
        description:
          'Vá em M + C > Aba "Generic" > Configure uma tecla para "easyPlaceToggle" e ative "easyPlaceMode". Quando ativado, basta clicar com o botão direito mirando no ar do holograma: o Litematica puxará o bloco correto do seu inventário e o colocará na orientação exata!',
        commandOrPath: 'Generic > easyPlaceMode: True | easyPlaceUseKey: Right Click',
        commandLabel: 'Configuração Easy Place',
        verificationCheck:
          'Como saber se deu certo: Segurando qualquer bloco do projeto no inventário, clique com o botão direito sobre o fantasma azul do holograma e o bloco será posicionado perfeitamente.',
      },
      {
        stepNumber: 4,
        title: 'Subindo um Servidor Local Dedicado (Fabric ou PaperMC) com Flags de Aikar',
        description:
          'Para jogar com amigos sem o peso de "Abrir para LAN", crie uma pasta separada para o servidor, baixe o jar do Fabric Server (ou PaperMC) e inicie com um script start.bat alocando 6 GB de RAM e as flags otimizadas de servidor. Lembre-se de mudar "eula=true" no arquivo eula.txt.',
        commandOrPath: 'java -Xms6G -Xmx6G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -jar server.jar nogui',
        commandLabel: 'Copiar Comando start.bat',
        verificationCheck:
          'Como saber se deu certo: No Minecraft, vá em Multiplayer > Conexão Direta, digite "localhost" e conecte-se ao seu servidor com 0ms de ping.',
      },
    ],
    verificationAlerts: [
      {
        id: 'alert-easyplace-servers',
        severity: 'Atenção',
        title: 'Uso do Easy Place Mode em Servidores Públicos com Anti-Cheat',
        detail:
          'O holograma visual do Litematica e a lista de materiais são permitidos em quase todos os servidores SMP, mas o "Easy Place Mode" ou "Printer" pode acionar plugins anti-cheat em servidores competitivos.',
        resolution:
          'Em servidores públicos de terceiros, use apenas a visualização em camadas (Single Layer Mode com PageUp/PageDown) e deixe o Easy Place para seu mundo singleplayer ou servidor próprio.',
      },
    ],
    hardwareTips: [
      {
        component: 'RAM',
        minimumSpec: '16 GB RAM (6 GB Jogo + 4 GB Servidor)',
        recommendedSpec: '32 GB RAM (8 GB Jogo + 8 GB Servidor Local)',
        optimizationAdvice:
          'Se você hospedar o servidor e jogar no mesmo PC, instale os mods Lithium e FerriteCore também na pasta mods do servidor para reduzir o consumo de CPU e RAM pela metade.',
        fpsImpact: 'Mantém o servidor em 20.0 TPS cravados mesmo com farms ligadas.',
      },
    ],
    recommendedMods: [
      {
        name: 'Litematica',
        role: 'Mod definitivo de esquemas holográficos e verificação de construções',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/litematica',
      },
      {
        name: 'MaLiLib',
        role: 'Biblioteca base obrigatória para rodar o Litematica e MiniHUD',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/malilib',
      },
      {
        name: 'MiniHUD',
        role: 'Exibe esferas de spawn de farms, nível de luz de blocos e coordenadas discretas',
        source: 'Modrinth',
        url: 'https://modrinth.com/mod/minihud',
      },
    ],
  },
];

export const SHADER_PRESETS: ShaderPreset[] = [
  {
    id: 'complementary-unbound',
    name: 'Complementary Shaders: Unbound r5.3',
    pipeline: 'Iris + Sodium (OpenGL/Vulkan)',
    lightingModel: 'Deferred Hybrid + Volumetric Fog + Screen-Space Global Illumination',
    vramUsageGb: 4.8,
    baseCostMs: 6.2,
    pbrSupport: 'LabPBR 1.3 Completo',
    atmosphereFeatures: [
      'Nuvens volumétricas em múltiplas camadas com sombras no terreno',
      'Ondas físicas de água com refração e cáusticas submarinas',
      'Aurora Boreal dinâmica em biomas frios durante a noite',
      'IntegratedPBR automático mesmo sem pacote de textura externo',
    ],
    description:
      'A referência absoluta em equilíbrio entre fidelidade visual extrema, zero bugs visuais em dimensões modadas e excelente performance com Distant Horizons.',
    recommendedGpu: 'GTX 1660 Super / RTX 3050 / RX 6600 ou superior',
    accentTone: 'violet',
  },
  {
    id: 'bsl-shaders-v8',
    name: 'BSL Shaders v8.3 (Cinema & Performance)',
    pipeline: 'Iris + Sodium (OpenGL/Vulkan)',
    lightingModel: 'Warm Atmospheric Scattering + Soft Realtime Shadows + LabPBR',
    vramUsageGb: 4.1,
    baseCostMs: 5.4,
    pbrSupport: 'LabPBR 1.3 Completo',
    atmosphereFeatures: [
      'Iluminação quente cinematográfica com excelente taxa de quadros',
      'Suporte completo a relevo 3D (POM) para Patrix e Prime’s HD',
      'Água translúcida personalizável e bloom equilibrado',
      'Compatível com Distant Horizons e placas intermediárias',
    ],
    description:
      'O shader clássico favorito da comunidade: leve, quente, altamente configurável e ideal para quem busca 90+ FPS com texturas PBR.',
    recommendedGpu: 'GTX 1650 / RTX 2060 / RX 6600 ou superior',
    accentTone: 'indigo',
  },
  {
    id: 'rethinking-voxels-ptgi',
    name: 'Rethinking Voxels / Photon Path-Traced',
    pipeline: 'OptiFine / Iris Path-Traced',
    lightingModel: 'Voxel Cone Tracing + Multi-Bounce Path-Traced Global Illumination',
    vramUsageGb: 7.8,
    baseCostMs: 12.8,
    pbrSupport: 'LabPBR 1.3 Completo',
    atmosphereFeatures: [
      'Sombras suaves fisicamente precisas baseadas na distância do emissor',
      'Luz colorida rebatida (Color Bleeding) ao passar por vitrais ou lava',
      'Iluminação por bloco individual (tochas, lanternas e redstone com sombras próprias)',
      'Reflexos especulares ray-traced em superfícies metálicas e mármore polido',
    ],
    description:
      'Substitui os mapas de sombra tradicionais por traçado de raios em grade de voxels. Cada fonte de luz emite fótons reais com sombras independentes.',
    recommendedGpu: 'RTX 4070 Super / RTX 4080 / RX 7900 XT ou superior',
    accentTone: 'blue',
  },
];
