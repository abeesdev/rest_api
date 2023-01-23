export const normalizedString = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/ + /g, ' ')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
