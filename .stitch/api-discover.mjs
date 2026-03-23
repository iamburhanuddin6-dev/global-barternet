import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = 'AQ.Ab8RN6Jm5T04kSnNaitk8uBUaLcjt3SR3q35FbI5-QIz4LGi1g';
const BASE = 'https://stitch.googleapis.com';
const PROJECT_ID = '15943466082474447540';

async function tryEndpoint(label, url, method = 'GET', body = null) {
  console.log(`\n--- ${label} ---`);
  console.log(`${method} ${url}`);
  
  const opts = {
    method,
    headers: {
      'X-Goog-Api-Key': API_KEY,
    },
  };
  
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  
  try {
    const res = await fetch(url, opts);
    console.log(`Status: ${res.status} ${res.statusText}`);
    const text = await res.text();
    if (text) {
      console.log(`Response: ${text.substring(0, 800)}`);
    } else {
      console.log('Empty response');
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

async function main() {
  // Try various endpoints to discover the API
  await tryEndpoint('List Projects (v1)', `${BASE}/v1/projects`);
  await tryEndpoint('Get Project (v1)', `${BASE}/v1/projects/${PROJECT_ID}`);
  await tryEndpoint('List Screens (v1)', `${BASE}/v1/projects/${PROJECT_ID}/screens`);
  
  // Try generate with proper REST path
  await tryEndpoint('Generate Screen (v1)', 
    `${BASE}/v1/projects/${PROJECT_ID}/screens:generateFromText`,
    'POST',
    { prompt: 'A simple dark landing page', deviceType: 'DESKTOP' }
  );
  
  // Try without v1
  await tryEndpoint('List Projects (no version)', `${BASE}/projects`);
  
  // Try the MCP SSE endpoint
  await tryEndpoint('MCP SSE', `${BASE}/mcp`);
  
  // Try the discovery/API endpoint
  await tryEndpoint('Discovery', `${BASE}/$discovery/rest`);
}

main().then(() => {
  console.log('\n=== Done ===');
});
