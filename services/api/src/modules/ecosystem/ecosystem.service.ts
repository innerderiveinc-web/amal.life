/**
 * AMAL OS V3.0 — Ecosystem Platform Domain Service
 * Integrates Tenant Isolation, Scholar OS, Family OS, Institution OS, Knowledge Platform, API & Partners.
 */

import {
  EcosystemApiEngine,
  FamilyWorkspaceEngineV2,
  InstitutionWorkspaceEngine,
  KnowledgePlatformEngineV3,
  MadhhabNeutralityEngine,
  PlatformGovernanceEngine,
  ScholarWorkspaceEngineV2,
  TenantIsolationManager,
  UniversalKnowledgeEngine,
  LegacyContinuityEngine,
  CommunityUmmahEngine,
  ScholarGovernanceEngine,
  SpiritualHeritageEngine,
  KnowledgeProductionFactoryEngine,
  KnowledgeAcquisitionProgramEngine,
  UniversalMasterCatalogueEngine,
  GlobalHeritageAtlasEngine,
  TrustMethodologyCenterEngine,
  SirahShamailKnowledgeEngine
} from '@amal/amal-engine';
import {
  ApiClientRecord,
  ApiScope,
  ComparativeFiqhCase,
  FamilyRoleV2,
  FamilyShareRecordV2,
  GlobalSafeModeState,
  InstitutionAggregateAnalytics,
  EcosystemInstitutionProgram,
  KillSwitchRecord,
  KillSwitchType,
  EcosystemKnowledgeRelease,
  MadhhabFoundation,
  OAuthTokenGrant,
  PersonalScholarlyPreferences,
  RenderedFiqhResponse,
  ScholarAppealV2,
  ScholarCaseV2,
  ScholarDisagreementIssue,
  ScholarKnowledgeProposal,
  ScholarProfileV2,
  SourceCard,
  SourceRegistryV3,
  SourceVerificationProfile,
  StructuredAnswerResponse,
  SunniSchool,
  Tenant,
  UniversalBenchmarkMetrics,
  UniversalScholarlyDisagreement,
  UserDeenProfile,
  WebhookSubscriptionRecord,
  MasterSourceCatalogueEntry,
  MasterCatalogueSummary,
  KnowledgeCoverageDashboard,
  KnowledgeDebtReport,
  IngestionJob,
  OriginalArtifact,
  SourceIdentityCheck,
  ProvenanceChainRecord,
  LicenseVerificationRecord,
  KnowledgePassage,
  ExtractedKnowledgeClaim,
  ReferenceVerificationCheck,
  ScholarReviewRecord,
  ScholarlyDispute,
  IngestionQualityScorecard,
  KnowledgeObject,
  EmergencyRevocationRecord,
  IntakeMethod,
  KnowledgeDomain,
  QuranAyahMultilingualView,
  TranslationQueryResponse,
  TafsirQueryResponse,
  MultilingualCorpusSummary,
  DecoupledUserPreferences,
  LanguageRecord,
  QuranSurahMaster,
  QuranAyahMaster,
  TranslationWorkRecord,
  TranslationPassageRecord,
  TafsirWorkRecord,
  MasterTafsirPassageRecord,
  MasterAIResponseContract,
  ClaimAuditorResult,
  MasterKnowledgeReleaseRecord,
  MultilingualEvidenceQuery,
  LegacySpaceRecord,
  LegacyItemRecord,
  LegacyCollectionRecord,
  LegacyReleaseRecord,
  LegacyReleaseStatus,
  FutureRecipientRecord,
  LegacyInstructionsRecord,
  LegacyAudioMessageRecord,
  LegacyLetterRecord,
  LegacyAuditLogRecord,
  ExportArchiveRecord,
  ChildAccountProfile,
  ChildAgeBand,
  FamilySharedJourney,
  FamilyMemberAmalPlan,
  FamilyTodayDashboardView,
  FamilyRole,
  CommunityOrganization,
  CommunityOrganizationType,
  OrganizationVerificationStatus,
  CommunityProgram,
  CommunityProgramType,
  CommunityEvent,
  CommunityGroup,
  CommunityGroupType,
  CommunityServiceOpportunity,
  ServiceOpportunityType,
  CommunityReportRecord,
  CommunityReportCategory,
  CommunityResource,
  CommunityDiscoveryQuery,
  CommunityVolunteerMatchingQuery,
  MosqueProfile,
  TrustPolicySlug
} from '@amal/types';
import {
  PilotSourceCatalogueRegistry,
  MultilingualCorpusRegistry,
  UniversalMultilingualKnowledgeEngine
} from '@amal/evidence';
import { ScholarlyIngestionEngine } from '@amal/service-content-ingestion';

export class EcosystemService {
  private tenantManager = new TenantIsolationManager();
  private scholarEngine = new ScholarWorkspaceEngineV2();
  private familyEngine = new FamilyWorkspaceEngineV2();
  private institutionEngine = new InstitutionWorkspaceEngine();
  private knowledgeEngine = new KnowledgePlatformEngineV3();
  private apiEngine = new EcosystemApiEngine();
  private governanceEngine = new PlatformGovernanceEngine();
  private neutralityEngine = new MadhhabNeutralityEngine();
  private universalKnowledgeEngine = new UniversalKnowledgeEngine();
  private scholarlyIngestionEngine = new ScholarlyIngestionEngine();
  private universalMultilingualEngine = new UniversalMultilingualKnowledgeEngine();
  private legacyEngine = new LegacyContinuityEngine();
  private communityEngine = new CommunityUmmahEngine();
  private scholarGovernanceEngine = new ScholarGovernanceEngine();
  private spiritualHeritageEngine = new SpiritualHeritageEngine();
  private knowledgeProductionFactory = new KnowledgeProductionFactoryEngine();
  private acquisitionProgram = new KnowledgeAcquisitionProgramEngine();
  private masterCatalogue = new UniversalMasterCatalogueEngine();
  private globalAtlasEngine = new GlobalHeritageAtlasEngine(this.masterCatalogue);
  private trustCenter = new TrustMethodologyCenterEngine(this.masterCatalogue, this.globalAtlasEngine);
  private sirahEngine = new SirahShamailKnowledgeEngine(this.masterCatalogue, this.globalAtlasEngine);

  // --- TENANCY & ISOLATION ---
  public getTenant(tenantId: string): Tenant | undefined {
    return this.tenantManager.getTenant(tenantId);
  }

  public assertTenantAccess(userId: string, tenantId: string, operation: string): void {
    this.tenantManager.assertTenantBoundary(userId, tenantId, operation);
  }

  // --- SCHOLAR OS V2 ---
  public getScholarProfile(scholarId: string): ScholarProfileV2 | undefined {
    return this.scholarEngine.getScholarProfile(scholarId);
  }

  public createScholarCase(params: {
    userId: string;
    tenantId: string;
    category: string;
    urgency?: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
    userQuestion: string;
    evidenceRefIds?: string[];
  }): ScholarCaseV2 {
    this.governanceEngine.assertFeatureAvailabilityInCurrentMode('SCHOLAR_CASE_CREATION');
    return this.scholarEngine.createCase(params);
  }

  public respondWithTwoScholarRule(params: {
    caseId: string;
    primaryScholarId: string;
    secondaryScholarId: string;
    responseContent: string;
  }): ScholarCaseV2 {
    return this.scholarEngine.submitResponseWithTwoScholarRule(params);
  }

  public getDisagreementIssue(issueId: string): ScholarDisagreementIssue | undefined {
    return this.scholarEngine.getDisagreementIssue(issueId);
  }

  public appealScholarCase(params: {
    caseId: string;
    userId: string;
    reason: string;
    newSecondaryScholarId: string;
  }): ScholarAppealV2 {
    return this.scholarEngine.submitAppeal(params);
  }

  public proposeKnowledgeContribution(params: {
    scholarId: string;
    proposalType: 'SOURCE' | 'CLAIM' | 'INTERPRETATION' | 'CORRECTION';
    content: Record<string, unknown>;
  }): ScholarKnowledgeProposal {
    return this.scholarEngine.submitKnowledgeProposal(params);
  }

