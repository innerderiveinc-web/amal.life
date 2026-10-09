/**
 * AMAL OS — V2.0: LIFE OS SERVICE
 * Orchestrates multi-domain life intelligence, decision support, expert escalation,
 * specialized modes, and cross-domain dashboard.
 */

import { Injectable } from '@nestjs/common';
import {
  LifeDomain,
  LifeSituationClassification,
  LifeDecisionRecord,
  ExpertProfile,
  ExpertConsultationCase,
  RamadanModeConfig,
  HajjUmrahModeConfig,
  TravelModeConfig,
  PersonalLifeGraphNode,
} from '@amal/types';
import {
  LifeSituationEngine,
  LifeDecisionSupportEngine,
  ExpertEscalationFrameworkV2,
  SpecializedModesEngine,
  PersonalLifeGraphEngine,
  PersonalizationEngine,
} from '@amal/amal-engine';

@Injectable()
export class LifeOsService {
  public classifySituation(userId: string, text: string): LifeSituationClassification {
    return LifeSituationEngine.classifySituation(userId, text);
  }

  public getSupportedDomains(): LifeDomain[] {
    return [
      'DEEN',
      'WORK',
      'STUDY',
      'FAMILY',
      'CHARACTER',
      'TIME',
      'KNOWLEDGE',
      'RAMADAN',
      'MARRIAGE_PREPARATION',
      'FINANCE',
      'TRAVEL',
      'HAJJ',
      'UMRAH',
      'COMMUNITY',
      'SERVICE',
      'PERSONAL_GROWTH',
    ];
  }

  public getLifeDashboard(userId: string) {
    const activePreferences = PersonalizationEngine.getPreferences(userId);
    const nodes = PersonalLifeGraphEngine.getNodesByDomain(userId, 'DEEN');
    const decisions = LifeDecisionSupportEngine.getDecisions(userId);
    const ramadan = SpecializedModesEngine.getRamadanConfig(userId);

    return {
      today: {
        date: new Date().toISOString().split('T')[0],
        prayerAwareSchedule: [
          { time: '05:30', event: 'Fajr & 5m Quran Recitation', domain: 'DEEN' },
          { time: '09:00', event: 'High-Focus Deep Work Block', domain: 'WORK' },
          { time: '13:30', event: 'Dhuhr Prayer & Rest Window', domain: 'DEEN' },
          { time: '17:00', event: 'Study Revision Block', domain: 'STUDY' },
          { time: '19:30', event: 'Maghrib & Family Dinner', domain: 'FAMILY' },
          { time: '21:00', event: 'Isha Prayer & Evening Muhasabah', domain: 'DEEN' },
        ],
        activeGoalsCount: 4,
        dailyBurdenMinutes: 35,
        overloadStatus: 'OPTIMAL',
      },
      domainsOverview: {
        deen: { status: 'ACTIVE', primaryFocus: 'Fajr consistency & Quran', nodeCount: nodes.length },
        work: { status: 'ACTIVE', focusBlockMinutes: 150 },
        study: { status: 'ACTIVE', examPacingDaysRemaining: 12 },
        family: { status: 'ACTIVE', sharedGoalsCount: 1 },
      },
      activeDecisionsCount: decisions.length,
      specializedModesActive: {
        ramadan: ramadan.active,
        travel: false,
        hajjUmrah: false,
      },
    };
  }

  // Decision Support
  public createDecision(
    userId: string,
    question: string,
    category: LifeDomain,
    options: any[],
    constraints: string[],
    evidence: any[] = []
  ): LifeDecisionRecord {
    LifeDecisionSupportEngine.assertAutonomousDecisionRestricted(category);
    return LifeDecisionSupportEngine.createDecisionDraft(userId, question, category, options, constraints, evidence);
  }

  public recordDecisionChoice(userId: string, decisionId: string, chosenOptionId: string, reflection?: string) {
    return LifeDecisionSupportEngine.recordUserChoice(userId, decisionId, chosenOptionId, reflection);
  }

  public getDecisions(userId: string): LifeDecisionRecord[] {
    return LifeDecisionSupportEngine.getDecisions(userId);
  }

  // Expert Escalation V2
  public listExperts(type?: string): ExpertProfile[] {
    return ExpertEscalationFrameworkV2.listExperts(type);
  }

  public submitExpertCase(
    userId: string,
    expertType: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT',
    domain: LifeDomain,
    question: string,
    anonymizedContext: Record<string, any>
  ): ExpertConsultationCase {
    ExpertEscalationFrameworkV2.assertExpertAuthorityScope(expertType, question);
    return ExpertEscalationFrameworkV2.submitCase(userId, expertType, domain, question, anonymizedContext);
  }

  // Specialized Modes
  public getRamadanConfig(userId: string): RamadanModeConfig {
    return SpecializedModesEngine.getRamadanConfig(userId);
  }

  public updateRamadanConfig(userId: string, updates: Partial<RamadanModeConfig>): RamadanModeConfig {
    return SpecializedModesEngine.updateRamadanConfig(userId, updates);
  }

  public getHajjUmrahConfig(userId: string): HajjUmrahModeConfig {
    return SpecializedModesEngine.getHajjUmrahConfig(userId);
  }

  public updateHajjUmrahConfig(userId: string, updates: Partial<HajjUmrahModeConfig>): HajjUmrahModeConfig {
    return SpecializedModesEngine.updateHajjUmrahConfig(userId, updates);
  }

  public getTravelConfig(userId: string): TravelModeConfig {
    return SpecializedModesEngine.getTravelConfig(userId);
  }

  public updateTravelConfig(userId: string, updates: Partial<TravelModeConfig>): TravelModeConfig {
    return SpecializedModesEngine.updateTravelConfig(userId, updates);
  }

  public evaluateTravelSafar(distanceKm: number) {
    return SpecializedModesEngine.evaluateTravelEligibility(distanceKm);
  }

  // Personal Life Graph
  public addLifeGraphNode(userId: string, node: any): PersonalLifeGraphNode {
    return PersonalLifeGraphEngine.addNode(userId, node);
  }

  public getLifeGraphNodes(userId: string, domain: LifeDomain): PersonalLifeGraphNode[] {
    return PersonalLifeGraphEngine.getNodesByDomain(userId, domain);
  }

  public assertTwoGraphIsolation(source: string, target: string): void {
    PersonalLifeGraphEngine.assertGraphIsolation(source, target);
  }

  public assertNoAutonomousDecision(domainOrAction: string): void {
    LifeDecisionSupportEngine.assertAutonomousDecisionRestricted(domainOrAction);
  }
}
