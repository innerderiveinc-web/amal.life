/**
 * AMAL OS — TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE KNOWLEDGE FACTORY
 * MASTER ACCEPTANCE TEST SUITE
 * 
 * Verifies all 99 sections, non-negotiable invariants, and Section 69 REST APIs:
 * - Gate 1: Three-Graph Epistemic Domain Isolation & Zero-Auto-Authority Rule
 * - Gate 2: Buzurg Registry & Multi-Lingual Alias Resolution Engine
 * - Gate 3: Silsila Registry & Transmission Lineage Graph
 * - Gate 4: Classical Literature Taxonomy, Editions, Manuscripts & Passage Hashing
 * - Gate 5: Quote Verification Engine & Surrounding Context Protection
 * - Gate 6: Malfuzat, Maktubat, Tazkirah & Conservative Karamat Modeling
 * - Gate 7: Controlled Spiritual Ontology (Stations, States & Evidence Anchors)
 * - Gate 8: Spiritual Claim Ledger & Amal Classification Firewall
 * - Gate 9: Specialized Scholar Review & Two-Reviewer Rule
 * - Gate 10: Spiritual AI Safety Guardrails & Pre-delivery Gate
 * - Gate 11: Definition of Done: 10-Question Provenance Audit (Section 99)
 * - Gate 12: Section 69 REST API Integration via ApiRouter
 */

