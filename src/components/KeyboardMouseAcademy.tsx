import React, { useState, useEffect, useMemo } from 'react';
import {
  Keyboard,
  MousePointer,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export type ShortcutCategory = 'Inventário' | 'Técnico' | 'Combate' | 'Construção';

export interface ShortcutCardItem {
  id: string;
  title: string;
  category: ShortcutCategory;
  keys: string[];
  mobileComparison: string;
  howItWorks: string;
  proTip: string;
}

const SHORTCUTS_DATA: ShortcutCardItem[] = [
  // INVENTÁRIO
  {
    id: 'inv-shift-click',
    title: 'Transferência Instantânea de Pack',
    category: 'Inventário',
    keys: ['Shift', 'Clique Esquerdo'],
    mobileComparison: 'No celular/console era preciso segurar o dedo ou arrastar até o slot.',
    howItWorks:
      'Envia o pack inteiro de 64 itens direto entre o baú, fornalha, armadura e seu inventário sem precisar arrastar o mouse.',
    proTip:
      'Bônus secreto: segure um item no cursor e dê Shift + Duplo Clique Esquerdo sobre outro pack igual para transferir TODOS os packs daquele item do baú de uma só vez!',
  },
  {
    id: 'inv-double-click',
    title: 'Agrupar Itens Espalhados em 1 Pack',
    category: 'Inventário',
    keys: ['Duplo Clique Esquerdo'],
    mobileComparison: 'No toque era necessário juntar montinho por montinho manualmente.',
    howItWorks:
      'Dê um duplo clique rápido sobre qualquer item solto no inventário ou baú para puxar todas as unidades espalhadas até fechar um pack de 64.',
    proTip:
      'Funciona mesmo se os itens estiverem divididos entre o seu inventário e um baú aberto ao mesmo tempo.',
  },
  {
    id: 'inv-hotbar-1-9',
    title: 'Envio Direto para a Hotbar (1 a 9)',
    category: 'Inventário',
    keys: ['Cursor no Item', 'Teclas 1–9'],
    mobileComparison: 'Sem equivalente no celular; exigia abrir, clicar no item e clicar na barra.',
    howItWorks:
      'Apenas passe a seta do mouse por cima de um item no baú/inventário (sem clicar!) e aperte um número de 1 a 9 para trocá-lo instantaneamente com aquele espaço da barra rápida.',
    proTip:
      'Configure seus números 1, 2 e 3 sempre para Espada, Picareta e Tochas/Comida para criar memória muscular automática.',
  },
  {
    id: 'inv-offhand-f',
    title: 'Troca Rápida para a Segunda Mão (Off-Hand)',
    category: 'Inventário',
    keys: ['Tecla F'],
    mobileComparison: 'No Bedrock a segunda mão só aceita escudo, mapa ou totem manualmente.',
    howItWorks:
      'Transfere o item que está na sua mão principal (ou sob o cursor dentro do inventário) direto para a mão esquerda.',
    proTip:
      'Na Java Edition você pode segurar tochas, comidas, blocos de construção ou ferramentas com Remendo (Mending) na segunda mão!',
  },
  {
    id: 'inv-ctrl-q',
    title: 'Dropar Pack Inteiro no Chão',
    category: 'Inventário',
    keys: ['Ctrl', 'Tecla Q'],
    mobileComparison: 'No celular exigia segurar na barra de itens e esperar a barra verde encher.',
    howItWorks:
      'Enquanto apenas a tecla Q joga 1 única unidade no chão, segurar Ctrl + Q arremessa o pack inteiro de 64 itens de uma só vez.',
    proTip:
      'Você também pode passar o mouse sobre vários packs dentro do inventário aberto segurando Ctrl + Q para esvaziar o lixo em segundos.',
  },

  // TÉCNICO (DEBUG / F3)
  {
    id: 'tech-f3-g',
    title: 'Visualizar Bordas Exatas de Chunks',
    category: 'Técnico',
    keys: ['F3', 'Tecla G'],
    mobileComparison: 'No Bedrock só era possível ver chunks instalando texturas externas.',
    howItWorks:
      'Ativa uma grade tridimensional amarela, azul e vermelha ao redor do jogador mostrando exatamente onde começa e termina cada Chunk (16x16 blocos).',
    proTip:
      'Essencial antes de construir circuitos de Redstone ou farms automáticas para evitar que uma máquina fique cortada no meio de dois chunks.',
  },
  {
    id: 'tech-f3-b',
    title: 'Raio-X de Hitboxes e Linha de Visão',
    category: 'Técnico',
    keys: ['F3', 'Tecla B'],
    mobileComparison: 'Recurso exclusivo de diagnóstico nativo da edição Java no PC.',
    howItWorks:
      'Desenha uma caixa branca ao redor de todos os mobs, itens caídos e jogadores, além de uma linha azul indicando a altura dos olhos e um vetor vermelho da direção do olhar.',
    proTip:
      'Perfeito para alinhar miras em farms de XP, encontrar itens caídos no meio da grama alta e treinar alcance de combate.',
  },
  {
    id: 'tech-f3-h',
    title: 'Durabilidade Exata das Ferramentas & IDs',
    category: 'Técnico',
    keys: ['F3', 'Tecla H'],
    mobileComparison: 'No console você só vê uma barrinha verde sem saber quantos usos restam.',
    howItWorks:
      'Ativa as "Dicas Avançadas (Advanced Tooltips)". Ao passar o mouse sobre qualquer picareta, elitra ou armadura, mostra exatamente quantos blocos faltam para quebrar (ex: Durabilidade: 1420 / 1561).',
    proTip:
      'Você só precisa ativar F3 + H uma única vez; a configuração fica salva mesmo quando você fecha e abre o jogo novamente.',
  },
  {
    id: 'tech-f3-f4',
    title: 'Roleta Rápida de Modo de Jogo',
    category: 'Técnico',
    keys: ['Segurar F3', 'Tecla F4'],
    mobileComparison: 'Economiza digitar /gamemode creative ou abrir o menu de configurações.',
    howItWorks:
      'Abre um menu rápido no centro da tela permitindo alternar entre Sobrevivência, Criativo, Espectador e Aventura em menos de 1 segundo.',
    proTip:
      'Combine com F3 + N para alternar direto para o modo Espectador e atravessar paredes ao testar suas construções e cavernas.',
  },

  // COMBATE
  {
    id: 'combat-cooldown-sweep',
    title: 'Tempo de Recarga & Golpe em Arco (Sweeping Edge)',
    category: 'Combate',
    keys: ['Aguardar Barra 100%', 'Clique Esquerdo'],
    mobileComparison: 'No Bedrock vence quem clica mais rápido; no Java clicar rápido dá apenas 20% de dano.',
    howItWorks:
      'Na Java Edition, cada arma tem uma pequena barra de recarga abaixo da mira. Esperar carregar 100% libera o dano máximo e o corte horizontal da espada que atinge vários inimigos de uma vez.',
    proTip:
      'Machados causam mais dano por golpe individual e desativam o escudo do oponente por 5 segundos inteiros!',
  },
  {
    id: 'combat-sprint-crit',
    title: 'Crítico Garantido na Queda (150% de Dano)',
    category: 'Combate',
    keys: ['Espaço (Pular)', 'Golpear Caindo'],
    mobileComparison: 'Muito mais preciso no teclado e mouse para encaixar entre recargas da arma.',
    howItWorks:
      'Pule e desfira o clique esquerdo apenas quando o seu personagem já começou a descer do pulo (não enquanto estiver subindo). Estrelas mágicas sairão do alvo confirmando +50% de dano extra.',
    proTip:
      'Solte brevemente a tecla W (frente) uma fração de segundo antes de bater no ar: se você estiver correndo rápido demais, o jogo faz um ataque de empurrão em vez de crítico.',
  },
  {
    id: 'combat-shield-totem-swap',
    title: 'Troca de Emergência de Totem ou Escudo',
    category: 'Combate',
    keys: ['Abrir Inv (E)', 'Cursor no Totem + F'],
    mobileComparison: 'Permite equipar um novo Totem da Imortalidade em menos de 0.4 segundo.',
    howItWorks:
      'Quando seu Totem estourar ou você precisar puxar o escudo rápido, abra o inventário, passe o mouse sobre o item reserva e aperte F para jogá-lo direto na mão secundária.',
    proTip:
      'Para usar Balde de Água contra quedas (MLG), deixe o balde sempre em uma tecla fixa (como 4 ou R) em vez de girar a rodinha do mouse.',
  },

  // CONSTRUÇÃO
  {
    id: 'build-pick-block',
    title: 'Puxar Bloco Olhado (Botão do Meio / Scroll)',
    category: 'Construção',
    keys: ['Clique na Roda do Mouse (Scroll)'],
    mobileComparison: 'O atalho mais amado por construtores de PC, ausente por padrão no toque.',
    howItWorks:
      'Olhe para qualquer bloco já construído à sua frente e aperte a rodinha do mouse para baixo (Clique do Meio). Se você tiver aquele bloco guardado na mochila, o jogo o coloca direto na sua mão!',
    proTip:
      'Funciona tanto no modo Sobrevivência (puxa da sua mochila) quanto no modo Criativo (cria o bloco mesmo sem estar no seu inventário).',
  },
  {
    id: 'build-sneak-hopper',
    title: 'Construção na Borda e Conexão em Baús',
    category: 'Construção',
    keys: ['Segurar Shift', 'Clique Direito'],
    mobileComparison: 'Segurar Shift no teclado dá controle milimétrico sem precisar dar duplo toque.',
    howItWorks:
      'Enquanto segura Shift você nunca cai da borda de um bloco (ideal para pontes no Nether/End) e pode clicar com o botão direito em Baús, Fornalhas e Ejetores para conectar Funis e Tochas sem abrir o menu deles.',
    proTip:
      'No menu de Acessibilidade você pode escolher se o Shift funciona como "Manter Pressionado (Hold)" ou "Alternar (Toggle)".',
  },
  {
    id: 'build-distribute-drag',
    title: 'Pintar Slots da Bancada com o Mouse',
    category: 'Construção',
    keys: ['Segurar Clique Esq / Dir', 'Arrastar'],
    mobileComparison: 'Permite fabricar dezenas de blocos de construção em um único movimento.',
    howItWorks:
      'Segure um pack no cursor e arraste pelos 9 espaços da bancada de trabalho: segurar o Clique Esquerdo divide o pack em partes iguais; segurar o Clique Direito deixa apenas 1 item em cada espaço.',
    proTip:
      'Ideal para fazer escadas, lajes, cercas e painéis de vidro em massa sem clicar 9 vezes.',
  },
];

const STORAGE_KEY_MASTERED = 'craftlab_mastered_shortcuts_v1';

export const KeyboardMouseAcademy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ShortcutCategory>('Todos');
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MASTERED, JSON.stringify(masteredIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [masteredIds]);

  // Listen to live keydowns so users can test their keyboard keys interactively
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const keyLabel = e.key === ' ' ? 'Espaço' : e.key.length === 1 ? e.key.toUpperCase() : e.key;
      setLastPressedKey(keyLabel);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredShortcuts = useMemo(() => {
    if (selectedCategory === 'Todos') return SHORTCUTS_DATA;
    return SHORTCUTS_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const masteredCount = useMemo(
    () => SHORTCUTS_DATA.filter((s) => masteredIds[s.id]).length,
    [masteredIds]
  );

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyCombo = (keys: string[], id: string) => {
    navigator.clipboard.writeText(keys.join(' + '));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section
      id="academia-teclado"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/45 p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
            <Keyboard className="w-4 h-4" />
            <span>Treinamento de Memória Muscular para PC</span>
            <span aria-hidden="true">·</span>
            <span>{SHORTCUTS_DATA.length} Atalhos Secretos da Java Edition</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            Academia de Teclado & Mouse (Ex-Mobile)
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Quem migra do celular ou console perde muito tempo arrastando itens manualmente. Domine os atalhos secretos de inventário, diagnóstico técnico (<code className="text-emerald-300 font-mono">F3</code>), combate e construção. Marque cada cartão conforme for praticando no jogo!
          </p>
        </div>

        {/* Progress & Reset Box */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-zinc-800 shrink-0">
          <div>
            <div className="text-xs text-zinc-400">Atalhos Dominados</div>
            <div className="text-base font-bold font-mono tabular-nums text-emerald-400">
              {masteredCount} / {SHORTCUTS_DATA.length} ({Math.round((masteredCount / SHORTCUTS_DATA.length) * 100)}%)
            </div>
          </div>
          {masteredCount > 0 && (
            <button
              type="button"
              onClick={() => setMasteredIds({})}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              title="Resetar treino de atalhos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Bar + Interactive Live Key Detector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-zinc-800">
          {(['Todos', 'Inventário', 'Técnico', 'Combate', 'Construção'] as const).map((cat) => {
            const active = selectedCategory === cat;
            const count =
              cat === 'Todos'
                ? SHORTCUTS_DATA.length
                : SHORTCUTS_DATA.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Keyboard Press Feedback */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-950 border border-zinc-800 text-xs">
          <MousePointer className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-zinc-400">Sensor de Teclado ao Vivo:</span>
          <kbd className="px-2.5 py-1 rounded bg-zinc-900 border border-emerald-500/40 font-mono font-bold text-emerald-300">
            {lastPressedKey ? `Tecla [${lastPressedKey}] detectada` : 'Pressione qualquer tecla'}
          </kbd>
        </div>
      </div>

      {/* Grid of Quick Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {filteredShortcuts.map((item) => {
          const isMastered = !!masteredIds[item.id];
          const isTech = item.category === 'Técnico';
          const isCombat = item.category === 'Combate';

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isMastered
                  ? 'bg-emerald-950/20 border-emerald-500/50'
                  : 'bg-slate-950/85 border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-4">
                {/* Top Metadata + Mastered Checkbox */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span
                      className={
                        isTech
                          ? 'text-violet-300 font-semibold'
                          : isCombat
                          ? 'text-amber-300 font-semibold'
                          : 'text-emerald-400 font-semibold'
                      }
                    >
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Treino Rápido</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMastered(item.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isMastered
                        ? 'text-emerald-400 font-semibold'
                        : 'text-zinc-400 hover:text-emerald-300'
                    }`}
                  >
                    {isMastered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Dominado</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        <span>Praticar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                  {item.title}
                </h3>

                {/* Visual Keycaps Combination */}
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.keys.map((k, idx) => (
                      <React.Fragment key={k}>
                        <kbd className="px-2.5 py-1.5 rounded-lg bg-slate-950 border-b-2 border-zinc-700 text-xs font-mono font-bold text-emerald-300 shadow-inner">
                          {k}
                        </kbd>
                        {idx < item.keys.length - 1 && (
                          <span className="text-xs font-mono text-zinc-500">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCombo(item.keys, item.id)}
                    title="Copiar atalho"
                    className="p-1.5 rounded-md bg-slate-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors shrink-0"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Ex-Mobile Comparison Note */}
                <div className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-300">No Celular/Console:</strong>{' '}
                  {item.mobileComparison}
                </div>

                {/* How it works on PC */}
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {item.howItWorks}
                </p>
              </div>

              {/* Pro Tip Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">Segredo Pro: </strong>
                  {item.proTip}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Dica de Ouro para Ex-Mobile:</strong> Se o seu notebook exigir a tecla{' '}
            <code className="text-emerald-300 font-mono">Fn</code> para usar o{' '}
            <code className="text-emerald-300 font-mono">F3</code>, aperte{' '}
            <code className="text-emerald-300 font-mono">Fn + Esc</code> para travar as teclas F1–F12 no modo de jogos!
          </span>
        </div>
      </div>
    </section>
  );
};
