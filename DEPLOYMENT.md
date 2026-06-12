# Deployment Guide

## Local Development

### Prerequisites
- Node.js 16+ (Node 18+ recommended)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```
The site will be available at `http://localhost:3000`

3. **Start Backend Server (Optional - for contact form)**
```bash
npm run server
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. For production:
```bash
vercel --prod
```

### 2. Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

1. Update `vite.config.js` to add base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

### 4. Traditional Hosting (cPanel, etc.)

1. Build the project:
```bash
npm run build
```

2. Upload the contents of `dist/` folder to your web server

## Environment Variables

For the contact form to work, set these environment variables:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

Create a `.env` file in the root directory with these values.

## Custom Domain

After deployment, you can add a custom domain through your hosting provider's dashboard.

## Performance Optimization

- All assets are optimized during build
- Images should be placed in `public/` folder
- Lazy loading is implemented for components
- Code splitting is automatic with Vite

## Troubleshooting

### Build fails
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version`

### Contact form not working
- Ensure backend server is running
- Check environment variables
- For Gmail, enable "Less secure app access" or use App Passwords

### Slow loading
- Run production build: `npm run build`
- Serve with `npm run preview` to test production performance
