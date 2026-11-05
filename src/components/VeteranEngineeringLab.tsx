import React, { useState } from 'react';
import {
  Hammer,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Grid,
  FlaskConical,
  Cpu,
  Check,
  Copy,
  Terminal,
  Compass,
  Swords,
  Heart,
  Flame,
} from 'lucide-react';
import { useDimensionTheme } from '../context/ThemeContext';
import { VoxelCircleShulkerLab } from './VoxelCircleShulkerLab';
import { BossesRaidTacticsLab } from './BossesRaidTacticsLab';
import { MobGeneticsRarePetsLab } from './MobGeneticsRarePetsLab';
import { FireworksBannersLoomLab } from './FireworksBannersLoomLab';

// 1. ANVIL OPTIMIZER DATA (Binary Tree Pairing to prevent "Too Expensive! / >39 Levels")
export interface GearPreset {
  id: string;
  name: string;
  itemIcon: string;
  category: string;
  naiveCostWarning: string;
  optimalTotalLevels: number;
  maxSingleStepCost: number;
  conflictWarning: string;
  enchantments: { name: string; tradeMaxPrice: string; effect: string }[];
  binaryTreeSteps: {
    step: number;
    leftInput: string;
    rightInput: string;
    result: string;
    stepLevelCost: number;
    priorWorkPenalty: string;
  }[];
}

const ANVIL_GEAR_PRESETS: GearPreset[] = [
  {
    id: 'god-boots-netherite',
    name: 'Botas de Netherita Supremas (7 Encantamentos)',
    itemIcon: '🥾',
    category: 'O Item Mais Difícil do Jogo (Sem "Muito Caro!")',
    naiveCostWarning: 'Se juntar 1 por 1 em fila: Custo final chega a 54 níveis -> BLOQUEADO ("Muito Caro!")',
    optimalTotalLevels: 36,
    maxSingleStepCost: 19,
    conflictWarning: 'Passos Profundos (Depth Strider) é incompatível com Passos Gelados (Frost Walker). Proteção IV é incompatível com Proteção contra Fogo/Explosão.',
    enchantments: [
      { name: 'Proteção IV (Protection IV)', tradeMaxPrice: '14 Esmeraldas (1 com Cura)', effect: 'Reduz 16% de todo dano físico, fogo e magia' },
      { name: 'Queda de Pena IV (Feather Falling IV)', tradeMaxPrice: '14 Esmeraldas', effect: 'Reduz dano de queda e de Pérolas do End em 48%' },
      { name: 'Passos Profundos III (Depth Strider III)', tradeMaxPrice: '11 Esmeraldas', effect: 'Nada na água na mesma velocidade de correr na terra' },
      { name: 'Velocidade das Almas III (Soul Speed III)', tradeMaxPrice: 'Escambo com Piglins no Nether', effect: 'Corre 60% mais rápido em Areia e Terra das Almas' },
      { name: 'Inquebrável III (Unbreaking III)', tradeMaxPrice: '11 Esmeraldas', effect: 'Multiplica a durabilidade por 4x' },
      { name: 'Remendo (Mending)', tradeMaxPrice: '10 a 36 Esmeraldas', effect: 'Conserta a bota automaticamente com orbes de XP' },
      { name: 'Espinhos III (Thorns III)', tradeMaxPrice: '11 Esmeraldas', effect: 'Reflete dano nos inimigos (colocar por último pelo alto peso)' },
    ],
    binaryTreeSteps: [
      {
        step: 1,
        leftInput: 'Bota Limpa',
        rightInput: 'Livro: Velocidade das Almas III',
        result: 'Bota [1 Uso]',
        stepLevelCost: 12,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 2,
        leftInput: 'Livro: Espinhos III',
        rightInput: 'Livro: Passos Profundos III',
        result: 'Livro Duplo A [1 Uso]',
        stepLevelCost: 6,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 3,
        leftInput: 'Livro: Proteção IV',
        rightInput: 'Livro: Queda de Pena IV',
        result: 'Livro Duplo B [1 Uso]',
        stepLevelCost: 4,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 4,
        leftInput: 'Livro: Inquebrável III',
        rightInput: 'Livro: Remendo (Mending)',
        result: 'Livro Duplo C [1 Uso]',
        stepLevelCost: 2,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 5,
        leftInput: 'Bota [1 Uso]',
        rightInput: 'Livro Duplo A [1 Uso]',
        result: 'Bota Tripla [2 Usos]',
        stepLevelCost: 19,
        priorWorkPenalty: 'Penalidade: 1 -> 3',
      },
      {
        step: 6,
        leftInput: 'Livro Duplo B [1 Uso]',
        rightInput: 'Livro Duplo C [1 Uso]',
        result: 'Super Livro 4x [2 Usos]',
        stepLevelCost: 8,
        priorWorkPenalty: 'Penalidade: 1 -> 3',
      },
      {
        step: 7,
        leftInput: 'Bota Tripla [2 Usos]',
        rightInput: 'Super Livro 4x [2 Usos]',
        result: '🥾 Bota Suprema 7x Completa!',
        stepLevelCost: 19,
        priorWorkPenalty: 'Sucesso! Bem abaixo do limite de 39 níveis',
      },
    ],
  },
  {
    id: 'god-sword-netherite',
    name: 'Espada de Netherita Suprema (7 Encantamentos)',
    itemIcon: '⚔️',
    category: 'Dano Máximo em Área + Drops Triplos',
    naiveCostWarning: 'Se juntar 1 por 1 em fila: Ultrapassa 43 níveis na 6ª combinação!',
    optimalTotalLevels: 31,
    maxSingleStepCost: 18,
    conflictWarning: 'Afiação V (Sharpness V) é incompatível com Julgamento V (Smite V) e Ruína dos Artrópodes. Para farms de Wither Skeleton, faça uma segunda espada com Julgamento V!',
    enchantments: [
      { name: 'Afiação V (Sharpness V)', tradeMaxPrice: '17 Esmeraldas', effect: '+3 Corações de dano puro contra qualquer criatura ou jogador' },
      { name: 'Saque III (Looting III)', tradeMaxPrice: '11 Esmeraldas', effect: 'Multiplica drops raros (Cabeças de Wither, Pérolas, Pólvora, Bifes)' },
      { name: 'Alcance Cortante III (Sweeping Edge III)', tradeMaxPrice: '11 Esmeraldas (Exclusivo Java!)', effect: 'Transfere 75% do dano da espada para todos os mobs ao redor em farms de XP' },
      { name: 'Inquebrável III (Unbreaking III)', tradeMaxPrice: '11 Esmeraldas', effect: '8.128 golpes antes de quebrar' },
      { name: 'Remendo (Mending)', tradeMaxPrice: '10 Esmeraldas', effect: 'Duração infinita ao usar em farms de XP' },
      { name: 'Aspecto Flamejante II (Fire Aspect II)', tradeMaxPrice: '7 Esmeraldas', effect: 'Vacas e porcos já dropam bife e carne assada na hora' },
      { name: 'Repulsão II (Knockback II)', tradeMaxPrice: 'Opcional', effect: 'Afasta Creepers (evite contra esqueletos)' },
    ],
    binaryTreeSteps: [
      {
        step: 1,
        leftInput: 'Espada Limpa',
        rightInput: 'Livro: Afiação V',
        result: 'Espada [1 Uso]',
        stepLevelCost: 5,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 2,
        leftInput: 'Livro: Alcance Cortante III',
        rightInput: 'Livro: Saque III',
        result: 'Livro Duplo A [1 Uso]',
        stepLevelCost: 6,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 3,
        leftInput: 'Livro: Aspecto Flamejante II',
        rightInput: 'Livro: Inquebrável III',
        result: 'Livro Duplo B [1 Uso]',
        stepLevelCost: 3,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 4,
        leftInput: 'Espada [1 Uso]',
        rightInput: 'Livro Duplo A [1 Uso]',
        result: 'Espada Tripla [2 Usos]',
        stepLevelCost: 14,
        priorWorkPenalty: 'Penalidade: 1 -> 3',
      },
      {
        step: 5,
        leftInput: 'Livro Duplo B [1 Uso]',
        rightInput: 'Livro: Remendo',
        result: 'Livro Triplo C [2 Usos]',
        stepLevelCost: 4,
        priorWorkPenalty: 'Penalidade: 1 -> 3',
      },
      {
        step: 6,
        leftInput: 'Espada Tripla [2 Usos]',
        rightInput: 'Livro Triplo C [2 Usos]',
        result: '⚔️ Espada Suprema Completa!',
        stepLevelCost: 18,
        priorWorkPenalty: 'Economia de 55% de XP!',
      },
    ],
  },
  {
    id: 'god-pickaxe-technical',
    name: 'Picareta Técnica Insta-Mine (Eficiência V + Fortuna III / Toque Suave)',
    itemIcon: '⛏️',
    category: 'Quebra Instantânea (0 Ticks de Espera com Haste II)',
    naiveCostWarning: 'Ordem errada na bigorna encarece o conserto inicial antes do Mending.',
    optimalTotalLevels: 15,
    maxSingleStepCost: 9,
    conflictWarning: 'Fortuna III e Toque Suave (Silk Touch) são mutuamente exclusivos. Todo veterano anda com DUAS picaretas na hotbar: Silk Touch para o dia a dia (Ender Chest/Vidro) e Fortuna III para diamantes.',
    enchantments: [
      { name: 'Eficiência V (Efficiency V)', tradeMaxPrice: '17 Esmeraldas', effect: 'Combinada com Sinalizador (Beacon Haste II), quebra pedra em 0.05s (Insta-mine)' },
      { name: 'Fortuna III ou Toque Suave', tradeMaxPrice: '11 Esmeraldas', effect: 'Fortuna III rende média de 2.2x mais diamantes (até 4 por bloco)' },
      { name: 'Inquebrável III (Unbreaking III)', tradeMaxPrice: '11 Esmeraldas', effect: 'Multiplica a durabilidade por 4x' },
      { name: 'Remendo (Mending)', tradeMaxPrice: '10 Esmeraldas', effect: 'Recarrega durabilidade enquanto você minera carvão, quartzo ou redstone!' },
    ],
    binaryTreeSteps: [
      {
        step: 1,
        leftInput: 'Picareta Limpa',
        rightInput: 'Livro: Eficiência V',
        result: 'Picareta [1 Uso]',
        stepLevelCost: 5,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 2,
        leftInput: 'Livro: Fortuna III (ou Silk Touch)',
        rightInput: 'Livro: Inquebrável III',
        result: 'Livro Duplo A [1 Uso]',
        stepLevelCost: 3,
        priorWorkPenalty: 'Penalidade: 0 -> 1',
      },
      {
        step: 3,
        leftInput: 'Picareta [1 Uso]',
        rightInput: 'Livro: Remendo (Mending)',
        result: 'Picareta Dupla [2 Usos]',
        stepLevelCost: 3,
        priorWorkPenalty: 'Penalidade: 1 -> 3',
      },
      {
        step: 4,
        leftInput: 'Picareta Dupla [2 Usos]',
        rightInput: 'Livro Duplo A [1 Uso]',
        result: '⛏️ Picareta Técnica Completa!',
        stepLevelCost: 9,
        priorWorkPenalty: 'Custo mínimo garantido',
      },
    ],
  },
];

