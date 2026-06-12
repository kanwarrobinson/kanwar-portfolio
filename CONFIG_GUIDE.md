# Portfolio Configuration Guide

Your portfolio is now **config-driven**! All your personal information, content, and data is stored in a single JSON file.

## 📁 Location

**Main Config File:** `src/config.json`

## 🎯 How It Works

All components now fetch data from `config.json` instead of hardcoded values. To update your portfolio:

1. Open `src/config.json`
2. Edit the values
3. Save the file
4. Refresh browser - changes appear instantly!

## 📝 Configuration Sections

### 1. Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Job Title",
  "email": "your@email.com",
  "phone": "+1234567890",
  "location": "City, Country",
  "tagline": "Your tagline...",
  "bio": ["Paragraph 1", "Paragraph 2"],
  "social": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  }
}
```

### 2. Terminal Box
```json
"terminal": {
  "filename": "developer.js",
  "lines": [
    { "text": "// Comment", "type": "comment" },
    { "text": "const x = {", "type": "keyword" },
    { "text": "  name: 'Value',", "type": "property" }
  ]
}
```

**Line types:** `comment`, `keyword`, `property`

### 3. About Stats
```json
"stats": [
  { "number": "3+", "label": "Years Experience" },
  { "number": "50+", "label": "Projects" }
]
```

### 4. Skills
```json
"skills": [
  {
    "category": "CATEGORY NAME",
    "items": [
      { "name": "Skill Name", "color": "#hexcolor" }
    ]
  }
]
```

### 5. Experience
```json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "logo": "🔷",
    "location": "City, Country",
    "period": "Jan 2020 - Present",
    "type": "Full-time",
    "achievements": ["Achievement 1", "Achievement 2"],
    "tags": ["Skill1", "Skill2"]
  }
]
```

### 6. Projects
```json
"projects": [
  {
    "title": "Project Name",
    "description": "Description...",
    "tags": ["Tech1", "Tech2"],
    "featured": true,
    "impact": "Impact metric"
  }
]
```

### 7. Awards
```json
"awards": [
  {
    "title": "Award Name",
    "company": "Company",
    "date": "Month Year",
    "description": "What you did..."
  }
]
```

## 🎨 Customization Examples

### Change Your Name
```json
"personal": {
  "name": "John Doe"
}
```

### Update Terminal Content
```json
"terminal": {
  "lines": [
    { "text": "// Your custom comment", "type": "comment" },
    { "text": "const me = {", "type": "keyword" },
    { "text": "  role: 'Developer',", "type": "property" },
    { "text": "};", "type": "keyword" }
  ]
}
```

### Add New Skill Category
```json
{
  "category": "DATABASES",
  "items": [
    { "name": "MySQL", "color": "#4479a1" },
    { "name": "PostgreSQL", "color": "#336791" }
  ]
}
```

### Add New Job
```json
{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "logo": "💼",
  "location": "Remote",
  "period": "2024 - Present",
  "type": "Full-time",
  "achievements": [
    "Built amazing things",
    "Improved performance by 50%"
  ],
  "tags": ["React", "Node.js"]
}
```

## 🚀 Quick Updates

### Update Bio
Edit `personal.bio` array - each string is a paragraph

### Change Email
Edit `personal.email`

### Add Social Link
Add to `personal.social`:
```json
"twitter": "https://twitter.com/username"
```

### Change Terminal Colors
Colors are defined in CSS:
- **comment**: Green (#6a9955)
- **keyword**: Purple (#c586c0)
- **property keys**: Cyan (#4ec9b0)
- **property values**: Yellow (#ce9178)

## 📋 Tips

1. **JSON Format**: Keep valid JSON syntax (commas, quotes)
2. **Colors**: Use hex codes (#RRGGBB) for skill colors
3. **Arrays**: Use `["item1", "item2"]` for lists
4. **Emojis**: Work in logos and text ✅
5. **Line Breaks**: Use `\n` in strings for new lines

## ✅ What's Config-Driven

✅ Personal info (name, title, email, etc.)
✅ Terminal content and filename
✅ About section stats
✅ All skills with colors
✅ Work experience
✅ Education
✅ Projects
✅ Awards
✅ Social links

## 🔧 Advanced

To add new fields:
1. Add to `config.json`
2. Import in component: `import { config } from '../utils/config'`
3. Use: `config.yourNewField`

---

**Everything is now in one place - just edit `src/config.json`!** 🎉
