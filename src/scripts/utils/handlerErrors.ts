const handlerErrors = (errName: string): string => {
  switch (errName) {
    case 'ERR_VALID_NAME':
      return 'errors.short-name';
    default:
      return 'errors.unknown';
  }
};

export default handlerErrors;
