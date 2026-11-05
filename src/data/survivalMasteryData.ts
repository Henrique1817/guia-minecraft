export type SurvivalPhase = 'Início & Comida' | 'Nether & Diamante' | 'End & Zeramento' | 'Automação & Mega Farms';

export interface FarmBlueprint {
  id: string;
  name: string;
  category: 'Comida Infinita' | 'XP & Recursos' | 'Redstone & Automação';
  difficulty: 'Fácil (15 min)' | 'Médio (30 min)' | 'Avançado (1h+)';
  yieldRate: string;
  materialsList: string[];
  mechanicsExplanation: string;
  schematicUrl?: string;
  steps: {
    step: number;
    action: string;
    proTip: string;
  }[];
}

export interface SurvivalProgressionStage {
  id: string;
  stageNumber: string;
  phase: SurvivalPhase;
  title: string;
  epicSubtitle: string;
  primaryGoal: string;
  checkpoints: {
    id: string;
    task: string;
    detail: string;
    proTip: string;
    coordinatesClue?: string;
  }[];
  endgameSecret: string;
}

export const SURVIVAL_STAGES: SurvivalProgressionStage[] = [
  {
    id: 'fase-1-comida-ferro',
    stageNumber: '01',
    phase: 'Início & Comida',
    title: 'A Era do Ferro & Independência Alimentar',
    epicSubtitle: 'Nunca mais passe fome e obtenha armadura completa de ferro no dia 1.',
    primaryGoal: 'Construir a Cozinha de Galinhas 100% Automática e minerar nas camadas de ferro.',
    checkpoints: [
      {
        id: 'ck-dia1-cama',
        task: 'Obrigatoriedade da Cama antes do Anoitecer',
        detail: 'Corte 3 troncos de madeira e mate 3 ovelhas (ou tosquie com tesoura) para pular as noites e evitar que Phantoms comecem a spawnar a partir da noite 3.',
        proTip: 'Carregue sempre a cama na hotbar. Dormir reseta o contador de Phantoms para zero.',
      },
      {
        id: 'ck-galinha-infinita',
        task: 'Montagem do Forno Automático de Galinhas (Comida Infinita)',
        detail: 'Galinhas botam ovos em um funil. Um ejetor com comparador quebra os ovos sobre meio-bloco com lava suspensa. Ao crescerem, queimam e cozinham frangos infinitos sem gastar carvão.',
        proTip: 'Um funil + 1 ejetor + 1 comparador + 1 balde de lava geram mais de 80 frangos assados por hora de forma 100% passiva.',
      },
      {
        id: 'ck-mineracao-ferro',
        task: 'Escavação de Ferro na Camada Y=16 ou Cordilheiras Alpinas',
        detail: 'O ferro não fica no fundo do mundo! Ele se concentra em Y=16 no subsolo e em picos de montanhas na camada Y=120+. Faça balde d’água, escudo e armadura completa.',
        proTip: 'O Balde d’Água é o item mais poderoso do jogo: anula qualquer queda (MLG), escala paredões e apaga lava.',
      },
    ],
    endgameSecret: 'Segure sementes na mão para atrair 2 galinhas para o topo do funil. Alimente-as até ter cerca de 16 galinhas adultas botando ovos sem parar.',
  },
  {
    id: 'fase-2-vilas-diamante',
    stageNumber: '02',
    phase: 'Início & Comida',
    title: 'Império de Aldeões & Armadura de Diamante sem Minerar',
    epicSubtitle: 'Aprenda o segredo que os veteranos usam para ter armadura completa encantada em minutos.',
    primaryGoal: 'Criar trading hall com Aldeão Armeiro e Bibliotecário para Remendo (Mending).',
    checkpoints: [
      {
        id: 'ck-vila-profissoes',
        task: 'Transformação de Desempregados em Armeiros e Flecheiros',
        detail: 'Coloque um Rebolo (Grindstone) ou Alto-Forno (Blast Furnace) na frente de um aldeão. O Flecheiro compra gravetos por esmeraldas; o Armeiro vende armaduras inteiras de Diamante!',
        proTip: 'Você NÃO precisa arriscar a vida minerando na lava por diamantes se negociar com aldeões armeiros até o nível Mestre.',
      },
      {
        id: 'ck-mending-livro',
        task: 'Rolagem do Livro "Remendo" (Mending) com o Atril',
        detail: 'Coloque um Atril (Lectern) para criar um Bibliotecário. Se a primeira troca não for o livro Remendo (Mending), quebre o atril e coloque de novo até aparecer.',
        proTip: 'Mending conserta suas ferramentas e armaduras automaticamente usando as orbes de XP que você coleta.',
      },
    ],
    endgameSecret: 'Nunca quebre o atril depois de fazer a primeira compra, senão a profissão congela permanentemente.',
  },
  {
    id: 'fase-3-nether-blaze',
    stageNumber: '03',
    phase: 'Nether & Diamante',
    title: 'Incursão ao Nether: Varas de Blaze & Pérolas do End',
    epicSubtitle: 'Navegação dimensional com coordenadas divididas por 8 e preparação dos Olhos do Fim.',
    primaryGoal: 'Coletar 7 Varas de Blaze na Fortaleza e 12 a 16 Pérolas do End via Barter de Piglins.',
    checkpoints: [
      {
        id: 'ck-nether-math',
        task: 'Entendendo a Matemática de Coordenadas do Nether (1:8)',
        detail: 'Cada 1 bloco que você anda no Nether equivale a 8 blocos no mundo normal (Overworld). Anote as coordenadas exatas do portal com F3 para nunca se perder.',
        proTip: 'Sempre use pelo menos 1 peça de armadura de ouro para que os Piglins fiquem neutros e não te ataquem.',
      },
      {
        id: 'ck-fortaleza-blaze',
        task: 'Conquista da Fortaleza do Nether & Varas de Blaze',
        detail: 'Fortalezas geram em faixas ao longo do eixo Z norte-sul. Encontre um spawner de Blaze, beba Poção de Resistência ao Fogo ou use blocos para se proteger dos tiros de fogo.',
        proTip: 'Varas de Blaze viram Pó de Blaze, necessário para alimentar o suporte de poções e fabricar os Olhos do Fim.',
      },
      {
        id: 'ck-barter-piglins',
        task: 'Trocas Rápidas com Piglins (Ouro por Pérolas do End)',
        detail: 'Jogue barras de ouro no chão para um grupo de Piglins em um bioma Crimson Forest ou Bastion. Eles retribuem com Poções de Fogo, Obsidiana e Pérolas do End.',
        proTip: 'Combine Pó de Blaze + Pérola do End para fabricar o "Olho do Fim" (Eye of Ender).',
      },
    ],
    endgameSecret: 'Tenha pelo menos 14 Olhos do Fim antes de procurar o portal do End, pois alguns olhos podem quebrar durante o trajeto.',
  },
  {
    id: 'fase-4-stronghold-dragao',
    stageNumber: '04',
    phase: 'End & Zeramento',
    title: 'A Batalha do Fim: Zerando o Minecraft com Camas',
    epicSubtitle: 'A técnica oficial de Speedrunners para derrotar o Ender Dragon em 60 segundos.',
    primaryGoal: 'Localizar o Stronghold, ativar o portal e derrotar o dragão usando a explosão das camas.',
    checkpoints: [
      {
        id: 'ck-stronghold-triangulacao',
        task: 'Triangulação do Stronghold com Olho do Fim',
        detail: 'Jogue o Olho do Fim no ar e siga a direção do voo. Quando o olho for puxado em direção ao chão, cave em espiral para baixo até encontrar a biblioteca de pedra.',
        proTip: 'Coloque tochas no portal para queimar peixinhos de prata (Silverfish) e preencha os blocos vazios com os Olhos.',
      },
      {
        id: 'ck-dragao-camas',
        task: 'Técnica das Camas Explosivas no Poleiro Central',
        detail: 'No The End, camas explodem com força maior que TNT! Quando o dragão pousar na fonte central de rocha-mãe, coloque uma cama sobre a rocha com 1 bloco de obsidiana/pedra entre você e ela para absorver o dano.',
        proTip: 'Basta explodir 4 a 5 camas na cabeça do dragão enquanto ele estiver pousado para zerar a vida dele em segundos.',
      },
      {
        id: 'ck-elitra-shulker',
        task: 'Asas da Elitra & Caixas de Shulker nas Cidades do End',
        detail: 'Após matar o dragão, atire uma pérola no portal pequeno de luz (End Gateway) para viajar às ilhas distantes. Encontre uma Cidade do End com Barco para pegar a Elitra e conchas de Shulker.',
        proTip: 'Caixas de Shulker mantêm todos os itens guardados dentro mesmo quando você as quebra e guarda no inventário, dando espaço infinito na mochila.',
      },
    ],
    endgameSecret: 'Nunca tente dormir no The End ou Nether para recuperar vida: a cama explodirá instantaneamente.',
  },
  {
    id: 'fase-5-mega-automacao',
    stageNumber: '05',
    phase: 'Automação & Mega Farms',
    title: 'Engenharia Infinita: Farms de Ferro, Ouro & Raid',
    epicSubtitle: 'Transforme o jogo em uma central automatizada onde você nunca mais precisa minerar.',
    primaryGoal: 'Construir a Fábrica de Ferro com Aldeões e a Farm de XP no Teto do Nether.',
    checkpoints: [
      {
        id: 'ck-iron-farm',
        task: 'Fábrica de Ferro Automatizada (Iron Farm)',
        detail: '3 aldeões com camas e 1 zumbi com etiqueta (Name Tag) assustando-os continuamente. Os aldeões entram em pânico e invocam golens de ferro sem parar sobre água corrente que os leva até a lava.',
        proTip: 'Rende mais de 350 lingotes de ferro por hora de forma automática enquanto você cuida da sua base.',
      },
      {
        id: 'ck-raid-farm',
        task: 'Farm de Raid / Esmeraldas & Totens da Imortalidade',
        detail: 'Com o efeito de Mal Presságio (Bad Omen), ative uma invasão em uma vila isolada no oceano onde os saqueadores caem em funis com tridente elétrico.',
        proTip: 'Gera totens da imortalidade infinitos, esmeraldas infinitas, pólvora e livros encantados.',
      },
    ],
    endgameSecret: 'Coloque a Iron Farm próxima do centro de spawn original do mundo (Spawn Chunks) para que ela funcione 24 horas por dia mesmo se você viajar para longe.',
  },
];

