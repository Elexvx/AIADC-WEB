import { NextResponse } from 'next/server';
import {
  createMaintenanceAccessToken,
  isMaintenanceModeEnabled,
  MAINTENANCE_COOKIE_NAME,
  MAINTENANCE_SESSION_SECONDS,
  verifyMaintenancePassword,
} from '@/lib/maintenance-auth';

export const dynamic = 'force-dynamic';

const FAILURE_DELAY_MS = 450;

export async function POST(request: Request) {
  if (!isMaintenanceModeEnabled()) {
    return NextResponse.json(
      { message: '访问密码尚未配置，请联系网站管理员。' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let password = '';

  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json(
      { message: '请求格式不正确，请刷新页面后重试。' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (!verifyMaintenancePassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));
    return NextResponse.json(
      { message: '访问密码不正确，请重新输入。' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const response = NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );

  response.cookies.set({
    name: MAINTENANCE_COOKIE_NAME,
    value: createMaintenanceAccessToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAINTENANCE_SESSION_SECONDS,
  });

  return response;
}