  // --- FAMILY OS V2 ---
  public createFamilyShare(params: {
    familyTenantId: string;
    ownerId: string;
    resourceType: 'SHARED_GOAL' | 'SHARED_JOURNEY' | 'SCHEDULE' | 'PROJECT';
    resourceId: string;
    sharedWithUserId: string;
    permission: 'READ' | 'CONTRIBUTE';
    purpose: string;
  }): FamilyShareRecordV2 {
    return this.familyEngine.createShare(params);
  }

  public revokeFamilyShare(shareId: string, requestorUserId: string): boolean {
    return this.familyEngine.revokeShare(shareId, requestorUserId);
  }

  public assertFamilyBoundary(params: {
    requestorUserId: string;
    ownerUserId: string;
    resourceType: string;
    userRole: FamilyRoleV2;
  }): void {
    this.familyEngine.assertFamilyResourceAccess(params);
  }

  // --- INSTITUTION OS ---
  public createInstitutionProgram(params: {
    institutionTenantId: string;
    title: string;
    domain: string;
    description: string;
  }): EcosystemInstitutionProgram {
    return this.institutionEngine.createProgram(params);
  }

  public enrollInProgram(programId: string, userId: string): void {
    this.institutionEngine.enrollUser(programId, userId);
  }

  public completeProgram(programId: string, userId: string): void {
    this.institutionEngine.recordCompletion(programId, userId);
  }

  public getInstitutionAnalytics(institutionTenantId: string, programId: string): InstitutionAggregateAnalytics {
    return this.institutionEngine.getAggregateAnalytics(institutionTenantId, programId);
  }

  public assertInstitutionPrivacy(requestorRole: string, targetResource: string): void {
    this.institutionEngine.assertInstitutionPrivacyBoundary(requestorRole, targetResource);
  }

  // --- KNOWLEDGE PLATFORM V3 ---
  public getActiveKnowledgeRelease(): EcosystemKnowledgeRelease {
    return this.knowledgeEngine.getActiveRelease();
  }

  public promoteKnowledgeRelease(releaseId: string): EcosystemKnowledgeRelease {
    return this.knowledgeEngine.promoteRelease(releaseId);
  }

  public rollbackKnowledgeRelease(targetReleaseId: string, reason: string): EcosystemKnowledgeRelease {
    return this.knowledgeEngine.rollbackToPreviousRelease(targetReleaseId, reason);
  }

  public assertKnowledgeLock(triggerSource: string): void {
    this.knowledgeEngine.assertGlobalKnowledgeLock(triggerSource);
  }

  public getKnowledgeSource(sourceId: string): SourceRegistryV3 | undefined {
    return this.knowledgeEngine.getSource(sourceId);
  }

  // --- API PLATFORM & PARTNERS ---
  public registerApiClient(params: {
    clientId: string;
    partnerId: string;
    appName: string;
    scopes: ApiScope[];
    rateLimitRpm?: number;
  }): ApiClientRecord {
    return this.apiEngine.registerApiClient(params);
  }

  public issueOAuthToken(params: {
    clientId: string;
    userId: string;
    requestedScopes: ApiScope[];
  }): OAuthTokenGrant {
    return this.apiEngine.issueOAuthToken(params);
  }

  public assertApiScope(accessToken: string, requiredScope: ApiScope): OAuthTokenGrant {
    return this.apiEngine.assertApiScope(accessToken, requiredScope);
  }

  public registerWebhook(params: {
    subscriptionId: string;
    clientId: string;
    targetUrl: string;
    eventTypes: ('journey.started' | 'journey.completed' | 'amal.completed')[];
    secret: string;
  }): WebhookSubscriptionRecord {
    return this.apiEngine.registerWebhook(params);
  }

  public signWebhookPayload(payload: string, secret: string): string {
    return this.apiEngine.signWebhookPayload(payload, secret);
  }

  public verifyWebhookEvent(params: {
    eventId: string;
    payload: string;
    receivedSignature: string;
    secret: string;
  }): boolean {
    return this.apiEngine.verifyAndConsumeWebhookEvent(params);
  }

  public suspendPartner(partnerId: string, reason: string): void {
    this.apiEngine.suspendPartner(partnerId, reason);
  }

  public assertPartnerProhibitedActivity(action: string): void {
    this.apiEngine.assertPartnerProhibitedActivity(action);
  }

  public getSandboxData(): Record<string, unknown> {
    return this.apiEngine.generateSandboxDataset();
  }

  // --- GOVERNANCE & GLOBAL SAFE MODE ---
  public triggerKillSwitch(params: {
    targetId: string;
    switchType: KillSwitchType;
    reason: string;
    triggeredBy: string;
  }): KillSwitchRecord {
    return this.governanceEngine.activateKillSwitch(params);
  }

  public enableGlobalSafeMode(reason: string, triggeredBy: string): GlobalSafeModeState {
    return this.governanceEngine.enableGlobalSafeMode(reason, triggeredBy);
  }

  public disableGlobalSafeMode(): GlobalSafeModeState {
    return this.governanceEngine.disableGlobalSafeMode();
  }

  public getSafeModeState(): GlobalSafeModeState {
    return this.governanceEngine.getSafeModeState();
  }

  // --- UNIVERSAL KNOWLEDGE & MADHHAB NEUTRALITY ---
  public getAllMadhhabFoundations(): MadhhabFoundation[] {
    return this.neutralityEngine.getAllFoundations();
  }

  public getMadhhabFoundation(school: SunniSchool): MadhhabFoundation | undefined {
    return this.neutralityEngine.getMadhhabFoundation(school);
  }

  public getComparativeFiqhCase(caseId: string): ComparativeFiqhCase | undefined {
    return this.neutralityEngine.getComparativeCase(caseId);
  }

  public renderFiqhGuidance(caseId: string, preferences: PersonalScholarlyPreferences): RenderedFiqhResponse {
    return this.neutralityEngine.renderFiqhGuidance(caseId, preferences);
  }

  public assertMadhhabNeutrality(rankingAttempt: { favoredSchool: string; reason: string }): void {
    this.neutralityEngine.assertMadhhabNeutrality(rankingAttempt);
  }

  public assertEvidenceImmutability(operation: {
    userPreferenceModified: string;
    targetPayload: 'QURAN_TEXT' | 'HADITH_CANON' | 'SCHOLAR_ATTRIBUTION' | 'HISTORICAL_FACT';
  }): void {
    this.neutralityEngine.assertEvidenceImmutability(operation);
  }

  public assertEpistemicSeparation(item: { text: string; claimedCategory: any }): void {
    this.neutralityEngine.assertEpistemicSeparation(item);
  }

  // --- UNIVERSAL KNOWLEDGE PLATFORM & SPECIFICATION ---
  public getUniversalSourceCard(sourceId: string): SourceCard {
    return this.universalKnowledgeEngine.getSourceCard(sourceId);
  }

  public getUniversalDisagreement(disagreementId: string): UniversalScholarlyDisagreement | undefined {
    return this.universalKnowledgeEngine.getDisagreement(disagreementId);
  }

  public resolveUniversalAnswer(disagreementId: string, profile: UserDeenProfile): StructuredAnswerResponse {
    return this.universalKnowledgeEngine.resolveStructuredAnswer(disagreementId, profile);
  }

  public assertMadhhabAttribution(statement: { claim: string; attributedTo: string; isConsensus: boolean }): void {
    this.universalKnowledgeEngine.assertMadhhabAttribution(statement);
  }

  public assertPreferenceFirewall(operation: {
    preferenceKey: string;
    action: 'SUPPRESS_DISAGREEMENT' | 'MODIFY_CITATION' | 'RELABEL_HADITH_GRADING' | 'CONVERT_OPINION_TO_CONSENSUS';
  }): void {
    this.universalKnowledgeEngine.assertPreferenceFirewall(operation);
  }

