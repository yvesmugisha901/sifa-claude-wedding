import sharp from "sharp";
import fs from "fs";

const words = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen"];
const order = (f) => {
  const base = f.replace(/\.[^.]+$/, "").toLowerCase();
  const i = words.indexOf(base);
  return i >= 0 ? i + 1 : parseInt(base, 10) || 999;
};
const skip = new Set(["one.jpeg", "two.jpeg", "three.jpeg"]);

const src = "public/images", out = "public/images/gallery", keep = "originals";
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(keep, { recursive: true });

const files = fs.readdirSync(src)
  .filter((f) => /\.(jpe?g|png)$/i.test(f) && !skip.has(f.toLowerCase()))
  .sort((a, b) => order(a) - order(b));

const list = [];
const failed = [];
for (const f of files) {
  const n = list.length + 1;
  const name = `photo-${String(n).padStart(2, "0")}.webp`;
  try {
    const info = await sharp(`${src}/${f}`, { failOn: "none" }).rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80 }).toFile(`${out}/${name}`);
    list.push({ src: `/images/gallery/${name}`, w: info.width, h: info.height, alt: `Sifa and Claude, photo ${n}` });
    fs.renameSync(`${src}/${f}`, `${keep}/${f}`);
  } catch (e) {
    failed.push(f);
    console.log(`SKIPPED ${f}: ${e.message.split("\n")[0]}`);
  }
}
fs.writeFileSync("src/data/gallery.json", JSON.stringify(list, null, 2));
console.log(`Done: ${list.length} photos added.`);
if (failed.length) console.log(`These files are damaged, please copy them again: ${failed.join(", ")}`);