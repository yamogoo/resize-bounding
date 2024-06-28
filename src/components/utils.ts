export const deepMerge = (
  a: { [key: string]: any },
  b: { [key: string]: any },
): { [key: string]: any } => {
  if (Array.isArray(a) || Array.isArray(b) || typeof a !== typeof b)
    throw new Error("Error: can not merge two different types");

  if (Array.isArray(a && Array.isArray(b))) {
    return { ...a, ...b };
  }

  const merged = { ...a };

  for (const key of Object.keys(b)) {
    if (typeof a[key] === "object" || Array.isArray(a[key])) {
      merged[key] = deepMerge(a[key], b[key]);
    } else merged[key] = b[key];
  }

  return merged;
};
