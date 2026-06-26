import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/config/routes';

export const metadata = {
  title: '资讯跳转',
  description: '旧资讯分类地址已统一跳转到新闻中心。',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NewsTabsPage() {
  redirect(ROUTES.news);
}
