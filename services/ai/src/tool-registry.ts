import { AmalTool } from '@amal/types';

export class ToolRegistry {
  private static registry: Map<string, AmalTool> = new Map();

  static {
    // Read-only / Query tools
    this.register({
      name: 'search_islamic_evidence',
      description: 'Search verified Islamic evidence graph by keywords, concepts, and semantic embeddings.',
      inputSchema: { type: 'object', properties: { query: { type: 'string' }, limit: { type: 'number' } }, required: ['query'] },
      outputSchema: { type: 'object', properties: { passages: { type: 'array' } } },
      permissions: ['EVIDENCE_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'get_evidence_chain',
      description: 'Retrieve full 5-step provenance and lineage chain connecting practice to primary revelation.',
      inputSchema: { type: 'object', properties: { evidenceId: { type: 'string' } }, required: ['evidenceId'] },
      outputSchema: { type: 'object', properties: { chain: { type: 'array' } } },
      permissions: ['EVIDENCE_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'get_scholarly_positions',
      description: 'Retrieve classical scholarly disagreement and positions across the 4 major Sunni madhhabs.',
      inputSchema: { type: 'object', properties: { topicKey: { type: 'string' } }, required: ['topicKey'] },
      outputSchema: { type: 'object', properties: { positions: { type: 'array' } } },
      permissions: ['EVIDENCE_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'search_quran',
      description: 'Query canonical Quran Foundation Uthmani text with approved translations.',
      inputSchema: { type: 'object', properties: { surah: { type: 'number' }, ayah: { type: 'number' } } },
      outputSchema: { type: 'object', properties: { textArabic: { type: 'string' }, translation: { type: 'string' } } },
      permissions: ['QURAN_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'search_hadith',
      description: 'Lookup authentic Hadith collections (Bukhari, Muslim) with Isnad and verified grading.',
      inputSchema: { type: 'object', properties: { collection: { type: 'string' }, hadithNumber: { type: 'number' } } },
      outputSchema: { type: 'object', properties: { hadith: { type: 'object' } } },
      permissions: ['HADITH_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'get_user_context',
      description: 'Retrieve minimal authorized user preferences and routine without sensitive reflections.',
      inputSchema: { type: 'object', properties: { category: { type: 'string' } } },
      outputSchema: { type: 'object', properties: { context: { type: 'array' } } },
      permissions: ['CONTEXT_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'MEDIUM',
    });

    this.register({
      name: 'get_journey',
      description: 'Retrieve active user journey and day status.',
      inputSchema: { type: 'object', properties: { journeyId: { type: 'string' } }, required: ['journeyId'] },
      outputSchema: { type: 'object', properties: { journey: { type: 'object' } } },
      permissions: ['JOURNEY_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    this.register({
      name: 'recommend_amal',
      description: 'Rank candidate micro-deeds against current goal, available time, and friction.',
      inputSchema: { type: 'object', properties: { goalId: { type: 'string' }, availableMinutes: { type: 'number' } } },
      outputSchema: { type: 'object', properties: { recommendations: { type: 'array' } } },
      permissions: ['AMAL_READ'],
      requiresUserConsent: false,
      sideEffect: false,
      auditLevel: 'LOW',
    });

    // Side-Effect Tools (Strictly Require Consent & High Audit)
    this.register({
      name: 'complete_amal',
      description: 'Record completion status for a scheduled Amal action (FULL, PARTIAL, MINIMUM).',
      inputSchema: { type: 'object', properties: { amalId: { type: 'string' }, actualMinutes: { type: 'number' } }, required: ['amalId', 'actualMinutes'] },
      outputSchema: { type: 'object', properties: { record: { type: 'object' } } },
      permissions: ['AMAL_WRITE'],
      requiresUserConsent: true,
      sideEffect: true,
      auditLevel: 'HIGH',
    });

    this.register({
      name: 'create_goal',
      description: 'Create a new personal worship or habit goal with non-judgmental baseline.',
      inputSchema: { type: 'object', properties: { title: { type: 'string' }, targetMinutes: { type: 'number' } }, required: ['title'] },
      outputSchema: { type: 'object', properties: { goal: { type: 'object' } } },
      permissions: ['GOAL_WRITE'],
      requiresUserConsent: true,
      sideEffect: true,
      auditLevel: 'HIGH',
    });

    this.register({
      name: 'start_journey',
      description: 'Instantiate and activate a canonical evidence-backed journey curriculum.',
      inputSchema: { type: 'object', properties: { journeyType: { type: 'string' } }, required: ['journeyType'] },
      outputSchema: { type: 'object', properties: { journeyId: { type: 'string' } } },
      permissions: ['JOURNEY_WRITE'],
      requiresUserConsent: true,
      sideEffect: true,
      auditLevel: 'HIGH',
    });

    this.register({
      name: 'create_scholar_case',
      description: 'Package structured inquiry for human resident scholar pastoral triage.',
      inputSchema: { type: 'object', properties: { question: { type: 'string' }, context: { type: 'string' } }, required: ['question'] },
      outputSchema: { type: 'object', properties: { caseId: { type: 'string' } } },
      permissions: ['SCHOLAR_CASE_WRITE'],
      requiresUserConsent: true,
      sideEffect: true,
      auditLevel: 'HIGH',
    });

    this.register({
      name: 'update_preference',
      description: 'Update user notification or calculation method preferences.',
      inputSchema: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' } }, required: ['key', 'value'] },
      outputSchema: { type: 'object', properties: { success: { type: 'boolean' } } },
      permissions: ['USER_WRITE'],
      requiresUserConsent: true,
      sideEffect: true,
      auditLevel: 'HIGH',
    });
  }

  public static register(tool: AmalTool): void {
    this.registry.set(tool.name, tool);
  }

  public static get(name: string): AmalTool | undefined {
    return this.registry.get(name);
  }

  public static getAll(): AmalTool[] {
    return Array.from(this.registry.values());
  }

  public static validateCall(name: string, isUserConsented: boolean): { allowed: boolean; reason?: string } {
    const tool = this.registry.get(name);
    if (!tool) {
      return { allowed: false, reason: `Tool '${name}' is not registered in AMAL Tool Registry.` };
    }
    if (tool.sideEffect && tool.requiresUserConsent && !isUserConsented) {
      return { allowed: false, reason: `Tool '${name}' triggers state side-effects and requires explicit user consent.` };
    }
    return { allowed: true };
  }
}
