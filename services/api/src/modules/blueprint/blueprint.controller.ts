import { Controller, Get } from '@nestjs/common';
import { BlueprintService } from './blueprint.service';
import {
  SystemComponent,
  SystemCertification,
  MasterRouteCatalogEntry,
  MasterAgentCatalogEntry,
  SystemInvariant,
  MasterBlueprintTopology,
} from '@amal/types';

@Controller('blueprint')
export class BlueprintController {
  constructor(private readonly blueprintService: BlueprintService) {}

  @Get('topology')
  getTopology(): { status: string; data: SystemComponent[] } {
    return {
      status: 'success',
      data: this.blueprintService.getSystemTopology(),
    };
  }

  @Get('certifications')
  getCertifications(): { status: string; data: SystemCertification[] } {
    return {
      status: 'success',
      data: this.blueprintService.getSystemCertifications(),
    };
  }

  @Get('invariants')
  getInvariants(): { status: string; data: SystemInvariant[] } {
    return {
      status: 'success',
      data: this.blueprintService.getSystemInvariants(),
    };
  }

  @Get('routes')
  getRoutes(): { status: string; data: MasterRouteCatalogEntry[] } {
    return {
      status: 'success',
      data: this.blueprintService.getMasterRoutes(),
    };
  }

  @Get('agents')
  getAgents(): { status: string; data: MasterAgentCatalogEntry[] } {
    return {
      status: 'success',
      data: this.blueprintService.getMasterAgents(),
    };
  }

  @Get('migrations')
  getMigrations(): { status: string; data: Array<{ version: string; filename: string; description: string }> } {
    return {
      status: 'success',
      data: this.blueprintService.getMigrationsCatalog(),
    };
  }

  @Get('export')
  exportBlueprint(): { status: string; data: MasterBlueprintTopology } {
    return {
      status: 'success',
      data: this.blueprintService.exportMasterBlueprint(),
    };
  }
}
