import { CommunicationTemplate } from '@amal/types';
export declare const FORBIDDEN_TEMPLATE_VARIABLES: string[];
export declare class TemplateEngine {
    private static readonly APPROVED_TEMPLATES;
    /**
     * Retrieves an approved template by slug
     */
    static getTemplate(slug: string): CommunicationTemplate | undefined;
    /**
     * Renders a governed template safely.
     * Throws if forbidden sensitive variables are supplied or if Class E content is attempted.
     */
    static render(template: CommunicationTemplate, variables: Record<string, string>): {
        title: string;
        body: string;
    };
}
//# sourceMappingURL=template-engine.d.ts.map