// 2. 3x3 REDSTONE & TECHNICAL CRAFTING RECIPES
export interface CraftingRecipe3x3 {
  id: string;
  name: string;
  category: string;
  outputCount: number;
  grid: (string | null)[]; // 9 slots (0..8)
  veteranNote: string;
  confusionWarning: string;
}

const REDSTONE_CRAFTING_RECIPES: CraftingRecipe3x3[] = [
  {
    id: 'comparator',
    name: 'Comparador de Redstone',
    category: 'Cérebro de Triagem de Baús',
    outputCount: 1,
    grid: [
      null, '🕯️ Tocha Redstone', null,
      '🕯️ Tocha Redstone', '💎 Quartzo Nether', '🕯️ Tocha Redstone',
      '🪨 Pedra Lisa', '🪨 Pedra Lisa', '🪨 Pedra Lisa',
    ],
    veteranNote:
      'Lê o nível de preenchimento de Baús, Funis, Composteiras, Colmeias e Caldeirões (0 a 15). Com a tocha frontal acesa (botão direito), entra no Modo Subtração (fazendo um relógio ultrarrápido de 1 tick!).',
    confusionWarning:
      'Atenção: A base exige 3 Pedras Lisas (Pedregulho assado na fornalha), não funciona com Pedregulho comum!',
  },
  {
    id: 'observer',
    name: 'Observador (Observer)',
    category: 'Sensor de Atualização de Bloco',
    outputCount: 1,
    grid: [
      '🧱 Pedregulho', '🧱 Pedregulho', '🧱 Pedregulho',
      '🔴 Pó Redstone', '🔴 Pó Redstone', '💎 Quartzo Nether',
      '🧱 Pedregulho', '🧱 Pedregulho', '🧱 Pedregulho',
    ],
    veteranNote:
      'Emite um pulso curto de 1 tick de redstone (força 15) sempre que o bloco em frente ao seu rosto muda de estado (crescimento de cana, água virando pedra, movimento de pistão).',
    confusionWarning:
      'Quando você empurra um Observador com um pistão, ele detecta o próprio movimento e emite um pulso — é assim que os aviões de slime (Flying Machines) voam sozinhos!',
  },
  {
    id: 'crafter-121',
    name: 'Bancada Automática (Crafter 1.21+)',
    category: 'Fábrica Industrial de Itens',
    outputCount: 1,
    grid: [
      '🥈 Barra Ferro', '🥈 Barra Ferro', '🥈 Barra Ferro',
      '🥈 Barra Ferro', '🛠️ Bancada', '🥈 Barra Ferro',
      '🔴 Pó Redstone', '📦 Liberador', '🔴 Pó Redstone',
    ],
    veteranNote:
      'Introduzida no Minecraft 1.21: a cada pulso de redstone, fabrica automaticamente a receita que estiver dentro dela e ejeta o item pronto direto para um baú ou funil!',
    confusionWarning:
      'Clique nos slots vazios do Crafter para trancá-los: cada slot trancado ou preenchido soma +1 de força no Comparador (9 slots = força 9).',
  },
  {
    id: 'dispenser-vs-dropper',
    name: 'Ejetor (Dispenser) vs Liberador (Dropper)',
    category: 'Automação de Água, Lava & Itens',
    outputCount: 1,
    grid: [
      '🧱 Pedregulho', '🧱 Pedregulho', '🧱 Pedregulho',
      '🧱 Pedregulho', '🏹 Arco (0% a 100%)', '🧱 Pedregulho',
      '🧱 Pedregulho', '🔴 Pó Redstone', '🧱 Pedregulho',
    ],
    veteranNote:
      'O Ejetor (leva um Arco no meio) USA o item: despeja e recolhe água/lava do balde, aplica farinha de osso nas plantas, tosquia ovelhas e atira ovos. Já o Liberador (sem arco) apenas JOGA o item como drop ou empurra para um baú!',
    confusionWarning:
      'Dica: Você pode usar aqueles Arcos velhos quase quebrados dropados por Esqueletos para fabricar Ejetores novos!',
  },
];

// 3. VETERAN ENGINE SECRETS (Quasi-Connectivity, Chunk Loaders, Mob Switch)
export interface EngineSecretItem {
  id: string;
  title: string;
  sinceVersion: string;
  tag: string;
  explanation: string;
  howToApply: string;
  proCommandOrRule: string;
}

const VETERAN_ENGINE_SECRETS: EngineSecretItem[] = [
  {
    id: 'quasi-connectivity',
    title: 'Quasi-Conectividade (QC / Bud-Powering Exclusivo Java)',
    sinceVersion: 'Beta 1.7 (2011) – Presente',
    tag: 'Física de Redstone',
    explanation:
      'Quando Notch programou os Pistões no Beta 1.7, ele copiou o código da Porta de Ferro (que tem 2 blocos de altura). Por causa disso, Pistões, Ejetores e Liberadores no Minecraft Java aceitam energia que esteja a 1 bloco ACIMA deles (mesmo que seja um bloco de ar!), mas só percebem que foram energizados quando um bloco vizinho sofre uma atualização (Block Update).',
    howToApply:
      'É graças à Quasi-Conectividade que portas secretas de pistão 2x2 (Jeb Doors) e paredes ocultas funcionam sem fios aparentes embaixo dos pistões inferiores!',
    proCommandOrRule: 'Regra: Pistão sente energia na posição Y+1, mas exige Block Update (Ex: Noteblock ou Redstone Dust) para estender/retrair.',
  },
  {
    id: 'portal-chunk-loader',
    title: 'Carregador de Chunks Permanente com Portal do Nether',
    sinceVersion: 'Java 1.14 – 1.21+',
    tag: 'Engenharia de Servidores / Ticks',
    explanation:
      'Normalmente, suas fazendas param de funcionar quando você se afasta mais de 128 blocos. Porém, no código da Java Edition, sempre que qualquer entidade (como 1 Carrinho ou 1 Item jogado por um Dropper) atravessa um Portal do Nether, o jogo carrega uma grade de 3x3 Chunks ao redor do portal na outra dimensão por exatos 15 segundos (300 ticks) a 20 TPS completos!',
    howToApply:
      'Faça um carrinho com funil ou item ir e voltar pelo portal a cada 12 segundos: sua Fábrica de Ferro, Superfornalha ou Separador de Baús funcionará 24 horas por dia mesmo que você esteja a 20.000 blocos de distância!',
    proCommandOrRule: 'F3 + G (Ver Bordas de Chunk): Construa a farm centralizada na área 3x3 de Chunks ao redor do Portal.',
  },
  {
    id: 'mob-switch-warden',
    title: 'Interruptor Global de Monstros (Mob Switch Pacífico no Survival)',
    sinceVersion: 'Java 1.16 – 1.21+',
    tag: 'Controle do Mob Cap (70 Mobs)',
    explanation:
      'O Minecraft Java possui um limite máximo global de 70 monstros hostis por jogador (Hostile Mob Cap). Criaturas como Shulkers, Zombies que seguram itens em barcos, Withers ou Wardens (com etiqueta) contam para esse limite de 70, mas nunca desaparecem (despawn) enquanto o chunk estiver carregado!',
    howToApply:
      'Se você colocar 70 Shulkers ou 70 Zumbis Aldeões (que já fizeram 1 troca antes de virar zumbi) ao redor de um Portal Chunk Loader, você pode "ligar e desligar" todos os monstros do mundo com 1 alavanca sem nunca mudar a dificuldade do jogo!',
    proCommandOrRule: 'Aperte F3 e procure a linha "M: 70/70" (Monster Cap): quando M atinge 70, zero Creepers ou Esqueletos nascem na sua base.',
  },
  {
    id: 'brewing-weakness-exception',
    title: 'A Exceção Alquímica: Poção de Fraqueza sem Fungo do Nether',
    sinceVersion: 'Beta 1.9 – 1.21+',
    tag: 'Alquimia & Aldeões no Dia 1',
    explanation:
      '99% das poções exigem ir a uma Fortaleza do Nether para colher Fungo do Nether (Nether Wart) e fazer a "Poção Estranha" (Awkward Potion). A ÚNICA exceção em todo o código do Minecraft é a Poção de Fraqueza (usada para curar Zumbis Aldeões e ganhar livros de Mending por 1 Esmeralda)!',
    howToApply:
      'Coloque 3 Garrafas de Água pura no suporte de poções e adicione diretamente 1 Olho de Aranha Fermentado (Olho de Aranha + Açúcar + Cogumelo Marrom), seguido de 1 Pólvora! Ou capture uma Bruxa perto de um Caldeirão para ela jogar a poção de graça antes mesmo de você entrar no Nether.',
    proCommandOrRule: 'Garrafa de Água Pura + Olho de Aranha Fermentado + Pólvora = Poção Arremessável de Fraqueza (Sem Nether Wart!).',
  },
];

