import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    
    // Close mobile menu after clicking
    setMobileMenuOpen(false)
    document.body.classList.remove('mobile-nav-active')
    
    if (isHomePage) {
      // If already on home page, just scroll to section
      const section = document.getElementById(sectionId.replace('#', ''))
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on another page, navigate to home then scroll
      navigate('/')
      setTimeout(() => {
        const section = document.getElementById(sectionId.replace('#', ''))
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.classList.toggle('mobile-nav-active')
  }
  
  // Update active nav item based on current section
  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const sections = ['hero', 'about', 'resume', 'projects', 'services', 'contact']
        const scrollPosition = window.scrollY + 200
        
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId)
          if (section) {
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              // Remove active class from all nav items
              document.querySelectorAll('.navmenu a').forEach(link => {
                link.classList.remove('active')
              })
              // Add active class to current section's nav item
              const activeLink = document.querySelector(`.navmenu a[href="#${sectionId}"]`)
              if (activeLink) {
                activeLink.classList.add('active')
              }
            }
          }
        })
      }
      
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Call once to set initial state
      
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage, location])
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const header = document.getElementById('header')
      const toggle = document.querySelector('.header-toggle')
      
      if (mobileMenuOpen && header && !header.contains(event.target) && !toggle.contains(event.target)) {
        setMobileMenuOpen(false)
        document.body.classList.remove('mobile-nav-active')
      }
    }
    
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])
  
  return (
    <>
      {/* Mobile Toggle Button - Outside Header */}
      <i 
        className={`header-toggle bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}
        onClick={toggleMobileMenu}
      ></i>
      
      <header id="header" className={`header dark-background d-flex flex-column ${mobileMenuOpen ? 'mobile-nav-active' : ''}`}>
        <div className="profile-img">
        <img src="/assets/img/my-profile-img.jpg" alt="Mohammad Ali" className="img-fluid rounded-circle" />
      </div>

      <a href="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Mohammad Ali</h1>
      </a>

      <div className="social-links text-center">
        <a href="https://www.facebook.com/share/15UwcdrhMi/" className="facebook" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/mohammad.ali104?igsh=dm11bzFvdHVncXVj" className="instagram" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/mohammad-ali-4a692931a" className="linkedin" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <a 
              href="#hero" 
              className={!isHomePage ? '' : 'active'}
              onClick={(e) => handleNavClick(e, '#hero')}
            >
              <i className="bi bi-house navicon"></i>Home
            </a>
          </li>
          <li>
            <a 
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
            >
              <i className="bi bi-person navicon"></i> About
            </a>
          </li>
          <li>
            <a 
              href="#resume"
              onClick={(e) => handleNavClick(e, '#resume')}
            >
              <i className="bi bi-file-earmark-text navicon"></i> Resume
            </a>
          </li>
          <li>
            <a 
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
            >
              <i className="bi bi-folder2-open navicon"></i> Projects
            </a>
          </li>
          <li>
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
            >
              <i className="bi bi-hdd-stack navicon"></i> Services
            </a>
          </li>
          <li>
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <i className="bi bi-envelope navicon"></i> Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

export default Header
