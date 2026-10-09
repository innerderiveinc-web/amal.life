/**
 * Notification Worker
 * Dispatches gentle, shame-free prayer and Amal reminders
 */
export declare function processNotificationJob(job: {
    userId: string;
    amalTitle: string;
    reminderStyle: string;
}): Promise<{
    dispatched: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=notification.worker.d.ts.map