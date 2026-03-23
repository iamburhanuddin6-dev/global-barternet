const API_KEY = 'AQ.Ab8RN6Jm5T04kSnNaitk8uBUaLcjt3SR3q35FbI5-QIz4LGi1g';
const BASE_URL = 'https://stitch.googleapis.com/v1';

async function createProject(title) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  console.log('Create Project Response:', JSON.stringify(data, null, 2));
  return data;
}

async function getProject(projectId) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: { 'X-Goog-Api-Key': API_KEY },
  });
  const data = await res.json();
  console.log('Get Project Response:', JSON.stringify(data, null, 2));
  return data;
}

async function generateScreen(projectId, prompt, deviceType = 'DESKTOP') {
  console.log(`\nGenerating screen for: ${prompt.substring(0, 80)}...`);
  const res = await fetch(`${BASE_URL}/projects/${projectId}/screens:generateFromText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify({ projectId, prompt, deviceType }),
  });
  const data = await res.json();
  console.log('Generate Screen Response:', JSON.stringify(data, null, 2));
  return data;
}

async function listProjects() {
  const res = await fetch(`${BASE_URL}/projects`, {
    headers: { 'X-Goog-Api-Key': API_KEY },
  });
  const data = await res.json();
  console.log('List Projects:', JSON.stringify(data, null, 2));
  return data;
}

// Parse command from CLI args
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'create':
    createProject(args[0] || 'Global BarterNet');
    break;
  case 'get':
    getProject(args[0]);
    break;
  case 'generate':
    generateScreen(args[0], args[1], args[2] || 'DESKTOP');
    break;
  case 'list':
    listProjects();
    break;
  default:
    console.log('Usage: node stitch-api.mjs [create|get|generate|list] [args...]');
}
