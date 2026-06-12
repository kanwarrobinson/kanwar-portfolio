# Quick Start Guide - Kanwar Portfolio

## 🚀 Get Running in 3 Steps

### Step 1: Navigate to Project
```bash
cd /home/kanwar.salethraja/appviewx/kanwar/kanwar-portfolio
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Your portfolio will open at **http://localhost:3000** 🎉

## ⚡ Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Start backend server |

## 📝 Quick Edits

### Change Your Photo
Place your photo in `public/` folder and update the path in components.

### Update Terminal Info
Edit `src/components/Terminal.jsx` - lines 14-26

### Add New Project
Edit `src/components/Projects.jsx` - add to projects array

### Modify Colors
Edit `src/styles/index.css` - change CSS variables

## 🎨 Theme Toggle
Click the sun/moon icon in the navigation to switch themes!

## 📱 Test Responsive Design
- Resize browser window
- Use browser dev tools (F12)
- Test on mobile device

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or change port in vite.config.js
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Can't see changes?**
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear cache and reload

## 📧 Contact Form Setup

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Add your email credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

3. Start backend server:
```bash
npm run server
```

## 🌐 Deploy Now

**Vercel (Easiest)**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## ✅ Checklist Before Deploy

- [ ] Test all sections work
- [ ] Check responsive design
- [ ] Update personal info
- [ ] Add your resume PDF to `public/`
- [ ] Test contact form
- [ ] Update meta tags in `index.html`
- [ ] Run production build: `npm run build`
- [ ] Test production: `npm run preview`

## 🎯 What to Customize

1. **Colors**: `src/styles/index.css` (CSS variables)
2. **Content**: All component files in `src/components/`
3. **Images**: Add to `public/` folder
4. **Favicon**: Replace `public/favicon.png`
5. **Meta tags**: Edit `index.html`

## 📚 Need Help?

- Full documentation: `README.md`
- Features list: `FEATURES.md`
- Deployment guide: `DEPLOYMENT.md`
- Project overview: `PROJECT_SUMMARY.md`

---

**Enjoy your new portfolio! 🎉**
