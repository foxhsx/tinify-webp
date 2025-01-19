# tinify-webp

[English](https://github.com/foxhsx/tinify-webp/blob/main/README.md) | 中文

使用 Tinify 压缩图像并转换为 WebP 格式的 CLI 工具。

## 描述

tinify-webp 是一个命令行工具，用于使用 Tinify API 压缩图像并转换为 WebP 格式。它支持批量处理图像，并提供高效压缩同时保持视觉质量。

## 特性

- [x] 使用 Tinify 的智能压缩算法压缩图像
- [x] 将图像转换为 WebP 格式
- [x] 在 Windows、Linux 和 MacOS 上的跨平台支持
- [x] 保留原始图像质量同时减少文件大小
- [ ] 支持 PNG、JPEG 和 WebP 输入格式

## 安装

```bash
npm install -g tinify-webp
```

## 前提条件

- Node.js（版本 12 或更高）
- Tinify API 密钥（在 [tinypng.com](https://tinypng.com/developers) 免费获取）

## API 密钥设置

### 选项 1：环境变量

#### Windows：

1. 打开系统设置
2. 访问高级系统设置
3. 点击“环境变量”
4. 在“用户变量”下，点击“新建”
5. 设置变量名称：`TINIFY_API_KEY`
6. 设置变量值：`YOUR_API_KEY`
7. 点击“确定”并重新启动您的终端

#### Linux/MacOS：

在您的 shell 配置文件中添加以下内容（例如，在 ~/.bashrc、~/.zshrc 或 ~/.config/fish/config.fish 中）：

```bash
export TINIFY_API_KEY=YOUR_API_KEY
```

然后执行（配置文件名称需要对应，这里只是个例子）：

```bash
source ~/.zshrc
```

## 用法

基础用法：

```bash
tinify-webp <path>
```

## 选项

- `-h, --help` - 显示帮助信息
- `-v, --version` - 显示版本号

## 示例

处理单个图像：

```bash
tinify-webp image.png
```

处理目录递归：

```bash
tinify-webp ./images
```

## 许可证

MIT

## 贡献

贡献欢迎！请随时提交 Pull Request。

## 鸣谢

此工具使用 [Tinify API](https://tinypng.com/developers) 进行图像优化。