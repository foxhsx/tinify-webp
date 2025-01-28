# tinify-webp

English | [中文](https://github.com/foxhsx/tinify-webp/blob/main/README_ZH.md)

CLI tool for compressing images and converting to WebP\PNG\JPEG format using Tinify.

## Description

tinify-webp is a command-line tool that helps you optimize and convert images to WebP\PNG\JPEG format using the Tinify API. It supports batch processing of images and provides efficient compression while maintaining high visual quality.

## Features

- [x] Compress images using Tinify's smart compression algorithm
- [x] Convert images to WebP format
- [x] Cross-platform support (Windows, Linux, MacOS)
- [x] Preserve original image quality while reducing file size
- [x] Support for PNG, JPEG, and WebP input formats

## Installation

```bash
npm install -g tinify-webp
```

## Prerequisites

- Node.js (version 12 or higher)
- A Tinify API key (get one for free at [tinypng.com](https://tinypng.com/developers))

## API Key Setup

### Option 1: Environment Variable

#### Windows:

1. Open System Settings
2. Go to Advanced system settings
3. Click "Environment Variables"
4. Under "User variables", click "New"
5. Set Variable name: `TINIFY_API_KEY`
6. Set Variable value: `YOUR_API_KEY`
7. Click OK and restart your terminal

#### Linux/MacOS:

Add to your shell configuration file (~/.bashrc, ~/.zshrc, or ~/.config/fish/config.fish):

```bash
export TINIFY_API_KEY=YOUR_API_KEY
```

Then execute(The configuration file names need to correspond, this is just an example):

```bash
source ~/.zshrc
```


## Usage

Basic usage:

```bash
tinify-webp <path>
```

## Options

- `-h, --help` - Display help information
- `-v, --version` - Show version number
- `-f, --format` - Specify the output format (webp/png/jpeg)

## Examples

Process a single image:

```bash
tinify-webp image.png
```

Process a directory recursively:

```bash
tinify-webp ./images
```

Specify output format:

```bash
tinify-webp -f png image.png
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This tool uses the [Tinify API](https://tinypng.com/developers) for image optimization.
