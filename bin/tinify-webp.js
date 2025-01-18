#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const os = require('os');
const { processPath } = require('../index.js');
const package = require('../package.json');

// Add ASCII art banner for better visibility
const showBanner = () => {
  console.log(`
╔════════════════════════════════════════╗
║            Tinify Image CLI            ║
║      Convert and compress images       ║
╚════════════════════════════════════════╝
`);
};

// Detect user's shell and return appropriate config file path
const getShellConfigPath = () => {
  const shell = process.env.SHELL || '';
  const homeDir = os.homedir();
  
  switch (true) {
    case shell.includes('bash'):
      return path.join(homeDir, '.bashrc');
    case shell.includes('zsh'):
      return path.join(homeDir, '.zshrc');
    case shell.includes('fish'):
      return path.join(homeDir, '.config/fish/config.fish');
    default:
      return process.platform === 'win32' ? 'Environment Variables in System Settings' : '.profile';
  }
};

// Get shell-specific export command
const getExportCommand = (key) => {
  const shell = process.env.SHELL || '';
  if (shell.includes('fish')) {
    return `set -Ux TINIFY_API_KEY ${key}`;
  }
  return `export TINIFY_API_KEY=${key}`;
};

// Show help information about API key
const showApiKeyHelp = () => {
  const configPath = getShellConfigPath();
  const isWindows = process.platform === 'win32';

  console.log('\n\x1b[33mAPI Key Information:\x1b[0m');
  console.log('This tool requires a Tinify API key to function.');
  console.log('You can get a free API key by following these steps:');
  console.log('1. Visit: \x1b[34mhttps://tinypng.com/developers\x1b[0m');
  console.log('2. Sign up for a free account');
  console.log('3. Copy your API key from the dashboard\n');
  
  console.log('\x1b[33mSetting up your API key:\x1b[0m');
  
  if (isWindows) {
    console.log('For Windows:');
    console.log('1. Right-click on Start and select "System"');
    console.log('2. Click on "Advanced system settings"');
    console.log('3. Click "Environment Variables"');
    console.log('4. Under "User variables", click "New"');
    console.log('5. Variable name: TINIFY_API_KEY');
    console.log('6. Variable value: YOUR_API_KEY');
    console.log('7. Click OK and restart your terminal\n');
  } else {
    console.log('For Unix-based systems (Linux/MacOS):');
    console.log(`1. Open your shell configuration file: ${configPath}`);
    console.log('2. Add the following line:');
    console.log(`   \x1b[36m${getExportCommand('YOUR_API_KEY')}\x1b[0m`);
    console.log('3. Save the file and run:');
    console.log('   \x1b[36msource ' + configPath + '\x1b[0m\n');
  }

  console.log('Temporary usage:');
  console.log('- Command line: tinify-webp --key YOUR_API_KEY <path>');
  console.log('- Current session: export TINIFY_API_KEY=YOUR_API_KEY\n');
};

// Show setup instructions when API key is provided via --key
const showPermanentSetupTip = (key) => {
  const isWindows = process.platform === 'win32';
  const configPath = getShellConfigPath();
  
  console.log('\n\x1b[33mTip: Make your API key permanent\x1b[0m');
  
  if (isWindows) {
    console.log('To set the API key permanently on Windows, run:');
    console.log(`\x1b[36msetx TINIFY_API_KEY "${key}"\x1b[0m`);
  } else {
    console.log('To set the API key permanently, add this line to your shell config:');
    console.log(`\x1b[36m${getExportCommand(key)}\x1b[0m`);
    console.log(`Config file location: ${configPath}`);
  }
  console.log('Then restart your terminal or run:');
  console.log(`\x1b[36m${isWindows ? 'refreshenv' : 'source ' + configPath}\x1b[0m\n`);
};

showBanner();

program
  .version(package.version)
  .description('Compress and convert images to WebP format using Tinify')
  .argument('[path]', 'Path to image file or directory')
  .option('-k, --key <apiKey>', 'Tinify API key')
  .option('-r, --recursive', 'Process subdirectories recursively')
  .option('-h, --help', 'Display help information')
  .action(async (inputPath, options) => {
    try {
      // Show help if --help flag is used or no path is provided
      if (options.help || !inputPath) {
        showApiKeyHelp();
        program.help();
        return;
      }

      const absolutePath = path.resolve(process.cwd(), inputPath);
      
      // If key is provided via command line, show permanent setup tip
      if (options.key && !process.env.TINIFY_API_KEY) {
        showPermanentSetupTip(options.key);
      }
      
      await processPath(absolutePath, options);
    } catch (err) {
      console.error('\x1b[31mError:\x1b[0m', err.message);
      process.exit(1);
    }
  });

program.parse(); 