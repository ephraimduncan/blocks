import fs from "fs";
import os from "os";
import path from "path";

const preserveDirs: string[] = [];

function wrapContentWithCodeBlock(content: string): string {
  return "````tsx\n" + content.trim() + "\n````";
}

function deleteDirectoryRecursive(directoryPath: string): void {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteDirectoryRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}

function copyDirectoryOnlyFiles(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "index.ts" || entry.isDirectory()) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isFile()) {
      const content = fs.readFileSync(srcPath, "utf8");
      if (path.extname(entry.name) === ".tsx") {
        destPath = path.join(dest, path.basename(entry.name, ".tsx") + ".mdx");
        const newContent = wrapContentWithCodeBlock(content);
        fs.writeFileSync(destPath, newContent);
      } else {
        fs.writeFileSync(destPath, content);
      }
    }
  }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node script.js <folderPath>");
  process.exit(1);
}

const folderPath = args[0];
const parentDir = path.dirname(folderPath);
const newFolderPath = path.join(parentDir, "markdown");

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "markdown-"));

preserveDirs.forEach((dir) => {
  const src = path.join(newFolderPath, dir);
  const dest = path.join(tempDir, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
});

deleteDirectoryRecursive(newFolderPath);

if (!fs.existsSync(newFolderPath)) {
  fs.mkdirSync(newFolderPath, { recursive: true });
}

preserveDirs.forEach((dir) => {
  const src = path.join(tempDir, dir);
  const dest = path.join(newFolderPath, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
});

const categoryEntries = fs.readdirSync(folderPath, { withFileTypes: true });
for (const categoryEntry of categoryEntries) {
  if (categoryEntry.isDirectory()) {
    const categorySrcPath = path.join(folderPath, categoryEntry.name);
    const categoryDestPath = path.join(newFolderPath, categoryEntry.name);

    copyDirectoryOnlyFiles(categorySrcPath, categoryDestPath);
  }
}

fs.rm(tempDir, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(`Error cleaning up temporary directory: ${err}`);
  }
});

console.log(
  `Folder duplicated and markdown created successfully: ${newFolderPath}`
);
