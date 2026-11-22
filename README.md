# MigrainE · 武汉米格雷纳网络

面向 GitHub Pages 的静态工作室主页，无构建步骤、无第三方依赖。

- 目标地址：<https://bauhiniaphl.github.io/>
- 当前企划：《拉普拉要塞：边界暗影》 / *Laplace Citadel: Boundary Shadows*
- 页面语言：中文为主，英文作视觉点缀
- 技术：HTML + CSS + 原生 JavaScript

## 页面结构

| 区块 | 内容 |
| --- | --- |
| Hero | 工作室主张、工作室标识、导航与 CTA |
| Project 001 | 《拉普拉要塞：边界暗影》介绍、主视觉、项目信息 |
| The Dossier | 摩德纳、拉普拉要塞、重塑之手、暴雨免疫术式、康丝坦丁事件 |
| Interlude | “我们 / 那只手”的衔尾蛇档案摘录 |
| Studio | 工作室自述、三条创作原则、联系方式 |
| Contact | 邮箱、GitHub、页脚 |

## 文件说明

```text
.
├── index.html                 主页
├── 404.html                   自定义 404
├── styles.css                 全站样式
├── script.js                  菜单、滚动动效、大图、复制邮箱
├── site.webmanifest           PWA 基础信息
├── robots.txt
├── sitemap.xml
├── .nojekyll                  关闭 GitHub Pages 的 Jekyll 处理
├── README.md
├── DEPLOY.md                  GitHub Pages 部署步骤
└── assets/
    ├── studio-logo.webp       工作室完整标识
    ├── studio-emblem.webp     页头用的标识局部
    ├── work-logo.webp         《拉普拉要塞：边界暗影》主视觉
    ├── og-cover.jpg           社交分享图
    ├── favicon-32.png
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    ├── studio-logo.png        高清原图
    └── work-logo.png          高清原图
```

## 修改内容

- **文案**：直接编辑 `index.html`。每个区块有清晰的 `id`（`#project`、`#world`、`#studio`、`#contact`）。
- **邮箱**：全站搜索 `migrainebauhinia@163.com`，替换为新的公开邮箱。
- **GitHub 用户名**：全站搜索 `bauhiniaphl`。
- **站点域名**：若最终不是 `https://bauhiniaphl.github.io/`，搜索并替换以下文件中的域名：
  `index.html`、`robots.txt`、`sitemap.xml`。
- **配色与字体**：编辑 `styles.css` 顶部的 `:root` 变量。
- **替换 Logo**：替换 `assets/` 中同名文件即可，页面不用改。建议保持 1:1 正方形。

## 本地预览

在项目目录运行：

```powershell
python -m http.server 4173
```

然后打开 <http://127.0.0.1:4173/>。

## 发布

按 [DEPLOY.md](DEPLOY.md) 操作：新建 `bauhiniaphl.github.io` 仓库，把本目录里的**文件和 assets 文件夹**上传到仓库根目录，再在 Settings → Pages 选择 `main / (root)`。

## 备注

- 页面不依赖外部字体、CDN 或追踪脚本，国内网络环境也能完整显示。
- 所有动效均支持 `prefers-reduced-motion`。
- 页面不包含分析统计或 Cookie。以后如需统计，建议使用注重隐私的方案。
