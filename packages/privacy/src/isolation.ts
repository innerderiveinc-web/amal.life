export class FamilyIsolationGuard {
  /**
   * Enforces zero leakage of adult personal reflections and private AI queries to family members.
   */
  public static canAccessResource(
    requestingUserId: string,
    ownerUserId: string,
    resourceType: 'SHARED_CHALLENGE' | 'PUBLIC_MILESTONE' | 'PRIVATE_REFLECTION' | 'AI_CHAT'
  ): boolean {
    if (requestingUserId === ownerUserId) return true;

    // Strict boundary: Reflections and AI chats are strictly isolated to the resource owner
    if (resourceType === 'PRIVATE_REFLECTION' || resourceType === 'AI_CHAT') {
      return false;
    }

    return true;
  }
}
