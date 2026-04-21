import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DIRS = [
  join(ROOT, "public/images"),
  join(ROOT, "public/carousel"),
];

const QUALITY = 82;
const MIN_BYTES = 10_000; // skip tiny files

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function convert(src) {
  const ext = extname(src).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const s = await stat(src);
  if (s.size < MIN_BYTES) return;

  const dest = src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  if (dest === src) return;

  try {
    const info = await sharp(src).webp({ quality: QUALITY }).toFile(dest);
    const saved = ((s.size - info.size) / s.size * 100).toFixed(0);
    console.log(`✓ ${basename(src)} → ${basename(dest)}  ${(s.size/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB  (-${saved}%)`);
  } catch (e) {
    console.error(`✗ ${basename(src)}: ${e.message}`);
  }
}

let total = 0;
for (const dir of DIRS) {
  for await (const file of walk(dir)) {
    await convert(file);
    total++;
  }
}
console.log(`\nDone. Processed ${total} files.`);