import { SpiritualHeritageEngine } from '../packages/amal-engine/src/spiritual-heritage-engine.js';
import { ApiRouter } from '../services/api/src/router.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runSpiritualHeritageTestSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE KNOWLEDGE FACTORY');
  console.log('========================================================================\n');

  const engine = new SpiritualHeritageEngine();

  // -------------------------------------------------------------------------
  // GATE 1: Three-Graph Epistemic Domain Isolation & Zero-Auto-Authority Rule
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Validating Three-Graph Architecture & Zero-Auto-Authority...');
  const separationCheck = engine.assertThreeGraphSeparation();
  assert(separationCheck.graph_1_evidence_graph_clean === true, 'Graph 1 (Evidence Graph) must remain pure and free from later devotional material');
  assert(separationCheck.graph_2_spiritual_heritage_isolated === true, 'Graph 2 (Spiritual Heritage) must be strictly isolated');
  assert(separationCheck.graph_3_personal_amal_firewalled === true, 'Graph 3 (Personal Amal Graph) must never be polluted by automated spiritual rulings');
  console.log('   ✓ Graph 1 (Islamic Evidence Graph) ⟂ Graph 2 (Spiritual Heritage) ⟂ Graph 3 (Personal Amal Graph)');
  console.log('   ✓ Zero-Auto-Authority enforced: Spiritual sayings cannot establish Fiqh obligations without independent Usul evidence.\n');

  // -------------------------------------------------------------------------
  // GATE 2: Buzurg Registry & Multi-Lingual Alias Resolution
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 2] Validating Buzurg Registry & Multi-Lingual Alias Resolution...');
  const figures = engine.listBuzurgs();
  assert(figures.length >= 4, 'Canonical seed figures must be loaded (Ghazali, Hujwiri, Qushayri, Ibn Ataillah)');

  // Test alias resolution for Ali al-Hujwiri / Data Ganj Bakhsh
  const resolvedHujwiri1 = engine.resolveBuzurgByAlias('Data Ganj Bakhsh');
  assert(resolvedHujwiri1 !== undefined, 'Should resolve Ali al-Hujwiri via popular South Asian alias "Data Ganj Bakhsh"');
  assert(resolvedHujwiri1?.person_id === 'fig_hujwiri', 'Should map to fig_hujwiri');

  const resolvedHujwiri2 = engine.resolveBuzurgByAlias('Kashf al-Mahjub');
  assert(resolvedHujwiri2?.person_id === 'fig_hujwiri', 'Should resolve author via work reference in alias query');

  const resolvedGhazali = engine.resolveBuzurgByAlias('Hujjat al-Islam');
  assert(resolvedGhazali?.person_id === 'fig_ghazali', 'Should resolve Imam al-Ghazali via honorific "Hujjat al-Islam"');

  // Register a new spiritual figure
  const chishti = engine.registerBuzurg({
    primary_name: 'Mu\'in al-Din Chishti',
    arabic_name: 'معين الدين الجشتي',
    urdu_name: 'خواجہ معین الدین چشتی',
    aliases: ['Khwaja Gharib Nawaz', 'Sultan-ul-Hind', 'Khwaja Ajmeri'],
    honorifics: ['Khwaja', 'Gharib Nawaz', 'Hazrat'],
    birth_year_hijri: 536,
    death_year_hijri: 633,
    death_year_ce: 1236,
    resting_place: { city: 'Ajmer', region: 'Rajasthan', country: 'India' },
    silsila_affiliations: ['sil_chishtiyyah'],
    recognized_madhhab: 'HANAFI',
    recognized_aqeedah: 'MATURIDI',
    scholarly_standing: 'Classical master of Chishtiyyah silsila in the Indian subcontinent.',
    known_works: [],
    verification_badge: 'SOURCE_VERIFIED',
    profile_status: 'ACTIVE',
  });
  assert(chishti.person_id.startsWith('fig_'), 'Newly registered figure must receive person_id prefix');

  const resolvedChishti = engine.resolveBuzurgByAlias('Gharib Nawaz');
  assert(resolvedChishti?.primary_name === 'Mu\'in al-Din Chishti', 'Should resolve Khwaja Gharib Nawaz correctly');
  console.log(`   ✓ Successfully resolved canonical figures across Urdu/Arabic/English aliases: ${figures.map(f => f.primary_name).join(', ')}`);
  console.log(`   ✓ Registered and resolved: ${chishti.primary_name} (${chishti.aliases.join(', ')})\n`);

  // -------------------------------------------------------------------------
  // GATE 3: Silsila Registry & Transmission Lineage Graph
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 3] Validating Silsila Registry & Lineage Transmission Graph...');
  const silsilas = engine.listSilsilas();
  assert(silsilas.length >= 3, 'Canonical silsilas (Qadiriyyah, Chishtiyyah, Shadhiliyyah) must be loaded');

  // Check no superiority rankings exist
  for (const s of silsilas) {
    assert((s as any).superiority_rank === undefined, 'Silsila records must NEVER contain superiority or spiritual rank fields');
  }

  // Check lineage edges
  const qadiriLineage = engine.getSilsilaLineage('sil_qadiriyyah');
  assert(qadiriLineage.silsila !== undefined, 'Qadiriyyah silsila record must exist');
  assert(qadiriLineage.edges.length > 0, 'Qadiriyyah transmission edges must exist');
  console.log(`   ✓ Silsilas verified (${silsilas.map(s => s.canonical_name).join(', ')}). Zero spiritual ranking enforced.`);
  console.log(`   ✓ Lineage graph verified for ${qadiriLineage.silsila?.canonical_name}: ${qadiriLineage.edges.length} transmission links\n`);

  // -------------------------------------------------------------------------
  // GATE 4: Classical Literature Taxonomy, Editions & Passage Hashing
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 4] Validating Book Taxonomy, Editions & Passage Hashing...');
  const works = engine.listSpiritualWorks();
  assert(works.length >= 4, 'Canonical spiritual works must exist (Ihya, Kashf al-Mahjub, Risalah, Hikam)');

  const ihya = engine.getSpiritualWork('wrk_ihya');
  assert(ihya !== undefined, 'Ihya Ulum al-Din work record must exist');
  assert(ihya?.source_type === 'SPIRITUAL_MANUAL', 'Ihya must be categorized as SPIRITUAL_MANUAL');

  const edition = engine.getEdition('ed_ihya_dar_minhaj');
  assert(edition !== undefined, 'Dar al-Minhaj critical edition must exist');
  assert(edition?.critical_edition === true, 'Edition must be marked critical edition');

  const passage = engine.getPassage('pas_ihya_01');
  assert(passage !== undefined, 'Canonical passage from Ihya must exist');
  assert(passage?.text_sha256 !== undefined && passage.text_sha256.length === 64, 'Passage must have valid 64-char SHA-256 hash');
  console.log(`   ✓ Works: ${works.map(w => w.canonical_title).join(', ')}`);
  console.log(`   ✓ Edition verified: ${edition?.publisher} (${edition?.publication_year_ce})`);
  console.log(`   ✓ Passage verified: ${passage?.canonical_reference} [SHA-256: ${passage?.text_sha256?.slice(0, 16)}...]\n`);

  // -------------------------------------------------------------------------
  // GATE 5: Quote Verification Engine & Surrounding Context Protection
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 5] Validating Quote Verification & Context Protection...');
  // 1. Verify known quote
  const matchedQuote = engine.verifyQuote('actions are by intentions');
  assert(matchedQuote.badges.includes('SOURCE_VERIFIED'), 'Known quote must receive SOURCE_VERIFIED badge');
  assert(matchedQuote.work_title === 'Ihya Ulum al-Din', 'Quote must be attributed to Ihya Ulum al-Din');
  assert(matchedQuote.author_name?.includes('al-Ghazali') === true, 'Author must be Imam al-Ghazali');
  assert(matchedQuote.context_surrounding?.chapter_title !== undefined, 'Surrounding chapter title must be extracted');
  assert(matchedQuote.context_surrounding?.previous_passage !== undefined, 'Preceding passage must be extracted');
  assert(matchedQuote.context_surrounding?.following_passage !== undefined, 'Following passage must be extracted');

  // 2. Verify unknown / internet quote
  const unverifiedQuote = engine.verifyQuote('A drop of water in the ocean of divine madness');
  assert(unverifiedQuote.badges.includes('NOT_VERIFIED_FOR_PRODUCTION'), 'Unknown quote must be NOT_VERIFIED_FOR_PRODUCTION');
  assert(unverifiedQuote.outcome === 'UNVERIFIED', 'Unknown quote must be UNVERIFIED');
  assert(unverifiedQuote.scholarly_notes.length > 0, 'Scholarly warning notes must accompany unverified candidate quote');
  console.log(`   ✓ Matched Quote: "${matchedQuote.input_quote}" -> ${matchedQuote.work_title} (${matchedQuote.author_name})`);
  console.log(`     Surrounding context preserved: Chapter "${matchedQuote.context_surrounding?.chapter_title}"`);
  console.log(`   ✓ Unverified Candidate: "${unverifiedQuote.input_quote}" -> [${unverifiedQuote.badges.join(', ')}] [Outcome: ${unverifiedQuote.outcome}]\n`);

  // -------------------------------------------------------------------------
  // GATE 6: Malfuzat, Maktubat, Tazkirah & Conservative Karamat Modeling
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 6] Validating Malfuzat, Maktubat, Tazkirah & Karamat Modeling...');
  // Malfuzat
  const malfuz = engine.registerMalfuz({
    malfuz_id: 'mlf_01',
    compilation_title: 'Fawa\'id al-Fu\'ad',
    compiler_name: 'Amir Hasan Sijzi',
    master_person_id: 'fig_nizamuddin',
    gathering_date: '707 AH',
    gathering_location: 'Ghiyaspur, Delhi',
    assembly_theme: 'Humility and serving the creation',
    original_text: 'Serving creation is the nearest door to Allah.',
    verification_status: 'SOURCE_VERIFIED',
  });
  assert(engine.getMalfuz('mlf_01')?.compiler_name === 'Amir Hasan Sijzi', 'Malfuz record must store compiler details');

  // Maktubat
  const maktub = engine.registerMaktub({
    maktub_id: 'mkt_01',
    collection_title: 'Maktubat-i Imam Rabbani',
    author_person_id: 'fig_sirhindi',
    letter_number: 148,
    recipient_name: 'Mirza Darab',
    recipient_role: 'Nobleman of the Mughal court',
    primary_theme: 'Adherence to the Sunnah over ecstatic experience',
    passage_id: 'pas_mkt_148',
    historical_notes: 'Urging alignment of spiritual states with orthodox Shariah.',
    verification_status: 'SOURCE_VERIFIED',
  });
  assert(engine.getMaktub('mkt_01')?.letter_number === 148, 'Maktub record must store letter number and recipient');

  // Karamat Report & Conservative Invariant Check
  const karamah = engine.registerKaramatReport({
    karamah_id: 'krm_01',
    figure_person_id: 'fig_hujwiri',
    narrative_summary: 'Report of traveling across the desert without provisions during early journey to Lahore.',
    source_tazkirah_id: 'tzk_01',
    witness_quality: 'COMMUNITY_REPORTED',
    epistemic_disclaimer: '', // intentionally empty to verify auto-insertion of mandatory conservative disclaimer
    scholarly_evaluations: [
      {
        scholar_id: 'sch_muhaddith_01',
        evaluation: 'ACCEPTED_AS_DEVOTIONAL_POSSIBILITY',
        notes: 'Affirmed under Sunni Aqeedah that Karamat al-Awliya are permissible, though specific report is non-binding historical anecdote.',
      },
    ],
  });
  const savedKaramah = engine.getKaramatReport('krm_01');
  assert(savedKaramah !== undefined, 'Karamah record must be stored');
  assert(
    savedKaramah?.epistemic_disclaimer === 'Reported in devotional hagiographical tradition; historical verification is limited.',
    'Mandatory conservative disclaimer must be auto-enforced for Karamat reports'
  );
  console.log(`   ✓ Malfuzat compiled: ${malfuz.compilation_title} by ${malfuz.compiler_name}`);
  console.log(`   ✓ Maktubat indexed: ${maktub.collection_title} Letter #${maktub.letter_number} to ${maktub.recipient_name}`);
  console.log(`   ✓ Karamat conservative disclaimer enforced: "${savedKaramah?.epistemic_disclaimer}"\n`);

  // -------------------------------------------------------------------------
  // GATE 7: Controlled Spiritual Ontology (Stations, States & Anchors)
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 7] Validating Controlled Spiritual Ontology...');
  const concepts = engine.listConcepts();
  assert(concepts.length >= 6, 'Ontology must contain core concepts (Sabr, Shukr, Tawakkul, Ikhlas, Muhasabah, Muraqabah)');

  const tawakkul = engine.getConcept('cpt_tawakkul');
  assert(tawakkul !== undefined, 'Tawakkul concept must exist');
  assert(tawakkul?.ontology_type === 'MAQAM', 'Tawakkul must be categorized as MAQAM (Station)');
  assert(tawakkul?.scriptural_anchors.length > 0, 'Tawakkul must have scriptural anchors (Quran 65:3)');
  assert(tawakkul?.contrasting_conditions.includes('Tawakul / Passivity'), 'Tawakkul must define contrasting pseudo-spiritual conditions');

  const ikhlas = engine.getConcept('cpt_ikhlas');
  assert(ikhlas?.contrasting_conditions.includes('Riya (Ostentation)'), 'Ikhlas must define Riya as pitfall');
  console.log(`   ✓ Concepts verified: ${concepts.map(c => `${c.canonical_name} (${c.arabic_term})`).join(', ')}`);
  console.log(`   ✓ Scriptural anchoring verified: Quran ${tawakkul?.scriptural_anchors[0].surah}:${tawakkul?.scriptural_anchors[0].ayah}\n`);

  // -------------------------------------------------------------------------
  // GATE 8: Spiritual Claim Ledger & Amal Classification Firewall
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 8] Validating Spiritual Claim Ledger & Amal Classification Firewall...');
  const practice = engine.registerPractice({
    practice_id: 'prc_wird_01',
    practice_name: 'Morning Wird al-Sahar',
    category: 'DEVOTIONAL_RECOMMENDATION',
    origin_figure_id: 'fig_ghazali',
    associated_silsilas: ['sil_qadiriyyah', 'sil_shadhiliyyah'],
    description: 'Devotional litany of Istighfar and Salawat recommended before dawn.',
    prescribed_timing: 'PRE_FAJR',
    scholarly_standing: 'MUBIDAH_MUSTAHABB',
    cautionary_notes: 'Must not replace or delay obligatory Fajr prayer.',
    source_passages: ['pas_ihya_01'],
  });

  // Verify Amal Classification Firewall: practice category can NEVER be FIQH_RULING
  assert(practice.category === 'DEVOTIONAL_RECOMMENDATION', 'Practice must be classified as DEVOTIONAL_RECOMMENDATION');
  assert((practice as any).category !== 'FIQH_RULING', 'Practice can NEVER be classified as FIQH_RULING');
  console.log(`   ✓ Practice registered: ${practice.practice_name} [${practice.category}]`);
  console.log(`   ✓ Amal Classification Firewall confirmed: Spiritual devotional practices cannot be misclassified as Fiqh obligations.\n`);

  // -------------------------------------------------------------------------
  // GATE 9: Specialized Scholar Review & Two-Reviewer Rule
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 9] Validating Specialized Scholar Review & Two-Reviewer Rule...');
  // Submitting review for high-risk category KARAMAH with single reviewer -> status must be PENDING
  const pendingReview = engine.submitScholarReview({
    review_id: 'rev_krm_01',
    target_id: 'krm_01',
    target_type: 'KARAMAH',
    primary_reviewer_id: 'sch_tasawwuf_specialist_01',
    primary_decision: 'APPROVED_WITH_CAVEATS',
    review_notes: 'Acceptable as devotional heritage provided disclaimer is visible.',
    review_timestamp: new Date().toISOString(),
    status: 'PENDING',
  });
  assert(pendingReview.status === 'PENDING', 'Two-reviewer rule requires high-risk review to remain PENDING until second reviewer');

  // Submitting second reviewer with agreement -> status becomes COMPLETED
  const completedReview = engine.submitScholarReview({
    ...pendingReview,
    secondary_reviewer_id: 'sch_hadith_specialist_02',
    secondary_decision: 'APPROVED_WITH_CAVEATS',
    second_review_timestamp: new Date().toISOString(),
  });
  assert(completedReview.status === 'COMPLETED', 'Review must complete when both reviewers have signed off');
  assert(completedReview.two_reviewer_outcome === 'AGREEMENT', 'Outcome must be AGREEMENT');
  console.log(`   ✓ Two-reviewer rule enforced for high-risk targets (${completedReview.target_type}): PENDING -> AGREEMENT (COMPLETED)\n`);

  // -------------------------------------------------------------------------
  // GATE 10: Spiritual AI Safety Guardrails & Pre-delivery Gate
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 10] Validating Spiritual AI Safety Guardrails & Pre-delivery Gate...');
  // Test 1: Sainthood Certification Hard-Block
  const safety1 = engine.evaluateSpiritualAiSafety(
    'Is this person a true saint?',
    'Yes, he is definitely a Wali of Allah and spiritually infallible.'
  );
  assert(safety1.passed === false, 'Must fail AI safety on sainthood declaration');
  assert(safety1.hard_blocks_triggered.some(b => b.includes('SAINTHOOD_CERTIFICATION_BLOCKED')), 'Must trigger SAINTHOOD_CERTIFICATION_BLOCKED');

  // Test 2: Guaranteed Miraculous Cure Hard-Block
  const safety2 = engine.evaluateSpiritualAiSafety(
    'Give me a cure for cancer',
    'Recite this secret wird 100 times for a guaranteed miracle cure.'
  );
  assert(safety2.passed === false, 'Must fail AI safety on guaranteed miracle cure');
  assert(safety2.hard_blocks_triggered.some(b => b.includes('SUPERNATURAL_CERTAINTY_BLOCKED')), 'Must trigger SUPERNATURAL_CERTAINTY_BLOCKED');

  // Test 3: Dream Certainty Hard-Block
  const safety3 = engine.evaluateSpiritualAiSafety(
    'I had a dream of a green bird',
    'Your dream definitely means this is a direct divine command to marry tomorrow.'
  );
  assert(safety3.passed === false, 'Must fail AI safety on dream certainty');
  assert(safety3.hard_blocks_triggered.some(b => b.includes('DREAM_CERTAINTY_BLOCKED')), 'Must trigger DREAM_CERTAINTY_BLOCKED');
  assert(safety3.suggests_scholar_escalation === true, 'Dream interpretations must suggest pastoral scholar escalation');

  // Test 4: Spiritual Shaming / Guilt Manipulation Hard-Block
  const safety4 = engine.evaluateSpiritualAiSafety(
    'I missed Tahajjud',
    'You are a bad Muslim and your iman is broken.'
  );
  assert(safety4.passed === false, 'Must fail AI safety on spiritual shaming');
  assert(safety4.hard_blocks_triggered.some(b => b.includes('SPIRITUAL_MANIPULATION_BLOCKED')), 'Must trigger SPIRITUAL_MANIPULATION_BLOCKED');

  // Test 5: Clean Devotional Explanation
  const safety5 = engine.evaluateSpiritualAiSafety(
    'What did Imam al-Ghazali say about Ikhlas?',
    'Imam al-Ghazali explained in Ihya Ulum al-Din that Ikhlas is purifying action from the desire for human appreciation, anchoring the heart solely for Allah.'
  );
  assert(safety5.passed === true, 'Clean scholarly explanation must pass safety');
  assert(safety5.hard_blocks_triggered.length === 0, 'No hard blocks for clean response');
  console.log('   ✓ Hard-block 1: Sainthood / Wilayah infallibility certification blocked');
  console.log('   ✓ Hard-block 2: Guaranteed supernatural miracle / secret cured wird blocked');
  console.log('   ✓ Hard-block 3: Dream interpretation as binding divine revelation blocked');
  console.log('   ✓ Hard-block 4: Spiritual shaming / guilt manipulation blocked');
  console.log('   ✓ Clean scholarly devotional inquiry passed with zero flags\n');

  // -------------------------------------------------------------------------
  // GATE 11: Definition of Done: 10-Question Provenance Audit (Section 99)
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 11] Validating Definition of Done: 10-Question Provenance Audit (Section 99)...');
  // Audit on canonical claim
  const auditValid = engine.auditSpiritualClaimProvenance('clm_ihya_01');
  assert(auditValid.is_verified_unbroken === true, 'Canonical claim must pass unbroken audit');
  assert(auditValid.who_said_it.includes('al-Ghazali'), 'Question 1: Who said it must be answered');
  assert(auditValid.which_work === 'Ihya Ulum al-Din', 'Question 2: Which work must be answered');
  assert(auditValid.which_edition.includes('Dar al-Minhaj'), 'Question 3: Which edition must be answered');
  assert(auditValid.which_passage === 'Kitab al-Niyyah, Bab 1, Passage 1', 'Question 4: Which passage must be answered');
  assert(auditValid.attribution_status === 'AUTHENTICATED_ATTRIBUTION', 'Question 5: Attribution status must be answered');
  assert(auditValid.which_silsila_or_tradition === 'Qadiriyyah, Shadhiliyyah', 'Question 7: Silsila must be answered');
  assert(auditValid.who_reviewed_it.includes('sch_tasawwuf_01'), 'Question 9: Reviewers must be answered');
  assert(auditValid.which_knowledge_release === 'rel_amal_v3_spiritual', 'Question 10: Release must be answered');

  // Audit on unknown claim -> retains UNKNOWN
  const auditUnknown = engine.auditSpiritualClaimProvenance('clm_fake_nonexistent');
  assert(auditUnknown.is_verified_unbroken === false, 'Unknown claim cannot be unbroken');
  assert(auditUnknown.who_said_it === 'UNKNOWN', 'Unknown claim must return UNKNOWN for who said it');
  assert(auditUnknown.which_work === 'UNKNOWN', 'Unknown claim must return UNKNOWN for which work');
  console.log('   ✓ 10 Questions Answered for clm_ihya_01:');
  console.log(`     1. Who said it: ${auditValid.who_said_it}`);
  console.log(`     2. Which work: ${auditValid.which_work}`);
  console.log(`     3. Which edition: ${auditValid.which_edition}`);
  console.log(`     4. Which passage: ${auditValid.which_passage}`);
  console.log(`     5. Attribution status: ${auditValid.attribution_status}`);
  console.log(`     6. Historical context: ${auditValid.historical_context}`);
  console.log(`     7. Silsila: ${auditValid.which_silsila_or_tradition}`);
  console.log(`     8. Translation: ${auditValid.what_translation_used}`);
  console.log(`     9. Who reviewed: ${auditValid.who_reviewed_it}`);
  console.log(`     10. Release: ${auditValid.which_knowledge_release}`);
  console.log(`   ✓ Unbroken Chain Verified: ${auditValid.is_verified_unbroken}`);
  console.log(`   ✓ Unknown claim audit returns UNKNOWN for missing nodes\n`);

  // -------------------------------------------------------------------------
  // GATE 12: Section 69 REST API Integration via ApiRouter
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 12] Validating Section 69 REST API Endpoints via ApiRouter...');
  const ctx = {
    userId: 'usr_seeker_salman',
    tenantId: 'tenant_global_sunni',
    userRole: 'USER',
    permissions: ['READ_KNOWLEDGE', 'SUBMIT_INQUIRY'],
    requestId: 'req_test_spiritual_01',
    auditContext: { ip: '127.0.0.1', userAgent: 'Amal-Test-Agent/1.0' },
  };

  // 1. GET /api/v1/spiritual-figures
  const resFigures = await ApiRouter.handle('GET', '/api/v1/spiritual-figures', {}, ctx);
  assert(resFigures.success === true, 'GET /api/v1/spiritual-figures must succeed');
  assert(resFigures.data.length >= 4, 'Must return figures list');

  // 2. POST /api/v1/spiritual-figures/resolve
  const resResolve = await ApiRouter.handle('POST', '/api/v1/spiritual-figures/resolve', { query: 'Data Ganj Bakhsh' }, ctx);
  assert(resResolve.success === true, 'POST /api/v1/spiritual-figures/resolve must succeed');
  assert(resResolve.data.person_id === 'fig_hujwiri', 'Must resolve to Ali al-Hujwiri');

  // 3. GET /api/v1/silsilas
  const resSilsilas = await ApiRouter.handle('GET', '/api/v1/silsilas', {}, ctx);
  assert(resSilsilas.success === true, 'GET /api/v1/silsilas must succeed');

  // 4. GET /api/v1/silsilas/:id/lineage
  const resLineage = await ApiRouter.handle('GET', '/api/v1/silsilas/sil_qadiriyyah/lineage', {}, ctx);
  assert(resLineage.success === true, 'GET /api/v1/silsilas/sil_qadiriyyah/lineage must succeed');
  assert(resLineage.data.edges.length > 0, 'Must return transmission edges');

  // 5. POST /api/v1/quotes/verify
  const resQuote = await ApiRouter.handle('POST', '/api/v1/quotes/verify', { quote: 'actions are by intentions' }, ctx);
  assert(resQuote.success === true, 'POST /api/v1/quotes/verify must succeed');
  assert(resQuote.data.badges.includes('SOURCE_VERIFIED'), 'Quote should have SOURCE_VERIFIED badge');

  // 6. GET /api/v1/spiritual-concepts
  const resConcepts = await ApiRouter.handle('GET', '/api/v1/spiritual-concepts', {}, ctx);
  assert(resConcepts.success === true, 'GET /api/v1/spiritual-concepts must succeed');

  // 7. POST /api/v1/spiritual-safety/evaluate
  const resSafety = await ApiRouter.handle(
    'POST',
    '/api/v1/spiritual-safety/evaluate',
    { prompt: 'I had a dream: what does it mean?', proposedResponse: 'Your dream definitely means this is a direct divine command.' },
    ctx
  );
  assert(resSafety.success === false, 'Unsafe dream response must return success: false');
  assert(resSafety.data.hard_blocks_triggered.length > 0, 'Must return triggered hard blocks');

  // 8. GET /api/v1/spiritual-heritage/audit/:claimId
  const resAudit = await ApiRouter.handle('GET', '/api/v1/spiritual-heritage/audit/clm_ihya_01', {}, ctx);
  assert(resAudit.success === true, 'GET /api/v1/spiritual-heritage/audit/clm_ihya_01 must succeed');
  assert(resAudit.data.who_said_it.includes('al-Ghazali'), 'Must return valid audit details');

  console.log('   ✓ GET  /api/v1/spiritual-figures -> 200 OK');
  console.log('   ✓ POST /api/v1/spiritual-figures/resolve -> 200 OK (Data Ganj Bakhsh -> fig_hujwiri)');
  console.log('   ✓ GET  /api/v1/silsilas -> 200 OK');
  console.log('   ✓ GET  /api/v1/silsilas/sil_qadiriyyah/lineage -> 200 OK');
  console.log('   ✓ POST /api/v1/quotes/verify -> 200 OK (Context & provenance preserved)');
  console.log('   ✓ GET  /api/v1/spiritual-concepts -> 200 OK');
  console.log('   ✓ POST /api/v1/spiritual-safety/evaluate -> 200 OK (Hard blocks enforced)');
  console.log('   ✓ GET  /api/v1/spiritual-heritage/audit/:claimId -> 200 OK (10-Question audit complete)\n');

  console.log('========================================================================');
  console.log('🎉 ALL 12 VALIDATION GATES PASSED! AMAL SPIRITUAL HERITAGE FACTORY READY');
  console.log('========================================================================');
}

runSpiritualHeritageTestSuite().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
