import { ErrorCode } from '@/shared/config/errors';

export type ValidationErr = Extract<ErrorCode, 'INVALID_FORMAT' | 'ALREADY_EXISTS'> | null;
