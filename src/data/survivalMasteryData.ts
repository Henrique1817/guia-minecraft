export type SurvivalPhase = 'Início & Comida' | 'Nether & Diamante' | 'End & Zeramento' | 'Automação & Mega Farms';

export interface FarmBlueprintStep {
  step: number;
  title: string;
  action: string;
  blockPlacementGuide?: string;
  proTip?: string;
  troubleshooting?: string;
}

export interface FarmBlueprint {
  id: string;
  name: string;
  category: 'Comida Infinita' | 'XP & Recursos' | 'Redstone & Automação';
  difficulty: 'Fácil (15 min)' | 'Médio (30 min)' | 'Avançado (1h+)';
  yieldRate: string;
  materialsList: string[];
  mechanicsExplanation: string;
  schematicUrl?: string;
  steps: FarmBlueprintStep[];
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
      '1 Baú Duplo (Armazenamento final)',
      '2 Funis (1 de coleta inferior + 1 de alimentação de ovos)',
      '1 Ejetor (Dispenser com boca circular — ATENÇÃO: NÃO use Liberador/Dropper!)',
      '1 Comparador de Redstone',
      '1 Repetidor de Redstone',
      '2 Pós de Redstone',
      '1 Meio-Bloco de Pedra Liso (Stone Slab)',
      '1 Balde de Lava (Fonte constante de calor)',
      '4 a 6 Blocos de Vidro (Para inspecionar sem queimar)',
      '1 Alçapão de Carvalho ou Ferro (Topo)',
      'Sementes de Trigo para reprodução inicial',
    ],
    mechanicsExplanation:
      'Galinhas adultas ficam confinadas sobre o funil superior botando ovos. O funil transfere os ovos para um Ejetor. Um circuito inteligente de Comparador detecta a entrada do ovo e emite um pulso instantâneo, disparando o ovo contra a laje inferior. O pintinho nasce com apenas 0.5 bloco de altura e fica vivo abaixo da lava suspensa. Ao atingir a fase adulta (1 bloco de altura), encosta na lava, morre assado e seu drop de frango assado + penas é puxado pelo funil inferior direto para o baú!',
    steps: [
      {
        step: 1,
        title: 'Posicione o Baú Duplo e o Funil Inferior de Coleta',
        action: 'Coloque 1 Baú Duplo no chão. Agache-se (Shift) e clique com o botão direito mirando na face traseira do baú para conectar o primeiro funil.',
        blockPlacementGuide: 'Shift + Clique na traseira do Baú. Verifique se o bico metálico do funil está apontando horizontalmente para dentro do baú e NÃO para o chão.',
        proTip: 'Deixe espaço livre em cima do baú (ou use blocos de vidro/escada invertida) para que o baú abra livremente.',
        troubleshooting: 'Se o funil apontar para baixo, os frangos assados ficarão presos no chão em vez de entrarem no baú.',
      },
      {
        step: 2,
        title: 'Instale a Laje de Pedra e o Ejetor (Dispenser)',
        action: 'Agache-se (Shift) e coloque 1 Meio-Bloco (Laje de Pedra) na face superior do funil. Logo atrás da laje, coloque 1 Ejetor virado de frente para ela.',
        blockPlacementGuide: 'A laje DEVE ficar na metade inferior do bloco (colada no funil). O ejetor deve ter a boca circular apontando diretamente para o meio-bloco.',
        proTip: 'A laje é o segredo do sistema: pintinhos medem 0.4 blocos e não tocam a lava; galinhas adultas medem 0.9 blocos e encostam na lava na hora em que crescem.',
        troubleshooting: 'CUIDADO: Se você usar um Liberador (Dropper - boca triangular/quadrada), ele cuspirá o ovo inteiro como item em vez de quebrá-lo para chocar pintinhos.',
      },
      {
        step: 3,
        title: 'Crie as Paredes de Vidro da Câmara de Abate',
        action: 'Coloque 2 blocos de vidro sobre o baú e nas laterais do meio-bloco, formando um poço 1x1 fechado em volta da laje.',
        blockPlacementGuide: 'Vidro na frente (em cima do baú), vidro na esquerda e vidro na direita. O fundo é a própria face frontal do Ejetor.',
        proTip: 'Usar vidro permite ver os pintinhos crescendo e garante que os itens dropados não vazem pelas frestas.',
      },
      {
        step: 4,
        title: 'Construa o Relógio de Redstone Automático Sem Lag',
        action: 'Atrás do Ejetor, coloque 1 Comparador de Redstone saindo dele. À frente do comparador, coloque 1 bloco sólido. À direita, coloque 1 Repetidor e ligue a fiação de redstone de volta na lateral do Ejetor.',
        blockPlacementGuide: 'Ejetor ➔ Comparador (duas tochas viradas para o ejetor) ➔ Bloco sólido ➔ Repetidor na lateral ➔ 2 Pós de Redstone conectados ao ejetor.',
        proTip: 'Este circuito fica 100% desligado e em repouso. Ele só dá pulso quando um ovo entra no Ejetor, gerando zero lag no seu servidor.',
        troubleshooting: 'Não ative a tocha dianteira do comparador (deixe no modo normal de comparação, não no modo subtração).',
      },
      {
        step: 5,
        title: 'Despeje a Lava Suspensa na Altura Correta',
        action: 'Fique na parte de cima da câmara de vidro. Mire na face superior interna do bloco de vidro (1 bloco acima da laje) e clique com o Balde de Lava.',
        blockPlacementGuide: 'A lava deve ficar flutuando exatamente a 1 bloco de distância acima da laje de pedra, contida pelos 4 lados de vidro e ejetor.',
        proTip: 'A lava nunca desce até a laje porque ocupa o bloco de ar superior inteiro, deixando o espaço de 0.5 bloco de ar livre para os filhotes respirarem.',
        troubleshooting: 'Se a lava escorrer para fora, verifique se todos os 4 lados do bloco de altura da lava estão bloqueados por vidro ou blocos sólidos.',
      },
      {
        step: 6,
        title: 'Instale o Funil de Ovos e a Gaiola das Matrizes no Topo',
        action: 'Agache-se (Shift) e coloque o 2º Funil em cima do Ejetor, apontando diretamente para dentro do Ejetor. Suba paredes de 2 blocos de vidro ao redor deste funil.',
        blockPlacementGuide: 'Shift + Clique na face superior do Ejetor. Cubra com 4 blocos de vidro ao redor do espaço 1x1 sobre o funil.',
        proTip: 'Coloque 1 Alçapão de madeira no topo da abertura para evitar que galinhas fujam pulando.',
      },
      {
        step: 7,
        title: 'Introduza as Galinhas e Inicie o Ciclo de Produção',
        action: 'Jogue cerca de 24 a 32 ovos dentro da câmara superior até nascerem as primeiras galinhas, ou atraia 2 galinhas com sementes usando uma escada de terra temporária.',
        blockPlacementGuide: 'Alimente as galinhas de cima com sementes de trigo, melancia ou beterraba até atingir de 15 a 20 galinhas matrizes.',
        proTip: 'Cada galinha bota um ovo a cada 5 a 10 minutos. Com 20 galinhas, a cada 20 segundos um ovo é ejetado automaticamente na câmara de lava!',
        troubleshooting: 'Não ultrapasse 24 galinhas adultas na câmara superior se a regra "maxEntityCramming" estiver em 24, para evitar que elas sufoquem antes de botar ovos.',
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
      '1 Baú Duplo (Para armazenar bifes e couro)',
      '1 Funil (Hopper)',
      '1 Cerca de Madeira ou Parede de Pedra (Bloqueador de colisão)',
      '1 Balde com Água (Para fazer as vacas flutuarem)',
      '1 Alçapão (Trapdoor) ou Portão',
      'Blocos sólidos de Pedra ou Vidro (8 unidades)',
      '1 Escada de Mão (Para subir e alimentar)',
      'Trigo cultivado (2 packs)',
      '2 Vacas iniciais',
    ],
    mechanicsExplanation:
      'Utiliza a regra nativa do Java Edition "maxEntityCramming = 24": quando mais de 24 criaturas adultas ocupam o mesmo bloco exato (1x1), o jogo sufoca automaticamente a vaca mais velha. Ao alimentar as vacas no topo com trigo, um bezerro nasce, a contagem ultrapassa 24 e uma vaca adulta morre instantaneamente, enviando o bife cru e o couro para o baú sem você precisar golpear nenhuma!',
    steps: [
      {
        step: 1,
        title: 'Instale o Baú e o Funil de Coleta Subterrâneo',
        action: 'Cave um buraco de 2 blocos de profundidade. Coloque 1 Baú no chão e conecte 1 Funil mirando nas costas do baú.',
        blockPlacementGuide: 'Shift + Clique na face traseira do baú. O bico do funil deve apontar para o baú.',
        proTip: 'Coloque o baú em um nível onde você consiga abrir pela lateral sem precisar quebrar blocos.',
      },
      {
        step: 2,
        title: 'Posicione a Cerca de Madeira sobre o Funil',
        action: 'Agache-se (Shift) e coloque 1 Cerca de Madeira (ou Parede de Pedra) diretamente em cima do funil.',
        blockPlacementGuide: 'A cerca fica no espaço imediatamente acima do funil. Ela tem uma caixa de colisão de 1.5 blocos de altura.',
        proTip: 'Essa cerca impede que os filhotes fiquem presos dentro do cone do funil e mantém as vacas perfeitamente suspensas na água.',
      },
      {
        step: 3,
        title: 'Suba o Tubo de Contenção 1x1 com Blocos Sólidos ou Vidro',
        action: 'Crie uma torre oca de 1x1 ao redor da cerca, subindo as paredes em 2 blocos de altura acima do solo.',
        blockPlacementGuide: '4 pilares de 2 blocos de altura ao redor do bloco central. Deixe a face frontal com vidro para poder ver o interior.',
        proTip: 'Vidro é excelente porque permite que o jogador clique nas vacas com trigo através de ângulos inclinados.',
      },
      {
        step: 4,
        title: 'Despeje a Água no Bloco de Cima',
        action: 'Suba até o topo do tubo de 1x1 e despeje 1 Balde de Água dentro do espaço central.',
        blockPlacementGuide: 'A água escorre sobre a cerca de madeira. As vacas colocadas ali começarão a boiar e pular continuamente.',
        proTip: 'A água é essencial para que todas as vacas fiquem pulando. Dessa forma, você consegue alimentar qualquer vaca do monte olhando de cima!',
      },
      {
        step: 5,
        title: 'Coloque 1 Alçapão Superior para Segurança',
        action: 'Instale 1 Alçapão no topo da abertura e deixe-o fechado para evitar que você caia dentro do poço de vacas.',
        blockPlacementGuide: 'Fixado na borda superior interna do bloco de vidro ou pedra.',
        proTip: 'Coloque escadas de mão na parede externa para subir confortavelmente.',
      },
      {
        step: 6,
        title: 'Atraia as 2 Vacas Iniciais com Rampa Temporária',
        action: 'Construa uma rampa de terra de 2 blocos de largura levando até o topo do buraco. Segure trigo na mão para atrair 2 vacas de um pasto próximo e empurre-as para dentro da água.',
        blockPlacementGuide: 'Abra o alçapão, fique do outro lado da abertura e atraia as vacas até que elas escorreguem para dentro do tubo.',
        proTip: 'Assim que as 2 vacas caírem na água, feche o alçapão e desmonte a rampa de terra.',
      },
      {
        step: 7,
        title: 'Multiplique as Vacas até Bater 24 Unidades e Ativar o Entity Cramming',
        action: 'Suba a cada 5 a 10 minutos e alimente as vacas com trigo segurando o botão direito através do alçapão.',
        blockPlacementGuide: 'Quando a população atingir 24 vacas adultas, a farm entra em piloto automático.',
        proTip: 'A partir da 25ª vaca, para CADA bezerro que nascer, uma vaca adulta morre de sufocamento imediatamente, dropando couro e bife direto no baú sem você sujar as mãos!',
        troubleshooting: 'Se as vacas morrerem antes de atingir 24, você acidentalmente as golpeou com a mão ou arma. Nunca bata nelas; apenas alimente com trigo.',
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
      '1 Bloco de Terra (Dirt)',
      '1 Enxada (Hoe — qualquer material)',
      '1 Balde d’Água',
      '1 Meio-Bloco (Laje para tampar a água)',
      '1 Comparador de Redstone',
      '1 Alavanca (Liga/Desliga)',
      '5 Pós de Redstone',
      'Farinha de Osso (Bonemeal — 2 a 4 packs)',
      'Batatas ou Cenouras para plantio',
    ],
    mechanicsExplanation:
      'Três ejetores virados para o mesmo bloco de terra arada cospem farinha de osso de forma contínua em alta velocidade ativados por um relógio de comparador. Você segura o botão direito mirando na terra com a batata na mão: o jogo planta, a batata cresce instantaneamente em 0.2 segundos, você a colhe com a mão esquerda ou quebra na hora e uma nova batata é plantada sem sair do lugar!',
    steps: [
      {
        step: 1,
        title: 'Posicione a Terra Central e a Fonte de Água Irrigadora',
        action: 'Coloque 1 bloco de terra no chão. Cave 1 bloco logo atrás da terra e despeje 1 balde d’água.',
        blockPlacementGuide: 'A água fica encostada na terra. Cubra a água com 1 laje ou carpete para que você não caia dentro durante o uso.',
        proTip: 'A água garante que a terra arada nunca volte a ser terra seca, mesmo com o circuito disparando milhares de vezes.',
      },
      {
        step: 2,
        title: 'Instale os 3 Ejetores Apontados para a Terra',
        action: 'Coloque 1 Ejetor à esquerda da terra, 1 Ejetor à direita e 1 Ejetor atrás (em cima do bloco de água coberto).',
        blockPlacementGuide: 'Todos os 3 Ejetores devem ter a face frontal (boca redonda) voltada diretamente para o bloco de terra central.',
        proTip: 'Deixe o lado da frente aberto: é ali onde você ficará em pé olhando para a terra.',
        troubleshooting: 'Certifique-se de que são Ejetores (fabricados com arco) e não Liberadores.',
      },
      {
        step: 3,
        title: 'Monte o Relógio de Redstone Ultra-Rápido com Comparador',
        action: 'Atrás da estrutura, coloque 1 Comparador de Redstone com a ponta voltada para fora. Ligue o modo subtração (clique com botão direito para acender a tocha da ponta).',
        blockPlacementGuide: 'Coloque 1 Alavanca atrás do Comparador. Passe pó de redstone conectando a saída do comparador de volta na sua lateral, e estenda o sinal para cima dos 3 ejetores.',
        proTip: 'Para colocar redstone em cima dos ejetores, segure Shift e clique no topo de cada um.',
      },
      {
        step: 4,
        title: 'Abasteça os Ejetores com Farinha de Osso (Bonemeal)',
        action: 'Abra os 3 ejetores e divida os seus packs de Farinha de Osso igualmente entre eles.',
        proTip: 'Você pode conectar funis com baús duplos em cima de cada ejetor para criar uma reserva gigante de suprimento.',
      },
      {
        step: 5,
        title: 'Are a Terra com a Enxada',
        action: 'Segure a enxada e clique com botão direito na terra central para transformá-la em terra arada (Farmland).',
        blockPlacementGuide: 'A terra ficará úmida e escura imediatamente graças à água escondida atrás.',
      },
      {
        step: 6,
        title: 'Opere a Farm Segurando o Clique Direito',
        action: 'Ligue a alavanca. Os 3 ejetores começarão a estalar em altíssima velocidade. Coloque a batata na mão principal, mire na terra arada e SEGURE o botão direito do mouse.',
        blockPlacementGuide: 'A batata é plantada, consome 1 a 2 bonemeals, atinge o estágio máximo em 0.2s e você a colhe na hora.',
        proTip: 'No PC (Java), você pode segurar o botão direito, apertar F3+T e soltar o mouse para travar o clique e colher de forma 100% automática enquanto toma um café!',
      },
      {
        step: 7,
        title: 'Expansão para Cenouras, Trigo e Beterraba',
        action: 'A mesma máquina funciona com qualquer vegetal. Batatas e cenouras são as melhores porque não precisam de sementes separadas.',
        proTip: 'Batata assada na superfornalha ou cenoura dourada com pepitas de ouro viram a melhor comida de combate de todo o jogo.',
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
      '8 Mudas de Cana-de-Açúcar (ou Bambu)',
      '8 Blocos de Areia, Barro ou Terra',
      '8 Pistões Comuns (Pistons)',
      '8 Observadores (Observers)',
      '8 Pós de Redstone',
      '1 Balde d’Água',
      '1 Funil',
      '1 Baú Duplo',
      'Blocos de Vidro para fechar a frente',
    ],
    mechanicsExplanation:
      'O observador monitora o 3º bloco de altura da cana. Quando a cana cresce para 3 blocos, o observador emite um pulso de redstone que aciona o pistão no 2º bloco, quebrando os dois blocos superiores enquanto preserva a raiz intacta para continuar crescendo eternamente.',
    steps: [
      {
        step: 1,
        title: 'Cave a Valeta de Água e Posicione o Baú de Saída',
        action: 'Cave uma trincheira em linha reta de 8 blocos de comprimento e 1 bloco de profundidade. No final da valeta, coloque 1 Baú com 1 Funil conectado a ele.',
        blockPlacementGuide: 'Despeje 1 balde de água no início da valeta. O fluxo de água escorrerá exatamente 8 blocos e parará na boca do funil.',
        proTip: 'A água serve tanto para irrigar a cana quanto para transportar as canas colhidas até o baú sem gastar trilhos.',
      },
      {
        step: 2,
        title: 'Plante as Canas-de-Açúcar na Borda da Água',
        action: 'Coloque 8 blocos de terra ou areia paralelos à água e plante 1 cana-de-açúcar em cada bloco.',
        blockPlacementGuide: 'Cada muda de cana precisa ter água diretamente adjacente a ela.',
        proTip: 'Areia ou terra têm exatamente a mesma velocidade de crescimento no código do Java Edition.',
      },
      {
        step: 3,
        title: 'Instale os Pistões no 2º Bloco de Altura',
        action: 'Coloque uma fileira de 8 blocos sólidos atrás da cana. Em cima desses blocos (na altura de 2 blocos do chão), coloque os 8 Pistões virados para a cana.',
        blockPlacementGuide: 'A face de madeira do pistão deve apontar para a cana. Nunca coloque pistão no chão, senão ele quebrará a raiz da cana!',
        troubleshooting: 'Use pistão COMUM (cinza). Pistão grudento puxará a cana em vez de quebrá-la.',
      },
      {
        step: 4,
        title: 'Posicione os Observadores no 3º Bloco de Altura',
        action: 'Suba nos pistões e coloque os 8 Observadores virados para a frente.',
        blockPlacementGuide: 'O rosto do Observador (com olhos e boca) DEVE ficar virado para a cana. O ponto vermelho (saída de sinal) fica virado para trás.',
        proTip: 'O observador só dispara quando a cana atinge o 3º bloco de altura.',
      },
      {
        step: 5,
        title: 'Conecte a Fiação Traseira de Redstone',
        action: 'Atrás dos pistões, na altura dos blocos sólidos, coloque uma linha reta de 8 pós de redstone.',
        blockPlacementGuide: 'O ponto vermelho do observador energiza o bloco abaixo dele, que ativa o pó de redstone e dispara o pistão instantaneamente.',
        proTip: 'Cada módulo de 1 cana funciona de forma independente: quando uma cana atinge 3 blocos, apenas o pistão correspondente empurra.',
      },
      {
        step: 6,
        title: 'Feche a Frente com Paredes de Vidro',
        action: 'Suba uma parede de vidro de 3 blocos de altura na frente e nas laterais da valeta d’água.',
        blockPlacementGuide: 'O vidro impede que a cana quicando caia fora da água.',
        proTip: 'Com 16 ou 24 módulos em linha, você enche baús duplos de papel para trocar com aldeões cartógrafos e bibliotecários por centenas de esmeraldas!',
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
      'Trilhos Normais e Trilhos Elétricos com Tochas de Redstone',
      '1 Bloco de Luz (Lanterna do Mar, Shroomlight ou Glowstone)',
      '1 Balde d’Água central',
      '8 Packs de Sementes de Trigo (Segredo do inventário cheio)',
      'Funil e Baú Duplo de Saída',
      'Enxada para arar 80 blocos',
    ],
    mechanicsExplanation:
      'Aldeões fazendeiros têm uma rotina programada: eles colhem qualquer plantação madura e replantam imediatamente. Porém, o inventário deles tem apenas 8 slots. Se você jogar 8 packs de sementes para ele, o inventário dele lota! Quando ele colhe trigo, cenoura ou batata, a comida não cabe no inventário dele e cai no chão. Um Carrinho com Funil correndo sob a terra arada suga os itens através do bloco e joga nos baús!',
    steps: [
      {
        step: 1,
        title: 'Demarque a Área de Cultivo 9x9 com Água Central',
        action: 'Limpe uma área plana de 9x9 blocos. No centro exato (bloco 5x5), cave 1 buraco e despeje 1 balde d’água.',
        blockPlacementGuide: '1 único bloco de água no centro hidrata uma área quadrada perfeita de 4 blocos para norte, sul, leste e oeste (total 80 plantações + 1 água central).',
        proTip: 'Cercar a borda externa de 9x9 com blocos de pedra ou vidro impede que o aldeão saia do campo.',
      },
      {
        step: 2,
        title: 'Instale a Composteira e a Iluminação Central',
        action: 'Coloque 1 Composteira diretamente em cima do bloco de água central. Em cima da composteira, coloque 1 bloco de luz (Glowstone ou Lanterna do Mar).',
        blockPlacementGuide: 'A composteira vira o bloco de profissão do aldeão. O bloco de luz em cima impede que mobs hostis spawnam no meio da horta à noite.',
      },
      {
        step: 3,
        title: 'Escave o Nível Inferior e Monte o Circuito de Trilhos',
        action: 'Cave 1 camada inteira de blocos debaixo de toda a terra arada. Monte um circuito contínuo de trilhos em serpentina cobrindo todos os 9x9 blocos.',
        blockPlacementGuide: 'Intercale 1 trilho elétrico a cada 6 trilhos comuns, ativando-os com tochas de redstone presas na parede ou chão.',
        proTip: 'O Carrinho com Funil (Minecart with Hopper) consegue puxar itens através de 1 bloco sólido inteiro de terra arada!',
      },
      {
        step: 4,
        title: 'Instale o Ponto de Descarregamento no Baú',
        action: 'Em uma das pontas do circuito de trilhos, coloque 1 Funil apontado para um Baú Duplo e passe o trilho por cima do funil.',
        blockPlacementGuide: 'Sempre que o carrinho passar sobre o funil, descarregará os itens coletados.',
        proTip: 'Se quiser descarregamento rápido, coloque 2 funis em sequência no trajeto do carrinho.',
      },
      {
        step: 5,
        title: 'Cubra com Terra e Are os 80 Blocos com a Enxada',
        action: 'Recoloque a terra sobre os trilhos e use a enxada para arar todos os 80 blocos do quadrado 9x9.',
        blockPlacementGuide: 'Todos os blocos ficarão escuros e hidratados pela água central.',
      },
      {
        step: 6,
        title: 'O Truque Vital dos 8 Packs de Sementes',
        action: 'ANTES de introduzir o aldeão na plantação, certifique-se de que ele não pegou cenoura ou batata. Jogue 8 packs completos de sementes de trigo no chão aos pés dele até ele parar de pegar.',
        blockPlacementGuide: 'O inventário do aldeão tem exatamente 8 slots. Ao preencher todos com sementes, ele NUNCA conseguirá guardar cenouras ou batatas!',
        proTip: 'Este é o passo que 90% dos tutoriais esquecem de explicar: sem isso, o aldeão guarda as colheitas no bolso e a farm não produz nada.',
      },
      {
        step: 7,
        title: 'Coloque o Aldeão e 1 Cama na Borda da Lavoura',
        action: 'Traga o aldeão com um barco, coloque 1 cama na borda da horta e feche o teto com vidro.',
        blockPlacementGuide: 'O aldeão dormirá na cama e trabalhará na composteira todos os dias das 8h às 15h.',
        troubleshooting: 'Certifique-se de que não haja outra vila ou camas livres por perto para ele não se vincular à estação errada.',
      },
      {
        step: 8,
        title: 'Plantio Inicial e Ativação do Carrinho com Funil',
        action: 'Plante as 80 mudas iniciais de cenoura ou batata. Empurre o Carrinho com Funil nos trilhos e feche a entrada.',
        proTip: 'O aldeão colhe a batata madura, tenta pegar no inventário, falha porque está lotado de sementes, replanta imediatamente e o carrinho suga a batata caída para o baú!',
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
      '1 Repetidor de Redstone',
      '1 Funil conectado a um Baú',
      '1 Item de amostra para o Allay segurar',
      'Laço (Lead) para transporte',
      '1 Pedaço de Ametista + Toca-discos (Para duplicar Allays)',
    ],
    mechanicsExplanation:
      'Allays são as criaturas "robôs" oficiais da Java Edition: ao entregar 1 item para o Allay segurar com o botão direito, ele buscará itens idênticos caídos no chão em um raio de 32 blocos e os trará para você. Ao tocar um Bloco de Nota Musical (Noteblock), o Allay adota esse bloco como base por 30 segundos e joga todos os itens recolhidos diretamente em cima dele! Colocando um funil ao redor do Noteblock, o Allay guarda tudo no baú sozinho.',
    steps: [
      {
        step: 1,
        title: 'Resgate os Allays e Duplique com Ametista',
        action: 'Encontre Allays nas jaulas de Postos de Saqueadores (Pillager Outposts) ou prisões de Mansões da Floresta. Amarre com um Laço (Lead) e leve à sua base.',
        blockPlacementGuide: 'Para duplicar: coloque um Disco de Música em uma Jukebox. Quando o Allay começar a dançar, dê 1 Pedaço de Ametista para ele: ele se divide em 2 Allays instantaneamente!',
        proTip: 'Você pode ter um exército de 10 Allays em poucos minutos apenas duplicando com ametistas.',
      },
      {
        step: 2,
        title: 'Monte a Base de Depósito com Baú e Funil',
        action: 'Coloque 1 Baú Duplo no chão da sua sala de estocagem. Conecte 1 Funil apontado para o topo ou traseira do baú.',
        blockPlacementGuide: 'Shift + Clique para conectar o funil ao baú.',
      },
      {
        step: 3,
        title: 'Instale o Bloco de Nota Musical (Noteblock)',
        action: 'Coloque 1 Bloco de Nota Musical (Noteblock) diretamente em cima do funil de coleta.',
        blockPlacementGuide: 'Coloque 1 pedaço de Lã sobre o Noteblock se quiser abafar o som para não ficar tocando alto na sua sala.',
        proTip: 'O Allay joga os itens exatamente no bloco acima do Noteblock, de onde eles caem direto no funil.',
      },
      {
        step: 4,
        title: 'Crie o Relógio de Redstone de 20 Segundos',
        action: 'Faça um relógio simples de redstone conectando 4 Repetidores no nível 4 (ou 1 sensor de luz solar) disparando o Noteblock periodicamente.',
        blockPlacementGuide: 'O Noteblock precisa tocar pelo menos uma vez a cada 30 segundos para manter o Allay sintonizado nele.',
        troubleshooting: 'Se o Noteblock parar de tocar, o Allay esquecerá o bloco e entregará os itens diretamente na sua mão.',
      },
      {
        step: 5,
        title: 'Entregue o Item-Filtro na Mão do Allay',
        action: 'Fique na frente do Allay segurando o item que você deseja filtrar (ex: Diamante, Ferro, Trigo ou Frango) e clique com botão direito.',
        blockPlacementGuide: 'O Allay segurará o item com as duas mãos e começará a voar procurando mais itens idênticos no raio de 32 blocos.',
        proTip: 'Para trocar o item, basta clicar nele de mãos vazias.',
      },
      {
        step: 6,
        title: 'Isole a Sala com Vidros para Segurança',
        action: 'Construa paredes de vidro ao redor da área de coleta para que o Allay não voe para longe ou se perca em cavernas.',
        proTip: 'Allays não sofrem dano do jogador que os domesticou e regeneram 2 pontos de vida por segundo sozinhos.',
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
      '1 Laço (Lead)',
      '1 Cama',
      '1 Bancada de Trabalho (Atril para Mending, Ferrador para Armadura)',
      '1 Poção Arremessável de Fraqueza (Splash Potion of Weakness)',
      '1 Maçã Dourada comum (Golden Apple)',
      '1 Balde d’Água (para subir morros com barco)',
      'Etiqueta (Name Tag) opcional',
    ],
    mechanicsExplanation:
      'Aldeões são fundamentais para o sobrevivência: vendem os melhores encantamentos do jogo (como Remendo / Mending), ferramentas de diamante e compram colheitas por esmeraldas. Para levá-los à sua base, você não precisa de trilhos caros: empurre um barco nos pés dele! O barco anda na terra e no gelo, e pode atravessar portais do Nether para encurtar 800 blocos para apenas 100 blocos. Outro método é curar um Zumbi Aldeão que surge à noite na sua base com poção de fraqueza + maçã dourada.',
    steps: [
      {
        step: 1,
        title: 'O Truque do Barco: Como Prender o Aldeão Sem Trilhos',
        action: 'Em uma vila, coloque 1 barco no chão bem próximo aos pés do aldeão. Empurre o barco contra ele: ele sentará automaticamente no banco dianteiro.',
        blockPlacementGuide: 'Você pode subir no banco traseiro do barco e pilotar normalmente na terra, na grama e na água.',
        proTip: 'Enquanto estiver no barco, o aldeão NUNCA dormirá, NUNCA fugirá e estará 100% protegido de ataques de zumbis nas costas.',
      },
      {
        step: 2,
        title: 'Como Subir Morros e Escadas com o Barco',
        action: 'No Java Edition, barcos não sobem blocos de 1 altura sozinhos. Use um Laço (Lead) preso ao barco para puxá-lo morro acima, ou use um Balde d’Água para criar uma correnteza elevadora.',
        blockPlacementGuide: 'Despeje a água no topo do morro: o barco boiará e subirá o fluxo d’água suavemente até o topo.',
      },
      {
        step: 3,
        title: 'Atalho Dimensional do Nether (1 Bloco = 8 Blocos)',
        action: 'Para distâncias maiores que 500 blocos, empurre o barco com o aldeão para dentro de um Portal do Nether.',
        blockPlacementGuide: 'No Nether, construa um túnel reto de pedra no teto (camada Y=115) com tochas: viajar 100 blocos no Nether equivale a andar 800 blocos no mundo normal!',
        proTip: 'Coloque blocos de gelo compactado no túnel do Nether: o barco atinge 72 blocos por segundo!',
      },
      {
        step: 4,
        title: 'Método Alternativo: Como Curar um Zumbi Aldeão na sua Base',
        action: 'À noite, capture um Zumbi Aldeão (aquele com nariz grande de aldeão) prendendo-o em uma cabine de pedra com teto para não queimar de dia.',
        blockPlacementGuide: 'Cabine 2x2 com paredes de pedra e 1 portão ou barco.',
      },
      {
        step: 5,
        title: 'Aplique a Poção de Fraqueza + Maçã Dourada',
        action: 'Atire 1 Poção Arremessável de Fraqueza (Splash Potion of Weakness) no Zumbi Aldeão. Em seguida, mire nele segurando 1 Maçã Dourada comum e clique com botão direito.',
        blockPlacementGuide: 'Você ouvirá um som alto e partículas vermelhas de força começarão a subir do corpo dele.',
        proTip: 'O processo demora entre 3 e 5 minutos. Mantenha-o protegido de outros monstros.',
      },
      {
        step: 6,
        title: 'Instale a Cama e a Bancada Desejada',
        action: 'Quando ele virar um aldeão normal, coloque 1 Cama e a bancada da profissão que você deseja ao lado dele (ex: Atril para Bibliotecário com livro de Mending).',
        blockPlacementGuide: 'Se a primeira troca do Atril não for o livro que você quer, QUEBRE o atril e coloque de novo quantas vezes precisar!',
        troubleshooting: 'Nunca quebre o atril APÓS comprar algo, pois a primeira compra trava a profissão para sempre.',
      },
      {
        step: 7,
        title: 'Aproveite o Super Desconto Permanente de 1 Esmeralda',
        action: 'Aldeões curados de zumbi dão descontos gigantescos para sempre: você compra Livros de Mending, Armaduras de Diamante e Ferramentas por apenas 1 Esmeralda cada!',
        proTip: 'Combine com um Flecheiro (1 graveto = 1 esmeralda) para ter esmeraldas e equipamentos infinitos.',
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
      '1 Bigorna (para renomear 4 itens de bloqueio)',
      '2 a 4 Baús Duplos por coluna',
      'Blocos sólidos de pedra de construção',
      'Molduras (Item Frames) para sinalizar os baús',
    ],
    mechanicsExplanation:
      'O filtro ImpulseSV funciona medindo a quantidade exata de itens dentro do funil do meio usando um Comparador de Redstone. Enquanto o funil contém 41 itens no 1º slot + 4 itens renomeados nos slots 2 a 5 (total 45 itens), o comparador emite força de sinal 2. Assim que o 42º item entra no funil (total 46 itens), a carga sobe para força 3, alcança o 3º pó de redstone, aciona o repetidor e apaga a Tocha de Redstone por um instante, liberando exatamente 1 item para o baú abaixo!',
    steps: [
      {
        step: 1,
        title: 'Empilhe os Baús Duplos da Sala de Armazenamento',
        action: 'Coloque as colunas de Baús Duplos empilhadas (ex: 2 ou 3 baús duplos de altura por item). Atrás de cada baú, conecte 1 Funil apontado diretamente para a traseira do baú.',
        blockPlacementGuide: 'Shift + Clique na traseira de cada baú. O bico metálico do funil deve apontar horizontalmente para a madeira do baú.',
      },
      {
        step: 2,
        title: 'Instale o Funil-Filtro do Meio Apontando para o Comparador',
        action: 'Em cima do funil inferior, coloque o Funil do Meio (Funil de Filtro). ATENÇÃO CRÍTICA: Este funil NÃO pode apontar para baixo! Agache e clique na face onde ficará o Comparador.',
        blockPlacementGuide: 'O bico do funil do meio DEVE apontar na horizontal para trás (na direção do comparador). Se apontar para baixo, o filtro quebrará!',
        troubleshooting: 'Este é o erro nº 1 de 95% dos jogadores de Redstone: se o funil do meio apontar para baixo, os itens escorrerão sem respeitar o filtro.',
      },
      {
        step: 3,
        title: 'Monte o Triângulo de Pedra Traseiro',
        action: 'Atrás de cada coluna, monte uma estrutura de 3 blocos sólidos em formato de triângulo invertido com 1 bloco de espaço no meio.',
        blockPlacementGuide: 'Bloco superior encostado no funil do meio + 1 bloco descendo um degrau + 1 bloco inferior segurando o repetidor.',
      },
      {
        step: 4,
        title: 'Instale o Comparador e a Linha de 3 Pós de Redstone',
        action: 'Coloque 1 Comparador de Redstone na face superior do bloco encostado no funil do meio. Nos 3 blocos seguintes descendo o degrau, coloque 3 Pós de Redstone.',
        blockPlacementGuide: 'As 2 tochas do comparador ficam encostadas no funil do meio. O pó de redstone desce a escada de blocos.',
        proTip: 'Esta fiação de 3 pós garante a propriedade "Overflow-Proof": mesmo se o baú encher 100%, o sinal nunca ultrapassará força 3 e não quebrará os filtros vizinhos.',
      },
      {
        step: 5,
        title: 'Coloque o Repetidor e a Tocha de Redstone de Bloqueio',
        action: 'No bloco inferior, coloque 1 Repetidor apontado para o bloco da frente. Na face frontal desse bloco, fixe 1 Tocha de Redstone encostada no funil inferior.',
        blockPlacementGuide: 'O repetidor deve ter delay no 1 (padrão). A tocha de redstone fica acesa, travando o funil inferior para que nenhum item escorra até o filtro disparar.',
        troubleshooting: 'Verifique se a tocha de redstone está ACESA. Se estiver apagada, revise a ligação do repetidor.',
      },
      {
        step: 6,
        title: 'Renomeie os 4 Itens de Bloqueio na Bigorna',
        action: 'Abra uma Bigorna e coloque 4 itens comuns (gravetos, pedregulhos ou terra). Mude o nome deles para algo único como "Trava_Filtro".',
        blockPlacementGuide: 'Gasta apenas 1 nível de XP na bigorna.',
        proTip: 'Renomear é obrigatório para que nenhum item comum que passe pelo separador se acumule nos slots da trava.',
      },
      {
        step: 7,
        title: 'Configure os 5 Slots do Funil de Filtro (Regra 41-1-1-1-1)',
        action: 'Abra o funil do meio. Coloque 1 item renomeado em CADA um dos 4 slots da direita (slots 2, 3, 4 e 5). No slot 1 (da esquerda), coloque 41 unidades do item que você quer separar (ex: 41 Barras de Ferro).',
        blockPlacementGuide: 'Slot 1: 41x Item Alvo | Slot 2: 1x Trava | Slot 3: 1x Trava | Slot 4: 1x Trava | Slot 5: 1x Trava. Total exato: 45 itens.',
        proTip: 'Para itens que empilham até 16 (como Pérolas do End ou Ovos), use 10 itens no slot 1 em vez de 41.',
      },
      {
        step: 8,
        title: 'Instale a Linha Superior de Tubulação e Baú de Sobras',
        action: 'Passe uma linha de funis no topo apontando em linha reta para a frente de cada coluna. No final do corredor, coloque 1 Baú Duplo de Sobras (Overflow).',
        blockPlacementGuide: 'Itens não configurados passarão por cima de todos os filtros e cairão no baú de sobras sem travar o sistema.',
        proTip: 'Jogue 1 pack do item no início: você verá a tocha piscar uma vez por item e o baú receber exatamente os itens certos!',
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
      '8 Fornalhas (ou Alto-Fornos / Defumadores)',
      '24 Funis (8 superiores, 8 traseiros e 8 inferiores)',
      '2 Carrinhos com Baú (Minecarts with Chest)',
      '16 Trilhos Elétricos e 4 Trilhos Comuns',
      '2 Alavancas (Ativação dos carrinhos)',
      '1 Liberador (Dropper — boca quadrada para o elevador)',
      '1 Comparador de Redstone + 2 Pós de Redstone',
      '1 Areia das Almas (Soul Sand)',
      'Algas Marinhas (Kelp) e 1 Balde d’Água',
      'Vidro para o tubo do elevador',
      '3 Baús Duplos',
    ],
    mechanicsExplanation:
      'Uma fornalha comum demora 10 minutos e 40 segundos para assar 64 itens. Ao alinhar 8 fornalhas abastecidas simultaneamente por um Carrinho com Baú correndo sobre funis no topo (distribuindo os minérios igualmente) e outro atrás (distribuindo carvão, blocos de alga seca ou baldes de lava), você divide o tempo por 8! Na saída, os itens prontos podem subir direto para o separador de baús da sua sala através de um Elevador de Bolhas com Areia das Almas.',
    steps: [
      {
        step: 1,
        title: 'Alinhe as 8 Fornalhas Lado a Lado',
        action: 'Coloque 8 fornalhas em linha reta no chão. Se você quiser assar minérios 2x mais rápido, use Alto-Fornos (Blast Furnaces); para carnes, use Defumadores (Smokers).',
        blockPlacementGuide: 'Linha de 8 blocos de comprimento.',
      },
      {
        step: 2,
        title: 'Instale os 8 Funis Inferiores de Extração',
        action: 'Cave uma valeta debaixo das 8 fornalhas e conecte 8 funis apontando em linha reta para um canal de saída coletor.',
        blockPlacementGuide: 'Shift + Clique embaixo de cada fornalha. O funil inferior puxa o item pronto assim que ele termina de assar.',
      },
      {
        step: 3,
        title: 'Instale os 8 Funis Traseiros de Combustível',
        action: 'Atrás de cada uma das 8 fornalhas, conecte 1 funil apontando para a face traseira da fornalha.',
        blockPlacementGuide: 'Regra mecânica do Minecraft: funis na traseira de uma fornalha alimentam exclusivamente o slot de combustível (carvão, lava, bambu).',
      },
      {
        step: 4,
        title: 'Instale os 8 Funis Superiores de Minérios / Alimentos',
        action: 'Em cima de cada uma das 8 fornalhas, conecte 1 funil apontando para o topo da fornalha.',
        blockPlacementGuide: 'Funis no topo alimentam exclusivamente o slot do item cru a ser assado.',
      },
      {
        step: 5,
        title: 'Estenda os Trilhos Elétricos e os Carrinhos com Baú',
        action: 'Passe uma linha de trilhos elétricos sobre os 8 funis do topo e outra linha sobre os 8 funis de trás. Coloque 1 Carrinho com Baú em cada linha e ative os trilhos com alavancas.',
        blockPlacementGuide: 'Os carrinhos correrão de um lado para o outro infinitamente sobre os funis.',
        proTip: 'Quando o carrinho passa sobre os funis, ele descarrega 1 item em cada funil por passagem, dividindo 64 minérios em exatamente 8 minérios por fornalha!',
      },
      {
        step: 6,
        title: 'Monte a Base do Elevador de Bolhas com Liberador (Dropper)',
        action: 'No final do canal dos funis de saída, coloque 1 Liberador virado para a frente. Atrás dele, faça um relógio rápido com Comparador para disparar sempre que um item entrar.',
        blockPlacementGuide: 'O liberador cospe o item assado dentro da coluna de água.',
      },
      {
        step: 7,
        title: 'Construa a Coluna de Água e Plante Algas (Kelp)',
        action: 'Suba um tubo de vidro de 1x1 da altura que desejar até sua sala de baús no andar de cima. Despeje 1 balde d’água no topo. Desça até o fundo e plante Algas Marinhas (Kelp) até o topo.',
        blockPlacementGuide: 'Plantar kelp de baixo até o topo transforma TODOS os blocos de água corrente em blocos de fonte de água (Water Source Blocks).',
        troubleshooting: 'A Areia das Almas SÓ cria bolhas em blocos fonte. Se esquecer a alga, o elevador não funcionará!',
      },
      {
        step: 8,
        title: 'Substitua o Bloco Inferior por Areia das Almas (Soul Sand)',
        action: 'Quebre a base da alga marinha e substitua o bloco do chão do tubo por 1 bloco de Areia das Almas (Soul Sand).',
        blockPlacementGuide: 'Você verá partículas de bolhas subindo velozmente até o topo do tubo.',
        proTip: 'Os itens assados subirão a 20 blocos por segundo e cairão no fluxo d’água que abastece o seu Separador Automático de Baús!',
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
      '1 Zumbi com Name Tag (Etiqueta renomeada para não sumir)',
      '3 Camas',
      '1 Barco ou Caldeirão',
      '3 Portões de Carvalho ou Placas',
      '1 Balde de Lava e 1 de Água',
      '3 Funis e 1 Baú Duplo',
      'Blocos de Pedra lisa e Vidro',
      'Paredes de pedra para cercar',
    ],
    mechanicsExplanation:
      'Três aldeões com camas ficam em linha de visão de um zumbi preso em um barco. Pelo código do Minecraft, quando 3 aldeões entram em pânico e dormem por pelo menos 1 fração de segundo, o jogo cria um Golem de Ferro no teto para defendê-los. A água empurra o Golem para um fosso com lava a 3 blocos de altura, queimando a cabeça dele sem queimar o ferro.',
    steps: [
      {
        step: 1,
        title: 'Construa a Plataforma Elevada a 12 Blocos do Chão',
        action: 'Suba um pilar central de pelo menos 12 blocos de altura a partir do solo antes de construir a farm.',
        blockPlacementGuide: 'Golems de ferro procuram blocos válidos em um raio vertical de 6 blocos. Elevar a farm impede que golems nasçam na grama do chão ou em cavernas.',
      },
      {
        step: 2,
        title: 'Monte a Cápsula dos 3 Aldeões com Camas',
        action: 'Crie uma câmara de 3x2 blocos com 3 camas lado a lado. Os travesseiros das camas devem ficar virados para o centro da cápsula.',
        blockPlacementGuide: 'Cubra as camas com meio-bloco ou alçapão para que os aldeões consigam deitar mas não pulem para fora.',
      },
      {
        step: 3,
        title: 'Posicione o Barco com o Zumbi em Linha de Visão',
        action: 'A 2 blocos de distância das camas, coloque 1 Barco sobre um bloco e empurre 1 Zumbi para dentro do barco.',
        blockPlacementGuide: 'Coloque 1 Alçapão entre o zumbi e os aldeões para que a linha de visão seja interrompida periodicamente quando os aldeões deitarem.',
        troubleshooting: 'RENOMEIE o zumbi com uma Etiqueta (Name Tag) na bigorna! Se não renomear, o zumbi sumirá (despawn) quando você andar 128 blocos para longe.',
      },
      {
        step: 4,
        title: 'Instale um Bloco Sólido no Teto do Zumbi',
        action: 'Coloque 1 bloco sólido de pedra logo acima da cabeça do zumbi para protegê-lo do sol durante o dia.',
        proTip: 'Sem o teto, o zumbi pegará fogo ao amanhecer e matará a farm.',
      },
      {
        step: 5,
        title: 'Construa a Plataforma Superior de Spawn (5x5)',
        action: 'Diretamente acima da cápsula dos aldeões, construa uma plataforma de spawn plana de 5x5 blocos de pedra com muros ou vidro ao redor.',
        blockPlacementGuide: 'O teto dos aldeões é o chão onde o Golem de ferro nascerá.',
      },
      {
        step: 6,
        title: 'Crie o Fluxo d’Água Conduzindo ao Fosso',
        action: 'Em dois cantos opostos da plataforma 5x5, coloque 2 baldes de água. A correnteza empurrará qualquer entidade para o canto sem água.',
        blockPlacementGuide: 'No canto sem água, deixe uma abertura de 2x2 blocos para onde o golem escorregará.',
      },
      {
        step: 7,
        title: 'Monte a Câmara de Lava Suspenso com Placas',
        action: 'No fosso de queda, coloque 4 placas ou portões abertos na altura do 3º bloco e despeje 1 balde de lava sobre as placas.',
        blockPlacementGuide: 'O Golem de Ferro tem 2.7 blocos de altura: a cabeça dele queima na lava suspensa, mas os pés ficam embaixo sem queimar os drops de ferro!',
      },
      {
        step: 8,
        title: 'Instale os Funis de Coleta no Fundo do Fosso',
        action: 'No chão embaixo da lava, coloque 4 Funis conectados a um Baú Duplo.',
        proTip: 'Gera entre 350 e 400 lingotes de ferro por hora + centenas de flores para fazer corante vermelho!',
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
      '2 Pérolas do End (Para atravessar a Bedrock do teto)',
      'Escadas de Mão (Ladders)',
      '128 Magma Blocks ou Pedras Lisas',
      'Alçapões (Trapdoors)',
      'Funis e Baús Duplos',
      'Espada com Saque III (Looting III)',
      'Obsidiana e Isqueiro para criar um portal no teto',
    ],
    mechanicsExplanation:
      'No teto do Nether (acima da rocha-mãe na camada Y=128), não existem terrenos ou cavernas ao redor. Isso força 100% dos monstros do Nether a spawnarem exclusivamente na sua plataforma! Zombified Piglins são atraídos para um fosso central onde você os mata com 1 golpe de espada para farmar centenas de níveis de experiência.',
    steps: [
      {
        step: 1,
        title: 'Suba até a Camada Y=127 no Teto do Nether',
        action: 'No Nether, use a tela F3 para achar o bloco de rocha-mãe mais alto na camada Y=127. Coloque escadas até o topo.',
        blockPlacementGuide: 'Suba na escada, olhe na quina superior da Bedrock e atire uma Pérola do End: você atravessará a rocha e chegará ao teto plano infinito.',
      },
      {
        step: 2,
        title: 'Construa Imediatamente um Portal de Retorno no Teto',
        action: 'Monte um portal de Obsidiana 4x5 e acenda com o isqueiro para garantir seu retorno seguro antes de construir.',
      },
      {
        step: 3,
        title: 'Suba uma Torre de Queda de 24 Blocos de Altura',
        action: 'A partir da Bedrock do teto, suba um tubo de queda de 24 blocos de altura com funis e baús no pé.',
        blockPlacementGuide: 'A queda de 23-24 blocos reduz a vida dos Piglins zumbis para meio coração, morrendo com 1 golpe de qualquer espada.',
      },
      {
        step: 4,
        title: 'Construa Plataformas em Anel com Magma Blocks',
        action: 'No topo do tubo de 24 blocos, construa plataformas concêntricas de spawn com Magma Blocks em um raio de 16 blocos.',
        blockPlacementGuide: 'Magma blocks permitem que Zombified Piglins nasçam mesmo em níveis de luz variados.',
      },
      {
        step: 5,
        title: 'Coloque Alçapões Abertos nas Bordas do Fosso',
        action: 'Nas bordas do buraco de queda, instale alçapões e deixe-os na posição ABERTA.',
        proTip: 'A inteligência artificial dos mobs do Minecraft enxerga alçapões abertos como blocos sólidos e eles caminham direto para o buraco!',
      },
      {
        step: 6,
        title: 'Inicie a Reação em Cadeia de Agressão',
        action: 'Fique na cabine segura no pé do tubo, atire uma flecha em um Piglin para deixá-lo com raiva.',
        proTip: 'No código do Java, a raiva dos Piglins se espalha para todos os monstros em 40 blocos: centenas se atirarão no buraco sem parar!',
      },
      {
        step: 7,
        title: 'Colete XP e Ouro Infinitos com Espada de Saque III',
        action: 'Dê golpes na altura dos pés dos monstros com sua Espada Saque III (Looting III).',
        proTip: 'Você alcançará o nível 30 de encantamento em menos de 45 segundos e consertará qualquer ferramenta com Remendo instantaneamente.',
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
      '1 Carrinho de Mina (Minecart) e 1 Trilho',
      '1 Name Tag (Etiqueta renomeada para o Endermite)',
      'Alçapões (Trapdoors)',
      'Funis e Baús Duplos',
      'Lajes de Pedra (Slabs)',
      'Folhas de Árvore ou Blocos Sólidos para a ponte',
    ],
    mechanicsExplanation:
      'Endermen têm ódio mortal de Endermites gerados por pérolas atiradas pelo jogador. Ao posicionar um Endermite preso em um carrinho de mina no topo de um poço de queda de 42 blocos de profundidade, centenas de Endermen se atiram no buraco hipnotizados. Ao caírem, chegam com meio coração de vida no fundo e morrem com 1 único tapa da sua mão!',
    steps: [
      {
        step: 1,
        title: 'Construa a Ponte de 128 Blocos para Fora da Ilha Principal',
        action: 'No The End, construa uma ponte reta de 128 blocos saindo para o vazio.',
        blockPlacementGuide: 'Construir a 128 blocos de distância da ilha zera completamente o spawn de Endermen no terreno natural, concentrando 100% dos monstros na sua máquina.',
      },
      {
        step: 2,
        title: 'Crie a Base de Coleta com Funis e Lajes na Altura dos Pés',
        action: 'No final da ponte, coloque 4 Baús com Funis e cubra os funis com Lajes de Pedra na metade inferior.',
        blockPlacementGuide: 'As lajes deixam apenas 0.5 bloco de fresta: você acerta os pés dos Endermen mas eles não conseguem te bater.',
      },
      {
        step: 3,
        title: 'Suba o Tubo de Queda de Exatos 42 Blocos de Altura',
        action: 'Suba 4 paredes formando um poço de 3x3 com abertura oca interna de 42 blocos de altura.',
        proTip: 'A queda de exatamente 42 blocos reduz os 40 pontos de vida do Enderman para exatamente 1 ponto (meio coração).',
      },
      {
        step: 4,
        title: 'Construa a Plataforma Superior de Spawn com Alçapões',
        action: 'No topo dos 42 blocos, abra uma plataforma larga com alçapões abertos nas bordas do fosso.',
      },
      {
        step: 5,
        title: 'Invoque e Prenda o Endermite no Carrinho',
        action: 'Atire pérolas do End repetidamente contra uma parede de 1 bloco sobre o centro do buraco até nascer um Endermite. Renomeie-o com a Etiqueta e empurre-o para um Carrinho de Mina.',
        troubleshooting: 'O Endermite PRECISA ser gerado por pérola arremessada pelo jogador. Endermites nascidos por ovos criativos não atraem Endermen.',
      },
      {
        step: 6,
        title: 'Coloque 1 Bloco de Proteção sobre o Carrinho do Endermite',
        action: 'Cubra o carrinho com 1 bloco de pedra para que os Endermen não alcancem nem batam no Endermite.',
        proTip: 'Os Endermen correrão cegamente em direção ao Endermite, escorregarão nos alçapões abertos e despencarão no poço aos milhares.',
      },
      {
        step: 7,
        title: 'Colha XP e Pérolas na Velocidade da Luz',
        action: 'Desça até a base e dê socos nos pés dos Endermen com a mão ou espada de Saque III.',
        proTip: 'É a farm mais rápida de todo o jogo: você vai do nível 0 ao nível 30 em meros 12 segundos.',
      },
    ],
  },
];
