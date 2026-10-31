export function getSafeReturnPath(value: string | null | undefined) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  const siteOrigin = 'https://maintenance.invalid';
  let returnUrl: URL;

  try {
    returnUrl = new URL(value, siteOrigin);
  } catch {
    return '/';
  }

  // URL parsers treat backslashes as slashes for special schemes. Verify the
  // parsed origin so inputs such as "/\\attacker.example" stay on this site.
  if (returnUrl.origin !== siteOrigin) {
    return '/';
  }

  if (
    returnUrl.pathname === '/maintenance' ||
    returnUrl.pathname === '/maintenance/' ||
    returnUrl.pathname.startsWith('/api/maintenance/')
  ) {
    return '/';
  }

  return `${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`;
}
