export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UserRegistrationDto {
  email: string;
  password?: string;
  displayName: string;
  language?: string;
  country?: string;
  timezone?: string;
  lifeStage?: string;
  madhhab?: string;
}

export interface AskAmalDto {
  question: string;
  includeContext?: boolean;
  conversationId?: string;
}

export interface GenerateAmalDto {
  goal: string;
  durationDays?: number;
  dailyMinutes?: number;
  preferredPace?: string;
  category?: string;
}
