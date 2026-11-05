import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const SYSTEM_INSTRUCTION = `Você é o "Doutor FPS & Crash", um Engenheiro Sênior de Performance e Diagnóstico de Minecraft Java Edition integrado à plataforma CraftLab.
Sua missão é analisar entradas enviadas pelo usuário — que podem ser o texto copiado da tela de F3 (Debug Screen), um relatório de erro (Crash Log / latest.log) ou a descrição de um sintoma de baixo desempenho — e responder de forma direta, técnica e acessível em português brasileiro.

Durante a análise, verifique obrigatoriamente estas 3 causas clássicas (além de erros específicos no log):
1. GPU Integrada vs. Dedicada: Verifique se o jogo (javaw.exe) está rodando na placa de vídeo integrada (Intel UHD Graphics, Intel Iris Xe, AMD RadeonTM Graphics integrada) em vez da GPU dedicada (NVIDIA GeForce GTX/RTX ou AMD Radeon RX).
2. Alocação de Memória RAM na JVM: Verifique se falta memória alocada (como o padrão de 2048MB / -Xmx2G que causa congelamentos constantes com Shaders/Modpacks) ou se há excesso extremo (>12GB causando pausas no Garbage Collector).
3. Render Distance / Shadow Distance ou Conflito de Mods: Verifique se a distância de renderização/sombras está alta demais para a GPU, se falta uma biblioteca obrigatória (como MaLiLib para o Litematica, Fabric API, Indium), versão incorreta do Java (Minecraft 1.20.5+ exige Java 21) ou se o usuário misturou OptiFine com Sodium.

Sempre retorne um diagnóstico objetivo acompanhado de EXATAMENTE 3 passos práticos e acionáveis para resolver o problema ou recuperar o FPS.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.post('/api/doctor-fps', async (req, res) => {
    try {
      const { userInput, inputCategory } = req.body as {
        userInput?: string;
        inputCategory?: string;
      };

      if (!userInput || typeof userInput !== 'string' || !userInput.trim()) {
        res.status(400).json({
          error: 'Por favor, cole o texto do F3, o Crash Log ou descreva o problema antes de analisar.',
        });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error:
            'A chave GEMINI_API_KEY não foi encontrada no ambiente. Verifique o painel Settings > Secrets no AI Studio.',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const promptText = `Tipo de relato informado pelo usuário: ${inputCategory || 'Diagnóstico Geral'}

Conteúdo enviado pelo jogador:
"""
${userInput.trim()}
"""

Analise o caso acima para Minecraft Java Edition. Verifique atentamente:
- Se o jogo está rodando na placa integrada Intel/AMD em vez da GPU dedicada;
- Se falta memória RAM alocada na JVM (ex: -Xmx2G) ou se o Garbage Collector está saturado;
- Se a Render Distance / Shadow Distance está alta demais ou se há conflito/falta de dependências nos mods.

Responda estritamente no esquema JSON solicitado com exatamente 3 passos práticos.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          diagnosisTitle: {
            type: Type.STRING,
            description: 'Título direto e claro da causa raiz identificada.',
          },
          detectedBottleneck: {
            type: Type.STRING,
            description:
              'Categoria principal do gargalo (ex: "GPU Integrada Ativa", "Memória RAM Insuficiente (-Xmx)", "Render Distance / Sombras Excessivas", "Dependência de Mod Ausente / Conflito").',
          },
          severity: {
            type: Type.STRING,
            description: 'Nível de urgência: "Crítico", "Atenção" ou "Otimização".',
          },
          hardwareSummary: {
            type: Type.STRING,
            description:
              'Resumo rápido de 1 a 2 frases explicando o que foi detectado no relato, F3 ou Crash Log do usuário.',
          },
          steps: {
            type: Type.ARRAY,
            description: 'Lista com exatamente 3 passos práticos e diretos para corrigir o problema.',
            items: {
              type: Type.OBJECT,
              properties: {
                stepNumber: {
                  type: Type.INTEGER,
                  description: 'Número do passo (1, 2 ou 3).',
                },
                title: {
                  type: Type.STRING,
                  description: 'Título curto e direto da ação.',
                },
                action: {
                  type: Type.STRING,
                  description: 'Explicação prática e direta do que o usuário deve fazer.',
                },
                commandOrSetting: {
                  type: Type.STRING,
                  description:
                    'Argumento JVM, caminho no Windows, configuração de vídeo ou comando exato para copiar.',
                },
                expectedResult: {
                  type: Type.STRING,
                  description: 'Como o usuário confirma que este passo funcionou (ex: o que muda no F3 ou no FPS).',
                },
              },
              required: ['stepNumber', 'title', 'action', 'commandOrSetting', 'expectedResult'],
            },
          },
          quickTip: {
            type: Type.STRING,
            description: 'Uma dica extra curta para evitar que o problema volte a acontecer.',
          },
        },
        required: [
          'diagnosisTitle',
          'detectedBottleneck',
          'severity',
          'hardwareSummary',
          'steps',
          'quickTip',
        ],
      };

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema,
          },
        });
      } catch (modelErr: unknown) {
        const message = modelErr instanceof Error ? modelErr.message : String(modelErr);
        if (message.includes('404') || message.includes('NOT_FOUND')) {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: promptText,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: 'application/json',
              responseSchema,
            },
          });
        } else {
          throw modelErr;
        }
      }

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: unknown) {
      console.error('Erro na rota /api/doctor-fps:', error);
      const errMessage = error instanceof Error ? error.message : 'Erro desconhecido ao consultar a IA.';
      res.status(500).json({
        error: `Não foi possível concluir o diagnóstico agora: ${errMessage}`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CraftLab Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
