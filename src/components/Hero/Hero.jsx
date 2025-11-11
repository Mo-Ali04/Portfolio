import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import './Hero.css'

const Hero = () => {
  const typedRef = useRef(null)

  useEffect(() => {
    const options = {
      strings: ['Web Developer', 'Front-end Developer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    }

    const typed = new Typed(typedRef.current, options)

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section 
      id="hero" 
      className="position-relative d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: 'url(/assets/img/hero-bg.jpg)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for text readability */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, rgba(4, 11, 20, 0.7) 0%, rgba(4, 11, 20, 0.6) 100%)',
          zIndex: 1
        }}
      />
      
      {/* Content */}
      <div className="container position-relative" style={{ zIndex: 2 }} data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-white display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Mohammad Ali Awad
        </h2>
        <p className="text-white fs-4">
          I'm a <span ref={typedRef} style={{ color: '#149ddd', fontWeight: 600 }}></span>
        </p>
      </div>
    </section>
  )
}

export default Hero
