# Virasat-Vani | Voice of Heritage

<div align="center">

![Virasat-Vani Logo](public/virasat_vani_logo.png)
 
**Experience Indian Heritage Crafts through AI-powered storytelling and immersive shopping**

[![Built with React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5a0fc8)](https://web.dev/progressive-web-apps/)

</div>

---

## 🎨 About

**Virasat-Vani** (Voice of Heritage) is a premium, cinematic mobile-first web application that bridges the gap between traditional Indian artisans and modern buyers. Through AI-powered audio storytelling, immersive product experiences, and live auction features, we bring centuries-old crafts to life.

### ✨ Key Features

- 🎙️ **AI Audio Storytelling** - Each product comes with narrated heritage stories
- 🛍️ **Immersive Shopping** - Premium product cards with AR preview capabilities
- 📺 **Live Auctions** - Real-time bidding on exclusive artisan pieces
- 🗺️ **Heritage Map** - Explore craft locations across India
- 💬 **Vani AI Chatbot** - Intelligent assistant for heritage queries
- 🎨 **Dual Modes** - Artisan dashboard and buyer marketplace
- 🌐 **Bilingual** - English and Hindi language support
- 📱 **PWA Ready** - Install as a mobile app

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Virasat-Vani.git
cd Virasat-Vani

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

---

## 📦 Build & Deploy

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

### Deployment Options

#### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/Virasat-Vani)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/Virasat-Vani)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Deploy to GitHub Pages

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19.2 |
| **Build Tool** | Vite 7.2 |
| **Styling** | Tailwind CSS 4.1 |
| **Icons** | Lucide React |
| **PWA** | vite-plugin-pwa |
| **State Management** | React Context API |
| **Storage** | LocalStorage |

---

## 📁 Project Structure

```
Virasat-Vani/
├── public/                    # Static assets
│   ├── virasat_vani_logo.png
│   ├── virasat_vani_favicon.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/           # React components
│   │   ├── artisan/         # Artisan dashboard components
│   │   └── buyer/           # Buyer marketplace components
│   ├── data/                # Mock data
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

---

## 🎯 Features in Detail

### For Buyers
- Browse curated heritage products with immersive visuals
- Listen to AI-narrated stories about each craft
- AR preview to visualize products in your space
- Add items to collectibles cart
- Participate in live auctions
- Discover artisans on an interactive map
- Voice search for products

### For Artisans
- Upload products with images and stories
- Manage inventory and pricing
- Host live auction events
- Track sales and engagement
- Build profile and showcase work

---

## 🌍 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License

This project is part of an academic mini-project.

---

## 🙏 Acknowledgments

- Traditional Indian artisans for their timeless crafts
- Unsplash for placeholder images during development
- The React and Vite communities

---

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for preserving Indian heritage**

</div>
