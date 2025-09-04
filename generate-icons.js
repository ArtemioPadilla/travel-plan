const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
    const svgPath = path.join(__dirname, 'icons', 'icon.svg');
    const iconsDir = path.join(__dirname, 'icons');
    
    console.log('🎨 Generating PWA icons from SVG...');
    
    if (!fs.existsSync(svgPath)) {
        console.error('❌ SVG file not found at:', svgPath);
        process.exit(1);
    }
    
    const svgBuffer = fs.readFileSync(svgPath);
    
    for (const size of iconSizes) {
        const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
        
        try {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile(outputPath);
            
            console.log(`✅ Generated ${size}x${size} icon`);
        } catch (error) {
            console.error(`❌ Error generating ${size}x${size} icon:`, error.message);
        }
    }
    
    // Generate favicon (32x32)
    try {
        await sharp(svgBuffer)
            .resize(32, 32)
            .png()
            .toFile(path.join(iconsDir, 'favicon.png'));
        
        console.log('✅ Generated favicon (32x32)');
    } catch (error) {
        console.error('❌ Error generating favicon:', error.message);
    }
    
    // Generate Apple Touch Icon (180x180)
    try {
        await sharp(svgBuffer)
            .resize(180, 180)
            .png()
            .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
        
        console.log('✅ Generated Apple Touch Icon (180x180)');
    } catch (error) {
        console.error('❌ Error generating Apple Touch Icon:', error.message);
    }
    
    console.log('🎉 Icon generation complete!');
}

generateIcons().catch(console.error);