# Global BarterNet — Design System

## 1. Vision
Global BarterNet is an AI-Mediated Blockchain Resource Exchange Platform. A post-currency economy where AI agents match resources, negotiate trades, and blockchain ensures trust.

## 2. Design Philosophy
Premium, futuristic, like a Bloomberg Terminal meets Apple Vision Pro. Dark mode with glassmorphism (liquid glass), vibrant iOS accent colors, and smooth micro-animations.

## 3. Color System

### Backgrounds
- Pure Black (#000000) — page background
- Dark Surface (#1C1C1E) — card/elevated backgrounds
- Tertiary Surface (#2C2C2E) — nested elements

### Accents (iOS System Colors)
- Blue (#007AFF) — primary actions, CTAs, active states
- Green (#34C759) — success, positive trends, completed trades
- Orange (#FF9500) — warnings, pending states
- Red (#FF3B30) — errors, destructive actions
- Purple (#AF52DE) — premium features, AI-related
- Teal (#5AC8FA) — information, secondary highlights
- Indigo (#5856D6) — blockchain-related elements
- Mint (#00C7BE) — fresh indicators

### Text
- White (#FFFFFF) — headings, primary content
- Gray (#8E8E93) — labels, secondary text
- Dark Gray (#636366) — captions, hints
- Darker Gray (#48484A) — disabled text

### Materials
- Glass backgrounds: rgba(255,255,255, 0.04–0.08)
- Glass borders: rgba(255,255,255, 0.08–0.15)
- Specular highlights: 1px white gradient across top edges

## 4. Typography
- **Primary Font**: Inter (weights 300–900)
- **Display Font**: Outfit (weights 300–900)
- **Mono Font**: JetBrains Mono (weights 400–600)
- **Letter Spacing**: -0.02em on titles, -0.01em on body
- **Font Smoothing**: antialiased

## 5. Component Patterns

### Cards
- Border radius: 20px
- Background: Liquid glass (gradient + backdrop-filter: blur(40px) saturate(200%))
- Border: 0.5px solid rgba(255,255,255,0.12)
- Shadow: Layered (inset highlight + outer depth)
- Hover: translateY(-2px) scale(1.005), border brightens

### Buttons
- Primary: Blue (#007AFF), rounded 14px, 600 weight
- Secondary: Glass background with blue text
- Both have active scale(0.97) press effect

### Status Badges
- Rounded full (pill shape)
- Color-coded: green=completed, yellow=pending, blue=in-progress, red=cancelled

### Sidebar
- Glass background: darker, more opaque
- Width: 260px expanded, 72px collapsed
- Smooth transition with cubic-bezier(0.28, 0.84, 0.42, 1)

## 6. Design System Notes for Stitch Generation

Use this block in every Stitch prompt:

```
**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark mode, futuristic cyber-tech, liquid glass / glassmorphism
- Background: Pure Black (#000000) with subtle ambient radial gradients
- Surface Cards: Frosted glass with rgba(255,255,255,0.04-0.08) bg, blur(40px), 0.5px white borders at 12-15% opacity
- Primary: iOS Blue (#007AFF)
- Success: iOS Green (#34C759), Warning: iOS Orange (#FF9500), Error: iOS Red (#FF3B30)
- AI/Premium: iOS Purple (#AF52DE), Info: iOS Teal (#5AC8FA)
- Text: White (#FFFFFF) headings, Gray (#8E8E93) labels, Dark Gray (#636366) captions
- Font: Inter, -0.02em letter-spacing titles
- Cards: 20px radius, glass morphism, hover lift
- Buttons: 14px radius, subtle glass secondary
- Vibe: Premium futuristic — Apple Vision Pro meets Bloomberg Terminal
```
