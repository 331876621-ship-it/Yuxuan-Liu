import type { Metadata } from 'next';
import './globals.css';
import { Workspace } from '@/components/workspace';
export const metadata: Metadata = { title: 'BrandSpace · AI Marketing Strategy Studio', description: '双矩阵分析与动态营销策略屋，模拟数据演示工作台。' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body><Workspace>{children}</Workspace></body></html> }
