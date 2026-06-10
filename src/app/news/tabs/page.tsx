import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export const metadata = {
  title: '资讯跳转',
  description: '旧资讯分类地址已统一跳转到新闻中心。',
};

export default function NewsTabsPage() {
  redirect(ROUTES.news);
}
