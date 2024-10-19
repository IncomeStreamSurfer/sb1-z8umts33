import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PAGES_DIR = 'src/pages';
const BUILD_CACHE_FILE = '.build-cache.json';

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function getChangedFiles(directory, cache) {
  const changedFiles = [];
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      changedFiles.push(...getChangedFiles(filePath, cache));
    } else {
      const hash = getFileHash(filePath);
      if (cache[filePath] !== hash) {
        changedFiles.push(filePath);
        cache[filePath] = hash;
      }
    }
  }

  return changedFiles;
}

function build(isInitialBuild = false) {
  console.log(isInitialBuild ? 'Starting initial build...' : 'Starting incremental build...');

  let cache = {};
  if (fs.existsSync(BUILD_CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(BUILD_CACHE_FILE, 'utf-8'));
  }

  if (!isInitialBuild) {
    const changedFiles = getChangedFiles(PAGES_DIR, cache);

    if (changedFiles.length === 0) {
      console.log('No changes detected. Skipping build.');
      return;
    }

    console.log(`Changed files: ${changedFiles.join(', ')}`);
  }

  exec('astro build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during build: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);

    // Update cache with all current file hashes
    updateCache(PAGES_DIR, cache);

    fs.writeFileSync(BUILD_CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(isInitialBuild ? 'Initial build completed successfully.' : 'Incremental build completed successfully.');
  });
}

function updateCache(directory, cache) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      updateCache(filePath, cache);
    } else {
      cache[filePath] = getFileHash(filePath);
    }
  }
}

// Check if this is the first build
const isInitialBuild = !fs.existsSync(BUILD_CACHE_FILE);

build(isInitialBuild);