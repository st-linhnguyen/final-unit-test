export const handleRemoveItems = (arr: any[], ids: any[]) => {
  return arr.filter((item: { id: any }) => !ids.includes(item.id));
};
