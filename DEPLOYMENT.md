# Deployment Guide - Virasat-Vani

This guide provides step-by-step instructions for deploying Virasat-Vani to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [x] Production build works: `npm run build`
- [x] Preview build locally: `npm run preview`
- [x] All assets load correctly
- [x] PWA icons are in place
- [x] No console errors in production build
- [ ] Update repository URL in README.md
- [ ] Test on mobile devices

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?** Zero-config deployment, automatic HTTPS, global CDN, perfect for Vite apps.

#### Method A: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/Virasat-Vani.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

#### Method B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Netlify

**Why Netlify?** Great for static sites, form handling, serverless functions.

#### Method A: Deploy via GitHub

1. Push your code to GitHub (see Vercel steps above)
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

#### Method B: Deploy via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy to production
netlify deploy --prod --dir=dist
```

#### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Why GitHub Pages?** Free hosting for public repositories.

#### Setup

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   
   Add homepage and deploy scripts:
   ```json
   {
     "homepage": "https://yourusername.github.io/Virasat-Vani",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   
   Add base path:
   ```javascript
   export default defineConfig({
     base: '/Virasat-Vani/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

Your site will be live at `https://yourusername.github.io/Virasat-Vani`

---

### Option 4: Custom Server (VPS/Cloud)

For deployment on your own server (AWS, DigitalOcean, etc.)

#### Using Nginx

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder to server**
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/virasat-vani/
   ```

3. **Configure Nginx**
   
   Create `/etc/nginx/sites-available/virasat-vani`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/virasat-vani;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **Enable site and restart Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/virasat-vani /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔧 Environment Variables

If you need environment variables:

1. Create `.env` file (never commit this!)
2. Add variables prefixed with `VITE_`:
   ```
   VITE_API_KEY=your_key_here
   ```
3. Access in code: `import.meta.env.VITE_API_KEY`

**Platform-specific:**
- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Environment Variables
- **GitHub Pages**: Not supported (use build-time variables)

---

## 📱 PWA Installation

After deployment, users can install the app:

**On Mobile:**
1. Visit the deployed URL
2. Tap browser menu
3. Select "Add to Home Screen"
4. App icon appears on home screen

**On Desktop:**
1. Visit the deployed URL
2. Look for install icon in address bar
3. Click to install

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Assets Not Loading

- Check `vite.config.js` base path
- Ensure all asset paths are relative or use `/`
- Verify assets are in `public/` folder

### PWA Not Working

- Check browser console for service worker errors
- Verify PWA icons exist in `public/`
- Test on HTTPS (required for PWA)

### Routing Issues (404 on refresh)

Add redirect rules:
- **Netlify**: Use `netlify.toml` (see above)
- **Vercel**: Auto-handled
- **Nginx**: Use `try_files` (see above)

---

## 📊 Performance Optimization

After deployment:

1. **Test with Lighthouse**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit

2. **Optimize Images**
   - Compress large images
   - Use WebP format
   - Lazy load images

3. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

---

## 🔄 Continuous Deployment

**Vercel & Netlify** automatically redeploy when you push to GitHub:

```bash
git add .
git commit -m "Update features"
git push origin main
# Automatically triggers deployment
```

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Open an issue on GitHub

---

**Happy Deploying! 🚀**
