export const dateTransform = (date: string): string => {
  const now = new Date();
  const created = new Date(date);

  const diffInDays = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffInDays > 0 ? `${diffInDays} days ago` : 'today';
};
