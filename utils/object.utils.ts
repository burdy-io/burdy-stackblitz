export const cleanObject = (obj) => {
  if (!obj) return obj;
  return Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
};

export const cleanObjectPropTypes = (obj) => {
  if (!obj) return obj;
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v == null || !((v as string)?.length > 0) || k.indexOf('_$type') > -1 ? a : ((a[k] = v), a)),
    {}
  );
};

export const getNonEmpty = (val: string | null | undefined): string | null => {
  if (typeof val !== 'string') return null;
  if (val === undefined || val === null || (val || '').trim() === '') return null;
  return val;
};
