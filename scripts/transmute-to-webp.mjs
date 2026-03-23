import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const dir = 'g:/APSARA/apsara-temple/public/images/products/pendentifs';

async function transmute() {
  try {
    const files = await fs.readdir(dir);
    console.log(`🏛️  Temple de la Transmutation : ${files.length} fichiers trouvés.`);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, file.replace(ext, '.webp'));

        console.log(`✨ Transmue : ${file} -> ${path.basename(outputPath)}`);

        await sharp(inputPath)
          .webp({ quality: 82, effort: 6 }) // Équilibre parfait Luxe / Poids
          .toFile(outputPath);

        // On libère le Temple du poids de l'ancien format
        await fs.unlink(inputPath);
        console.log(`✅ Ancien format épuré : ${file}`);
      }
    }
    console.log('💎 Transmutation terminée avec succès. Toutes tes reliques sont désormais au format WebP.');
  } catch (error) {
    console.error('❌ La forge a rencontré une erreur :', error);
  }
}

transmute();
