/**
 * AMAL OS — LAYER 20: CREATE GOAL DTO (Section 20.17)
 */

import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GoalCategory, GoalIntent } from '@amal/types';

export class CreateGoalDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title!: string;

  @IsString()
  category!: GoalCategory;

  @IsString()
  intent!: GoalIntent;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  desiredOutcome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  timeHorizon?: string;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  desiredOutcome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  timeHorizon?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
