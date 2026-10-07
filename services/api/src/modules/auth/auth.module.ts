/**
 * AMAL OS — LAYER 19: AUTH MODULE (Section 26)
 */

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
