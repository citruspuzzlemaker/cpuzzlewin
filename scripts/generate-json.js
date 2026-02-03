const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "images");
const outputDir = path.join(__dirname, "..", "public");
const outputFile = path.join(outputDir, "gallery.json");

// Base URL jsDelivr (branch main)
const baseUrl = "https://cdn.jsdelivr.net/gh/citruspuzzlemaker/cpuzzlewin@main/images";

// Cache busting
const timestamp = Date.now();

const files = fs.readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
  .sort()
  .reverse();

const urls = files.map(name => `${baseUrl}/${name}?v=${timestamp}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputFile, JSON.stringify(urls, null, 2));

console.log(`✅ gallery.json generato con ${files.length} immagini`);
