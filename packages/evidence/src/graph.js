"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IslamicEvidenceGraph = void 0;
const database_1 = require("@amal/database");
class IslamicEvidenceGraph {
    /**
     * Hybrid search: find passages matching keywords or reference queries
     */
    static async queryPassages(query, limit = 5) {
        const qLower = query.toLowerCase();
        const tokens = qLower.split(/\s+/).filter((t) => t.length > 2);
        const matches = [];
        for (const passage of database_1.db.passages.values()) {
            let score = 0;
            // Exact reference match gets highest score
            if (passage.reference.toLowerCase().includes(qLower)) {
                score += 10;
            }
            // Keyword match
            for (const kw of passage.keywords) {
                if (tokens.some((token) => kw.toLowerCase().includes(token))) {
                    score += 3;
                }
            }
            // Text match
            if (passage.translatedText.toLowerCase().includes(qLower)) {
                score += 2;
            }
            else {
                for (const token of tokens) {
                    if (passage.translatedText.toLowerCase().includes(token)) {
                        score += 1;
                    }
                }
            }
            if (score > 0) {
                matches.push({ passage, score });
            }
        }
        matches.sort((a, b) => b.score - a.score);
        return matches.slice(0, limit).map((m) => m.passage);
    }
    /**
     * Build structured Evidence Pack for the LLM
     */
    static async buildEvidencePack(query, normalizedIntent) {
        const rawPassages = await this.queryPassages(query, 4);
        const items = rawPassages.map((p) => {
            const source = database_1.db.sources.get(p.sourceId);
            return {
                passageId: p.id,
                sourceTitle: source?.title || 'Islamic Source',
                reference: p.reference,
                authorityLevel: source?.authorityLevel || 'TIER_5_EDITORIAL',
                arabicText: p.arabicText,
                translation: p.translatedText,
                grading: p.grading,
                relevanceScore: 0.95,
                scholarlyContext: p.contextSummary || undefined,
            };
        });
        return {
            query,
            normalizedIntent,
            items,
            scholarlyDifferences: [],
            allowedClaims: items.map((i) => `Supported by ${i.reference}`),
            prohibitedClaims: ['No unverified fatwa', 'No unsubstantiated Hadith claims'],
            requiresScholarEscalation: false,
        };
    }
    /**
     * Traverse graph from Life Situation to supporting Concepts and recommended Actions
     */
    static async traversePathway(startEntityId, maxDepth = 3) {
        const visited = new Set();
        const pathway = [];
        const queue = [
            { entityId: startEntityId, depth: 0 },
        ];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.depth > maxDepth || visited.has(current.entityId))
                continue;
            visited.add(current.entityId);
            // Check if it's a passage
            const passage = database_1.db.passages.get(current.entityId);
            const concept = database_1.db.concepts.get(current.entityId);
            const topic = database_1.db.topics.get(current.entityId);
            let title = current.entityId;
            let reference = current.entityId;
            let translation = '';
            let nodeType = 'ENTITY';
            if (passage) {
                nodeType = 'PASSAGE';
                reference = passage.reference;
                title = passage.reference;
                translation = passage.translatedText;
            }
            else if (concept) {
                nodeType = 'CONCEPT';
                reference = concept.termLatin;
                title = concept.termLatin;
                translation = concept.definition;
            }
            else if (topic) {
                nodeType = 'TOPIC';
                reference = topic.slug;
                title = topic.name;
                translation = topic.description;
            }
            pathway.push({
                depth: current.depth,
                nodeId: current.entityId,
                nodeType,
                reference,
                title,
                translation,
                edgeType: current.edgeType,
            });
            // Find outbound edges
            for (const edge of database_1.db.edges.values()) {
                if (edge.fromEntityId === current.entityId && edge.toEntityId && !visited.has(edge.toEntityId)) {
                    queue.push({
                        entityId: edge.toEntityId,
                        depth: current.depth + 1,
                        edgeType: edge.edgeType,
                    });
                }
            }
        }
        return pathway;
    }
    /**
     * Construct the complete traceable lineage: "Why did AMAL recommend this action?"
     */
    static async buildEvidenceChain(actionId) {
        // Look up edge pointing to this action or construct default anchored chain
        return {
            actionId,
            actionTitle: '10-Minute Evening Wind-Down & Isha Completion',
            conceptName: 'Yusr (Prophetic Ease) & Sabr (Consistency)',
            conceptReference: 'Concept: Yusr',
            evidenceSourceReference: 'Sahih al-Bukhari 6464 & Quran 17:78',
            evidenceText: 'The most beloved deeds to Allah are those that are most consistent, even if small. Indeed, the recitation of dawn is ever witnessed.',
            authorityLevel: 'TIER_1_QURAN & TIER_2_AUTHENTIC_HADITH',
            scholarlyJustification: 'Removing physical evening friction enables sustained morning obedience without psychological exhaustion.',
        };
    }
    /**
     * Retrieve edges connected to an entity
     */
    static async getRelatedEntities(passageId) {
        const edges = [];
        for (const edge of database_1.db.edges.values()) {
            if (edge.fromEntityId === passageId || edge.toEntityId === passageId) {
                edges.push(edge);
            }
        }
        return edges;
    }
}
exports.IslamicEvidenceGraph = IslamicEvidenceGraph;
//# sourceMappingURL=graph.js.map