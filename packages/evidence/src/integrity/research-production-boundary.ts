export interface ResearchMaterial {
  id: string;
  title: string;
  author: string;
  notes: string;
  candidateSources: string[];
  isApprovedForProduction: boolean;
  createdAt: string;
}

export class ResearchProductionBoundary {
  private static researchVault: Map<string, ResearchMaterial> = new Map();

  public static addResearchMaterial(material: {
    id: string;
    title: string;
    author: string;
    notes: string;
    candidateSources?: string[];
  }): ResearchMaterial {
    const item: ResearchMaterial = {
      id: material.id,
      title: material.title,
      author: material.author,
      notes: material.notes,
      candidateSources: material.candidateSources || [],
      isApprovedForProduction: false,
      createdAt: new Date().toISOString(),
    };
    this.researchVault.set(item.id, item);
    return item;
  }

  /**
   * Production Gate: Strict rejection of research items in production retrieval
   */
  public static assertProductionSafe(itemId: string): void {
    if (this.researchVault.has(itemId)) {
      const item = this.researchVault.get(itemId);
      if (!item?.isApprovedForProduction) {
        throw new Error(
          `RESEARCH_LEAKAGE_DETECTED: Material ${itemId} is unverified research material and cannot be queried in production.`
        );
      }
    }
  }

  /**
   * Export for authorized researchers, with mandatory watermark
   */
  public static exportForResearchers(itemId: string): {
    header: string;
    material?: ResearchMaterial;
  } {
    const mat = this.researchVault.get(itemId);
    return {
      header: '⚠️ UNVERIFIED RESEARCH MATERIAL — NOT FOR NORMATIVE ISLAMIC GUIDANCE ⚠️',
      material: mat,
    };
  }

  public static isResearchItem(id: string): boolean {
    return this.researchVault.has(id);
  }
}
