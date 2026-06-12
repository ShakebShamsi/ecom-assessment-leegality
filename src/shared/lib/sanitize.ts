export const sanitizeNumericInput = (value: string): string => {
  const sanitized = value.replace(/[^0-9.]/g, '');
  const [integerPart, decimalPart] = sanitized.split('.');

  if (!decimalPart) {
    return integerPart;
  }

  return `${integerPart}.${decimalPart.slice(0, 2)}`;
};
