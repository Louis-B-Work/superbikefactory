// Workaround for a Windows-only Next.js static export bug: nested segment
// prefetch files are written as `__next.about/__PAGE__.txt` (because
// path.relative returns backslashes) instead of `__next.about.__PAGE__.txt`,
// which the client router requests. This flattens them. No-op on Linux/macOS.
import { promises as fs } from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flatten(full, dir, entry.name);
    } else {
      await walk(full);
    }
  }
}

async function flatten(segmentDir, parentDir, prefix) {
  for (const entry of await fs.readdir(segmentDir, { withFileTypes: true })) {
    const full = path.join(segmentDir, entry.name);
    const flatName = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) {
      await flatten(full, parentDir, flatName);
    } else {
      await fs.rename(full, path.join(parentDir, flatName));
    }
  }
  await fs.rm(segmentDir, { recursive: true, force: true });
}

try {
  await walk(outDir);
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}
