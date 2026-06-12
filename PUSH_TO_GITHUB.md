# 🚀 Push Portfolio to GitHub

## ✅ Project Successfully Moved!

Your portfolio is now in: `/home/kanwar.salethraja/appviewx/kanwar/kanwar-portfolio`

All files have been copied and Git is initialized.

---

## 📦 Files Ready to Push

✅ Source code (src/)
✅ Components and styles
✅ Configuration (config.json)
✅ Package files
✅ Documentation (README, guides)
✅ Deployment files (Dockerfile, cloudbuild.yaml, nginx.conf)

---

## 🎯 Push to GitHub - Step by Step

### Step 1: Add All Files
```bash
cd /home/kanwar.salethraja/appviewx/kanwar/kanwar-portfolio
git add .
```

### Step 2: Commit
```bash
git commit -m "Initial commit: Modern React portfolio with config-driven architecture"
```

### Step 3: Add Remote (if not already added)
```bash
git remote add origin https://github.com/YOUR_USERNAME/kanwar-portfolio.git
```

Or if using SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/kanwar-portfolio.git
```

### Step 4: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## 🔐 If You Need Authentication

### Option 1: Personal Access Token (HTTPS)
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy token
5. When pushing, use token as password

### Option 2: SSH Key (Recommended)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "kanwarrobinson.salethraja@gmail.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# https://github.com/settings/keys
# Click "New SSH Key"
# Paste the key
```

---

## 📋 Quick Push Commands (Copy-Paste)

```bash
cd /home/kanwar.salethraja/appviewx/kanwar/kanwar-portfolio

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: Modern React portfolio

- Config-driven architecture with JSON
- Interactive terminal component
- Skills, Experience, Projects, Awards sections
- Responsive design with Framer Motion
- Dark theme with purple accents
- Ready for GCP Cloud Run deployment"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kanwar-portfolio.git

# Push
git branch -M main
git push -u origin main
```

---

## ✅ Verify Upload

After pushing, check:
1. Go to: `https://github.com/YOUR_USERNAME/kanwar-portfolio`
2. Verify all files are there
3. Check README displays correctly

---

## 🎉 Next Steps After Push

1. **Set up GitHub Actions** (optional - for CI/CD)
2. **Deploy to Cloud Run** (see GCP_DEPLOYMENT.md)
3. **Add custom domain**
4. **Enable branch protection**

---

## 🔧 Useful Git Commands

```bash
# Check remote
git remote -v

# Check branch
git branch

# Check last commit
git log -1

# Check what will be pushed
git diff origin/main

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Force push (use carefully!)
git push -f origin main
```

---

## 🚨 Troubleshooting

### "Remote already exists"
```bash
git remote remove origin
git remote add origin YOUR_NEW_URL
```

### "Failed to push"
```bash
# Pull first if remote has changes
git pull origin main --allow-unrelated-histories
git push origin main
```

### "Permission denied"
- Check SSH key is added to GitHub
- Or use Personal Access Token

---

**You're ready to push! 🚀**
