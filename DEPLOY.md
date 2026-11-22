# 部署到 GitHub Pages

目标：把工作室主页发布到 **<https://bauhiniaphl.github.io/>**。

这份指南使用 GitHub 网页端，不需要安装 Git、Node.js 或任何命令行工具。整个过程约 5 分钟。

---

## 0. 先确认三件事

- GitHub 账号已登录：`bauhiniaphl`
- 将创建一个**公开**仓库，名字必须正好是：`bauhiniaphl.github.io`
- 本目录中的 `index.html` 最终必须位于仓库**根目录**，不能包在一层文件夹里

> ⚠️ 不要上传 `migraine-site` 这个外层文件夹本身。要进入文件夹，选中里面的 `index.html`、`assets/`、`styles.css` 等内容一起上传。否则访问主页会显示 404。
>
> ⚠️ 也不要直接上传 `.zip` 压缩包。GitHub Pages 不会自动解压它；请先在电脑上解压，再上传解压后的文件。
>
> 如果现在 Settings → Pages 的 Branch 下拉框只有 **None**，说明仓库还没有任何提交、也还没有真正生成 `main` 分支。先完成第 2 步的上传和 **Commit changes**，刷新页面后 `main` 就会出现。

---

## 1. 创建仓库

1. 打开 <https://github.com/new>。
2. **Repository name** 填入：

   ```text
   bauhiniaphl.github.io
   ```

3. 可见性选择 **Public**。
4. 不要勾选 “Add a README file” 等初始化选项（保持空仓库）。
5. 点击 **Create repository**。

---

## 2. 上传网站文件

1. 在新建的空仓库页面，点击 **uploading an existing file**（或 Add file → Upload files）。
2. 打开本地 `migraine-site` 文件夹。
3. 全选以下内容并拖入浏览器：

   - `index.html`
   - `404.html`
   - `styles.css`
   - `script.js`
   - `site.webmanifest`
   - `robots.txt`
   - `sitemap.xml`
   - `README.md`
   - `DEPLOY.md`
   - `assets/` 文件夹
   - `.nojekyll`（如果系统隐藏了它，可以不传，不影响站点）

4. 确认页面文件列表中**直接出现 `index.html`**，路径应为 `bauhiniaphl.github.io/index.html`，而不是 `bauhiniaphl.github.io/migraine-site/index.html`。
5. 在下方 Commit changes 填一句说明，例如 `Add studio website`，点击 **Commit changes**。

> GitHub 网页上传对隐藏文件支持不稳定，`.nojekyll` 不是必需的。本站不使用 Jekyll 模板语法，缺少它也能正常显示。

---

## 3. 开启 GitHub Pages

1. 进入仓库顶部的 **Settings**。
2. 左侧选择 **Pages**。
3. 在 **Build and deployment** 下：
   - **Source** 选择 **Deploy from a branch**
   - **Branch** 选择 **main**，目录选择 **/ (root)**
4. 点击 **Save**。
5. 回到 **Actions** 标签，等待 `pages build and deployment` 变成绿色勾。第一次通常需要 1–3 分钟。
6. 访问：

   ```text
   https://bauhiniaphl.github.io/
   ```

如果暂时看到 404，先等 2 分钟并强制刷新（`Ctrl + F5`），或换无痕窗口。

---

## 4. 验收清单

- [ ] 首页能打开，标题显示 MigrainE / 武汉米格雷纳网络
- [ ] 两张 Logo 都能加载，没有破图
- [ ] 桌面端顶部导航可以跳转
- [ ] 手机端右上角菜单可以打开、关闭
- [ ] 点击作品主视觉可以打开大图，`Esc` 可以关闭
- [ ] 点击“复制邮箱”有提示
- [ ] `mailto:` 和 GitHub 链接正确
- [ ] 随意访问一个不存在的路径，会显示自定义 404 页
- [ ] 浏览器控制台没有红色报错（F12 → Console）

---

## 5. 以后更新

1. 打开仓库，进入 `index.html` 或 `assets/` 对应文件。
2. 点击铅笔图标编辑并 Commit；或使用 **Add file → Upload files** 覆盖旧文件。
3. 每次提交后，Pages 会自动重新部署，通常 1–3 分钟。
4. 浏览器若仍显示旧版本，强制刷新或开无痕窗口检查。

---

## 6. 常见问题

### Branch 下拉框只有 None，没有 main

这不是 GitHub 出错，而是仓库目前是空的，还没有任何 branch。

1. 回到仓库的 **Code** 页面。
2. 点击 **Add file → Upload files**，上传解压后的网站文件。
3. 一定要点击页面底部的绿色 **Commit changes**。
4. 提交成功后刷新 **Settings → Pages**，Branch 下拉框就会出现 **main**。

注意：`main` 是第一次提交后才会真正创建的分支，单纯在创建仓库时选择默认分支名不会让它提前出现。

### 打开域名是 404

- 仓库名必须是 `bauhiniaphl.github.io`（全小写，`github.io` 是域名后缀）。
- `index.html` 必须在仓库根目录。
- Settings → Pages 的 Source 已保存为 `main / (root)`。
- Actions 中的部署任务是否成功。

### 页面能打开，但没有样式或图片

- 检查 `assets/` 文件夹是否上传成功。
- 检查文件名大小写：`Studio-Logo.webp` 和 `studio-logo.webp` 在 GitHub Pages 上是两个不同文件。
- 检查 `styles.css` 是否在根目录。

### 想把仓库名改成别的

如果仓库不叫 `bauhiniaphl.github.io`，站点会变成：

```text
https://bauhiniaphl.github.io/仓库名/
```

这时需要同步替换站点中的绝对地址。请在本地搜索并替换：

- `index.html` 里的 `canonical`、`og:url`、`og:image`、`twitter:image`
- `robots.txt` 里的 `Sitemap`
- `sitemap.xml` 里的 `<loc>`

### 想绑定自己的域名

Settings → Pages → Custom domain，填入域名并按 GitHub 的提示配置 DNS。绑定后，也需要同步更新 `canonical` 和社交分享图中的绝对地址。工作室目前不需要这一步。

---

## 7. 安全提醒

- 不需要把 GitHub 密码、验证码或 Personal Access Token 交给任何人。
- 邮箱是公开信息，发布后可能收到垃圾邮件；如需要，可后续替换为联系表单或图片邮箱。
- 本仓库是纯静态页面，没有后端、数据库或用户登录，攻击面很小。
