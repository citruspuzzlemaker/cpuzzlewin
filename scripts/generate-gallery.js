const fs = require("fs");
const path = require("path");

// Legge l'argomento passato dal workflow
const gitSha = process.argv[2] || Date.now();

const imagesDir = path.join(__dirname, "..", "images");
const outputDir = path.join(__dirname, "..", "public");
const outputFile = path.join(outputDir, "gallery.json");

const baseUrl = "https://cdn.jsdelivr.net/gh/citruspuzzlemaker/cpuzzlewin@main/images";

const files = fs.readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
  .sort()
  .reverse();

const urls = files.map(name => `${baseUrl}/${name}?v=${gitSha}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputFile, JSON.stringify(urls, null, 2));

console.log(`gallery.json generato con ${files.length} immagini (sha: ${gitSha})`);



