import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import GLightbox from 'glightbox'
import { projectsData } from '../../data/projectsData'
import './Projects.css'

// Transform projectsData for display in the grid
const projectItems = projectsData.map((project, index) => ({
  ...project,
  numericId: index + 1,
  link: `/project/${project.id}`,
  description: project.shortDescription,
  image: project.mainImage
}))

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('*')
  const [hoveredProject, setHoveredProject] = useState(null)
  const isotopeRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Initialize Isotope with scoped selector
    if (containerRef.current) {
      imagesLoaded(containerRef.current, () => {
        isotopeRef.current = new Isotope(containerRef.current, {
          itemSelector: '.project-item.isotope-item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: '.project-item'
          },
          transitionDuration: '0.6s',
          stagger: 30,
          percentPosition: true
        })
      })
    }

    // Initialize GLightbox with scoped selector
    const lightbox = GLightbox({
      selector: '#projects .glightbox',
      openEffect: 'zoom',
      closeEffect: 'fade',
      cssEfects: {
        fade: { in: 'fadeIn', out: 'fadeOut' },
        zoom: { in: 'zoomIn', out: 'zoomOut' }
      }
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

  const filters = [
    { value: '*', label: 'All Projects', icon: 'bi-grid-3x3-gap' },
    { value: 'filter-react', label: 'React', icon: 'bi-code-slash' },
    { value: 'filter-bootstrap', label: 'Bootstrap', icon: 'bi-bootstrap' },
    { value: 'filter-tailwind', label: 'Tailwind', icon: 'bi-wind' },
    { value: 'filter-templates', label: 'Templates', icon: 'bi-layout-text-window-reverse' }
  ]

  return (
    <section id="projects" className="projects section light-background">
      <div className="container projects-section-title section-title" data-aos="fade-up">
        <h2>Projects</h2>
        <p>Explore my latest work and creative projects that showcase my skills in front-end development</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          {/* Enhanced Filter Buttons */}
          <ul className="projects-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {filters.map((filter) => (
              <li 
                key={filter.value}
                className={activeFilter === filter.value ? 'filter-active' : ''} 
                onClick={() => handleFilterClick(filter.value)}
              >
                <i className={`${filter.icon} filter-icon`}></i>
                <span>{filter.label}</span>
              </li>
            ))}
          </ul>

          {/* Projects Grid */}
          <div className="row gy-4 projects-isotope-container" data-aos="fade-up" data-aos-delay="200" ref={containerRef}>
            {projectItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`col-lg-4 col-md-6 project-item isotope-item ${item.category}`}
                onMouseEnter={() => setHoveredProject(item.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`project-card ${item.featured ? 'featured' : ''} ${hoveredProject === item.id ? 'hovered' : ''}`}>
                  {item.featured && (
                    <div className="featured-badge">
                      <i className="bi bi-star-fill"></i>
                      Featured
                    </div>
                  )}
                  
                  <div className="project-image">
                    <img src={item.image} className="img-fluid" alt={item.title} loading="lazy" />
                    <div className="project-overlay">
                      <div className="overlay-content">
                        <a 
                          href={item.image} 
                          title={item.title} 
                          data-gallery="projects-gallery" 
                          className="glightbox preview-link"
                        >
                          <i className="bi bi-zoom-in"></i>
                        </a>
                        <Link to={item.link} title="View Project" className="details-link">
                          <i className="bi bi-arrow-right-circle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-info">
                    <h4>{item.title}</h4>
                    <p className="project-description">{item.description}</p>
                    
                    <div className="project-tech">
                      {item.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="project-footer">
                      <Link to={item.link} className="view-project">
                        View Project
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="projects-cta" data-aos="fade-up" data-aos-delay="300">
            <div className="cta-content">
              <h3>Have a project in mind?</h3>
              <p>Let's work together to bring your ideas to life</p>
              <a href="#contact" className="btn-cta">
                <i className="bi bi-envelope"></i>
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
