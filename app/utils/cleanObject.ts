export function cleanObject<T extends Record<string, any>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== 0 &&
        (typeof value !== "string" || value.trim() !== "")
    )
  ) as Partial<T>;
}
