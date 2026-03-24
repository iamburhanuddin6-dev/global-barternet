const fs = require('fs');
const path = require('path');

function processDir(dir) {
    for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            processDir(p);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            let orig = fs.readFileSync(p, 'utf8');
            let txt = orig;

            // Backgrounds
            txt = txt.replace(/\bbg-black\b/g, 'bg-background');
            txt = txt.replace(/bg-\[rgba?\(255,\s*255,\s*255,\s*0\.0[4-6]\)\]/g, 'bg-[var(--liquid-glass-bg)]');
            txt = txt.replace(/bg-white\/[0-9]+/g, 'bg-[var(--liquid-glass-bg)]');
            txt = txt.replace(/bg-white\/\[[0-9.]+\]/g, 'bg-[var(--liquid-glass-bg)]');
            
            // Borders
            txt = txt.replace(/border(?:-t|-b|-l|-r)?-\[rgba?\(255,\s*255,\s*255,\s*0\.[0-1][0-9]\)\]/g, 'border-[var(--liquid-glass-border)]');
            txt = txt.replace(/border-white\/[0-9]+/g, 'border-[var(--liquid-glass-border)]');
            
            // Text
            txt = txt.replace(/\btext-white\b(?!(\/|\]|[\w-]))/g, 'text-label-primary');
            txt = txt.replace(/'#ffffff'/gi, "'var(--text-primary)'");
            txt = txt.replace(/"#ffffff"/gi, '"var(--text-primary)"');
            txt = txt.replace(/'#8E8E93'/gi, "'var(--text-secondary)'");
            txt = txt.replace(/"#8E8E93"/gi, '"var(--text-secondary)"');
            
            // Inline Styles (like backgroundColor: ...)
            txt = txt.replace(/backgroundColor:\s*'rgba?\(20,\s*20,\s*22,\s*0\.9\)'/g, "backgroundColor: 'var(--background-elevated)'");
            txt = txt.replace(/color:\s*'#fff'/g, "color: 'var(--text-primary)'");

            if (txt !== orig) {
                fs.writeFileSync(p, txt, 'utf8');
                console.log('Fixed themes in:', p);
            }
        }
    }
}

// Ensure theme manager is imported at layout.tsx properly
processDir('./src/components');
processDir('./src/app');
console.log('Done mapping static colors to dynamic variables');
