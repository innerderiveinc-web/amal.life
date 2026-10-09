"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEngine = exports.FORBIDDEN_TEMPLATE_VARIABLES = void 0;
exports.FORBIDDEN_TEMPLATE_VARIABLES = [
    'private_reflection',
    'reflection_text',
    'scholar_case_details',
    'scholar_case_text',
    'sensitive_context',
    'confidential_note',
    'sins',
    'guilt_metric',
];
class TemplateEngine {
    static APPROVED_TEMPLATES = new Map([
        [
            'prayer_approaching',
            {
                id: 'tmpl-prayer-001',
                slug: 'prayer_approaching',
                purpose: 'PRAYER_CONTEXT',
                contentClass: 'CLASS_A_NEUTRAL',
                titleTemplate: '{{prayer_name}} is Approaching',
                bodyTemplate: 'In approximately {{minutes_until}} minutes. Prepare with ease and calm.',
                allowedVariables: ['prayer_name', 'minutes_until'],
                locale: 'en',
                status: 'APPROVED',
            },
        ],
        [
            'amal_daily_step',
            {
                id: 'tmpl-amal-001',
                slug: 'amal_daily_step',
                purpose: 'AMAL_REMINDER',
                contentClass: 'CLASS_B_EVIDENCE_LINKED',
                titleTemplate: 'Today\'s Small Step',
                bodyTemplate: '{{amal_title}}: A mindful action to bring peace to your day.',
                allowedVariables: ['amal_title', 'journey_title'],
                locale: 'en',
                status: 'APPROVED',
            },
        ],
        [
            'scholar_response_notification',
            {
                id: 'tmpl-scholar-001',
                slug: 'scholar_response_notification',
                purpose: 'SCHOLAR',
                contentClass: 'CLASS_D_SCHOLARLY',
                titleTemplate: 'Scholar Guidance Available',
                bodyTemplate: 'A verified scholar has provided guidance on your inquiry. View privately in AMAL.',
                allowedVariables: ['scholar_name'],
                locale: 'en',
                status: 'APPROVED',
            },
        ],
        [
            'muhasabah_evening',
            {
                id: 'tmpl-muhasabah-001',
                slug: 'muhasabah_evening',
                purpose: 'REFLECTION',
                contentClass: 'CLASS_A_NEUTRAL',
                titleTemplate: 'A Calm Moment of Reflection',
                bodyTemplate: 'Take 2 minutes for your daily Muhasabah: what felt meaningful today?',
                allowedVariables: ['user_first_name'],
                locale: 'en',
                status: 'APPROVED',
            },
        ],
    ]);
    /**
     * Retrieves an approved template by slug
     */
    static getTemplate(slug) {
        return this.APPROVED_TEMPLATES.get(slug);
    }
    /**
     * Renders a governed template safely.
     * Throws if forbidden sensitive variables are supplied or if Class E content is attempted.
     */
    static render(template, variables) {
        // 1. Content class validation (Class E strictly forbidden)
        if (template.contentClass === 'CLASS_E_PERSONALIZED_JUDGMENT') {
            throw new Error('Class E (Personalized Religious Judgment) is strictly prohibited from templates.');
        }
        // 2. Sensitive variable leakage check
        const suppliedKeys = Object.keys(variables);
        for (const key of suppliedKeys) {
            if (exports.FORBIDDEN_TEMPLATE_VARIABLES.includes(key.toLowerCase())) {
                throw new Error(`Security Violation: Variable '${key}' contains sensitive user journal or scholar context and cannot be embedded in notification templates.`);
            }
        }
        // 3. Render title and body
        let title = template.titleTemplate;
        let body = template.bodyTemplate;
        for (const [key, value] of Object.entries(variables)) {
            if (template.allowedVariables.includes(key)) {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                title = title.replace(regex, value);
                body = body.replace(regex, value);
            }
        }
        return { title, body };
    }
}
exports.TemplateEngine = TemplateEngine;
//# sourceMappingURL=template-engine.js.map