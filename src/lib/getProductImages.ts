import fs from 'fs';
import path from 'path';

/**
 * Scans the public/ folder to find all image variants for a product.
 *
 * Convention: images must follow the slug-based naming:
 *   nom-produit.webp        → image principale (index 0)
 *   nom-produit2.webp       → 2e image
 *   nom-produit3.webp       → 3e image
 *   … etc.
 *
 * @param imagePath  The product's main image path, e.g. "/images/products/bracelets/nom.webp"
 * @returns Sorted array of public paths, ready to use in <img src={...} />
 */
export function getProductImages(imagePath: string): string[] {
  try {
    const publicDir = path.join(process.cwd(), 'public');

    // Resolve absolute path to the main image
    const absMain = path.join(publicDir, imagePath);
    const dir = path.dirname(absMain);

    // Extract base name without extension: "nom-produit"
    const ext = path.extname(absMain);            // ".webp"
    const base = path.basename(absMain, ext);     // "nom-produit"

    // Read all files in the product folder
    if (!fs.existsSync(dir)) return [imagePath];

    const allFiles = fs.readdirSync(dir);

    // Keep only files that start with the base name
    // e.g. "nom-produit.webp", "nom-produit2.webp", "nom-produit3.webp"
    const matched = allFiles.filter((f) => {
      if (!f.startsWith(base)) return false;
      const remainder = f.slice(base.length);                  // "" | "2.webp" | "2.png" etc.
      return /^(\d*)(\.(webp|png|jpg|jpeg))$/.test(remainder); // only digits then extension
    });

    if (matched.length === 0) return [imagePath];

    // Sort: main first, then 2, 3, 4…
    matched.sort((a, b) => {
      const numA = parseInt(a.slice(base.length).replace(/\D/g, '') || '0', 10);
      const numB = parseInt(b.slice(base.length).replace(/\D/g, '') || '0', 10);
      return numA - numB;
    });

    // Rebuild public URLs
    const relDir = path.dirname(imagePath); // "/images/products/bracelets"
    return matched.map((f) => `${relDir}/${f}`);

  } catch {
    // Fallback: return the original image, never crash
    return [imagePath];
  }
}
