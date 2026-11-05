import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Trophy,
  Play,
  RotateCcw,
  Zap,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';

export interface ReactionPrompt {
  id: string;
  situation: string;
  context: string;
  targetShortcut: string;
  targetKeys: string[];
  expectedKeyText: string;
  category: 'Combate' | 'Inventário' | 'Técnico' | 'Construção';
  validMatcher: (e: KeyboardEvent) => boolean;
}

const PROMPT_DECK: ReactionPrompt[] = [
  {
    id: 'offhand-totem',
    situation: '💀 DANO CRÍTICO! Equipe o Totem ou Escudo na segunda mão imediatamente!',
    context: 'Seu totem estourou no combate. Você precisa alternar a mão antes do próximo ataque.',
    targetShortcut: 'Tecla F',
    targetKeys: ['F'],
    expectedKeyText: 'Pressione [F]',
    category: 'Combate',
    validMatcher: (e) => e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.altKey,
  },
  {
    id: 'spectator-f3-n',
    situation: '👻 INVASÃO! Mude imediatamente para o Modo Espectador para inspecionar cavernas!',
    context: 'Ouviu barulho de Warden ou lava logo abaixo. Alterne para o espectador sem abrir chat.',
    targetShortcut: 'F3 + N',
    targetKeys: ['F3', 'N'],
    expectedKeyText: 'Pressione [F3 + N] ou [N]',
    category: 'Técnico',
    validMatcher: (e) => e.key.toLowerCase() === 'n',
  },
  {
    id: 'chunk-borders-f3-g',
    situation: '📐 ALINHAMENTO DE REDSTONE! Ligue a grade 3D das bordas de Chunks!',
    context: 'Você vai construir uma farm e precisa garantir que o circuito não cruze o chunk.',
    targetShortcut: 'F3 + G',
    targetKeys: ['F3', 'G'],
    expectedKeyText: 'Pressione [F3 + G] ou [G]',
    category: 'Técnico',
    validMatcher: (e) => e.key.toLowerCase() === 'g',
  },
  {
    id: 'drop-full-stack',
    situation: '🗑️ INVENTÁRIO CHEIO DE PEDREGULHO! Descarte o pack de 64 itens no chão de uma vez!',
    context: 'Não jogue 1 por 1 com a tecla Q. Descarte o pack inteiro em 1 segundo.',
    targetShortcut: 'Ctrl + Q',
    targetKeys: ['Ctrl', 'Q'],
    expectedKeyText: 'Pressione [Ctrl + Q]',
    category: 'Inventário',
    validMatcher: (e) => e.key.toLowerCase() === 'q' && (e.ctrlKey || e.metaKey),
  },
  {
    id: 'hitboxes-f3-b',
    situation: '🎯 CREEPER NA GRAMA ALTA! Ative o raio-x de hitboxes e linha de visão agora!',
    context: 'Inimigo invisível ou escondido. Exiba as caixas de colisão ao redor de todos os mobs.',
    targetShortcut: 'F3 + B',
    targetKeys: ['F3', 'B'],
    expectedKeyText: 'Pressione [F3 + B] ou [B]',
    category: 'Técnico',
    validMatcher: (e) => e.key.toLowerCase() === 'b',
  },
  {
    id: 'hotbar-slot-1',
    situation: '⚔️ EMBOSCADA! Puxe a Espada do slot 1 da sua barra rápida num reflexo!',
    context: 'Zumbi bebê correndo na sua direção. Troque imediatamente para o slot de combate.',
    targetShortcut: 'Tecla 1',
    targetKeys: ['1'],
    expectedKeyText: 'Pressione [1]',
    category: 'Combate',
    validMatcher: (e) => e.key === '1',
  },
  {
    id: 'hotbar-slot-3',
    situation: '🍎 FOME SEVERA! Puxe a comida dourada no slot 3 da hotbar para regenerar!',
    context: 'Meio coração no End. Selecione a comida instantaneamente.',
    targetShortcut: 'Tecla 3',
    targetKeys: ['3'],
    expectedKeyText: 'Pressione [3]',
    category: 'Combate',
    validMatcher: (e) => e.key === '3',
  },
  {
    id: 'tooltips-f3-h',
    situation: '⛏️ PICARETA QUASE QUEBRANDO! Ative a durabilidade numérica exata com F3 + H!',
    context: 'Descubra se faltam 12 ou 400 blocos antes da picareta de diamante quebrar.',
    targetShortcut: 'F3 + H',
    targetKeys: ['F3', 'H'],
    expectedKeyText: 'Pressione [F3 + H] ou [H]',
    category: 'Técnico',
    validMatcher: (e) => e.key.toLowerCase() === 'h',
  },
  {
    id: 'gamemode-wheel',
    situation: '⚡ EMERGÊNCIA CRIATIVA! Abra a roleta rápida de Modos de Jogo com F3 + F4!',
    context: 'Caiu na lava durante testes. Mude de sobrevivência para criativo.',
    targetShortcut: 'F3 + F4',
    targetKeys: ['F3', 'F4'],
    expectedKeyText: 'Pressione [F4] ou [F3 + F4]',
    category: 'Técnico',
    validMatcher: (e) => e.key === 'F4' || e.key.toLowerCase() === 'f4',
  },
  {
    id: 'sneak-ledge',
    situation: '🌋 PONTE NO NETHER! Agache com Shift para não despencar na lava!',
    context: 'Construindo pontes no vazio ou conectando funis sem abrir o baú.',
    targetShortcut: 'Tecla Shift',
    targetKeys: ['Shift'],
    expectedKeyText: 'Pressione [Shift]',
    category: 'Construção',
    validMatcher: (e) => e.key === 'Shift',
  },
];

