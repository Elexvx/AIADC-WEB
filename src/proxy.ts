import { NextRequest, NextResponse } from 'next/server';
import {
  hasValidMaintenanceAccess,
  isMaintenanceModeEnabled,
  MAINTENANCE_COOKIE_NAME,
} from '@/lib/maintenance-auth';
import { getSafeReturnPath } from '@/lib/maintenance-path';

const PUBLIC_PATHS = new Set([
  '/maintenance',
  '/maintenance/',
  '/api/maintenance/unlock',
  '/api/maintenance/unlock/',
  '/favicon.ico',
  '/site.webmanifest',
  '/assets/aiadc-logo-small.webp',
  '/fonts/alibaba-puhuiti/AlibabaPuHuiTi-Regular.woff2',
  '/fonts/alibaba-puhuiti/AlibabaPuHuiTi-Medium.woff2',
]);

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.has(pathname) || pathname.startsWith('/_next/');
}

export function proxy(request: NextRequest) {
  if (!isMaintenanceModeEnabled()) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(MAINTENANCE_COOKIE_NAME)?.value;
  const hasAccess = hasValidMaintenanceAccess(token);

  if (isPublicPath(pathname)) {
    if ((pathname === '/maintenance' || pathname === '/maintenance/') && hasAccess) {
      const returnPath = getSafeReturnPath(request.nextUrl.searchParams.get('next'));
      return NextResponse.redirect(new URL(returnPath, request.url));
    }

    return NextResponse.next();
  }

  if (hasAccess) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { message: '网站维护中，请先通过访问密码验证。' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const maintenanceUrl = new URL('/maintenance', request.url);
  maintenanceUrl.searchParams.set('next', getSafeReturnPath(`${pathname}${search}`));

  return NextResponse.redirect(maintenanceUrl);
}

export const config = {
  matcher: '/:path*',
};
