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
  console.log(`\n🎨 Generating: ${pageName}`);
  console.log(`   Prompt: ${prompt.substring(0, 100)}...`);
  
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
  
  const data = await res.json();
  
  if (data.error) {
    console.error(`   ❌ Error: ${JSON.stringify(data.error)}`);
    return null;
  }
  
  console.log(`   ✅ Screen generated!`);
  
  // Save screen metadata
  const screenId = data.name?.split('/screens/')[1];
  console.log(`   Screen ID: ${screenId}`);
  
  // Download HTML if available
  if (data.htmlCode?.downloadUrl) {
    console.log(`   📥 Downloading HTML...`);
    try {
      const htmlRes = await fetch(data.htmlCode.downloadUrl);
      const html = await htmlRes.text();
      fs.writeFileSync(path.join(DESIGNS_DIR, `${pageName}.html`), html, 'utf8');
      console.log(`   ✅ HTML saved: .stitch/designs/${pageName}.html`);
    } catch (e) {
      console.error(`   ⚠️ HTML download failed: ${e.message}`);
    }
  }
  
  // Download screenshot if available
  if (data.screenshot?.downloadUrl) {
    const width = data.width || 1440;
    const screenshotUrl = `${data.screenshot.downloadUrl}=w${width}`;
    console.log(`   📥 Downloading screenshot...`);
    try {
      const imgRes = await fetch(screenshotUrl);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(path.join(DESIGNS_DIR, `${pageName}.png`), buffer);
      console.log(`   ✅ Screenshot saved: .stitch/designs/${pageName}.png`);
    } catch (e) {
      console.error(`   ⚠️ Screenshot download failed: ${e.message}`);
    }
  }
  
  return { pageName, screenId, data };
}

// Design system for consistent prompts
const DESIGN_SYSTEM = `
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark mode, futuristic, cyber-tech aesthetic with liquid glass / glassmorphism
- Background: Pure Black (#000000) with subtle ambient radial gradients (blue, purple, green)
- Surface Cards: Frosted glass panels with rgba(255,255,255,0.04-0.08) backgrounds, backdrop-filter blur(40px), saturate(200%), and subtle 0.5px white borders at 12-15% opacity
- Primary Accent: iOS Blue (#007AFF) for CTAs, links, and active states
- Secondary Accents: iOS Green (#34C759) for success/positive, iOS Orange (#FF9500) for warnings, iOS Purple (#AF52DE) for premium features, iOS Teal (#5AC8FA) for info
- Error: iOS Red (#FF3B30)
- Text Primary: White (#FFFFFF) - headings and important text
- Text Secondary: Gray (#8E8E93) - labels, descriptions
- Text Tertiary: Dark Gray (#636366) - captions, hints
- Typography: Inter font family, -0.02em letter spacing on headings, clean and minimal
- Buttons: Softly rounded (14px radius), with subtle glass effect on secondary buttons
- Cards: Rounded 20px, glass morphism with specular highlight on top edge (1px white gradient shimmer), hover lift with scale(1.005)
- Spacing: Generous whitespace, 16px-32px padding in cards
- Icons: Lucide icon style, thin and elegant
- Animations: Smooth cubic-bezier(0.28, 0.84, 0.42, 1) transitions, subtle hover lifts
- Shadows: Layered — inset highlight + outer depth shadow
- Overall Vibe: Premium, futuristic, like a trading terminal from 2030, Apple Vision Pro meets Bloomberg Terminal
`;