  public assertPublicationGates(profile: SourceVerificationProfile): void {
    this.universalKnowledgeEngine.assertPublicationGates(profile);
  }

  public runUniversalBenchmark(): UniversalBenchmarkMetrics {
    return this.universalKnowledgeEngine.runUniversalBenchmark();
  }

  // --- MASTER SOURCE CATALOGUE ---
  public getMasterSourceCatalogue(domain?: string, school?: string): MasterSourceCatalogueEntry[] {
    if (domain) return PilotSourceCatalogueRegistry.getEntriesByDomain(domain);
    if (school) return PilotSourceCatalogueRegistry.getEntriesBySchool(school);
    return PilotSourceCatalogueRegistry.getAllEntries();
  }

  public getMasterSourceCatalogueEntry(catalogId: string): MasterSourceCatalogueEntry | undefined {
    return PilotSourceCatalogueRegistry.getEntry(catalogId);
  }

  public getMasterSourceCatalogueSummary(): MasterCatalogueSummary {
    return PilotSourceCatalogueRegistry.getSummary();
  }

  public getKnowledgeCoverageDashboard(): KnowledgeCoverageDashboard {
    return PilotSourceCatalogueRegistry.getCoverageDashboard();
  }

  public getKnowledgeDebtReport(): KnowledgeDebtReport {
    return PilotSourceCatalogueRegistry.getKnowledgeDebtReport();
  }

  public generateReleaseManifest(releaseTag: string) {
    return PilotSourceCatalogueRegistry.generateReleaseManifest(releaseTag);
  }

  // --- KNOWLEDGE INGESTION & SCHOLARLY REVIEW ENGINE ---
  public createIngestionJob(params: {
    sourceId: string;
    fileName: string;
    rawBytes: Buffer;
    acquisitionMethod: IntakeMethod;
    submittedBy: string;
    declaredMetadata: Record<string, any>;
    licenseRecordId: string;
  }): { job: IngestionJob; artifact: OriginalArtifact } {
    return this.scholarlyIngestionEngine.createIngestionJob(params);
  }

  public verifySourceIdentity(sourceId: string, metadata: {
    author: string;
    title: string;
    edition: string;
    publisher: string;
    year: number;
    crossCheckCatalog?: string;
  }): SourceIdentityCheck {
    return this.scholarlyIngestionEngine.verifySourceIdentity(sourceId, metadata);
  }

  public recordProvenance(params: {
    sourceId: string;
    originRepository: string;
    acquiredFrom: string;
    publisher: string;
    edition: string;
    artifactSha256: string;
    links: {
      claimId?: string;
      passageId?: string;
      pageLocator?: string;
      editionId?: string;
      workId?: string;
      authorId?: string;
    };
  }): ProvenanceChainRecord {
    return this.scholarlyIngestionEngine.registerProvenanceChain(params);
  }

  public verifyLicense(params: {
    sourceId: string;
    licenseType: any;
    rights: {
      storage: boolean;
      display: boolean;
      redistribution: boolean;
      commercialUse: boolean;
      aiProcessing: boolean;
      translationRights: boolean;
      derivativeRights: boolean;
    };
    jurisdiction?: string;
  }): LicenseVerificationRecord {
    return this.scholarlyIngestionEngine.verifyLicense(params);
  }

  public createPassage(passage: KnowledgePassage): KnowledgePassage {
    return this.scholarlyIngestionEngine.segmentPassage(passage);
  }

  public extractClaim(claim: ExtractedKnowledgeClaim): ExtractedKnowledgeClaim {
    return this.scholarlyIngestionEngine.extractClaim(claim);
  }

  public verifyReference(check: ReferenceVerificationCheck): ReferenceVerificationCheck {
    return this.scholarlyIngestionEngine.verifyReference(check);
  }

  public submitScholarReview(review: ScholarReviewRecord): ScholarReviewRecord {
    return this.scholarlyIngestionEngine.submitScholarReview(review);
  }

  public registerDispute(dispute: ScholarlyDispute): ScholarlyDispute {
    return this.scholarlyIngestionEngine.registerDispute(dispute);
  }

  public evaluateQualityScorecard(sourceId: string): IngestionQualityScorecard {
    return this.scholarlyIngestionEngine.evaluateQualityScorecard(sourceId);
  }

  public publishKnowledgeObject(obj: KnowledgeObject): KnowledgeObject {
    return this.scholarlyIngestionEngine.publishKnowledgeObject(obj);
  }

  public revokeKnowledge(params: {
    targetType: 'SOURCE' | 'CLAIM' | 'PASSAGE' | 'TRANSLATION' | 'RELEASE';
    targetId: string;
    reason: string;
    revokedBy: string;
  }): EmergencyRevocationRecord {
    return this.scholarlyIngestionEngine.revokeKnowledge(params);
  }

  public getSourceExplorerTree(sourceId: string) {
    return this.scholarlyIngestionEngine.getSourceExplorerTree(sourceId);
  }

  public getIngestionJob(jobId: string): IngestionJob | undefined {
    return this.scholarlyIngestionEngine.getJob(jobId);
  }

  public getAllIngestionJobs(): IngestionJob[] {
    return this.scholarlyIngestionEngine.getAllJobs();
  }

  public getIngestionArtifact(artifactId: string): OriginalArtifact | undefined {
    return this.scholarlyIngestionEngine.getArtifact(artifactId);
  }

  public getPassagesBySource(sourceId: string): KnowledgePassage[] {
    return this.scholarlyIngestionEngine.getPassagesBySource(sourceId);
  }

  public getClaimsBySource(sourceId: string): ExtractedKnowledgeClaim[] {
    return this.scholarlyIngestionEngine.getClaimsBySource(sourceId);
  }

  // --- MULTILINGUAL CORPUS & DECOUPLED PREFERENCES ---
  public getAyahMultilingualView(surah: number, ayah: number): QuranAyahMultilingualView {
    return MultilingualCorpusRegistry.getAyahMultilingualView(surah, ayah);
  }

  public getQuranTranslation(
    surah: number,
    ayah: number,
    language: string,
    translatorPreference?: string
  ): TranslationQueryResponse {
    return MultilingualCorpusRegistry.getTranslation(surah, ayah, language, translatorPreference);
  }

  public getQuranTafsir(
    surah: number,
    ayah: number,
    language: string,
    tafsirPreference?: string
  ): TafsirQueryResponse {
    return MultilingualCorpusRegistry.getTafsir(surah, ayah, language, tafsirPreference);
  }

  public resolvePersonalizedQuranVerse(
    surah: number,
    ayah: number,
    prefs: DecoupledUserPreferences
  ) {
    return MultilingualCorpusRegistry.resolvePersonalizedVerse(surah, ayah, prefs);
  }

  public assertNoAiGeneratedTranslation(record: any): void {
    MultilingualCorpusRegistry.assertNoAiGeneratedTranslation(record);
  }

  public getMultilingualCorpusSummary(): MultilingualCorpusSummary {
    return MultilingualCorpusRegistry.getCorpusSummary();
  }

  public resolveDecoupledAnswer(
    disagreementId: string,
    prefs: DecoupledUserPreferences
  ): StructuredAnswerResponse {
    return this.universalKnowledgeEngine.resolveDecoupledAnswer(disagreementId, prefs);
  }

  // --- UNIVERSAL MULTILINGUAL ISLAMIC KNOWLEDGE ENGINE (55-SECTION MASTER SPEC) ---
  public getLanguages(): LanguageRecord[] {
    return this.universalMultilingualEngine.getLanguages();
  }

  public getLanguage(code: string): LanguageRecord | undefined {
    return this.universalMultilingualEngine.getLanguage(code);
  }

  public getQuranSurahsMaster(): QuranSurahMaster[] {
    return this.universalMultilingualEngine.getSurahs();
  }

  public getQuranAyahMaster(canonicalKey: string): QuranAyahMaster | undefined {
    return this.universalMultilingualEngine.getAyah(canonicalKey);
  }

