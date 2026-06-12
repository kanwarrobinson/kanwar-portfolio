# 🚀 Deploy Portfolio to Cloud Run via UI (India Region)

## ✅ Prerequisites

Your repository is ready with all deployment files:
- ✅ Dockerfile
- ✅ nginx.conf
- ✅ cloudbuild.yaml
- ✅ All source code

**GitHub Repo:** https://github.com/kanwarrobinson/kanwar-portfolio

---

## 📋 Step-by-Step Deployment via Cloud Run UI

### Step 1: Open Cloud Run Console

1. Go to: **https://console.cloud.google.com/run**
2. Make sure you're in the correct project: **agent-platform-498109**
3. Click **"CREATE SERVICE"** button at the top

---

### Step 2: Select Deployment Source

1. On the "Deploy to Cloud Run" page, select:
   - ☑️ **"Continuously deploy from a repository (source or function)"**
2. Click **"SET UP WITH CLOUD BUILD"**

---

### Step 3: Connect GitHub Repository

1. Click **"MANAGE CONNECTED REPOSITORIES"**
2. Click **"CONNECT REPOSITORY"**
3. Select **"GitHub"** as the source
4. Click **"Authenticate"** and sign in to GitHub if prompted
5. Select your repository:
   - Repository: **kanwarrobinson/kanwar-portfolio**
   - Branch: **^main$** (or select "main" from dropdown)
6. Click **"NEXT"**

---

### Step 4: Configure Build

1. **Build type**: Select **"Dockerfile"**
2. **Source location**: `/Dockerfile` (should be auto-detected)
3. Click **"SAVE"**

---

### Step 5: Configure Service Settings

#### Basic Settings:
- **Service name**: `kanwar-portfolio`
- **Region**: **`asia-south1 (Mumbai)`** ⭐ (India region)

#### Authentication:
- ☑️ **"Allow unauthenticated invocations"** (to make it public)

#### Container Settings (click "CONTAINER, VARIABLES & SECRETS, CONNECTIONS"):

**Container tab:**
- **Container port**: `8080`
- **Memory**: `512 MiB` (or higher if needed)
- **CPU**: `1`

**Resources tab:**
- **Request timeout**: `300` seconds
- **Maximum requests per container**: `80`

**Autoscaling:**
- **Minimum instances**: `0` (scales to zero when not in use)
- **Maximum instances**: `10`

**Capacity:**
- **CPU allocation**: "CPU is allocated only during request processing"

---

### Step 6: Deploy

1. Review all settings
2. Click **"CREATE"** button at the bottom
3. Wait for deployment (5-10 minutes)

You'll see:
- ⏳ Building container image
- ⏳ Pushing to Container Registry
- ⏳ Deploying to Cloud Run
- ✅ Service deployed successfully

---

### Step 7: Get Your Live URL

Once deployment completes:
1. You'll see a **green checkmark** ✅
2. Your service URL will be displayed at the top:
   - Format: `https://kanwar-portfolio-xxxxx-el.a.run.app`
3. **Click the URL** to view your live portfolio!

---

## 🔧 Post-Deployment Configuration

### Enable Continuous Deployment (Auto-deploy on Git Push)

The setup you just did creates a **Cloud Build Trigger** that will:
- ✅ Automatically rebuild on every push to `main` branch
- ✅ Deploy updated version to Cloud Run
- ✅ No manual steps needed!

**How it works:**
```
Git Push → GitHub → Cloud Build Trigger → Build Docker Image → Deploy to Cloud Run
```

---

## 📊 Monitor Your Deployment

### View Logs:
1. Go to your service in Cloud Run console
2. Click **"LOGS"** tab
3. See real-time application logs

### View Metrics:
1. Click **"METRICS"** tab
2. See:
   - Request count
   - Request latency
   - Container instances
   - Memory/CPU usage

### View Revisions:
1. Click **"REVISIONS"** tab
2. See all deployed versions
3. Roll back if needed

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain:

1. In Cloud Run console, select your service
2. Click **"MANAGE CUSTOM DOMAINS"**
3. Click **"ADD MAPPING"**
4. Select your service
5. Enter your domain (e.g., `portfolio.kanwar.dev`)
6. Follow DNS verification steps
7. Add DNS records to your domain provider:

```
Type: A
Name: @ (or subdomain)
Value: [IP provided by Cloud Run]

Type: AAAA
Name: @ (or subdomain)
Value: [IPv6 provided by Cloud Run]
```

---

## 🔐 Security Best Practices

### Already Configured:
- ✅ HTTPS enabled automatically (free SSL)
- ✅ Scales to zero (no cost when idle)
- ✅ Automatic load balancing
- ✅ Global CDN

### Optional Enhancements:
- Add Cloud Armor for DDoS protection
- Enable Cloud CDN for faster loading
- Set up monitoring alerts
- Configure Cloud Scheduler to keep warm

---

## 💰 Cost Estimate

**Cloud Run Pricing (Free Tier):**
- 2M requests/month - FREE
- 360,000 GB-seconds memory - FREE
- 180,000 vCPU-seconds - FREE

**For your portfolio:**
- Expected cost: **$0 - $2/month** (likely FREE!)
- Only pay when someone visits
- Scales to zero = no idle cost

---

## 🐛 Troubleshooting

### Build Fails:

1. Go to **Cloud Build** → **History**
2. Click on the failed build
3. Check logs for errors
4. Common issues:
   - Node version mismatch
   - Missing dependencies
   - Port configuration

### Service Not Accessible:

```bash
# Check if service is public
gcloud run services get-iam-policy kanwar-portfolio \
  --region asia-south1 \
  --project agent-platform-498109

# Make it public
gcloud run services add-iam-policy-binding kanwar-portfolio \
  --region asia-south1 \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --project agent-platform-498109
```

### Deploy Takes Too Long:

- First deploy takes 5-10 minutes (normal)
- Subsequent deploys: 2-3 minutes
- Check Cloud Build logs for progress

---

## 📱 Test Your Portfolio

After deployment, test:
- ✅ Homepage loads
- ✅ Terminal animation works
- ✅ Skills section displays correctly
- ✅ Experience cards render
- ✅ Projects show up
- ✅ Contact form works
- ✅ Responsive on mobile
- ✅ Theme toggle works

---

## 🎯 Update Your Portfolio

To update your portfolio:

1. Make changes to `src/config.json` (or any files)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. **Cloud Build automatically deploys!**
4. Wait 2-3 minutes
5. Refresh your portfolio URL

---

## ✅ Success Checklist

After deployment, you should have:

- ✅ Live portfolio URL
- ✅ HTTPS enabled
- ✅ Loads in < 2 seconds
- ✅ Auto-deploys on git push
- ✅ Works on mobile
- ✅ All sections visible
- ✅ Terminal displays correctly

---

## 🎉 You're Live!

**Your Portfolio URL:**
`https://kanwar-portfolio-xxxxx-el.a.run.app`

**Region:** Mumbai (asia-south1)

**Share it:**
- LinkedIn: Add to your profile
- GitHub: Add to repository description
- Resume: Add portfolio link
- Email signature

---

## 📞 Support Resources

- **Cloud Run Docs**: https://cloud.google.com/run/docs
- **Troubleshooting**: https://cloud.google.com/run/docs/troubleshooting
- **Pricing**: https://cloud.google.com/run/pricing
- **Community**: https://cloud.google.com/community

---

**Congratulations! Your portfolio is now live on Google Cloud Run!** 🎊
