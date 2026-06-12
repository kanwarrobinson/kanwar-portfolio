# Debugging Blank Screen Issue

## Steps to Debug:

### 1. Open Browser Console
- Press **F12** 
- Click **Console** tab
- Look for RED error messages

### 2. Common Issues & Solutions:

**Issue: JavaScript errors**
- Check console for errors
- Look for "Cannot find module" or "undefined"

**Issue: Port conflict**
- Server is on http://localhost:3000
- Try http://127.0.0.1:3000 instead

**Issue: Browser cache**
- Hard refresh: Ctrl+Shift+R (Windows/Linux)
- Or: Cmd+Shift+R (Mac)
- Or: Clear cache and reload

**Issue: Browser compatibility**
- Try Chrome or Firefox
- Make sure JavaScript is enabled

### 3. Test with Simple App

I've created a test version. After refreshing, you should see:
"🎉 Portfolio Test" in white text on dark background

If you see this = React works, we can restore full portfolio
If still blank = We need to check console errors

### 4. What to Share:

Please copy-paste:
1. Browser name and version
2. Any RED console errors
3. What you see (blank white? blank black? loading spinner?)

### 5. Quick Fixes to Try:

```bash
# Clear everything and restart
cd /home/kanwar.salethraja/appviewx/kanwar/kanwar-portfolio

# Kill server
pkill -f vite

# Restart
npm run dev
```

Then open: http://localhost:3000

### 6. Alternative: Try different browser

If using Chrome, try Firefox
If using Firefox, try Chrome

### 7. Check if port is accessible:

```bash
curl http://localhost:3000
```

Should return HTML, not error.
