import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollTop from './components/ScrollTop/ScrollTop'
import Preloader from './components/Preloader/Preloader'

// Lazy load sections for better performance
const Hero = lazy(() => import('./components/Hero/Hero'))
const About = lazy(() => import('./components/About/About'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Resume = lazy(() => import('./components/Resume/Resume'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Services = lazy(() => import('./components/Services/Services'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const ProjectDetails = lazy(() => import('./components/ProjectDetails/ProjectDetails'))

function App() {
  useEffect(() => {
    // Initialize AOS with enhanced settings
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 100
    })

    // Header toggle functionality
    const headerToggle = document.querySelector('.header-toggle')
    const header = document.querySelector('#header')

    const handleHeaderToggle = () => {
      header?.classList.toggle('header-show')
      headerToggle?.classList.toggle('bi-list')
      headerToggle?.classList.toggle('bi-x')
    }

    if (headerToggle) {
      headerToggle.addEventListener('click', handleHeaderToggle)
    }

    // Hide mobile nav on same-page/hash links
    const navmenuLinks = document.querySelectorAll('#navmenu a')
    
    const handleNavClick = () => {
      if (header?.classList.contains('header-show')) {
        header.classList.remove('header-show')
        headerToggle?.classList.toggle('bi-list')
        headerToggle?.classList.toggle('bi-x')
      }
    }

    navmenuLinks.forEach(link => {
      link.addEventListener('click', handleNavClick)
    })

    // Scroll top button
    const scrollTop = document.querySelector('.scroll-top')
    
    const toggleScrollTop = () => {
      if (scrollTop) {
        window.scrollY > 100 
          ? scrollTop.classList.add('active')
          : scrollTop.classList.remove('active')
      }
    }

    window.addEventListener('scroll', toggleScrollTop)
    toggleScrollTop()

    // Navmenu active state on scroll
    const navmenuScrollspy = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollY = window.pageYOffset

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 50
        const sectionId = section.getAttribute('id')
        const navLink = document.querySelector(`#navmenu a[href="#${sectionId}"]`)

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink?.classList.add('active')
        } else {
          navLink?.classList.remove('active')
        }
      })
    }

    window.addEventListener('load', navmenuScrollspy)
    window.addEventListener('scroll', navmenuScrollspy)

    // Cleanup
    return () => {
      if (headerToggle) {
        headerToggle.removeEventListener('click', handleHeaderToggle)
      }
      navmenuLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick)
      })
      window.removeEventListener('scroll', toggleScrollTop)
      window.removeEventListener('scroll', navmenuScrollspy)
    }
  }, [])

  // HomePage component with all sections
  const HomePage = () => (
    <>
      <Hero/>
      <About/>
      <Skills/>
      <Resume/>
      <Projects/>
      <Services/>
      <Contact/>
      <Footer/>
    </>
  )

  return (
    <Router>
      <div className="App">
        <Preloader/>
        <Header/>
        
        <main className="main">
          <Suspense fallback={<div className="loading-section">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
          </Suspense>
        </main>

        <ScrollTop/>
      </div>
    </Router>
  )
}

export default App
