import {
  CommunicationChannel,
  CommunicationPurpose,
  ChannelConsent,
} from '@amal/types';

export interface ConsentCheckResult {
  allowed: boolean;
  effectiveChannel: CommunicationChannel;
  reason?: string;
  degradedFrom?: CommunicationChannel;
}

export class ConsentEngine {
  /**
   * Verifies explicit consent for a requested channel and purpose.
   * If a channel is unconsented, evaluates whether it can safely degrade down the hierarchy:
   * WHATSAPP -> PUSH -> IN_APP.
   */
  public static evaluateConsent(
    channel: CommunicationChannel,
    purpose: CommunicationPurpose,
    userConsents: Map<CommunicationChannel, ChannelConsent> | ChannelConsent[]
  ): ConsentCheckResult {
    // Convert array to map if necessary
    const consentMap = Array.isArray(userConsents)
      ? new Map(userConsents.map((c) => [c.channel, c]))
      : userConsents;

    // 1. IN_APP is always allowed for active user sessions
    if (channel === 'IN_APP') {
      return { allowed: true, effectiveChannel: 'IN_APP' };
    }

    // 2. Transactional & Security critical notifications check
    if (purpose === 'SECURITY' || purpose === 'TRANSACTIONAL') {
      const consent = consentMap.get(channel);
      if (consent && consent.status === 'OPTED_OUT') {
        // Fallback to IN_APP if user explicitly opted out of channel
        return {
          allowed: true,
          effectiveChannel: 'IN_APP',
          degradedFrom: channel,
          reason: `Opted out of ${channel}, downgraded to IN_APP for security/transactional notice.`,
        };
      }
      return { allowed: true, effectiveChannel: channel };
    }

    // 3. Routine Amal & Journey reminders: strictly require opt-in, never use Voice/SMS without explicit consent
    if (channel === 'VOICE' || channel === 'SMS') {
      const consent = consentMap.get(channel);
      if (!consent || consent.status !== 'OPTED_IN') {
        return {
          allowed: false,
          effectiveChannel: 'IN_APP',
          degradedFrom: channel,
          reason: `No explicit consent for ${channel}; disallowed for routine reminders.`,
        };
      }
    }

    // 4. WhatsApp consent verification
    if (channel === 'WHATSAPP') {
      const consent = consentMap.get('WHATSAPP');
      const isConsented = consent && consent.status === 'OPTED_IN';

      if (!isConsented) {
        // Degrade to PUSH if PUSH is consented, otherwise IN_APP
        const pushConsent = consentMap.get('PUSH');
        const pushAllowed = !pushConsent || pushConsent.status !== 'OPTED_OUT';
        const fallbackChannel: CommunicationChannel = pushAllowed ? 'PUSH' : 'IN_APP';

        return {
          allowed: true,
          effectiveChannel: fallbackChannel,
          degradedFrom: 'WHATSAPP',
          reason: `WhatsApp not consented. Degraded to ${fallbackChannel}.`,
        };
      }
    }

    // 5. PUSH consent verification
    if (channel === 'PUSH') {
      const consent = consentMap.get('PUSH');
      if (consent && consent.status === 'OPTED_OUT') {
        return {
          allowed: false,
          effectiveChannel: 'IN_APP',
          degradedFrom: 'PUSH',
          reason: 'Push notifications opted out by user.',
        };
      }

      // Purpose-specific gating for PUSH
      if (purpose === 'AMAL_REMINDER' && consent && consent.reminders === false) {
        return {
          allowed: false,
          effectiveChannel: 'IN_APP',
          degradedFrom: 'PUSH',
          reason: 'User disabled reminder category for push notifications.',
        };
      }

      if (purpose === 'JOURNEY' && consent && consent.journeyUpdates === false) {
        return {
          allowed: false,
          effectiveChannel: 'IN_APP',
          degradedFrom: 'PUSH',
          reason: 'User disabled journey updates for push notifications.',
        };
      }
    }

    return { allowed: true, effectiveChannel: channel };
  }
}