const TOTAL_ROUNDS = 8;
const MAX_TIME_PER_ROUND_MS = 4000;

export const ReactionTrainerMinigame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'playing' | 'round-feedback' | 'finished'>('idle');
  const [countdown, setCountdown] = useState<number>(3);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [roundResult, setRoundResult] = useState<'success' | 'timeout' | 'wrong' | null>(null);
  const [lastAttemptKey, setLastAttemptKey] = useState<string>('');
  const [selectedPrompts, setSelectedPrompts] = useState<ReactionPrompt[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const roundTimeoutRef = useRef<number | null>(null);
  const currentPrompt = selectedPrompts[currentRoundIndex] || PROMPT_DECK[0];

  // Web Audio synthetic sounds (no external audio assets needed)
  const playBeep = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.12) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or supported
    }
  }, [soundEnabled]);

  // Start new game session
  const startGame = () => {
    // Shuffle and pick 8 prompts
    const shuffled = [...PROMPT_DECK].sort(() => Math.random() - 0.5).slice(0, TOTAL_ROUNDS);
    setSelectedPrompts(shuffled);
    setCurrentRoundIndex(0);
    setReactionTimes([]);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setRoundResult(null);
    setCountdown(3);
    setGameState('countdown');
  };

  // Countdown 3, 2, 1, VAI!
  useEffect(() => {
    if (gameState !== 'countdown') return;

    if (countdown > 0) {
      playBeep(440, 'sine', 0.08);
      const timer = window.setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      playBeep(880, 'triangle', 0.2);
      setGameState('playing');
      setRoundStartTime(Date.now());
    }
  }, [gameState, countdown, playBeep]);

  // Handle timeout if user takes > 4000ms
  useEffect(() => {
    if (gameState !== 'playing') return;

    roundTimeoutRef.current = window.setTimeout(() => {
      // Round expired
      handleRoundFinish(false, MAX_TIME_PER_ROUND_MS, 'Tempo Esgotado');
    }, MAX_TIME_PER_ROUND_MS);

    return () => {
      if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    };
  }, [gameState, currentRoundIndex]);

  const handleRoundFinish = (isSuccess: boolean, reactionTime: number, keyName: string) => {
    if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);

    if (isSuccess) {
      playBeep(659.25, 'triangle', 0.15); // E5 note
      const speedBonus = Math.max(0, Math.round((MAX_TIME_PER_ROUND_MS - reactionTime) / 30));
      const roundPoints = 100 + speedBonus;
      setScore((s) => s + roundPoints);
      setReactionTimes((arr) => [...arr, reactionTime]);
      setStreak((st) => {
        const next = st + 1;
        setMaxStreak((m) => Math.max(m, next));
        return next;
      });
      setRoundResult('success');
    } else {
      playBeep(220, 'sawtooth', 0.25); // low buzz
      setStreak(0);
      setRoundResult(keyName === 'Tempo Esgotado' ? 'timeout' : 'wrong');
      setReactionTimes((arr) => [...arr, MAX_TIME_PER_ROUND_MS]);
    }

    setLastAttemptKey(keyName);
    setGameState('round-feedback');

    // Advance to next round or finish
    timerRef.current = window.setTimeout(() => {
      if (currentRoundIndex + 1 < TOTAL_ROUNDS) {
        setCurrentRoundIndex((idx) => idx + 1);
        setRoundResult(null);
        setGameState('playing');
        setRoundStartTime(Date.now());
      } else {
        setGameState('finished');
      }
    }, 1100);
  };

  // Keyboard event listener during active gameplay
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      // Prevent default for game keys like F3, F4, Tab, Space, Q
      if (
        e.key === 'F4' ||
        e.key.toLowerCase() === 'f' ||
        (e.key.toLowerCase() === 'q' && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
      }

      const elapsed = Date.now() - roundStartTime;
      const keyLabel = e.key === ' ' ? 'Espaço' : e.key.length === 1 ? e.key.toUpperCase() : e.key;

      const isMatch = currentPrompt.validMatcher(e);
      if (isMatch) {
        handleRoundFinish(true, elapsed, keyLabel);
      } else {
        // Wrong key pressed
        handleRoundFinish(false, elapsed, keyLabel);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentPrompt, roundStartTime]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (roundTimeoutRef.current) clearTimeout(roundTimeoutRef.current);
    };
  }, []);

  // Compute stats on finish
  const averageReactionMs = useMemo(() => {
    const valid = reactionTimes.filter((t) => t < MAX_TIME_PER_ROUND_MS);
    if (!valid.length) return 0;
    return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
  }, [reactionTimes]);

  const medalAward = useMemo(() => {
    if (score >= 1200 && averageReactionMs > 0 && averageReactionMs <= 900) {
      return {
        badge: 'Ouro Lendário (Pro PC Gamer)',
        color: 'text-amber-300 border-amber-500/60 bg-amber-950/30',
        note: 'Memória muscular impecável! Seus reflexos no teclado já superam a velocidade de qualquer jogador mobile.',
      };
    }
    if (score >= 800 && averageReactionMs <= 1500) {
      return {
        badge: 'Prata Competitiva (Pronto para SMP)',
        color: 'text-zinc-200 border-zinc-400/60 bg-zinc-900/60',
        note: 'Excelente agilidade! Você já domina os atalhos de emergência e inventário.',
      };
    }
    return {
      badge: 'Bronze em Treinamento (Fase de Adaptação)',
      color: 'text-orange-300 border-orange-500/60 bg-orange-950/30',
      note: 'Bom início! Pratique mais algumas rodadas para memorizar os combos de F3 e hotbar automática.',
    };
  }, [score, averageReactionMs]);

  return (
    <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/90 p-5 sm:p-7 space-y-6">
      {/* Top Header of Minigame */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Zap className="w-4 h-4" />
            <span>Minigame de Treinamento Rápido</span>
            <span aria-hidden="true">·</span>
            <span>8 Rodadas com Cronômetro de Reflexo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
            Treinador de Reações & Memória Muscular
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSoundEnabled((s) => !s)}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
            title={soundEnabled ? 'Desativar áudio' : 'Ativar áudio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {gameState !== 'idle' && (
            <button
              type="button"
              onClick={startGame}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}
        </div>
      </div>

      {/* STATE 1: IDLE / WELCOME */}
      {gameState === 'idle' && (
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Zap className="w-7 h-7" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-lg font-bold text-zinc-100">
              Pronto para testar seus reflexos de teclado?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Situações surpresa do Minecraft vão aparecer na tela (troca de Totem, bordas de Chunks, modo espectador ou descarte rápido). Seu objetivo é pressionar o atalho no teclado o mais rápido possível!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <span className="font-semibold text-emerald-400 block mb-0.5">8 Desafios</span>
              <span className="text-zinc-400">Situações reais de perigo, PvP e inventário.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <span className="font-semibold text-violet-300 block mb-0.5">Milissegundos</span>
              <span className="text-zinc-400">Mede seu tempo exato de reação em cada tecla.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <span className="font-semibold text-amber-300 block mb-0.5">Medalhas</span>
              <span className="text-zinc-400">Classificação Ouro, Prata e Bronze.</span>
            </div>
          </div>

          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Desafio de Reação</span>
          </button>
        </div>
      )}

      {/* STATE 2: COUNTDOWN */}
      {gameState === 'countdown' && (
        <div className="p-12 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-3">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Prepare as mãos no teclado e mouse
          </div>
          <div className="text-6xl sm:text-7xl font-mono font-black text-emerald-400 animate-pulse">
            {countdown > 0 ? countdown : 'VAI!'}
          </div>
          <div className="text-xs text-zinc-500 font-mono">
            Primeiro desafio carregando em instantes...
          </div>
        </div>
      )}

      {/* STATE 3 & 4: PLAYING & ROUND FEEDBACK */}
      {(gameState === 'playing' || gameState === 'round-feedback') && (
        <div className="space-y-5">
          {/* Progress / Score Bar */}
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-zinc-400">
                Rodada <strong className="text-zinc-100">{currentRoundIndex + 1}</strong> de {TOTAL_ROUNDS}
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-semibold">{currentPrompt.category}</span>
            </div>

            <div className="flex items-center gap-4 font-mono tabular-nums">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-400 font-bold animate-bounce">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{streak}x Combo</span>
                </div>
              )}
              <div className="text-zinc-300">
                Pontos: <strong className="text-emerald-400">{score}</strong>
              </div>
            </div>
          </div>

          {/* Active Challenge Box */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-all text-center space-y-4 ${
              roundResult === 'success'
                ? 'bg-emerald-950/35 border-emerald-500'
                : roundResult === 'wrong'
                ? 'bg-red-950/30 border-red-500'
                : roundResult === 'timeout'
                ? 'bg-amber-950/30 border-amber-500'
                : 'bg-zinc-900/70 border-zinc-700/80'
            }`}
          >
            {/* Situation Header */}
            <div className="inline-block px-3 py-1 rounded-full bg-slate-950/80 border border-zinc-700 text-xs font-semibold text-zinc-300 mb-1">
              {currentPrompt.category}
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-white max-w-xl mx-auto leading-snug">
              {currentPrompt.situation}
            </h4>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              {currentPrompt.context}
            </p>

            {/* Target Hint Keycaps */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-zinc-400 mr-1">Atalho Correto:</span>
              {currentPrompt.targetKeys.map((k, i) => (
                <React.Fragment key={k}>
                  <kbd className="px-3 py-1.5 rounded-lg bg-slate-950 border-2 border-emerald-500/70 text-sm font-mono font-bold text-emerald-300 shadow-md">
                    {k}
                  </kbd>
                  {i < currentPrompt.targetKeys.length - 1 && (
                    <span className="text-xs text-zinc-500 font-mono">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Round Instant Feedback Callout */}
            {roundResult && (
              <div className="pt-3 flex items-center justify-center gap-2 text-sm font-bold animate-in fade-in zoom-in duration-150">
                {roundResult === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400">
                      PERFEITO! +{reactionTimes[reactionTimes.length - 1]}ms (+100 pts)
                    </span>
                  </>
                ) : roundResult === 'timeout' ? (
                  <>
                    <Timer className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400">Tempo Esgotado! Próxima rodada...</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">
                      Tecla errada [{lastAttemptKey}]! O atalho era {currentPrompt.targetShortcut}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="text-center text-xs text-zinc-400 font-mono">
            Pressione a tecla ou combinação diretamente no teclado físico do seu PC!
          </div>
        </div>
      )}

      {/* STATE 5: FINISHED / RESULTS */}
      {gameState === 'finished' && (
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Treinamento de Memória Muscular Concluído
            </div>
            <h4 className="text-2xl font-bold text-zinc-100">
              Desempenho Final: {score} Pontos
            </h4>
          </div>

          {/* Medal Award Banner */}
          <div className={`p-4 rounded-xl border max-w-lg mx-auto text-left space-y-1.5 ${medalAward.color}`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Award className="w-4 h-4 shrink-0" />
              <span>{medalAward.badge}</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">
              {medalAward.note}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <div className="text-zinc-400">Tempo Médio</div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                {averageReactionMs} ms
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <div className="text-zinc-400">Maior Combo</div>
              <div className="text-base font-bold font-mono text-amber-400 mt-0.5">
                {maxStreak}x seguidos
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-zinc-800">
              <div className="text-zinc-400">Acertos</div>
              <div className="text-base font-bold font-mono text-violet-300 mt-0.5">
                {reactionTimes.filter((t) => t < MAX_TIME_PER_ROUND_MS).length} / {TOTAL_ROUNDS}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente & Bater Recorde</span>
          </button>
        </div>
      )}
    </div>
  );
};