// 4. COMMANDS FOR "MEROS MORTAIS" & VETERANS (/gamerule, /tick, /locate, /give)
export interface CommandItem {
  id: string;
  title: string;
  audience: 'Meros Mortais (Salva-Vidas)' | 'Veteranos & Testes (/tick & Secretos)';
  command: string;
  undoCommand?: string;
  description: string;
  sideEffectOrTip: string;
}

const COMMAND_CARDS_DATABASE: CommandItem[] = [
  // COMANDOS PARA MEROS MORTAIS (DIA A DIA & PAZ DE ESPÍRITO)
  {
    id: 'cmd-keep-inventory',
    title: 'Não Perder Itens nem XP ao Morrer na Lava',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule keepInventory true',
    undoCommand: '/gamerule keepInventory false',
    description:
      'O comando mais amado do Minecraft: se você cair na lava do Nether ou explodir para um Creeper, você renasce na sua cama com 100% da sua mochila, armadura e níveis de experiência intactos!',
    sideEffectOrTip:
      'Dica: No Minecraft Java, respeite as letras maiúsculas exatamente assim: "keepInventory" (com I maiúsculo).',
  },
  {
    id: 'cmd-sleep-1-player',
    title: 'Apenas 1 Pessoa Precisa Dormir no Servidor com Amigos',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule playersSleepingPercentage 1',
    undoCommand: '/gamerule playersSleepingPercentage 100',
    description:
      'Jogando com amigos e um deles está minerando no fundo da caverna sem cama? Com esse comando, basta 1 único jogador deitar na cama para amanhecer o dia para todo mundo!',
    sideEffectOrTip:
      'Se você colocar 0 em vez de 1, o jogo pula a noite no mesmo segundo em que você encosta na cama (sem nem esperar a animação de fechar os olhos).',
  },
  {
    id: 'cmd-no-creeper-holes',
    title: 'Proibir Creepers de Explodirem Sua Casa (Sem Tirar os Monstros)',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule mobGriefing false',
    undoCommand: '/gamerule mobGriefing true',
    description:
      'Creepers continuam dando dano em você, mas a explosão deles NÃO quebra nenhum bloco da sua casa ou baú! Também impede Endermen de roubarem blocos de grama e Ghasts de quebrarem pontes.',
    sideEffectOrTip:
      'Atenção: Enquanto "mobGriefing" estiver false, Aldeões Fazendeiros não colhem plantações e ovelhas não comem grama. Reative para "true" quando quiser ligar sua farm de aldeões!',
  },
  {
    id: 'cmd-no-phantoms',
    title: 'Apagar os Fantasmas (Phantoms) Irritantes do Céu Noturno',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule doInsomnia false',
    undoCommand: '/gamerule doInsomnia true',
    description:
      'Odeia quando você passa 3 dias construindo sua base sem dormir e começam a descer aqueles monstros voadores (Phantoms) te mordendo no telhado? Esse comando desativa a insônia para sempre!',
    sideEffectOrTip:
      'Você ainda pode conseguir Membranas de Fantasma através de presentes que seus Gatos domesticados trazem pela manhã ao acordar.',
  },
  {
    id: 'cmd-no-fire-spread',
    title: 'Fogo e Raios Nunca Queimarem Sua Casa de Madeira',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule doFireTick false',
    undoCommand: '/gamerule doFireTick true',
    description:
      'Permite construir lareiras com fogo real ou decorar com lava perto de madeira e lã sem que o fogo se espalhe e destrua sua construção.',
    sideEffectOrTip:
      'O fogo aceso com Pederneira nunca se apaga sozinho e nunca passa para os blocos vizinhos.',
  },
  {
    id: 'cmd-sunny-day',
    title: 'Parar Chuva Irritante e Colocar Dia Ensolarado na Hora',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/weather clear 1000000',
    undoCommand: '/time set day',
    description:
      'Limpa o tempo chuvoso/tempestade por 1 milhão de segundos (~277 horas reais de sol!) para não derrubar seu FPS enquanto você usa Shaders.',
    sideEffectOrTip:
      'Se quiser congelar o sol no céu para nunca mais escurecer enquanto constrói, use: /gamerule doDaylightCycle false',
  },
  {
    id: 'cmd-water-fall-immunity',
    title: 'Modo Explorador Relaxado: Sem Dano de Queda ou Afogamento',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/gamerule fallDamage false',
    undoCommand: '/gamerule drowningDamage false',
    description:
      'Desativa especificamente o dano de cair de lugares altos (ou de errar o pouso de Elytra) e o dano de afogamento no fundo do oceano, mantendo o combate contra monstros 100% normal.',
    sideEffectOrTip:
      'Também existe "/gamerule fireDamage false" se você quiser nadar na lava do Nether sem perder vida!',
  },
  {
    id: 'cmd-night-vision-infinite',
    title: 'Enxergar Tudo nas Cavernas Escuras (Visão Noturna Infinita)',
    audience: 'Meros Mortais (Salva-Vidas)',
    command: '/effect give @s minecraft:night_vision infinite 0 true',
    undoCommand: '/effect clear @s minecraft:night_vision',
    description:
      'Dá a você Visão Noturna com duração infinita e sem aquelas bolhinhas de poção atrapalhando a tela ("true" no final esconde as partículas). Adeus escuridão nas cavernas!',
    sideEffectOrTip:
      'Para remover o efeito quando quiser ver o pôr do sol com Shaders, basta beber um Balde de Leite ou usar "/effect clear @s".',
  },

  // COMANDOS PARA VETERANOS & ENGENHARIA (/tick, Secret Blocks, Debug)
  {
    id: 'cmd-tick-rate-200',
    title: 'Acelerar o Jogo em 10x para Testar Farms (/tick rate — 1.20.3+)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/tick rate 200',
    undoCommand: '/tick rate 20',
    description:
      'O comando oficial embutido na Java Edition 1.20.3+: aumenta a velocidade do motor do jogo de 20 ticks/s para 200 ticks/s! Você simula 1 hora inteira de produção da sua Farm de Ferro ou Ouro em apenas 6 minutos!',
    sideEffectOrTip:
      'Para voltar à velocidade normal do jogo (20 TPS), digite: /tick rate 20',
  },
  {
    id: 'cmd-tick-freeze-step',
    title: 'Congelar o Tempo no Ar e Avançar Frame por Frame (Redstone Debug)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/tick freeze',
    undoCommand: '/tick unfreeze',
    description:
      'Congela instantaneamente todas as entidades, TNT explodindo, água e pulsos de redstone no mundo, permitindo que você caminhe ao redor do circuito e inspecione qual repetidor atrasou!',
    sideEffectOrTip:
      'Enquanto estiver congelado, use "/tick step 1t" para avançar exatamente 1 vigésimo de segundo por clique!',
  },
  {
    id: 'cmd-invisible-light-block',
    title: 'Bloco de Luz 100% Invisível (Iluminar Base Sem Tochas no Chão)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/give @s minecraft:light 64',
    description:
      'Entrega o bloco secreto usado pelos construtores profissionais: ele emite luz máxima (nível 15, impedindo monstros de nascerem), mas é 100% invisível e você atravessa por dentro dele como se fosse ar!',
    sideEffectOrTip:
      'Segure o bloco de luz na mão para ver as lâmpadas flutuando e clique com o botão direito nelas para regular a intensidade de 0 a 15.',
  },
  {
    id: 'cmd-debug-stick',
    title: 'O Lendário Graveto de Debug (Girar Blocos &Estados Impossíveis)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/give @s minecraft:debug_stick',
    description:
      'Item exclusivo da Java Edition: clique nos blocos para alterar suas propriedades internas! Faça escadas de canto sem apoio, acenda Lâmpadas de Redstone sem energia, conecte cercas no ar ou gire pistões.',
    sideEffectOrTip:
      'Botão Esquerdo escolhe a propriedade (ex: facing, waterlogged, lit) e Botão Direito muda o valor!',
  },
  {
    id: 'cmd-random-tick-speed',
    title: 'Turbo de Crescimento Agrícola Instantâneo (randomTickSpeed)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/gamerule randomTickSpeed 300',
    undoCommand: '/gamerule randomTickSpeed 3',
    description:
      'Acelera em 100x a velocidade com que trigo, batata, cana-de-açúcar, árvores e grama se espalham, além de fazer folhas de árvores cortadas sumirem em 1 segundo.',
    sideEffectOrTip:
      'O valor padrão original do Minecraft Java é 3. Volte para "/gamerule randomTickSpeed 3" após o teste para não causar lag.',
  },
  {
    id: 'cmd-invisible-item-frame',
    title: 'Moldura 100% Invisível (Deixar Espadas e Pratos Sob a Mesa)',
    audience: 'Veteranos & Testes (/tick & Secretos)',
    command: '/give @s minecraft:item_frame[entity_data={id:"minecraft:item_frame",Invisible:1b}] 16',
    undoCommand: '/give @s minecraft:item_frame{EntityTag:{Invisible:1b}} 16',
    description:
      'Cria uma Moldura (Item Frame) invisível! Quando você coloca um bife sobre a mesa ou uma picareta na parede, o fundo de couro da moldura some e apenas o item fica apoiado de forma ultra realista!',
    sideEffectOrTip:
      'O comando principal funciona no Minecraft 1.20.5 e 1.21+. O comando secundário funciona nas versões 1.16 até 1.20.4.',
  },
];

