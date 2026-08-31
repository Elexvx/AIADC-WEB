export function getSafeReturnPath(value: string | null | undefined) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  if (
    value === '/maintenance' ||
    value === '/maintenance/' ||
    value.startsWith('/maintenance?') ||
    value.startsWith('/maintenance/?') ||
    value.startsWith('/api/maintenance/')
  ) {
    return '/';
  }

  return value;
}
