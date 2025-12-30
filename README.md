# Noble Living - Purpose Discovery Platform

A beautiful, modern web platform helping people discover and live their purpose.

## Features

✅ Free 5-minute purpose assessment
✅ Personalized purpose profiles
✅ Resource library with free worksheets
✅ Email capture for lead generation
✅ Mobile-responsive design
✅ Beautiful gradient UI with Tailwind CSS

## Tech Stack

- React 18
- Vite (super fast build tool)
- Tailwind CSS
- Lucide React Icons

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel (FREE)

### Option 1: Deploy with GitHub (Recommended)

1. Create a GitHub account if you don't have one
2. Create a new repository on GitHub
3. Push this code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
4. Go to vercel.com and sign in with GitHub
5. Click "New Project"
6. Import your GitHub repository
7. Vercel will auto-detect it's a Vite app
8. Click "Deploy"
9. Done! Your site is live in 2 minutes

### Option 2: Deploy without GitHub

1. Go to vercel.com and create an account
2. Install Vercel CLI: `npm install -g vercel`
3. In this folder, run: `vercel`
4. Follow the prompts
5. Run: `vercel --prod` to deploy to production
6. Done!

## Connect Your Domain (joinnobleliving.com)

After deploying to Vercel:

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Type: `joinnobleliving.com`
5. Vercel will show you DNS records to add
6. You already added these to Namecheap! Just wait 5-60 minutes for DNS to propagate
7. Your site will be live at joinnobleliving.com

## Project Structure

```
noble-living/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Features Breakdown

### 1. Landing Page
- Hero section with call-to-action
- Features showcase
- Social proof (stats)
- Free resources section
- Email capture form

### 2. Purpose Assessment
- 5 carefully crafted questions
- Progress indicator
- Beautiful UI with animations
- Instant results

### 3. Results Page
- 4 unique purpose profiles:
  - The Servant Leader
  - The Creator
  - The Teacher
  - The Visionary
- Personalized strengths
- Actionable next steps
- Email capture for worksheet

### 4. Responsive Design
- Mobile-first approach
- Works on all devices
- Beautiful gradients
- Smooth animations

## Next Steps After Launch

1. **Add Analytics**
   - Google Analytics
   - Vercel Analytics (built-in)

2. **Connect Email Service**
   - SendGrid for automated emails
   - Mailchimp for newsletters

3. **Add Payment Processing**
   - Stripe for courses/coaching
   - Gumroad for digital products

4. **Build Backend** (Optional)
   - Supabase for database
   - Save assessment results
   - User accounts

## Support

Questions? Issues?
- Email: support@nobleliving.com (update this!)
- Or create an issue on GitHub

## License

© 2024 Noble Living. All rights reserved.
