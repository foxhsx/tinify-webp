# tinify-webp
CLI tool for compressing images and converting to WebP format using Tinify

## Description
tinify-webp is a command-line tool that helps you optimize and convert images to WebP format using the Tinify (TinyPNG/TinyJPG) API. It supports batch processing of images and provides efficient compression while maintaining high visual quality.

## Features
- Compress images using Tinify's smart compression algorithm
- Convert images to WebP format
- Batch process multiple images
- Preserve original image quality while reducing file size
- Support for PNG, JPEG, and WebP input formats

## Installation

```bash
npm install -g tinify-webp
```


## Prerequisites
- Node.js (version 12 or higher)
- A Tinify API key (get one for free at [tinypng.com](https://tinypng.com/developers))

## Usage

1. Set your Tinify API key:

```bash
tinify-webp --set-key YOUR_API_KEY
```

2. Basic usage:

```bash
tinify-webp input.png
```

3. Convert multiple images:

```bash
tinify-webp image1.jpg image2.png image3.jpeg
```

4. Specify output directory:

```bash
tinify-webp --output ./optimized input.png
```


## Options
- `--set-key <key>` - Set your Tinify API key
- `--output <dir>` - Specify output directory (default: same as input)
- `--help` - Show help information
- `--version` - Show version number

## Examples
Convert a single image:

```bash
tinify-webp image.png
```


Convert multiple images to a specific directory:

```bash
tinify-webp --output ./optimized .jpg
```


## License
MIT

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Credits
This tool uses the [Tinify API](https://tinypng.com/developers) for image optimization.

