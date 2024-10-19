import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const DIST_DIR = 'dist';
const DEPLOY_DIR = 'deploy';

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

function deploy() {
  // Run the incremental build
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during build: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);

    // Copy built files to deploy directory
    copyDirectory(DIST_DIR, DEPLOY_DIR);

    console.log('Deployment files prepared in the deploy directory.');
    console.log('You can now upload the contents of the deploy directory to your web server.');
  });
}

deploy();