  public getTranslationPassages(ayahKey?: string, language?: string): TranslationPassageRecord[] {
    return this.universalMultilingualEngine.getTranslations(ayahKey, language);
  }

  public getTranslationWork(id: string): TranslationWorkRecord | undefined {
    return this.universalMultilingualEngine.getTranslationWork(id);
  }

  public getTafsirWorks(): TafsirWorkRecord[] {
    return this.universalMultilingualEngine.getTafsirWorks();
  }

  public getTafsirPassages(ayahKey?: string, workId?: string): MasterTafsirPassageRecord[] {
    return this.universalMultilingualEngine.getTafsirPassages(ayahKey, workId);
  }

  public generateGovernedAnswer(query: MultilingualEvidenceQuery): MasterAIResponseContract {
    return this.universalMultilingualEngine.generateGovernedAnswer(query);
  }

  public auditResponseContract(contract: MasterAIResponseContract): ClaimAuditorResult {
    return this.universalMultilingualEngine.auditResponseContract(contract);
  }

  public getMasterKnowledgeReleases(): MasterKnowledgeReleaseRecord[] {
    return this.universalMultilingualEngine.getKnowledgeReleases();
  }

  public getScholarsList(): Array<{ id: string; name: string; era: string; madhhab?: string; tradition: string }> {
    return [
      { id: 'sch_abu_hanifa', name: 'Imam Abu Hanifah al-Nu\'man', era: '80–150 AH', madhhab: 'HANAFI', tradition: 'Kufan / Early Salaf' },
      { id: 'sch_malik', name: 'Imam Malik ibn Anas', era: '93–179 AH', madhhab: 'MALIKI', tradition: 'Madinan / Early Salaf' },
      { id: 'sch_shafii', name: 'Imam Muhammad ibn Idris al-Shafi\'i', era: '150–204 AH', madhhab: 'SHAFI_I', tradition: 'Early Classical' },
      { id: 'sch_ahmad', name: 'Imam Ahmad ibn Hanbal', era: '164–241 AH', madhhab: 'HANBALI', tradition: 'Ahl al-Hadith / Baghdad' },
      { id: 'sch_ahmad_raza', name: 'Ala Hazrat Imam Ahmad Raza Khan Barelvi', era: '1856–1921 CE', madhhab: 'HANAFI', tradition: 'Ahl-e-Sunnat / Razvi' },
      { id: 'sch_naimuddin', name: 'Sadr al-Afadil Mawlana Na\'im al-Din Muradabadi', era: '1887–1948 CE', madhhab: 'HANAFI', tradition: 'Ahl-e-Sunnat / Razvi' },
      { id: 'sch_amjad_ali', name: 'Sadr al-Shariah Allama Amjad Ali Azmi', era: '1882–1948 CE', madhhab: 'HANAFI', tradition: 'Ahl-e-Sunnat / Razvi' },
      { id: 'sch_nawawi', name: 'Imam Yahya ibn Sharaf al-Nawawi', era: '631–676 AH', madhhab: 'SHAFI_I', tradition: 'Classical Shafi\'i' },
      { id: 'sch_ibn_qudamah', name: 'Imam Muwaffaq al-Din Ibn Qudamah al-Maqdisi', era: '541–620 AH', madhhab: 'HANBALI', tradition: 'Classical Hanbali' },
    ];
  }

  public getMadhhabsList(): Array<{ code: string; name: string; founder: string; status: string }> {
    return [
      { code: 'HANAFI', name: 'Hanafi School', founder: 'Imam Abu Hanifah', status: 'CANONICAL_SUNNI' },
      { code: 'MALIKI', name: 'Maliki School', founder: 'Imam Malik ibn Anas', status: 'CANONICAL_SUNNI' },
      { code: 'SHAFI_I', name: 'Shafi\'i School', founder: 'Imam al-Shafi\'i', status: 'CANONICAL_SUNNI' },
      { code: 'HANBALI', name: 'Hanbali School', founder: 'Imam Ahmad ibn Hanbal', status: 'CANONICAL_SUNNI' },
    ];
  }

  public getTraditionsList(): Array<{ id: string; name: string; description: string; preferredCorpusAvailable: boolean }> {
    return [
      { id: 'AHL_E_SUNNAT_RAZVI', name: 'Ahl-e-Sunnat / Razvi Tradition', description: 'Traditional South Asian Sunni jurisprudence and spiritual lineage based on Kanzul Iman, Fatawa Razawiyya, and Bahaar-e-Shariat', preferredCorpusAvailable: true },
      { id: 'CLASSICAL_ASHARI_MATURIDI', name: 'Classical Sunni (Ash\'ari / Maturidi)', description: 'Mainstream classical theology and juristic methodology across the four madhhabs', preferredCorpusAvailable: true },
      { id: 'TASAWWUF_TAZKIYAH', name: 'Tasawwuf & Tazkiyah Tradition', description: 'Inner purification, spiritual ethics, and prophetic character cultivation based on classical manuals', preferredCorpusAvailable: true },
      { id: 'CONTEMPORARY_FIQH_ACADEMIES', name: 'Contemporary Fiqh Academies', description: 'Recognized global Islamic jurisprudence councils (OIC Islamic Fiqh Academy, AMJA, European Fatwa Council)', preferredCorpusAvailable: true },
    ];
  }

  // =========================================================================
  // AMAL LEGACY & FAMILY CONTINUITY OS METHODS
  // =========================================================================
  public createLegacySpace(params: { ownerId: string; name: string; description: string }): LegacySpaceRecord {
    return this.legacyEngine.createLegacySpace(params);
  }

  public createLegacyItem(params: any): LegacyItemRecord {
    return this.legacyEngine.createLegacyItem(params);
  }

  public getLegacyItem(itemId: string, requestingUserId: string): LegacyItemRecord {
    return this.legacyEngine.getLegacyItem(itemId, requestingUserId);
  }

  public createLegacyCollection(params: any): LegacyCollectionRecord {
    return this.legacyEngine.createCollection(params);
  }

  public getLegacyCollection(collectionId: string, requestingUserId: string): LegacyCollectionRecord {
    return this.legacyEngine.getCollection(collectionId, requestingUserId);
  }

  public releaseLegacyResource(params: {
    resourceId: string;
    creatorId: string;
    targetStatus: LegacyReleaseStatus;
    designatedRecipientIds?: string[];
    releaseConditions?: string;
  }): LegacyReleaseRecord {
    return this.legacyEngine.releaseLegacyResource(params);
  }

  public registerFutureRecipient(params: {
    creatorId: string;
    intendedLabel: string;
    relationshipDescription: string;
    provisionalNotes?: string;
  }): FutureRecipientRecord {
    return this.legacyEngine.registerFutureRecipient(params);
  }

  public getFutureRecipients(creatorId: string): FutureRecipientRecord[] {
    return this.legacyEngine.getFutureRecipients(creatorId);
  }

  public setLegacyInstructions(params: any): LegacyInstructionsRecord {
    return this.legacyEngine.setLegacyInstructions(params);
  }

  public getLegacyInstructions(userId: string): LegacyInstructionsRecord | undefined {
    return this.legacyEngine.getLegacyInstructions(userId);
  }

  public createLegacyLetter(params: any): LegacyLetterRecord {
    return this.legacyEngine.createLegacyLetter(params);
  }

  public recordLegacyAudio(params: any): LegacyAudioMessageRecord {
    return this.legacyEngine.recordLegacyAudio(params);
  }

  public createSharedFamilyJourney(params: {
    familyId: string;
    title: string;
    goal: string;
    familyBaseline: string;
    totalDays: number;
    memberAmalPlans: FamilyMemberAmalPlan[];
    sharedActivityDescription: string;
  }): FamilySharedJourney {
    return this.legacyEngine.createSharedFamilyJourney(params);
  }

  public getFamilyTodayDashboard(familyId: string, date: string): FamilyTodayDashboardView {
    return this.legacyEngine.getFamilyTodayDashboard(familyId, date);
  }

