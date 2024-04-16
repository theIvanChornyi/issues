export const capitalize = (string: string): string => {
  return string ? string.replace(/\w/, string[0].toLocaleUpperCase()) : '';
};
