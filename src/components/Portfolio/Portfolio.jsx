import { useEffect, useState, useRef } from 'react'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import GLightbox from 'glightbox'
import './Portfolio.css'

const portfolioItems = [
  {
    id: 1,
    title: 'Template 1',
    description: 'Hotel website template',
    image: '/assets/img/portfolio/Hotel-Template.png',
    category: 'filter-templates',
    link: '/hotel-details.html'
  },
  {
    id: 2,
    title: 'Template 2',
    description: 'Alstar Studios template',
    image: '/assets/img/portfolio/ALSTAR.png',
    category: 'filter-templates',
    link: '/alstar-details.html'
  },
  {
    id: 3,
    title: 'Bootstrap Template 1',
    description: 'PhotoFolio Template with Bootstrap',
    image: '/assets/img/portfolio/PhotoFolio-with-Bootstrap-Template.png',
    category: 'filter-bootstrap filter-templates',
    link: '/photofolio-details.html'
  },
  {
    id: 4,
    title: 'Bootstrap Website 1',
    description: 'Countdown using Bootstrap and jQuery',
    image: '/assets/img/portfolio/Countdown.png',
    category: 'filter-bootstrap',
    link: '/countdown-details.html'
  },
  {
    id: 5,
    title: 'Bootstrap Website 2',
    description: 'Countries and their Flags',
    image: '/assets/img/portfolio/Countries-Flags-with-FlagsAPI.png',
    category: 'filter-bootstrap',
    link: '/countries-details.html'
  }
]

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('*')
  const isotopeRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Initialize Isotope
    if (containerRef.current) {
      imagesLoaded(containerRef.current, () => {
        isotopeRef.current = new Isotope(containerRef.current, {
          itemSelector: '.portfolio-item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: '.portfolio-item'
          }
        })
      })
    }

    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox'
    })

    return () => {
      if (isotopeRef.current) {
        isotopeRef.current.destroy()
      }
      lightbox.destroy()
    }
  }, [])

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    if (isotopeRef.current) {
      isotopeRef.current.arrange({
        filter: filter === '*' ? '*' : `.${filter}`
      })
    }
  }

  return (
    <section id="portfolio" className="portfolio section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>These are the projects I have worked on during my journey to becoming a front-end developer:</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li 
              className={activeFilter === '*' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('*')}
            >
              All Websites
            </li>
            <li 
              className={activeFilter === 'filter-bootstrap' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('filter-bootstrap')}
            >
              Bootstrap
            </li>
            <li 
              className={activeFilter === 'filter-templates' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('filter-templates')}
            >
              Templates
            </li>
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200" ref={containerRef}>
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${item.category}`}
              >
                <div className="portfolio-content h-100">
                  <img src={item.image} className="img-fluid" alt={item.title} loading="lazy" />
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <a 
                      href={item.image} 
                      title={item.title} 
                      data-gallery="portfolio-gallery" 
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href={item.link} title="More Details" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