  public registerChildAccount(params: {
    userId: string;
    ageBand: ChildAgeBand;
    guardianUserId: string;
    guardianConsentGranted: boolean;
  }): ChildAccountProfile {
    return this.legacyEngine.registerChildAccount(params);
  }

  public getChildProfile(userId: string): ChildAccountProfile | undefined {
    return this.legacyEngine.getChildProfile(userId);
  }

  public exportUserLegacyArchive(userId: string, format: 'PDF' | 'TEXT' | 'AUDIO' | 'STRUCTURED_JSON_ARCHIVE'): ExportArchiveRecord {
    return this.legacyEngine.exportUserLegacyArchive(userId, format);
  }

  public getLegacyAuditLogs(userId: string): LegacyAuditLogRecord[] {
    return this.legacyEngine.getAuditLogs(userId);
  }

  public assertDomesticPrivacyFirewall(params: {
    requestorUserId: string;
    targetUserId: string;
    requestorRole: FamilyRole;
    targetRole: FamilyRole;
    resourceType: 'PRIVATE_REFLECTION' | 'AI_CONVERSATION' | 'PRIVATE_GOAL' | 'PRAYER_LOG' | 'FAMILY_JOURNEY';
  }): void {
    this.legacyEngine.assertDomesticPrivacyFirewall(params);
  }

  public assertTwoGraphFirewall(item: Partial<LegacyItemRecord>): void {
    this.legacyEngine.assertTwoGraphFirewall(item);
  }

  public assertNonMonetizable(category: string): void {
    this.legacyEngine.assertNonMonetizable(category);
  }

  public sanitizeFamilyNotification(promptText: string): string {
    return this.legacyEngine.sanitizeFamilyNotification(promptText);
  }

  // --- COMMUNITY & UMMAH OS ---
  public getCommunityDashboard() {
    return this.communityEngine.getDashboardOverview();
  }

  public discoverCommunityNearby(query: CommunityDiscoveryQuery) {
    return this.communityEngine.discoverNearby(query);
  }

  public listCommunityOrganizations(filter?: {
    type?: CommunityOrganizationType;
    status?: OrganizationVerificationStatus;
    city?: string;
  }) {
    return this.communityEngine.listOrganizations(filter);
  }

  public getCommunityOrganization(id: string) {
    return this.communityEngine.getOrganizationById(id);
  }

  public registerCommunityOrganization(data: any) {
    return this.communityEngine.registerOrganization(data);
  }

  public listCommunityPrograms(filter?: {
    type?: CommunityProgramType;
    isOnline?: boolean;
    language?: string;
  }) {
    return this.communityEngine.listPrograms(filter);
  }

  public listCommunityEvents(filter?: {
    isOnline?: boolean;
    programId?: string;
  }) {
    return this.communityEngine.listEvents(filter);
  }

  public registerCommunityEvent(eventId: string, userId: string) {
    return this.communityEngine.registerForEvent(eventId, userId);
  }

  public listVerifiedScholarsCommunity() {
    return this.communityEngine.listVerifiedScholars();
  }

  public listCommunityGroups(userId?: string) {
    return this.communityEngine.listGroups(userId);
  }

  public createCommunityGroup(data: {
    name: string;
    description: string;
    type: CommunityGroupType;
    creatorId: string;
    organizationId?: string;
  }) {
    return this.communityEngine.createGroup(data);
  }

  public listCommunityService(filter?: {
    type?: ServiceOpportunityType;
    familyFriendly?: boolean;
    isOnline?: boolean;
  }) {
    return this.communityEngine.listServiceOpportunities(filter);
  }

  public matchCommunityVolunteers(query: CommunityVolunteerMatchingQuery) {
    return this.communityEngine.matchVolunteers(query);
  }

  public signUpCommunityService(opportunityId: string, userId: string) {
    return this.communityEngine.signUpForService(opportunityId, userId);
  }

  public submitCommunityReport(data: {
    reportingUserId: string;
    reportedEntityId: string;
    reportedEntityType: 'USER' | 'CONTENT' | 'ORGANIZATION' | 'SCHOLAR' | 'EVENT' | 'GROUP';
    category: CommunityReportCategory;
    details: string;
  }) {
    return this.communityEngine.submitReport(data);
  }

  public listCommunityResources(filter?: { language?: string; resourceType?: string }) {
    return this.communityEngine.listResources(filter);
  }

  public assertCommunityFirewallBoundary(resourceId: string) {
    return this.communityEngine.assertCommunityFirewallBoundary(resourceId);
  }

  public calculateCommunityZakat(input: any) {
    return this.communityEngine.calculateZakat(input);
  }

  // --- SCHOLAR OS + KNOWLEDGE GOVERNANCE PLATFORM ---
  public registerScholarIdentity(data: any) {
    return this.scholarGovernanceEngine.registerScholar(data);
  }

  public verifyScholarIdentity(scholarId: string, newState: any, adminId: string) {
    return this.scholarGovernanceEngine.verifyScholar(scholarId, newState, adminId);
  }

  public getScholarIdentity(scholarId: string) {
    return this.scholarGovernanceEngine.getScholar(scholarId);
  }

  public listScholarIdentities(filter?: any) {
    return this.scholarGovernanceEngine.listScholars(filter);
  }

  public createScholarOSCase(params: any) {
    return this.scholarGovernanceEngine.createCase(params);
  }

  public getScholarOSCase(caseId: string, requestorId: string, isScholar: boolean) {
    return this.scholarGovernanceEngine.getCase(caseId, requestorId, isScholar);
  }

  public acceptScholarOSCase(caseId: string, scholarId: string) {
    return this.scholarGovernanceEngine.acceptCase(caseId, scholarId);
  }

  public respondToScholarOSCase(caseId: string, response: any) {
    return this.scholarGovernanceEngine.respondToCase(caseId, response);
  }

  public completeMultiScholarReview(caseId: string, secondScholarId: string, outcome: any, reviewNotes?: string) {
    return this.scholarGovernanceEngine.completeMultiScholarReview(caseId, secondScholarId, outcome, reviewNotes);
  }

  public closeScholarOSCase(caseId: string) {
    return this.scholarGovernanceEngine.closeCase(caseId);
  }

  public registerGovernanceSource(entry: any) {
    return this.scholarGovernanceEngine.registerSource(entry);
  }

  public getGovernanceSource(sourceId: string) {
    return this.scholarGovernanceEngine.getSource(sourceId);
  }

  public updateGovernanceSourceStatus(sourceId: string, status: any, actorId: string) {
    return this.scholarGovernanceEngine.updateSourceStatus(sourceId, status, actorId);
  }

  public registerGovernanceClaim(claim: any) {
    return this.scholarGovernanceEngine.registerClaim(claim);
  }

  public getGovernanceClaim(claimId: string) {
    return this.scholarGovernanceEngine.getClaim(claimId);
  }

  public auditProposedGovernanceResponse(text: string, claims: any[]) {
    return this.scholarGovernanceEngine.auditProposedResponse(text, claims);
  }

  public registerGovernanceDisagreement(issue: any) {
    return this.scholarGovernanceEngine.registerDisagreementIssue(issue);
  }

  public getGovernanceDisagreement(issueId: string) {
    return this.scholarGovernanceEngine.getDisagreementIssue(issueId);
  }

  public listGovernanceDisagreements() {
    return this.scholarGovernanceEngine.listDisagreementIssues();
  }

  public createGovernanceRelease(data: any) {
    return this.scholarGovernanceEngine.createKnowledgeRelease(data);
  }

  public publishGovernanceRelease(releaseId: string, approverScholarId: string) {
    return this.scholarGovernanceEngine.publishKnowledgeRelease(releaseId, approverScholarId);
  }

  public rollbackGovernanceRelease(reason: string, adminId: string) {
    return this.scholarGovernanceEngine.rollbackKnowledgeRelease(reason, adminId);
  }

  public getActiveGovernanceRelease() {
    return this.scholarGovernanceEngine.getActiveRelease();
  }

