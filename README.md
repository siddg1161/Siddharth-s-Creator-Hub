# Discovery Feed — Creator Collaboration Platform

A beautiful, tactile, and fluid React + Tailwind CSS micro-interaction flow demonstrating modern UI/UX design principles with extensive animations.

## 🎨 Features

- **Discovery Feed**: Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop) with high-quality portraits
- **Rich Animations**: Staggered card entrances, hover effects, scale transforms, color transitions
- **Slide-Up Bottom Sheet**: Smooth drawer animation with drag-to-dismiss functionality
- **Dopamine Button**: Press effect with 72-particle confetti burst (circles + stars)
- **Fully Responsive**: Full-screen layout that adapts from 375px mobile to large desktop screens
- **Glassmorphism**: Blur effects with depth and translucency
- **Fluid Motion**: Spring physics, hover states, sequential reveals

## 🎬 Animation Highlights

### Page Load
- Title fade-in with pulse effect on "Creators"
- Subtitle slide-up animation
- Avatar button bounce-in
- Filter chips sequential slide-up (staggered delays)
- Cards staggered entrance from bottom (5 different delays)

### Card Interactions
- **Hover**: Lift up, scale up, shadow expansion, image zoom + rotate
- **Image**: Scale to 110% with 2° rotation on hover
- **Match Badge**: Scale + glow intensification
- **Bookmark**: Scale + rotate + bounce when saved
- **Stats**: Individual stat scale-ups with staggered delays
- **Tags**: Sequential upward slide on card hover

### Bottom Sheet
- **Open**: 600ms smooth slide-up with backdrop blur
- **Hero Image**: Scale animation on entry
- **Content**: Sequential fade + slide-up for each section
- **Stats Panel**: Individual hover scale + color change
- **Tags**: Staggered entrance animations
- **Work Grid**: Sequential image reveals with hover zoom + rotate

### Button States
- **Filters**: Hover lift, scale, shadow, border color transition
- **Connect**: Hover scale, shadow expansion, press effect, morph to checkmark
- **Particles**: 72 particles with gravity, rotation, fade, mixed shapes

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Responsive Behavior

- **Mobile (375px - 767px)**: Single column grid, full-width cards, compact spacing
- **Tablet (768px - 1023px)**: 2-column grid, medium padding
- **Desktop (1024px+)**: 3-column grid, max-width container (7xl), generous spacing

## 🎯 Design Principles Implemented

✅ **Warmth**: Earthy palette (Marigold Orange, Deep Teal, Cream, Terracotta)  
✅ **Tactile Feel**: Scale-down press effects, hover lifts, spring animations  
✅ **Glassmorphism**: Backdrop blur on badges, stats panels, filters  
✅ **Fluidity**: No instant snaps — 300-700ms transitions with cubic-bezier easing  
✅ **Typography**: Manrope + Playfair Display (no generic fonts)  
✅ **Motion Design**: 60fps animations with GPU-accelerated transforms  
✅ **Visual Hierarchy**: Clear focal points, progressive disclosure  
✅ **Micro-interactions**: Every element responds to touch/hover  

## 🛠️ Tech Stack

- **React 18** - Component-based architecture with hooks
- **Tailwind CSS 3** - Utility-first styling with extensive custom theme
- **CSS Animations** - Hardware-accelerated transforms and transitions
- **Canvas API** - Particle system for confetti effect with gravity physics

## 📂 Project Structure

```
src/
├── App.js              # Main app with full-screen responsive layout
├── ProfileCard.jsx     # Card component with extensive hover animations
├── BottomSheet.jsx     # Drawer with sequential content reveals
├── data.js             # Creator profiles data
├── index.css           # Tailwind + custom animations (fade, slide, bounce)
└── index.js            # React entry point
```

## 🎭 Key Interactions

1. **Page Load**: Sequential animations - title → subtitle → avatar → filters → cards (staggered)
2. **Card Hover**: Image zoom + rotate, badge glow, name color change, stats scale, shadow expansion
3. **Card Tap**: Press effect → Opens sheet with 600ms spring animation + backdrop blur
4. **Sheet Open**: Hero scales in, content sections reveal sequentially with staggered delays
5. **Sheet Drag**: Swipe down 100px on handle bar to dismiss
6. **Connect Button**: 
   - Hover: Scale up + shadow expansion
   - Press: Scale down → Morphs to green "✓ Sent!" with bounce
   - Launches 72 particles (mixed circles/stars) with gravity + fade

## 🎨 Color Palette

```css
--cream:       #F5F0E8  (Background)
--marigold:    #E8973A  (Primary CTA)
--teal:        #1E6B6B  (Accent, Active states)
--terracotta:  #C05A3A  (Secondary accent)
--charcoal:    #1A1A1A  (Text)
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'build' folder to https://app.netlify.com/drop
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add homepage to package.json
npm run deploy
```

## 🎥 Animation Performance

✅ All animations at 60fps using CSS transforms (translateY, scale, rotate)  
✅ GPU-accelerated with `will-change` and `transform`  
✅ No layout recalculations during animations  
✅ Passive touch event listeners for smooth scroll  
✅ Images lazy-loaded  
✅ Backdrop blur uses native browser acceleration  

## 🎨 Customization

**Colors**: Edit `tailwind.config.js` → `theme.extend.colors`  
**Animations**: Edit `tailwind.config.js` → `theme.extend.animation` and `src/index.css`  
**Timing**: Adjust duration classes (duration-300, duration-500, etc.)  
**Delays**: Modify `transitionDelay` in components  
**Creators**: Edit `src/data.js`  

## 📸 Demo Recording Tips

- Show full-screen responsiveness by resizing browser
- Demonstrate all hover states (cards, buttons, stats)
- Click through card → sheet → connect button
- Show drag-to-dismiss gesture
- Capture particle explosion at 60fps
- Test on mobile device if possible

## 📄 License

MIT
