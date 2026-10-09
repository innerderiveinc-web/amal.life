"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amalApi = exports.AmalApiClient = void 0;
const offline_sync_1 = require("./offline-sync");
class AmalApiClient {
    baseUrl;
    constructor(baseUrl = 'https://api.amal-os.internal/v1') {
        this.baseUrl = baseUrl;
    }
    async getToday() {
        try {
            // In production environment:
            // const res = await fetch(`${this.baseUrl}/today`);
            // return await res.json();
            return {
                state: 'ACTIVE',
                greeting: 'Good morning',
                hijriDate: '14 Shawwal 1447',
                gregorianDate: 'Wednesday, 7 Oct',
                prayerTimeline: {
                    currentPrayer: 'Asr',
                    nextPrayer: 'Asr',
                    timeRemaining: 'in 42 min',
                    calculationMethod: 'Muslim World League · Standard Asr',
                    schedule: [
                        { name: 'Fajr', time: '5:12 AM', status: 'COMPLETED' },
                        { name: 'Sunrise', time: '6:34 AM', status: 'COMPLETED' },
                        { name: 'Dhuhr', time: '12:45 PM', status: 'COMPLETED' },
                        { name: 'Asr', time: '4:15 PM', status: 'CURRENT' },
                        { name: 'Maghrib', time: '6:58 PM', status: 'UPCOMING' },
                        { name: 'Isha', time: '8:24 PM', status: 'UPCOMING' },
                    ],
                },
                focusGoal: 'Quran Restart',
                primaryAmal: {
                    id: 'amal-today-01',
                    title: 'Read one page of Quran',
                    description: 'Quiet contemplation after Fajr or during your morning window.',
                    estimatedMinutes: 5,
                    minimum: {
                        instruction: 'Read 1 page with reflection',
                        durationMinutes: 5,
                    },
                    target: {
                        instruction: 'Read 5 pages with reflection',
                        durationMinutes: 15,
                    },
                    whyThisAmal: {
                        goalFit: 'You chose to restart your Quran routine.',
                        timeFit: 'You currently have around 10 minutes available.',
                        journeyFit: 'This is the minimum consistent action in Phase 1 (Restart).',
                        evidenceSummary: 'Directly supported by Quran 17:78 ("recitation at dawn is witnessed").',
                        personalization: 'Aligned with your stated preference for short, quiet morning habits.',
                    },
                    evidenceReference: 'Quran 17:78 & Sahih al-Bukhari 6464',
                    status: 'PENDING',
                },
                optionalAmal: {
                    id: 'amal-today-opt-01',
                    title: '2-Minute Bedtime Istighfar',
                    description: 'Brief moment of stillness and forgiveness before sleep.',
                    estimatedMinutes: 2,
                    minimum: { instruction: '33x Astaghfirullah quietly', durationMinutes: 2 },
                    target: { instruction: 'Sayyid al-Istighfar with meaning', durationMinutes: 3 },
                    whyThisAmal: {
                        goalFit: 'Daily presence and spiritual peace.',
                        timeFit: 'Takes under 2 minutes.',
                        journeyFit: 'Optional evening anchor.',
                        evidenceSummary: 'Sahih al-Bukhari 6306',
                        personalization: 'Requested gentle evening options.',
                    },
                    evidenceReference: 'Sahih al-Bukhari 6306',
                    status: 'PENDING',
                },
                activeJourney: {
                    journeyId: 'journey-quran-restart',
                    title: '30-Day Quran Restart',
                    currentDay: 4,
                    totalDays: 30,
                    phaseTitle: 'Phase 1: Restart Gently',
                    progressPercentage: 13,
                    pace: 'Very Easy',
                },
                reflectionStatus: {
                    isCompleted: false,
                    prompt: 'What is one small blessing you noticed in your routine today?',
                },
                contextualMessage: 'Restarting gently: every consistent small step is beloved to Allah.',
            };
        }
        catch (err) {
            if (!offline_sync_1.OfflineSyncService.getOnlineStatus()) {
                // Fallback to offline cached plan
            }
            throw err;
        }
    }
    async completeAmal(payload) {
        const idempotencyKey = payload.idempotencyKey || `idem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        if (!offline_sync_1.OfflineSyncService.getOnlineStatus()) {
            const action = offline_sync_1.OfflineSyncService.enqueueAction('AMAL_COMPLETION', { ...payload, idempotencyKey });
            return { success: true, eventId: action.id };
        }
        // In production: POST /api/v1/amal/:id/complete with Idempotency-Key
        return { success: true, eventId: `evt-${Date.now()}` };
    }
    async saveReflection(data) {
        if (!offline_sync_1.OfflineSyncService.getOnlineStatus()) {
            offline_sync_1.OfflineSyncService.enqueueAction('REFLECTION_SAVE', data);
            return { success: true };
        }
        return { success: true };
    }
}
exports.AmalApiClient = AmalApiClient;
exports.amalApi = new AmalApiClient();
//# sourceMappingURL=api-client.js.map