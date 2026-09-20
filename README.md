# 知政 · 时政记忆宫殿

面向国考与贵州省考行测常识 / 政治理论复习的可拖拽知识网络。当前收录 200 个整理考点，覆盖 2024-09-19 至 2026-09-19 的核心专题及必要背景。

## 功能

- 搜索标题、别名、关键词和正文，并展开一至两层关联
- 拖动画布与节点，滚轮或双指缩放
- 卡片只保留原文、个人笔记和资料链接；原文中的实记词与易错词直接标色
- 收藏、笔记、间隔复习、自建卡片和节点位置保存在浏览器本地
- 导出带双链的 Obsidian Markdown

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

构建结果在 `dist/`。腾讯云 COS 静态网站托管可直接上传 `dist` 内全部文件，并把默认首页和错误文档都设为 `index.html`。工程使用相对资源路径，可部署在桶根目录或子目录。

## 数据说明

公共考点位于 `src/lib/catalog.ts`。静态版不需要数据库或服务器，个人数据写入浏览器 `localStorage`，清理浏览器站点数据会一并删除；更换设备不会自动同步，请定期导出 Obsidian 笔记。

`src/lib/originals.ts` 保存首批官媒与政府原文摘录；`src/lib/supplements-2026.ts` 和 `src/lib/supplements-2026-extra.ts` 保存用户提供的小黑时政讲义摘录与应试拆分。后两部分明确标注“未另做官媒复核”。`src/lib/catalog.ts` 负责汇总检索关键词、易错替换和知识关系。

更完整的腾讯云步骤见 [腾讯云部署说明.md](./腾讯云部署说明.md)。

## 参考与致谢

知识组织方式参考 [ERRRC/kaogongzhentizhengliu](https://github.com/ERRRC/kaogongzhentizhengliu) 的“真题—考点—材料”双向关系、分层标签、局部图谱与疑点复核思路。本项目改编为“原文—考点—辨析”结构，没有复制原仓库的真题、图片或完整笔记。

组织方式的借鉴部分按原项目要求采用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans) 署名、非商业方式发布。
