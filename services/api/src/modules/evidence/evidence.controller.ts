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

  @Post('query')
  async query(@Body() dto: { query: string; limit?: number }) {
    return this.service.query(dto.query, { limit: dto.limit });
  }

  @Get('claims/:id')
  async getClaim(@Param('id') id: string) {
    const claim = await this.service.getClaim(id);
    if (!claim) return { error: 'Claim not found', status: 404 };
    return claim;
  }

  @Get('claims/:id/provenance')
  async getClaimProvenance(@Param('id') id: string) {
    const prov = await this.service.getClaimProvenance(id);
    if (!prov) return { error: 'Claim provenance not found', status: 404 };
    return prov;
  }

  @Get('sources/:id')
  async getSource(@Param('id') id: string) {
    const source = await this.service.getSource(id);
    if (!source) return { error: 'Source not found', status: 404 };
    return source;
  }

  @Get('nodes/:id/sources')
  async getNodeSources(@Param('id') id: string) {
    return this.service.getNodeSources(id);
  }

  @Get('nodes/:id/neighbors')
  async getNeighbors(@Param('id') id: string) {
    return this.service.getNeighbors(id);
  }

  @Get('nodes/:id')
  async getNode(@Param('id') id: string) {
    const node = await this.service.getNode(id);
    if (!node) return { error: 'Node not found', status: 404 };
    return node;
  }

  @Get(':id/chain')
  async getChain(@Param('id') id: string) {
    const chain = await this.service.getChain(id);
    if (!chain) return { error: 'Provenance chain not found', status: 404 };
    return chain;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const item = await this.service.getById(id);
    if (!item) return { error: 'Evidence not found', status: 404 };
    return item;
  }
}
