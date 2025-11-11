import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { projectsData } from '../../data/projectsData'
import './ProjectDetails.css'
import AOS from 'aos'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/thumbs'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  
  // Refs for Swiper instances
  const mainSwiperRef = useRef(null)
  const thumbsSwiperRef = useRef(null)
  const mainSwiperInstanceRef = useRef(null)
  const thumbsSwiperInstanceRef = useRef(null)

  useEffect(() => {
    // Find the project by id
    const foundProject = projectsData.find(p => p.id === id)
    
    if (foundProject) {
      setProject(foundProject)
      setLoading(false)
    } else {
      // Redirect to projects page if project not found
      navigate('/projects')
    }
  }, [id, navigate])

  useEffect(() => {
    if (project && project.images && project.images.length > 0) {
      // Initialize AOS
      AOS.refresh()
      
      // Scroll to top
      window.scrollTo(0, 0)
      
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Initialize thumbnail swiper if there are multiple images
        if (project.images.length > 1 && thumbsSwiperRef.current) {
          try {
            thumbsSwiperInstanceRef.current = new Swiper(thumbsSwiperRef.current, {
              modules: [Navigation],
              spaceBetween: 10,
              slidesPerView: 4,
              freeMode: true,
              watchSlidesProgress: true,
              breakpoints: {
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }
            })
          } catch (error) {
            console.error('Error initializing thumbs swiper:', error)
          }
        }
        
        // Initialize main swiper
        if (mainSwiperRef.current) {
          try {
            const swiperConfig = {
              modules: project.images.length > 1 
                ? [Navigation, Pagination, Autoplay, EffectFade, Thumbs]
                : [EffectFade],
              loop: project.images.length > 1,
              speed: 1000,
              effect: 'fade',
              fadeEffect: {
                crossFade: true
              },
              slidesPerView: 1
            }
            
            if (project.images.length > 1) {
              swiperConfig.autoplay = {
                delay: 5000,
                disableOnInteraction: false
              }
              swiperConfig.pagination = {
                el: '.swiper-pagination',
                type: 'progressbar',
              }
              swiperConfig.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
              if (thumbsSwiperInstanceRef.current) {
                swiperConfig.thumbs = {
                  swiper: thumbsSwiperInstanceRef.current
                }
              }
            }
            
            mainSwiperInstanceRef.current = new Swiper(mainSwiperRef.current, swiperConfig)
          } catch (error) {
            console.error('Error initializing main swiper:', error)
          }
        }
      }, 100)
      
      return () => {
        clearTimeout(timer)
        // Cleanup swiper instances
        if (mainSwiperInstanceRef.current && typeof mainSwiperInstanceRef.current.destroy === 'function') {
          mainSwiperInstanceRef.current.destroy()
        }
        if (thumbsSwiperInstanceRef.current && typeof thumbsSwiperInstanceRef.current.destroy === 'function') {
          thumbsSwiperInstanceRef.current.destroy()
        }
      }
    }
  }, [project])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="modern-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  // Get related projects (prioritize same category, but show others if needed)
  const sameCategory = projectsData.filter(p => p.category === project.category && p.id !== project.id)
  const otherProjects = projectsData.filter(p => p.category !== project.category && p.id !== project.id)
  const relatedProjects = [...sameCategory, ...otherProjects].slice(0, 3)

  return (
    <>
      {/* Modern Hero Section with Parallax */}
      <div className="project-hero">
        <div className="hero-background" style={{
          backgroundImage: project.images && project.images[0] ? `url(${project.images[0]})` : 'none'
        }}></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-8">
              <div className="hero-text" data-aos="fade-up">
                <nav className="modern-breadcrumbs" data-aos="fade-down">
                  <Link to="/" className="breadcrumb-item">
                    <i className="bi bi-house"></i> Home
                  </Link>
                  <span className="separator">/</span>
                  <a href="/#projects" className="breadcrumb-item" onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                    setTimeout(() => {
                      const projectsSection = document.getElementById('projects')
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 100)
                  }}>
                    <i className="bi bi-folder"></i> Projects
                  </a>
                  <span className="separator">/</span>
                  <span className="current">{project.title}</span>
                </nav>
                <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
                  {project.title}
                </h1>
                <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                  {project.description}
                </p>
                <div className="hero-badges" data-aos="fade-up" data-aos-delay="300">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="hero-tech-badge">
                      <i className="bi bi-check-circle"></i> {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-stats" data-aos="zoom-in" data-aos-delay="400">
                <div className="stat-card">
                  <i className="bi bi-calendar-event"></i>
                  <div className="stat-info">
                    <span className="stat-label">Project Date</span>
                    <span className="stat-value">{project.projectDate}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <i className="bi bi-layers"></i>
                  <div className="stat-info">
                    <span className="stat-label">Category</span>
                    <span className="stat-value">
                      {project.category.split(' ').map(cat => 
                        cat.replace('filter-', '').replace(/-/g, ' ')
                      ).filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Section */}
      <section id="portfolio-details" className="portfolio-details section">
        <div className="container">
          {/* Quick Actions Bar */}
          <div className="quick-actions" data-aos="fade-up">
            <div className="actions-wrapper">
              {project.projectUrl && (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-btn primary"
                >
                  <i className="bi bi-globe2"></i>
                  <span>Live Demo</span>
                  <i className="bi bi-arrow-up-right"></i>
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-btn secondary"
                >
                  <i className="bi bi-github"></i>
                  <span>View Code</span>
                </a>
              )}
              <a 
                href="/#projects" 
                className="action-btn outline"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/')
                  setTimeout(() => {
                    const projectsSection = document.getElementById('projects')
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
              >
                <i className="bi bi-arrow-left"></i>
                <span>All Projects</span>
              </a>
            </div>
          </div>

          <div className="row gy-5">
            
            <div className="col-lg-8">
              {/* Modern Gallery Section */}
              <div className="modern-gallery" data-aos="fade-up">
                <div className="gallery-container">
                  {project.images && project.images.length > 0 && (
                    <>
                      {/* Main Image Slider */}
                      <div ref={mainSwiperRef} className="portfolio-details-slider swiper">
                        <div className="swiper-wrapper">
                          {project.images.map((image, index) => (
                            <div key={index} className="swiper-slide">
                              <div className="image-wrapper">
                                <img 
                                  src={image} 
                                  alt={`${project.title} - ${index + 1}`}
                                  onLoad={() => setImageLoading(false)}
                                />
                                {imageLoading && index === 0 && (
                                  <div className="image-loader">
                                    <div className="pulse"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {project.images.length > 1 && (
                          <>
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-prev">
                              <i className="bi bi-chevron-left"></i>
                            </div>
                            <div className="swiper-button-next">
                              <i className="bi bi-chevron-right"></i>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Gallery */}
                      {project.images.length > 1 && (
                        <div ref={thumbsSwiperRef} className="gallery-thumbs swiper">
                          <div className="swiper-wrapper">
                            {project.images.map((image, index) => (
                              <div key={index} className="swiper-slide">
                                <div className="thumb-wrapper">
                                  <img src={image} alt={`Thumb ${index + 1}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Project Features Section */}
              <div className="project-features" data-aos="fade-up" data-aos-delay="100">
                <h3 className="section-title">
                  <i className="bi bi-stars"></i> Key Features
                </h3>
                <div className="features-grid">
                  {project.features && project.features.map((feature, index) => (
                    <div key={index} className="feature-card" data-aos="zoom-in" data-aos-delay={150 + index * 50}>
                      <div className="feature-icon">
                        <i className={feature.icon || 'bi bi-check-lg'}></i>
                      </div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                  {!project.features && (
                    <>
                      <div className="feature-card" data-aos="zoom-in" data-aos-delay="150">
                        <div className="feature-icon">
                          <i className="bi bi-lightning-charge"></i>
                        </div>
                        <div className="feature-content">
                          <h4>Fast Performance</h4>
                          <p>Optimized for speed and efficiency</p>
                        </div>
                      </div>
                      <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
                        <div className="feature-icon">
                          <i className="bi bi-phone"></i>
                        </div>
                        <div className="feature-content">
                          <h4>Responsive Design</h4>
                          <p>Works perfectly on all devices</p>
                        </div>
                      </div>
                      <div className="feature-card" data-aos="zoom-in" data-aos-delay="250">
                        <div className="feature-icon">
                          <i className="bi bi-palette"></i>
                        </div>
                        <div className="feature-content">
                          <h4>Modern UI/UX</h4>
                          <p>Clean and intuitive interface</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Modern Project Info Card */}
              <div className="modern-info-card" data-aos="fade-left" data-aos-delay="200">
                <div className="card-header">
                  <h3>
                    <i className="bi bi-info-circle"></i>
                    Project Details
                  </h3>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-folder2-open"></i>
                    </div>
                    <div className="info-content">
                      <span className="info-label">Category</span>
                      <span className="info-value">
                        {project.category.split(' ').map(cat => 
                          cat.replace('filter-', '').replace(/-/g, ' ')
                        ).filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-calendar3"></i>
                    </div>
                    <div className="info-content">
                      <span className="info-label">Completed</span>
                      <span className="info-value">{project.projectDate}</span>
                    </div>
                  </div>

                  {project.client && (
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="bi bi-person-badge"></i>
                      </div>
                      <div className="info-content">
                        <span className="info-label">Client</span>
                        <span className="info-value">{project.client}</span>
                      </div>
                    </div>
                  )}

                  <div className="info-divider"></div>

                  <div className="tech-stack">
                    <h4>Tech Stack</h4>
                    <div className="tech-tags">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag" data-aos="fade-up" data-aos-delay={300 + index * 50}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description Card */}
              <div className="modern-description-card" data-aos="fade-left" data-aos-delay="300">
                <div className="description-header">
                  <div className="header-icon">
                    <i className="bi bi-file-text"></i>
                  </div>
                  <h3>About Project</h3>
                </div>
                <div className="description-content">
                  <p>{project.fullDescription}</p>
                </div>
              </div>

              {/* Call to Action Card */}
              <div className="cta-card" data-aos="zoom-in" data-aos-delay="400">
                <div className="cta-content">
                  <h4>Like what you see?</h4>
                  <p>Check out the live demo or explore the code</p>
                  <div className="cta-buttons">
                    {project.projectUrl && (
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cta-btn primary"
                      >
                        <i className="bi bi-rocket-takeoff"></i> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cta-btn secondary"
                      >
                        <i className="bi bi-github"></i> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="related-projects" data-aos="fade-up">
          <div className="container">
            <div className="section-header">
              <h2>Related Projects</h2>
              <p>Explore more projects from the portfolio</p>
            </div>
            <div className="row">
              {relatedProjects.map((relProject, index) => (
                <div key={relProject.id} className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Link to={`/project/${relProject.id}`} className="related-card">
                    <div className="card-image">
                      <img src={relProject.mainImage} alt={relProject.title} />
                      <div className="card-overlay">
                        <span className="view-project">View Project</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h4>{relProject.title}</h4>
                      <p>{relProject.description}</p>
                      <div className="card-tech">
                        {relProject.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-mini">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        {project.projectUrl && (
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fab-btn demo"
            data-tooltip="Live Demo"
          >
            <i className="bi bi-play-circle"></i>
          </a>
        )}
        <a 
          href="/#projects" 
          className="fab-btn back" 
          data-tooltip="All Projects"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
            setTimeout(() => {
              const projectsSection = document.getElementById('projects')
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }, 100)
          }}
        >
          <i className="bi bi-grid-3x3-gap"></i>
        </a>
      </div>
    </>
  )
}

export default ProjectDetails