// Pages to generate  
const pages = [
  {
    name: 'landing',
    prompt: `A stunning, award-winning landing page for "Global BarterNet" — an AI-Mediated Blockchain Resource Exchange Platform. This is a post-currency economy system where people trade resources, skills, and services powered by AI matching and blockchain trust.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Navigation Bar:** Sticky frosted glass navbar with "Global BarterNet" logo (glowing blue text with a subtle network/globe icon), navigation links (Features, How it Works, AI Engine, Blockchain, Contact), and a glowing "Launch App" CTA button
2. **Hero Section:** Full-viewport hero with animated particle network background. Massive headline "The Future of Exchange" with gradient text (blue to purple). Subheadline "AI Meets Blockchain to Create a Post-Currency Economy". Two CTAs: "Start Trading" (primary blue) and "Watch Demo" (glass outline). Floating glassmorphism cards showing live trading activity stats
3. **Stats Bar:** Horizontal stats strip showing "2.4M+ Trades", "156 Countries", "99.7% AI Match Rate", "₿2.1B Network Value" with animated counting numbers
4. **Features Grid:** 3-column grid of glassmorphism cards: (1) "AI Matching Engine" with brain icon - AI agents find perfect resource matches, (2) "Blockchain Trust" with shield icon - Every trade verified on-chain, (3) "Real-Time Exchange" with arrows icon - Instant global trading, (4) "Smart Negotiation" with chat icon - AI handles deal terms, (5) "Reputation System" with star icon - Trust scores for all users, (6) "Analytics Dashboard" with chart icon - Deep insights into your trading
5. **How It Works:** 4-step visual timeline: List → Match → Negotiate → Complete, each step in a glass card with numbered circle and description
6. **CTA Section:** Final section with headline "Ready to Trade Without Currency?" and a large "Join the Network" button
7. **Footer:** Dark footer with links, social icons, and copyright "© 2026 Global BarterNet"`
  },
  {
    name: 'dashboard',
    prompt: `A premium, data-rich dashboard page for "Global BarterNet" trading platform. This is the main command center after login.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Left Sidebar:** Vertical navigation with glassmorphism background, logo at top, menu items with icons: Dashboard (active, highlighted blue), Exchange, Resources, Trades, AI Agents, Analytics, Reputation, Blockchain, Settings. User avatar and name at bottom
2. **Top Header Bar:** Frosted glass header with search bar (pill-shaped with magnifier icon), notification bell with red badge count "3", wallet connection status showing "0x7a3...b2f4" with green dot, and user profile dropdown
3. **Welcome Banner:** Greeting "Good Morning, Trader" with the user's name and today's date. Small motivational subtext like "Your AI agents found 12 new matches today"
4. **KPI Metrics Row:** 5 glassmorphism metric cards in a row: "Network Value" ($2.4B with green +12.3%), "Active Users" (24,891 with green +8.4%), "Exchange Volume" (1,247 with green +23.1%), "AI Efficiency" (96.2% with green +2.1%), "Avg Match Time" (1.2s with green -15.3%)
5. **Main Content Area:** Two-column layout:
   - Left: "Network Activity" area chart (blue gradient fill) showing trade volume over time with the last 7 days
   - Right: "Resource Distribution" donut chart showing categories: Technology (35%), Knowledge (25%), Services (20%), Physical Goods (12%), Creative (8%)
6. **Recent Trades Table:** Glassmorphism table showing recent trades with columns: Trade ID, Offered, Requested, Match Score (percentage with color coding), Status (badge pills: Completed green, Pending yellow, In Progress blue), Date
7. **AI Agents Status:** Row of 4 small cards showing AI agents: "NOVA" (Matcher, scanning), "ATLAS" (Negotiator, active), "SENTINEL" (Validator, processing), "ORACLE" (Analyst, idle). Each with a pulsing status dot and efficiency percentage`
  },
  {
    name: 'exchange',
    prompt: `A sophisticated marketplace/exchange page for "Global BarterNet" where users browse and trade resources.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Page Header:** Title "Exchange Marketplace" with subtitle "Browse and trade resources with AI-powered matching". Filter bar with category dropdown (All, Technology, Services, Knowledge, Physical Goods), sort dropdown (Relevance, Newest, Value, Match Score), and search input
2. **Active Listings Grid:** 3-column responsive grid of resource cards. Each card is a glassmorphism panel featuring: resource thumbnail image at top, category badge (colored pill), resource title, brief description, estimated value in barter credits, owner's avatar and name with their reputation score (stars), "Match Score" indicator (percentage in a circular progress ring), and "Propose Trade" button. Include 6+ sample cards showing diverse items: "Full-Stack Dev Hours" (Technology), "Piano Lessons" (Knowledge), "Graphic Design Package" (Services), "Vintage Camera" (Physical Goods), "Marketing Consultation" (Services), "3D Printing Time" (Technology)
3. **AI Match Suggestions Panel:** Right sidebar or bottom section with "AI Recommended Matches" heading. Shows 3 top matches with high match percentages (95%+), preview of items, and "Quick Trade" button
4. **Trade Proposal Modal Preview:** Show a subtle preview of what the trade modal looks like: two-sided exchange view with "You Offer" on left and "You Receive" on right, connected by an animated arrows/exchange icon in the center`
  },
  {
    name: 'ai-agents',
    prompt: `A futuristic AI Agents management page for "Global BarterNet" showing autonomous trading agents.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Page Header:** Title "AI Trading Agents" with subtitle "Your autonomous agents working 24/7 to find the best trades". Overall stats bar: "6 Active Agents", "96.2% Avg Efficiency", "1,247 Total Matches Found"
2. **Agent Cards Grid:** 2x3 grid of large glassmorphism cards, one per agent:
   - NOVA (🤖 Matcher): Status "Scanning", Efficiency 96.2%, Matches Found 1,247. Blue accent glow
   - ATLAS (🧠 Negotiator): Status "Negotiating", Efficiency 94.8%, Matches 892. Purple accent
   - SENTINEL (🛡️ Validator): Status "Processing", Efficiency 99.1%, Matches 2,156. Green accent
   - ORACLE (🔮 Analyst): Status "Scanning", Efficiency 97.5%, Matches 1,563. Teal accent
   - CIPHER (⚡ Matcher): Status "Idle", Efficiency 93.7%, Matches 734. Orange accent
   - NEXUS (🌐 Negotiator): Status "Scanning", Efficiency 95.4%, Matches 1,089. Indigo accent
   Each card has: animated status indicator (pulsing dot), circular progress ring for efficiency, mini activity sparkline chart, "Configure" and "Pause/Resume" buttons
3. **Agent Activity Feed:** Live scrolling feed at bottom showing recent agent actions: "NOVA found a 94% match for your Web Dev Hours", "ATLAS negotiating trade #1247", "SENTINEL verified blockchain transaction", etc. Each entry with timestamp and agent icon
4. **Performance Comparison Chart:** Horizontal bar chart comparing all agents' performance metrics side-by-side`
  },
  {
    name: 'analytics',
    prompt: `A comprehensive analytics dashboard page for "Global BarterNet" with rich data visualizations.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Page Header:** Title "Analytics & Insights" with subtitle "Deep dive into your trading performance". Time range selector (7D, 30D, 90D, 1Y, ALL) as a segmented control
2. **KPI Summary Row:** 4 large metric cards: "Total Trade Volume" with trend line, "Success Rate" as percentage with gauge, "Average Match Time" with improvement indicator, "Network Growth" with growth percentage
3. **Charts Section - Row 1:** Two charts side by side:
   - Left: "Trade Volume Over Time" large area chart with gradient fill (blue), showing daily/weekly volume with smooth curves, axis labels, and tooltip hover
   - Right: "Category Distribution" Beautiful donut/pie chart with 5 segments (Technology, Knowledge, Services, Physical Goods, Creative), each in a distinct accent color, with legend alongside
4. **Charts Section - Row 2:** Two more charts:
   - Left: "AI Match Scores Distribution" histogram/bar chart showing distribution of match scores from 0-100%, with bars colored on a gradient from red (low) through yellow to green (high)
   - Right: "Geographic Activity" World map heat visualization showing trading activity density by region, using blue-to-purple gradient for intensity
5. **Trading Partners Table:** Table showing top trading partners with columns: User, Trades Completed, Avg Match Score, Total Value Exchanged, Trust Rating. Sortable, glassmorphism styled
6. **AI Insights Panel:** Glass card with "🔮 AI Insights" heading. 3-4 AI-generated recommendations like "Your best trading category is Technology (43% higher match rates)", "Optimal trading time: 2-5 PM UTC", "Consider listing more Service-type resources"`
  },
  {
    name: 'blockchain',
    prompt: `A blockchain transparency and verification page for "Global BarterNet" showing on-chain trade records.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Page Header:** Title "Blockchain Ledger" with subtitle "Every transaction verified and immutable". Stats: "12,847 On-Chain Transactions", "99.99% Uptime", "Block #4,521,890"
2. **Chain Visualization:** A horizontal chain/timeline graphic showing the last 5-6 blocks as connected glassmorphism hexagons with block numbers, timestamp, and transaction count. Animated connecting lines between blocks
3. **Transaction Explorer:** Search bar for looking up transaction hashes. Below it, a scrollable list of recent transactions. Each transaction card shows: Tx Hash (truncated with copy button), From/To addresses with avatars, Resources exchanged, Value, Timestamp, Status badge (Confirmed ✅, Pending ⏳), Number of confirmations
4. **Smart Contract Info:** Glass card showing deployed smart contract details: Contract Address, Network (Ethereum), Total Gas Saved via batching, Number of verified trades
5. **Network Stats Grid:** 4 metric cards: "Gas Efficiency" (showing savings), "Block Confirmation Time", "Network TPS", "Total Value Locked"
6. **Verification Panel:** Section where users can verify any trade by entering a transaction hash, showing the full trade trail with timestamps`
  },
  {
    name: 'reputation',
    prompt: `A gamified reputation and trust score page for "Global BarterNet" showing user reputation, badges, and achievements.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Profile Hero Card:** Large glassmorphism hero card showing: user avatar (large circle with glowing border), username, reputation level "Diamond Trader" with level badge, XP progress bar to next level (Level 7, 2,450/3,000 XP), overall trust score displayed as a large circular gauge (0-100, showing 94), member since date
2. **Reputation Stats Row:** 4 metric cards: "Trust Score" (94/100 with circular gauge), "Completed Trades" (342), "Positive Reviews" (98.2%), "Response Time" (< 2 hours)
3. **Achievement Badge Grid:** Collection of unlocked and locked badges in a 4-column grid. Each badge is a square glassmorphism card with icon, name, and unlock status. Sample badges: "First Trade" (unlocked, trophy icon), "Century Trader" (100 trades, unlocked), "AI Whisperer" (used all agents, unlocked), "Blockchain Pioneer" (first verified trade, unlocked), "Global Citizen" (traded with 10 countries), "Speed Demon" (completed trade in under 1 minute, locked)
4. **Trading History Timeline:** Vertical timeline showing trading milestones with dates, trade details, and earned badges. Each entry has a glassmorphism card with trade summary
5. **Reviews Section:** List of reviews from other traders, showing their avatar, rating (1-5 stars), comment, and date. Positive reviews with green accent, neutral with gray
6. **Leaderboard Preview:** Small "Top Traders This Month" section showing top 5 traders with rank, avatar, name, trust score, and trade count`
  },
  {
    name: 'settings',
    prompt: `A clean, organized settings page for "Global BarterNet" with grouped controls.

${DESIGN_SYSTEM}

**PAGE STRUCTURE:**
1. **Page Header:** Title "Settings" with subtitle "Manage your account and preferences"
2. **Profile Section:** Glassmorphism card with: Editable avatar upload area (circle with camera overlay icon), Name input field, Email display (read-only), Bio textarea, "Save Changes" button
3. **Wallet & Blockchain:** Glass card with: Connected wallet address display with copy button and disconnect option, Network selector dropdown (Ethereum Mainnet, Polygon, etc.), Gas settings preference (Low/Medium/High), Auto-verify trades toggle
4. **AI Agent Preferences:** Glass card with: Global AI matching sensitivity slider (Conservative to Aggressive), Auto-accept threshold input (match score above which to auto-accept), Preferred categories multi-select, AI learning toggle (let AI learn from your preferences)
5. **Notifications:** Glass card with toggle switches organized in rows: "Trade Proposals" (on), "Match Found" (on), "Agent Updates" (on), "Price Alerts" (off), "Newsletter" (off), "Sound Effects" (on). Each toggle is iOS-style with blue active color
6. **Appearance:** Glass card with: Theme selector (Dark/Light/Auto), Accent Color picker (showing iOS colors as selectable circles), Language dropdown, Compact Mode toggle
7. **Security:** Glass card with: Two-Factor Authentication toggle with setup button, Login History link, Active Sessions count, "Delete Account" danger button at bottom (red outline)`
  }
];

