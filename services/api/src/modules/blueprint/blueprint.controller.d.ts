import { BlueprintService } from './blueprint.service';
import { SystemComponent, SystemCertification, MasterRouteCatalogEntry, MasterAgentCatalogEntry, SystemInvariant, MasterBlueprintTopology } from '@amal/types';
export declare class BlueprintController {
    private readonly blueprintService;
    constructor(blueprintService: BlueprintService);
    getTopology(): {
        status: string;
        data: SystemComponent[];
    };
    getCertifications(): {
        status: string;
        data: SystemCertification[];
    };
    getInvariants(): {
        status: string;
        data: SystemInvariant[];
    };
    getRoutes(): {
        status: string;
        data: MasterRouteCatalogEntry[];
    };
    getAgents(): {
        status: string;
        data: MasterAgentCatalogEntry[];
    };
    getMigrations(): {
        status: string;
        data: Array<{
            version: string;
            filename: string;
            description: string;
        }>;
    };
    exportBlueprint(): {
        status: string;
        data: MasterBlueprintTopology;
    };
}
//# sourceMappingURL=blueprint.controller.d.ts.map