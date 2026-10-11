# BrandSpace

AI Marketing Strategy Studio · 模拟数据 Demo

## 页面与功能

- `/`、`/research/`：可编辑研究 Brief、品牌审计、产品价格带、核心卖点和趋势。
- `/opportunity/`：双矩阵维度切换、品牌与消费者点选、三个营销机会方向。
- `/campaign/`：机会驱动的动态策略屋、内容示例、KPI、策略验证与 Markdown / 打印导出。
- 项目输入与机会选择保存在浏览器本地。全部案例为虚构模拟数据，无真实 AI 或搜索 API。

## 本地运行

使用兼容 Next.js 16 的 Node.js（当前验证版本为 Node.js 24）。

```sh
npm install
npm run dev
npm run lint
npm run build
```

当前配置为静态导出，生产构建生成 `out/`。Windows 工作区还提供 `npm.cmd` 运行入口。

## 发布与后续更新

生产网站：https://brandspace-pied.vercel.app/

Vercel 项目 `brandspace` 已连接此仓库，生产分支为 `main`。将代码提交到 `main` 会触发 Vercel 构建与生产部署；其他分支按 Vercel 项目设置生成预览。可继续使用 Codex 编辑源码、运行检查并提交到此仓库。

`.gitignore` 与 `.vercelignore` 排除 `.env*`、私钥、依赖、构建产物、工具缓存和本地报告。未来真实 API 密钥应在部署平台配置服务端环境变量，不得硬编码或使用 `NEXT_PUBLIC_` 暴露秘密。

原有 chatgpt.site 站点保留；迁移不会自动搬运原域名下的浏览器本地数据。
