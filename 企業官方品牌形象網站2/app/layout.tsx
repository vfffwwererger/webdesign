import type {Metadata} from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

export const metadata: Metadata = {
  title: '創曜數位科技 | 專業品牌官網建置・響應式網頁設計・SEO優化',
  description: '創曜數位科技專精於打造輕量、高效且現代化的企業品牌形象官網、卡片式服務展示、精選案例與 SEO 搜尋引擎優化。',
  openGraph: {
    title: '創曜數位科技 | 專業品牌官網建置與數位解決方案',
    description: '結合視覺美學與極致效能的官方網站，提供全方位 RWD 響應式設計、卡片式服務項目、精選成功案例與即時諮詢。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '創曜數位科技 | 專業品牌官網建置・響應式網頁設計',
    description: '打造兼具極致美學與轉換率的官方網站，全裝置流暢瀏覽體驗。',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning className="bg-white text-dark">
        {children}
      </body>
    </html>
  );
}
