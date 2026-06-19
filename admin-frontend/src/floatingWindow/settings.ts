import { resolvePreferredLocale } from '@/i18n/locale';
import type { FloatingWindowSettings } from '@/types/api';
import { normalizeUploadUrl } from '@/utils/uploadUrl';

const DEFAULT_API_DOCS_QR_TITLE_ZH = '微信扫码联系我们';
const DEFAULT_API_DOCS_QR_TITLE_EN = 'Scan the QR code on WeChat to contact us';

// Avoid calling Umi runtime locale APIs during module evaluation.
const resolveDefaultApiDocsQrTitle = () =>
  resolvePreferredLocale().startsWith('en') ? DEFAULT_API_DOCS_QR_TITLE_EN : DEFAULT_API_DOCS_QR_TITLE_ZH;

export const DEFAULT_FLOATING_WINDOW_SETTINGS: FloatingWindowSettings = {
  apiDocsQrEnabled: true,
  apiDocsQrTitle: DEFAULT_API_DOCS_QR_TITLE_ZH,
  apiDocsQrImageUrl: '',
};

export const normalizeFloatingWindowSettings = (settings?: Partial<FloatingWindowSettings> | null): FloatingWindowSettings => ({
  ...DEFAULT_FLOATING_WINDOW_SETTINGS,
  ...settings,
  apiDocsQrEnabled: settings?.apiDocsQrEnabled ?? DEFAULT_FLOATING_WINDOW_SETTINGS.apiDocsQrEnabled,
  apiDocsQrTitle: settings?.apiDocsQrTitle?.trim() || resolveDefaultApiDocsQrTitle(),
  apiDocsQrImageUrl: normalizeUploadUrl(settings?.apiDocsQrImageUrl),
});
