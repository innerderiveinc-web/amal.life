import { SystemComponent, SystemCertification, MasterRouteCatalogEntry, MasterAgentCatalogEntry, SystemInvariant, MasterBlueprintTopology } from '@amal/types';
export declare class BlueprintService {
    private readonly components;
    private readonly certifications;
    private readonly invariants;
    private readonly masterAgents;
    getSystemTopology(): SystemComponent[];
    getSystemCertifications(): SystemCertification[];
    getSystemInvariants(): SystemInvariant[];
    getMasterAgents(): MasterAgentCatalogEntry[];
    getMigrationsCatalog(): Array<{
        version: string;
        filename: string;
        description: string;
    }>;
    getMasterRoutes(): MasterRouteCatalogEntry[];
    exportMasterBlueprint(): MasterBlueprintTopology;
}
//# sourceMappingURL=blueprint.service.d.ts.map