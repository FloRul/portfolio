# Florian Rumiel - AI Solutions Architect Portfolio

[![Deploy to GitHub Pages](https://github.com/FloRul/portfolio/workflows/deploy/badge.svg)](https://github.com/FloRul/portfolio/actions)

Personal portfolio website showcasing 5+ years of experience as an AI Solutions Architect specializing in enterprise-scale AI solutions, RAG systems, LLM orchestration, and cloud infrastructure automation.

🌐 **Live Site**: [florian-rumiel.com](https://florian-rumiel.com)

## ✨ Features

### Core Features
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Dark Mode Toggle** - Persistent theme selection with localStorage
- ✅ **Interactive Animations** - AOS library for scroll animations
- ✅ **Statistics Dashboard** - Key metrics and achievements
- ✅ **Working Contact Form** - Integrated with Web3Forms API
- ✅ **Animated Tech Background** - Floating technology icons

### SEO & Accessibility
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data** - JSON-LD Schema.org markup
- ✅ **Accessibility (WCAG)** - Skip navigation, ARIA labels, semantic HTML
- ✅ **Sitemap.xml** - For better search engine indexing
- ✅ **Robots.txt** - Search engine crawler guidance

### Professional Content
- ✅ **2025 AI Solutions Architect Roles** - Latest experience with Google Vertex AI and GraphRAG
- ✅ **Enhanced Skills Section** - Comprehensive AI/ML, Cloud, and Development skills
- ✅ **Professional Summary** - Enterprise-scale AI solutions focus
- ✅ **Certifications Display** - AWS and Terraform certifications

## 🛠 Technologies Used

### Frontend
- HTML5 (Semantic markup)
- CSS3 (Modern features, Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)

### Libraries & Tools
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
- [Typed.js](https://github.com/mattboldt/typed.js/) - Typing animation
- [Font Awesome 6](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Poppins & Roboto Mono

### Services
- [Web3Forms](https://web3forms.com/) - Contact form backend
- GitHub Pages - Hosting
- GitHub Actions - CI/CD

## 📋 Setup Instructions

### Prerequisites
- Git
- A text editor (VS Code recommended)
- Web3Forms account (free) for contact form

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/FloRul/portfolio.git
   cd portfolio
   ```

2. **Set up contact form**
   - Sign up at [Web3Forms](https://web3forms.com/)
   - Get your free Access Key
   - Edit `index.html` and replace `YOUR_ACCESS_KEY_HERE` with your actual key:
     ```html
     <input type="hidden" name="access_key" value="YOUR_ACTUAL_KEY_HERE">
     ```

3. **Open locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve
     ```

4. **View the site**
   - Navigate to `http://localhost:8000` (or appropriate port)

### Resume PDF Setup

The site links to `resume/resume.pdf`. To update:

1. Build your LaTeX resume:
   ```bash
   cd resume
   latexmk -pdf resume.tex
   ```

2. The PDF will be generated and automatically linked

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Crawler directives
├── README.md              # This file
├── CLAUDE.md              # Development guidelines
├── assets/
│   ├── css/
│   │   ├── main.css       # Main styles
│   │   ├── stats.css      # Statistics section
│   │   ├── dark-mode.css  # Dark theme styles
│   │   ├── animations.css # Animation styles
│   │   └── [other css files]
│   ├── js/
│   │   └── main.js        # Main JavaScript
│   └── images/
│       └── tech-icons/    # Technology SVG icons
├── resume/
│   ├── resume.tex         # LaTeX source
│   └── resume.pdf         # Generated PDF
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions deployment
```

## 🎨 Customization Guide

### Updating Content

1. **Personal Information** - Edit `index.html`:
   - Name, title, contact info in header
   - About section content
   - Experience timeline entries
   - Skills and certifications

2. **Theme Colors** - Edit `assets/css/variables.css`:
   ```css
   :root {
     --primary-color: #005AA0;  /* Change this */
     --secondary-color: #...;
   }
   ```

3. **Typed.js Strings** - Edit `assets/js/main.js`:
   ```javascript
   strings: [
     'AI Solutions Architect',
     'Your Custom Title',
     // Add more...
   ]
   ```

### Adding New Sections

1. Add HTML section in `index.html`
2. Create corresponding CSS file in `assets/css/`
3. Link CSS in `<head>` section
4. Add navigation link if needed

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push changes to `main` branch
2. GitHub Actions automatically deploys
3. Site updates in ~2 minutes

### Manual Deployment

Upload files to any static hosting:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps

## 🔧 Configuration

### Contact Form

The contact form uses Web3Forms. After setup:
- Submissions go to your email
- Optional: Configure redirect URL
- Optional: Enable spam protection

### Analytics (Optional)

Add tracking code before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Dark Mode

Dark mode preference is saved in `localStorage`. Users' choice persists across visits.

## 🐛 Known Issues

- Contact form requires Web3Forms API key setup
- Profile image placeholder (commented out in About section)
- PDF resume link requires LaTeX compilation

## 📝 Development Notes

- Follow guidelines in `CLAUDE.md`
- Use semantic HTML
- Maintain accessibility standards
- Test on multiple devices
- Keep dependencies minimal

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

All rights reserved © 2025 Florian Rumiel

---

**Built with ❤️ by Florian Rumiel** | [LinkedIn](https://linkedin.com/in/florian-rumiel) | [GitHub](https://github.com/FloRul)