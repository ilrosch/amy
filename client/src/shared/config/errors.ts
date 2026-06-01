export const ERRORS = {
  INVALID_FORMAT: 'INVALID_FORMAT',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
} as const;

export type ErrorCode = keyof typeof ERRORS;
