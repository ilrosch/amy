import { useCallback } from 'react';
import { useAppSelector } from '@/app-root/store';
import { selectContactsIDS } from '@/entities/contact';
import { validateUUIDV7 } from '@/shared/lib/uuid';
import { ERRORS } from '@/shared/config/errors';
import { ValidationErr } from '../config/errors';

export const useValidateID = () => {
  const existsIDS = useAppSelector(selectContactsIDS);

  const validateID = useCallback(
    (id: string): ValidationErr => {
      if (!validateUUIDV7(id)) return ERRORS.INVALID_FORMAT;
      if (existsIDS.includes(id)) return ERRORS.ALREADY_EXISTS;
      return null;
    },
    [existsIDS],
  );

  return { validateID };
};
