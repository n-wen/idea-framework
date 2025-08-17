#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the directory where the script is located
const scriptDir = path.join(__dirname);

// Get the current working directory
const cwd = process.cwd();

// Define the source and destination paths
const srcDir = path.join(scriptDir, 'src');
const destDir = path.join(cwd, '.idea-fw');

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy files recursively
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
  }
}

// Check if .idea-fw folder exists
if (fs.existsSync(destDir)) {
  console.log('Found existing .idea-fw folder, removing...');
  fs.rmSync(destDir, { recursive: true, force: true });
  console.log('Removed old .idea-fw folder');
}

// Check if src directory exists
if (fs.existsSync(srcDir)) {
  console.log('Copying src directory to .idea-fw...');
  copyRecursiveSync(srcDir, destDir);
  console.log('Copy completed!');
} else {
  console.error('Error: src directory not found');
  process.exit(1);
}

console.log('Installation complete!');