  public setScholarEmergencyControl(control: any, state: boolean, adminId: string) {
    return this.scholarGovernanceEngine.setEmergencyControl(control, state, adminId);
  }

  public getScholarEmergencyControls() {
    return this.scholarGovernanceEngine.getEmergencyControls();
  }

  public verifyFinalTrustProvenance(claimId: string) {
    return this.scholarGovernanceEngine.verifyFinalTrustProvenance(claimId);
  }

  // --- TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE KNOWLEDGE FACTORY ---
  public getBuzurgFigure(personId: string) {
    return this.spiritualHeritageEngine.getBuzurg(personId);
  }

  public listBuzurgFigures() {
    return this.spiritualHeritageEngine.listBuzurgs();
  }

  public resolveBuzurgByAlias(query: string) {
    return this.spiritualHeritageEngine.resolveBuzurgByAlias(query);
  }

  public registerBuzurgFigure(data: any) {
    return this.spiritualHeritageEngine.registerBuzurg(data);
  }

  public getSilsila(silsilaId: string) {
    return this.spiritualHeritageEngine.getSilsila(silsilaId);
  }

  public listSilsilas() {
    return this.spiritualHeritageEngine.listSilsilas();
  }

  public getSilsilaLineage(silsilaId: string) {
    return this.spiritualHeritageEngine.getSilsilaLineage(silsilaId);
  }

  public registerSilsila(silsila: any) {
    return this.spiritualHeritageEngine.registerSilsila(silsila);
  }

  public addSilsilaTransmission(edge: any) {
    return this.spiritualHeritageEngine.addSilsilaTransmission(edge);
  }

  public getSpiritualWork(workId: string) {
    return this.spiritualHeritageEngine.getSpiritualWork(workId);
  }

  public listSpiritualWorks() {
    return this.spiritualHeritageEngine.listSpiritualWorks();
  }

  public registerSpiritualWork(work: any) {
    return this.spiritualHeritageEngine.registerSpiritualWork(work);
  }

  public registerSpiritualEdition(edition: any) {
    return this.spiritualHeritageEngine.registerEdition(edition);
  }

  public registerSpiritualPassage(passage: any) {
    return this.spiritualHeritageEngine.registerPassage(passage);
  }

  public verifySpiritualQuote(quoteQuery: string) {
    return this.spiritualHeritageEngine.verifyQuote(quoteQuery);
  }

  public getSpiritualConcept(conceptId: string) {
    return this.spiritualHeritageEngine.getConcept(conceptId);
  }

  public listSpiritualConcepts() {
    return this.spiritualHeritageEngine.listConcepts();
  }

  public getSpiritualClaim(claimId: string) {
    return this.spiritualHeritageEngine.getSpiritualClaim(claimId);
  }

  public registerSpiritualClaim(claim: any) {
    return this.spiritualHeritageEngine.registerSpiritualClaim(claim);
  }

  public listSpiritualPractices() {
    return this.spiritualHeritageEngine.listPractices();
  }

  public submitSpiritualScholarReview(review: any) {
    return this.spiritualHeritageEngine.submitScholarReview(review);
  }

  public evaluateSpiritualAiSafety(prompt: string, proposedResponse: string) {
    return this.spiritualHeritageEngine.evaluateSpiritualAiSafety(prompt, proposedResponse);
  }

  public auditSpiritualClaimProvenance(claimId: string) {
    return this.spiritualHeritageEngine.auditSpiritualClaimProvenance(claimId);
  }

  public assertThreeGraphSeparation() {
    return this.spiritualHeritageEngine.assertThreeGraphSeparation();
  }

  public registerMalfuz(malfuz: any) {
    return this.spiritualHeritageEngine.registerMalfuz(malfuz);
  }

  public registerMaktub(maktub: any) {
    return this.spiritualHeritageEngine.registerMaktub(maktub);
  }

  public registerTazkirahReport(report: any) {
    return this.spiritualHeritageEngine.registerTazkirahReport(report);
  }

  public registerKaramatReport(report: any) {
    return this.spiritualHeritageEngine.registerKaramatReport(report);
  }

  // --- KNOWLEDGE PRODUCTION FACTORY (123 Sections) ---
  public enqueueFactoryCandidate(
    item: Parameters<KnowledgeProductionFactoryEngine['enqueueCandidate']>[0],
    priorityFactors: Parameters<KnowledgeProductionFactoryEngine['enqueueCandidate']>[1]
  ) {
    return this.knowledgeProductionFactory.enqueueCandidate(item, priorityFactors);
  }

  public triageFactoryCandidate(candidateId: string, action: 'APPROVE' | 'BLOCK' | 'REJECT') {
    return this.knowledgeProductionFactory.triageCandidate(candidateId, action);
  }

  public listFactoryCandidates(wave?: any, state?: any) {
    return this.knowledgeProductionFactory.listCandidateQueue(wave, state);
  }

  public acquireSourceArtifact(params: Parameters<KnowledgeProductionFactoryEngine['acquireSource']>[0]) {
    return this.knowledgeProductionFactory.acquireSource(params);
  }

  public createArtifactDerivative(params: Parameters<KnowledgeProductionFactoryEngine['createArtifactDerivative']>[0]) {
    return this.knowledgeProductionFactory.createArtifactDerivative(params);
  }

  public getArtifactChainOfCustody(artifactId: string) {
    return this.knowledgeProductionFactory.getArtifactChainOfCustody(artifactId);
  }

  public runOcrPipeline(params: Parameters<KnowledgeProductionFactoryEngine['runOcrPipeline']>[0]) {
    return this.knowledgeProductionFactory.runOcrPipeline(params);
  }

  public normalizeExtractedText(rawText: string, isQuranicText?: boolean) {
    return this.knowledgeProductionFactory.normalizeExtractedText(rawText, isQuranicText);
  }

  public createStructureNode(node: Parameters<KnowledgeProductionFactoryEngine['createStructureNode']>[0]) {
    return this.knowledgeProductionFactory.createStructureNode(node);
  }

  public segmentPassage(passage: Parameters<KnowledgeProductionFactoryEngine['segmentPassage']>[0]) {
    return this.knowledgeProductionFactory.segmentPassage(passage);
  }

  public getPassage(passageId: string) {
    return this.knowledgeProductionFactory.getPassage(passageId);
  }

  public resolveQuranReference(rawReference: string) {
    return this.knowledgeProductionFactory.resolveQuranReference(rawReference);
  }

  public resolveHadithReference(collection: string, rawNumber: string, edition?: string) {
    return this.knowledgeProductionFactory.resolveHadithReference(collection, rawNumber, edition);
  }

  public registerCrossSourceCitation(citation: Parameters<KnowledgeProductionFactoryEngine['registerCrossSourceCitation']>[0]) {
    return this.knowledgeProductionFactory.registerCrossSourceCitation(citation);
  }

  public verifyCitation(citationId: string, matchedPassageId?: string) {
    return this.knowledgeProductionFactory.verifyCitation(citationId, matchedPassageId);
  }

  public registerMadhhabIssueMatrix(matrix: Parameters<KnowledgeProductionFactoryEngine['registerMadhhabIssueMatrix']>[0]) {
    return this.knowledgeProductionFactory.registerMadhhabIssueMatrix(matrix);
  }

  public getMadhhabIssueMatrix(issueId: string) {
    return this.knowledgeProductionFactory.getMadhhabIssueMatrix(issueId);
  }

  public registerClaim(claim: Parameters<KnowledgeProductionFactoryEngine['registerClaim']>[0]) {
    return this.knowledgeProductionFactory.registerClaim(claim);
  }

  public getClaim(claimId: string) {
    return this.knowledgeProductionFactory.getClaim(claimId);
  }

  public alignTranslation(params: Parameters<KnowledgeProductionFactoryEngine['alignTranslation']>[0]) {
    return this.knowledgeProductionFactory.alignTranslation(params);
  }

