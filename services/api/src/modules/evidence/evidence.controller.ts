import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EvidenceService } from './evidence.service.js';

export interface SearchEvidenceDto {
  query: string;
  maxResults?: number;
}

@Controller('evidence')
export class EvidenceController {
  constructor(private readonly service: EvidenceService) {}

  @Post('search')
  async search(@Body() dto: SearchEvidenceDto) {
    return this.service.search(dto.query, dto.maxResults || 5);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const item = await this.service.getById(id);
    if (!item) return { error: 'Evidence not found', status: 404 };
    return item;
  }

  @Get(':id/chain')
  async getChain(@Param('id') id: string) {
    const chain = await this.service.getChain(id);
    if (!chain) return { error: 'Provenance chain not found', status: 404 };
    return chain;
  }

  @Get('nodes/:id')
  async getNode(@Param('id') id: string) {
    const node = await this.service.getNode(id);
    if (!node) return { error: 'Node not found', status: 404 };
    return node;
  }

  @Get('nodes/:id/neighbors')
  async getNeighbors(@Param('id') id: string) {
    return this.service.getNeighbors(id);
  }
}
