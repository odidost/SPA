const fs = require("fs");
const path = require("path");

const serverDir = path.resolve(".next/server");
const chunksDir = path.join(serverDir, "chunks");
const vendorChunksDir = path.join(serverDir, "vendor-chunks");

if (fs.existsSync(chunksDir)) {
  // 1. Copy chunk files to .next/server/ so require("./" + chunkId + ".js") always resolves
  const items = fs.readdirSync(chunksDir);
  for (const item of items) {
    const src = path.join(chunksDir, item);
    const dest = path.join(serverDir, item);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }

  // 2. Ensure .next/server/chunks/vendor-chunks is available
  if (fs.existsSync(vendorChunksDir)) {
    const destVendor = path.join(chunksDir, "vendor-chunks");
    if (!fs.existsSync(destVendor)) {
      fs.cpSync(vendorChunksDir, destVendor, { recursive: true });
    }
  }
}

console.log("✓ Postbuild: Server chunk mappings aligned successfully.");
