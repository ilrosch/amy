import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const validateUUIDV7 = (value: string) => uuidValidate(value) && uuidVersion(value) === 7;