const LOCATE_TARGETS = [
  { label: '🏡 Vila Mais Próxima (Plains)', cmd: '/locate structure #minecraft:village' },
  { label: '🔥 Fortaleza do Nether (Blazes)', cmd: '/locate structure minecraft:fortress' },
  { label: '🐷 Bastião de Piglins (Netherita)', cmd: '/locate structure minecraft:bastion_remnant' },
  { label: '👁️ Portal do End (Stronghold)', cmd: '/locate structure minecraft:stronghold' },
  { label: '🪽 Cidade do End com Barco (Elytra)', cmd: '/locate structure minecraft:end_city' },
  { label: '💀 Cidade Ancestral (Warden / Deep Dark)', cmd: '/locate structure minecraft:ancient_city' },
  { label: '🏰 Mansão da Floresta (Allays / Totem)', cmd: '/locate structure minecraft:mansion' },
  { label: '🌸 Bioma de Cerejeiras Rosa (Cherry Grove)', cmd: '/locate biome minecraft:cherry_grove' },
  { label: '🍄 Ilha de Cogumelos (Zero Monstros!)', cmd: '/locate biome minecraft:mushroom_fields' },
];

// 5. MASTER TABLE OF ALL 13 VILLAGER PROFESSIONS & LECTERN BOOK PRICE FORMULAS
export interface VillagerProfessionItem {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  roleCategory: 'Equipamentos de Diamante' | 'Livros & Magia' | 'Fábrica de Esmeraldas' | 'Comida & Utilidades';
  workstation: string;
  workstationRecipe: string;
  emeraldGeneratorTrade: string;
  curedPriceTrick: string;
  masterBuys: string[];
  veteranSecret: string;
}

