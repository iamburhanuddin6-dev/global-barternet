const fs = require('fs');
const path = require('path');

function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f.endsWith('.tsx')) {
            let c = fs.readFileSync(p, 'utf8');
            let orig = c;

            // Remove box drawing characters to fix SWC offset bug
            c = c.replace(/─+/g, '-----');

            // Restore framer-motion imports
            c = c.replace(/import\s*\{[^}]*\}\s*from\s*['\"]@\/lib\/motion['\"];?/g, "import { motion, AnimatePresence } from 'framer-motion';");

            // Restore all tags
            c = c.replace(/<Motion([A-Z][a-zA-Z]*)/g, (match, p1) => `<motion.${p1.toLowerCase()}`);
            c = c.replace(/<\/Motion([A-Z][a-zA-Z]*)/g, (match, p1) => `</motion.${p1.toLowerCase()}`);

            if (c !== orig) {
                fs.writeFileSync(p, c, 'utf8');
                console.log('Restored: ' + p);
            }
        }
    }
}
walk('./src');
console.log('Done restoring components and stripping unicode boxes.');