  public submitFactoryScholarReview(
    review: Parameters<KnowledgeProductionFactoryEngine['submitReview']>[0],
    riskLevel: Parameters<KnowledgeProductionFactoryEngine['submitReview']>[1]
  ) {
    return this.knowledgeProductionFactory.submitReview(review, riskLevel);
  }

  public createDispute(dispute: Parameters<KnowledgeProductionFactoryEngine['createDispute']>[0]) {
    return this.knowledgeProductionFactory.createDispute(dispute);
  }

  public resolveDispute(disputeId: string, resolution: string, resolutionType: any) {
    return this.knowledgeProductionFactory.resolveDispute(disputeId, resolution, resolutionType);
  }

  public quarantineEntity(
    entityType: Parameters<KnowledgeProductionFactoryEngine['quarantineEntity']>[0],
    entityId: string,
    reason: Parameters<KnowledgeProductionFactoryEngine['quarantineEntity']>[2],
    notes: string,
    actor: string
  ) {
    return this.knowledgeProductionFactory.quarantineEntity(entityType, entityId, reason, notes, actor);
  }

  public isEntityQuarantined(entityId: string) {
    return this.knowledgeProductionFactory.isEntityQuarantined(entityId);
  }

  public createKnowledgeRelease(params: Parameters<KnowledgeProductionFactoryEngine['createKnowledgeRelease']>[0]) {
    return this.knowledgeProductionFactory.createKnowledgeRelease(params);
  }

  public publishKnowledgeRelease(releaseId: string) {
    return this.knowledgeProductionFactory.publishKnowledgeRelease(releaseId);
  }

  public rollbackFactoryKnowledgeRelease(reason: string, actor: string) {
    return this.knowledgeProductionFactory.rollbackKnowledgeRelease(reason, actor);
  }

  public getActiveFactoryKnowledgeRelease() {
    return this.knowledgeProductionFactory.getActiveRelease();
  }

  public buildEvidencePack(question: string, intent: string, claimIds: string[]) {
    return this.knowledgeProductionFactory.buildEvidencePack(question, intent, claimIds);
  }

  public evaluateFactoryQualityScorecard(sourceId: string) {
    return this.knowledgeProductionFactory.evaluateQualityScorecard(sourceId);
  }

  public scanDocumentPromptInjection(rawContent: string) {
    return this.knowledgeProductionFactory.scanDocumentPromptInjection(rawContent);
  }

  public auditKnowledgeObjectTrust(claimId: string) {
    return this.knowledgeProductionFactory.auditKnowledgeObjectTrust(claimId);
  }

  // --- KNOWLEDGE ACQUISITION PROGRAM (125 SECTIONS) ---
  public registerAcquisitionCandidate(candidate: Parameters<KnowledgeAcquisitionProgramEngine['registerCandidate']>[0]) {
    return this.acquisitionProgram.registerCandidate(candidate);
  }

  public getAcquisitionCandidate(candidateId: string) {
    return this.acquisitionProgram.getCandidate(candidateId);
  }

  public listAcquisitionCandidates(filter?: Parameters<KnowledgeAcquisitionProgramEngine['listCandidates']>[0]) {
    return this.acquisitionProgram.listCandidates(filter);
  }

  public evaluateAcquisitionRights(params: Parameters<KnowledgeAcquisitionProgramEngine['evaluateRightsMatrix']>[0]) {
    return this.acquisitionProgram.evaluateRightsMatrix(params);
  }

  public getAcquisitionCorpusTier(workId: string) {
    return this.acquisitionProgram.getCorpusTier(workId);
  }

  public listAcquisitionRepositories() {
    return this.acquisitionProgram.listRepositories();
  }

  public getAcquisitionRepository(repoId: string) {
    return this.acquisitionProgram.getRepository(repoId);
  }

  public assembleSourcePacket(packet: Parameters<KnowledgeAcquisitionProgramEngine['assembleSourcePacket']>[0]) {
    return this.acquisitionProgram.assembleSourcePacket(packet);
  }

  public getSourcePacket(candidateId: string) {
    return this.acquisitionProgram.getSourcePacket(candidateId);
  }

  public getCanonicalWork(workId: string) {
    return this.acquisitionProgram.getCanonicalWork(workId);
  }

  public createAcquisitionBatch(params: Parameters<KnowledgeAcquisitionProgramEngine['createBatch']>[0]) {
    return this.acquisitionProgram.createBatch(params);
  }

  public getAcquisitionBatch(batchId: string) {
    return this.acquisitionProgram.getBatch(batchId);
  }

  public validateAcquisitionBatchRelease(batchId: string) {
    return this.acquisitionProgram.validateBatchRelease(batchId);
  }

  public evaluateAcquisitionCapacity() {
    return this.acquisitionProgram.evaluateCapacityPlanning();
  }

  public submitAcquisitionWithdrawal(params: Parameters<KnowledgeAcquisitionProgramEngine['submitWithdrawalRequest']>[0]) {
    return this.acquisitionProgram.submitWithdrawalRequest(params);
  }

  public submitAcquisitionCorrection(params: Parameters<KnowledgeAcquisitionProgramEngine['submitCorrection']>[0]) {
    return this.acquisitionProgram.submitCorrection(params);
  }

  public generateAmalPublicSourceCard(workId: string) {
    return this.acquisitionProgram.generateAmalPublicSourceCard(workId);
  }

  public generateScholarExtendedSourceCard(workId: string) {
    return this.acquisitionProgram.generateScholarExtendedSourceCard(workId);
  }

  public listFourMadhhabTracks(school?: Parameters<KnowledgeAcquisitionProgramEngine['listMadhhabTracks']>[0]) {
    return this.acquisitionProgram.listMadhhabTracks(school);
  }

  public listHistoricalSilsilas() {
    return this.acquisitionProgram.listSilsilas();
  }

  // --- UNIVERSAL MASTER CATALOGUE (129 SECTIONS) ---
  public registerCatalogueWork(work: Parameters<UniversalMasterCatalogueEngine['registerWork']>[0]) {
    return this.masterCatalogue.registerWork(work);
  }

  public getCatalogueWork(workId: Parameters<UniversalMasterCatalogueEngine['getWork']>[0]) {
    return this.masterCatalogue.getWork(workId);
  }

  public listCatalogueWorks(filter?: Parameters<UniversalMasterCatalogueEngine['listWorks']>[0]) {
    return this.masterCatalogue.listWorks(filter);
  }

  public registerCatalogueAuthor(author: Parameters<UniversalMasterCatalogueEngine['registerAuthor']>[0]) {
    return this.masterCatalogue.registerAuthor(author);
  }

  public getCatalogueAuthor(authorId: Parameters<UniversalMasterCatalogueEngine['getAuthor']>[0]) {
    return this.masterCatalogue.getAuthor(authorId);
  }

  public listCatalogueAuthors() {
    return this.masterCatalogue.listAuthors();
  }

  public registerCatalogueEdition(edition: Parameters<UniversalMasterCatalogueEngine['registerEdition']>[0]) {
    return this.masterCatalogue.registerEdition(edition);
  }

  public getCatalogueEdition(editionId: Parameters<UniversalMasterCatalogueEngine['getEdition']>[0]) {
    return this.masterCatalogue.getEdition(editionId);
  }

  public getEditionsForCatalogueWork(workId: Parameters<UniversalMasterCatalogueEngine['getEditionsForWork']>[0]) {
    return this.masterCatalogue.getEditionsForWork(workId);
  }

  public registerCatalogueManuscript(ms: Parameters<UniversalMasterCatalogueEngine['registerManuscript']>[0]) {
    return this.masterCatalogue.registerManuscript(ms);
  }

  public getCatalogueManuscript(msId: Parameters<UniversalMasterCatalogueEngine['getManuscript']>[0]) {
    return this.masterCatalogue.getManuscript(msId);
  }

  public listCatalogueSilsilas() {
    return this.masterCatalogue.listSilsilas();
  }

  public getCatalogueSilsila(code: Parameters<UniversalMasterCatalogueEngine['getSilsila']>[0]) {
    return this.masterCatalogue.getSilsila(code);
  }

