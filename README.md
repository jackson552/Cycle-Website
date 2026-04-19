# Cycle — Landing Page

Premium 28-day women's wellness beverage brand. Static site for GitHub Pages.

---

## File Structure

```
/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # Animations, nav, form logic
├── assets/             # Drop your brand assets here
│   ├── logo.png             ← Cycle wordmark / logo
│   ├── hero-product.png     ← Hero section product image (packets + box)
│   ├── packets.png          ← All 4 stick packs laid out
│   ├── package-box.png      ← Retail box / packaging
│   └── lifestyle.png        ← Lifestyle / brand photography
└── README.md
```

All placeholder content shows automatically when an asset file is missing, and is replaced the moment you drop in a real image — no code changes needed.

---

## Adding Your Assets

1. Export your images and name them exactly as listed above
2. Place them in the `/assets/` folder
3. Recommended sizes:
   - `logo.png` — transparent background, at least 300px wide
   - `hero-product.png` — at least 1000×1000px, square or portrait
   - `packets.png` — all four phases, clean background or transparent, 1200×900px+
   - `package-box.png` — portrait orientation, 800×1000px+
   - `lifestyle.png` — landscape or portrait, 1600×1200px+ for crispness

---

## Waitlist / Form Setup

The form is Formspree-ready. To activate it:

1. Create a free account at [formspree.io](https://formspree.io)
2. Click **New Form**, give it a name
3. Copy the form ID (the part after `/f/` in the endpoint URL)
4. Open `index.html` and find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual ID

Until you do this, the form runs in **demo mode** — it shows a success message locally so the UI looks correct.

Alternatively, swap the `action` URL for any other form backend (ConvertKit, Mailchimp embed, etc.).

---

## Run Locally

No build step required. Open `index.html` directly in a browser, or use any static server:

```bash
# Python
python -m http.server 3000

# Node (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

---

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch and `/ (root)`
4. Click **Save**
5. Your site will be live at `https://yourusername.github.io/repo-name`

For a custom domain (e.g. `drinkcycle.com`), add a `CNAME` file to the root:

```
drinkcycle.com
```

Then configure your DNS per GitHub's instructions.

---

## Customization

All brand colors and spacing are in CSS custom properties at the top of `css/styles.css` — easy to adjust without touching layout code:

```css
:root {
  --gold:       #C9A96E;   /* primary accent */
  --dark:       #1C1810;   /* nav, footer, Why section background */
  --creme:      #FAF7F2;   /* main background */
  --reset-fg:   #7A9AB5;   /* phase accent colors */
  /* ... */
}
```
