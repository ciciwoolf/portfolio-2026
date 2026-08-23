// WCAG Contrast Checker
// Calculates contrast ratios for color combinations
// WCAG AA requires: 4.5:1 for normal text, 3:1 for large text
// WCAG AAA requires: 7:1 for normal text, 4.5:1 for large text

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

function checkCompliance(ratio) {
  return {
    'AA Normal': ratio >= 4.5 ? '✅ PASS' : '❌ FAIL',
    'AA Large': ratio >= 3.0 ? '✅ PASS' : '❌ FAIL',
    'AAA Normal': ratio >= 7.0 ? '✅ PASS' : '❌ FAIL',
    'AAA Large': ratio >= 4.5 ? '✅ PASS' : '❌ FAIL'
  };
}

// Purple/Mint Experiment - Light Mode
const lightMode = {
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  foreground: '#222222',
  foregroundSecondary: '#4b4e6d',
  foregroundMuted: '#6b7280',
  border: '#e5e7eb',
  accent: '#9984d4', // Soft periwinkle for focus rings
  accentButton: '#5b1865', // Deep purple for buttons
  chatHeader: '#b7ffd8', // Aquamarine for chat header
  surface: '#ffffff',
  surfaceHover: '#f8f9fa'
};

// Deep Purple Background - Dark Mode
const darkMode = {
  background: '#1a0d1f',
  backgroundSecondary: '#251433',
  foreground: '#ffffff',
  foregroundSecondary: '#d1d5db',
  foregroundMuted: '#9ca3af',
  border: '#3d2952',
  accent: '#67e8f9', // Light blue/cyan for links and focus rings
  accentButton: '#67e8f9', // Light blue for buttons
  chatHeader: '#67e8f9', // Light blue for chat header
  surface: '#251433',
  surfaceHover: '#2d1a3d'
};

console.log('═══════════════════════════════════════════════════════════');
console.log('  WCAG CONTRAST RATIO ANALYSIS - Purple/Mint Experiment');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📋 LIGHT MODE\n');
console.log('───────────────────────────────────────────────────────────');

// Light Mode: Main text on background
let ratio = getContrastRatio(lightMode.foreground, lightMode.background);
console.log(`Main Text (#222222) on Background (#ffffff)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Secondary text on background
ratio = getContrastRatio(lightMode.foregroundSecondary, lightMode.background);
console.log(`Secondary Text (#4b4e6d) on Background (#ffffff)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Muted text on background
ratio = getContrastRatio(lightMode.foregroundMuted, lightMode.background);
console.log(`Muted Text (#6b7280) on Background (#ffffff)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Purple button (white text on deep purple)
ratio = getContrastRatio('#ffffff', lightMode.accentButton);
console.log(`Button Text (white) on Deep Purple (#5b1865)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Chat header (dark text on aquamarine)
ratio = getContrastRatio(lightMode.foreground, lightMode.chatHeader);
console.log(`Chat Header Text (#222222) on Aquamarine (#b7ffd8)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Focus ring (periwinkle)
ratio = getContrastRatio(lightMode.accent, lightMode.background);
console.log(`Focus Ring Periwinkle (#9984d4) on Background (#ffffff)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Light Mode: Welcome message in chat (muted text on background)
ratio = getContrastRatio(lightMode.foregroundMuted, lightMode.background);
console.log(`Chat Welcome Message (#6b7280) on Background (#ffffff)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

console.log('\n📋 DARK MODE - Testing Darker Blue Shades\n');
console.log('───────────────────────────────────────────────────────────');

// Test various darker cyan/blue shades with white text
const blueShades = [
  { name: 'Current Light Blue', hex: '#67e8f9' },
  { name: 'Option 1 - Just Passing AA', hex: '#0771a3' },
  { name: 'Option 2 - Safe AA', hex: '#06608b' },
  { name: 'Option 3 - Strong AA', hex: '#055173' },
  { name: 'Option 4 - AAA Level', hex: '#04415c' },
  { name: 'Option 5 - Deep Teal', hex: '#033244' }
];

blueShades.forEach(shade => {
  ratio = getContrastRatio('#ffffff', shade.hex);
  console.log(`${shade.name} (${shade.hex})`);
  console.log(`  White text contrast: ${ratio.toFixed(2)}:1`);
  Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
  console.log('');
});

console.log('\n📋 DARK MODE - Current Setup\n');
console.log('───────────────────────────────────────────────────────────');

// Dark Mode: Main text on background
ratio = getContrastRatio(darkMode.foreground, darkMode.background);
console.log(`Main Text (#ffffff) on Background (#222222)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Secondary text on background
ratio = getContrastRatio(darkMode.foregroundSecondary, darkMode.background);
console.log(`Secondary Text (#95a3b3) on Background (#222222)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Muted text on background
ratio = getContrastRatio(darkMode.foregroundMuted, darkMode.background);
console.log(`Muted Text (#9ca3af) on Background (#222222)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Button (dark text on light blue)
ratio = getContrastRatio('#0f172a', darkMode.accentButton);
console.log(`Button Text (#0f172a) on Light Blue (#67e8f9)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Chat header (dark text on light blue)
ratio = getContrastRatio('#0f172a', darkMode.chatHeader);
console.log(`Chat Header Text (#0f172a) on Light Blue (#67e8f9)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Accent text/links on purple background
ratio = getContrastRatio(darkMode.accent, darkMode.background);
console.log(`Accent Text/Links (#67e8f9) on Purple Background (#1a0d1f)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

// Dark Mode: Welcome message in chat (muted text on background)
ratio = getContrastRatio(darkMode.foregroundMuted, darkMode.background);
console.log(`Chat Welcome Message (#9ca3af) on Purple Background (#1a0d1f)`);
console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
Object.entries(checkCompliance(ratio)).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  SUMMARY');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('WCAG Standards:');
console.log('  • AA Normal Text: 4.5:1 minimum');
console.log('  • AA Large Text: 3:1 minimum');
console.log('  • AAA Normal Text: 7:1 minimum (enhanced)');
console.log('  • AAA Large Text: 4.5:1 minimum (enhanced)');
console.log('\nLarge text = 18pt+ or 14pt+ bold');
console.log('═══════════════════════════════════════════════════════════\n');