// Generate all screens
async function main() {
  const results = {};
  
  for (const page of pages) {
    const result = await generateScreen(page.name, page.prompt);
    if (result) {
      results[page.name] = {
        screenId: result.screenId,
        name: result.data.name,
      };
    }
    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }
  
  // Save metadata
  const metadata = {
    projectId: PROJECT_ID,
    name: `projects/${PROJECT_ID}`,
    title: 'Global BarterNet',
    visibility: 'PRIVATE',
    projectType: 'TEXT_TO_UI',
    origin: 'STITCH',
    deviceType: 'DESKTOP',
    screens: results,
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'metadata.json'), 
    JSON.stringify(metadata, null, 2), 
    'utf8'
  );
  
  console.log('\n✅ All screens generated! Metadata saved to .stitch/metadata.json');
}

const command = process.argv[2];
if (command === 'generate-all') {
  main().catch(console.error);
} else if (command === 'generate-one') {
  const pageName = process.argv[3];
  const pageConfig = pages.find(p => p.name === pageName);
  if (pageConfig) {
    generateScreen(pageConfig.name, pageConfig.prompt).catch(console.error);
  } else {
    console.log(`Page "${pageName}" not found. Available: ${pages.map(p => p.name).join(', ')}`);
  }
} else {
  console.log('Usage: node stitch-generate.mjs [generate-all|generate-one <pageName>]');
  console.log(`Available pages: ${pages.map(p => p.name).join(', ')}`);
}