export const MEGA_FARMS_BLUEPRINTS: FarmBlueprint[] = [
  {
    id: 'farm-frango-automatico',
    name: 'Cozinha de Frango Assado 100% Automática',
    category: 'Comida Infinita',
    difficulty: 'Fácil (15 min)',
    yieldRate: '~80 Frangos Assados e 120 Penas por Hora',
    materialsList: [
      '1 Baú Duplo',
      '2 Funis (Hoppers)',
      '1 Ejetor (Dispenser)',
      '1 Comparador de Redstone',
      '1 Repetidor de Redstone',
      '2 Pós de Redstone',
      '1 Meio-Bloco (Slab de Pedra)',
      '1 Balde de Lava',
      'Vidro e Blocos Sólidos',
      'Ovos ou 2 Galinhas',
    ],
    mechanicsExplanation:
      'Galinhas adultas ficam sobre um funil na câmara superior botando ovos. O funil alimenta um ejetor. Quando um ovo entra no ejetor, o circuito de redstone dispara automaticamente jogando o ovo contra o meio-bloco. Pintinhos nascem abaixo da lava (pois têm apenas 0.5 bloco de altura). Ao crescerem para 1 bloco, encostam na lava, morrem assados e caem no baú!',
    steps: [
      {
        step: 1,
        action: 'Coloque o baú no chão e conecte um funil apontando diretamente para as costas do baú.',
        proTip: 'Segure Shift para conectar o funil sem abrir o baú.',
      },
      {
        step: 2,
        action: 'Coloque 1 meio-bloco (slab) sobre o funil e coloque o ejetor apontando na direção do meio-bloco.',
        proTip: 'O slab garante que o pintinho tenha espaço para viver até a fase adulta.',
      },
      {
        step: 3,
        action: 'Monte o relógio de redstone atrás do ejetor: Comparador saindo do ejetor -> Repetidor -> Redstone ligando de volta na lateral do ejetor.',
        proTip: 'O circuito só liga quando um ovo entra, economizando lag e barulho.',
      },
      {
        step: 4,
        action: 'Coloque 1 balde de lava no bloco acima do meio-bloco, feche com vidros e crie a câmara com as galinhas reprodutoras no topo.',
        proTip: 'Alimente com sementes até acumular cerca de 20 galinhas adultas botando ovos.',
      },
    ],
  },
  {
    id: 'farm-ferro-compacta',
    name: 'Fábrica de Ferro Compacta (Iron Golem Farm)',
    category: 'Redstone & Automação',
    difficulty: 'Médio (30 min)',
    yieldRate: '~350 a 400 Lingotes de Ferro por Hora',
    materialsList: [
      '3 Aldeões',
      '1 Zumbi com Name Tag (Etiqueta)',
      '3 Camas',
      '1 Barco ou Caldeirão',
      '3 Portões de Carvalho ou Placas',
      '1 Balde de Lava e 1 de Água',
      '3 Funis e 1 Baú Duplo',
      'Blocos de Pedra e Vidro',
    ],
    mechanicsExplanation:
      'Três aldeões com camas ficam em linha de visão de um zumbi preso em um barco. Pelo código do Minecraft, quando 3 aldeões entram em pânico e dormem por pelo menos 1 fração de segundo, o jogo cria um Golem de Ferro no teto para defendê-los. A água empurra o Golem para um fosso com lava a 3 blocos de altura, queimando a cabeça dele sem queimar o ferro.',
    steps: [
      {
        step: 1,
        action: 'Construa uma plataforma a pelo menos 10 blocos de altura do solo para evitar que o golem nasça na grama.',
        proTip: 'Construir no ar isola a farm de cavernas próximas.',
      },
      {
        step: 2,
        action: 'Crie uma cápsula para os 3 aldeões com 3 camas e coloque o zumbi em um barco logo à frente com linha de visão.',
        proTip: 'Use uma Etiqueta (Name Tag) no zumbi para que ele NUNCA suma (despawn).',
      },
      {
        step: 3,
        action: 'Faça o teto de spawn de 5x5 blocos com paredes de vidro de 2 blocos de altura e correnteza de água.',
        proTip: 'A água deve levar o golem direto para a borda do fosso de descarte.',
      },
      {
        step: 4,
        action: 'No fosso de queda, coloque placas na parede e despeje 1 balde de lava suspenso sobre funis conectados ao baú.',
        proTip: 'O golem tem 3 blocos de altura; a lava a 2 blocos de altura atinge apenas o peito dele.',
      },
    ],
  },
  {
    id: 'farm-ouro-xp-nether',
    name: 'Fábrica de XP & Ouro Infinito no Teto do Nether',
    category: 'XP & Recursos',
    difficulty: 'Avançado (1h+)',
    yieldRate: 'Nível 0 ao 30 em 45 Segundos + Pepitas e Barras Infinitas',
    materialsList: [
      '2 Pérolas do End (para subir no teto de rocha-mãe Y=128)',
      'Escadas de Mão',
      '128 Magma Blocks ou Blocos Sólidos',
      '1 Ovo de Tartaruga (ou atração com arco)',
      'Funnels e Baús',
      'Alçapões (Trapdoors)',
      'Espada com Saque III (Looting III)',
    ],
    mechanicsExplanation:
      'No teto do Nether (acima da rocha-mãe na camada Y=128), não existem terrenos ou cavernas ao redor. Isso força 100% dos monstros do Nether a spawnarem exclusivamente na sua plataforma! Zombified Piglins são atraídos para um fosso central onde você os mata com 1 golpe de espada para farmar centenas de níveis de experiência.',
    steps: [
      {
        step: 1,
        action: 'Localize com F3 um bloco de rocha-mãe na camada Y=127 no teto do Nether. Coloque escadas até o topo e jogue a pérola do End mirando na quina superior para atravessar a rocha.',
        proTip: 'Leve materiais para construir um novo portal no teto para descer em segurança.',
      },
      {
        step: 2,
        action: 'Construa uma torre de 24 blocos de altura acima do teto para criar a câmara de queda onde os Piglins chegam com meio coração.',
        proTip: 'Ao caírem de 23 blocos de altura, qualquer tapinha com a mão ou espada fraca mata-os na hora.',
      },
      {
        step: 3,
        action: 'Faça anéis concêntricos de plataformas de spawn e posicione alçapões abertos nas bordas do fosso.',
        proTip: 'Piglins acreditam que alçapões abertos são blocos sólidos e caminham direto para a queda.',
      },
      {
        step: 4,
        action: 'Atire uma flecha em um Piglin para deixá-lo furioso: todos os Piglins do raio de 40 blocos correrão furiosos em direção ao centro!',
        proTip: 'Com Saque III na espada, você enche baús duplos de ouro e conserta qualquer armadura com Mending em 30 segundos.',
      },
    ],
  },
  {
    id: 'farm-vacas-entity-cramming',
    name: 'Micro-Breeder de Vacas por Sufocamento (Entity Cramming)',
    category: 'Comida Infinita',
    difficulty: 'Fácil (15 min)',
    yieldRate: 'Bifes e Couro Infinitos em 1 Único Bloco (100% Manual/Semi-Auto)',
    materialsList: [
      '1 Baú',
      '1 Funil apontado para o baú',
      '1 Cerca de Madeira ou Parede de Pedra',
      '1 Balde com Água',
      '1 Alçapão (Trapdoor)',
      'Trigo para reprodução',
      '2 Vacas iniciais',
    ],
    mechanicsExplanation:
      'Utiliza a regra nativa da Java Edition "maxEntityCramming = 24": quando mais de 24 criaturas adultas ocupam o mesmo bloco exato (1x1), o jogo sufoca automaticamente a vaca mais velha. Ao alimentar as vacas no topo com trigo, um bezerro nasce, a contagem ultrapassa 24 e uma vaca adulta morre instantaneamente, enviando o bife cru e o couro para o baú sem você precisar golpear nenhuma!',
    steps: [
      {
        step: 1,
        action: 'Coloque o baú no chão e conecte um funil mirando nas costas do baú.',
        proTip: 'Abaixe-se com Shift para conectar o funil sem abrir o baú.',
      },
      {
        step: 2,
        action: 'Suba paredes de 2 blocos de altura ao redor do funil criando um poço vertical de 1x1 e coloque 1 cerca acima do funil.',
        proTip: 'A cerca impede que os filhotes afundem no funil e permite que as vacas flutuem na água.',
      },
      {
        step: 3,
        action: 'Despeje 1 balde de água dentro do poço 1x1 e atraia 2 vacas com trigo usando um cercado temporário.',
        proTip: 'Com a água, as vacas ficam pulando no bloco, permitindo que você as alimente com trigo facilmente de cima.',
      },
      {
        step: 4,
        action: 'Alimente as vacas diariamente até a contagem bater 24. A partir da 25ª vaca, cada bezerro nascido causa a morte imediata de um adulto.',
        proTip: 'Gera couro para estantes de encantamento e os melhores bifes para máxima saturação de fome.',
      },
    ],
  },
  {
    id: 'farm-batatas-nano-bonemeal',
    name: 'Micro-Lavoura Automática de Batatas (Nano Farm 0-Tick)',
    category: 'Comida Infinita',
    difficulty: 'Fácil (15 min)',
    yieldRate: '~1.800 Batatas ou Cenouras por Hora com Farinha de Osso (Bonemeal)',
    materialsList: [
      '3 Ejetores (Dispensers)',
      '1 Bloco de Terra Arada com Enxada',
      '1 Balde d’Água escondido na lateral',
      '1 Alavanca',
      '1 Comparador de Redstone (Modo Subtração)',
      'Pó de Redstone',
      'Batatas para plantar',
      'Farinha de Osso (Bonemeal)',
    ],
    mechanicsExplanation:
      'Três ejetores virados para o mesmo bloco de terra arada cospem farinha de osso de forma contínua em alta velocidade ativados por um relógio de comparador. Você segura o botão direito mirando na terra com a batata na mão: o jogo planta, a batata cresce instantaneamente em 0.2 segundos, você a colhe com a mão esquerda ou quebra na hora e uma nova batata é plantada sem sair do lugar!',
    steps: [
      {
        step: 1,
        action: 'Are 1 bloco de terra central e coloque 1 fonte de água atrás ou na diagonal para manter a terra permanentemente fértil.',
        proTip: 'Cubra a água com meio-bloco ou carpete para não cair dentro.',
      },
      {
        step: 2,
        action: 'Posicione os 3 ejetores cercando a terra arada pela esquerda, direita e atrás, todos apontando para a planta central.',
        proTip: 'Encha os 3 ejetores com farinha de osso (conseguida na farm de esqueletos ou composteira).',
      },
      {
        step: 3,
        action: 'Ligue um relógio de comparador: Alavanca -> Comparador (com luz acesa) -> Redstone contornando a lateral de volta no comparador.',
        proTip: 'O relógio de comparador emite pulsos de 10 Hz por segundo (ultra rápido).',
      },
      {
        step: 4,
        action: 'Ligue a alavanca, olhe para a terra arada segurando o clique direito com a batata na mão: colha um inventário inteiro em 2 minutos!',
        proTip: 'Funciona identicamente com cenouras, beterrabas e sementes de trigo.',
      },
    ],
  },
  {
    id: 'farm-cana-bambu-observer',
    name: 'Fábrica Automática de Cana-de-Açúcar & Papel com Observer',
    category: 'Redstone & Automação',
    difficulty: 'Fácil (15 min)',
    yieldRate: 'Papel Infinito para Trocas com Aldeões e Foguetes de Elitra',
    materialsList: [
      '1 Observador (Observer)',
      '1 Pistão Comum (Piston)',
      '1 Areia ou Terra com Água adjacente',
      '1 Muda de Cana-de-Açúcar ou Bambu',
      '1 Funil e 1 Baú',
      'Redstone e Blocos de Construção',
    ],
    mechanicsExplanation:
      'O observador monitora o 3º bloco de altura da cana. Quando a cana cresce para 3 blocos, o observador emite um pulso de redstone que aciona o pistão no 2º bloco, quebrando os dois blocos superiores enquanto preserva a raiz intacta para continuar crescendo eternamente.',
    steps: [
      {
        step: 1,
        action: 'Coloque uma linha de água com areia/terra ao lado e plante as canas-de-açúcar.',
        proTip: 'Areia ou terra têm exatamente a mesma velocidade de crescimento no código do jogo.',
      },
      {
        step: 2,
        action: 'Atrás da cana, no 2º bloco de altura, coloque um pistão normal apontando para a cana.',
        proTip: 'Nunca use pistão grudento, apenas o pistão comum cinza.',
      },
      {
        step: 3,
        action: 'Acima do pistão (no 3º bloco), coloque o Observador com o rostinho virado para a cana e a luz vermelha para trás.',
        proTip: 'Coloque um bloco sólido atrás do pistão com 1 pó de redstone conectando na luz do observador.',
      },
      {
        step: 4,
        action: 'Feche a frente com vidros e use correnteza de água direcionando as canas quebradas para um funil com baú.',
        proTip: 'Expanda em módulos de 8 blocos para encher baús de papel e fabricar foguetes ilimitados para voar de Elitra.',
      },
    ],
  },
  {
    id: 'farm-enderman-xp-level30',
    name: 'Fábrica de XP Supremo com Endermite no The End (Enderman Farm)',
    category: 'XP & Recursos',
    difficulty: 'Médio (30 min)',
    yieldRate: 'Nível 0 ao 30 em 12 Segundos Cravados + Pérolas Infinitas',
    materialsList: [
      'Pérolas do End (para spawnar o Endermite)',
      '1 Carrinho de Mina (Minecart) e Trilhos',
      '1 Name Tag (Etiqueta com nome)',
      'Alçapões (Trapdoors)',
      'Funis e Baús',
      'Lajes de Pedra (Slabs)',
    ],
    mechanicsExplanation:
      'Endermen têm ódio mortal de Endermites gerados por pérolas atiradas pelo jogador. Ao posicionar um Endermite preso em um carrinho de mina no topo de um poço de queda de 42 blocos de profundidade, centenas de Endermen se atiram no buraco hipnotizados. Ao caírem, chegam com meio coração de vida no fundo e morrem com 1 único tapa da sua mão!',
    steps: [
      {
        step: 1,
        action: 'No The End, construa uma ponte de 128 blocos para fora da ilha principal sobre o vazio para zerar o spawn da ilha.',
        proTip: 'Construir no vazio garante que 100% dos Endermen nasçam apenas na sua plataforma.',
      },
      {
        step: 2,
        action: 'Construa um tubo vertical de queda de 42 blocos de altura com alçapões abertos nas bordas superiores.',
        proTip: 'A queda de 42 blocos deixa o Enderman com exatamente 1 ponto de vida (meio coração).',
      },
      {
        step: 3,
        action: 'Jogue pérolas do End contra a parede até nascer um Endermite. Use a etiqueta nele rápido e empurre-o para dentro de um carrinho de mina central.',
        proTip: 'Beba Poção de Cura ou coma maçã dourada enquanto joga as pérolas para não morrer.',
      },
      {
        step: 4,
        action: 'No pé do tubo, coloque meio-blocos sobre funis na altura dos tornozelos: os Endermen não conseguem te atacar e você mata dezenas por segundo.',
        proTip: 'A farm mais rápida de todo o jogo: conserta qualquer ferramenta com Remendo (Mending) em 5 segundos.',
      },
    ],
  },
  {
    id: 'farm-aldeao-colheita-automatica',
    name: 'Lavoura 100% Automática com Aldeão Fazendeiro',
    category: 'Comida Infinita',
    difficulty: 'Médio (30 min)',
    yieldRate: '~1.200 a 1.500 Itens/hora (Cenouras, Batatas ou Trigo) 100% no Baú',
    materialsList: [
      '1 Aldeão sem profissão (virará Fazendeiro)',
      '1 Composteira (Composter)',
      '1 Cama',
      '1 Carrinho com Funil (Minecart with Hopper)',
      'Trilhos e Trilhos Elétricos com Tocha de Redstone',
      '1 Bloco de Luz (Lanterna do Mar, Glowstone ou Tocha suspensa)',
      '1 Balde d’Água central para irrigar 9x9 blocos de terra arada',
      '8 Packs de Sementes de Trigo (para o truque de inventário cheio)',
      'Funil e Baú Duplo de Saída',
    ],
    mechanicsExplanation:
      'Aldeões fazendeiros têm uma rotina programada: eles colhem qualquer plantação madura e replantam imediatamente. Porém, o inventário deles tem apenas 8 slots. Se você jogar 8 packs de sementes para ele, o inventário dele lota! Quando ele colhe trigo, cenoura ou batata, a comida não cabe no inventário dele e cai no chão. Um Carrinho com Funil correndo sob a terra arada suga os itens através do bloco e joga nos baús!',
    steps: [
      {
        step: 1,
        action: 'Prepare um campo de cultivo quadrado de 9x9 arado com 1 bloco de água no centro. Coloque a Composteira em cima da água com 1 bloco de luz sobre ela.',
        proTip: '1 único bloco de água no centro irriga até 4 blocos de distância em todas as direções (área total 9x9 = 80 plantações).',
      },
      {
        step: 2,
        action: 'Embaixo da terra arada (1 camada abaixo), monte um circuito fechado de trilhos elétricos com 1 Carrinho com Funil rodando em looping contínuo.',
        proTip: 'O carrinho com funil consegue puxar itens que estão sobre o bloco sólido de terra arada instantaneamente.',
      },
      {
        step: 3,
        action: 'Conecte um funil na borda do circuito de trilhos apontando para um baú duplo de armazenamento.',
        proTip: 'Adicione um descarregador automático para parar o carrinho por 1 segundo enquanto ele descarrega no funil.',
      },
      {
        step: 4,
        action: 'Antes de colocar o aldeão na lavoura, jogue 8 packs completos de sementes de trigo nos pés dele até ele não conseguir pegar mais nada.',
        proTip: 'Com o inventário lotado de sementes, ele NUNCA comerá nem guardará as colheitas: 100% da comida cai direto para o seu baú!',
      },
    ],
  },
  {
    id: 'sistema-allay-organizacao-baus',
    name: 'Robozinhos de Baú: Allays & Triagem Automática de Itens',
    category: 'Redstone & Automação',
    difficulty: 'Fácil (15 min)',
    yieldRate: 'Organização Automática de Itens em Baús sem Nenhum Mod',
    materialsList: [
      '1 ou mais Allays (encontrados em Jaulas de Postos Pillager ou Mansões)',
      '1 Bloco de Nota Musical (Noteblock) por Allay',
      '1 Repetidor de Redstone (relógio de pulso constante)',
      '1 Funil conectado a um Baú',
      '1 Item de amostra (o item que você quer que o robozinho recolha)',
      'Laço (Lead) para transporte inicial',
    ],
    mechanicsExplanation:
      'Allays são as criaturas "robôs" oficiais da Java Edition: ao entregar 1 item para o Allay segurar com o botão direito, ele buscará itens idênticos caídos no chão em um raio de 32 blocos e os trará para você. Ao tocar um Bloco de Nota Musical (Noteblock), o Allay adota esse bloco como base por 30 segundos e joga todos os itens recolhidos diretamente em cima dele! Colocando um funil ao redor do Noteblock, o Allay guarda tudo no baú sozinho.',
    steps: [
      {
        step: 1,
        action: 'Resgate Allays nas jaulas de madeira de Postos de Saqueadores (Pillager Outposts) ou nas prisões de Mansões da Floresta. Prenda-os com um Laço para levar à sua base.',
        proTip: 'Se você reproduzir 2 Allays usando 1 Pedaço de Ametista enquanto toca uma Jukebox (Toca-discos), eles dançam e duplicam!',
      },
      {
        step: 2,
        action: 'Na sua sala de baús ou fazenda, posicione 1 Bloco de Nota Musical (Noteblock) com 4 funis ao redor conectados a baús.',
        proTip: 'Coloque lã sobre o Noteblock se não quiser ouvir o som contínuo das notas.',
      },
      {
        step: 3,
        action: 'Monte um relógio simples de redstone com comparador ou repetidores para acionar o Noteblock a cada 20 a 25 segundos.',
        proTip: 'O som reativa a memória do Allay para depositar os itens recolhidos sempre no funil.',
      },
      {
        step: 4,
        action: 'Entregue o item desejado nas mãos do Allay (ex: Trigo, Minério de Ferro ou Frango).',
        proTip: 'Ele patrulhará sua fazenda ou mina sozinho, pegando tudo que estiver no chão e guardando nos seus baús organizados!',
      },
    ],
  },
  {
    id: 'guia-transporte-aldeao-cura',
    name: 'Como Ter Aldeões em Casa: Transporte em Barco, Portais e Cura de Zumbi',
    category: 'Redstone & Automação',
    difficulty: 'Fácil (15 min)',
    yieldRate: 'Vila Personalizada na Base + Descontos de 1 Esmeralda por Troca',
    materialsList: [
      '1 Barco (qualquer madeira)',
      '1 Laço (Lead) opcional para puxar o barco morro acima',
      '1 Cama e 1 Estação de Trabalho (Atril para Mending, Ferrador para Armadura)',
      'Poção Arremessável de Fraqueza (Splash Potion of Weakness)',
      '1 Maçã Dourada comum (Golden Apple)',
      'Portal do Nether (para atalhos de longas distâncias: 1 bloco no Nether = 8 no Overworld)',
    ],
    mechanicsExplanation:
      'Aldeões são fundamentais para o sobrevivência: vendem os melhores encantamentos do jogo (como Remendo / Mending), ferramentas de diamante e compram colheitas por esmeraldas. Para levá-los à sua base, você não precisa de trilhos caros: empurre um barco nos pés dele! O barco anda na terra e no gelo, e pode atravessar portais do Nether para encurtar 800 blocos para apenas 100 blocos. Outro método é curar um Zumbi Aldeão que surge à noite na sua base com poção de fraqueza + maçã dourada.',
    steps: [
      {
        step: 1,
        action: 'Método do Barco: Coloque um barco de madeira logo na frente do aldeão em uma vila e empurre-o. Ele sentará no banco da frente e você pilota no banco de trás.',
        proTip: 'Barcos sobem rampas com água corrente ou podem ser puxados com Laço morro acima.',
      },
      {
        step: 2,
        action: 'Atalho do Nether para Longas Distâncias: Reme o barco com o aldeão para dentro de um portal do Nether. No Nether, 1 bloco percorrido equivale a 8 blocos no mundo normal!',
        proTip: 'Crie uma estrada plana de pedra no teto do Nether com tochas para viajar milhares de blocos em 2 minutos sem monstros.',
      },
      {
        step: 3,
        action: 'Método da Cura (Sem precisar viajar até vilas): Capture um Zumbi Aldeão (narigudo) à noite em uma cápsula de blocos.',
        proTip: 'Atire uma Poção Arremessável de Fraqueza nele e, em seguida, dê uma Maçã Dourada com botão direito. Ele começará a tremer e após 3 minutos virará um aldeão normal!',
      },
      {
        step: 4,
        action: 'Ao chegar na sua base, quebre o barco, coloque uma cama e a bancada de trabalho que você deseja (Atril para livros de Mending, Composteira para fazendeiro).',
        proTip: 'Aldeões curados de zumbi dão super descontos permanentes: vendem Livro de Mending por apenas 1 Esmeralda!',
      },
    ],
  },
  {
    id: 'separador-itens-redstone-impulsesv',
    name: 'Separador Automático de Baús (Filtro Redstone ImpulseSV 41-1-1-1-1)',
    category: 'Redstone & Automação',
    difficulty: 'Médio (30 min)',
    yieldRate: '9.000 Itens/hora por Coluna · 100% À Prova de Transbordamento (Overflow-Proof)',
    materialsList: [
      '3 Funis (Hoppers) por coluna de item',
      '1 Comparador de Redstone por coluna',
      '1 Repetidor de Redstone por coluna',
      '1 Tocha de Redstone por coluna',
      '3 Pós de Redstone por coluna',
      '1 Bigorna (para renomear os 4 itens de bloqueio)',
      '2 a 4 Baús Duplos + Molduras (Item Frames) por coluna',
      '1 Composteira (Composter) no topo para reduzir lag de CPU',
    ],
    mechanicsExplanation:
      'O filtro ImpulseSV funciona medindo a quantidade exata de itens dentro do funil do meio usando um Comparador de Redstone. Enquanto o funil contém 41 itens no 1º slot + 4 itens renomeados nos slots 2 a 5 (total 45 itens), o comparador emite força de sinal 2. Assim que o 42º item entra no funil (total 46 itens), a carga sobe para força 3, alcança o 3º pó de redstone, aciona o repetidor e apaga a Tocha de Redstone por um instante, liberando exatamente 1 item para o baú abaixo!',
    steps: [
      {
        step: 1,
        action: 'Empilhe seus Baús Duplos e conecte os funis inferiores apontando para as costas deles. Na camada do meio (2º andar de funis), segure Shift e clique mirando na frente do Comparador para que o bico do funil aponte para trás (nunca para baixo!).',
        proTip: 'Se o funil de filtro apontar para baixo, todos os seus 41 itens de configuração escorrerão para o baú assim que a tocha apagar.',
      },
      {
        step: 2,
        action: 'Atrás do funil de filtro, monte um triângulo de 3 blocos sólidos com: 1 Comparador no topo + 3 Pós de Redstone em linha reta descendo um degrau.',
        proTip: 'Usar 3 pós de redstone é o que torna o sistema "Overflow-Proof": mesmo que um baú lote 100%, o sinal nunca invade o funil vizinho.',
      },
      {
        step: 3,
        action: 'No andar de baixo do triângulo, coloque 1 Repetidor apontando para o bloco onde está presa a Tocha de Redstone encostada no funil inferior.',
        proTip: 'Verifique se a Tocha de Redstone permanece ACESA enquanto o funil de cima está vazio.',
      },
      {
        step: 4,
        action: 'Na Bigorna, renomeie 4 gravetos ou terras para "Filtro". Coloque 1 em cada um dos 4 slots da direita do funil do meio e coloque 41 unidades do item desejado (ex: 41 Ferros) no 1º slot da esquerda.',
        proTip: 'No final do corredor de baús, adicione sempre 2 Baús Duplos de Sobra (Overflow) sem filtro para guardar espadas, poções e itens variados.',
      },
    ],
  },
  {
    id: 'superfornalha-industrial-elevador',
    name: 'Superfornalha Industrial de 8 Bocas & Elevador de Bolhas (Soul Sand)',
    category: 'Redstone & Automação',
    difficulty: 'Fácil (15 min)',
    yieldRate: 'Assa 1 Pack Inteiro (64 Minérios ou Carnes) em Apenas 80 Segundos',
    materialsList: [
      '8 Fornalhas (ou Alto-Fornos para minérios / Defumadores para carnes)',
      '24 Funis (8 em cima, 8 atrás para carvão, 8 embaixo para saída)',
      '2 Carrinhos com Funil e 2 Carrinhos com Baú',
      '16 Trilhos Elétricos e 4 Trilhos Normais + 2 Alavancas',
      '1 Areia das Almas (Soul Sand) + Algas Marinhas + Tubo de Vidro (Elevador)',
      '3 Baús Duplos (Entrada de Minério, Entrada de Combustível e Saída Pronta)',
    ],
    mechanicsExplanation:
      'Uma fornalha comum demora 10 minutos e 40 segundos para assar 64 itens. Ao alinhar 8 fornalhas abastecidas simultaneamente por um Carrinho com Baú correndo sobre funis no topo (distribuindo os minérios igualmente) e outro atrás (distribuindo carvão, blocos de alga seca ou baldes de lava), você divide o tempo por 8! Na saída, os itens prontos podem subir direto para o separador de baús da sua sala através de um Elevador de Bolhas com Areia das Almas.',
    steps: [
      {
        step: 1,
        action: 'Coloque 8 Fornalhas lado a lado. Conecte 8 funis embaixo delas apontando para o Baú de Saída, 8 funis atrás apontando para as costas das fornalhas e 8 funis em cima apontando para o topo das fornalhas.',
        proTip: 'No Minecraft: Topo da fornalha = Item para assar | Traseira/Lateral = Combustível | Baixo = Retira o item assado.',
      },
      {
        step: 2,
        action: 'Estenda trilhos elétricos sobre os 8 funis superiores (para minérios/comida crua) e sobre os 8 funis traseiros (para carvão/combustível).',
        proTip: 'Segure Shift ao colocar os trilhos sobre os funis para não abrir o inventário deles.',
      },
      {
        step: 3,
        action: 'Posicione 1 Carrinho com Baú na linha superior e 1 na linha traseira. Ao ligar a alavanca dos trilhos elétricos, os carrinhos distribuirão 1 item em cada fornalha por viagem!',
        proTip: 'Se quiser guardar o XP acumulado nas fornalhas para consertar picaretas com Mending, trave os funis de baixo com uma alavanca e retire 1 item manualmente.',
      },
      {
        step: 4,
        action: 'Para enviar tudo automaticamente para sua sala de baús no andar de cima, use um Liberador (Dropper) com relógio de comparador jogando os itens em uma coluna de água com Areia das Almas no fundo.',
        proTip: 'As bolhas da Areia das Almas empurram itens para cima na velocidade máxima até o fluxo de água do seu separador automático!',
      },
    ],
  },
];