  public registerCatalogueQuote(quote: Parameters<UniversalMasterCatalogueEngine['registerQuote']>[0]) {
    return this.masterCatalogue.registerQuote(quote);
  }

  public getCatalogueQuote(quoteId: Parameters<UniversalMasterCatalogueEngine['getQuote']>[0]) {
    return this.masterCatalogue.getQuote(quoteId);
  }

  public computeCataloguePriorityScorecard(scores: Parameters<UniversalMasterCatalogueEngine['computePriorityScorecard']>[0]) {
    return this.masterCatalogue.computePriorityScorecard(scores);
  }

  public analyzeCatalogueGaps() {
    return this.masterCatalogue.analyzeGaps();
  }

  public getCatalogueAcquisitionRecommendations() {
    return this.masterCatalogue.getAcquisitionRecommendations();
  }

  public runCatalogueAudit() {
    return this.masterCatalogue.runCatalogueAudit();
  }

  public recordCatalogueVersion(versionName: string) {
    return this.masterCatalogue.recordCatalogueVersion(versionName);
  }

  public getCatalogueVersion(versionName: string) {
    return this.masterCatalogue.getCatalogueVersion(versionName);
  }

  public getCatalogueDashboardMetrics() {
    return this.masterCatalogue.getDashboardMetrics();
  }

  public getPublicSourceView(workId: Parameters<UniversalMasterCatalogueEngine['getPublicSourceView']>[0]) {
    return this.masterCatalogue.getPublicSourceView(workId);
  }

  public checkAIRetrievalEligibility(workId: Parameters<UniversalMasterCatalogueEngine['isEligibleForAIRetrieval']>[0]) {
    return this.masterCatalogue.isEligibleForAIRetrieval(workId);
  }

  public reconstructKnowledgePacket(workId: Parameters<UniversalMasterCatalogueEngine['reconstructKnowledgePacket']>[0]) {
    return this.masterCatalogue.reconstructKnowledgePacket(workId);
  }

  public listCatalogueBatches() {
    return this.masterCatalogue.getBatches();
  }

  public getCatalogueBatch(batchId: Parameters<UniversalMasterCatalogueEngine['getBatch']>[0]) {
    return this.masterCatalogue.getBatch(batchId);
  }

  // --- GLOBAL ISLAMIC HERITAGE & KNOWLEDGE ATLAS V2 ---

  public getGhuniyatAlTalibinStructuredResult() {
    return this.globalAtlasEngine.getGhuniyatAlTalibinStructuredResult();
  }

  public getFigureKnowledgeUniverse(personId: Parameters<GlobalHeritageAtlasEngine['getFigureKnowledgeUniverse']>[0]) {
    return this.globalAtlasEngine.getFigureKnowledgeUniverse(personId);
  }

  public listAtlasBuzurg() {
    return this.globalAtlasEngine.listBuzurgFigures();
  }

  public getAtlasBuzurg(personId: Parameters<GlobalHeritageAtlasEngine['getBuzurg']>[0]) {
    return this.globalAtlasEngine.getBuzurg(personId);
  }

  public getSilsilaGraph(silsilaCode: string) {
    return this.globalAtlasEngine.getSilsilaGraph(silsilaCode);
  }

  public listAtlasPractices() {
    return this.globalAtlasEngine.listSpiritualPractices();
  }

  public getAtlasPractice(practiceId: Parameters<GlobalHeritageAtlasEngine['getSpiritualPractice']>[0]) {
    return this.globalAtlasEngine.getSpiritualPractice(practiceId);
  }

  public compareTazkiyahConcept(term: Parameters<GlobalHeritageAtlasEngine['compareConceptAcrossTraditions']>[0]) {
    return this.globalAtlasEngine.compareConceptAcrossTraditions(term);
  }

  public listAtlasConcepts() {
    return this.globalAtlasEngine.listTazkiyahConcepts();
  }

  public verifyAtlasQuote(params: Parameters<GlobalHeritageAtlasEngine['verifyQuote']>[0]) {
    return this.globalAtlasEngine.verifyQuote(params);
  }

  public generateSpiritualAIResponse(question: string, contextFigure?: string) {
    return this.globalAtlasEngine.generateSpiritualAIResponse(question, contextFigure);
  }

  public getAtlasKaramatReports() {
    return this.globalAtlasEngine.getKaramatReports();
  }

  // --- AMAL TRUST & METHODOLOGY CENTER ---
  public getTrustCenterManifest() {
    return this.trustCenter.getManifest();
  }

  public getTrustCenterPolicy(slug: TrustPolicySlug) {
    return this.trustCenter.getPolicy(slug);
  }

  public getTrustCenterDisclaimer() {
    return this.trustCenter.getDisclaimer();
  }

  public getTrustCenterPipeline() {
    return this.trustCenter.getVerificationPipeline();
  }

  public getTrustCenterVersionHistory() {
    return this.trustCenter.getVersionHistory();
  }

  // --- SIRAH & SHAMA'IL KNOWLEDGE FACTORY ---
  public listSirahSources(filters?: Parameters<SirahShamailKnowledgeEngine['listSources']>[0]) {
    return this.sirahEngine.listSources(filters);
  }

  public getSirahSource(sourceId: string) {
    return this.sirahEngine.getSource(sourceId);
  }

  public listSirahEvents(period?: Parameters<SirahShamailKnowledgeEngine['listEvents']>[0]) {
    return this.sirahEngine.listEvents(period);
  }

  public getSirahEvent(eventId: string) {
    return this.sirahEngine.getEvent(eventId);
  }

  public getSirahEventEvidence(eventId: string) {
    return this.sirahEngine.getEventEvidence(eventId);
  }

  public getSirahEventVariants(eventId: string) {
    return this.sirahEngine.getEventReportVariants(eventId);
  }

  public listSirahShamail(category?: Parameters<SirahShamailKnowledgeEngine['listShamailReports']>[0]) {
    return this.sirahEngine.listShamailReports(category);
  }

  public getSirahShamail(reportId: string) {
    return this.sirahEngine.getShamailReport(reportId);
  }

  public getSirahTimeline() {
    return this.sirahEngine.getTimeline();
  }

  public getSirahExplorerView(period: Parameters<SirahShamailKnowledgeEngine['getExplorerView']>[0]) {
    return this.sirahEngine.getExplorerView(period);
  }

  public getPropheticGraph() {
    return this.sirahEngine.getPropheticGraph();
  }

  public generateSirahAIAnswer(question: string) {
    return this.sirahEngine.generateSirahAIAnswer(question);
  }

  public verifySirahQuote(quoteText: string, claimedAuthor: string) {
    return this.sirahEngine.verifySirahQuote(quoteText, claimedAuthor);
  }

  public getSirahEventChronology(eventId: string) {
    return this.sirahEngine.getEventChronology(eventId);
  }

  public getSirahEventPeople(eventId: string) {
    return this.sirahEngine.getEventPeople(eventId);
  }

  public getSirahEventPlaces(eventId: string) {
    return this.sirahEngine.getEventPlaces(eventId);
  }

  public getSirahEventQuranLinks(eventId: string) {
    return this.sirahEngine.getEventQuranLinks(eventId);
  }

  public getSirahEventHadithLinks(eventId: string) {
    return this.sirahEngine.getEventHadithLinks(eventId);
  }

  public getSirahEventLessons(eventId: string) {
    return this.sirahEngine.getEventLessons(eventId);
  }

  public searchSirah(query: string, filters?: any) {
    return this.sirahEngine.searchSirah(query, filters);
  }

  public compareSirahSources(eventId: string, sourceAId: string, sourceBId: string) {
    return this.sirahEngine.compareSources(eventId, sourceAId, sourceBId);
  }

  public submitSirahReview(params: any) {
    return this.sirahEngine.submitReview(params);
  }

  public submitSirahClaim(params: any) {
    return this.sirahEngine.submitClaim(params);
  }

  public getSirahFeatureFlags() {
    return this.sirahEngine.getFeatureFlags();
  }
}


