const tinify = require("tinify");
const fs = require('fs/promises');
const path = require('path');

// Remove the hardcoded API key
const validateApiKey = (key) => {
  if (!key) {
    console.error('\x1b[31mError: Tinify API key is not set!\x1b[0m');
    console.log('\nTo use this tool, you need to:');
    console.log('1. Sign up for a free API key at \x1b[34mhttps://tinypng.com/developers\x1b[0m');
    console.log('2. Set your API key using one of these methods:');
    console.log('   - Use the --key option: tinify-webp --key YOUR_API_KEY <path>');
    console.log('   - Set environment variable: export TINIFY_API_KEY=YOUR_API_KEY');
    process.exit(1);
  }

  tinify.key = key;
  return new Promise((resolve, reject) => {
    tinify.validate(function (err) {
      if (err) {
        console.error('\x1b[31mAPI Key validation failed:\x1b[0m', err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Compress and convert image to WebP format
 * @param {string} inputPath - Path to the input image
 * @returns {Promise<void>}
 */
const compressAndConvertImage = async (inputPath, options = {}) => {
  try {
    // Read the input file
    const inputBuffer = await fs.readFile(inputPath)
    
    // Get the directory and filename without extension
    const dir = path.dirname(inputPath)
    const filename = path.basename(inputPath, path.extname(inputPath))
    
    // Determine output format (default to webp)
    const outputFormat = options.format || 'webp'
    const mimeType = `image/${outputFormat === 'jpg' ? 'jpeg' : outputFormat}`
    const extension = `.${outputFormat}`
    
    // Create output path with appropriate extension
    const outputPath = path.join(dir, `${filename}${extension}`)
    
    // Compress and convert to specified format
    const resultBuffer = await tinify.fromBuffer(inputBuffer)
      .convert({
        type: mimeType
      })
      .toBuffer()
    
    // Write the result to file
    await fs.writeFile(outputPath, resultBuffer)
    
    console.log(`Successfully compressed and converted image to: ${outputPath}`)
  } catch (error) {
    console.error(`Error processing image ${inputPath}:`, error)
    throw error
  }
}

/**
 * Check if a file is an image based on its extension
 * @param {string} filename - Name of the file
 * @returns {boolean}
 */
const isImage = (filename) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
  const ext = path.extname(filename).toLowerCase()
  console.log(`检查文件: ${filename}\n扩展名: ${ext}`)
  const result = imageExtensions.includes(ext)
  console.log(`是否为支持的图片格式: ${result}`)
  return result
}

/**
 * Process a path (file or directory) for image compression
 * @param {string} inputPath - Path to file or directory
 * @returns {Promise<void>}
 */
const processPath = async (inputPath, options = {}) => {
  try {
    // Validate API key (first check options, then environment variable)
    const apiKey = options.key || process.env.TINIFY_API_KEY;
    await validateApiKey(apiKey);

    const stats = await fs.stat(inputPath)
    
    if (stats.isFile()) {
      if (isImage(inputPath)) {
        await compressAndConvertImage(inputPath, options)
      } else {
        console.log(`Skipping non-image file: ${inputPath}`)
      }
    } else if (stats.isDirectory()) {
      const files = await fs.readdir(inputPath)
      const imageFiles = files.filter(file => isImage(path.join(inputPath, file)))
      
      if (imageFiles.length === 0) {
        console.log('No image files found in directory')
        return
      }

      console.log(`Found ${imageFiles.length} image(s) to process`)
      
      for (const file of imageFiles) {
        const filePath = path.join(inputPath, file)
        await compressAndConvertImage(filePath, options)
      }
      
      console.log('Finished processing all images in directory')
    }
  } catch (error) {
    console.error('Error processing path:', error)
    throw error
  }
}

// Export the functions
module.exports = {
  processPath,
  compressAndConvertImage,
  validateApiKey
};
