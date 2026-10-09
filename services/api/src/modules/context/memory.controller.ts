import { Controller, Get, Post, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { MemoryManager } from '@amal/service-ai';

@Controller('memory')
@UseGuards(AuthGuard)
export class MemoryController {
  @Get()
  async getMemory(@CurrentUser() user: AuthenticatedUser) {
    const confirmed = MemoryManager.getConfirmedMemories(user.userId);
    const journeys = MemoryManager.getJourneyMemories(user.userId);
    const insights = MemoryManager.getDerivedInsights(user.userId);
    const candidates = MemoryManager.getPendingCandidates(user.userId);

    return {
      success: true,
      data: {
        l0_session: null,
        l1_journey: journeys,
        l2_confirmed_preferences: confirmed,
        l3_derived_insights: insights,
        pending_candidates: candidates,
      },
    };
  }

  @Delete(':id')
  async deleteMemory(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string
  ) {
    const deleted = MemoryManager.deleteConfirmedMemory(user.userId, id);
    return {
      success: true,
      data: {
        memoryId: id,
        deleted,
      },
    };
  }

  @Patch(':id')
  async updateMemory(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: { value: string }
  ) {
    const updated = MemoryManager.updateConfirmedMemory(user.userId, id, body?.value || '');
    return {
      success: true,
      data: {
        memoryId: id,
        updated: !!updated,
        memory: updated,
      },
    };
  }

  @Post(':id/confirm')
  async confirmCandidate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') candidateId: string
  ) {
    const success = MemoryManager.processConfirmation({
      candidateId,
      userId: user.userId,
      decision: 'CONFIRM',
      timestamp: new Date().toISOString(),
    });
    return {
      success,
      data: { candidateId, status: 'CONFIRMED' },
    };
  }

  @Post(':id/reject')
  async rejectCandidate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') candidateId: string
  ) {
    const success = MemoryManager.processConfirmation({
      candidateId,
      userId: user.userId,
      decision: 'REJECT',
      timestamp: new Date().toISOString(),
    });
    return {
      success,
      data: { candidateId, status: 'REJECTED' },
    };
  }
}
