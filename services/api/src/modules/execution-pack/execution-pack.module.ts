import { Module } from '@nestjs/common';
import { ExecutionPackController } from './execution-pack.controller';
import { ExecutionPackService } from './execution-pack.service';

@Module({
  controllers: [ExecutionPackController],
  providers: [ExecutionPackService],
  exports: [ExecutionPackService],
})
export class ExecutionPackModule {}