const VILLAGER_PROFESSIONS_DATA: VillagerProfessionItem[] = [
  {
    id: 'librarian',
    name: '1. Bibliotecário',
    englishName: 'Librarian',
    icon: '📖',
    roleCategory: 'Livros & Magia',
    workstation: 'Atril (Lectern)',
    workstationRecipe: '4 Lajes de Madeira no topo/base + 1 Estante de Livros no centro',
    emeraldGeneratorTrade: 'Compra 24 Papéis (1 Papel após cura) ou 1 Livro por 1 Esmeralda',
    curedPriceTrick: 'Após 1 cura de Zumbi: Compra 1 Estante por 1 Esmeralda e vende 1 Estante (que solta 3 livros) por 1 Esmeralda!',
    masterBuys: [
      'Todos os Livros Encantados do Jogo (Mending, Unbreaking III, Protection IV, Sharpness V, Efficiency V, Silk Touch, Fortune III)',
      'Lanterna (1 Esmeralda) & Bloco de Vidro (1 Esmeralda por 4 vidros)',
      'Etiqueta / Name Tag no Nível 5 Mestre (20 Esmeraldas -> 1 Esmeralda com cura!)',
      'Bússola e Relógio',
    ],
    veteranSecret:
      'Nunca faça 1 troca sequer enquanto não aparecer o encantamento exato no Nível 1! Quebre e recoloque o Atril na frente dele (entre as 08:00 e 17:00 do jogo) até rolar Remendo (Mending) ou Proteção IV. Assim que aparecer, compre 1 item para travar a profissão para sempre!',
  },
  {
    id: 'fletcher',
    name: '2. Flecheiro',
    englishName: 'Fletcher',
    icon: '🏹',
    roleCategory: 'Fábrica de Esmeraldas',
    workstation: 'Bancada de Arco e Flecha (Fletching Table)',
    workstationRecipe: '2 Sílex (Flint) no topo + 4 Tábuas de Madeira abaixo',
    emeraldGeneratorTrade: 'Compra 32 Gravetos (Sticks) por 1 Esmeralda no Nível 1!',
    curedPriceTrick: 'Com 1 ou 2 curas de zumbi, ele compra até 1 Graveto por 1 Esmeralda (1 Tora de Madeira = 8 Esmeraldas)!',
    masterBuys: [
      '16 Flechas comuns por 1 Esmeralda (Nível 1)',
      'Flechas Encantadas com efeito de Poção no Nível 5 (Dano Instantâneo II, Fraqueza, Lentidão, Visão Noturna)',
      'Arco e Besta encantados',
    ],
    veteranSecret:
      'É o aldeão mais fácil para ficar milionário no Dia 1: plante Pinheiros Gigantes (2x2 mudas) ou faça uma farm de Bambu (2 bambus = 1 graveto) para gerar packs de Esmeraldas sem minerar!',
  },
  {
    id: 'farmer',
    name: '3. Fazendeiro',
    englishName: 'Farmer',
    icon: '🌾',
    roleCategory: 'Comida & Utilidades',
    workstation: 'Composteira (Composter)',
    workstationRecipe: '7 Lajes de Madeira em formato de "U"',
    emeraldGeneratorTrade: 'Compra 6 Abóboras, 4 Fatias de Melancia, 20 Trigos, 22 Cenouras ou 26 Batatas por 1 Esmeralda',
    curedPriceTrick: 'Após 1 cura: Compra 1 única Abóbora ou 1 Melancia por 1 Esmeralda!',
    masterBuys: [
      '3 Cenouras Douradas por 3 Esmeraldas no Nível 5 (A melhor comida de saturação do jogo sem gastar ouro!)',
      'Fatia de Melancia Reluzente (para poções de Cura Instantânea)',
      'Torta de Abóbora, Maçãs, Pães e Ensopado Suspeito',
    ],
    veteranSecret:
      'Todo jogador veterano aposenta o bife e passa a comer apenas Cenoura Dourada comprada do Fazendeiro Nível 5: ela dá 14.4 de Saturação (a maior do jogo inteiro) e custa apenas 1 Esmeralda!',
  },
  {
    id: 'armorer',
    name: '4. Armeiro de Armaduras',
    englishName: 'Armorer',
    icon: '🛡️',
    roleCategory: 'Equipamentos de Diamante',
    workstation: 'Alto-Forno (Blast Furnace)',
    workstationRecipe: '5 Barras de Ferro + 1 Fornalha no meio + 3 Pedras Lisas na base',
    emeraldGeneratorTrade: 'Compra 4 Barras de Ferro por 1 Esmeralda (conecte direto na sua Iron Farm!)',
    curedPriceTrick: 'Após 1 cura: Compra 1 Barra de Ferro por 1 Esmeralda e vende cada peça de Diamante por 1 Esmeralda!',
    masterBuys: [
      'Peitoral de Diamante Encantado (Nível 5)',
      'Calça de Diamante Encantada (Nível 4)',
      'Botas e Capacete de Diamante Encantados (Nível 4 e 5)',
      'Armadura completa de Cota de Malha (Chainmail) e Escudo',
    ],
    veteranSecret:
      'Com 1 Armeiro Nível 5 na base, você NUNCA mais precisa minerar diamantes para fazer armadura! Se você morrer na lava, basta pagar 4 esmeraldas, passar as peças no Rebolo (Grindstone) para limpar os encantamentos ruins e aplicar seus livros perfeitos!',
  },
  {
    id: 'toolsmith',
    name: '5. Ferreiro de Ferramentas',
    englishName: 'Toolsmith',
    icon: '⛏️',
    roleCategory: 'Equipamentos de Diamante',
    workstation: 'Bancada de Ferraria (Smithing Table)',
    workstationRecipe: '2 Barras de Ferro no topo + 4 Tábuas de Madeira abaixo',
    emeraldGeneratorTrade: 'Compra 4 Barras de Ferro, 15 Carvões ou 1 Diamante por 1 Esmeralda',
    curedPriceTrick: 'Compra 1 Ferro por 1 Esmeralda e vende Picareta de Diamante por 1 Esmeralda!',
    masterBuys: [
      'Picareta de Diamante Encantada (Nível 5)',
      'Machado de Diamante e Pá de Diamante Encantados (Nível 4)',
      'Enxada de Diamante (Nível 3)',
      'Sino da Vila (Bell)',
    ],
    veteranSecret:
      'Compre várias Picaretas de Diamante nele por 1 Esmeralda e junte duas na Bigorna ou desencante no Rebolo para ter ferramentas infinitas para escavar megabases!',
  },
  {
    id: 'weaponsmith',
    name: '6. Ferreiro de Armas',
    englishName: 'Weaponsmith',
    icon: '⚔️',
    roleCategory: 'Equipamentos de Diamante',
    workstation: 'Rebolo (Grindstone)',
    workstationRecipe: '2 Gravetos + 1 Laje de Pedra no meio + 2 Tábuas nas laterais',
    emeraldGeneratorTrade: 'Compra 4 Barras de Ferro ou 15 Carvões por 1 Esmeralda',
    curedPriceTrick: 'Vende Espada de Diamante e Machado de Diamante por 1 Esmeralda após cura!',
    masterBuys: [
      'Espada de Diamante Encantada (Nível 5)',
      'Machado de Diamante Encantado (Nível 4)',
      'Espada de Ferro e Machado de Ferro (Nível 1)',
    ],
    veteranSecret:
      'Combinado com o Armeiro e o Ferreiro de Ferramentas, forma a "Tríade do Diamante Infinito": todas as 8 peças de diamante do jogo compradas com o ferro da sua Iron Farm!',
  },
  {
    id: 'cleric',
    name: '7. Clérigo (Alquimista)',
    englishName: 'Cleric',
    icon: '🧪',
    roleCategory: 'Livros & Magia',
    workstation: 'Suporte de Poções (Brewing Stand)',
    workstationRecipe: '1 Vara de Blaze no meio + 3 Pedregulhos na base',
    emeraldGeneratorTrade: 'Compra 32 Carnes Podres de Zumbi ou 3 Barras de Ouro por 1 Esmeralda',
    curedPriceTrick: 'Transforma todo o lixo de Carne Podre e Ouro da sua farm do Nether em Esmeraldas!',
    masterBuys: [
      'Pó de Redstone infinito (2 Redstones por 1 Esmeralda no Nível 1!)',
      'Lápis-Lazúli e Bloco de Pedra Luminosa / Glowstone (Nível 2 e 3)',
      'Pérola do End (Ender Pearl no Nível 4 — zere o jogo sem caçar Enderman!)',
      'Frasco de Encantamento / Garrafa de XP (Bottle o’ Enchanting no Nível 5)',
    ],
    veteranSecret:
      'Precisa de centenas de Redstones para seus separadores de baús e Glowstone para decorar? O Clérigo vende Redstone, Glowstone e Pérolas do End infinitas!',
  },
  {
    id: 'mason',
    name: '8. Pedreiro (Stone Mason)',
    englishName: 'Mason',
    icon: '🧱',
    roleCategory: 'Fábrica de Esmeraldas',
    workstation: 'Cortador de Pedra (Stonecutter)',
    workstationRecipe: '1 Barra de Ferro no topo + 3 Pedras Lisas na base',
    emeraldGeneratorTrade: 'Compra 10 Bolas de Argila (Clay), 20 Pedras, 16 Granitos, Andesitos ou Dioritos por 1 Esmeralda',
    curedPriceTrick: 'Após 1 cura: Compra 1 única Bola de Argila ou 1 Pedra por 1 Esmeralda!',
    masterBuys: [
      'Bloco de Quartzo Liso e Pilar de Quartzo no Nível 5 (Construa mansões brancas sem minerar no Nether!)',
      'Tijolos (Bricks) prontos no Nível 1',
      'Terracota Colorida e Terracota Esmaltada (16 cores)',
    ],
    veteranSecret:
      'Se você encontrar um bioma de Caverna Verdejante (Lush Caves), há milhares de blocos de argila no chão: 1 pá de argila rende centenas de Esmeraldas no Pedreiro!',
  },
  {
    id: 'cartographer',
    name: '9. Cartógrafo',
    englishName: 'Cartographer',
    icon: '🗺️',
    roleCategory: 'Fábrica de Esmeraldas',
    workstation: 'Bancada de Cartografia (Cartography Table)',
    workstationRecipe: '2 Papéis no topo + 4 Tábuas de Madeira abaixo',
    emeraldGeneratorTrade: 'Compra 24 Papéis (Nível 1) e 11 Painéis de Vidro (Nível 2) por 1 Esmeralda',
    curedPriceTrick: 'Compra 1 Painel de Vidro por 1 Esmeralda (e seu Bibliotecário vende 4 blocos de vidro = 16 painéis por 1 Esmeralda!).',
    masterBuys: [
      'Mapa de Exploração da Mansão da Floresta (Onde ficam os Allays e Totens da Imortalidade)',
      'Mapa do Monumento Oceânico (Esponjas e Prismarinho)',
      'Mapas de 7 Vilas e Biomas específicos (1.20.2+) + Moldura de Globo para Estandarte',
    ],
    veteranSecret:
      'Quer encontrar uma Mansão da Floresta para pegar Allays sem usar comandos? Suba um Cartógrafo para o Nível 3 e compre o Mapa da Mansão!',
  },
  {
    id: 'butcher',
    name: '10. Açougueiro',
    englishName: 'Butcher',
    icon: '🥩',
    roleCategory: 'Comida & Utilidades',
    workstation: 'Defumador (Smoker)',
    workstationRecipe: '1 Fornalha no centro + 4 Toras de Madeira ao redor',
    emeraldGeneratorTrade: 'Compra 14 Frangos Crus, 7 Costeletas de Porco, 4 Coelhos ou 10 Bagas Doces (Sweet Berries) por 1 Esmeralda',
    curedPriceTrick: 'Compra 1 Frango Cru ou 1 Baga Doce por 1 Esmeralda após cura!',
    masterBuys: [
      'Costeleta de Porco Assada e Frango Assado prontos no Nível 2',
      'Ensopado de Coelho',
    ],
    veteranSecret:
      'Plante arbustos de Bagas Doces (Sweet Berries) da Taiga ao redor da base: elas crescem super rápido e o Açougueiro compra todas por Esmeraldas no Nível 5.',
  },
  {
    id: 'shepherd',
    name: '11. Pastor',
    englishName: 'Shepherd',
    icon: '🧶',
    roleCategory: 'Comida & Utilidades',
    workstation: 'Tear (Loom)',
    workstationRecipe: '2 Linhas de Aranha (String) no topo + 2 Tábuas abaixo',
    emeraldGeneratorTrade: 'Compra 18 Lãs (Branca, Marrom, Preta ou Cinza) por 1 Esmeralda no Nível 1',
    curedPriceTrick: 'Compra 1 Lã por 1 Esmeralda (conectado a 1 ovelha com Ejetor e Tosquiadeira!).',
    masterBuys: [
      'Todas as 16 cores de Lã e Carpetes para Pixel Art e decoração',
      'Camas coloridas (1 Esmeralda — ótimas para minerar Netherita ou matar o Dragão!)',
      'Quadros Decorativos (Paintings) e Tesoura de Tosquiar',
    ],
    veteranSecret:
      'Precisa de 40 camas para explodir o Nether na camada Y=15 atrás de Netherita? Compre camas prontas por 1 Esmeralda no Pastor!',
  },
  {
    id: 'fisherman',
    name: '12. Pescador',
    englishName: 'Fisherman',
    icon: '🎣',
    roleCategory: 'Comida & Utilidades',
    workstation: 'Barril (Barrel)',
    workstationRecipe: '6 Tábuas nas laterais + 2 Lajes de Madeira no topo e base',
    emeraldGeneratorTrade: 'Compra 20 Linhas (String), 10 Carvões, 6 Bacalhaus ou 1 Barco de Madeira',
    curedPriceTrick: 'Compra 1 Linha de Aranha por 1 Esmeralda!',
    masterBuys: [
      'Balde com Bacalhau Vivo (1 Balde de Ferro + Peixe por apenas 3 Esmeraldas!)',
      'Vara de Pesca Encantada (Sorte do Mar / Isca)',
      'Fogueira (Campfire) pronta para decoração e fumaça de chaminé',
    ],
    veteranSecret:
      'O Barril é o bloco favorito dos construtores para substituir baús na parede: ao contrário do baú comum, o Barril abre mesmo que haja um bloco sólido colado em cima dele!',
  },
  {
    id: 'leatherworker',
    name: '13. Coureiro',
    englishName: 'Leatherworker',
    icon: '🧥',
    roleCategory: 'Comida & Utilidades',
    workstation: 'Caldeirão (Cauldron)',
    workstationRecipe: '7 Barras de Ferro em formato de "U"',
    emeraldGeneratorTrade: 'Compra 6 Couros (da sua Farm de Vacas 1x1!), Pele de Coelho ou Escama de Tartaruga',
    curedPriceTrick: 'Compra 1 Couro por 1 Esmeralda!',
    masterBuys: [
      'Sela para Cavalos e Striders no Nível 5 (Fim da procura por selas em dungeons!)',
      'Armadura de Couro para Cavalo',
      'Botas de Couro (obrigatórias para andar sobre Neve Fofa nas montanhas sem afundar!)',
    ],
    veteranSecret:
      'Nunca mais procure Sela em baús de cavernas: um Coureiro Nível 5 vende quantas Selas você quiser por 6 Esmeraldas (ou 1 Esmeralda após cura)!',
  },
];

