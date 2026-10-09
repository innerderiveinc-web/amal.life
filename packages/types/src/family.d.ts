export type FamilyRole = 'OWNER' | 'ADULT_MEMBER' | 'TEEN' | 'CHILD';
export interface Family {
    id: string;
    name: string;
    inviteCode: string;
    createdById: string;
    createdAt: string;
    updatedAt: string;
}
export interface FamilyMember {
    id: string;
    familyId: string;
    userId: string;
    displayName: string;
    role: FamilyRole;
    joinedAt: string;
}
export interface FamilyJourney {
    id: string;
    familyId: string;
    title: string;
    goal: string;
    totalDays: number;
    currentDay: number;
    aggregateCompletedActions: number;
    totalTargetActions: number;
    sharedActivityDescription: string;
    createdAt: string;
}
export interface FamilyActivity {
    id: string;
    familyJourneyId: string;
    dayNumber: number;
    title: string;
    familyPrompt: string;
    discussionQuestion: string;
    completedMemberUserIds: string[];
}
//# sourceMappingURL=family.d.ts.map