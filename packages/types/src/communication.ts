/**
 * AMAL OS — Layer 11 Communication & Notification Types
 * Definitive contracts for adaptive notifications, prayer context, fatigue scoring,
 * consent governance, collision handling, and QSURA CPaaS provider integration.
 */

export type CommunicationChannel =
  | 'IN_APP'
  | 'PUSH'
  | 'WHATSAPP'
  | 'EMAIL'
  | 'SMS'
  | 'VOICE';

export const COMMUNICATION_CHANNEL_HIERARCHY: Record<CommunicationChannel, number> = {
  IN_APP: 1,
  PUSH: 2,
  WHATSAPP: 3,
  EMAIL: 4,
  SMS: 5,
  VOICE: 6,
};

export type CommunicationPurpose =
  | 'TRANSACTIONAL'
  | 'SECURITY'
  | 'SCHOLAR'
  | 'JOURNEY'
  | 'AMAL_REMINDER'
  | 'REFLECTION'
  | 'PRAYER_CONTEXT';

export type CommunicationPriority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

export type PressurePreference = 'GENTLE' | 'BALANCED' | 'MINIMAL';

export type ChannelConsentStatus = 'OPTED_IN' | 'OPTED_OUT' | 'NOT_ASKED';

export interface ChannelConsent {
  userId: string;
  channel: CommunicationChannel;
  transactional: boolean;
  reminders: boolean;
  journeyUpdates: boolean;
  scholarUpdates: boolean;
  status: ChannelConsentStatus;
  updatedAt: string;
}

export interface CommunicationPreferences {
  userId: string;
  pressurePreference: PressurePreference;
  quietHoursEnabled: boolean;
  quietHoursStart: string; // e.g., '22:00:00'
  quietHoursEnd: string;   // e.g., '07:00:00'
  timezone: string;
  maxDailyReminders: number;
  digestFrequency: 'NONE' | 'DAILY' | 'WEEKLY';
  updatedAt: string;
}

export interface FatigueMetrics {
  userId: string;
  pushCount24h: number;
  whatsappCount24h: number;
  smsCount24h: number;
  emailCount7d: number;
  dismissalRate: number; // 0.0 - 1.0
  ignoreRate: number;    // 0.0 - 1.0
  fatigueScore: number;  // computed score
  lastPushAt?: string;
  lastWhatsappAt?: string;
  lastEmailAt?: string;
  lastNotificationAt?: string;
  updatedAt: string;
}

export type TemplateContentClass =
  | 'CLASS_A_NEUTRAL'
  | 'CLASS_B_EVIDENCE_LINKED'
  | 'CLASS_C_QUOTATION'
  | 'CLASS_D_SCHOLARLY';

export interface CommunicationTemplate {
  id: string;
  slug: string;
  purpose: CommunicationPurpose;
  contentClass: TemplateContentClass;
  evidenceId?: string;
  titleTemplate: string;
  bodyTemplate: string;
  allowedVariables: string[];
  locale: string;
  status: 'DRAFT' | 'APPROVED' | 'DEPRECATED';
}

export type NotificationJobStatus =
  | 'PENDING'
  | 'SCHEDULED'
  | 'SENT'
  | 'DELIVERED'
  | 'FAILED'
  | 'SUPPRESSED'
  | 'CANCELLED';

export type SuppressionReasonCode =
  | 'USER_ALREADY_ACTIVE'
  | 'NOTIFICATION_FATIGUE'
  | 'QUIET_HOURS'
  | 'NO_CONSENT'
  | 'DEDUPLICATED'
  | 'KILL_SWITCH_ACTIVE'
  | 'COMPLETED_AMAL'
  | 'EXPIRED';

export interface NotificationJob {
  id: string;
  userId: string;
  eventId?: string;
  purpose: CommunicationPurpose;
  channel: CommunicationChannel;
  scheduledAt: string;
  priority: CommunicationPriority;
  dedupeKey: string;
  idempotencyKey: string;
  contentRef?: string;
  status: NotificationJobStatus;
  suppressionReason?: SuppressionReasonCode | string;
  createdAt: string;
  updatedAt: string;
}