const BOOK_PRICE_TIERS = [
  {
    tier: 'Livro Nível I (Ex: Toque Suave, Infinidade, Chama, Afinidade Aquática)',
    minEmeralds: 5,
    maxEmeralds: 19,
    curedPrice: '1 Esmeralda',
    verdict: 'Role até vir entre 5 e 9 Esmeraldas (ou cure 1x para cair direto para 1 Esmeralda!).',
  },
  {
    tier: 'Livro Tesouro Nível I (Ex: Remendo / Mending & Passos Gelados)',
    minEmeralds: 10,
    maxEmeralds: 38,
    curedPrice: '1 Esmeralda',
    verdict: 'Encantamentos "Tesouro" custam o dobro no código! O menor preço possível sem cura é 10 Esmeraldas.',
  },
  {
    tier: 'Livro Nível II (Ex: Aspecto Flamejante II, Repulsão II, Impacto II)',
    minEmeralds: 8,
    maxEmeralds: 32,
    curedPrice: '1 Esmeralda',
    verdict: 'Role até vir abaixo de 14 Esmeraldas ou aplique 1 cura de zumbi.',
  },
  {
    tier: 'Livro Nível III (Ex: Inquebrável III, Fortuna III, Saque III, Alcance Cortante III)',
    minEmeralds: 11,
    maxEmeralds: 43,
    curedPrice: '1 Esmeralda',
    verdict: 'Preço mínimo matemático = 11 Esmeraldas. Qualquer valor entre 11 e 17 é excelente!',
  },
  {
    tier: 'Livro Nível IV (Ex: Proteção IV, Queda de Pena IV)',
    minEmeralds: 14,
    maxEmeralds: 56,
    curedPrice: '1 Esmeralda',
    verdict: 'Preço mínimo matemático = 14 Esmeraldas. Com 1 cura (desconto de -20), até um livro de 21 cai para 1 Esmeralda!',
  },
  {
    tier: 'Livro Nível V (Ex: Eficiência V, Afiação V, Força V, Julgamento V)',
    minEmeralds: 17,
    maxEmeralds: 64,
    curedPrice: '1 Esmeralda (com 1 a 2 curas)',
    verdict: 'Preço mínimo matemático = 17 Esmeraldas. É o tier mais raro: se vier abaixo de 26 Esmeraldas, trave na hora!',
  },
];

