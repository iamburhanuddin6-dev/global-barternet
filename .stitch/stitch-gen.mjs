import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = 'AQ.Ab8RN6Jm5T04kSnNaitk8uBUaLcjt3SR3q35FbI5-QIz4LGi1g';
const BASE_URL = 'https://stitch.googleapis.com/v1';
const PROJECT_ID = '15943466082474447540';
const DESIGNS_DIR = path.join(__dirname, 'designs');

if (!fs.existsSync(DESIGNS_DIR)) fs.mkdirSync(DESIGNS_DIR, { recursive: true });

async function generateScreen(pageName, prompt) {
  console.log(`\nGenerating: ${pageName}`);
  
  try {
    const res = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/screens:generateFromText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
      },
      body: JSON.stringify({ 
        projectId: PROJECT_ID, 
        prompt, 
        deviceType: 'DESKTOP' 
      }),
    });
    
    const responseText = await res.text();
    console.log(`Response status: ${res.status}`);
    
    // Log the raw response for debugging
    fs.writeFileSync(
      path.join(__dirname, `debug-${pageName}-response.json`), 
      responseText, 
      'utf8'
    );
    
    if (!res.ok) {
      console.log(`Error response: ${responseText.substring(0, 500)}`);
      return null;
    }
    
    if (!responseText || responseText.trim() === '') {
      console.log('Empty response received');
      return null;
    }
    
    const data = JSON.parse(responseText);
    
    if (data.error) {
      console.log(`API Error: ${JSON.stringify(data.error)}`);
      return null;
    }
    
    console.log(`Screen generated successfully!`);
    console.log(`Screen name: ${data.name}`);
    
    const screenId = data.name?.split('/screens/')[1];
    console.log(`Screen ID: ${screenId}`);
    
    // Download HTML
    if (data.htmlCode?.downloadUrl) {
      console.log(`Downloading HTML...`);
      try {
        const htmlRes = await fetch(data.htmlCode.downloadUrl);
        const html = await htmlRes.text();
        fs.writeFileSync(path.join(DESIGNS_DIR, `${pageName}.html`), html, 'utf8');
        console.log(`HTML saved: .stitch/designs/${pageName}.html (${html.length} chars)`);
      } catch (e) {
        console.log(`HTML download failed: ${e.message}`);
      }
    } else {
      console.log('No HTML download URL in response');
    }
    
    // Download screenshot
    if (data.screenshot?.downloadUrl) {
      const width = data.width || 1440;
      const screenshotUrl = `${data.screenshot.downloadUrl}=w${width}`;
      console.log(`Downloading screenshot...`);
      try {
        const imgRes = await fetch(screenshotUrl);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(path.join(DESIGNS_DIR, `${pageName}.png`), buffer);
        console.log(`Screenshot saved: .stitch/designs/${pageName}.png (${buffer.length} bytes)`);
      } catch (e) {
        console.log(`Screenshot download failed: ${e.message}`);
      }
    } else {
      console.log('No screenshot URL in response');
    }
    
    return { pageName, screenId, data };
  } catch (error) {
    console.log(`Fatal error: ${error.message}`);
    return null;
  }
}

// Design system
const DESIGN_SYSTEM = `
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark mode, futuristic, cyber-tech, liquid glass / glassmorphism
- Background: Pure Black (#000000) with subtle ambient radial gradients (blue, purple, green)
- Surface Cards: Frosted glass with rgba(255,255,255,0.04-0.08) bg, backdrop-filter blur(40px) saturate(200%), 0.5px white borders at 12-15% opacity
- Primary: iOS Blue (#007AFF) for CTAs and active states
- Success: iOS Green (#34C759), Warning: iOS Orange (#FF9500), Error: iOS Red (#FF3B30)
- AI/Premium: iOS Purple (#AF52DE), Info: iOS Teal (#5AC8FA)
- Text Primary: White (#FFFFFF), Secondary: Gray (#8E8E93), Tertiary: Dark Gray (#636366)
- Font: Inter, -0.02em letter spacing on titles
- Cards: 20px radius, glass morphism, specular highlight on top edge, hover lift
- Buttons: 14px radius
- Overall Vibe: Premium futuristic — Apple Vision Pro meets Bloomberg Terminal
`;

const pageName = process.argv[2];
const prompt = process.argv[3] || '';

if (pageName && prompt) {
  generateScreen(pageName, prompt).then(result => {
    if (result) {
      console.log('\nDone! Result saved.');
    }
  });
} else if (pageName === 'test') {
  // Quick test with a simple prompt
  generateScreen('test', `A simple dark mode landing page with glass cards. ${DESIGN_SYSTEM}`).then(result => {
    if (result) console.log('\nTest complete!');
  });
} else {
  console.log('Usage: node stitch-gen.mjs <pageName> "<prompt>"');
  console.log('Or: node stitch-gen.mjs test');
}