export type NotificationInteractionAction =
  | 'OPENED'
  | 'DISMISSED'
  | 'SNOOZED'
  | 'ACTION_COMPLETED';

export interface NotificationInteraction {
  id: string;
  jobId: string;
  userId: string;
  action: NotificationInteractionAction;
  occurredAt: string;
}

export type CalculationMethod =
  | 'MUSLIM_WORLD_LEAGUE'
  | 'ISNA'
  | 'KARACHI'
  | 'UMM_AL_QURA'
  | 'EGYPTIAN';

export type JuristicMethod = 'STANDARD' | 'HANAFI';

export interface PrayerCalculationProfile {
  userId: string;
  city: string;
  country: string;
  timezone: string;
  calculationMethod: CalculationMethod;
  juristicMethod: JuristicMethod;
  fajrOffsetMinutes: number;
  dhuhrOffsetMinutes: number;
  asrOffsetMinutes: number;
  maghribOffsetMinutes: number;
  ishaOffsetMinutes: number;
  updatedAt: string;
}

export type PrayerWindowStatus =
  | 'BEFORE_PRAYER'
  | 'PRAYER_WINDOW_OPEN'
  | 'NEAR_END'
  | 'WINDOW_CLOSED'
  | 'NEXT_PRAYER';

export interface DailyPrayerSchedule {
  userId: string;
  date: string; // YYYY-MM-DD
  fajr: string; // ISO string
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  currentPrayer?: string;
  nextPrayer?: string;
  windowStatus: PrayerWindowStatus;
  minutesToNextPrayer: number;
}

export type CommunicationDecisionAction =
  | 'SEND'
  | 'DEFER'
  | 'SUPPRESS'
  | 'DEGRADE_CHANNEL'
  | 'COLLAPSE_DIGEST';

export interface CommunicationDecisionResult {
  action: CommunicationDecisionAction;
  channel: CommunicationChannel;
  scheduledAt?: string;
  reason?: SuppressionReasonCode | string;
  job?: Partial<NotificationJob>;
  renderedTitle?: string;
  renderedBody?: string;
  auditTrail: {
    consentChecked: boolean;
    fatigueScore: number;
    quietHoursActive: boolean;
    activeSessionDetected: boolean;
    amalAlreadyCompleted: boolean;
    collisionHandled: boolean;
  };
}

export type UserActivityState =
  | 'ACTIVE'
  | 'LOW_ACTIVITY'
  | 'DORMANT'
  | 'RETURNING'
  | 'RESTARTED';

export interface SendMessageRequest {
  idempotencyKey: string;
  userId: string;
  channel: CommunicationChannel;
  title: string;
  body: string;
  destination: string; // token, phone, email
  metadata?: Record<string, unknown>;
}

export interface SendMessageResponse {
  success: boolean;
  providerMessageId?: string;
  provider: string;
  channel: CommunicationChannel;
  status: 'SENT' | 'QUEUED' | 'FAILED';
  error?: string;
}

export interface DeliveryWebhookPayload {
  providerMessageId: string;
  status: 'DELIVERED' | 'FAILED' | 'OPENED' | 'DISMISSED';
  timestamp: string;
  failureReason?: string;
}

export interface MessagingProvider {
  name: string;
  supportedChannels: CommunicationChannel[];
  send(req: SendMessageRequest): Promise<SendMessageResponse>;
  getStatus(providerMessageId: string): Promise<string>;
}

export type KillSwitchFlag =
  | 'STOP_ALL_PUSH'
  | 'STOP_ALL_WHATSAPP'
  | 'STOP_ALL_SMS'
  | 'STOP_ALL_VOICE'
  | 'STOP_ALL_OUTBOUND';
