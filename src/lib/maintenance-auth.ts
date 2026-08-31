import { createHmac, timingSafeEqual } from 'node:crypto';

export const MAINTENANCE_COOKIE_NAME = 'aiadc_maintenance_access';
export const MAINTENANCE_SESSION_SECONDS = 12 * 60 * 60;

const TOKEN_CONTEXT = 'aiadc-maintenance-access-v1';

function getPassword() {
  return process.env.MAINTENANCE_PASSWORD?.trim() ?? '';
}

function getSigningSecret() {
  return process.env.MAINTENANCE_TOKEN_SECRET?.trim() || getPassword();
}

function sign(payload: string) {
  return createHmac('sha256', getSigningSecret()).update(`${TOKEN_CONTEXT}:${payload}`).digest('base64url');
}

export function isMaintenanceModeEnabled() {
  return getPassword().length > 0;
}

export function verifyMaintenancePassword(candidate: string) {
  const password = getPassword();

  if (!password || !candidate) {
    return false;
  }

  const expected = createHmac('sha256', TOKEN_CONTEXT).update(password).digest();
  const actual = createHmac('sha256', TOKEN_CONTEXT).update(candidate).digest();

  return timingSafeEqual(expected, actual);
}

export function createMaintenanceAccessToken(now = Date.now()) {
  const expiresAt = Math.floor(now / 1000) + MAINTENANCE_SESSION_SECONDS;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function hasValidMaintenanceAccess(token: string | undefined, now = Date.now()) {
  if (!isMaintenanceModeEnabled() || !token) {
    return false;
  }

  const [payload, signature, ...rest] = token.split('.');
  const expiresAt = Number(payload);

  if (rest.length > 0 || !payload || !signature || !Number.isSafeInteger(expiresAt)) {
    return false;
  }

  const currentTime = Math.floor(now / 1000);
  if (expiresAt <= currentTime || expiresAt > currentTime + MAINTENANCE_SESSION_SECONDS) {
    return false;
  }

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
