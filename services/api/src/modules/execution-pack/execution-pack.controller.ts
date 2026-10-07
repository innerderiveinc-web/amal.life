import { Controller, Get, Param } from '@nestjs/common';
import { ExecutionPackService } from './execution-pack.service';
import {
  ExecutionModule,
  CriticalUserJourney,
  SprintExecutionPlan,
  ExecutionPackReadinessReport,
} from '@amal/types';

@Controller('execution-pack')
export class ExecutionPackController {
  constructor(private readonly executionPackService: ExecutionPackService) {}

  @Get('modules')
  getModules(): { status: string; data: ExecutionModule[] } {
    return {
      status: 'success',
      data: this.executionPackService.getModules(),
    };
  }

  @Get('modules/:code')
  getModule(@Param('code') code: string): { status: string; data: ExecutionModule } {
    const mod = this.executionPackService.getModule(code);
    if (!mod) throw new Error(`Module ${code} not found in execution pack.`);
    return {
      status: 'success',
      data: mod,
    };
  }

  @Get('cujs')
  getCriticalUserJourneys(): { status: string; data: CriticalUserJourney[] } {
    return {
      status: 'success',
      data: this.executionPackService.getCriticalUserJourneys(),
    };
  }

  @Get('cujs/:id')
  getCriticalUserJourney(@Param('id') id: string): { status: string; data: CriticalUserJourney } {
    const cuj = this.executionPackService.getCriticalUserJourney(id);
    if (!cuj) throw new Error(`CUJ ${id} not found in execution pack.`);
    return {
      status: 'success',
      data: cuj,
    };
  }

  @Get('sprints')
  getSprintPlans(): { status: string; data: SprintExecutionPlan[] } {
    return {
      status: 'success',
      data: this.executionPackService.getSprintPlans(),
    };
  }

  @Get('readiness')
  getReadinessReport(): { status: string; data: ExecutionPackReadinessReport } {
    return {
      status: 'success',
      data: this.executionPackService.getReadinessReport(),
    };
  }
}
