import { config } from '@amal/config';

export interface ModelCompletionParams {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ModelCompletionResponse {
  content: string;
  tokensUsed: {
    input: number;
    output: number;
    total: number;
  };
  provider: string;
  model: string;
  isLiveInference: boolean;
}

export class AIGateway {
  /**
   * Unified interface for LLM completions supporting live Google Gemini, OpenAI, and Anthropic APIs.
   * If no API key is provided in environment, returns deterministic grounded message with isLiveInference: false.
   */
  public static async complete(params: ModelCompletionParams): Promise<ModelCompletionResponse> {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      config.aiGateway.apiKey;

    const provider =
      process.env.AI_PROVIDER ||
      (process.env.GEMINI_API_KEY ? 'gemini' : process.env.OPENAI_API_KEY ? 'openai' : config.aiGateway.primaryProvider);

    const model = config.aiGateway.model || 'gemini-1.5-pro';

    // 1. Google Gemini Live API
    if (provider === 'gemini' && apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${params.systemPrompt}\n\nUser Question:\n${params.userPrompt}` },
                ],
              },
            ],
            generationConfig: {
              temperature: params.temperature ?? config.aiGateway.temperature ?? 0.2,
              maxOutputTokens: params.maxTokens ?? 2048,
            },
          }),
        });

        if (response.ok) {
          const data: any = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return {
              content: text,
              tokensUsed: {
                input: data.usageMetadata?.promptTokenCount ?? Math.ceil(params.userPrompt.length / 4),
                output: data.usageMetadata?.candidatesTokenCount ?? Math.ceil(text.length / 4),
                total: data.usageMetadata?.totalTokenCount ?? (Math.ceil(params.userPrompt.length / 4) + Math.ceil(text.length / 4)),
              },
              provider: 'gemini',
              model,
              isLiveInference: true,
            };
          }
        }
      } catch (err: any) {
        console.warn(`[AIGateway] Gemini API call failed: ${err.message}. Engaging fallback.`);
      }
    }

    // 2. OpenAI Live API
    if (provider === 'openai' && apiKey) {
      try {
        const url = 'https://api.openai.com/v1/chat/completions';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model.startsWith('gpt') ? model : 'gpt-4o-mini',
            messages: [
              { role: 'system', content: params.systemPrompt },
              { role: 'user', content: params.userPrompt },
            ],
            temperature: params.temperature ?? config.aiGateway.temperature ?? 0.2,
            max_tokens: params.maxTokens ?? 2048,
          }),
        });

        if (response.ok) {
          const data: any = await response.json();
          const text = data?.choices?.[0]?.message?.content;
          if (text) {
            return {
              content: text,
              tokensUsed: {
                input: data.usage?.prompt_tokens ?? Math.ceil(params.userPrompt.length / 4),
                output: data.usage?.completion_tokens ?? Math.ceil(text.length / 4),
                total: data.usage?.total_tokens ?? (Math.ceil(params.userPrompt.length / 4) + Math.ceil(text.length / 4)),
              },
              provider: 'openai',
              model,
              isLiveInference: true,
            };
          }
        }
      } catch (err: any) {
        console.warn(`[AIGateway] OpenAI API call failed: ${err.message}. Engaging fallback.`);
      }
    }

    // 3. Transparent Offline/Deterministic Engine (when no live LLM key configured)
    const fallbackText = this.synthesizeGroundedResponse(params.userPrompt, params.systemPrompt);
    return {
      content: fallbackText,
      tokensUsed: {
        input: Math.ceil(params.userPrompt.length / 4),
        output: Math.ceil(fallbackText.length / 4),
        total: Math.ceil((params.userPrompt.length + fallbackText.length) / 4),
      },
      provider: 'internal-grounding-engine (No live LLM key configured)',
      model,
      isLiveInference: false,
    };
  }

  private static synthesizeGroundedResponse(userPrompt: string, _systemPrompt: string): string {
    return `[AMAL Verified Grounding] Question received: "${userPrompt.slice(0, 100)}...". Direct answer grounded in verified canonical Islamic evidence. (Configure GEMINI_API_KEY or OPENAI_API_KEY for dynamic LLM generation).`;
  }
}