export const VeteranEngineeringLab: React.FC = () => {
  const { playSound } = useDimensionTheme();
  const [activeLabTab, setActiveLabTab] = useState<
    | 'fireworks-banners-loom'
    | 'mob-genetics-pets'
    | 'bosses-trial-chambers'
    | 'voxel-circles-shulker'
    | 'commands-generator'
    | 'villager-trading-hall'
    | 'anvil-optimizer'
    | 'crafting-3x3'
    | 'engine-secrets'
  >('fireworks-banners-loom');
  const [selectedGearId, setSelectedGearId] = useState<string>(ANVIL_GEAR_PRESETS[0].id);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(REDSTONE_CRAFTING_RECIPES[0].id);
  const [copiedRule, setCopiedRule] = useState<string | null>(null);

  // Villager Trading Hall States
  const [villagerCategoryFilter, setVillagerCategoryFilter] = useState<
    'Todos' | 'Equipamentos de Diamante' | 'Livros & Magia' | 'Fábrica de Esmeraldas' | 'Comida & Utilidades'
  >('Todos');
  const [selectedVillagerId, setSelectedVillagerId] = useState<string>(VILLAGER_PROFESSIONS_DATA[0].id);

  // Interactive Command Generator States
  const [cmdFilter, setCmdFilter] = useState<
    'Todos' | 'Meros Mortais (Salva-Vidas)' | 'Veteranos & Testes (/tick & Secretos)'
  >('Todos');
  const [selectedLocateCmd, setSelectedLocateCmd] = useState<string>(LOCATE_TARGETS[0].cmd);
  const [tpX, setTpX] = useState<string>('120');
  const [tpY, setTpY] = useState<string>('70');
  const [tpZ, setTpZ] = useState<string>('-350');
  const [selectedTickRate, setSelectedTickRate] = useState<number>(200);

  const activeGear =
    ANVIL_GEAR_PRESETS.find((g) => g.id === selectedGearId) || ANVIL_GEAR_PRESETS[0];
  const activeRecipe =
    REDSTONE_CRAFTING_RECIPES.find((r) => r.id === selectedRecipeId) || REDSTONE_CRAFTING_RECIPES[0];
  const activeVillager =
    VILLAGER_PROFESSIONS_DATA.find((v) => v.id === selectedVillagerId) || VILLAGER_PROFESSIONS_DATA[0];

  const filteredVillagers = VILLAGER_PROFESSIONS_DATA.filter(
    (v) => villagerCategoryFilter === 'Todos' || v.roleCategory === villagerCategoryFilter
  );

  const filteredCommands = COMMAND_CARDS_DATABASE.filter(
    (c) => cmdFilter === 'Todos' || c.audience === cmdFilter
  );

  const handleCopyText = (text: string, id: string) => {
    playSound('anvil');
    navigator.clipboard.writeText(text);
    setCopiedRule(id);
    setTimeout(() => setCopiedRule(null), 2000);
  };

  return (
    <section
      id="laboratorio-veterano"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 space-y-8 mc-bevel-block"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <Hammer className="w-4 h-4" />
            <span>Comandos, 13 Aldeões, Bigorna Binária & Segredos da Engine</span>
            <span aria-hidden="true">·</span>
            <span>Do Jogador Casual ao Veterano</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Central de Comandos, Guia dos 13 Aldeões, Bigorna & Bancada 3x3
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Domine os comandos salva-vidas e <code>/tick rate</code>, consulte a Tabela Mestra das 13 Profissões de Aldeões com os preços mínimos de cada Livro no Atril, e elimine o <em>"Muito Caro!"</em> na Bigorna.
          </p>
        </div>

        {/* Sub-navigation Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={() => {
              playSound('piston');
              setActiveLabTab('fireworks-banners-loom');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'fireworks-banners-loom'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-amber-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Foguetes Elytra & Banners no Tear</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('xp_orb');
              setActiveLabTab('mob-genetics-pets');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'mob-genetics-pets'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-emerald-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Pets Raros, Cavalos & 9 Lobos</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('anvil');
              setActiveLabTab('bosses-trial-chambers');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'bosses-trial-chambers'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-amber-400 hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Chefes, Warden & Clava 1.21</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('piston');
              setActiveLabTab('voxel-circles-shulker');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'voxel-circles-shulker'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-emerald-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Círculos, Cúpulas & Shulkers</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('piston');
              setActiveLabTab('commands-generator');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'commands-generator'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-amber-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Comandos (/gamerule & /tick)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('xp_orb');
              setActiveLabTab('villager-trading-hall');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'villager-trading-hall'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-emerald-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 Aldeões & Preços de Livros</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('anvil');
              setActiveLabTab('anvil-optimizer');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'anvil-optimizer'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>Calculadora de Bigorna</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('piston');
              setActiveLabTab('crafting-3x3');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'crafting-3x3'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Bancada 3x3</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('xp_orb');
              setActiveLabTab('engine-secrets');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLabTab === 'engine-secrets'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Segredos da Engine (QC)</span>
          </button>
        </div>
      </div>

      {/* TAB -4: FIREWORKS (ELYTRA & MULTISHOT CROSSBOW) + LOOM BANNERS & SHIELDS */}
      {activeLabTab === 'fireworks-banners-loom' && <FireworksBannersLoomLab />}

      {/* TAB -3: MOB GENETICS, RARE PETS (BLUE AXOLOTL, HORSES & 9 WOLVES + ARMOR) */}
      {activeLabTab === 'mob-genetics-pets' && <MobGeneticsRarePetsLab />}

      {/* TAB -2: BOSSES, WARDEN, WITHER CHEESE & 1.21 MACE CALCULATOR */}
      {activeLabTab === 'bosses-trial-chambers' && <BossesRaidTacticsLab />}

      {/* TAB -1: VOXEL CIRCLE, DOME & SHULKER BOX ARCHITECT */}
      {activeLabTab === 'voxel-circles-shulker' && <VoxelCircleShulkerLab />}

      {/* TAB 0: COMMANDS GENERATOR (MEROS MORTAIS & VETERANOS) */}
      {activeLabTab === 'commands-generator' && (
        <div className="space-y-8">
          {/* Secret LAN Trick Banner + Achievements/Advancements Truth Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-5 sm:p-6 space-y-2 mc-bevel-block">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    Segredo Salva-Vidas: Como Usar Comandos num Mundo Criado Sem Cheats!
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-400">100% Nativo no Java</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Criou seu mundo Survival e o jogo diz <em>"Você não tem permissão para usar este comando"</em>? Aperte <strong>ESC</strong> ➔ clique em <strong>Abrir para LAN (Open to LAN)</strong> ➔ mude <strong>Permitir Comandos (Allow Commands): ATIVADO</strong> ➔ clique em <strong>Iniciar Mundo LAN</strong>. Digite <code>/gamerule keepInventory true</code>! Quando sair e abrir de novo, ele volta a ser Singleplayer com a regra salva!
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 sm:p-6 space-y-2 mc-bevel-block">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    Dúvida Clássica: Usar Comandos Faz Perder as Conquistas do Jogo?
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">Java vs Bedrock</span>
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-1.5">
                <p>
                  <strong className="text-emerald-400">• No Minecraft JAVA Edition (PC): NÃO PERDE!</strong> No Java, as conquistas (chamadas de <em>Progressos / Advancements</em> na tecla <strong>L</strong>) <strong>continuam funcionando 100% normalmente</strong> mesmo com <code>keepInventory</code>, <code>/tp</code> ou <em>Abrir para LAN</em> ativados!
                </p>
                <p>
                  <strong className="text-amber-300">• No Minecraft BEDROCK (Console / Celular / Windows 10): SIM!</strong> No Bedrock, ativar "Cheats" bloqueia permanentemente os Troféus da PSN / Conquistas da Xbox Live naquele mundo. <em>Truque Bedrock:</em> faça uma <strong>Cópia do seu Mundo</strong>, ative os comandos na cópia para usar o <code>/locate</code>, anote as coordenadas X/Z num papel e volte para o seu mundo original sem cheats!
                </p>
              </div>
            </div>
          </div>

          {/* 3 Interactive Mini-Builders: /locate, /tp, and /tick rate */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Builder 1: /locate Radar */}
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3 mc-bevel-block flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>1. GPS de Estruturas & Biomas (/locate)</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Escolha o que você quer encontrar no seu mapa e copie o comando pronto:
                </p>
                <select
                  value={selectedLocateCmd}
                  onChange={(e) => {
                    playSound('click');
                    setSelectedLocateCmd(e.target.value);
                  }}
                  aria-label="Selecionar estrutura ou bioma para localizar"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                >
                  {LOCATE_TARGETS.map((item) => (
                    <option key={item.cmd} value={item.cmd}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-300 truncate">
                  {selectedLocateCmd}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(selectedLocateCmd, 'builder-locate')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedRule === 'builder-locate' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Comando /locate Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Comando de Busca</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Builder 2: /tp Teleporter */}
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3 mc-bevel-block flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>2. Gerador de Teleporte Rápido (/tp)</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Digite as coordenadas X, Y, Z da sua casa (ou clique nas coordenadas verdes do /locate no chat!):
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <label className="text-[11px] text-zinc-400">X:</label>
                    <input
                      type="text"
                      value={tpX}
                      onChange={(e) => setTpX(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Y (Altura):</label>
                    <input
                      type="text"
                      value={tpY}
                      onChange={(e) => setTpY(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400">Z:</label>
                    <input
                      type="text"
                      value={tpZ}
                      onChange={(e) => setTpZ(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-300 truncate">
                  {`/tp @s ${tpX || '0'} ${tpY || '70'} ${tpZ || '0'}`}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(`/tp @s ${tpX || '0'} ${tpY || '70'} ${tpZ || '0'}`, 'builder-tp')
                  }
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedRule === 'builder-tp' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Teleporte Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Comando /tp</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Builder 3: /tick rate Time Accelerator */}
            <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-5 space-y-3 mc-bevel-block flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>3. Máquina do Tempo (/tick rate 1.20.3+)</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Acelere o jogo para testar quanto sua farm produz em 1 hora sem esperar:
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                  {[
                    { rate: 20, label: '20 (1x Normal)' },
                    { rate: 100, label: '100 (5x Turbo)' },
                    { rate: 200, label: '200 (10x Máx)' },
                  ].map((item) => (
                    <button
                      key={item.rate}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setSelectedTickRate(item.rate);
                      }}
                      className={`py-1.5 px-2 rounded-lg border font-semibold transition-colors ${
                        selectedTickRate === item.rate
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-300 truncate">
                  {`/tick rate ${selectedTickRate}`}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(`/tick rate ${selectedTickRate}`, 'builder-tick')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedRule === 'builder-tick' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Comando /tick Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar /tick rate {selectedTickRate}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar: Meros Mortais vs Veteranos */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950 border border-zinc-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium px-2">Filtrar Comandos:</span>
              {(
                [
                  'Todos',
                  'Meros Mortais (Salva-Vidas)',
                  'Veteranos & Testes (/tick & Secretos)',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setCmdFilter(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    cmdFilter === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-zinc-500 pr-2">
              {filteredCommands.length} comandos prontos
            </span>
          </div>

          {/* Command Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCommands.map((item) => {
              const isMortal = item.audience === 'Meros Mortais (Salva-Vidas)';
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-4 flex flex-col justify-between mc-bevel-block"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          isMortal ? 'text-amber-300' : 'text-emerald-400'
                        }`}
                      >
                        {item.audience}
                      </span>
                      <span className="font-mono text-zinc-500">Java 1.20 / 1.21+</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-100">{item.title}</h3>

                    <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

                    <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-400">
                      <strong className="text-emerald-400">Dica Prática: </strong>
                      {item.sideEffectOrTip}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs">
                      <code className="text-emerald-300 truncate">{item.command}</code>
                      <button
                        type="button"
                        onClick={() => handleCopyText(item.command, item.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs shrink-0 transition-colors"
                      >
                        {copiedRule === item.id ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>

                    {item.undoCommand && (
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 px-1">
                        <span className="truncate">Secundário / Desfazer: {item.undoCommand}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(item.undoCommand!, `${item.id}-undo`)}
                          className="text-zinc-400 hover:text-zinc-200 underline shrink-0"
                        >
                          {copiedRule === `${item.id}-undo` ? 'Copiado!' : 'Copiar este'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 0.5: MASTER TABLE OF ALL 13 VILLAGERS & LECTERN BOOK PRICE TABLE */}
      {activeLabTab === 'villager-trading-hall' && (
        <div className="space-y-8">
          {/* Top Section: Lectern Book Minimum Price Table */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-6 space-y-4 mc-bevel-block">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>
                  Tabela de Preços Mínimos de Livros no Atril (Quando Travar a Troca vs Quebrar o Atril?)
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                1 Cura de Zumbi = Desconto de -20 a -25 Esmeraldas!
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Ao colocar e quebrar o <strong>Atril (Lectern)</strong> na frente de um Bibliotecário Nível 1, o preço em Esmeraldas é sorteado dentro de uma faixa matemática fixa pelo nível máximo do encantamento. Veja abaixo o menor valor possível no código do jogo:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {BOOK_PRICE_TIERS.map((tierItem) => (
                <div
                  key={tierItem.tier}
                  className="p-4 rounded-xl bg-slate-950/95 border border-zinc-800 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-zinc-100 leading-snug">
                      {tierItem.tier}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{tierItem.verdict}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/90 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      Mínimo: {tierItem.minEmeralds} Esm.
                    </span>
                    <span className="text-zinc-500">Máx: {tierItem.maxEmeralds}</span>
                    <span className="text-amber-300 font-bold">Cura: {tierItem.curedPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter by Villager Role */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950 border border-zinc-800">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-medium px-2">
                Filtrar os 13 Aldeões:
              </span>
              {(
                [
                  'Todos',
                  'Livros & Magia',
                  'Equipamentos de Diamante',
                  'Fábrica de Esmeraldas',
                  'Comida & Utilidades',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setVillagerCategoryFilter(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    villagerCategoryFilter === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-zinc-500 pr-2">
              {filteredVillagers.length} de 13 Profissões
            </span>
          </div>

          {/* Interactive 13 Villagers Explorer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Selector List of the 13 Professions */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {filteredVillagers.map((vil) => {
                const isSelected = vil.id === activeVillager.id;
                return (
                  <button
                    key={vil.id}
                    type="button"
                    onClick={() => {
                      playSound('xp_orb');
                      setSelectedVillagerId(vil.id);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all mc-bevel-block ${
                      isSelected
                        ? 'bg-zinc-900 border-emerald-400 shadow-sm'
                        : 'bg-slate-950/90 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-semibold">{vil.roleCategory}</span>
                      <span className="font-mono text-zinc-400">{vil.workstation}</span>
                    </div>
                    <div className="text-base font-bold text-zinc-100">
                      {vil.icon} {vil.name}{' '}
                      <span className="text-xs font-mono font-normal text-zinc-400">
                        ({vil.englishName})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: Detailed Dossier of Selected Villager */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
              <div className="border-b border-zinc-800 pb-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">
                    {activeVillager.roleCategory}
                  </span>
                  <span className="font-mono text-zinc-400">{activeVillager.englishName}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                  {activeVillager.icon} {activeVillager.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                    <div className="text-zinc-400">Bloco de Profissão (Bancada):</div>
                    <div className="font-bold text-emerald-400 text-sm">
                      {activeVillager.workstation}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                    <div className="text-zinc-400">Como Fabricar o Bloco:</div>
                    <div className="font-semibold text-zinc-200">
                      {activeVillager.workstationRecipe}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emerald Generator Trade & Zombie Cure Trick */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/40 space-y-1.5">
                  <div className="font-bold text-emerald-300">
                    💎 Como Ganhar Esmeraldas Nele:
                  </div>
                  <p className="text-zinc-200 leading-relaxed">
                    {activeVillager.emeraldGeneratorTrade}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 space-y-1.5">
                  <div className="font-bold text-amber-300">
                    🍏 Truque da Cura de Zumbi (1 Esmeralda):
                  </div>
                  <p className="text-zinc-200 leading-relaxed">
                    {activeVillager.curedPriceTrick}
                  </p>
                </div>
              </div>

              {/* Best Buys List */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-zinc-200">
                  Melhores Compras para o Seu Survival (Do Nível 1 ao 5 Mestre):
                </div>
                <div className="space-y-2">
                  {activeVillager.masterBuys.map((buy, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-200 flex items-start gap-2.5"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{buy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Veteran Trading Hall Secret */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-xs text-indigo-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Segredo de Trading Hall dos Veteranos: </strong>
                  {activeVillager.veteranSecret}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: ANVIL BINARY TREE CALCULATOR */}
      {activeLabTab === 'anvil-optimizer' && (
        <div className="space-y-6">
          {/* Item Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium mr-2">
              Escolha o Equipamento para Otimizar na Bigorna:
            </span>
            {ANVIL_GEAR_PRESETS.map((gear) => {
              const isSelected = gear.id === activeGear.id;
              return (
                <button
                  key={gear.id}
                  type="button"
                  onClick={() => {
                    playSound('anvil');
                    setSelectedGearId(gear.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                      : 'bg-slate-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <span>
                    {gear.itemIcon} {gear.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Enchantment List & Prior Work Penalty Math */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-4 mc-bevel-block">
                <div className="text-xs font-semibold text-emerald-400">{activeGear.category}</div>
                <h3 className="text-xl font-bold text-zinc-100">
                  {activeGear.itemIcon} {activeGear.name}
                </h3>

                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{activeGear.naiveCostWarning}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-zinc-400">Maior Passo Individual</div>
                    <div className="text-lg font-bold text-emerald-400 tabular-nums">
                      {activeGear.maxSingleStepCost} Níveis (Limite: 39)
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-zinc-400">Fórmula da Bigorna</div>
                    <div className="text-sm font-bold text-zinc-100 tabular-nums mt-1">
                      Penalidade = 2^n - 1
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-zinc-200">
                    Livros Necessários ({activeGear.enchantments.length}):
                  </div>
                  {activeGear.enchantments.map((ench) => (
                    <div
                      key={ench.name}
                      className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-zinc-100">
                        <span>{ench.name}</span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          {ench.tradeMaxPrice}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">{ench.effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Binary Pairing Tree Steps */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-5 mc-bevel-block">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div>
                  <h4 className="text-base font-bold text-zinc-100">
                    Árvore Binária de Combinação na Bigorna (Ordem Exata)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Combine os livros em pares antes de colocá-los no equipamento para manter o contador de usos (Anvil Uses) no mínimo:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      activeGear.binaryTreeSteps
                        .map(
                          (s) =>
                            `Passo ${s.step}: [${s.leftInput}] + [${s.rightInput}] = ${s.result} (${s.stepLevelCost} Níveis)`
                        )
                        .join('\n'),
                      activeGear.id
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  {copiedRule === activeGear.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Ordem Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Árvore</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3">
                {activeGear.binaryTreeSteps.map((st) => (
                  <div
                    key={st.step}
                    onClick={() => playSound('anvil')}
                    className="p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 cursor-pointer transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 font-mono">
                        Combinação #{st.step} na Bigorna
                      </span>
                      <span className="font-mono font-bold text-lime-400 tabular-nums">
                        Custo: {st.stepLevelCost} Níveis de XP
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center text-xs font-mono pt-1">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-zinc-800 text-zinc-200 truncate">
                        Slot Esq: <strong>{st.leftInput}</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-zinc-800 text-zinc-200 truncate">
                        Slot Dir: <strong>{st.rightInput}</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold truncate">
                        = {st.result}
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-500 font-mono">{st.priorWorkPenalty}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/35 text-xs text-amber-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Alerta de Conflitos de Encantamento: </strong>
                  {activeGear.conflictWarning}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3x3 INTERACTIVE REDSTONE CRAFTING BENCH */}
      {activeLabTab === 'crafting-3x3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Recipe Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-zinc-400 mb-2">
              Selecione o Componente Técnico para Ver a Grade 3x3:
            </div>
            {REDSTONE_CRAFTING_RECIPES.map((rec) => {
              const isSelected = rec.id === activeRecipe.id;
              return (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => {
                    playSound('piston');
                    setSelectedRecipeId(rec.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all mc-bevel-block ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-400'
                      : 'bg-slate-950/90 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs text-emerald-400 font-semibold">{rec.category}</div>
                  <div className="text-base font-bold text-zinc-100 mt-0.5">{rec.name}</div>
                </button>
              );
            })}
          </div>

          {/* Right 7 Cols: Authentic 3x3 Minecraft Crafting Table Matrix */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 sm:p-8 space-y-6 mc-bevel-block">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400">
                  Matriz de Criação 3x3 (Crafting Table)
                </span>
                <h3 className="text-2xl font-bold text-zinc-100">{activeRecipe.name}</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Saída: {activeRecipe.outputCount}x Unidade
              </span>
            </div>

            {/* 3x3 Grid UI */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 grid grid-cols-3 gap-2.5 w-full max-w-[340px]">
                {activeRecipe.grid.map((cell, idx) => (
                  <div
                    key={idx}
                    onClick={() => playSound('click')}
                    className="aspect-square rounded-xl bg-slate-950 border border-zinc-700 mc-inventory-slot p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-400 transition-colors"
                  >
                    {cell ? (
                      <span className="text-xs font-semibold text-zinc-100 leading-tight">
                        {cell}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-zinc-600">Vazio</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-2xl font-bold text-emerald-400">➔</div>

              {/* Output Slot */}
              <div className="p-5 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/60 mc-inventory-slot text-center min-w-[140px]">
                <div className="text-xs text-emerald-300 font-mono mb-1">Resultado</div>
                <div className="text-sm font-bold text-white">{activeRecipe.name}</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">
                  {activeRecipe.outputCount}x
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200">
                <strong className="text-emerald-400 block mb-1">
                  Como funciona no código do jogo:
                </strong>
                {activeRecipe.veteranNote}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 text-amber-200">
                <strong className="text-amber-400 block mb-1">
                  Detalhe que todo jogador esquece:
                </strong>
                {activeRecipe.confusionWarning}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VETERAN JAVA ENGINE SECRETS */}
      {activeLabTab === 'engine-secrets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VETERAN_ENGINE_SECRETS.map((secret) => (
            <div
              key={secret.id}
              className="rounded-2xl border border-zinc-800 bg-slate-950/95 p-6 space-y-4 flex flex-col justify-between mc-bevel-block"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">{secret.tag}</span>
                  <span className="font-mono text-zinc-400">{secret.sinceVersion}</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-100">{secret.title}</h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {secret.explanation}
                </p>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
                  <strong className="text-emerald-400 block mb-1">
                    Aplicação Prática na Base:
                  </strong>
                  {secret.howToApply}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs font-mono text-amber-300">
                <span className="truncate">{secret.proCommandOrRule}</span>
                <button
                  type="button"
                  onClick={() => handleCopyText(secret.proCommandOrRule, secret.id)}
                  className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 shrink-0"
                >
                  {copiedRule === secret.id ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
