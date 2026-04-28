import { i18nextInstance } from '@/src/lib/i18n';

const { t } = i18nextInstance;

export const errors = {
  ERR_USER_NAME: t('errors.user-name'),
  ERR_UNKNOWN: t('errors.unknown'),
  ERR_NETWORK: t('errors.network'),
  ERR_SERVER: t('errors.server'),
};
