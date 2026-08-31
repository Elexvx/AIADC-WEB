import type { Metadata } from 'next';
import { getSafeReturnPath } from '@/lib/maintenance-path';
import { MaintenanceScreen } from './maintenance-screen';

export const metadata: Metadata = {
  title: '网站维护中',
  description: '全国大学生智能应用开发大赛官方网站正在进行维护升级。',
  robots: { index: false, follow: false },
};

type MaintenancePageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function MaintenancePage({ searchParams }: MaintenancePageProps) {
  const params = await searchParams;
  const rawReturnPath = Array.isArray(params.next) ? params.next[0] : params.next;
  const returnPath = getSafeReturnPath(rawReturnPath);

  return <MaintenanceScreen returnPath={returnPath} />;
}
