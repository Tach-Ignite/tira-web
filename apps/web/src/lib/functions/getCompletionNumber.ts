export default function getCompletionPercentage(
  fields?: Record<string, any>,
): number {
  return Object.values(fields || {}).filter(
    (value) =>
      value !== undefined && value !== null && value?.toString().trim() !== '',
  )?.length;
}
