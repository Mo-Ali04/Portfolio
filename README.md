# Portfolio React - Modern Portfolio Website 

A modern, responsive portfolio website built with React and Vite, featuring **enhanced animations**, professional hover effects, and optimized performance.

## Features

- **React + Vite**: Fast development and optimized production builds
- **Lazy Loading**: Components are lazy-loaded for better performance
- **Smooth Animations**: AOS (Animate On Scroll) library for beautiful scroll animations
- **Responsive Design**: Fully responsive layout using Bootstrap 5
- **Image Gallery**: GLightbox for beautiful image previews
- **Filterable Portfolio**: Isotope layout for portfolio filtering
- **Typed.js Animation**: Dynamic text typing effect in the hero section
- **Contact Form**: EmailJS integration for contact form functionality
- **Code Splitting**: Optimized bundle sizes with Vite's code splitting

## Prerequisites
## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd portfolio-react
```

2. Install dependencies:
```bash
npm install
```

3. Copy assets from the original portfolio:
```bash
# Copy the entire assets folder from the parent directory
cp -r ../assets ./public/
```

4. Configure EmailJS (for contact form):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Get your Public Key, Service ID, and Template ID
   - Update the credentials in `src/components/Contact/Contact.jsx`

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-react/
├── public/
│   └── assets/          # Static assets (copied from original)
├── src/
│   ├── components/      # React components
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Resume/
│   │   ├── Portfolio/
│   │   ├── Services/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Preloader/
│   │   └── ScrollTop/
│   ├── App.jsx         # Main app component
│   ├── App.css         # Main styles
│   ├── index.css       # Global styles
│   ├── enhancements.css # ✨ NEW: Enhanced animations & effects
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
├── ENHANCEMENTS.md     # ✨ NEW: Complete enhancement documentation
└── UPGRADE_NOTES.md    # ✨ NEW: Quick upgrade reference
```

## 🚀 Technologies Used

### Core Framework
- **React 18.3.1** - Latest UI library
- **Vite 7.1.12** - Lightning-fast build tool
- **Bootstrap 5.3.3** - Latest CSS framework 
- **Bootstrap Icons 1.11.3** - Latest icon library 

### Animation & Effects
- **AOS 2.3.4** - Animate On Scroll with enhanced config
- **Custom CSS Animations** - Professional hover effects 
- **Typed.js** - Typing animation
- **GPU-Accelerated Transforms** - Smooth 60fps animations 

### Interactive Features
- **Isotope Layout** - Filtering and sorting
- **GLightbox 3.3.0** - Latest lightbox gallery 
- **Swiper 11.1.14** - Latest touch slider 
- **EmailJS** - Contact form integration
- **ImagesLoaded** - Image loading utility

### Performance & Optimization
- **Code Splitting** - Lazy loading components
- **Tree Shaking** - Minimal bundle size
- **Efficient CSS** - GPU-accelerated animations
- **Responsive Design** - Mobile-first approach

## 🔧 Configuration

### Vite Configuration
The project uses code splitting to optimize bundle sizes:
- `vendor`: React and React DOM
- `animations`: AOS and Typed.js
- `ui`: Bootstrap, GLightbox, and Swiper

### EmailJS Setup
To enable the contact form:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Update the following in `src/components/Contact/Contact.jsx`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: 992px - 1199px
- Large Desktop: ≥ 1200px

## 🚀 Performance Optimizations

- Lazy loading of route components
- Image lazy loading with native `loading="lazy"`
- Code splitting for vendor libraries
- Optimized animations with AOS
- Efficient re-renders with React hooks

## 📄 License

This project is based on a template from [BootstrapMade](https://bootstrapmade.com/) and distributed by [ThemeWagon](https://themewagon.com).

## 👤 Contact

Mohammad Ali Awad
- Email: mohammad.awad106@gmail.com
- Phone: +20 11 48559965
- Location: Cairo, Egypt

---

Built with ❤️ using React and Vite
